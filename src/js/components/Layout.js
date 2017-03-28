import React from 'react';

import Graph from './Graph';
import graphMock from '../../mock';

export default class Layout extends React.Component {
    render() {
        const graphProps = {
            data: graphMock.graph,
            config: {
                STROKE_THICKNESS: 2,
                LABEL_PROPERTY: 'uid',
                DEFAULT_NODE_COLOR: '#ae13e4'
            }
        };

        return (
            <div>
                <h1>react-d3-graph</h1>
                <h2>Work in progress</h2>
                <Graph {...graphProps}/>
            </div>
        );
    }
}
