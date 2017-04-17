import React from 'react';

import * as d3 from 'd3';

import CONST from './const';

import Link from '../Link/';
import Node from '../Node/';

function buildGraph(nodes, nodeCallbacks, links, linkCallbacks, config, someNodeHighlighted) {
    let linksComponents = [];
    let nodesComponents = [];

    for (let node of Object.values(nodes)) {
        const props = buildNodeProps(node, config, nodeCallbacks, someNodeHighlighted);

        nodesComponents.push(<Node key={node.id} {...props} />);

        linksComponents = linksComponents.concat(buildNodeLinks(node, nodes, links, config, linkCallbacks, someNodeHighlighted));
    }

    return {
        nodes: nodesComponents,
        links: linksComponents
    };
}

function buildNodeProps(node, config, nodeCallbacks, someNodeHighlighted) {
    const opacity = someNodeHighlighted ? (node.highlighted ? config.node.opacity : config.highlightOpacity) : config.node.opacity;

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

function buildNodeLinks(node, nodes, links, config, linkCallbacks, someNodeHighlighted) {
    let linksComponents = [];

    if (links[node.id]) {
        const x1 = node && node.x || '0';
        const y1 = node && node.y || '0';

        const adjacents = Object.keys(links[node.id]);
        const n = adjacents.length;

        for (let j=0; j < n; j++) {
            const target = adjacents[j];

            if (nodes[target]) {
                const key = `${node.id}${CONST.COORDS_SEPARATOR}${target}`;
                const props = buildLinkProps(node.id, target, x1, y1, nodes, links, config, linkCallbacks, someNodeHighlighted);

                linksComponents.push(<Link key={key} {...props} />);
            }
        }
    }

    return linksComponents;
}

function buildLinkProps(source, target, x1, y1, nodes, links, config, linkCallbacks, someNodeHighlighted) {
    const opacity = someNodeHighlighted ? (nodes[source].highlighted && nodes[target].highlighted) ? config.link.opacity : config.highlightOpacity : config.link.opacity;

    const stroke = (nodes[source].highlighted && nodes[target].highlighted) ?
                (config.link.highlightColor === CONST.KEYWORDS.SAME ? config.link.color : config.link.highlightColor)
                : config.link.color;

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
        x2: nodes[target] && nodes[target].x || '0',
        y2: nodes[target] && nodes[target].y || '0',
        strokeWidth,
        stroke,
        className: CONST.LINK_CLASS_NAME,
        opacity,
        onClickLink: linkCallbacks.onClickLink
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

function initializeLinks(graphLinks) {
    let links = {};

    graphLinks.forEach(l => {
        if (!links[l.source]) {
            links[l.source] = {};
        }

        if (!links[l.target]) {
            links[l.target] = {};
        }

        // @TODO: If the graph is directed this should not happen
        links[l.source][l.target] = links[l.target][l.source] = l.value || 1;
    });

    return links;
}

export default {
    buildGraph,
    createForceSimulation,
    initializeLinks,
    initializeNodes
};
