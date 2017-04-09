import React from 'react';

import CONST from './const';

import Link from '../Link/';
import Node from '../Node/';

// @TODO: Remove all non sense calls to toString() method
function buildGraph(nodes, nodeCallbacks, links, linkCallbacks, config, someNodeHighlighted) {
    // @TODO: Many of this attributes are calculated only once, thus being more effecient to calculate them
    // on a config time or something similar!

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

    const fill = node.highlighted ?
                (config.node.highlightColor === CONST.KEYWORDS.SAME ? (node.color || config.node.color) : node.highlightColor)
                : (node.color || config.node.color);

    return {
        className: CONST.NODE_CLASS_NAME,
        cursor: config.node.mouseCursor,
        cx: node && node.x && node.x.toString() || '0',
        cy: node && node.y && node.y.toString() || '0',
        fill,
        fontSize: node.highlighted ? config.node.highlightFontSize : config.node.fontSize,
        fontWeight: node.highlighted ? config.node.highlightFontWeight : config.node.fontWeight,
        id: node.id.toString(),
        label: node[config.node.labelProperty] || node.id.toString(),
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

        const adjacents = Object.keys(links[node.id]).map(k => parseInt(k, 10));
        const n = adjacents.length;

        for (let j=0; j < n; j++) {
            const k = adjacents[j];

            if (nodes[k]) {
                const key = `${node.id}${CONST.COORDS_SEPARATOR}${j}`;
                const props = buildLinkProps(node.id, k, x1, y1, nodes, config, linkCallbacks, someNodeHighlighted);

                linksComponents.push(<Link key={key} {...props} />);
            }
        }
    }

    return linksComponents;
}

function buildLinkProps(source, target, x1, y1, nodes, config, linkCallbacks, someNodeHighlighted) {
    const opacity = someNodeHighlighted ? (nodes[source].highlighted && nodes[target].highlighted) ? config.link.opacity : config.highlightOpacity : config.link.opacity;

    const stroke = (nodes[source].highlighted && nodes[target].highlighted) ?
                (config.link.highlightColor === CONST.KEYWORDS.SAME ? config.link.color : config.link.highlightColor)
                : config.link.color;

    return {
        source,
        target,
        x1,
        y1,
        x2: nodes[target] && nodes[target].x || '0',
        y2: nodes[target] && nodes[target].y || '0',
        strokeWidth: config.link.strokeWidth,
        stroke,
        className: CONST.LINK_CLASS_NAME,
        opacity,
        onClickLink: linkCallbacks.onClickLink
    };
}

export default {
    buildGraph
};
