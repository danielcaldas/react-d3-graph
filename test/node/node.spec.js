import React from "react";
import renderer from "react-test-renderer";

import Node from "../../src/components/node/Node";

describe("Node Component", () => {
  let that = {};

  beforeEach(() => {
    that.clickCallback = jest.fn();
    that.mouseOverCallback = jest.fn();
    that.mouseOutCallback = jest.fn();

    that.node = renderer.create(
      <Node
        x1="2"
        y1="2"
        x2="4"
        y2="4"
        opacity="1"
        fill="black"
        fontWeight="bold"
        fontSize="12"
        label="text"
        cursor="pointer"
        size="120"
        type="circle"
        renderLabel="true"
        stroke="red"
        strokeWidth="2"
        onClickNode={that.clickCallback}
        onMouseOverNode={that.mouseOverCallback}
        onMouseOut={that.mouseOutCallback}
      />
    );

    that.tree = that.node.toJSON();
  });

  test("should call callback function when onClick is called", () => {
    that.tree.children[0].props.onClick();
    expect(that.clickCallback).toHaveBeenCalled();
  });

  test("should call callback function when onMouseOut is called", () => {
    that.tree.children[0].props.onMouseOver();
    expect(that.mouseOverCallback).toHaveBeenCalled();
  });

  test("should call callback function when onMouseOver is called", () => {
    that.tree.children[0].props.onMouseOut();
    expect(that.mouseOutCallback).toHaveBeenCalled();
  });
});
