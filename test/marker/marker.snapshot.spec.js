import React from "react";
import renderer from "react-test-renderer";

import Marker from "../../src/components/marker/Marker";

describe("Snapshot - Marker Component", () => {
  let that = {};

  beforeEach(() => {
    that.clickCallback = jest.fn();
    that.mouseOverCallback = jest.fn();
    that.mouseOutCallback = jest.fn();

    that.marker = renderer.create(<Marker id="id" refX="5" fill="green" />);

    that.tree = that.marker.toJSON();
  });

  test("should match snapshot", () => {
    expect(that.tree).toMatchSnapshot();
  });
});
