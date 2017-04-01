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
        if (_.has(this, 'props.config')) {
            config = _.merge(config, this.props.config);
        }

        // @TODO: coords will eventually disapear since it is only a reconstruction
        // of nodes for access convenience (mapping ids and coords key value pair)
        let coords = {};
        graph.nodes.forEach(d => coords[d.id] = {x: d.x, y: d.y});

        // @TODO: forceX and forceY configurable
        const forceX = d3.forceX(config.width / 2).strength(.06);
        const forceY = d3.forceY(config.height / 2).strength(.06);
        const simulation = d3.forceSimulation();

        simulation.force('link', d3.forceLink().distance(() => CONST.LINK_IDEAL_DISTANCE))
                .force('charge', d3.forceManyBody().strength(CONST.FORCE_IDEAL_STRENGTH))
                .force('x', forceX)
                .force('y', forceY);

        this.state = {
            paused: false,
            config,
            nodes: graph.nodes,
            coords,
            links: graph.links,
            static: {
                simulation
            }
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        // console.log('shouldComponentUpdate', nextProps, nextState);
        return !this.state.paused;
    }

    componentWillReceiveProps(nextProps) {
        // console.log('componentWillReceiveProps', nextProps);
    }

    componentDidUpdate(prevProps, prevState) {
        // console.log('componentDidUpdate', prevProps, prevState);
    }

    componentWillMount() {
        // console.log('componentWillMount');
    }

    componentDidMount() {
        // Start simulation forces
        this.state.static.simulation.nodes(this.state.nodes).on('tick', this.tick);
        this.state.static.simulation.force('link').links(this.state.links);

        // Graph zoom and drag&drop all network
        d3.select(`#${CONST.GRAPH_WRAPPER_ID}`).call(d3.zoom().scaleExtent([1 / 2, 8]).on('zoom', this.zoomed));

        const customNodeDrag = d3.drag()
                                .on('start', this.onDragStart)
                                .on('drag', this.onDragMove);

        d3.selectAll('.node').call(customNodeDrag);
    }

    // @TODO: Do proper set up of graph state or whatever before starting dragging
    onDragStart = (e,id) => {
        console.log('onDragStart');
    }

    // @TODO: This code does not lives up to my quality standards
    onDragMove = (e, id) => {
        // @TODO: I dare u to find a more uneficient way to do this!
        let draggedNode = _.find(this.state.nodes, d => d.id === id);

        draggedNode.x += d3.event.dx;
        draggedNode.y += d3.event.dy;

        // let nodes = Object.assign([], this.state.nodes);
        //
        // nodes[id] = draggedNode;

        this.setState({
            ...this.state
        });
    }

    zoomed = () => d3.selectAll(`#${CONST.GRAPH_CONTAINER_ID}`).attr('transform', d3.event.transform);

    /**
    * simulation.restart() [https://github.com/d3/d3-force/blob/master/src/simulation.js#L80]
    * imulation.stop() [https://github.com/d3/d3-force/blob/master/src/simulation.js#L84]
    * @return {[type]} [description]
    */
    pauseOrPlaySimulation = () => {
        this.state.paused ? this.state.static.simulation.restart() : this.state.static.simulation.stop();

        this.setState({
            ...this.state,
            paused: !this.state.paused
        });
    }

    tick = () => {
        if (!this.state.paused) {
            // @TODO: Optimize this call
            this.forceUpdate();
        }
    }

    render() {
        const { nodes, links } = GraphHelper.buildGraph(
            this.state.nodes,
            this.state.links,
            this.state.coords,
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
