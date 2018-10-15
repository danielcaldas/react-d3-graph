/*global console*/
/*eslint require-jsdoc: 0, valid-jsdoc: 0, no-console: 0*/
import React from 'react';

import Form from 'react-jsonschema-form';

import './styles.css';

import defaultConfig from '../src/components/graph/graph.config';
import { Graph } from '../src';
import utils from './utils';
import reactD3GraphUtils from '../src/utils';
import { JsonTree } from 'react-editable-json-tree';

const sandboxData = utils.loadDataset();

/**
 * This is a sample integration of react-d3-graph, in this particular case all the rd3g config properties
 * will be exposed in a form in order to allow on the fly graph configuration.
 * The data and configuration that are initially loaded can be manipulated via queryParameter on this same
 * Sandbox. You can dynamically load different datasets that are under the `data` folder. If you want
 * for instance to load the data and config under the `small` folder you just need to append "?data=small"
 * to the url when accessing the sandbox.
 */
export default class Sandbox extends React.Component {
    constructor(props) {
        super(props);

        const { config: configOverride, data, fullscreen } = sandboxData;
        const config = Object.assign(defaultConfig, configOverride);
        const schemaProps = utils.generateFormSchema(config, '', {});

        const schema = {
            type: 'object',
            properties: schemaProps
        };

        const uiSchema = {
            height: { 'ui:readonly': 'true' },
            width: { 'ui:readonly': 'true' }
        };

        this.uiSchema = uiSchema;

        this.state = {
            config,
            generatedConfig: {},
            schema,
            data,
            fullscreen
        };
    }

    onClickGraph = () => console.info(`Clicked the graph`);

    onClickNode = id => !this.state.config.collapsible && window.alert(`Clicked node ${id}`);

    onClickLink = (source, target) => window.alert(`Clicked link between ${source} and ${target}`);

    onMouseOverNode = id => console.info(`Do something when mouse is over node (${id})`);

    onMouseOutNode = id => console.info(`Do something when mouse is out of node (${id})`);

    onMouseOverLink = (source, target) =>
        console.info(`Do something when mouse is over link between ${source} and ${target}`);

    onMouseOutLink = (source, target) =>
        console.info(`Do something when mouse is out of link between ${source} and ${target}`);

    /**
     * Sets on/off fullscreen visualization mode.
     */
    onToggleFullScreen = () => {
        const fullscreen = !this.state.fullscreen;

        this.setState({ fullscreen });
    };

    /**
     * Play stopped animations.
     */
    restartGraphSimulation = () => this.refs.graph.restartSimulation();

    /**
     * Pause ongoing animations.
     */
    pauseGraphSimulation = () => this.refs.graph.pauseSimulation();

    /**
     * If you have moved nodes you will have them restore theirs positions
     * when you call resetNodesPositions.
     */
    resetNodesPositions = () => this.refs.graph.resetNodesPositions();

    /**
     * Append a new node with some randomness.
     */
    onClickAddNode = () => {
        if (this.state.data.nodes && this.state.data.nodes.length) {
            const maxIndex = this.state.data.nodes.length - 1;
            const minIndex = 0;
            let i = Math.floor(Math.random() * (maxIndex - minIndex + 1) + minIndex);
            let nLinks = Math.floor(Math.random() * (5 - minIndex + 1) + minIndex);
            const newNode = `Node ${this.state.data.nodes.length}`;

            this.state.data.nodes.push({ id: newNode });

            while (this.state.data.nodes[i] && this.state.data.nodes[i].id && nLinks) {
                this.state.data.links.push({
                    source: newNode,
                    target: this.state.data.nodes[i].id
                });

                i++;
                nLinks--;
            }

            this.setState({
                data: this.state.data
            });
        } else {
            // 1st node
            const data = {
                nodes: [{ id: 'Node 1' }],
                links: []
            };

            this.setState({ data });
        }
    };

    /**
     * Remove a node.
     */
    onClickRemoveNode = () => {
        if (this.state.data.nodes && this.state.data.nodes.length) {
            const id = this.state.data.nodes[0].id;

            this.state.data.nodes.splice(0, 1);
            const links = this.state.data.links.filter(l => l.source !== id && l.target !== id);
            const data = { nodes: this.state.data.nodes, links };

            this.setState({ data });
        } else {
            window.alert('No more nodes to remove!');
        }
    };

    _buildGraphConfig = data => {
        let config = {};
        let schemaPropsValues = {};

        for (let k of Object.keys(data.formData)) {
            // Set value mapping correctly for config object of react-d3-graph
            utils.setValue(config, k, data.formData[k]);
            // Set new values for schema of jsonform
            schemaPropsValues[k] = {};
            schemaPropsValues[k]['default'] = data.formData[k];
        }

        return { config, schemaPropsValues };
    };

    refreshGraph = data => {
        const { config, schemaPropsValues } = this._buildGraphConfig(data);

        this.state.schema.properties = reactD3GraphUtils.merge(this.state.schema.properties, schemaPropsValues);

        this.setState({
            config
        });
    };

    /**
     * Generate graph configuration file ready to use!
     */
    onSubmit = data => {
        const { config } = this._buildGraphConfig(data);

        this.setState({ generatedConfig: config });
    };

    onClickSubmit = () => {
        // Hack for allow submit button to live outside jsonform
        document.body.querySelector('.invisible-button').click();
    };

    resetGraphConfig = () => {
        const generatedConfig = {};

        const schemaProps = utils.generateFormSchema(defaultConfig, '', {});

        const schema = {
            type: 'object',
            properties: schemaProps
        };

        this.setState({
            config: defaultConfig,
            generatedConfig,
            schema
        });
    };

    /**
     * This function decorates nodes and links with positions. The motivation
     * for this function its to set `config.staticGraph` to true on the first render
     * call, and to get nodes and links statically set to their initial positions.
     * @param  {Object} nodes nodes and links with minimalist structure.
     * @return {Object} the graph where now nodes containing (x,y) coords.
     */
    decorateGraphNodesWithInitialPositioning = nodes => {
        return nodes.map(n =>
            Object.assign({}, n, {
                x: n.x || Math.floor(Math.random() * 500),
                y: n.y || Math.floor(Math.random() * 500)
            })
        );
    };

    /**
     * Update graph data each time an update is triggered
     * by JsonTree
     * @param {Object} data update graph data (nodes and links)
     */
    onGraphDataUpdate = data => this.setState({ data });

    /**
     * Build common piece of the interface that contains some interactions such as
     * fullscreen, play/pause, + and - buttons.
     */
    buildCommonInteractionsPanel = () => {
        const btnStyle = {
            cursor: this.state.config.staticGraph ? 'not-allowed' : 'pointer'
        };

        const fullscreen = this.state.fullscreen ? (
            <span className="cross-icon" onClick={this.onToggleFullScreen}>
                ❌
            </span>
        ) : (
            <button onClick={this.onToggleFullScreen} className="btn btn-default btn-margin-left">
                Fullscreen
            </button>
        );

        return (
            <div>
                {fullscreen}
                <button
                    onClick={this.restartGraphSimulation}
                    className="btn btn-default btn-margin-left"
                    style={btnStyle}
                    disabled={this.state.config.staticGraph}
                >
                    ▶️
                </button>
                <button
                    onClick={this.pauseGraphSimulation}
                    className="btn btn-default btn-margin-left"
                    style={btnStyle}
                    disabled={this.state.config.staticGraph}
                >
                    ⏸️
                </button>
                <button
                    onClick={this.resetNodesPositions}
                    className="btn btn-default btn-margin-left"
                    style={btnStyle}
                    disabled={this.state.config.staticGraph}
                >
                    Unstick nodes
                </button>
                <button onClick={this.onClickAddNode} className="btn btn-default btn-margin-left">
                    +
                </button>
                <button onClick={this.onClickRemoveNode} className="btn btn-default btn-margin-left">
                    -
                </button>
                <span className="container__graph-info">
                    <b>Nodes: </b> {this.state.data.nodes.length} | <b>Links: </b> {this.state.data.links.length}
                </span>
            </div>
        );
    };

    render() {
        // This does not happens in this sandbox scenario running time, but if we set staticGraph config
        // to true in the constructor we will provide nodes with initial positions
        const data = {
            nodes: this.decorateGraphNodesWithInitialPositioning(this.state.data.nodes),
            links: this.state.data.links
        };

        const graphProps = {
            id: 'graph',
            data,
            config: this.state.config,
            onClickNode: this.onClickNode,
            onClickGraph: this.onClickGraph,
            onClickLink: this.onClickLink,
            onMouseOverNode: this.onMouseOverNode,
            onMouseOutNode: this.onMouseOutNode,
            onMouseOverLink: this.onMouseOverLink,
            onMouseOutLink: this.onMouseOutLink
        };

        if (this.state.fullscreen) {
            graphProps.config = Object.assign({}, graphProps.config, {
                height: window.innerHeight,
                width: window.innerWidth
            });

            return (
                <div>
                    {this.buildCommonInteractionsPanel()}
                    <Graph ref="graph" {...graphProps} />
                </div>
            );
        } else {
            // @TODO: Only show configs that differ from default ones in "Your config" box
            return (
                <div className="container">
                    <div className="container__graph">
                        {this.buildCommonInteractionsPanel()}
                        <div className="container__graph-area">
                            <Graph ref="graph" {...graphProps} />
                        </div>
                    </div>
                    <div className="container__form">
                        <h4>
                            <a href="https://github.com/danielcaldas/react-d3-graph" target="_blank">
                                react-d3-graph
                            </a>
                        </h4>
                        <h4>
                            <a href="https://danielcaldas.github.io/react-d3-graph/docs/index.html" target="_blank">
                                docs
                            </a>
                        </h4>
                        <h3>Configurations</h3>
                        <Form
                            className="form-wrapper"
                            schema={this.state.schema}
                            uiSchema={this.uiSchema}
                            onChange={this.refreshGraph}
                            onSubmit={this.onSubmit}
                        >
                            <button className="invisible-button" type="submit" />
                        </Form>
                        <button className="submit-button btn btn-primary" onClick={this.onClickSubmit}>
                            Generate config
                        </button>
                        <button className="reset-button btn btn-danger" onClick={this.resetGraphConfig}>
                            Reset config
                        </button>
                    </div>
                    <div className="container__graph-config">
                        <h4>Your config</h4>
                        <JSONContainer data={this.state.generatedConfig} staticData={false} />
                    </div>
                    <div className="container__graph-data">
                        <h4>
                            Graph Data <small>(editable)</small>
                        </h4>
                        <div className="json-data-container">
                            <JsonTree data={this.state.data} onFullyUpdate={this.onGraphDataUpdate} />
                        </div>
                    </div>
                </div>
            );
        }
    }
}

class JSONContainer extends React.Component {
    shouldComponentUpdate(nextProps) {
        return !this.props.staticData && !reactD3GraphUtils.isDeepEqual(nextProps.data, this.props.data);
    }

    render() {
        return <pre className="json-data-container">{JSON.stringify(this.props.data, null, 2)}</pre>;
    }
}
