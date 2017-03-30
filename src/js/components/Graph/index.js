import React from 'react';
import * as d3 from 'd3';
import { has as _has, merge as _merge } from 'lodash';

import CONST from './const';
import DEFAULT_CONFIG from '../Graph/graph.config';

import Node from '../Node/';

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

        const nodes = graph.nodes.map(d => {
            const props = {
                node: d,
                config
            };

            return <Node key={d.id.toString()} {...props} />;
        });

        const svgStyle = {
            border: '1px solid black',
            cursor: 'move',
            height: config.height,
            width: config.width
        };

        return (
            <svg style={svgStyle}>

                {nodes}
            </svg>
        );
    }
}
