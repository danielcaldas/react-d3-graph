import React from 'react';

import graphMock from '../../mock';

import Graph from './Graph/';

export default class Layout extends React.Component {

    onClickNode = (id) => window.alert(`clicked node ${id}`);

    onClickLink = (source, target) => window.alert(`clicked link between ${source} and ${target}`);

    onMouseOverNode = () => {
        // Do something with the node identifier ...
    }

    onMouseOutNode = () => {
        // Do something with the node identifier ...
    }

    pauseGraphSimulation = () => this.refs.graph.pauseSimulation();

    restartGraphSimulation = () => this.refs.graph.restartSimulation();

    resetNodesPositions = () => this.refs.graph.resetNodesPositions();

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
                <button onClick={this.restartGraphSimulation}>▶️</button>
                <button onClick={this.pauseGraphSimulation}>⏸</button>
                <button onClick={this.resetNodesPositions}>Unstick nodes</button>
                <div style={graphWrapperStyle}>
                    <Graph ref='graph' {...graphProps}/>
                </div>
            </div>
        );
    }
}
