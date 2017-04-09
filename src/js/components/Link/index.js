import React from 'react';

export default class Link extends React.Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.x1 !== this.props.x1 || nextProps.y1 !== this.props.y1
            || nextProps.x2 !== this.props.x2 || nextProps.y2 !== this.props.y2
            || nextProps.opacity !== this.props.opacity
            || nextProps.color !== this.props.color
            || nextProps.stroke !== this.props.stroke
            || nextProps.strokeWidth !== this.props.strokeWidth;
    }

    /**
     * Handle link click event.
     * @return {undefined}
     */
    handleOnClickLink = () => this.props.onClickLink && this.props.onClickLink(this.props.source, this.props.target);

    render() {
        const lineStyle = {
            strokeWidth: this.props.strokeWidth,
            stroke: this.props.stroke,
            opacity: this.props.opacity
        };

        const lineProps = {
            className: this.props.className,
            onClick: this.handleOnClickLink,
            style: lineStyle,
            x1: this.props.x1,
            x2: this.props.x2,
            y1: this.props.y1,
            y2: this.props.y2
        };

        return (
            <line {...lineProps}/>
        );
    }
}
