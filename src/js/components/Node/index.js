import React from 'react';

import * as d3 from 'd3';

import CONST from './const';

import NodeHelper from './helper';

export default class Node extends React.Component {
    constructor(props) {
        super(props);

        this.symbol = NodeHelper.buildSvgSymbol(this.props.size, this.props.type);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.cx !== this.props.cx || nextProps.cy !== this.props.cy;
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
    handleOnMouseOut = () => this.props.onMouseOut && this.props.onMouseOut(this.props.id);

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
            d: this.symbol,
            fill: this.props.fill,
            onClick: this.handleOnClickNode,
            onMouseOut: this.handleOnMouseOut,
            onMouseOver: this.handleOnMouseOverNode,
            opacity: this.props.opacity,
            stroke: this.props.stroke,
            strokeWidth: this.props.strokeWidth
        };

        const textProps = {
            dx: `${this.props.labelTextDx}em`, // @TODO: This value is being poorly calculated
            dy: CONST.NODE_LABEL_DY,
            fontSize: this.props.fontSize,
            fontWeight: this.props.fontWeight
        };

        return (
            <g {...gProps}>
                <path {...pathProps}/>
                {this.props.renderLabel && <text {...textProps}>{this.props.label}</text>}
            </g>
        );
    }
}
