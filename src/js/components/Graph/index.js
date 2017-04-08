import React from 'react';

import * as d3 from 'd3';

import CONST from './const';
import DEFAULT_CONFIG from '../Graph/config';

import GraphHelper from './helper';
import Utils from '../../utils';

// @TODO: When node dragged out of bouds the graph gets repainted
export default class Graph extends React.Component {
    constructor(props) {
        super(props);

        let graph = this.props.data || {};
        let config = Utils.merge(DEFAULT_CONFIG, this.props.config);

        // @TODO: meanwhile i searched on previous code version and observed that this coords
        // a similar data structure will be needed to check link connections e.g linkedByIndex
        const coords = GraphHelper.buildNodeCoords(graph.nodes);
        const linkedByIndex = GraphHelper.mapLinksByNodeIds(graph.links);

        console.log(linkedByIndex);

        const forceX = d3.forceX(config.width / 2).strength(CONST.FORCE_X);
        const forceY = d3.forceY(config.height / 2).strength(CONST.FORCE_Y);

        const simulation = d3.forceSimulation()
                .force('charge', d3.forceManyBody().strength(CONST.FORCE_IDEAL_STRENGTH))
                .force('x', forceX)
                .force('y', forceY);

        this.state = {
            config,
            nodes: graph.nodes,
            links: graph.links,
            static: {
                coords,
                simulation
            }
        };
    }

    componentDidMount() {
        if (!this.state.config.staticGraph) {
            this.state.static.simulation.nodes(this.state.nodes).on('tick', this._tick);

            const forceLink = d3.forceLink(this.state.links)
                                .distance(CONST.LINK_IDEAL_DISTANCE)
                                .strength(1);

            this.state.static.simulation.force(CONST.LINK_CLASS_NAME, forceLink);

            const customNodeDrag = d3.drag()
                                    .on('start', this._onDragStart)
                                    .on('drag', this._onDragMove)
                                    .on('end', this._onDragEnd);

            d3.selectAll('.node').call(customNodeDrag);
        }

        // Graph zoom and drag&drop all network
        d3.select(`#${CONST.GRAPH_WRAPPER_ID}`).call(d3.zoom().scaleExtent([this.state.config.minZoom, this.state.config.maxZoom]).on('zoom', this._zoomed));
    }

    // @TODO: Do proper set up of graph state or whatever before starting dragging
    _onDragStart = (_e, id) => !this.state.config.staticGraph && this.state.static.simulation.stop();

    // @TODO: This code does not lives up to my quality standards
    _onDragMove = (_e, id) => {
        // @TODO: Should state be altered like this?
        // @TODO: I dare u to find a more uneficient way to do this!

        // This is where d3 and react bind
        // @TODO: See performance of Array find.
        let draggedNode = this.state.nodes.find(d => d.id === id);

        draggedNode.x += d3.event.dx;
        draggedNode.y += d3.event.dy;

        // Set nodes fixing coords fx and fy
        draggedNode.fx = draggedNode.x;
        draggedNode.fy = draggedNode.y;

        !this.state.config.staticGraph && this._tick();
    }

    _onDragEnd = (_e, id) => !this.state.config.staticGraph
                            && this.state.config.automaticRearrangeAfterDropNode
                            && this.state.static.simulation.alphaTarget(0.05).restart();

    _zoomed = () => d3.selectAll(`#${CONST.GRAPH_CONTAINER_ID}`).attr('transform', d3.event.transform);

    _tick = () => this.forceUpdate();

    // @TODO: Just for demo purposes, in future remove from component
    unStickFixedNodes = () => {
        // .map only returns shallow clone of nodes
        let nodes = this.state.nodes.map(d => {
            if (d.fx && d.fy) {
                Reflect.deleteProperty(d, 'fx');
                Reflect.deleteProperty(d, 'fy');
            }
            return d;
        });

        this.state.static.simulation.alphaTarget(0.05).restart();

        this.setState({
            nodes
        });
    }

    /**
    * simulation.stop() [https://github.com/d3/d3-force/blob/master/src/simulation.js#L84]
    */
    pauseSimulation = () => this.state.static.simulation.stop();

    /**
     * simulation.restart() [https://github.com/d3/d3-force/blob/master/src/simulation.js#L80]
     */
    restartSimulation = () => this.state.static.simulation.restart();

    // Event handlers
    onClickNode = (node) => console.log('you clicked on node with id', node);

    onClickLink = (source, target) => console.log('you click in the connection between node', source, 'and', target);

    onMouseOverNode = (node) => {

        console.log('mouse is over node with id', node);
    }

    onMouseOut = (node) => {
        console.log('mouse is out of node with id', node);
    }

    render() {
        const { nodes, links } = GraphHelper.buildGraph(
            this.state.nodes,
            { onClickNode: this.onClickNode, onMouseOverNode: this.onMouseOverNode, onMouseOut: this.onMouseOut},
            this.state.links,
            { onClickLink: this.onClickLink },
            this.state.static.coords,
            this.state.config
        );

        const svgStyle = {
            border: '1px solid black',
            height: this.state.config.height,
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
