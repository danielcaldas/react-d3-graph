import * as markerHelper from "../../src/components/marker/marker.helper";

describe("Marker Helper", () => {
  describe("#getMarkerId", () => {
    describe("when marker is highlighted", () => {
      test("and size is 'S'mall", () => {
        const highlighted = true;
        const markerId = markerHelper.getMarkerId(highlighted, 0.5, { maxZoom: 20 });

        expect(markerId).toEqual("marker-small-highlighted");
      });
    });

    describe("when marker is not highlighted", () => {
      let highlighted;

      beforeAll(() => {
        highlighted = false;
      });

      test("and size is 'M'edium", () => {
        const markerId = markerHelper.getMarkerId(highlighted, 2, { maxZoom: 8 });

        expect(markerId).toEqual("marker-medium");
      });

      test("and size is 'L'arge", () => {
        const markerId = markerHelper.getMarkerId(highlighted, 4, { maxZoom: 8 });

        expect(markerId).toEqual("marker-large");
      });
    });
  });
});
