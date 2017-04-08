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
            cx: d && d.x && d.x.toString() || '0',
            cy: d && d.y && d.y.toString() || '0',
            className: CONST.NODE_CLASS_NAME,
            fill: d.color || config.node.color,
            id: d.id.toString(),
            label: d[config.node.labelProperty] || d.id.toString(),
            renderLabel: config.node.renderLabel,
            fontSize: config.node.fontSize,
            labelTextDx,
            cursor: config.node.mouseCursor,
            onClickNode: nodeCallbacks.onClickNode,
            onMouseOverNode: nodeCallbacks.onMouseOverNode,
            opacity: config.node.opacity,
            size: d.size || config.node.size,
            stroke: config.node.strokeColor,
            strokeWidth: config.node.strokeWidth,
            type: d.type || config.node.symbolType
        };

        return <Node key={d.id} {...props} />;
    });
}

export default {
    buildGraph
};
