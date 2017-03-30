import React from 'react';
import * as d3 from 'd3';

import CONST from './const';
import DEFAULT_CONFIG from '../graph.config';

export default class Node extends React.Component {
    constructor(props) {
        super(props);
    }

    clickNode() {
        console.log('you clicked the node');
    }

    mouseOverNode() {
        console.log('the mouse is over the node');
    }

    render() {
        /*

        const customNodeDrag = d3.drag().on('start', dragstart).on('drag', dragmove).on('end', dragend);

        node = g.selectAll('.node').data(graph.nodes).enter().append('g').attr('class', 'node').call(customNodeDrag);

        if (config.outline) {
            tocolor = 'stroke';
            towhite = 'fill';
        }

        node.append('path')
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

        // OUTPUT
        <g class="node" transform="translate(947.7981677565889,254.01685774013785)" cx="947.7981677565889" cy="254.01685774013785">
            <path d="M0,8A8,8 0 1,1 0,-8A8,8 0 1,1 0,8Z" style="fill: rgb(85, 247, 250); stroke-width: 1.5; stroke: white; opacity: 1;">
            </path>
        </g>

        <text dy=".35em" dx="8" transform="translate(947.7981677565889,254.01685774013785)" style="font-size: 9.99778px; font-weight: normal; opacity: 1;">&ensp;100000987214375</text>

         */
        const config = this.props.config;
                // path.arc(x, y, radius, startAngle, endAngle[, anticlockwise])
         /*----------------------------------------
            From above
         ----------------------------------------*/
         const cx = '435.04960405472997';
         const cy = '19.85853539086998';

         const pathX = 0;
         const pathY = 20;
         const radius = config.defaultNodeSize;

         const d = {
             id: 1,
             uid: 'some node'
         };

         const center = false;
         let dx = undefined;
         let labelText = '';

         /*----------------------------------------*/


        const context = d3.path();
        context.arc(pathX, pathY, radius, CONST.ARC.START_ANGLE, CONST.ARC.END_ANGLE);

        let textStyle = {
            fontSize: '10px',
            fontWeight: 'normal',
            opacity: 1
        };

        let pathStyle = {
            fill: 'rgb(85, 247, 250)',
            strokeWidth: 1.5,
            stroke: 'white',
            opacity: 1
        };

        if (center) {
            textStyle['textAnchor'] = 'middle';
        } else {
            // dx = size(d.size) || config.defaultNodeSize;
            // text = g.selectAll('.text').data(graph.nodes).enter().append('text').attr('dy', '.35em').style('font-size', config.defaultTextSize + 'px');
            dx = config.defaultNodeSize;
            labelText = d[config.labelProperty] ? '\u2002' + d[config.labelProperty] : '\u2002' + d.id;
        }

        let pathProps = {
            d: context,
            style: pathStyle
        };

        let textProps = {
            dy: '2.1em',
            dx: dx,
            style: textStyle
        };

        return (
            <g id='1' className='node' transform={`translate(${cx},${cy})`} cx={cx} cy={cy} onClick={this.clickNode} onMouseOver={this.mouseOverNode}>
                <path {...pathProps}/>
                <text {...textProps}>{labelText}</text>
            </g>
        );
    }
}
