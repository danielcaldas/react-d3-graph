import React from 'react';
import * as d3 from 'd3';
import { has as _has, merge as _merge } from 'lodash';

import DEFAULT_CONFIG from './graph.config';

export default class Graph extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        // Assigining passed properties
        let graph = _has(this, 'props.data') && this.props.data || {};
        let config = DEFAULT_CONFIG;
        if (_has(this, 'props.config')) {
            config = _merge(config, this.props.config);
        }

        // Helper functions -----------------------------------
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

        // START - Drag & Drop ----------------------------------------
        function dragstart(d) {
            simulation.stop();
        }

        function dragmove(d) {
            d.px += d3.event.dx;
            d.py += d3.event.dy;
            d.x += d3.event.dx;
            d.y += d3.event.dy;
            tick();
        }

        function dragend(d) {
            d.fixed = true;
            tick();
        }
        // END - Drag & Drop ----------------------------------------

        console.log(d3);
        let color = d3.scaleLinear().domain([config.minScore, (config.minScore + config.maxScore) / 2, config.maxscore]).range(['lime', 'yellow', 'red']);
        let size = d3.scalePow().exponent(1).domain([1, 100]).range([8, 24]);
        // New force API since d3 4.0.0 ...
        // let force = d3.force().gravity(.05).linkDistance(100).charge(-100).size([config.width, config.height]);
        // @TODO: Missing width and height on svg
        let svg = d3.select('body').append('svg');
        let zoom = d3.zoom().scaleExtent([config.minZoom, config.maxZoom]);

        svg.style('cursor', 'move');
        svg.style('width', config.width);
        svg.style('height', config.height);
        svg.style('border', '1px solid black');
        let g = svg.append('g');

        let circle;
        let text;
        let link;
        let node;
        let tocolor = 'fill';
        let towhite = 'stroke';

        let linkedByIndex = {};
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

        // @TODO: Missing shape type (shape) attribute on d3.symbol
        circle = node
            .append('path')
            .attr('d', d3.symbol().size((d) =>  Math.PI * Math.pow(size(d.size) || config.defaultNodeSize, 2)))
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

        // @TODO: Not working. Force is not yet created with the correct parameters
        /* simulation API
        alpha
        alphaDecay
        alphaMin
        alphaTarget
        find
        (x, y, radius)
        force
        nodes
        on
        restart()
        stop()
        tick
        tick()
        velocityDecay
         */
        var simulation = d3.forceSimulation()
            .force('link', d3.forceLink().id(function(d) { return d.id; }))
            .force('charge', d3.forceManyBody())
            .force('center', d3.forceCenter(config.width, config.height));

        simulation.nodes(graph.nodes).on('tick', tick);
        simulation.force('link').links(graph.links);

        return (
            <g/>
        );
    }
}
