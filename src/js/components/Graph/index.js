import React from 'react';
import * as d3 from 'd3';
import { has as _has, merge as _merge } from 'lodash';

import CONST from './const';
import DEFAULT_CONFIG from '../Graph/graph.config';

import Node from '../Node/';
import Link from '../Link/';

export default class Graph extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let graph = _has(this, 'props.data') && this.props.data || {};
        let config = DEFAULT_CONFIG;
        if (_has(this, 'props.config')) {
            config = _merge(config, this.props.config);
        }

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

        const svgStyle = {
            border: '1px solid black',
            cursor: 'move',
            height: config.height,
            width: config.width
        };

        console.log('Nodes', nodes.length);
        console.log('Links', links.length);

        return (
            <svg style={svgStyle}>
                {links}
                {nodes}
            </svg>
        );
    }
}
