import React from 'react';

import Form from 'react-jsonschema-form';

import defaultConfig from '../src/components/Graph/config';
import { Graph } from '../src';
import mock from './mock/miserables';
import style from './style';
import Utils from './utils';

export default class Sandbox extends React.Component {
    constructor(props) {
        super(props);

        this.schemaProps = Utils.generateFormSchema(defaultConfig, '', {});

        const schema = {
            title: 'Play around and tune your config',
            type: 'object',
            properties: this.schemaProps
        };

        const uiSchema = {
            height: {'ui:readonly': 'true'},
            width: {'ui:readonly': 'true'}
        };

        this.uiSchema = uiSchema;

        this.state = {
            config: defaultConfig,
            schema
        };
    }

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

    refreshGraph = (data) => {
        let config = {};

        for(let k of Object.keys(data.formData)) {
            // Set value mapping correctly for config object of react-d3-graph
            Utils.setValue(config, k, data.formData[k]);
            // Set new values for schema of jsonform
            this.state.schema.properties[k].default = data.formData[k]
        }

        this.setState({
            config
        });
    }

    render() {
        const graphProps = {
            id: 'graph',
            data: mock,
            config: this.state.config,
            onClickNode: this.onClickNode,
            onClickLink: this.onClickLink,
            onMouseOverNode: this.onMouseOverNode,
            onMouseOutNode: this.onMouseOutNode
        };

        return (
            <div>
                <h2>Work in progress <span>🔨👷</span></h2>
                <button onClick={this.restartGraphSimulation}>▶️</button>
                <button onClick={this.pauseGraphSimulation}>⏸</button>
                <button onClick={this.resetNodesPositions}>Unstick nodes</button>
                <div style={style.container}>
                    <div style={style.graphWrapperStyle}>
                        <Graph ref='graph' {...graphProps}/>
                    </div>
                    <div style={style.formContainer}>
                        <Form schema={this.state.schema}
                            uiSchema={this.uiSchema}
                            onChange={this.refreshGraph} />
                    </div>
                </div>
                <div style={style.clear}></div>
                <h4>Graph data</h4>
                <pre style={style.preStyle}>{JSON.stringify(mock, null, 2)}</pre>
            </div>
        );
    }
}
