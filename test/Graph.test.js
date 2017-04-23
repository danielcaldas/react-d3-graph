import React from 'react';
import renderer from 'react-test-renderer';

import Graph from '../src/components/Graph';
import graphMock from './graph.mock.js'

describe.only('Graph Component', () => {
    let that = {};

    that.nodeColor = 'red';
    that.highlightColor = 'blue';
    that.svgSize = 600;
    that.config = {
        height: that.svgSize,
        width: that.svgSize,
        highlightBehavior: true,
        highlightOpacity: 0.1,
        staticGraph: true,
        node: {
            color: that.nodeColor,
            highlightColor: that.highlightColor,
            size: 100
        },
        link: {
            highlightColor: that.highlightColor
        }
    };

    beforeEach(() => {
        that.graph = renderer.create(
            <Graph id='graphId' data={graphMock} config={that.config}/>
        );

        that.tree = that.graph.toJSON();
    });

    test('should be properly rendered', () => {
        expect(that.tree).toMatchSnapshot();
    });
});
