import React from 'react';

import CONST from './const';

import Link from '../Link/';
import Node from '../Node/';

// @TODO: Remove all non sense calls to toString() method
function buildGraph(nodes, nodeCallbacks, links, linkCallbacks, coords, config) {
    return {
        links: buildLinks(links, linkCallbacks, coords, config),
        nodes: buildNodes(nodes, nodeCallbacks, coords, config)
    };
}

// @TODO: This payload of links is huge. Check how the nodes are being passed
function buildLinks(links, linkCallbacks, coords, config) {
    return links.map(l => {
        const key = `${l.source.id || l.source},${l.target.id || l.target}`;

        // @TODO: state
        // @TODO: improve this fallback cases also in nodes
        const props = {
            source: l.source.id || l.source,
            target: l.target.id || l.target,
            x1: l.source.x || coords[l.source] && coords[l.source].x && coords[l.source].x.toString() || '0',
            y1: l.source.y || coords[l.source] && coords[l.source].y && coords[l.source].y.toString() || '0',
            x2: l.target.x || coords[l.target] && coords[l.target].x && coords[l.target].x.toString() || '0',
            y2: l.target.y || coords[l.target] && coords[l.target].y && coords[l.target].y.toString() || '0',
            strokeWidth: config.link.strokeWidth,
            stroke: config.link.color,
            className: CONST.LINK_CLASS_NAME,
            opacity: config.link.opacity,
            onClickLink: linkCallbacks.onClickLink
        };

        return <Link key={key} {...props} />;
    });
}

function buildNodes(nodes, nodeCallbacks, coords, config) {
    // @TODO: Many of this attributes are calculated only once, thus being more effecient to calculate them
    // on a config time or something similar!
    const labelTextDx = (90 * config.node.fontSize) / 1000; // @TODO: When config is finished remove harcoded values

    return nodes.map(d => {
        const props = {
            className: CONST.NODE_CLASS_NAME,
            cursor: config.node.mouseCursor,
            cx: d && d.x && d.x.toString() || '0',
            cy: d && d.y && d.y.toString() || '0',
            fill: d.color || config.node.color,
            fontSize: config.node.fontSize,
            highlightColor: config.node.highlightColor,
            id: d.id.toString(),
            label: d[config.node.labelProperty] || d.id.toString(),
            labelTextDx,
            onClickNode: nodeCallbacks.onClickNode,
            onMouseOverNode: nodeCallbacks.onMouseOverNode,
            onMouseOut: nodeCallbacks.onMouseOut,
            opacity: config.node.opacity,
            renderLabel: config.node.renderLabel,
            size: d.size || config.node.size,
            stroke: config.node.strokeColor,
            strokeWidth: config.node.strokeWidth,
            type: d.type || config.node.symbolType
        };

        return <Node key={d.id} {...props} />;
    });
}

function _buildLinkKey(link) {
    return `${link.source}${CONST.COORDS_SEPARATOR}${link.target}`;
}

function _buildLinkKeyFromNodes(n1, n2) {
    return `${n1.id}${CONST.COORDS_SEPARATOR}${n2.id}`;
}

function buildNodeCoords(nodes) {
    const coords = {};

    nodes.forEach(d => coords[d.id] = {x: d.x || 0, y: d.y || 0});

    return coords;
}

function mapLinksByNodeIds(links) {
    const linkedByIndex = {};

    links.forEach(d => linkedByIndex[_buildLinkKey(d)] = true);

    return linkedByIndex;
}

function isConnected(linkedByIndex, n1, n2) {
    return n1.id === n2.id
        || linkedByIndex[_buildLinkKeyFromNodes(n1,n2)]
        || linkedByIndex[_buildLinkKeyFromNodes(n2,n1)];
}

export default {
    buildGraph,
    buildNodeCoords,
    mapLinksByNodeIds
};
