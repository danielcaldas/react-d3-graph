import React from 'react';

import Form from 'react-jsonschema-form';

import './styles.css';

import defaultConfig from '../src/components/Graph/config';
import { Graph } from '../src';
import data from './data';
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
            schema,
            data
        };
    }

    onClickNode = (id) => window.alert(`Clicked node ${id}`);

    onClickLink = (source, target) => window.alert(`Clicked link between ${source} and ${target}`);

    onMouseOverNode = () => {
        // Do something with the node identifier ...
    }

    onMouseOutNode = () => {
        // Do something with the node identifier ...
    }

    /**
     * Pause ongoing animations.
     */
    pauseGraphSimulation = () => this.refs.graph.pauseSimulation();

    /**
     * Play stopped animations.
     */
    restartGraphSimulation = () => this.refs.graph.restartSimulation();

    /**
     * If you have moved nodes you will have them restore theire positions
     * when you call resetNodesPositions.
     */
    resetNodesPositions = () => this.refs.graph.resetNodesPositions();

    /**
     * Append a new node.
     */
    onClickAddNode = () => {
        if (this.state.data.nodes && this.state.data.nodes.length) {
            const maxIndex = this.state.data.nodes.length - 1;
            const minIndex = 0;
            const i = Math.floor(Math.random() * (maxIndex - minIndex + 1) + minIndex);
            const id = this.state.data.nodes[i].id;
            const newNode = `Node ${this.state.data.nodes.length}`;

            this.state.data.nodes.push({id: newNode});
            this.state.data.links.push({
                source: newNode,
                target: id
            });

            this.setState({
                data: this.state.data
            });
        } else {
            // 1st node
            const data = {
                nodes: [
                    {id: 'Node 1'}
                ],
                links: []
            };

            this.setState({ data });
        }
    }

    /**
     * Remove a node
     */
    onClickRemoveNode = () => {
        if (this.state.data.nodes && this.state.data.nodes.length) {
            const id = this.state.data.nodes[0].id;
            this.state.data.nodes.splice(0, 1);
            const links = this.state.data.links.filter(l => l.source !== id && l.target !== id);
            const data = { nodes: this.state.data.nodes, links };

            this.setState({ data });
        } else {
            alert('No more nodes to remove!');
        }
    }

    /**
     * ==============================================================
     * The methods below (**besides render method) is Sandbox specific it will not
     * be usefull in any way to your application in terms
     * of integrating react-d3-graph in your app.
     * ==============================================================
     */

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

    refresh = () => location.reload();

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
        const generatedConfig = {};

        const schemaProps = Utils.generateFormSchema(defaultConfig, '', {});

        const schema = {
            type: 'object',
            properties: schemaProps
        };

        this.setState({
            config: defaultConfig,
            generatedConfig,
            schema
        });
    }

    render() {
        const graphProps = {
            id: 'graph',
            data: this.state.data,
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
                    <button onClick={this.restartGraphSimulation} className='btn btn-default btn-margin-left' style={btnStyle} disabled={this.state.config.staticGraph}>▶️</button>
                    <button onClick={this.pauseGraphSimulation} className='btn btn-default btn-margin-left' style={btnStyle} disabled={this.state.config.staticGraph}>⏸️</button>
                    <button onClick={this.refresh} className='btn btn-default btn-margin-left' style={btnStyle}>🔄</button>
                    <button onClick={this.resetNodesPositions} className='btn btn-default btn-margin-left' style={btnStyle} disabled={this.state.config.staticGraph}>Unstick nodes</button>
                    <button onClick={this.onClickAddNode} className='btn btn-default btn-margin-left' style={btnStyle}>+</button>
                    <button onClick={this.onClickRemoveNode} className='btn btn-default btn-margin-left' style={btnStyle}>-</button>
                    <span className='container__graph-info'>
                        <b>Nodes: </b> {this.state.data.nodes.length} | <b>Links: </b> {this.state.data.links.length}
                    </span>
                    <div className='container__graph-area'>
                        <Graph ref='graph' {...graphProps}/>
                    </div>
                </div>
                <div className='container__form'>
                    <h4><a href="https://github.com/danielcaldas/react-d3-graph" target="_blank">react-d3-graph</a> configurations </h4>
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
                    <h4>Initial Graph Data</h4>
                    <JSONContainer data={this.state.data} staticData={true}/>
                </div>
            </div>
        );
    }
}

class JSONContainer extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        return !this.props.staticData && !ReactD3GraphUtils.isDeepEqual(nextProps.data, this.props.data);
    }

    render() {
        return (
            <pre className='json-data-container'>{JSON.stringify(this.props.data, null, 2)}</pre>
        );
    }
}
