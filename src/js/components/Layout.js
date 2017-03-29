import React from 'react';

import Graph from './Graph';
import graphMock from '../../mock';

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

        return (
            <div>
                <h1>react-d3-graph</h1>
                <h2>Work in progress</h2>
                <Graph {...graphProps}/>
            </div>
        );
    }
}
