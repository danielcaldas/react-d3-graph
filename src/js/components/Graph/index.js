import React from 'react';
import * as d3 from 'd3';
import { has as _has, merge as _merge } from 'lodash';

import CONST from './const';
import DEFAULT_CONFIG from '../Graph/config';

import GraphHelper from './helper';

export default class Graph extends React.Component {
    constructor(props) {
        super(props);

        let graph = _has(this, 'props.data') && this.props.data || {};
        let config = DEFAULT_CONFIG;
        if (_has(this, 'props.config')) {
            config = _merge(config, this.props.config);
        }

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
            graphRenderedFirstTime: false,
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
        // console.log('componentDidMount');
        // console.log('Nodes', this.state.nodes.length);
        // console.log('Links', this.state.links.length);

        if (!this.state.graphRenderedFirstTime) {
            this.state.static.simulation.nodes(this.state.nodes).on('tick', this.tick);
            this.state.static.simulation.force('link').links(this.state.links);

            // Graph zoom and drag&drop all network
            const svg = d3.select(`#${CONST.GRAPH_WRAPPER_ID}`);
            const transform = d3.zoomIdentity;
            svg.call(d3.zoom().scaleExtent([1 / 2, 8]).on('zoom', this.zoomed));

            this.setState({
                ...this.state,
                graphRenderedFirstTime: true
            });
        }
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
