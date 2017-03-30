import React from 'react';

export default class Link extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log('render Link');
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

// "M0,8A8,8 0 1,1 0,-8A8,8 0 1,1 0,8Z"
//
// "M8,20A8,8,0,1,1,-8,20A8,8,0,1,1,8,20"
// <g id="1" class="node" transform="translate(489,231)" cx="489" cy="231"><path d="M8,20A8,8,0,1,1,-8,20A8,8,0,1,1,8,20" style="fill: rgb(85, 247, 250); stroke-width: 1.5; stroke: white; opacity: 1;"></path><text dy="2.1em" dx="8" style="font-size: 10px; font-weight: normal; opacity: 1;">&ensp;some node</text></g>
//
// <line x1="48" y1="422" x2="489" y2="231" style="stroke-width: 1.5; stroke: rgb(169, 169, 169); opacity: 1;"></line>
