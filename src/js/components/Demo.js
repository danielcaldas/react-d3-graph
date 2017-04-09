import React from 'react';

import graphMock from '../../mock';

import Graph from './Graph/';

export default class Layout extends React.Component {

    onClickNode = (id) => window.alert(`clicked node ${id}`);

    onClickLink = (source, target) => window.alert(`clicked link between ${source} and ${target}`);

    onMouseOverNode = (node) => {
        console.log('mouse over node', node);
    }

    onMouseOutNode = (node) => {
        console.log('mouse out the node', node);
    }

    render() {
        const graphProps = {
            data: graphMock.graph,
            config: {
                width: window.outerWidth,
                highlightOpacity: 0.12,
                highlightBehavior: true,
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
            },
            onClickNode: this.onClickNode,
            onClickLink: this.onClickLink,
            onMouseOverNode: this.onMouseOverNode,
            onMouseOutNode: this.onMouseOutNode
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
