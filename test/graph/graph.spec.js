import React from "react";
import renderer from "react-test-renderer";

import Graph from "../../src/components/graph/Graph";
import graphMock from "./graph.mock.js";

describe("Graph Component", () => {
  let that = {};

  that.nodeColor = "red";
  that.highlightColor = "blue";
  that.svgSize = 600;
  that.highlightOpacity = 0.1;
  that.config = {
    height: that.svgSize,
    width: that.svgSize,
    nodeHighlightBehavior: true,
    highlightOpacity: that.highlightOpacity,
    staticGraph: true,
    node: {
      color: that.nodeColor,
      highlightColor: that.highlightColor,
      size: 100,
    },
    link: {
      highlightColor: that.highlightColor,
    },
  };
  that.mouseOverNodeCallback = jest.fn();

  beforeEach(() => {
    that.graph = renderer.create(
      <Graph id="graphId" data={graphMock} config={that.config} onMouseOverNode={that.mouseOverNodeCallback} />
    );

    that.tree = that.graph.toJSON();
  });

  describe("when onMouseOverNode is called", () => {
    const nodeOffset = 1;
    const nodeAdjOffset = 2;
    const nodeNotAdjOffset = 10;

    test("should call mouseOverNode callback", () => {
      const linksNodes = that.tree.children[0].children[1].children;
      const node = linksNodes[linksNodes.length - 1];

      node.children[0].props.onMouseOver();

      expect(that.mouseOverNodeCallback).toHaveBeenCalled();
    });

    test("node and their adjacent should have opacity equal to 1 and color (fill) equal to that.highlightColor", () => {
      let linksNodes = that.tree.children[0].children[1].children,
        node = linksNodes[linksNodes.length - nodeOffset];

      node.children[0].props.onMouseOver();

      let tree = that.graph.toJSON(); // re-render

      linksNodes = tree.children[0].children[1].children;

      // Mouse overed node
      node = linksNodes[linksNodes.length - nodeOffset];

      let props = node.children[0].props;

      expect(props.fill).toEqual(that.highlightColor);
      expect(props.opacity).toEqual(1);

      // Some adjacent node
      node = linksNodes[linksNodes.length - nodeAdjOffset];

      props = node.children[0].props;

      expect(props.fill).toEqual(that.highlightColor);
      expect(props.opacity).toEqual(1);
    });

    test("non selected node and non adjacent should have opacity equal to that.highlightOpacity and color equal to that.nodeColor", () => {
      let linksNodes = that.tree.children[0].children[1].children,
        node = linksNodes[linksNodes.length - nodeOffset];

      node.children[0].props.onMouseOver();

      let tree = that.graph.toJSON(); // re-render

      linksNodes = tree.children[0].children[1].children;
      node = linksNodes[linksNodes.length - nodeNotAdjOffset];

      const props = node.children[0].props;

      expect(props.fill).toEqual(that.nodeColor);
      expect(props.opacity).toEqual(that.highlightOpacity);
    });
  });
});
