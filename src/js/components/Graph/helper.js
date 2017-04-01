import React from 'react';

import Link from '../Link/';
import Node from '../Node/';

function buildGraph(nodes, links, coords, config) {
    return {
        nodes: buildNodes(nodes, config),
        links: buildLinks(links, coords)
    };
}

function buildLinks(links, coords) {
    return links.map(l => {
        const key = `${l.source.id || l.source},${l.target.id || l.target}`;

        // @TODO: state
        const props = {
            link: {
                x1: l.source.x || coords[l.source].x.toString(),
                y1: l.source.y || coords[l.source].y.toString(),
                x2: l.target.x || coords[l.target].x.toString(),
                y2: l.target.y || coords[l.target].y.toString()
            }
        };

        return <Link key={key} {...props} />;
    });
}

function buildNodes(nodes, config) {
    return nodes.map(d => {
        const props = {
            cx: d.x.toString(),
            cy: d.y.toString(),
            id: d.id.toString(),
            label: d[config.labelProperty] || d.id.toString(),
            labelTextSize: config.defaultTextSize,
            nodeLabelTextCenter: false,
            radius: d.size || config.defaultNodeSize
        };

        return <Node key={d.id} {...props} />;
    });
}

export default {
    buildGraph
};
