import React from 'react';

import graphMock from '../../mock';

import Graph from './Graph/';

export default class Layout extends React.Component {
    render() {
        const graphProps = {
            data: graphMock.graph,
            config: {
                width: window.outerWidth,
                highlightOpacity: 0.12,
                node: {
                    color: 'green',
                    highlightFontWeight: 'bold',
                    highlightStrokeColor: 'blue',
                    labelProperty: 'uid'
                },
                link: {
                    highlightColor: 'blue',
                    strokeWidth: 1
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
