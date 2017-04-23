import React from 'react';

import CONST from './const';

import NodeHelper from './helper';

export default class Node extends React.Component {
    // Properties more likely to mutate are evaluated first to take advantage of short-circuit evaluation
    shouldComponentUpdate(nextProps) {
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
