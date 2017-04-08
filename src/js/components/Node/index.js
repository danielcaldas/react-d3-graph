import React from 'react';
import * as d3 from 'd3';

import CONST from './const';
import NodeHelper from './helper';

export default class Node extends React.Component {
    constructor(props) {
        super(props);

        // @TODO: Pass this onto parent component to not instatiate a d3.path for each node if possible.
        const context = NodeHelper.buildSvgSymbol(this.props.size, this.props.type);

        this.state = {
            id: this.props.id,
            cx: this.props.cx.toString(),
            cy: this.props.cy.toString(),
            context
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

    // @TODO: Check if component needs update
    // shouldComponentUpdate(nextProps, nextState)

    /**
     * This function delegates the action of node click to the parent component. It only passes
     * as argument the id of the clicked node to the callback function (for that it is mandatory that each node
     * has a unique id for proper action handling accessing node data in the graph data structure if needed).
     * @return {undefined}
     */
    handleOnClickNode = () => {
        if (this.state.onClickNode) {
            this.state.onClickNode(this.state.id);
        }
    }

    /**
     * This functions calls a callback that will handle the event of mouse over some node in the graph.
     * @return {undefined}
     */
    handleOnMouseOverNode = () => {
        if (this.state.onMouseOverNode) {
            this.state.onMouseOverNode(this.state.id);
        }
    }

    render() {
        const gProps = {
            id: this.props.id,
            className: 'node',
            transform: `translate(${this.state.cx},${this.state.cy})`,
            cx: this.state.cx,
            cy: this.state.cy,
            onClick: this.handleOnClickNode,
            onMouseOver: this.handleOnMouseOverNode
        };

        // @TODO: all properties are passed by the parent component
        // TIP: Obtain a cool node when set the fill property as white a other color for the border
        // it will seem like the node is more like a ring.
        const pathProps = {
            d: this.state.context,
            cursor: this.props.mouseCursor,
            fill: this.props.fill,
            strokeWidth: this.props.strokeWidth,
            stroke: this.props.stroke,
            opacity: this.props.opacity
        };

        // @TODO: Check for labelTextCenter property for centering text
        // @TODO: dx and dy calculated by me, expose fontSize and fontWeight
        const textProps = {
            dy: CONST.NODE_LABEL_DY,
            dx: `${this.props.labelTextDx}em`,
            style: {
                fontSize: `${this.props.labelTextSize}px`,
                fontWeight: CONST.FONT_WEIGHT,
                opacity: this.props.opacity
            }
        };

        return (
            <g {...gProps}>
                <path {...pathProps}/>
                <text {...textProps}>{this.props.label}</text>
            </g>
        );
    }
}
