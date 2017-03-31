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
            pathProps,
            textProps
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.cx !== this.props.cx || nextProps.cy !== this.props.cy) {
            this.setState({
                ...this.state,
                cx: nextProps.cx,
                cy: nextProps.cy
            });
        }
    }

    // @TODO
    // shouldComponentUpdate(nextProps, nextState)

    // @TODO this is a callback
    clickNode() {
        console.log('you clicked the node');
    }

    // @TODO this is a callback
    mouseOverNode() {
        console.log('the mouse is over the node');
    }

    render() {
        const gProps = {
            id: this.props.id,
            className: 'node',
            transform: `translate(${this.state.cx},${this.state.cy})`,
            cx: this.state.cx,
            cy: this.state.cy,
            onClick: this.clickNode,
            onMouseOver: this.mouseOverNode,
        };

        return (
            <g  {...gProps}>
                <path {...this.state.pathProps}/>
                <text {...this.state.textProps}>{this.props.label}</text>
            </g>
        );
    }
}
