import React from "react";

import { drag as d3Drag } from "d3-drag";
import { forceLink as d3ForceLink } from "d3-force";
import { select as d3Select, selectAll as d3SelectAll, event as d3Event } from "d3-selection";
import { zoom as d3Zoom } from "d3-zoom";

import CONST from "./graph.const";
import DEFAULT_CONFIG from "./graph.config";
import ERRORS from "../../err";

import { getTargetLeafConnections, toggleLinksMatrixConnections, toggleLinksConnections } from "./collapse.helper";
import {
  updateNodeHighlightedValue,
  checkForGraphConfigChanges,
  checkForGraphElementsChanges,
  getCenterAndZoomTransformation,
  initializeGraphState,
  initializeNodes,
} from "./graph.helper";
import { renderGraph } from "./graph.renderer";
import { merge, debounce, throwErr } from "../../utils";

/**
 * Graph component is the main component for react-d3-graph components, its interface allows its user
 * to build the graph once the user provides the data, configuration (optional) and callback interactions (also optional).
 * The code for the [live example](https://danielcaldas.github.io/react-d3-graph/sandbox/index.html)
 * can be consulted [here](https://github.com/danielcaldas/react-d3-graph/blob/master/sandbox/Sandbox.jsx)
 * @example
 * import { Graph } from 'react-d3-graph';
 *
 * // graph payload (with minimalist structure)
 * const data = {
 *     nodes: [
 *       {id: 'Harry'},
 *       {id: 'Sally'},
 *       {id: 'Alice'}
 *     ],
 *     links: [
 *         {source: 'Harry', target: 'Sally'},
 *         {source: 'Harry', target: 'Alice'},
 *     ]
 * };
 *
 * // the graph configuration, you only need to pass down properties
 * // that you want to override, otherwise default ones will be used
 * const myConfig = {
 *     nodeHighlightBehavior: true,
 *     node: {
 *         color: 'lightgreen',
 *         size: 120,
 *         highlightStrokeColor: 'blue'
 *     },
 *     link: {
 *         highlightColor: 'lightblue'
 *     }
 * };
 *
 * // Callback to handle click on the graph.
 * // @param {Object} event click dom event
 * const onClickGraph = function(event) {
 *      window.alert('Clicked the graph background');
 * };
 *
 * const onClickNode = function(nodeId) {
 *      window.alert('Clicked node ${nodeId}');
 * };
 *
 * const onDoubleClickNode = function(nodeId) {
 *      window.alert('Double clicked node ${nodeId}');
 * };
 *
 * const onRightClickNode = function(event, nodeId) {
 *      window.alert('Right clicked node ${nodeId}');
 * };
 *
 * const onMouseOverNode = function(nodeId) {
 *      window.alert(`Mouse over node ${nodeId}`);
 * };
 *
 * const onMouseOutNode = function(nodeId) {
 *      window.alert(`Mouse out node ${nodeId}`);
 * };
 *
 * const onClickLink = function(source, target) {
 *      window.alert(`Clicked link between ${source} and ${target}`);
 * };
 *
 * const onRightClickLink = function(event, source, target) {
 *      window.alert('Right clicked link between ${source} and ${target}');
 * };
 *
 * const onMouseOverLink = function(source, target) {
 *      window.alert(`Mouse over in link between ${source} and ${target}`);
 * };
 *
 * const onMouseOutLink = function(source, target) {
 *      window.alert(`Mouse out link between ${source} and ${target}`);
 * };
 *
 * const onNodePositionChange = function(nodeId, x, y) {
 *      window.alert(`Node ${nodeId} moved to new position x= ${x} y= ${y}`);
 * };
 *
 * // Callback that's called whenever the graph is zoomed in/out
 * // @param {number} previousZoom the previous graph zoom
 * // @param {number} newZoom the new graph zoom
 * const onZoomChange = function(previousZoom, newZoom) {
 *      window.alert(`Graph is now zoomed at ${newZoom} from ${previousZoom}`);
 * };
 *
 *
 * <Graph
 *      id='graph-id' // id is mandatory, if no id is defined rd3g will throw an error
 *      data={data}
 *      config={myConfig}
 *      onClickGraph={onClickGraph}
 *      onClickNode={onClickNode}
 *      onDoubleClickNode={onDoubleClickNode}
 *      onRightClickNode={onRightClickNode}
 *      onClickLink={onClickLink}
 *      onRightClickLink={onRightClickLink}
 *      onMouseOverNode={onMouseOverNode}
 *      onMouseOutNode={onMouseOutNode}
 *      onMouseOverLink={onMouseOverLink}
 *      onMouseOutLink={onMouseOutLink}
 *      onZoomChange={onZoomChange}/>
 */
export default class Graph extends React.Component {
  /**
   * Obtain a set of properties which will be used to perform the focus and zoom animation if
   * required. In case there's not a focus and zoom animation in progress, it should reset the
   * transition duration to zero and clear transformation styles.
   * @returns {Object} - Focus and zoom animation properties.
   */
  _generateFocusAnimationProps = () => {
    const { focusedNodeId } = this.state;

    // In case an older animation was still not complete, clear previous timeout to ensure the new one is not cancelled
    if (this.state.enableFocusAnimation) {
      if (this.focusAnimationTimeout) {
        clearTimeout(this.focusAnimationTimeout);
      }

      this.focusAnimationTimeout = setTimeout(
        () => this.setState({ enableFocusAnimation: false }),
        this.state.config.focusAnimationDuration * 1000
      );
    }

    const transitionDuration = this.state.enableFocusAnimation ? this.state.config.focusAnimationDuration : 0;

    return {
      style: { transitionDuration: `${transitionDuration}s` },
      transform: focusedNodeId ? this.state.focusTransformation : null,
    };
  };

  /**
   * This method runs {@link d3-force|https://github.com/d3/d3-force}
   * against the current graph.
   * @returns {undefined}
   */
  _graphLinkForceConfig() {
    const forceLink = d3ForceLink(this.state.d3Links)
      .id(l => l.id)
      .distance(this.state.config.d3.linkLength)
      .strength(this.state.config.d3.linkStrength);

    this.state.simulation.force(CONST.LINK_CLASS_NAME, forceLink);
  }

  /**
   * This method runs {@link d3-drag|https://github.com/d3/d3-drag}
   * against the current graph.
   * @returns {undefined}
   */
  _graphNodeDragConfig() {
    const customNodeDrag = d3Drag()
      .on("start", this._onDragStart)
      .on("drag", this._onDragMove)
      .on("end", this._onDragEnd);

    d3Select(`#${this.state.id}-${CONST.GRAPH_WRAPPER_ID}`)
      .selectAll(".node")
      .call(customNodeDrag);
  }

  /**
   * Sets d3 tick function and configures other d3 stuff such as forces and drag events.
   * Whenever called binds Graph component state with d3.
   * @returns {undefined}
   */
  _graphBindD3ToReactComponent() {
    if (!this.state.config.d3.disableLinkForce) {
      this.state.simulation.nodes(this.state.d3Nodes).on("tick", this._tick);
      this._graphLinkForceConfig();
    }
    this._graphNodeDragConfig();
  }

  /**
   * Handles d3 drag 'end' event.
   * @returns {undefined}
   */
  _onDragEnd = () => {
    this.isDraggingNode = false;

    if (this.state.draggedNode) {
      this.onNodePositionChange(this.state.draggedNode);
      this._tick({ draggedNode: null });
    }

    !this.state.config.staticGraph &&
      this.state.config.automaticRearrangeAfterDropNode &&
      this.state.simulation.alphaTarget(this.state.config.d3.alphaTarget).restart();
  };

  /**
   * Handles d3 'drag' event.
   * {@link https://github.com/d3/d3-drag/blob/master/README.md#drag_subject|more about d3 drag}
   * @param  {Object} ev - if not undefined it will contain event data.
   * @param  {number} index - index of the node that is being dragged.
   * @param  {Array.<Object>} nodeList - array of d3 nodes. This list of nodes is provided by d3, each
   * node contains all information that was previously fed by rd3g.
   * @returns {undefined}
   */
  _onDragMove = (ev, index, nodeList) => {
    const id = nodeList[index].id;

    if (!this.state.config.staticGraph) {
      // this is where d3 and react bind
      let draggedNode = this.state.nodes[id];

      draggedNode.oldX = draggedNode.x;
      draggedNode.oldY = draggedNode.y;

      draggedNode.x += d3Event.dx;
      draggedNode.y += d3Event.dy;

      // set nodes fixing coords fx and fy
      draggedNode["fx"] = draggedNode.x;
      draggedNode["fy"] = draggedNode.y;

      this._tick({ draggedNode });
    }
  };

  /**
   * Handles d3 drag 'start' event.
   * @returns {undefined}
   */
  _onDragStart = () => {
    this.isDraggingNode = true;
    this.pauseSimulation();

    if (this.state.enableFocusAnimation) {
      this.setState({ enableFocusAnimation: false });
    }
  };

  /**
   * Sets nodes and links highlighted value.
   * @param  {string} id - the id of the node to highlight.
   * @param  {boolean} [value=false] - the highlight value to be set (true or false).
   * @returns {undefined}
   */
  _setNodeHighlightedValue = (id, value = false) =>
    this._tick(updateNodeHighlightedValue(this.state.nodes, this.state.links, this.state.config, id, value));

  /**
   * The tick function simply calls React set state in order to update component and render nodes
   * along time as d3 calculates new node positioning.
   * @param {Object} state - new state to pass on.
   * @param {Function} [cb] - optional callback to fed in to {@link setState()|https://reactjs.org/docs/react-component.html#setstate}.
   * @returns {undefined}
   */
  _tick = (state = {}, cb) => (cb ? this.setState(state, cb) : this.setState(state));

  /**
   * Configures zoom upon graph with default or user provided values.<br/>
   * NOTE: in order for users to be able to double click on nodes, we
   * are disabling the native dblclick.zoom from d3 that performs a zoom
   * whenever a user double clicks on top of the graph.
   * {@link https://github.com/d3/d3-zoom#zoom}
   * @returns {undefined}
   */
  _zoomConfig = () => {
    const selector = d3Select(`#${this.state.id}-${CONST.GRAPH_WRAPPER_ID}`);

    const zoomObject = d3Zoom()
      .scaleExtent([this.state.config.minZoom, this.state.config.maxZoom])
      .on("zoom", this._zoomed);

    if (this.state.config.initialZoom !== null) {
      zoomObject.scaleTo(selector, this.state.config.initialZoom);
    }

    // avoid double click on graph to trigger zoom
    // for more details consult: https://github.com/danielcaldas/react-d3-graph/pull/202
    selector.call(zoomObject).on("dblclick.zoom", null);
  };

  /**
   * Handler for 'zoom' event within zoom config.
   * @returns {Object} returns the transformed elements within the svg graph area.
   */
  _zoomed = () => {
    const transform = d3Event.transform;

    d3SelectAll(`#${this.state.id}-${CONST.GRAPH_CONTAINER_ID}`).attr("transform", transform);

    this.state.config.panAndZoom && this.setState({ transform: transform.k });

    // only send zoom change events if the zoom has changed (_zoomed() also gets called when panning)
    if (this.debouncedOnZoomChange && this.state.previousZoom !== transform.k) {
      this.debouncedOnZoomChange(this.state.previousZoom, transform.k);
      this.setState({ previousZoom: transform.k });
    }
  };

  /**
   * Calls the callback passed to the component.
   * @param  {Object} e - The event of onClick handler.
   * @returns {undefined}
   */
  onClickGraph = e => {
    if (this.state.enableFocusAnimation) {
      this.setState({ enableFocusAnimation: false });
    }

    // Only trigger the graph onClickHandler, if not clicked a node or link.
    // toUpperCase() is added as a precaution, as the documentation says tagName should always
    // return in UPPERCASE, but chrome returns lowercase
    const tagName = e.target && e.target.tagName;
    const name = e?.target?.attributes?.name?.value;
    const svgContainerName = `svg-container-${this.state.id}`;

    if (tagName.toUpperCase() === "SVG" && name === svgContainerName) {
      this.props.onClickGraph && this.props.onClickGraph(e);
    }
  };

  /**
   * Collapses the nodes, then checks if the click is doubled and calls the callback passed to the component.
   * @param  {string} clickedNodeId - The id of the node where the click was performed.
   * @returns {undefined}
   */
  onClickNode = clickedNodeId => {
    if (this.state.config.collapsible) {
      const leafConnections = getTargetLeafConnections(clickedNodeId, this.state.links, this.state.config);
      const links = toggleLinksMatrixConnections(this.state.links, leafConnections, this.state.config);
      const d3Links = toggleLinksConnections(this.state.d3Links, links);
      const firstLeaf = leafConnections?.["0"];

      let isExpanding = false;

      if (firstLeaf) {
        const visibility = links[firstLeaf.source][firstLeaf.target];

        isExpanding = visibility === 1;
      }

      this._tick(
        {
          links,
          d3Links,
        },
        () => {
          this.props.onClickNode && this.props.onClickNode(clickedNodeId);

          if (isExpanding) {
            this._graphNodeDragConfig();
          }
        }
      );
    } else {
      if (!this.nodeClickTimer) {
        this.nodeClickTimer = setTimeout(() => {
          this.props.onClickNode && this.props.onClickNode(clickedNodeId);
          this.nodeClickTimer = null;
        }, CONST.TTL_DOUBLE_CLICK_IN_MS);
      } else {
        this.props.onDoubleClickNode && this.props.onDoubleClickNode(clickedNodeId);
        this.nodeClickTimer = clearTimeout(this.nodeClickTimer);
      }
    }
  };

  /**
   * Handles mouse over node event.
   * @param  {string} id - id of the node that participates in the event.
   * @returns {undefined}
   */
  onMouseOverNode = id => {
    if (this.isDraggingNode) {
      return;
    }

    this.props.onMouseOverNode && this.props.onMouseOverNode(id);

    this.state.config.nodeHighlightBehavior && this._setNodeHighlightedValue(id, true);
  };

  /**
   * Handles mouse out node event.
   * @param  {string} id - id of the node that participates in the event.
   * @returns {undefined}
   */
  onMouseOutNode = id => {
    if (this.isDraggingNode) {
      return;
    }

    this.props.onMouseOutNode && this.props.onMouseOutNode(id);

    this.state.config.nodeHighlightBehavior && this._setNodeHighlightedValue(id, false);
  };

  /**
   * Handles mouse over link event.
   * @param  {string} source - id of the source node that participates in the event.
   * @param  {string} target - id of the target node that participates in the event.
   * @returns {undefined}
   */
  onMouseOverLink = (source, target) => {
    this.props.onMouseOverLink && this.props.onMouseOverLink(source, target);

    if (this.state.config.linkHighlightBehavior) {
      const highlightedLink = { source, target };

      this._tick({ highlightedLink });
    }
  };

  /**
   * Handles mouse out link event.
   * @param  {string} source - id of the source node that participates in the event.
   * @param  {string} target - id of the target node that participates in the event.
   * @returns {undefined}
   */
  onMouseOutLink = (source, target) => {
    this.props.onMouseOutLink && this.props.onMouseOutLink(source, target);

    if (this.state.config.linkHighlightBehavior) {
      const highlightedLink = undefined;

      this._tick({ highlightedLink });
    }
  };

  /**
   * Handles node position change.
   * @param {Object} node - an object holding information about the dragged node.
   * @returns {undefined}
   */
  onNodePositionChange = node => {
    if (!this.props.onNodePositionChange) {
      return;
    }

    const { id, x, y } = node;

    this.props.onNodePositionChange(id, x, y);
  };

  /**
   * Calls d3 simulation.stop().<br/>
   * {@link https://github.com/d3/d3-force#simulation_stop}
   * @returns {undefined}
   */
  pauseSimulation = () => this.state.simulation.stop();

  /**
   * This method resets all nodes fixed positions by deleting the properties fx (fixed x)
   * and fy (fixed y). Following this, a simulation is triggered in order to force nodes to go back
   * to their original positions (or at least new positions according to the d3 force parameters).
   * @returns {undefined}
   */
  resetNodesPositions = () => {
    if (!this.state.config.staticGraph) {
      let initialNodesState = initializeNodes(this.props.data.nodes);
      for (let nodeId in this.state.nodes) {
        let node = this.state.nodes[nodeId];

        if (node.fx && node.fy) {
          Reflect.deleteProperty(node, "fx");
          Reflect.deleteProperty(node, "fy");
        }

        if (nodeId in initialNodesState) {
          let initialNode = initialNodesState[nodeId];
          node.x = initialNode.x;
          node.y = initialNode.y;
        }
      }

      this.state.simulation.alphaTarget(this.state.config.d3.alphaTarget).restart();

      this._tick();
    }
  };

  /**
   * Calls d3 simulation.restart().<br/>
   * {@link https://github.com/d3/d3-force#simulation_restart}
   * @returns {undefined}
   */
  restartSimulation = () => !this.state.config.staticGraph && this.state.simulation.restart();

  constructor(props) {
    super(props);

    if (!this.props.id) {
      throwErr(this.constructor.name, ERRORS.GRAPH_NO_ID_PROP);
    }

    this.focusAnimationTimeout = null;
    this.nodeClickTimer = null;
    this.isDraggingNode = false;
    this.state = initializeGraphState(this.props, this.state);
    this.debouncedOnZoomChange = this.props.onZoomChange ? debounce(this.props.onZoomChange, 100) : null;
  }

  /**
   * @deprecated
   * `componentWillReceiveProps` has a replacement method in react v16.3 onwards.
   * that is getDerivedStateFromProps.
   * But one needs to be aware that if an anti pattern of `componentWillReceiveProps` is
   * in place for this implementation the migration might not be that easy.
   * See {@link https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html}.
   * @param {Object} nextProps - props.
   * @returns {undefined}
   */
  // eslint-disable-next-line
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { graphElementsUpdated, newGraphElements } = checkForGraphElementsChanges(nextProps, this.state);
    const state = graphElementsUpdated ? initializeGraphState(nextProps, this.state) : this.state;
    const newConfig = nextProps.config || {};
    const { configUpdated, d3ConfigUpdated } = checkForGraphConfigChanges(nextProps, this.state);
    const config = configUpdated ? merge(DEFAULT_CONFIG, newConfig) : this.state.config;

    // in order to properly update graph data we need to pause eventual d3 ongoing animations
    newGraphElements && this.pauseSimulation();

    const transform = newConfig.panAndZoom !== this.state.config.panAndZoom ? 1 : this.state.transform;
    const focusedNodeId = nextProps.data.focusedNodeId;
    const d3FocusedNode = this.state.d3Nodes.find(node => `${node.id}` === `${focusedNodeId}`);
    const focusTransformation = getCenterAndZoomTransformation(d3FocusedNode, this.state.config);
    const enableFocusAnimation = this.props.data.focusedNodeId !== nextProps.data.focusedNodeId;

    // if we're given a function to call when the zoom changes, we create a debounced version of it
    // this is because this function gets called in very rapid succession when zooming
    if (nextProps.onZoomChange) {
      this.debouncedOnZoomChange = debounce(nextProps.onZoomChange, 100);
    }

    this.setState({
      ...state,
      config,
      configUpdated,
      d3ConfigUpdated,
      newGraphElements,
      transform,
      focusedNodeId,
      enableFocusAnimation,
      focusTransformation,
    });
  }

  componentDidUpdate() {
    // if the property staticGraph was activated we want to stop possible ongoing simulation
    const shouldPause = this.state.config.staticGraph || this.state.config.staticGraphWithDragAndDrop;

    if (shouldPause) {
      this.pauseSimulation();
    }

    if (!this.state.config.staticGraph && (this.state.newGraphElements || this.state.d3ConfigUpdated)) {
      this._graphBindD3ToReactComponent();

      if (!this.state.config.staticGraphWithDragAndDrop) {
        this.restartSimulation();
      }

      this.setState({ newGraphElements: false, d3ConfigUpdated: false });
    } else if (this.state.configUpdated) {
      this._graphNodeDragConfig();
    }

    if (this.state.configUpdated) {
      this._zoomConfig();
      this.setState({ configUpdated: false });
    }
  }

  componentDidMount() {
    if (!this.state.config.staticGraph) {
      this._graphBindD3ToReactComponent();
    }

    // graph zoom and drag&drop all network
    this._zoomConfig();
  }

  componentWillUnmount() {
    this.pauseSimulation();

    if (this.nodeClickTimer) {
      clearTimeout(this.nodeClickTimer);
      this.nodeClickTimer = null;
    }

    if (this.focusAnimationTimeout) {
      clearTimeout(this.focusAnimationTimeout);
      this.focusAnimationTimeout = null;
    }
  }

  render() {
    const { nodes, links, defs } = renderGraph(
      this.state.nodes,
      {
        onClickNode: this.onClickNode,
        onDoubleClickNode: this.onDoubleClickNode,
        onRightClickNode: this.props.onRightClickNode,
        onMouseOverNode: this.onMouseOverNode,
        onMouseOut: this.onMouseOutNode,
      },
      this.state.d3Links,
      this.state.links,
      {
        onClickLink: this.props.onClickLink,
        onRightClickLink: this.props.onRightClickLink,
        onMouseOverLink: this.onMouseOverLink,
        onMouseOutLink: this.onMouseOutLink,
      },
      this.state.config,
      this.state.highlightedNode,
      this.state.highlightedLink,
      this.state.transform
    );

    const svgStyle = {
      height: this.state.config.height,
      width: this.state.config.width,
    };

    const containerProps = this._generateFocusAnimationProps();

    return (
      <div id={`${this.state.id}-${CONST.GRAPH_WRAPPER_ID}`}>
        <svg name={`svg-container-${this.state.id}`} style={svgStyle} onClick={this.onClickGraph}>
          {defs}
          <g id={`${this.state.id}-${CONST.GRAPH_CONTAINER_ID}`} {...containerProps}>
            {links}
            {nodes}
          </g>
        </svg>
      </div>
    );
  }
}
