import React from "react";
import renderer from "react-test-renderer";

import Link from "../../src/components/link/Link";

describe("Link Component", () => {
  let that = {};

  beforeEach(() => {
    that.callbackMock = jest.fn();

    that.link = renderer.create(
      <Link
        id="A#B"
        source="A"
        target="B"
        x1="2"
        y1="2"
        x2="4"
        y2="4"
        opacity="1"
        stroke="red"
        strokeWidth="2"
        onClickLink={that.callbackMock}
      />
    );

    that.tree = that.link.toJSON();
  });

  test("should call callback function when onClick is performed", () => {
    that.tree.children[0].props.onClick();
    expect(that.callbackMock).toHaveBeenCalled();
  });
});
