import React from 'react';

import CONFIG from './graph.config';

import Graph from './Graph';
import graphMock from '../../mock';

export default class Layout extends React.Component {
    render() {
        // Customizable properties
        let myConfig = Object.assign({}, CONFIG);

        myConfig.STROKE_THICKNESS = 2;
        myConfig.LABEL_PROPERTY = 'uid';
        myConfig.DEFAULT_NODE_COLOR = '#ae13e4';

        const graphProps = {
            data: graphMock.graph,
            config: myConfig
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
