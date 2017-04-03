import React from 'react';
import * as d3 from 'd3';

import CONST from './const';
import STYLES from './styles';

export default class Node extends React.Component {
    constructor(props) {
        super(props);

         const context = d3.path();
         context.arc(0, 0, this.props.radius, CONST.ARC.START_ANGLE, CONST.ARC.END_ANGLE);

         // @TODO: Check for labelTextCenter property for centering text

         // @TODO: Make path style fill or outline
         const pathProps = {
             d: context,
             style: STYLES.pathStyle
         };

         const textProps = {
             dy: '.35em',
             dx: this.props.labelTextSize,
             style: STYLES.textStyle
         };

        this.state = {
            id: this.props.id,
            cx: this.props.cx.toString(),
            cy: this.props.cy.toString(),
            onMouseOverNode: this.props.onMouseOverNode,
            onClickNode: this.props.onClickNode,
            pathProps,
            textProps
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

        return (
            <g {...gProps}>
                <path {...this.state.pathProps}/>
                <text {...this.state.textProps}>{this.props.label}</text>
            </g>
        );
    }
}
