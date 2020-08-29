import React from "react";
import renderer from "react-test-renderer";

import Node from "../../src/components/node/Node";

describe("Snapshot - Node Component", () => {
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
        fontColor="black"
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

  test("should match snapshot", () => {
    expect(that.tree).toMatchSnapshot();
  });
});
