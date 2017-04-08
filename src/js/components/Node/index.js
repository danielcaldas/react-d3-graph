import React from 'react';

import * as d3 from 'd3';

import CONST from './const';

import NodeHelper from './helper';

export default class Node extends React.Component {
    constructor(props) {
        super(props);

        this.pathProps = {
            d: NodeHelper.buildSvgSymbol(this.props.size, this.props.type),
            cursor: this.props.cursor,
            fill: this.props.fill,
            strokeWidth: this.props.strokeWidth,
            stroke: this.props.stroke,
            opacity: this.props.opacity
        };

        this.state = {
            cx: this.props.cx.toString(),
            cy: this.props.cy.toString()
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.cx !== this.props.cx || nextProps.cy !== this.props.cy) {
            this.setState({
                cx: nextProps.cx,
                cy: nextProps.cy
            });
        }
    }

    /**
     * This function delegates the action of node click to the parent component. It only passes
     * as argument the id of the clicked node to the callback function (for that it is mandatory that each node
     * has a unique id for proper action handling accessing node data in the graph data structure if needed).
     * @return {undefined}
     */
    handleOnClickNode = () => this.props.onClickNode && this.props.onClickNode(this.props.id);

    /**
     * This functions calls a callback that will handle the event of mouse over some node in the graph.
     * @return {undefined}
     */
    handleOnMouseOverNode = () => this.props.onMouseOverNode && this.props.onMouseOverNode(this.props.id);

    render() {
        const gProps = {
            className: this.props.className,
            cx: this.state.cx,
            cy: this.state.cy,
            id: this.props.id,
            onClick: this.handleOnClickNode,
            onMouseOver: this.handleOnMouseOverNode,
            transform: `translate(${this.state.cx},${this.state.cy})`
        };

        const textProps = {
            dx: `${this.props.labelTextDx}em`, // @TODO: This value is being poorly calculated
            dy: CONST.NODE_LABEL_DY,
            style: {
                fontSize: `${this.props.fontSize}px`,
                fontWeight: CONST.FONT_WEIGHT,
                opacity: this.props.opacity
            }
        };

        return (
            <g {...gProps}>
                <path {...this.pathProps}/>
                {this.props.renderLabel && <text {...textProps}>{this.props.label}</text>}
            </g>
        );
    }
}
