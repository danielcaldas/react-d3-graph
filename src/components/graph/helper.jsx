/**
 * @module Graph/helper
 * @description
 * Offers a series of methods that isolate logic of Graph component.
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
 * @memberof Graph/helper
 */
import React from 'react';

import {
    forceX as d3ForceX,
    forceY as d3ForceY,
    forceSimulation as d3ForceSimulation,
    forceManyBody as d3ForceManyBody
} from 'd3-force';

import CONST from './const';
import DEFAULT_CONFIG from './config';
import ERRORS from '../../err';

import Link from '../link/';
import Node from '../node/';
import utils from '../../utils';

/**
 * Build some Link properties based on given parameters.
 * @param  {string} source - the id of the source node (from).
 * @param  {string} target - the id of the target node (to).
 * @param  {Object.<string, Object>} nodes - same as {@link #buildGraph|nodes in buildGraph}.
 * @param  {Object.<string, Object>} links - same as {@link #buildGraph|links in buildGraph}.
 * @param  {Object} config - same as {@link #buildGraph|config in buildGraph}.
 * @param  {Function[]} linkCallbacks - same as {@link #buildGraph|linkCallbacks in buildGraph}.
 * @param  {string} highlightedNode - same as {@link #buildGraph|highlightedNode in buildGraph}.
 * @param  {Object} highlightedLink - same as {@link #buildGraph|highlightedLink in buildGraph}.
 * @param  {number} transform - value that indicates the amount of zoom transformation.
 * @returns {Object} returns an object that aggregates all props for creating respective Link component instance.
 * @memberof Graph/helper
 */
function _buildLinkProps(source, target, nodes, links, config, linkCallbacks, highlightedNode,
     highlightedLink, transform) {
    const x1 = nodes[source] && nodes[source].x || 0;
    const y1 = nodes[source] && nodes[source].y || 0;
    const x2 = nodes[target] && nodes[target].x || 0;
    const y2 = nodes[target] && nodes[target].y || 0;

    let mainNodeParticipates = false;

    switch (config.highlightDegree) {
        case 0:
        break;
        case 2:
        mainNodeParticipates = true;
        break;
        default: // 1st degree is the fallback behavior
        mainNodeParticipates = source === highlightedNode || target === highlightedNode;
        break;
    }

    const reasonNode = mainNodeParticipates && nodes[source].highlighted && nodes[target].highlighted;
    const reasonLink = source === (highlightedLink && highlightedLink.source)
                    && target === (highlightedLink && highlightedLink.target);
    const highlight = reasonNode || reasonLink;

    let opacity = config.link.opacity;

    if (highlightedNode || (highlightedLink && highlightedLink.source)) {
        opacity = highlight ? config.link.opacity : config.highlightOpacity;
    }

    let stroke = config.link.color;

    if (highlight) {
        stroke = config.link.highlightColor === CONST.KEYWORDS.SAME ? config.link.color
                                                                    : config.link.highlightColor;
    }

    let strokeWidth = config.link.strokeWidth * (1 / transform);

    if (config.link.semanticStrokeWidth) {
        const linkValue = links[source][target] || links[target][source] || 1;

        strokeWidth += (linkValue * strokeWidth) / 10;
    }

    return {
        source,
        target,
        x1,
        y1,
        x2,
        y2,
        strokeWidth,
        stroke,
        className: CONST.LINK_CLASS_NAME,
        opacity,
        onClickLink: linkCallbacks.onClickLink,
        onMouseOverLink: linkCallbacks.onMouseOverLink,
        onMouseOutLink: linkCallbacks.onMouseOutLink
    };
}

/**
 * Build Link components for a given node.
 * @param  {string} nodeId - the id of the node to whom Link components will be generated.
 * @param  {Object.<string, Object>} nodes - same as {@link #buildGraph|nodes in buildGraph}.
 * @param  {Object.<string, Object>} links - same as {@link #buildGraph|links in buildGraph}.
 * @param  {Object} config - same as {@link #buildGraph|config in buildGraph}.
 * @param  {Function[]} linkCallbacks - same as {@link #buildGraph|linkCallbacks in buildGraph}.
 * @param  {string} highlightedNode - same as {@link #buildGraph|highlightedNode in buildGraph}.
 * @param  {Object} highlightedLink - same as {@link #buildGraph|highlightedLink in buildGraph}.
 * @param  {number} transform - value that indicates the amount of zoom transformation.
 * @returns {Object[]} returns the generated array of Link components.
 * @memberof Graph/helper
 */
function _buildNodeLinks(nodeId, nodes, links, config, linkCallbacks, highlightedNode, highlightedLink, transform) {
    let linksComponents = [];

    if (links[nodeId]) {
        const adjacents = Object.keys(links[nodeId]);
        const n = adjacents.length;

        for (let j=0; j < n; j++) {
            const source = nodeId;
            const target = adjacents[j];

            if (nodes[target]) {
                const key = `${nodeId}${CONST.COORDS_SEPARATOR}${target}`;
                const props = _buildLinkProps(
                    source,
                    target,
                    nodes,
                    links,
                    config,
                    linkCallbacks,
                    highlightedNode,
                    highlightedLink,
                    transform
                );

                linksComponents.push(<Link key={key} {...props} />);
            }
        }
    }

    return linksComponents;
}

/**
 * Get the correct node opacity in order to properly make decisions based on context such as currently highlighted node.
 * @param  {Object} node - the node object for whom we will generate properties.
 * @param  {string} highlightedNode - same as {@link #buildGraph|highlightedNode in buildGraph}.
 * @param  {Object} highlightedLink - same as {@link #buildGraph|highlightedLink in buildGraph}.
 * @param  {Object} config - same as {@link #buildGraph|config in buildGraph}.
 * @returns {number} the opacity value for the given node.
 * @memberof Graph/helper
 */
function _getNodeOpacity(node, highlightedNode, highlightedLink, config) {
    const highlight = node.highlighted
                 || node.id === (highlightedLink && highlightedLink.source)
                 || node.id === (highlightedLink && highlightedLink.target);
    const someNodeHighlighted = !!(highlightedNode
                        || highlightedLink && highlightedLink.source && highlightedLink.target);
    let opacity;

    if (someNodeHighlighted && config.highlightDegree === 0) {
        opacity = highlight ? config.node.opacity : config.highlightOpacity;
    } else if (someNodeHighlighted) {
        opacity = highlight ? config.node.opacity : config.highlightOpacity;
    } else {
        opacity = config.node.opacity;
    }

    return opacity;
}

/**
 * Build some Node properties based on given parameters.
 * @param  {Object} node - the node object for whom we will generate properties.
 * @param  {Object} config - same as {@link #buildGraph|config in buildGraph}.
 * @param  {Function[]} nodeCallbacks - same as {@link #buildGraph|nodeCallbacks in buildGraph}.
 * @param  {string} highlightedNode - same as {@link #buildGraph|highlightedNode in buildGraph}.
 * @param  {Object} highlightedLink - same as {@link #buildGraph|highlightedLink in buildGraph}.
 * @param  {number} transform - value that indicates the amount of zoom transformation.
 * @returns {Object} returns object that contain Link props ready to be feeded to the Link component.
 * @memberof Graph/helper
 */
function _buildNodeProps(node, config, nodeCallbacks, highlightedNode, highlightedLink, transform) {
    const highlight = node.highlighted
                    || (node.id === (highlightedLink && highlightedLink.source)
                    || node.id === (highlightedLink && highlightedLink.target));
    const opacity = _getNodeOpacity(node, highlightedNode, highlightedLink, config);
    let fill = node.color || config.node.color;

    if (highlight && config.node.highlightColor !== CONST.KEYWORDS.SAME) {
        fill = config.node.highlightColor;
    }

    let stroke = config.node.strokeColor;

    if (highlight && config.node.highlightStrokeColor !== CONST.KEYWORDS.SAME) {
        stroke = config.node.highlightStrokeColor;
    }

    const t = 1 / transform;
    const nodeSize = node.size || config.node.size;
    const fontSize = highlight ? config.node.highlightFontSize : config.node.fontSize;
    const dx = (fontSize * t) + (nodeSize / 100) + 1.5;
    const strokeWidth = highlight ? config.node.highlightStrokeWidth : config.node.strokeWidth;

    return {
        className: CONST.NODE_CLASS_NAME,
        cursor: config.node.mouseCursor,
        cx: node && node.x || '0',
        cy: node && node.y || '0',
        fill,
        fontSize: fontSize * t,
        dx,
        fontWeight: highlight ? config.node.highlightFontWeight : config.node.fontWeight,
        id: node.id,
        label: node[config.node.labelProperty] || node.id,
        onClickNode: nodeCallbacks.onClickNode,
        onMouseOverNode: nodeCallbacks.onMouseOverNode,
        onMouseOut: nodeCallbacks.onMouseOut,
        opacity,
        renderLabel: config.node.renderLabel,
        size: nodeSize * t,
        stroke,
        strokeWidth: strokeWidth * t,
        type: node.symbolType || config.node.symbolType
    };
}

/**
 * Method that actually is exported an consumed by Graph component in order to build all Nodes and Link
 * components.
 * @param  {Object.<string, Object>} nodes - an object containing all nodes mapped by their id.
 * @param  {Function[]} nodeCallbacks - array of callbacks for used defined event handler for node interactions.
 * @param  {Object.<string, Object>} links - an object containing a matrix of connections of the graph, for each nodeId,
 * there is an Object that maps adjacent nodes ids (string) and their values (number).
 * ```javascript
 *  // links example
 *  {
 *     "Androsynth": {
 *         "Chenjesu": 1,
 *         "Ilwrath": 1,
 *         "Mycon": 1,
 *         "Spathi": 1,
 *         "Umgah": 1,
 *         "VUX": 1,
 *         "Guardian": 1
 *     },
 *     "Chenjesu": {
 *         "Androsynth": 1,
 *         "Mycon": 1,
 *         "Spathi": 1,
 *         "Umgah": 1,
 *         "VUX": 1,
 *         "Broodhmome": 1
 *     },
 *     ...
 *  }
 * ```
 * @param  {Function[]} linkCallbacks - array of callbacks for used defined event handler for link interactions.
 * @param  {Object} config - an object containing rd3g consumer defined configurations {@link #config config} for the graph.
 * @param  {string} highlightedNode - this value contains a string that represents the some currently highlighted node.
 * @param  {Object} highlightedLink - this object contains a source and target property for a link that is highlighted at some point in time.
 * @param  {string} highlightedLink.source - id of source node for highlighted link.
 * @param  {string} highlightedLink.target - id of target node for highlighted link.
 * @param  {number} transform - value that indicates the amount of zoom transformation.
 * @returns {Object} returns an object containing the generated nodes and links that form the graph. The result is
 * returned in a way that can be consumed by es6 **destructuring assignment**.
 * @memberof Graph/helper
 */
function buildGraph(nodes, nodeCallbacks, links, linkCallbacks, config, highlightedNode, highlightedLink, transform) {
    let linksComponents = [];
    let nodesComponents = [];

    for (let i = 0, keys = Object.keys(nodes), n = keys.length; i < n; i++) {
        const nodeId = keys[i];

        const props = _buildNodeProps(nodes[nodeId], config, nodeCallbacks,
                                        highlightedNode, highlightedLink, transform);

        nodesComponents.push(<Node key={nodeId} {...props} />);

        linksComponents = linksComponents.concat(
            _buildNodeLinks(nodeId, nodes, links, config, linkCallbacks, highlightedNode, highlightedLink, transform)
        );
    }

    return {
        nodes: nodesComponents,
        links: linksComponents
    };
}

/**
 * Create d3 forceSimulation to be applied on the graph.<br/>
 * {@link https://github.com/d3/d3-force#forceSimulation|d3-force#forceSimulation}<br/>
 * {@link https://github.com/d3/d3-force#simulation_force|d3-force#simulation_force}<br/>
 * Wtf is a force? {@link https://github.com/d3/d3-force#forces| here}
 * @param  {number} width - the width of the container area of the graph.
 * @param  {number} height - the height of the container area of the graph.
 * @returns {Object} returns the simulation instance to be consumed.
 * @memberof Graph/helper
 */
function createForceSimulation(width, height) {
    const frx = d3ForceX(width / 2).strength(CONST.FORCE_X);
    const fry = d3ForceY(height / 2).strength(CONST.FORCE_Y);

    return d3ForceSimulation()
            .force('charge', d3ForceManyBody().strength(CONST.FORCE_IDEAL_STRENGTH))
            .force('x', frx)
            .force('y', fry);
}

/**
 * Encapsulates common procedures to initialize graph.
 * @param {Object} props - Graph component props, object that holds data, id and config.
 * @param {Object} props.data - Data object holds links (array of **Link**) and nodes (array of **Node**).
 * @param {string} props.id - the graph id.
 * @param {Object} props.config - same as {@link #buildGraph|config in buildGraph}.
 * @param {Object} state - Graph component current state (same format as returned object on this function).
 * @returns {Object} a fully (re)initialized graph state object.
 * @memberof Graph/helper
 */
function initializeGraphState({data, id, config}, state) {
    let graph;

    validateGraphData(data);

    if (state && state.nodes && state.links) {
        // absorb existent positioning
        graph = {
            nodes: data.nodes.map(n => Object.assign({}, n, state.nodes[n.id])),
            links: {}
        };
    } else {
        graph = {
            nodes: data.nodes.map(n => Object.assign({}, n)),
            links: {}
        };
    }

    graph.links = data.links.map(l => Object.assign({}, l));

    let newConfig = Object.assign({}, utils.merge(DEFAULT_CONFIG, config || {}));
    let nodes = initializeNodes(graph.nodes);
    let links = initializeLinks(graph.links); // matrix of graph connections
    const {nodes: d3Nodes, links: d3Links} = graph;
    const formatedId = id.replace(/ /g, '_');
    const simulation = createForceSimulation(newConfig.width, newConfig.height);

    return {
        id: formatedId,
        config: newConfig,
        links,
        d3Links,
        nodes,
        d3Nodes,
        highlightedNode: '',
        simulation,
        newGraphElements: false,
        configUpdated: false,
        transform: 1
    };
}

/**
 * Receives a matrix of the graph with the links source and target as concrete node instances and it transforms it
 * in a lightweight matrix containing only links with source and target being strings representative of some node id
 * and the respective link value (if non existent will default to 1).
 * @param  {Object[]} graphLinks - an array of all graph links but all the links contain the source and target nodes
 * objects.
 * @returns {Object.<string, Object>} an object containing a matrix of connections of the graph, for each nodeId,
 * there is an object that maps adjacent nodes ids (string) and their values (number).
 * @memberof Graph/helper
 */
function initializeLinks(graphLinks) {
    return graphLinks.reduce((links, l) => {
        const source = l.source.id || l.source;
        const target = l.target.id || l.target;

        if (!links[source]) {
            links[source] = {};
        }

        if (!links[target]) {
            links[target] = {};
        }

        // @TODO: If the graph is directed this should be adapted
        links[source][target] = links[target][source] = l.value || 1;

        return links;
    }, {});
}

/**
 * Method that initialize graph nodes provided by rd3g consumer and adds additional default mandatory properties
 * that are optional for the user. Also it generates an index mapping, this maps nodes ids the their index in the array
 * of nodes. This is needed because d3 callbacks such as node click and link click return the index of the node.
 * @param  {Object[]} graphNodes - the array of nodes provided by the rd3g consumer.
 * @returns {Object} returns the nodes ready to be used within rd3g with additional properties such as x, y
 * and highlighted values.
 * @memberof Graph/helper
 */
function initializeNodes(graphNodes) {
    let nodes = {};
    const n = graphNodes.length;

    for (let i=0; i < n; i++) {
        const node = graphNodes[i];

        node.highlighted = false;

        if (!node.hasOwnProperty('x')) { node['x'] = 0; }
        if (!node.hasOwnProperty('y')) { node['y'] = 0; }

        nodes[node.id.toString()] = node;
    }

    return nodes;
}

/**
 * Some integrity validations on links and nodes structure. If some validation fails the function will
 * throw an error.
 * @param  {Object} data - Same as {@link #initializeGraphState|data in initializeGraphState}.
 * @memberof Graph/helper
 * @throws can throw the following error msg:
 * INSUFFICIENT_DATA - msg if no nodes are provided
 * INVALID_LINKS - if links point to nonexistent nodes
 */
function validateGraphData(data) {
    if (!data.nodes || !data.nodes.length) {
        utils.throwErr('Graph', ERRORS.INSUFFICIENT_DATA);
    }

    const n = data.links.length;

    for (let i=0; i < n; i++) {
        const l = data.links[i];

        if (!data.nodes.find(n => n.id === l.source)) {
            utils.throwErr('Graph', `${ERRORS.INVALID_LINKS} - ${l.source} is not a valid node id`);
        }
        if (!data.nodes.find(n => n.id === l.target)) {
            utils.throwErr('Graph', `${ERRORS.INVALID_LINKS} - ${l.target} is not a valid node id`);
        }
    }
}

export default {
    buildGraph,
    createForceSimulation,
    initializeGraphState,
    initializeLinks,
    initializeNodes
};
