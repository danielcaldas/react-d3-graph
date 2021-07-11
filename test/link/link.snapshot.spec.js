import React from "react";
import renderer from "react-test-renderer";

import Link from "../../src/components/link/Link";

describe("Snapshot - Link Component", () => {
  let that = {};

  beforeEach(() => {
    that.callbackMock = jest.fn();

    that.link = renderer.create(
      <Link
        x1="2"
        y1="2"
        x2="4"
        y2="4"
        opacity="1"
        stroke="red"
        strokeWidth="2"
        onClickLink={that.callbackMock}
        strokeDasharray={0}
        strokeDashoffset={0}
        strokeLinecap="butt"
      />
    );

    that.tree = that.link.toJSON();

    const viewGenerator = () => () => "viewGenerator";
    that.linkForViewGenerator = renderer.create(
      <Link
        x1="2"
        y1="2"
        x2="4"
        y2="4"
        opacity="1"
        stroke="red"
        strokeWidth="2"
        onClickLink={that.callbackMock}
        strokeDasharray={0}
        strokeDashoffset={0}
        strokeLinecap="butt"
        node={{ source: { x: 2, y: 2 }, target: { x: 4, y: 4 } }}
        viewGenerator={viewGenerator}
      />
    );

    that.treeForViewGenerator = that.linkForViewGenerator.toJSON();
  });

  test("should match snapshot", () => {
    expect(that.tree).toMatchSnapshot();
  });
  test("should match snapshot for viewGenerator", () => {
    expect(that.treeForViewGenerator).toMatchSnapshot();
  });
});
