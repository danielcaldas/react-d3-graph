import React from 'react';

import graphMock from './mock/miserables';

import { Graph } from '../src';

export default class Sandbox extends React.Component {

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
            id: 'graph',
            data: graphMock.graph || graphMock,
            config: {
                width,
                height: 600,
                highlightOpacity: 0.12,
                highlightBehavior: true,
                node: {
                    color: '#4286f4',
                    highlightFontSize: 14,
                    highlightFontWeight: 'bold',
                    highlightStrokeColor: '#8f41f4',
                    highlightStrokeWidth: 2,
                    labelProperty: 'uid',
                    size: 100,
                    strokeColor: 'white'
                },
                link: {
                    highlightColor: '#8f41f4',
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
