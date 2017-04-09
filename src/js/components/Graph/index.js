import React from 'react';

import * as d3 from 'd3';

import CONST from './const';
import DEFAULT_CONFIG from '../Graph/config';

import GraphHelper from './helper';
import Utils from '../../utils';

// @TODO: When node dragged out of bouds the graph gets repainted
// @TODO: unify ids decide whether they are strings or int values
export default class Graph extends React.Component {
    constructor(props) {
        super(props);

        let graph = this.props.data || {};
        let config = Utils.merge(DEFAULT_CONFIG, this.props.config);

        let nodes = {};
        let links = {}; // Matrix of graph connections

        const coords = GraphHelper.buildNodeCoords(graph.nodes);

        graph.nodes.forEach(d => {
            d['highlighted'] = false;
            nodes[d.id] = d;
        });

        graph.links.forEach(d => {
            if (!links[d.source]) {
                links[d.source] = {};
            }
            if (!links[d.target]) {
                links[d.target] = {};
            }
            links[d.source][d.target] = true;
        });

        const forceX = d3.forceX(config.width / 2).strength(CONST.FORCE_X);
        const forceY = d3.forceY(config.height / 2).strength(CONST.FORCE_Y);

        const simulation = d3.forceSimulation()
                .force('charge', d3.forceManyBody().strength(CONST.FORCE_IDEAL_STRENGTH))
                .force('x', forceX)
                .force('y', forceY);

        this.simulation = simulation;
        this.coords = coords;
        this.config = config;

        // Disposable once component is mounted
        this.links = graph.links;
        this.nodes = graph.nodes;

        this.state = {
            links,
            nodes,
            nodeHighlighted: false
        };
    }

    componentDidMount() {
        if (!this.config.staticGraph) {
            this.simulation.nodes(this.nodes).on('tick', this._tick);

            const forceLink = d3.forceLink(this.links)
                                .distance(CONST.LINK_IDEAL_DISTANCE)
                                .strength(1);

            this.simulation.force(CONST.LINK_CLASS_NAME, forceLink);

            const customNodeDrag = d3.drag()
                                    .on('start', this._onDragStart)
                                    .on('drag', this._onDragMove)
                                    .on('end', this._onDragEnd);

            d3.selectAll('.node').call(customNodeDrag);
        }

        // Graph zoom and drag&drop all network
        d3.select(`#${CONST.GRAPH_WRAPPER_ID}`).call(d3.zoom().scaleExtent([this.config.minZoom, this.config.maxZoom]).on('zoom', this._zoomed));

        Reflect.deleteProperty(this, 'nodes');
        Reflect.deleteProperty(this, 'links');
    }

    // @TODO: Do proper set up of graph state or whatever before starting dragging
    _onDragStart = (_e, id) => !this.config.staticGraph && this.simulation.stop();

    // @TODO: This code does not lives up to my quality standards
    _onDragMove = (_e, id) => {
        // @TODO: Should state be altered like this?
        // @TODO: I dare u to find a more uneficient way to do this!

        // This is where d3 and react bind
        // @TODO: See performance of Array find.
        // let draggedNode = this.state.nodes.find(d => d.id === id);
        let draggedNode = this.state.nodes[id];

        draggedNode.x += d3.event.dx;
        draggedNode.y += d3.event.dy;

        // Set nodes fixing coords fx and fy
        draggedNode.fx = draggedNode.x;
        draggedNode.fy = draggedNode.y;

        !this.config.staticGraph && this._tick();
    }

    _onDragEnd = (_e, id) => !this.config.staticGraph
                            && this.config.automaticRearrangeAfterDropNode
                            && this.simulation.alphaTarget(0.05).restart();

    _zoomed = () => d3.selectAll(`#${CONST.GRAPH_CONTAINER_ID}`).attr('transform', d3.event.transform);

    _tick = () => this.forceUpdate();

    // @TODO: Just for demo purposes, in future remove from component
    unStickFixedNodes = () => {
        // .map only returns shallow clone of nodes
        let nodes = Object.values(this.state.nodes).map(d => {
            if (d.fx && d.fy) {
                Reflect.deleteProperty(d, 'fx');
                Reflect.deleteProperty(d, 'fy');
            }
            return d;
        });

        this.simulation.alphaTarget(0.08).restart();

        this.setState({
            nodes
        });
    }

    /**
    * simulation.stop() [https://github.com/d3/d3-force/blob/master/src/simulation.js#L84]
    */
    pauseSimulation = () => this.simulation.stop();

    /**
     * simulation.restart() [https://github.com/d3/d3-force/blob/master/src/simulation.js#L80]
     */
    restartSimulation = () => this.simulation.restart();

    /*--------------------------------------------------
        Event Handlers (@TODO: expose as a Graph component callback, they will disapear from here)
     --------------------------------------------------*/
    onClickNode = (node) => window.alert(`clicked node ${node}`);

    onClickLink = (source, target) => window.alert(`clicked link between ${source} and ${target}`);

    onMouseOverNode = (node) => {
        const nodeId = parseInt(node, 10);
        this._setHighlighted(nodeId, true);
    }

    onMouseOut = (node) => {
        const nodeId = parseInt(node, 10);
        this._setHighlighted(nodeId, false);
    }

    _setHighlighted(nodeId, value) {
        this.state.nodeHighlighted = value;
        this.state.nodes[nodeId].highlighted = value;

        if (this.state.links[nodeId]) {
            Object.keys(this.state.links[nodeId]).map(k => parseInt(k, 10)).forEach(k => {
                this.state.nodes[k].highlighted = value;
            });
        }

        this.forceUpdate();
    }

    render() {
        const { nodes, links } = GraphHelper.buildGraph(
            this.state.nodes,
            { onClickNode: this.onClickNode, onMouseOverNode: this.onMouseOverNode, onMouseOut: this.onMouseOut},
            this.state.links,
            { onClickLink: this.onClickLink },
            this.coords,
            this.config,
            this.state.nodeHighlighted
        );

        const svgStyle = {
            border: '1px solid black',
            height: this.config.height,
            width: '100%',
            marginTop: '25px'
        };

        // @TODO: Buttons in upper component
        return (
            <div id={CONST.GRAPH_WRAPPER_ID}>
                <button onClick={this.restartSimulation}>▶️</button>
                <button onClick={this.pauseSimulation}>⏸</button>
                <button onClick={this.unStickFixedNodes}>Unstick nodes</button>
                <svg style={svgStyle}>
                    <g id={CONST.GRAPH_CONTAINER_ID}>
                        {links}
                        {nodes}
                    </g>
                </svg>
            </div>
        );
    }
}
