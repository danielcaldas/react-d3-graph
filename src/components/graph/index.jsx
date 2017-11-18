import React from 'react';

import { drag as d3Drag } from 'd3-drag';
import { forceLink as d3ForceLink } from 'd3-force';
import {
    select as d3Select,
    selectAll as d3SelectAll,
    event as d3Event
} from 'd3-selection';
import { zoom as d3Zoom } from 'd3-zoom';

import CONST from './const';
import DEFAULT_CONFIG from './config';
import ERRORS from '../../err';

import graphHelper from './helper';
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
 * // Graph payload (with minimalist structure)
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
 * // The graph configuration
 * const myConfig = {
 *     highlightBehavior: true,
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
 * // Graph event callbacks
 * const onClickNode = function(nodeId) {
 *      window.alert('Clicked node', nodeId);
 * };
 *
 * const onMouseOverNode = function(nodeId) {
 *      window.alert('Mouse over node', nodeId);
 * };
 *
 * const onMouseOutNode = function(nodeId) {
 *      window.alert('Mouse out node', nodeId);
 * };
 *
 * const onClickLink = function(source, target) {
 *      window.alert(`Clicked link between ${source} and ${target}`);
 * };
 *
 * <Graph
 *      id='graph-id' // id is mandatory, if no id is defined rd3g will throw an error
 *      data={data}
 *      config={myConfig}
 *      onClickNode={onClickNode}
 *      onClickLink={onClickLink}
 *      onMouseOverNode={onMouseOverNode}
 *      onMouseOutNode={onMouseOutNode} />
 */
export default class Graph extends React.Component {
    /**
     * Handles d3 drag 'end' event.
     */
    _onDragEnd = () => !this.state.config.staticGraph
                        && this.state.config.automaticRearrangeAfterDropNode
                        && this.state.simulation.alphaTarget(D3_CONST.SIMULATION_ALPHA_TARGET).restart();

    /**
     * Handles d3 'drag' event.
     * @param  {Object} ev - event.
     * @param  {number} index - index of the node that is being dragged.
     */
    _onDragMove = (ev, index) => {
        if (!this.state.config.staticGraph) {
            // This is where d3 and react bind
            let draggedNode = this.state.nodes[this.state.nodeIndexMapping[index]];

            draggedNode.x += d3Event.dx;
            draggedNode.y += d3Event.dy;

            // Set nodes fixing coords fx and fy
            draggedNode['fx'] = draggedNode.x;
            draggedNode['fy'] = draggedNode.y;

            this._tick();
        }
    }

    /**
     * Handles d3 drag 'start' event.
     */
    _onDragStart = () => this.pauseSimulation();

    /**
     * Sets nodes and links highlighted value.
     * @param  {string} id - the id of the node to highlight.
     * @param  {boolean} [value=false] - the highlight value to be set (true or false).
     */
    _setHighlighted = (id, value=false) => {
        this.state.highlightedNode = value ? id : '';
        this.state.nodes[id].highlighted = value;

        // when highlightDegree is 0 we want only to highlight selected node
        if (this.state.links[id] && this.state.config.highlightDegree !== 0) {
            Object.keys(this.state.links[id]).forEach(k => {
                this.state.nodes[k].highlighted = value;
            });
        }

        this._tick();
    }

    /**
     * The tick function simply calls React set state in order to update component and render nodes
     * along time as d3 calculates new node positioning.
     */
    _tick = () => this.setState(this.state || {});

    /**
     * Configures zoom upon graph with default or user provided values.<br/>
     * {@link https://github.com/d3/d3-zoom#zoom}
     */
    _zoomConfig = () => d3Select(`#${this.state.id}-${CONST.GRAPH_WRAPPER_ID}`)
                            .call(d3Zoom().scaleExtent([this.state.config.minZoom, this.state.config.maxZoom])
                            .on('zoom', this._zoomed));

    /**
     * Handler for 'zoom' event within zoom config.
     * @returns {Object} returns the transformed elements within the svg graph area.
     */
    _zoomed = () => {
        const transform = d3Event.transform;

        d3SelectAll(`#${this.state.id}-${CONST.GRAPH_CONTAINER_ID}`).attr('transform', transform);

        this.state.config.panAndZoom && this.setState({ transform: transform.k });
    }

    /**
     * Handles mouse over node event.
     * @param  {string} id - id of the node that participates in the event.
     */
    onMouseOverNode = (id) => {
        this.props.onMouseOverNode && this.props.onMouseOverNode(id);

        this.state.config.highlightBehavior && this._setHighlighted(id, true);
    }

    /**
     * Handles mouse out node event.
     * @param  {string} id - id of the node that participates in the event.
     */
    onMouseOutNode = (id) => {
        this.props.onMouseOutNode && this.props.onMouseOutNode(id);

        this.state.config.highlightBehavior && this._setHighlighted(id, false);
    }
    
    /**
     * Handles mouse over link event.
     * @TODO
     */
    onMouseOverLink = (source, target) => {
        this.props.onMouseOverLink && this.props.onMouseOverLink(source, target);

        // this.state.config.highlightBehavior && this._setHighlighted(index, true);
        if (this.state.config.highlightBehavior) {
            this._setHighlighted(source, true);
            this._setHighlighted(target, true);
        }
    }

    /**
     * Handles mouse out link event.
     * @TODO
     */
    onMouseOutLink = (source, target) => {
        this.props.onMouseOutLink && this.props.onMouseOutLink(source, target);

        // this.state.config.highlightBehavior && this._setHighlighted(index, false);
        if (this.state.config.highlightBehavior) {
            this._setHighlighted(source, false);
            this._setHighlighted(target, false);
        }
    }

    /**
    * Calls d3 simulation.stop().<br/>
    * {@link https://github.com/d3/d3-force#simulation_stop}
    */
    pauseSimulation = () => !this.state.config.staticGraph && this.state.simulation.stop();

    /**
     * This method resets all nodes fixed positions by deleting the properties fx (fixed x)
     * and fy (fixed y). Following this, a simulation is triggered in order to force nodes to go back
     * to their original positions (or at least new positions according to the d3 force parameters).
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
    }

    /**
     * Calls d3 simulation.restart().<br/>
     * {@link https://github.com/d3/d3-force#simulation_restart}
     */
    restartSimulation = () => !this.state.config.staticGraph && this.state.simulation.restart();

    /**
     * Sets d3 tick function and configures other d3 stuff such as forces and drag events.
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

        d3Select(`#${this.state.id}-${CONST.GRAPH_WRAPPER_ID}`).selectAll('.node').call(customNodeDrag);
    }

    constructor(props) {
        super(props);

        if (!this.props.id) {
            utils.throwErr(this.constructor.name, ERRORS.GRAPH_NO_ID_PROP);
        }

        this.state = graphHelper.initializeGraphState(this.props, this.state);
    }

    componentWillReceiveProps(nextProps) {
        const newGraphElements = nextProps.data.nodes.length !== this.state.d3Nodes.length
                              || nextProps.data.links.length !== this.state.d3Links.length;

        if (newGraphElements && nextProps.config.staticGraph) {
            utils.throwErr(this.constructor.name, ERRORS.STATIC_GRAPH_DATA_UPDATE);
        }

        const configUpdated = !utils.isDeepEqual(nextProps.config, this.state.config);
        const state = newGraphElements ? graphHelper.initializeGraphState(nextProps, this.state) : this.state;
        const config = configUpdated ? utils.merge(DEFAULT_CONFIG, nextProps.config || {}) : this.state.config;

        // In order to properly update graph data we need to pause eventual d3 ongoing animations
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
        // If the property staticGraph was activated we want to stop possible ongoing simulation
        this.state.config.staticGraph && this.state.simulation.stop();

        if (!this.state.config.staticGraph && this.state.newGraphElements) {
            this._graphForcesConfig();
            this.restartSimulation();
            this.state.newGraphElements = false;
        }

        if (this.state.configUpdated) {
            this._zoomConfig();
            this.state.configUpdated = false;
        }
    }

    componentDidMount() {
        if (!this.state.config.staticGraph) {
            this._graphForcesConfig();
        }

        // Graph zoom and drag&drop all network
        this._zoomConfig();
    }

    componentWillUnmount() {
        this.state.simulation.stop();
    }

    render() {
        const { nodes, links } = graphHelper.buildGraph(
            this.state.nodes,
            {
                onClickNode: this.props.onClickNode,
                onMouseOverNode: this.onMouseOverNode,
                onMouseOut: this.onMouseOutNode
            },
            this.state.links,
            {
                onClickLink: this.props.onClickLink,
                onMouseOverLink: this.onMouseOverLink,
                onMouseOutLink: this.onMouseOutLink
            },
            this.state.config,
            this.state.highlightedNode,
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
