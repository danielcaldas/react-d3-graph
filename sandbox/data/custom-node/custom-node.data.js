import React from 'react';
import CustomNode from './CustomNode';

const dataSet = {
    links: [
        {
            source: 1,
            target: 2
        },
        {
            source: 1,
            target: 3
        },
        {
            source: 1,
            target: 4
        },
        {
            source: 3,
            target: 4
        }
    ],
    nodes: [
        {
            id: 1,
            name: 'Mary',
            data: {
                gender: 'female',
                hasCar: false,
                hasBike: false
            }
        },
        {
            id: 2,
            name: 'Roy',
            data: {
                gender: 'male',
                hasCar: false,
                hasBike: true
            }
        },
        {
            id: 3,
            name: 'Frank',
            data: {
                gender: 'male',
                hasCar: true,
                hasBike: true
            }
        },
        {
            id: 4,
            name: 'Melanie',
            data: {
                gender: 'female',
                hasCar: true,
                hasBike: false
            }
        }
    ]
};

// Generate views for each node and append them to data object
const nodeListWithCustomView = dataSet.nodes.map(node => ({ ...node, view: <CustomNode node={node} /> }));

module.exports = { ...dataSet, nodes: nodeListWithCustomView };
