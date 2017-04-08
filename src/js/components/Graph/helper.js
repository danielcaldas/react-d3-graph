import React from 'react';

import Link from '../Link/';
import Node from '../Node/';

// @TODO: Remove all non sense calls to toString() method
function buildGraph(nodes, nodeCallbacks, links, linkCallbacks, coords, config) {
    return {
        nodes: buildNodes(nodes, nodeCallbacks, coords, config),
        links: buildLinks(links, linkCallbacks, coords, config)
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
            strokeWidth: config.linkStrokeWidth,
            stroke: config.defaultLinkColor,
            opacity: config.linkOpacity,
            onClickLink: linkCallbacks.onClickLink
        };

        return <Link key={key} {...props} />;
    });
}

function buildNodes(nodes, nodeCallbacks, coords, config) {
    const labelTextDx = (90 * config.defaultTextSize) / 1000; // @TODO: When config is finished remove harcoded values

    return nodes.map(d => {
        const props = {
            cx: d && d.x && d.x.toString() || '0',
            cy: d && d.y && d.y.toString() || '0',
            fill: d.color || config.defaultNodeColor,
            id: d.id.toString(),
            label: d[config.labelProperty] || d.id.toString(),
            labelTextSize: config.defaultTextSize,
            labelTextDx,
            onClickNode: nodeCallbacks.onClickNode,
            onMouseOverNode: nodeCallbacks.onMouseOverNode,
            opacity: config.nodeOpacity,
            size: d.size || config.defaultNodeSize,
            stroke: config.nodeStrokeColor,
            strokeWidth: config.nodeStrokeWidth,
            type: d.type || config.defaultNodeSymbolType
        };

        return <Node key={d.id} {...props} />;
    });
}

export default {
    buildGraph
};
