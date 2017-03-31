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

        let graph = _has(this, 'props.data') && this.props.data || {};
        let config = DEFAULT_CONFIG;
        if (_has(this, 'props.config')) {
            config = _merge(config, this.props.config);
        }

        // @TODO: state
        let coords = {};

        graph.nodes.forEach(d => {
            coords[d.id] = {x: d.x, y: d.y};
        });

        const forceX = d3.forceX(config.width / 2).strength(.05);
        const forceY = d3.forceY(config.height / 2).strength(.05);
        const simulation = d3.forceSimulation();

        simulation.force('link', d3.forceLink().distance(() => CONST.LINK_IDEAL_DISTANCE))
        .force('charge', d3.forceManyBody().strength(CONST.FORCE_IDEAL_STRENGTH))
        .force('x', forceX)
        .force('y', forceY);

        this.state = {
            graphRendered: false,
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

        if (!this.state.graphRendered) {
            this.state.static.simulation.nodes(this.state.nodes).on('tick', this.tick);
            this.state.static.simulation.force('link').links(this.state.links);

            this.setState({
                ...this.state,
                graphRendered: true
            });
        }
    }

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
            // console.log('tick');
            // let coords = {};
            // this.state.nodes.forEach(d => {
            //     coords[d.id] = {x: d.x, y: d.y};
            // });
            // // console.log(coords[0]);
            this.forceUpdate();
        }
    }

    render() {
        const nodes = this.state.nodes.map(d => {
            const props = {
                cx: d.x.toString(),
                cy: d.y.toString(),
                id: d.id.toString(),
                label: d[this.state.config.labelProperty] || d.id.toString(),
                labelTextSize: this.state.config.defaultTextSize,
                nodeLabelTextCenter: false,
                radius: d.size || this.state.config.defaultNodeSize
            };

            return <Node key={d.id.toString()} {...props} />;
        });

        const links = this.state.links.map(l => {
            const key = `${l.source.id || l.source},${l.target.id || l.target}`;

            // @TODO: state
            const props = {
                link: {
                    x1: l.source.x || this.state.coords[l.source].x.toString(),
                    y1: l.source.y || this.state.coords[l.source].y.toString(),
                    x2: l.target.x || this.state.coords[l.target].x.toString(),
                    y2: l.target.y || this.state.coords[l.target].y.toString()
                }
            };

            return <Link key={key} {...props} />;
        });

        const svgStyle = {
            border: '1px solid black',
            height: this.state.config.height,
            width: this.state.config.width
        };

        return (
            <div>
                <button onClick={this.pauseOrPlaySimulation}>Pause/Play propagation</button>
                <svg style={svgStyle}>
                    <g id='graph-container'>
                        {links}
                        {nodes}
                    </g>
                </svg>
            </div>
        );
    }
}
