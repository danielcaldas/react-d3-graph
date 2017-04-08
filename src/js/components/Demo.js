import React from 'react';

import Graph from './Graph/';
import graphMock from '../../mock';

export default class Layout extends React.Component {
    render() {
        const graphProps = {
            data: graphMock.graph,
            config: {
                nodeFixedAfterDropped: false,
                link: {
                    color: 'red',
                    strokeWidth: 1
                },
                node: {
                    strokeColor: 'none',
                    labelProperty: 'uid'
                }
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
