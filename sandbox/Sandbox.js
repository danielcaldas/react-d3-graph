import React from 'react';

import Form from 'react-jsonschema-form';

import { Graph } from '../src';
import graphMock from './mock/mock';
import style from './style';
import defaultConfig from '../src/components/Graph/config';

export default class Sandbox extends React.Component {
    constructor(props) {
        super(props);

        this.schemaProps = {};
        this._generateFormSchema(defaultConfig, '');

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

    /**
     * Separate this functions. Place them in another file.
     */
    _formMap(k,v) {
        return {
            title: k,
            type: typeof v,
            'default': v
        };
    }

    _generateFormSchema(o, rootSpreadProp) {
        for(let k of Object.keys(o)) {
            const kk = rootSpreadProp ? `${rootSpreadProp}.${k}` : k;
            typeof o[k] === 'object' ? this._generateFormSchema(o[kk], kk)
                                    : this.schemaProps[kk] = this._formMap(kk, o[k]);
        }
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

    _setValue(obj,access,value){
        if (typeof(access)=='string'){
            access = access.split('.');
        }
        if (access.length > 1){
            this._setValue(obj[access.shift()],access,value);
        }else{
            obj[access[0]] = value;
        }
    }

    refreshGraph = (data) => {
        let config = {node: {}, link:{}}; // @TODO: Improve this hardcoded object with node and link

        for(let k of Object.keys(data.formData)) {
            // Set value mapping correctly for config object of react-d3-graph
            this._setValue(config, k, data.formData[k]);
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
            data: graphMock.graph || graphMock, // @TODO: Remove nonsense fallback
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
                            onSubmit={this.refreshGraph} />
                    </div>
                </div>
                <div style={style.clear}></div>
                <h4>Graph data</h4>
                <pre style={style.preStyle}>{JSON.stringify(graphMock, null, 2)}</pre>
            </div>
        );
    }
}
