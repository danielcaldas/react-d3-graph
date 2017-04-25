import React from 'react';

import CONST from './const';

import NodeHelper from './helper';

/**
 * Node component is responsible for encapsulating node render.
 * @example
 * const onClickNode = function(nodeId) {
 *      window.alert('Clicked node', nodeId);
 * };
 *
 * const onMouseOverNode = function(nodeId) {
 *      window.alert('Mouse over node', nodeId);
 * };
 *
 * const onMouseOutNode = function(nodeId) {
 *      window.alert('Mouse out node', nodeId);
 * };
 *
 * <Node
 *     id='nodeId'
 *     cx=22
 *     cy=22
 *     fill='green'
 *     fontSize=10
 *     fontWeight='normal'
 *     label='label text'
 *     opacity=1
 *     renderLabel=true
 *     size=200
 *     stroke='none'
 *     strokeWidth=1.5
 *     type='square'
 *     className='node'
 *     onClickNode={onClickNode}
 *     onMouseOverNode={onMouseOverNode}
 *     onMouseOutNode={onMouseOutNode} />
 */
export default class Node extends React.Component {
    /**
     * Handle click on the node.
     * @return {undefined}
     */
    handleOnClickNode = () => this.props.onClickNode && this.props.onClickNode(this.props.id);

    /**
     * Handle mouse over node event.
     * @return {undefined}
     */
    handleOnMouseOverNode = () => this.props.onMouseOverNode && this.props.onMouseOverNode(this.props.id);

    /**
     * Handle mouse out node event.
     * @return {undefined}
     */
    handleOnMouseOutNode = () => this.props.onMouseOut && this.props.onMouseOut(this.props.id);

    shouldComponentUpdate(nextProps) {
        // Properties more likely to mutate are evaluated first to take advantage of short-circuit evaluation
        return nextProps.cx !== this.props.cx || nextProps.cy !== this.props.cy
              || nextProps.opacity !== this.props.opacity
              || nextProps.fill !== this.props.fill
              || nextProps.fontWeight !== this.props.fontWeight
              || nextProps.fontSize !== this.props.fontSize
              || nextProps.label !== this.props.label
              || nextProps.cursor !== this.props.cursor
              || nextProps.size !== this.props.size
              || nextProps.type !== this.props.type
              || nextProps.renderLabel !== this.props.renderLabel
              || nextProps.stroke !== this.props.stroke
              || nextProps.strokeWidth !== this.props.strokeWidth;
    }

    render() {
        const gProps = {
            className: this.props.className,
            cx: this.props.cx,
            cy: this.props.cy,
            id: this.props.id,
            transform: `translate(${this.props.cx},${this.props.cy})`
        };

        const pathProps = {
            cursor: this.props.cursor,
            d: NodeHelper.buildSvgSymbol(this.props.size, this.props.type),
            fill: this.props.fill,
            onClick: this.handleOnClickNode,
            onMouseOut: this.handleOnMouseOutNode,
            onMouseOver: this.handleOnMouseOverNode,
            opacity: this.props.opacity,
            stroke: this.props.stroke,
            strokeWidth: this.props.strokeWidth
        };

        const textProps = {
            dx: CONST.NODE_LABEL_DX,
            dy: CONST.NODE_LABEL_DY,
            fontSize: this.props.fontSize,
            fontWeight: this.props.fontWeight,
            opacity: this.props.opacity
        };

        return (
            <g {...gProps}>
                <path {...pathProps}/>
                {this.props.renderLabel && <text {...textProps}>{this.props.label}</text>}
            </g>
        );
    }
}
