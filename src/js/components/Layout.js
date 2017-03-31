import React from 'react';

import graphMock from '../../mock';

import Graph from './Graph/';
import Node from './Node/';
import config from './Graph/graph.config';

export default class Layout extends React.Component {
    render() {
        const graphProps = {
            data: graphMock.graph,
            config: {
                strokeThickness: 1,
                labelProperty: 'uid',
                defaultNodeColor: 'yellow',
                outline: false
            }
        };

        const nodeProps = { config: config };

        return (
            <div>
                <h1>react-d3-graph</h1>
                <h2>Work in progress</h2>
                <Graph {...graphProps}/>
            </div>
        );
    }
}
