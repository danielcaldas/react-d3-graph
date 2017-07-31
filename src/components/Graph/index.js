import React from 'react';

import * as d3 from 'd3';

import CONST from './const';
import DEFAULT_CONFIG from './config';
import ERRORS from '../../err';

import GraphHelper from './helper';
import Utils from '../../utils';

/**
 * Graph component is the main component for react-d3-graph components, its interface allows its user
 * to build the graph once the user provides the data, configuration (optional) and callback interactions (also optional).
 * The code for the live example (https://danielcaldas.github.io/react-d3-graph/sandbox/index.html)
 * can be consulted here https://github.com/danielcaldas/react-d3-graph/blob/master/sandbox/Sandbox.js
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
                        && this.state.simulation.alphaTarget(0.05).restart();

    /**
     * Handles d3 'drag' event.
     * @param  {Object} _ - event.
     * @param  {number} index - index of the node that is being dragged.
     * @return {undefined}
     */
    _onDragMove = (_, index) => {
        if (!this.state.config.staticGraph) {
            // This is where d3 and react bind
            let draggedNode = this.state.nodes[this.state.nodeIndexMapping[index]];

            draggedNode.x += d3.event.dx;
            draggedNode.y += d3.event.dy;

            // Set nodes fixing coords fx and fy
            draggedNode['fx'] = draggedNode.x;
            draggedNode['fy'] = draggedNode.y;

            this._tick();
        }
    }

    /**
     * Handles d3 drag 'start' event.
     */
    _onDragStart = () => !this.state.config.staticGraph && this.state.simulation.stop();

    /**
     * Sets nodes and links highlighted value.
     * @param  {number} index - the index of the node to highlight (and its adjacent).
     * @param  {boolean} value - the highlight value to be set (true or false).
     * @return {undefined}
     */
    _setHighlighted = (index, value) => {
        this.state.nodeHighlighted = value;
        this.state.nodes[index].highlighted = value;

        if (this.state.links[index]) {
            Object.keys(this.state.links[index]).forEach(k => {
                this.state.nodes[k].highlighted = value;
            });
        }

        this.setState(this.state || {});
    }

    /**
     * The tick function simply calls React set state in order to update component and render nodes
     * along time as d3 calculates new node positioning.
     */
    _tick = () => this.setState(this.state || {});

    /**
     * Configures zoom upon graph with default or user provided values.<br/>
     * {@link https://github.com/d3/d3-zoom#zoom}
     * @return {undefined}
     */
    _zoomConfig = () => d3.select(`#${this.state.id}-${CONST.GRAPH_WRAPPER_ID}`)
                            .call(d3.zoom().scaleExtent([this.state.config.minZoom, this.state.config.maxZoom])
                            .on('zoom', this._zoomed));

    /**
     * Handler for 'zoom' event within zoom config.
     * @return {Object} returns the transformed elements within the svg graph area.
     */
    _zoomed = () => d3.selectAll(`#${this.state.id}-${CONST.GRAPH_CONTAINER_ID}`).attr('transform', d3.event.transform);

    /**
     * Handles mouse out node event.
     * @param  {number} index - index of the mouse hovered node.
     * @return {undefined}
     */
    onMouseOutNode = (index) => {
        this.props.onMouseOutNode && this.props.onMouseOutNode(index);

        this.state.config.highlightBehavior && this._setHighlighted(index, false);
    }

    /**
     * Handles mouse over node event.
     * @param  {number} index - index of the mouse hovered node.
     * @return {undefined}
     */
    onMouseOverNode = (index) => {
        this.props.onMouseOverNode && this.props.onMouseOverNode(index);

        this.state.config.highlightBehavior && this._setHighlighted(index, true);
    }

    /**
    * Calls d3 simulation.stop().<br/>
    * {@link https://github.com/d3/d3-force#simulation_stop}
    */
    pauseSimulation = () => !this.state.config.staticGraph && this.state.simulation.stop();

    /**
     * This method resets all nodes fixed positions by deleting the properties fx (fixed x)
     * and fy (fixed y). Next a simulation is triggered in order to force nodes to go back
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

            // @TODO: hardcoded alpha target
            this.state.simulation.alphaTarget(0.08).restart();

            this.setState(this.state || {});
        }
    }

    /**
     * Calls d3 simulation.restart().<br/>
     * {@link https://github.com/d3/d3-force#simulation_restart}
     */
    restartSimulation = () => !this.state.config.staticGraph && this.state.simulation.restart();

    /**
     * Incapsulates common procedures to initialize graph.
     * @param  {Object} data
     * @param {Array.<Object>} data.nodes - nodes of the graph to be created.
     * @param {Array.<Object>} data.links - links that connect data.nodes.
     * @returns {Object}
     */
    _initializeGraphState(data) {
        let graph = data || {};

        let config = Utils.merge(DEFAULT_CONFIG, this.props.config || {});

        let {nodes, nodeIndexMapping} = GraphHelper.initializeNodes(graph.nodes);
        let links = GraphHelper.initializeLinks(graph.links); // Matrix of graph connections
        const {nodes: d3Nodes, links: d3Links} = graph;

        const id = this.props.id.replace(/ /g, '_');
        const simulation = GraphHelper.createForceSimulation(config.width, config.height);

        return {
            id,
            config,
            nodeIndexMapping,
            links,
            d3Links,
            nodes,
            d3Nodes,
            nodeHighlighted: false,
            simulation,
            graphDataChanged: false
        };
    }

    /**
     * Sets d3 tick function and configures other d3 stuff such as forces and drag events.
     */
    _graphForcesConfig() {
        this.state.simulation.nodes(this.state.d3Nodes).on('tick', this._tick);

        const forceLink = d3.forceLink(this.state.d3Links)
                            .id(l => l.id)
                            .distance(CONST.LINK_IDEAL_DISTANCE)
                            .strength(1);

        this.state.simulation.force(CONST.LINK_CLASS_NAME, forceLink);

        const customNodeDrag = d3.drag()
                                .on('start', this._onDragStart)
                                .on('drag', this._onDragMove)
                                .on('end', this._onDragEnd);

        d3.select(`#${this.state.id}-${CONST.GRAPH_WRAPPER_ID}`).selectAll('.node').call(customNodeDrag);
    }

    constructor(props) {
        super(props);

        if (!this.props.id) {
            throw Utils.throwErr(this.constructor.name, ERRORS.GRAPH_NO_ID_PROP);
        }

        this.state = this._initializeGraphState(this.props.data);
    }

    componentWillReceiveProps(nextProps) {
        const state = this._initializeGraphState(nextProps.data);
        const config = Utils.merge(DEFAULT_CONFIG, nextProps.config || {});

        this.setState({
            ...state,
            config,
            graphDataChanged: true
        });
    }

    componentDidUpdate() {
        // If some zoom config changed we want to apply possible new values for maxZoom and minZoom
        this._zoomConfig();

        // If the property staticGraph was activated we want to stop possible ongoing simulation
        this.state.config.staticGraph && this.state.simulation.stop();

        if (!this.state.config.staticGraph && this.state.graphDataChanged) {
            this._graphForcesConfig();
            this.state.graphDataChanged = false;
        }
    }

    componentDidMount() {
        if (!this.state.config.staticGraph) {
            this._graphForcesConfig();
        }

        // Graph zoom and drag&drop all network
        this._zoomConfig();
    }

    render() {
        const { nodes, links } = GraphHelper.buildGraph(
            this.state.nodes,
            {
                onClickNode: this.props.onClickNode,
                onMouseOverNode: this.onMouseOverNode,
                onMouseOut: this.onMouseOutNode
            },
            this.state.links,
            { onClickLink: this.props.onClickLink },
            this.state.config,
            this.state.nodeHighlighted
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
