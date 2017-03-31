import React from 'react';

import STYLES from './styles';

export default class Link extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.x1 !== this.props.x1
            || nextProps.y1 !== this.props.y1
            || nextProps.x2 !== this.props.x2
            || nextProps.y2 !== this.props.y2) {
            this.setState({
                ...this.state,
                x1: nextProps.x1,
                y1: nextProps.y1,
                x2: nextProps.x2,
                y2: nextProps.y2
            });
        }
    }

    render() {
        const lineProps = {
            className: 'link',
            style: STYLES.lineStyle,
            x1: this.props.link.x1,
            x2: this.props.link.x2,
            y1: this.props.link.y1,
            y2: this.props.link.y2
        };

        return (
            <line {...lineProps}/>
        );
    }
}
