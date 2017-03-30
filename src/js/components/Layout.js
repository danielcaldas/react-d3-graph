import React from 'react';

import Graph from './Graph';
import graphMock from '../../mock';

import Node from './Node/';
import config from './graph.config';

export default class Layout extends React.Component {
    render() {
        const graphProps = {
            data: graphMock.graph,
            config: {
                strokeThickness: 1,
                labelProperty: 'uid',
                defaultNodeColor: 'red',
                outline: false
            }
        };

        const nodeProps = { config: config};

        return (
            <div>
                <h1>react-d3-graph</h1>
                <h2>Work in progress</h2>
                <svg width='600' height='500'>
                    <Node {...nodeProps} />
                </svg>
            </div>
        );
    }
}
