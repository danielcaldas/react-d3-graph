import React from 'react';

import graphMock from '../../mock.xl';

import Graph from './Graph/';

export default class Layout extends React.Component {
    render() {
        const graphProps = {
            data: graphMock.graph,
            config: {
                minZoom: 0.01,
                highlightOpacity: 0.12,
                link: {
                    color: 'green',
                    strokeWidth: 0.8,
                    opacity: 1
                },
                node: {
                    highlightColor: 'SAME',
                    labelProperty: 'uid',
                    strokeColor: 'none'
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
