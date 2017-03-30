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
        /*----------------------------------------
            Some helper functions
        ----------------------------------------*/
        function isNumber(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        }

        function tick() {
            node.attr('transform', function(d) {
                return 'translate(' + d.x + ',' + d.y + ')';
            });
            text.attr('transform', function(d) {
                return 'translate(' + d.x + ',' + d.y + ')';
            });

            link.attr('x1', function(d) {
                return d.source.x;
            }).attr('y1', function(d) {
                return d.source.y;
            }).attr('x2', function(d) {
                return d.target.x;
            }).attr('y2', function(d) {
                return d.target.y;
            });

            node.attr('cx', function(d) {
                return d.x;
            }).attr('cy', function(d) {
                return d.y;
            });
        }

        /**
         * Converts a string that specifies a symbol into a concrete instance
         * of d3 symbol.
         * {@link https://github.com/d3/d3-shape/blob/master/README.md#symbol}
         * @param  {string} [typeName=CONST.SYMBOLS.CIRCLE] - the string that specifies the symbol type.
         * @return {Object} concrete instance of d3 symbol.
         */
        function convertTypeToD3Symbol(typeName=CONST.SYMBOLS.DIAMOND) {
            switch (typeName) {
                case CONST.SYMBOLS.CIRCLE:
                    return d3.symbolCircle;
                case CONST.SYMBOLS.CROSS:
                    return d3.symbolCross;
                case CONST.SYMBOLS.DIAMOND:
                    return d3.symbolDiamond;
                case CONST.SYMBOLS.SQUARE:
                    return d3.symbolSquare;
                case CONST.SYMBOLS.STAR:
                    return d3.symbolStar;
                case CONST.SYMBOLS.TRIANGLE:
                    return d3.symbolTriangle;
                case CONST.SYMBOLS.WYE:
                    return d3.symbolWye;
            }
        }

        function buildSvgSymbol(config) {
            return d3.symbol()
                     .type((d) => convertTypeToD3Symbol(d.type))
                     .size((d) => Math.PI * Math.pow(size(d.size) || config.defaultNodeSize, 2));
        }

        function strokeStyle(d) {
            return isNumber(d.score) && d.score >= 0 ? color(d.score) : config.defaultLinkColor;
        }

        /*----------------------------------------
            Drag & Drop
         ----------------------------------------*/
        function dragstart(d) {
            if (!d3.event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragmove(d) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }

        function dragend(d) {
            // if (!d3.event.active) simulation.alphaTarget(0);
            // Set this to null and you will see dragged node trying to comeback to initial position
            if (!config.nodeFixedAfterDropped) {
                d.fx = null;
                d.fy = null;
            }
        }

        /*----------------------------------------*/


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

        const svgStyle = {
            border: '1px solid black',
            cursor: 'move',
            height: config.height,
            width: config.width
        };

        console.log('Nodes', nodes.length);
        console.log('Links', links.length);

        // Now... shit just got serious
        let svg = d3.select('body').append('svg');
        let g = svg.append('g');

        /*----------------------------------------
            Node Drag
         ----------------------------------------*/
        const customNodeDrag = d3.drag().on('start', dragstart).on('drag', dragmove).on('end', dragend);

        g.selectAll('.node').data(graph.nodes).enter().append('g').attr('class','node').call(customNodeDrag);

        /*----------------------------------------
            Graph forceSimulation
         ----------------------------------------*/
         const forceX = d3.forceX(config.width / 2).strength(.05);
         const forceY = d3.forceY(config.height / 2).strength(.05);
         const simulation = d3.forceSimulation();

         simulation.force('link', d3.forceLink().distance(() => CONST.LINK_IDEAL_DISTANCE))
         .force('charge', d3.forceManyBody().strength(CONST.FORCE_IDEAL_STRENGTH))
         .force('x', forceX)
         .force('y', forceY);
        //  simulation.nodes(graph.nodes).on('tick', tick);
        //  simulation.force('link').links(graph.links);


        return (
            <svg style={svgStyle}>
                <g>
                    {links}
                    {nodes}
                </g>
            </svg>
        );
    }
}
