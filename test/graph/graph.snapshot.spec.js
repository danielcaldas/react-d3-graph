import React from "react";
import renderer from "react-test-renderer";

import Graph from "../../src/components/graph/Graph";
import graphMock from "./graph.mock.js";

describe("Snapshot - Graph Component", () => {
  let that = {};

  that.nodeColor = "red";
  that.highlightColor = "blue";
  that.svgSize = 600;
  that.highlightOpacity = 0.1;
  that.mouseCursor = "pointer";

  that.config = {
    height: that.svgSize,
    width: that.svgSize,
    nodeHighlightBehavior: true,
    highlightOpacity: that.highlightOpacity,
    staticGraph: true,
    collapsible: false,
    node: {
      color: that.nodeColor,
      highlightColor: that.highlightColor,
      size: 100,
    },
    link: {
      mouseCursor: that.mouseCursor,
      highlightColor: that.highlightColor,
    },
  };
  that.mouseOverNodeCallback = jest.fn();

  beforeEach(() => {
    const config = { ...that.config, collapsible: true };
    const data = {
      nodes: [...graphMock.nodes, { id: "Simba", x: "290", y: "290" }],
      links: graphMock.links,
    };

    that.graph = renderer.create(
      <Graph id="graphId" data={data} config={config} onMouseOverNode={that.mouseOverNodeCallback} />
    );

    that.tree = that.graph.toJSON();
  });

  test("should match snapshot", () => {
    expect(that.tree).toMatchSnapshot();
  });
});
