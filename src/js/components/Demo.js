import React from 'react';

import Graph from './Graph/';
import graphMock from '../../mock';

export default class Layout extends React.Component {
    render() {
        const graphProps = {
            data: graphMock.graph,
            config: {
                linkStrokeWidth: 1.2,
                labelProperty: 'uid',
                nodeColor: 'white',
                textSize: 10
            }
        };

        return (
            <div>
                <h1>react-d3-graph</h1>
                <h2>Work in progress <span>🔨👷</span></h2>
                <Graph {...graphProps}/>
            </div>
        );
    }
}
