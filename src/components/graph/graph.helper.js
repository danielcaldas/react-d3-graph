/**
 * @module Graph/helper
 * @description
 * Offers a series of methods that isolate logic of Graph component and also from Graph rendering methods.
 */
/**
 * @typedef {Object} Link
 * @property {string} source - the node id of the source in the link.
 * @property {string} target - the node id of the target in the link.
 * @memberof Graph/helper
 */
/**
 * @typedef {Object} Node
 * @property {string} id - the id of the node.
 * @property {string} [color=] - color of the node (optional).
 * @property {string} [fontColor=] - node text label font color (optional).
 * @property {string} [size=] - size of the node (optional).
 * @property {string} [symbolType=] - symbol type of the node (optional).
 * @property {string} [svg=] - custom svg for node (optional).
 * @memberof Graph/helper
 */
import {
    forceX as d3ForceX,
    forceY as d3ForceY,
    forceSimulation as d3ForceSimulation,
    forceManyBody as d3ForceManyBody,
} from "d3-force";

import CONST from "./graph.const";
import DEFAULT_CONFIG from "./graph.config";
import ERRORS from "../../err";

import utils from "../../utils";
import { computeNodeDegree } from "./collapse.helper";

const NODE_PROPS_WHITELIST = ["id", "highlighted", "x", "y", "index", "vy", "vx"];
const LINK_CUSTOM_PROPS_WHITELIST = ["color", "opacity", "strokeWidth", "label"];

/**
 * Create d3 forceSimulation to be applied on the graph.<br/>
 * {@link https://github.com/d3/d3-force#forceSimulation|d3-force#forceSimulation}<br/>
 * {@link https://github.com/d3/d3-force#simulation_force|d3-force#simulation_force}<br/>
 * Wtf is a force? {@link https://github.com/d3/d3-force#forces| here}
 * @param  {number} width - the width of the container area of the graph.
 * @param  {number} height - the height of the container area of the graph.
 * @param  {number} gravity - the force strength applied to the graph.
 * @returns {Object} returns the simulation instance to be consumed.
 * @memberof Graph/helper
 */
function _createForceSimulation(width, height, gravity) {
    const frx = d3ForceX(width / 2).strength(CONST.FORCE_X);
    const fry = d3ForceY(height / 2).strength(CONST.FORCE_Y);
    const forceStrength = gravity;

    return d3ForceSimulation()
        .force("charge", d3ForceManyBody().strength(forceStrength))
        .force("x", frx)
        .force("y", fry);
}

/**
 * Receives a matrix of the graph with the links source and target as concrete node instances and it transforms it
 * in a lightweight matrix containing only links with source and target being strings representative of some node id
 * and the respective link value (if non existent will default to 1).
 * @param  {Array.<Link>} graphLinks - an array of all graph links.
 * @param  {Object} config - the graph config.
 * @returns {Object.<string, Object>} an object containing a matrix of connections of the graph, for each nodeId,
 * there is an object that maps adjacent nodes ids (string) and their values (number).
 * @memberof Graph/helper
 */
function _initializeLinks(graphLinks, config) {
    return graphLinks.reduce((links, l) => {
        const source = l.source.id !== undefined && l.source.id !== null ? l.source.id : l.source;
        const target = l.target.id !== undefined && l.target.id !== null ? l.target.id : l.target;

        if (!links[source]) {
            links[source] = {};
        }

        if (!links[target]) {
            links[target] = {};
        }

        const value = config.collapsible && l.isHidden ? 0 : l.value || 1;

        links[source][target] = value;

        if (!config.directed) {
            links[target][source] = value;
        }

        return links;
    }, {});
}

/**
 * Method that initialize graph nodes provided by rd3g consumer and adds additional default mandatory properties
 * that are optional for the user. Also it generates an index mapping, this maps nodes ids the their index in the array
 * of nodes. This is needed because d3 callbacks such as node click and link click return the index of the node.
 * @param  {Array.<Node>} graphNodes - the array of nodes provided by the rd3g consumer.
 * @returns {Object.<string, Object>} returns the nodes ready to be used within rd3g with additional properties such as x, y
 * and highlighted values.
 * @memberof Graph/helper
 */
function _initializeNodes(graphNodes) {
    let nodes = {};
    const n = graphNodes.length;

    for (let i = 0; i < n; i++) {
        const node = graphNodes[i];

        node.highlighted = false;

        if (!node.hasOwnProperty("x")) {
            node.x = 0;
        }
        if (!node.hasOwnProperty("y")) {
            node.y = 0;
        }

        nodes[node.id.toString()] = node;
    }

    return nodes;
}

/**
 * Maps an input link (with format `{ source: 'sourceId', target: 'targetId' }`) to a d3Link
 * (with format `{ source: { id: 'sourceId' }, target: { id: 'targetId' } }`). If d3Link with
 * given index exists already that same d3Link is returned.
 * @param {Object} link - input link.
 * @param {number} index - index of the input link.
 * @param {Array.<Object>} d3Links - all d3Links.
 * @param  {Object} config - same as {@link #graphrenderer|config in renderGraph}.
 * @param {Object} state - Graph component current state (same format as returned object on this function).
 * @returns {Object} a d3Link.
 * @memberof Graph/helper
 */
function _mapDataLinkToD3Link(link, index, d3Links = [], config, state = {}) {
    // find the matching link if it exists
    const d3Link = d3Links.find(l => l.source.id === link.source && l.target.id === link.target);
    const customProps = utils.pick(link, LINK_CUSTOM_PROPS_WHITELIST);

    if (d3Link) {
        const toggledDirected = state.config && state.config.directed && config.directed !== state.config.directed;
        const refinedD3Link = {
            index,
            ...d3Link,
            ...customProps,
        };

        // every time we toggle directed config all links should be visible again
        if (toggledDirected) {
            return { ...refinedD3Link, isHidden: false };
        }

        // every time we disable collapsible (collapsible is false) all links should be visible again
        return config.collapsible ? refinedD3Link : { ...refinedD3Link, isHidden: false };
    }

    const highlighted = false;
    const source = {
        id: link.source,
        highlighted,
    };
    const target = {
        id: link.target,
        highlighted,
    };

    return {
        index,
        source,
        target,
        ...customProps,
    };
}

/**
 * Tags orphan nodes with a `_orphan` flag.
 * @param {Object.<string, Object>} nodes - nodes mapped by their id.
 * @param {Object.<string, Object>} linksMatrix - an object containing a matrix of connections of the graph, for each nodeId,
 * there is an object that maps adjacent nodes ids (string) and their values (number).
 * @returns {Object.<string, Object>} same input nodes structure with tagged orphans nodes where applicable.
 * @memberof Graph/helper
 */
function _tagOrphanNodes(nodes, linksMatrix) {
    return Object.keys(nodes).reduce((acc, nodeId) => {
        const { inDegree, outDegree } = computeNodeDegree(nodeId, linksMatrix);
        const node = nodes[nodeId];
        const taggedNode = inDegree === 0 && outDegree === 0 ? { ...node, _orphan: true } : node;

        acc[nodeId] = taggedNode;

        return acc;
    }, {});
}

/**
 * Some integrity validations on links and nodes structure. If some validation fails the function will
 * throw an error.
 * @param  {Object} data - Same as {@link #initializeGraphState|data in initializeGraphState}.
 * @throws can throw the following error msg:
 * INSUFFICIENT_DATA - msg if no nodes are provided
 * INVALID_LINKS - if links point to nonexistent nodes
 * @returns {undefined}
 * @memberof Graph/helper
 */
function _validateGraphData(data) {
    if (!data.nodes || !data.nodes.length) {
        utils.throwErr("Graph", ERRORS.INSUFFICIENT_DATA);
    }

    const n = data.links.length;

    for (let i = 0; i < n; i++) {
        const l = data.links[i];

        if (!data.nodes.find(n => n.id === l.source)) {
            utils.throwErr("Graph", `${ERRORS.INVALID_LINKS} - "${l.source}" is not a valid source node id`);
        }

        if (!data.nodes.find(n => n.id === l.target)) {
            utils.throwErr("Graph", `${ERRORS.INVALID_LINKS} - "${l.target}" is not a valid target node id`);
        }

        if (l && l.value !== undefined && typeof l.value !== "number") {
            utils.throwErr(
                "Graph",
                `${ERRORS.INVALID_LINK_VALUE} - found in link with source "${l.source}" and target "${l.target}"`
            );
        }
    }
}

// list of properties that are of no interest when it comes to nodes and links comparison
const NODE_PROPERTIES_DISCARD_TO_COMPARE = ["x", "y", "vx", "vy", "index"];

/**
 * This function checks for graph elements (nodes and links) changes, in two different
 * levels of significance, updated elements (whether some property has changed in some
 * node or link) and new elements (whether some new elements or added/removed from the graph).
 * @param {Object} nextProps - nextProps that graph will receive.
 * @param {Object} currentState - the current state of the graph.
 * @returns {Object.<string, boolean>} returns object containing update check flags:
 * - newGraphElements - flag that indicates whether new graph elements were added.
 * - graphElementsUpdated - flag that indicates whether some graph elements have
 * updated (some property that is not in NODE_PROPERTIES_DISCARD_TO_COMPARE was added to
 * some node or link or was updated).
 * @memberof Graph/helper
 */
function checkForGraphElementsChanges(nextProps, currentState) {
    const nextNodes = nextProps.data.nodes.map(n => utils.antiPick(n, NODE_PROPERTIES_DISCARD_TO_COMPARE));
    const nextLinks = nextProps.data.links;
    const stateD3Nodes = currentState.d3Nodes.map(n => utils.antiPick(n, NODE_PROPERTIES_DISCARD_TO_COMPARE));
    const stateD3Links = currentState.d3Links.map(l => ({
        // FIXME: solve this source data inconsistency later
        source: l.source.id !== undefined && l.source.id !== null ? l.source.id : l.source,
        target: l.target.id !== undefined && l.target.id !== null ? l.target.id : l.target,
    }));
    const graphElementsUpdated = !(
        utils.isDeepEqual(nextNodes, stateD3Nodes) && utils.isDeepEqual(nextLinks, stateD3Links)
    );
    const newGraphElements =
        nextNodes.length !== stateD3Nodes.length ||
        nextLinks.length !== stateD3Links.length ||
        !utils.isDeepEqual(nextNodes.map(({ id }) => ({ id })), stateD3Nodes.map(({ id }) => ({ id }))) ||
        !utils.isDeepEqual(nextLinks, stateD3Links.map(({ source, target }) => ({ source, target })));

    return { graphElementsUpdated, newGraphElements };
}

/**
 * Logic to check for changes in graph config.
 * @param {Object} nextProps - nextProps that graph will receive.
 * @param {Object} currentState - the current state of the graph.
 * @returns {Object.<string, boolean>} returns object containing update check flags:
 * - configUpdated - global flag that indicates if any property was updated.
 * - d3ConfigUpdated - specific flag that indicates changes in d3 configurations.
 * @memberof Graph/helper
 */
function checkForGraphConfigChanges(nextProps, currentState) {
    const newConfig = nextProps.config || {};
    const configUpdated =
        newConfig && !utils.isEmptyObject(newConfig) && !utils.isDeepEqual(newConfig, currentState.config);
    const d3ConfigUpdated = newConfig && newConfig.d3 && !utils.isDeepEqual(newConfig.d3, currentState.config.d3);

    return { configUpdated, d3ConfigUpdated };
}

/**
 * Returns the transformation to apply in order to center the graph on the
 * selected node.
 * @param {Object} d3Node - node to focus the graph view on.
 * @param {Object} config - same as {@link #graphrenderer|config in renderGraph}.
 * @returns {string} transform rule to apply.
 * @memberof Graph/helper
 */
function getCenterAndZoomTransformation(d3Node, config) {
    if (!d3Node) {
        return;
    }

    const { width, height, focusZoom } = config;

    return `
        translate(${width / 2}, ${height / 2})
        scale(${focusZoom})
        translate(${-d3Node.x}, ${-d3Node.y})
    `;
}

/**
 * Encapsulates common procedures to initialize graph.
 * @param {Object} props - Graph component props, object that holds data, id and config.
 * @param {Object} props.data - Data object holds links (array of **Link**) and nodes (array of **Node**).
 * @param {string} props.id - the graph id.
 * @param {Object} props.config - same as {@link #graphrenderer|config in renderGraph}.
 * @param {Object} state - Graph component current state (same format as returned object on this function).
 * @returns {Object} a fully (re)initialized graph state object.
 * @memberof Graph/helper
 */
function initializeGraphState({ data, id, config }, state) {
    _validateGraphData(data);

    let graph;

    if (state && state.nodes) {
        graph = {
            nodes: data.nodes.map(n =>
                state.nodes[n.id]
                    ? Object.assign({}, n, utils.pick(state.nodes[n.id], NODE_PROPS_WHITELIST))
                    : Object.assign({}, n)
            ),
            links: data.links.map((l, index) => _mapDataLinkToD3Link(l, index, state && state.d3Links, config, state)),
        };
    } else {
        graph = {
            nodes: data.nodes.map(n => Object.assign({}, n)),
            links: data.links.map(l => Object.assign({}, l)),
        };
    }

    let newConfig = Object.assign({}, utils.merge(DEFAULT_CONFIG, config || {}));
    let links = _initializeLinks(graph.links, newConfig); // matrix of graph connections
    let nodes = _tagOrphanNodes(_initializeNodes(graph.nodes), links);
    const { nodes: d3Nodes, links: d3Links } = graph;
    const formatedId = id.replace(/ /g, "_");
    const simulation = _createForceSimulation(newConfig.width, newConfig.height, newConfig.d3 && newConfig.d3.gravity);

    const { minZoom, maxZoom, focusZoom } = newConfig;

    if (focusZoom > maxZoom) {
        newConfig.focusZoom = maxZoom;
    } else if (focusZoom < minZoom) {
        newConfig.focusZoom = minZoom;
    }

    return {
        id: formatedId,
        config: newConfig,
        links,
        d3Links,
        nodes,
        d3Nodes,
        highlightedNode: "",
        simulation,
        newGraphElements: false,
        configUpdated: false,
        transform: 1,
    };
}

/**
 * This function updates the highlighted value for a given node and also updates highlight props.
 * @param {Object.<string, Object>} nodes - an object containing all nodes mapped by their id.
 * @param {Object.<string, Object>} links - an object containing a matrix of connections of the graph.
 * @param {Object} config - an object containing rd3g consumer defined configurations {@link #config config} for the graph.
 * @param {string} id - identifier of node to update.
 * @param {string} value - new highlight value for given node.
 * @returns {Object} returns an object containing the updated nodes
 * and the id of the highlighted node.
 * @memberof Graph/helper
 */
function updateNodeHighlightedValue(nodes, links, config, id, value = false) {
    const highlightedNode = value ? id : "";
    const node = Object.assign({}, nodes[id], { highlighted: value });
    let updatedNodes = Object.assign({}, nodes, { [id]: node });

    // when highlightDegree is 0 we want only to highlight selected node
    if (links[id] && config.highlightDegree !== 0) {
        updatedNodes = Object.keys(links[id]).reduce((acc, linkId) => {
            const updatedNode = Object.assign({}, updatedNodes[linkId], { highlighted: value });

            return Object.assign(acc, { [linkId]: updatedNode });
        }, updatedNodes);
    }

    return {
        nodes: updatedNodes,
        highlightedNode,
    };
}

export {
    checkForGraphConfigChanges,
    checkForGraphElementsChanges,
    getCenterAndZoomTransformation,
    initializeGraphState,
    updateNodeHighlightedValue,
};
