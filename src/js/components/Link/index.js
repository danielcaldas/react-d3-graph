import React from 'react';

export default class Link extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const config = this.props.config;
        const link = this.props.link;
        const CLASS = 'link';

        const lineStyle = {
            strokeWidth: '1.5',
            stroke: 'rgb(169, 169, 169)',
            opacity: 1
        };

        const props = {
            x1: link.x1,
            y1: link.y1,
            x2: link.x2,
            y2: link.y2,
            style: lineStyle
        };

        return (
            <line {...props}/>
        );
    }
}
