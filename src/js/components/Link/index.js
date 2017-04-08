import React from 'react';

export default class Link extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            x1: this.props.x1,
            x2: this.props.x2,
            y1: this.props.y1,
            y2: this.props.y2
        };
    }

    componentWillReceiveProps(nextProps) {
        const update = nextProps.x1 !== this.state.x1 || nextProps.y1 !== this.state.y1
                    || nextProps.x2 !== this.state.x2 || nextProps.y2 !== this.state.y2;

        if (update) {
            this.setState({
                x1: nextProps.x1,
                y1: nextProps.y1,
                x2: nextProps.x2,
                y2: nextProps.y2,
            });
        }
    }

    /**
     * Handle click action in some link between two nodes. It calls a callback passed by parent component
     * and it passes two parameters, the identifiers of the source and target nodes in the relation.
     * @return {undefined}
     */
    handleOnClickLink = () => {
        if (this.props.onClickLink) {
            this.props.onClickLink(this.props.source, this.props.target);
        }
    }

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
            x1: this.state.x1,
            x2: this.state.x2,
            y1: this.state.y1,
            y2: this.state.y2
        };

        return (
            <line {...lineProps}/>
        );
    }
}
