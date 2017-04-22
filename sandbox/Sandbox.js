import React from 'react';

import Form from 'react-jsonschema-form';

import './styles.css';

import defaultConfig from '../src/components/Graph/config';
import { Graph } from '../src';
import mock from './miserables';
import Utils from './utils';
import ReactD3GraphUtils from  '../src/utils';

export default class Sandbox extends React.Component {
    constructor(props) {
        super(props);

        const schemaProps = Utils.generateFormSchema(defaultConfig, '', {});

        const schema = {
            type: 'object',
            properties: schemaProps
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

    onClickSubmit = () => {
        // Hack for allow submit button to live outside jsonform
        document.body.querySelector('.invisible-button').click();
    }

    resetGraphConfig = () => {
        const schemaProps = Utils.generateFormSchema(defaultConfig, '', {});

        const schema = {
            type: 'object',
            properties: schemaProps
        };

        this.setState({
            config: defaultConfig,
            schema
        });
    }

    render() {
        const graphProps = {
            id: 'graph',
            data: JSON.parse(JSON.stringify(mock)),
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
            <div className='container'>
                <div className='container__graph'>
                    <button onClick={this.restartGraphSimulation} className='btn btn-default' style={btnStyle} disabled={this.state.config.staticGraph}>▶️</button>
                    <button onClick={this.pauseGraphSimulation} className='btn btn-default' style={btnStyle} disabled={this.state.config.staticGraph}>⏸️</button>
                    <button onClick={this.resetNodesPositions} className='btn btn-default' style={btnStyle} disabled={this.state.config.staticGraph}>Unstick nodes</button>
                    <Graph ref='graph' {...graphProps}/>
                </div>
                <div className='container__form'>
                    <h4>Graph configurations</h4>
                    <Form className='form-wrapper'
                        schema={this.state.schema}
                        uiSchema={this.uiSchema}
                        onChange={this.refreshGraph}
                        onSubmit={this.onSubmit}>
                        <button className='invisible-button' type='submit'></button>
                    </Form>
                    <button className='submit-button btn btn-primary' onClick={this.onClickSubmit}>Generate config</button>
                    <button className='reset-button btn btn-danger' onClick={this.resetGraphConfig}>Reset config</button>
                </div>
                <div className='container__graph-config'>
                    <h4>Your config</h4>
                    <JSONContainer data={this.state.generatedConfig} staticData={false} />
                </div>
                <div className='container__graph-data'>
                    <h4>Graph data</h4>
                    <JSONContainer data={mock} staticData={true}/>
                </div>
            </div>
        );
    }
}

class JSONContainer extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        return !this.props.staticData && JSON.stringify(nextProps.data) !== JSON.stringify(this.props.data);
    }

    render() {
        console.log('render json container');
        return (
            <pre className='json-data-container'>{JSON.stringify(this.props.data, null, 2)}</pre>
        );
    }
}
