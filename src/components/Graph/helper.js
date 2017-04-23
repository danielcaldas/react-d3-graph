import React from 'react';

import * as d3 from 'd3';

import CONST from './const';

import Link from '../Link/';
import Node from '../Node/';

function _buildLinkProps(source, target, nodes, links, config, linkCallbacks, someNodeHighlighted) {
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

    let strokeWidth = config.link.strokeWidth;

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

function _buildNodeLinks(nodeId, nodes, links, config, linkCallbacks, someNodeHighlighted) {
    let linksComponents = [];

    if (links[nodeId]) {
        const adjacents = Object.keys(links[nodeId]);
        const n = adjacents.length;

        for (let j=0; j < n; j++) {
            const source = nodeId;
            const target = adjacents[j];

            if (nodes[target]) {
                const key = `${nodeId}${CONST.COORDS_SEPARATOR}${target}`;
                const props = _buildLinkProps(source, target, nodes, links, config, linkCallbacks, someNodeHighlighted);

                linksComponents.push(<Link key={key} {...props} />);
            }
        }
    }

    return linksComponents;
}

function _buildNodeProps(node, config, nodeCallbacks, someNodeHighlighted) {
    let opacity = config.node.opacity;

    if (someNodeHighlighted) {
        opacity = node.highlighted ? config.node.opacity : config.highlightOpacity;
    }

    let fill = node.color || config.node.color;

    if (node.highlighted && config.node.highlightColor !== CONST.KEYWORDS.SAME) {
        fill = config.node.highlightColor;
    }

    return {
        className: CONST.NODE_CLASS_NAME,
        cursor: config.node.mouseCursor,
        cx: node && node.x || '0',
        cy: node && node.y || '0',
        fill,
        fontSize: node.highlighted ? config.node.highlightFontSize : config.node.fontSize,
        fontWeight: node.highlighted ? config.node.highlightFontWeight : config.node.fontWeight,
        id: node.id,
        label: node[config.node.labelProperty] || node.id,
        onClickNode: nodeCallbacks.onClickNode,
        onMouseOverNode: nodeCallbacks.onMouseOverNode,
        onMouseOut: nodeCallbacks.onMouseOut,
        opacity,
        renderLabel: config.node.renderLabel,
        size: node.size || config.node.size,
        stroke: node.highlighted ? config.node.highlightStrokeColor : config.node.strokeColor,
        strokeWidth: node.highlighted ? config.node.highlightStrokeWidth : config.node.strokeWidth,
        type: node.type || config.node.symbolType
    };
}

function buildGraph(nodes, nodeCallbacks, links, linkCallbacks, config, someNodeHighlighted) {
    let linksComponents = [];
    let nodesComponents = [];

    for (let nodeId in nodes) {
        const props = _buildNodeProps(nodes[nodeId], config, nodeCallbacks, someNodeHighlighted);

        nodesComponents.push(<Node key={nodeId} {...props} />);

        linksComponents = linksComponents.concat(
            _buildNodeLinks(nodeId, nodes, links, config, linkCallbacks, someNodeHighlighted)
        );
    }

    return {
        nodes: nodesComponents,
        links: linksComponents
    };
}

function createForceSimulation(width, height) {
    const forceX = d3.forceX(width / 2).strength(CONST.FORCE_X);
    const forceY = d3.forceY(height / 2).strength(CONST.FORCE_Y);

    const simulation = d3.forceSimulation()
            .force('charge', d3.forceManyBody().strength(CONST.FORCE_IDEAL_STRENGTH))
            .force('x', forceX)
            .force('y', forceY);

    return simulation;
}

function initializeLinks(graphLinks) {
    let links = {};

    graphLinks.forEach(l => {
        if (!links[l.source]) {
            links[l.source] = {};
        }

        if (!links[l.target]) {
            links[l.target] = {};
        }

        // @TODO: If the graph is directed this should be adapted
        links[l.source][l.target] = links[l.target][l.source] = l.value || 1;
    });

    return links;
}

function initializeNodes(graphNodes) {
    let nodes = {};
    let indexMapping = {};
    let index = 0;

    graphNodes.forEach(n => {
        n['highlighted'] = false;
        if (!n.hasOwnProperty('x')) n['x'] = 0;
        if (!n.hasOwnProperty('y')) n['y'] = 0;

        nodes[n.id.toString()] = n;
        indexMapping[index] = n.id;

        index++;
    });

    return {
        nodes,
        indexMapping
    };
}

export default {
    buildGraph,
    createForceSimulation,
    initializeLinks,
    initializeNodes
};
