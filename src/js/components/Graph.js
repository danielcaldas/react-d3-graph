import React from 'react';
import * as d3 from 'd3';
import { has as _has, merge as _merge } from 'lodash';

import CONST from './const';
import DEFAULT_CONFIG from './graph.config';

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

        let circle;
        let link;
        let linkedByIndex = {};
        let node;
        let text;
        let tocolor = 'fill';
        let towhite = 'stroke';

        let color = d3.scaleLinear().domain([config.minScore, (config.minScore + config.maxScore) / 2, config.maxscore]).range(['lime', 'yellow', 'red']);
        let size = d3.scalePow().exponent(1).domain([1, 100]).range([8, 24]);
        let svg = d3.select('body').append('svg');

        svg.style('cursor', 'move');
        svg.style('width', config.width);
        svg.style('height', config.height);
        svg.style('border', '1px solid black');
        let g = svg.append('g');

        if (_has(graph, 'links')) {
            for (let d of graph.links) {
                linkedByIndex[`${d.source},${d.target}`] = true
            }
        }

        function strokeStyle(d) {
            return isNumber(d.score) && d.score >= 0 ? color(d.score) : config.defaultLinkColor;
        }

        link = g.selectAll('.link')
                .data(graph.links)
                .enter()
                .append('line').attr('class', 'link').style('stroke-width', config.strokeThickness).style('stroke', strokeStyle);

        const customNodeDrag = d3.drag()
                                .on('start', dragstart)
                                .on('drag', dragmove)
                                .on('end', dragend);

        node = g.selectAll('.node').data(graph.nodes).enter().append('g').attr('class', 'node').call(customNodeDrag);

        if (config.outline) {
            tocolor = 'stroke';
            towhite = 'fill';
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
                break;
                case CONST.SYMBOLS.CROSS:
                return d3.symbolCross;
                break;
                case CONST.SYMBOLS.DIAMOND:
                return d3.symbolDiamond;
                break;
                case CONST.SYMBOLS.SQUARE:
                return d3.symbolSquare;
                break;
                case CONST.SYMBOLS.STAR:
                return d3.symbolStar;
                break;
                case CONST.SYMBOLS.TRIANGLE:
                return d3.symbolTriangle;
                break;
                case CONST.SYMBOLS.WYE:
                return d3.symbolWye;
                break;
            }
        }

        function buildSvgSymbol(config) {
            return d3.symbol()
                     .type((d) => convertTypeToD3Symbol(d.type))
                     .size((d) => Math.PI * Math.pow(size(d.size) || config.defaultNodeSize, 2));
        }

        circle = node
            .append('path')
            .attr('d', buildSvgSymbol(config))
            .style(tocolor, (d) => {
                if (d && d.color) {
                    return d.color;
                }
                return isNumber(d.score) && d.score >= 0 ? color(d.score) : config.defaultNodeColor;
            })
            .style('stroke-width', config.strokeThickness)
            .style(towhite, 'white');

        text = g.selectAll('.text').data(graph.nodes).enter().append('text').attr('dy', '.35em').style('font-size', config.defaultTextSize + 'px');

        if (config.textCenter) {
            text.text((d) => d.id).style('text-anchor', 'middle');
        } else {
            text.attr('dx', (d) => size(d.size) || config.defaultNodeSize)
                .text((d) => d[config.labelProperty] ? '\u2002' + d[config.labelProperty] : '\u2002' + d.id);
        }

        const forceX = d3.forceX(config.width / 2).strength(.05);
        const forceY = d3.forceY(config.height / 2).strength(.05);

        const simulation = d3.forceSimulation();

        simulation.force('link', d3.forceLink().distance(() => CONST.LINK_IDEAL_DISTANCE))
        .force('charge', d3.forceManyBody().strength(CONST.FORCE_IDEAL_STRENGTH))
        .force('x', forceX)
        .force('y', forceY);

        simulation.nodes(graph.nodes).on('tick', tick);
        simulation.force('link').links(graph.links);

        return (
            <g/>
        );
    }
}
