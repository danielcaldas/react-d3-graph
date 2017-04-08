import React from 'react';

import Graph from './Graph/';
import graphMock from '../../mock.xl';

export default class Layout extends React.Component {
    render() {
        const graphProps = {
            data: graphMock.graph,
            config: {
                link: {
                    color: 'green',
                    strokeWidth: 0.8,
                    opacity: 0.1
                },
                node: {
                    strokeColor: 'yellow',
                    strokeWidth: '2',
                    labelProperty: 'uid',
                    fontSize: 14
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
