import React from 'react';

import Form from 'react-jsonschema-form';

import { Graph } from '../src';
import graphMock from './mock/miserables';
import style from './style';
import defaultConfig from '../src/components/Graph/config';

export default class Sandbox extends React.Component {
    constructor(props) {
        super(props);

        this.schemaProps = {};
        this._generateFormSchema(defaultConfig, '');

        this.state = {
            config: defaultConfig
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
            this._setValue(config, k, data.formData[k]);
        }

        this.setState({
            config
        });
    }

    render() {
        console.log('render');
        // react-jsonschema schemas
        const schema = {
            title: 'react d3!!! graph!!! :D',
            type: 'object',
            properties: this.schemaProps
        };

        const uiSchema = {
            height: {'ui:readonly': 'true'},
            width: {'ui:readonly': 'true'}
        };

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
                <h1>react-d3-graph</h1>
                <h2>Work in progress <span>🔨👷</span></h2>
                <button onClick={this.restartGraphSimulation}>▶️</button>
                <button onClick={this.pauseGraphSimulation}>⏸</button>
                <button onClick={this.resetNodesPositions}>Unstick nodes</button>
                <div style={style.container}>
                    <div style={style.graphWrapperStyle}>
                        <Graph key={'uniqueId'} ref='graph' {...graphProps}/>
                    </div>
                    <div style={style.formContainer}>
                        <Form schema={schema}
                            uiSchema={uiSchema}
                            onSubmit={this.refreshGraph} />
                    </div>
                </div>
                <div style={style.clear}></div>
            </div>
        );
    }
}
