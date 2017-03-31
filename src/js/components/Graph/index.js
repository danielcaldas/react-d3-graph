import React from 'react';
import { connect } from 'react-redux';
import * as d3 from 'd3';
import { has as _has, merge as _merge } from 'lodash';

import CONST from './const';
import DEFAULT_CONFIG from '../Graph/graph.config';

import Node from '../Node/';
import Link from '../Link/';

export default class Graph extends React.Component {
    constructor(props) {
        super(props);
        console.log('constructor');

        let graph = _has(this, 'props.data') && this.props.data || {};
        let config = DEFAULT_CONFIG;
        if (_has(this, 'props.config')) {
            config = _merge(config, this.props.config);
        }

        // @TODO: state
        let nodesCoords = {};

        const nodes = graph.nodes.map(d => {
            const props = {
                node: d,
                config
            };

            nodesCoords[d.id] = {x: d.x, y: d.y};

            return <Node key={d.id.toString()} {...props} />;
        });

        const links = graph.links.map(l => {
            const key = `${l.source},${l.target}`;

            // @TODO: state
            const props = {
                link: {
                    x1: nodesCoords[l.source].x.toString(),
                    y1: nodesCoords[l.source].y.toString(),
                    x2: nodesCoords[l.target].x.toString(),
                    y2: nodesCoords[l.target].y.toString()
                },
                config
            };

            return <Link key={key} {...props} />;
        });

        const forceX = d3.forceX(config.width / 2).strength(.05);
        const forceY = d3.forceY(config.height / 2).strength(.05);
        const simulation = d3.forceSimulation();

        simulation.force('link', d3.forceLink().distance(() => CONST.LINK_IDEAL_DISTANCE))
        .force('charge', d3.forceManyBody().strength(CONST.FORCE_IDEAL_STRENGTH))
        .force('x', forceX)
        .force('y', forceY);

        this.state = {
            paused: true,
            config,
            nodes,
            nodesCoords,
            links,
            static: {
                simulation
            }
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('shouldComponentUpdate', nextProps, nextState);
        return this.state.paused;
    }

    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps', nextProps);
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('componentDidUpdate', prevProps, prevState);
    }

    componentWillMount() {
        console.log('componentWillMount');
    }

    componentDidMount() {
        console.log('componentDidMount');
        this.setState({
            paused: false
        });
    }

    pausePlay = () => {
        this.setState({
            paused: !this.state.paused
        });
    }

    tick = () => {
        console.log('tick');
    }

    render() {
        // @TODO
        // this.state.static.simulation.nodes(this.state.nodes).on('tick', this.tick);
        // this.state.static.simulation.force('link').links(this.state.links);

        const svgStyle = {
            border: '1px solid black',
            height: this.state.config.height,
            width: this.state.config.width
        };

        console.log('Nodes', this.state.nodes.length);
        console.log('Links', this.state.links.length);

        return (
            <div>
                <button onClick={this.pausePlay}>Pause/Play propagation</button>
                <svg style={svgStyle}>
                    <g id='graph-container'>
                        {this.state.links}
                        {this.state.nodes}
                    </g>
                </svg>
            </div>
        );
    }
}
