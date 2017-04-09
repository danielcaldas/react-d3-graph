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
        const width = window.innerWidth - 50;
        const graphProps = {
            data: graphMock.graph,
            config: {
                width,
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

        const graphWrapperStyle = {
            border: '1px solid black',
            marginTop: '25px',
            width
        };

        return (
            <div>
                <h1>react-d3-graph</h1>
                <h2>Work in progress <span>🔨👷</span></h2>
                <button>▶️</button>
                <button>⏸</button>
                <button>Unstick nodes</button>
                <div style={graphWrapperStyle}>
                    <Graph {...graphProps}/>
                </div>
            </div>
        );
    }
}
