/**
 * @module Graph/helper
 * @description
 * Offers a series of methods that isolate logic of Graph component.
 */
import React from 'react';

import {
    forceX as d3ForceX,
    forceY as d3ForceY,
    forceSimulation as d3ForceSimulation,
    forceManyBody as d3ForceManyBody
} from 'd3-force';

import CONST from './const';

import Link from '../Link/';
import Node from '../Node/';

/**
 * Build some Link properties based on given parameters.
 * @param  {string} source - the id of the source node (from).
 * @param  {string} target - the id of the target node (to).
 * @param  {Object.<string, Object>} nodes - same as {@link #buildGraph|nodes in buildGraph}.
 * @param  {Object.<string, Object>} links - same as {@link #buildGraph|links in buildGraph}.
 * @param  {Object} config - same as {@link #buildGraph|config in buildGraph}.
 * @param  {function[]} linkCallbacks - same as {@link #buildGraph|linkCallbacks in buildGraph}.
 * @param  {boolean} someNodeHighlighted - same as {@link #buildGraph|someNodeHighlighted in buildGraph}.
 * @param  {number} transform - value that indicates the amount of zoom transformation.
 * @returns {Object} returns an object that aggregates all props for creating respective Link component instance.
 * @memberof Graph/helper
 */
function _buildLinkProps(source, target, nodes, links, config, linkCallbacks, someNodeHighlighted, transform) {
    const x1 = nodes[source] && nodes[source].x || '0';
    const y1 = nodes[source] && nodes[source].y || '0';
    const x2 = nodes[target] && nodes[target].x || '0';
    const y2 = nodes[target] && nodes[target].y || '0';

    let opacity = config.link.opacity;

    if (someNodeHighlighted) {
        opacity = (nodes[source].highlighted && nodes[target].highlighted) ? config.link.opacity
                                                                           : config.highlightOpacity;
    }

    let stroke = config.link.color;

    if (nodes[source].highlighted && nodes[target].highlighted) {
        stroke = config.link.highlightColor === CONST.KEYWORDS.SAME ? config.link.color
                                                                    : config.link.highlightColor;
    }

    const linkValue = links[source][target] || links[target][source];

    let strokeWidth = config.link.strokeWidth * (1 / transform);

    if (config.link.semanticStrokeWidth) {
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
        onClickLink: linkCallbacks.onClickLink
    };
}

/**
 * Build Link components for a given node.
 * @param  {string} nodeId - the id of the node to whom Link components will be generated.
 * @param  {Object.<string, Object>} nodes - same as {@link #buildGraph|nodes in buildGraph}.
 * @param  {Object.<string, Object>} links - same as {@link #buildGraph|links in buildGraph}.
 * @param  {Object} config - same as {@link #buildGraph|config in buildGraph}.
 * @param  {function[]} linkCallbacks - same as {@link #buildGraph|linkCallbacks in buildGraph}.
 * @param  {boolean} someNodeHighlighted - same as {@link #buildGraph|someNodeHighlighted in buildGraph}.
 * @param  {number} transform - value that indicates the amount of zoom transformation.
 * @returns {Object[]} returns the generated array of Link components.
 * @memberof Graph/helper
 */
function _buildNodeLinks(nodeId, nodes, links, config, linkCallbacks, someNodeHighlighted, transform) {
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
                    someNodeHighlighted,
                    transform
                );

                linksComponents.push(<Link key={key} {...props} />);
            }
        }
    }

    return linksComponents;
}

/**
 * Build some Node properties based on given parameters.
 * @param  {Object} node - the node object for whom we will generate properties.
 * @param  {Object} config - same as {@link #buildGraph|config in buildGraph}.
 * @param  {function[]} nodeCallbacks - same as {@link #buildGraph|nodeCallbacks in buildGraph}.
 * @param  {boolean} someNodeHighlighted - same as {@link #buildGraph|someNodeHighlighted in buildGraph}.
 * @param  {number} transform - value that indicates the amount of zoom transformation.
 * @returns {Object} returns object that contain Link props ready to be feeded to the Link component.
 * @memberof Graph/helper
 */
function _buildNodeProps(node, config, nodeCallbacks, someNodeHighlighted, transform) {
    let opacity = config.node.opacity;

    if (someNodeHighlighted) {
        opacity = node.highlighted ? config.node.opacity : config.highlightOpacity;
    }

    let fill = node.color || config.node.color;

    if (node.highlighted && config.node.highlightColor !== CONST.KEYWORDS.SAME) {
        fill = config.node.highlightColor;
    }

    let stroke = config.node.strokeColor;

    if (node.highlighted && config.node.highlightStrokeColor !== CONST.KEYWORDS.SAME) {
        stroke = config.node.highlightStrokeColor;
    }

    const t = 1 / transform;
    const nodeSize = node.size || config.node.size;
    const fontSize = node.highlighted ? config.node.highlightFontSize : config.node.fontSize;
    const dx = (fontSize * t) + (nodeSize / 100) + 1.5;
    const strokeWidth = node.highlighted ? config.node.highlightStrokeWidth : config.node.strokeWidth;

    return {
        className: CONST.NODE_CLASS_NAME,
        cursor: config.node.mouseCursor,
        cx: node && node.x || '0',
        cy: node && node.y || '0',
        fill,
        fontSize: fontSize * t,
        dx,
        fontWeight: node.highlighted ? config.node.highlightFontWeight : config.node.fontWeight,
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
        type: node.type || config.node.symbolType
    };
}

/**
 * Method that actually is exported an consumed by Graph component in order to build all Nodes and Link
 * components.
 * @param  {Object.<string, Object>} nodes - an object containing all nodes mapped by their id.
 * @param  {function[]} nodeCallbacks - array of callbacks for used defined event handler for node interactions.
 * @param  {Object.<string, Object>} links - an object containing a matrix of connections of the graph, for each nodeId,
 * there is an Object that maps adjacent nodes ids (string) and their values (number).
 * @param  {function[]} linkCallbacks - array of callbacks for used defined event handler for link interactions.
 * @param  {Object} config - an object containg rd3g consumer defined configurations [LINK README] for the graph.
 * @param  {boolean} someNodeHighlighted - this value is true when some node on the graph is highlighted.
 * @param  {number} transform - value that indicates the amount of zoom transformation.
 * @returns {Object} returns an object containg the generated nodes and links that form the graph. The result is
 * returned in a way that can be consumed by es6 **destructuring assignment**.
 * @memberof Graph/helper
 */
function buildGraph(nodes, nodeCallbacks, links, linkCallbacks, config, someNodeHighlighted, transform) {
    let linksComponents = [];
    let nodesComponents = [];

    for (let nodeId in nodes) {
        const props = _buildNodeProps(nodes[nodeId], config, nodeCallbacks, someNodeHighlighted, transform);

        nodesComponents.push(<Node key={nodeId} {...props} />);

        linksComponents = linksComponents.concat(
            _buildNodeLinks(nodeId, nodes, links, config, linkCallbacks, someNodeHighlighted, transform)
        );
    }

    return {
        nodes: nodesComponents,
        links: linksComponents
    };
}

/**
 * Create d3 forceSimulation to be applied on the graph.<br/>
 * <a href="https://github.com/d3/d3-force#forceSimulation" target="_blank">https://github.com/d3/d3-force#forceSimulation</a><br/>
 * <a href="https://github.com/d3/d3-force#simulation_force" target="_blank">https://github.com/d3/d3-force#simulation_force</a><br/>
 * @param  {number} width - the width of the container area of the graph.
 * @param  {number} height - the height of the container area of the graph.
 * @returns {Object} returns the simulation instance to be consumed.
 * @memberof Graph/helper
 */
function createForceSimulation(width, height) {
    const frx = d3ForceX(width / 2).strength(CONST.FORCE_X);
    const fry = d3ForceY(height / 2).strength(CONST.FORCE_Y);

    const simulation = d3ForceSimulation()
            .force('charge', d3ForceManyBody().strength(CONST.FORCE_IDEAL_STRENGTH))
            .force('x', frx)
            .force('y', fry);

    return simulation;
}

/**
 * Receives a matrix of the graph with the links source and target as concrete node instances and it transforms it
 * in a lightweight matrix containing only links with source and target being strings representative of some node id
 * and the respective link value (if non existant will default to 1).
 * @param  {Object[]} graphLinks - an array of all graph links but all the links contain the source and target nodes
 * objects.
 * @returns {Object.<string, Object>} an object containing a matrix of connections of the graph, for each nodeId,
 * there is an object that maps adjacent nodes ids (string) and their values (number).
 * @memberof Graph/helper
 */
function initializeLinks(graphLinks) {
    let links = {};

    graphLinks.forEach(l => {
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
    });

    return links;
}

/**
 * Method that initialize graph nodes provided by rd3g consumer and adds additional default mandatory properties
 * that are optional for the user. Also it generates an index mapping, this maps nodes ids the their index in the array
 * of nodes. This is needed because d3 callbacks such as node click and link click return the index of the node.
 * @param  {Object[]} graphNodes - the array of nodes provided by the rd3g consumer.
 * @returns {Object} returns the nodes ready to be used within rd3g with additional properties such as x, y
 * and highlighted values. Returns also the index mapping object of type Object.<number, string>.
 * @memberof Graph/helper
 */
function initializeNodes(graphNodes) {
    let nodes = {};
    let nodeIndexMapping = {};
    let index = 0;

    graphNodes.forEach(n => {
        n['highlighted'] = false;
        if (!n.hasOwnProperty('x')) n['x'] = 0;
        if (!n.hasOwnProperty('y')) n['y'] = 0;

        nodes[n.id.toString()] = n;
        nodeIndexMapping[index] = n.id;

        index++;
    });

    return {
        nodes,
        nodeIndexMapping
    };
}

export default {
    buildGraph,
    createForceSimulation,
    initializeLinks,
    initializeNodes
};
