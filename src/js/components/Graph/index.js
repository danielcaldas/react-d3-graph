import React from 'react';
import * as d3 from 'd3';
import * as _ from 'lodash';

import CONST from './const';
import DEFAULT_CONFIG from '../Graph/config';

import GraphHelper from './helper';

export default class Graph extends React.Component {
    constructor(props) {
        super(props);

        let graph = _.has(this, 'props.data') && this.props.data || {};
        let config = DEFAULT_CONFIG;
        // @TODO: The configs must be spreaded by component, use react component defaultProps for this
        if (_.has(this, 'props.config')) {
            config = _.merge(config, this.props.config);
        }

        // @TODO: coords will eventually disapear since it is only a reconstruction
        // of nodes for access convenience (mapping ids and coords key value pair)
        // @TODO: meanwhile i searched on previous code version and observed that this coords
        // a similar data structure will be needed to check link connections e.g linkedByIndex
        const coords = {};
        graph.nodes.forEach(d => coords[d.id] = {x: d.x, y: d.y});

        // @TODO: forceX and forceY configurable
        const forceX = d3.forceX(config.width / 2).strength(.06);
        const forceY = d3.forceY(config.height / 2).strength(.06);

        const simulation = d3.forceSimulation()
                .force('charge', d3.forceManyBody().strength(CONST.FORCE_IDEAL_STRENGTH))
                .force('x', forceX)
                .force('y', forceY);

        this.state = {
            paused: false,
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
        this.state.static.simulation.nodes(this.state.nodes).on('tick', this._tick);

        const forceLink = d3.forceLink(this.state.links)
                            .distance(CONST.LINK_IDEAL_DISTANCE)
                            .strength(1);

        this.state.static.simulation.force('link', forceLink);

        // Graph zoom and drag&drop all network
        d3.select(`#${CONST.GRAPH_WRAPPER_ID}`).call(d3.zoom().scaleExtent([1 / 2, 8]).on('zoom', this._zoomed));

        const customNodeDrag = d3.drag()
                                .on('start', this._onDragStart)
                                .on('drag', this._onDragMove)
                                .on('end', this._onDragEnd);

        d3.selectAll('.node').call(customNodeDrag);
    }

    // @TODO: Do proper set up of graph state or whatever before starting dragging
    _onDragStart = (_e, id) => {
        this.state.static.simulation.stop();
    }

    // @TODO: This code does not lives up to my quality standards
    _onDragMove = (_e, id) => {
        // @TODO: Should state be altered like this?
        // @TODO: I dare u to find a more uneficient way to do this!
        let draggedNode = _.find(this.state.nodes, d => d.id === id);

        draggedNode.x += d3.event.dx;
        draggedNode.y += d3.event.dy;

        // Set nodes fixing coords fx and fy
        draggedNode.fx = draggedNode.x;
        draggedNode.fy = draggedNode.y;

        this._tick();
    }

    _onDragEnd = (_e, id) => {
        this.state.static.simulation.alphaTarget(0.05).restart();
    }

    _zoomed = () => d3.selectAll(`#${CONST.GRAPH_CONTAINER_ID}`).attr('transform', d3.event.transform);

    /**
    * simulation.restart() [https://github.com/d3/d3-force/blob/master/src/simulation.js#L80]
    * imulation.stop() [https://github.com/d3/d3-force/blob/master/src/simulation.js#L84]
    * @return {[type]} [description]
    */
    pauseOrPlaySimulation = () => {
        this.state.paused ? this.state.static.simulation.restart() : this.state.static.simulation.stop();

        this.setState({
            paused: !this.state.paused
        });
    }

    _tick = () => {
        // console.log('tick', this.state.nodes[0].x, Date.now());
        this.forceUpdate();
    }

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

        this.setState({
            nodes
        });
    }

    render() {
        const { nodes, links } = GraphHelper.buildGraph(
            this.state.nodes,
            this.state.links,
            this.state.static.coords,
            this.state.config
        );

        const svgStyle = {
            border: '1px solid black',
            height: this.state.config.height,
            width: '100%',
            marginTop: '25px'
        };

        return (
            <div id={CONST.GRAPH_WRAPPER_ID}>
                <button onClick={this.pauseOrPlaySimulation}>Pause/Play propagation</button>
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
