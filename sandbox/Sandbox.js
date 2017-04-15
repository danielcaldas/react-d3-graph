import React from 'react';

import Form from 'react-jsonschema-form';

import defaultConfig from '../src/components/Graph/config';
import { Graph } from '../src';
import mock from './miserables';
import style from './style';
import Utils from './utils';
import ReactD3GraphUtils from  '../src/utils';

export default class Sandbox extends React.Component {
    constructor(props) {
        super(props);

        this.schemaProps = Utils.generateFormSchema(defaultConfig, '', {});

        const schema = {
            title: 'Graph configurations',
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
            generatedConfig: {},
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

    _buildGraphConfig = (data) => {
        let config = {};
        let schemaPropsValues = {};

        for(let k of Object.keys(data.formData)) {
            // Set value mapping correctly for config object of react-d3-graph
            Utils.setValue(config, k, data.formData[k]);
            // Set new values for schema of jsonform
            schemaPropsValues[k] = {};
            schemaPropsValues[k]['default'] = data.formData[k]
        }

        return {config, schemaPropsValues};
    }

    refreshGraph = (data) => {
        const {config, schemaPropsValues} = this._buildGraphConfig(data);

        this.state.schema.properties = ReactD3GraphUtils.merge(this.state.schema.properties, schemaPropsValues);

        this.setState({
            config
        });
    }

    // Generate graph configuration file ready to use!
    onSubmit = (data) => {
        const {config, schemaPropsValues} = this._buildGraphConfig(data);

        this.setState({
            generatedConfig: config
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

        const btnStyle = {
            cursor: this.state.config.staticGraph ? 'not-allowed' : 'pointer'
        };

        return (
            <div>
                <div style={style.btnContainer}>
                    <button onClick={this.restartGraphSimulation} style={btnStyle} disabled={this.state.config.staticGraph}>▶️</button>
                    <button onClick={this.pauseGraphSimulation} style={btnStyle} disabled={this.state.config.staticGraph}>⏸</button>
                    <button onClick={this.resetNodesPositions} style={btnStyle} disabled={this.state.config.staticGraph}>Unstick nodes</button>
                </div>
                <div style={style.container}>
                    <div style={style.graphWrapperStyle}>
                        <Graph ref='graph' {...graphProps}/>
                    </div>
                    <div style={style.formContainer}>
                        <Form schema={this.state.schema}
                            uiSchema={this.uiSchema}
                            onChange={this.refreshGraph}
                            onSubmit={this.onSubmit} />
                    </div>
                </div>
                <div style={style.clear}></div>
                <div>
                    <h4>Graph data</h4>
                    <pre style={style.preStyle}>{JSON.stringify(mock, null, 2)}</pre>
                </div>
                <div>
                    <h4>Graph configuration file</h4>
                    <pre style={style.preConfigStyle}>{JSON.stringify(this.state.generatedConfig, null, 2)}</pre>
                </div>
            </div>
        );
    }
}
