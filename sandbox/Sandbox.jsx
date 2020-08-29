/*eslint require-jsdoc: 0, valid-jsdoc: 0, no-console: 0*/
import React from "react";
import { JsonTree } from "react-editable-json-tree";
import Form from "react-jsonschema-form";
import ReactTooltip from "react-tooltip";
import { toast } from "react-toastify";
import "./analytics";
import defaultConfig from "../src/components/graph/graph.config";
import { Graph } from "../src";
import { generateFormSchema, loadDataset, setValue, tooltipReducer } from "./utils";
import { isDeepEqual, merge } from "../src/utils";

import "react-toastify/dist/ReactToastify.css";
import "./styles.css";

const sandboxData = loadDataset();
const NOT_ALLOWED_PROPERTIES = ["height", "width"];
const isPropertyDocumented = k => !NOT_ALLOWED_PROPERTIES.includes(k);
// eslint-disable-next-line no-undef
const reactD3GraphVersion = rd3gRunningVersion;

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
    // TODO: refactor this labelPosition assignment, move to somewhere
    // in generateFormSchema
    if (config.node.labelPosition === null) {
      config.node.labelPosition = "";
    }
    const schemaProps = generateFormSchema(config, "", {});
    const schema = {
      type: "object",
      properties: schemaProps,
    };
    const uiSchema = {
      ...Object.keys(schemaProps)
        .filter(isPropertyDocumented)
        .reduce(tooltipReducer, schemaProps),
      height: { "ui:readonly": "true" },
      width: { "ui:readonly": "true" },
      "link.markerWidth": { "ui:readonly": "true" },
      "link.markerHeight": { "ui:readonly": "true" },
    };

    this.state = {
      config,
      generatedConfig: {},
      schema,
      uiSchema,
      data,
      fullscreen,
      nodeIdToBeRemoved: null,
    };
  }

  onClickGraph = () => toast("Clicked the graph");

  onClickNode = id => {
    toast(`Clicked node ${id}`);
    // NOTE: below sample implementation for focusAnimation when clicking on node
    // this.setState({
    //     data: {
    //         ...this.state.data,
    //         focusedNodeId: this.state.data.focusedNodeId !== id ? id : null
    //     }
    // });
  };

  onDoubleClickNode = id => toast(`Double clicked node ${id}`);

  onRightClickNode = (event, id) => {
    event.preventDefault();
    toast(`Right clicked node ${id}`);
  };

  onClickLink = (source, target) => toast(`Clicked link between ${source} and ${target}`);

  onRightClickLink = (event, source, target) => {
    event.preventDefault();
    toast(`Right clicked link between ${source} and ${target}`);
  };

  onMouseOverNode = id => console.info(`Do something when mouse is over node (${id})`);

  onMouseOutNode = id => console.info(`Do something when mouse is out of node (${id})`);

  onMouseOverLink = (source, target) =>
    console.info(`Do something when mouse is over link between ${source} and ${target}`);

  onMouseOutLink = (source, target) =>
    console.info(`Do something when mouse is out of link between ${source} and ${target}`);

  onNodePositionChange = (nodeId, x, y) =>
    console.info(`Node ${nodeId} is moved to new position. New position is (${x}, ${y}) (x,y)`);

  /**
   * Sets on/off fullscreen visualization mode.
   */
  onToggleFullScreen = () => {
    const fullscreen = !this.state.fullscreen;

    this.setState({ fullscreen });
  };

  /**
   * Called when the graph's zoom changes
   * @param {number} prevZoom Previous zoom level
   * @param {number} newZoom New zoom level
   */
  onZoomChange = (prevZoom, newZoom) => {
    this.setState({ currentZoom: newZoom });
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

      let i = Math.floor(Math.random() * (maxIndex - minIndex + 1) + minIndex),
        nLinks = Math.floor(Math.random() * (5 - minIndex + 1) + minIndex);
      const newNode = `Node ${this.state.data.nodes.length}`;

      this.state.data.nodes.push({ id: newNode });

      while (this.state.data.nodes[i] && this.state.data.nodes[i].id && nLinks) {
        this.state.data.links.push({
          source: newNode,
          target: this.state.data.nodes[i].id,
        });

        i++;
        nLinks--;
      }

      this.setState({
        data: this.state.data,
      });
    } else {
      // 1st node
      const data = {
        nodes: [{ id: "Node 1" }],
        links: [],
      };

      this.setState({ data });
    }
  };

  /**
   * Remove a node.
   */
  onClickRemoveNode = () => {
    if (this.state.data.nodes && this.state.data.nodes.length > 1) {
      const id = this.state.data.nodes[0].id;

      this.state.data.nodes.splice(0, 1);
      const links = this.state.data.links.filter(l => l.source !== id && l.target !== id);
      const data = { nodes: this.state.data.nodes, links };

      this.setState({ data });
    } else {
      toast("Need to have at least one node!");
    }
  };

  _buildGraphConfig = data => {
    let config = {},
      schemaPropsValues = {};

    for (let k of Object.keys(data.formData)) {
      // Set value mapping correctly for config object of react-d3-graph
      setValue(config, k, data.formData[k]);
      // Set new values for schema of jsonform
      schemaPropsValues[k] = {};
      schemaPropsValues[k]["default"] = data.formData[k];
    }

    return { config, schemaPropsValues };
  };

  refreshGraph = data => {
    const { config, schemaPropsValues } = this._buildGraphConfig(data);

    this.state.schema.properties = merge(this.state.schema.properties, schemaPropsValues);

    this.setState({
      config,
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
    document.body.querySelector(".invisible-button").click();
  };

  resetGraphConfig = () => {
    const generatedConfig = {};

    const schemaProps = generateFormSchema(defaultConfig, "", {});

    const schema = {
      type: "object",
      properties: schemaProps,
    };

    this.setState({
      config: defaultConfig,
      generatedConfig,
      schema,
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
        y: n.y || Math.floor(Math.random() * 500),
      })
    );
  };

  /**
   * Before removing elements (nodes, links)
   * from the graph data, this function is executed.
   * https://github.com/oxyno-zeta/react-editable-json-tree#beforeremoveaction
   */
  onBeforeRemoveGraphData = (key, keyPath, deep, oldValue) => {
    if (keyPath && keyPath[0] && keyPath[0] === "nodes" && oldValue && oldValue.id) {
      this.setState({
        nodeIdToBeRemoved: oldValue.id,
      });
    }

    return Promise.resolve();
  };

  /**
   * Update graph data each time an update is triggered
   * by JsonTree
   * @param {Object} data update graph data (nodes and links)
   */
  onGraphDataUpdate = data => {
    const removedNodeIndex = data.nodes.findIndex(n => !n);

    let removedNodeId = null;

    if (removedNodeIndex !== -1 && this.state.nodeIdToBeRemoved) {
      removedNodeId = this.state.nodeIdToBeRemoved;
    }

    const nodes = data.nodes.filter(Boolean);
    const isValidLink = link => link && link.source !== removedNodeId && link.target !== removedNodeId;
    const links = data.links.filter(isValidLink);

    this.setState({
      data: {
        links,
        nodes,
      },
    });
  };

  /**
   * Build common piece of the interface that contains some interactions such as
   * fullscreen, play/pause, + and - buttons.
   */
  buildCommonInteractionsPanel = () => {
    const btnStyle = {
      cursor: this.state.config.staticGraph ? "not-allowed" : "pointer",
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
          {/* eslint-disable-next-line max-len */}
          <b>Nodes: </b> {this.state.data.nodes.length} |<b>Links: </b> {this.state.data.links.length} |<b>Zoom: </b>{" "}
          {this.state.currentZoom ? this.state.currentZoom.toFixed(3) : "-"}
        </span>
      </div>
    );
  };

  copyConfigToClipboard = () => {
    if (!this.state.generatedConfig || !Object.keys(this.state.generatedConfig).length) {
      return;
    }

    try {
      navigator.clipboard
        .writeText(JSON.stringify(this.state.generatedConfig, null, 2))
        .then(() => {
          toast("✔️ Configuration copied to clipboard!");
        })
        .catch(console.error);
    } catch (error) {
      console.error(error);
    }
  };

  componentDidMount() {
    toast.configure();
  }

  render() {
    // This does not happens in this sandbox scenario running time, but if we set staticGraph config
    // to true in the constructor we will provide nodes with initial positions
    const data = {
      nodes: this.decorateGraphNodesWithInitialPositioning(this.state.data.nodes),
      links: this.state.data.links,
      focusedNodeId: this.state.data.focusedNodeId,
    };

    const graphProps = {
      id: "graph",
      data,
      config: this.state.config,
      onClickNode: this.onClickNode,
      onDoubleClickNode: this.onDoubleClickNode,
      onRightClickNode: this.onRightClickNode,
      onClickGraph: this.onClickGraph,
      onClickLink: this.onClickLink,
      onRightClickLink: this.onRightClickLink,
      onMouseOverNode: this.onMouseOverNode,
      onMouseOutNode: this.onMouseOutNode,
      onMouseOverLink: this.onMouseOverLink,
      onMouseOutLink: this.onMouseOutLink,
      onNodePositionChange: this.onNodePositionChange,
      onZoomChange: this.onZoomChange,
    };

    if (this.state.fullscreen) {
      graphProps.config = Object.assign({}, graphProps.config, {
        height: window.innerHeight,
        width: window.innerWidth,
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
                {reactD3GraphVersion ? `react-d3-graph@${reactD3GraphVersion}` : "react-d3-graph"}
              </a>
            </h4>
            <h4>
              <a href="https://danielcaldas.github.io/react-d3-graph/docs/index.html" target="_blank">
                📖Documentation
              </a>
            </h4>
            <h5>
              <a href="https://paypal.me/DanielCaldas321" target="_blank">
                ❤️Donate
              </a>
              <a
                href="https://github.com/danielcaldas/react-d3-graph/stargazers"
                target="_blank"
                style={{ marginLeft: "4px" }}
              >
                ⭐Become a stargazer
              </a>
            </h5>
            <h3>Configurations</h3>
            <Form
              className="form-wrapper"
              schema={this.state.schema}
              uiSchema={this.state.uiSchema}
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
            <h4>
              Your config
              <small className="btn-clipboard" onClick={this.copyConfigToClipboard}>
                📋 copy to clipboard
              </small>
            </h4>
            <JSONContainer data={this.state.generatedConfig} staticData={false} />
          </div>
          <div className="container__graph-data">
            <h4>
              Graph Data <small>(editable)</small>
            </h4>
            <div className="json-data-container">
              <JsonTree
                data={this.state.data}
                beforeRemoveAction={this.onBeforeRemoveGraphData}
                onFullyUpdate={this.onGraphDataUpdate}
              />
            </div>
          </div>
          <ReactTooltip place={"left"} multiline={true} html={true} clickable={true} />
        </div>
      );
    }
  }
}

class JSONContainer extends React.Component {
  shouldComponentUpdate(nextProps) {
    return !this.props.staticData && !isDeepEqual(nextProps.data, this.props.data);
  }

  render() {
    return <pre className="json-data-container">{JSON.stringify(this.props.data, null, 2)}</pre>;
  }
}
