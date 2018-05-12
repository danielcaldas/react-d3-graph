import React from 'react';

import { drag as d3Drag } from 'd3-drag';
import { forceLink as d3ForceLink } from 'd3-force';
import { select as d3Select, selectAll as d3SelectAll, event as d3Event } from 'd3-selection';
import { zoom as d3Zoom } from 'd3-zoom';

import CONST from './graph.const';
import DEFAULT_CONFIG from './graph.config';
import ERRORS from '../../err';

import * as graphRenderer from './graph.renderer';
import * as graphHelper from './graph.helper';
import utils from '../../utils';

// Some d3 constant values
const D3_CONST = {
    FORCE_LINK_STRENGTH: 1,
    LINK_IDEAL_DISTANCE: 100,
    SIMULATION_ALPHA_TARGET: 0.05
};

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
 * // graph event callbacks
 * const onClickNode = function(nodeId) {
 *      window.alert('Clicked node ${nodeId}');
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
 * const onMouseOverLink = function(source, target) {
 *      window.alert(`Mouse over in link between ${source} and ${target}`);
 * };
 *
 * const onMouseOutLink = function(source, target) {
 *      window.alert(`Mouse out link between ${source} and ${target}`);
 * };
 *
 * <Graph
 *      id='graph-id' // id is mandatory, if no id is defined rd3g will throw an error
 *      data={data}
 *      config={myConfig}
 *      onClickNode={onClickNode}
 *      onClickLink={onClickLink}
 *      onMouseOverNode={onMouseOverNode}
 *      onMouseOutNode={onMouseOutNode}
 *      onMouseOverLink={onMouseOverLink}
 *      onMouseOutLink={onMouseOutLink}/>
 */
export default class Graph extends React.Component {
    /**
     * Sets d3 tick function and configures other d3 stuff such as forces and drag events.
     * @returns {undefined}
     */
    _graphForcesConfig() {
        this.state.simulation.nodes(this.state.d3Nodes).on('tick', this._tick);

        const forceLink = d3ForceLink(this.state.d3Links)
            .id(l => l.id)
            .distance(D3_CONST.LINK_IDEAL_DISTANCE)
            .strength(D3_CONST.FORCE_LINK_STRENGTH);

        this.state.simulation.force(CONST.LINK_CLASS_NAME, forceLink);

        const customNodeDrag = d3Drag()
            .on('start', this._onDragStart)
            .on('drag', this._onDragMove)
            .on('end', this._onDragEnd);

        d3Select(`#${this.state.id}-${CONST.GRAPH_WRAPPER_ID}`)
            .selectAll('.node')
            .call(customNodeDrag);
    }

    /**
     * Handles d3 drag 'end' event.
     * @returns {undefined}
     */
    _onDragEnd = () =>
        !this.state.config.staticGraph &&
        this.state.config.automaticRearrangeAfterDropNode &&
        this.state.simulation.alphaTarget(D3_CONST.SIMULATION_ALPHA_TARGET).restart();

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

            draggedNode.x += d3Event.dx;
            draggedNode.y += d3Event.dy;

            // set nodes fixing coords fx and fy
            draggedNode['fx'] = draggedNode.x;
            draggedNode['fy'] = draggedNode.y;

            this._tick();
        }
    };

    /**
     * Handles d3 drag 'start' event.
     * @returns {undefined}
     */
    _onDragStart = () => this.pauseSimulation();

    /**
     * Sets nodes and links highlighted value.
     * @param  {string} id - the id of the node to highlight.
     * @param  {boolean} [value=false] - the highlight value to be set (true or false).
     * @returns {undefined}
     */
    _setNodeHighlightedValue = (id, value = false) =>
        this._tick(
            graphHelper.updateNodeHighlightedValue(this.state.nodes, this.state.links, this.state.config, id, value)
        );

    /**
     * The tick function simply calls React set state in order to update component and render nodes
     * along time as d3 calculates new node positioning.
     * @param {Object} state - new state to pass on.
     * @returns {undefined}
     */
    _tick = (state = {}) => this.setState(state);

    /**
     * Configures zoom upon graph with default or user provided values.<br/>
     * {@link https://github.com/d3/d3-zoom#zoom}
     * @returns {undefined}
     */
    _zoomConfig = () =>
        d3Select(`#${this.state.id}-${CONST.GRAPH_WRAPPER_ID}`).call(
            d3Zoom()
                .scaleExtent([this.state.config.minZoom, this.state.config.maxZoom])
                .on('zoom', this._zoomed)
        );

    /**
     * Handler for 'zoom' event within zoom config.
     * @returns {Object} returns the transformed elements within the svg graph area.
     */
    _zoomed = () => {
        const transform = d3Event.transform;

        d3SelectAll(`#${this.state.id}-${CONST.GRAPH_CONTAINER_ID}`).attr('transform', transform);

        this.state.config.panAndZoom && this.setState({ transform: transform.k });
    };

    /**
     * Handles mouse over node event.
     * @param  {string} id - id of the node that participates in the event.
     * @returns {undefined}
     */
    onMouseOverNode = id => {
        this.props.onMouseOverNode && this.props.onMouseOverNode(id);

        this.state.config.nodeHighlightBehavior && this._setNodeHighlightedValue(id, true);
    };

    /**
     * Handles mouse out node event.
     * @param  {string} id - id of the node that participates in the event.
     * @returns {undefined}
     */
    onMouseOutNode = id => {
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
            this.state.highlightedLink = { source, target };

            this._tick();
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
            this.state.highlightedLink = undefined;

            this._tick();
        }
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
            for (let nodeId in this.state.nodes) {
                let node = this.state.nodes[nodeId];

                if (node.fx && node.fy) {
                    Reflect.deleteProperty(node, 'fx');
                    Reflect.deleteProperty(node, 'fy');
                }
            }

            this.state.simulation.alphaTarget(D3_CONST.SIMULATION_ALPHA_TARGET).restart();

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
            utils.throwErr(this.constructor.name, ERRORS.GRAPH_NO_ID_PROP);
        }

        this.state = graphHelper.initializeGraphState(this.props, this.state);
    }

    componentWillReceiveProps(nextProps) {
        const newGraphElements =
            nextProps.data.nodes.length !== this.state.nodesInputSnapshot.length ||
            nextProps.data.links.length !== this.state.linksInputSnapshot.length ||
            !utils.isDeepEqual(nextProps.data, {
                nodes: this.state.nodesInputSnapshot,
                links: this.state.linksInputSnapshot
            });
        const configUpdated =
            !utils.isObjectEmpty(nextProps.config) && !utils.isDeepEqual(nextProps.config, this.state.config);
        const state = newGraphElements ? graphHelper.initializeGraphState(nextProps, this.state) : this.state;
        const config = configUpdated ? utils.merge(DEFAULT_CONFIG, nextProps.config || {}) : this.state.config;

        // in order to properly update graph data we need to pause eventual d3 ongoing animations
        newGraphElements && this.pauseSimulation();

        const transform = nextProps.config.panAndZoom !== this.state.config.panAndZoom ? 1 : this.state.transform;

        this.setState({
            ...state,
            config,
            newGraphElements,
            configUpdated,
            transform
        });
    }

    componentDidUpdate() {
        // if the property staticGraph was activated we want to stop possible ongoing simulation
        this.state.config.staticGraph && this.pauseSimulation();

        if (!this.state.config.staticGraph && this.state.newGraphElements) {
            this._graphForcesConfig();
            this.restartSimulation();
            this.setState({ newGraphElements: false });
        }

        if (this.state.configUpdated) {
            this._zoomConfig();
            this.setState({ configUpdated: false });
        }
    }

    componentDidMount() {
        if (!this.state.config.staticGraph) {
            this._graphForcesConfig();
        }

        // graph zoom and drag&drop all network
        this._zoomConfig();
    }

    componentWillUnmount() {
        this.pauseSimulation();
    }

    render() {
        const { nodes, links } = graphRenderer.buildGraph(
            this.state.nodes,
            {
                onClickNode: this.props.onClickNode,
                onMouseOverNode: this.onMouseOverNode,
                onMouseOut: this.onMouseOutNode
            },
            this.state.d3Links,
            this.state.links,
            {
                onClickLink: this.props.onClickLink,
                onMouseOverLink: this.onMouseOverLink,
                onMouseOutLink: this.onMouseOutLink
            },
            this.state.config,
            this.state.highlightedNode,
            this.state.highlightedLink,
            this.state.transform
        );

        const svgStyle = {
            height: this.state.config.height,
            width: this.state.config.width
        };

        return (
            <div id={`${this.state.id}-${CONST.GRAPH_WRAPPER_ID}`}>
                <svg style={svgStyle}>
                    <g id={`${this.state.id}-${CONST.GRAPH_CONTAINER_ID}`}>
                        {links}
                        {nodes}
                    </g>
                </svg>
            </div>
        );
    }
}
