import React from 'react';

export default class Link extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            source: this.props.link.source,
            target: this.props.link.target,
            x1: this.props.link.x1,
            x2: this.props.link.x2,
            y1: this.props.link.y1,
            y2: this.props.link.y2,
            onClickLink: this.props.onClickLink
        };
    }

    componentWillReceiveProps(nextProps) {
        const update = nextProps.link.x1 !== this.state.x1 || nextProps.link.y1 !== this.state.y1
                    || nextProps.link.x2 !== this.state.x2 || nextProps.link.y2 !== this.state.y2;

        if (update) {
            this.setState({
                x1: nextProps.link.x1,
                y1: nextProps.link.y1,
                x2: nextProps.link.x2,
                y2: nextProps.link.y2,
            });
        }
    }

    /**
     * Handle click action in some link between two nodes. It calls a callback passed by parent component
     * and it passes two parameters, the identifiers of the source and target nodes in the relation.
     * @return {undefined}
     */
    handleOnClickLink = () => {
        if (this.state.onClickLink) {
            this.state.onClickLink(this.state.source, this.state.target);
        }
    }

    render() {
        const lineStyle = {
            strokeWidth: '1.5',
            stroke: 'rgb(169, 169, 169)',
            opacity: 1
        };

        const lineProps = {
            className: 'link',
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
