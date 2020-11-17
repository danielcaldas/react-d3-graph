import * as linkHelper from "../../src/components/link/link.helper";
import { LINE_TYPES } from "../../src/components/link/link.const";

describe("Link Helper", () => {
  describe("#buildLinkPathDefinition", () => {
    describe("when line_type is straight", () => {
      test("should return expected straight path definition", () => {
        const sourceCoords = { x: 1, y: 2 };
        const targetCoords = { x: 3, y: 4 };
        const path = linkHelper.buildLinkPathDefinition(sourceCoords, targetCoords, LINE_TYPES.STRAIGHT);

        expect(path).toEqual("M1,2 A0,0 0 0,1 3,4");
      });
    });

    describe("when line_type is curve-smooth", () => {
      test("should return expected curve-smooth path definition", () => {
        const sourceCoords = { x: 1, y: 2 };
        const targetCoords = { x: 3, y: 4 };
        const path = linkHelper.buildLinkPathDefinition(sourceCoords, targetCoords, LINE_TYPES.CURVE_SMOOTH);

        expect(path).toEqual("M1,2 A2.8284271247461903,2.8284271247461903 0 0,1 3,4");
      });
    });

    describe("when line_type is curve-full", () => {
      test("should return expected curve-full path definition", () => {
        const sourceCoords = { x: 1, y: 2 };
        const targetCoords = { x: 3, y: 4 };
        const path = linkHelper.buildLinkPathDefinition(sourceCoords, targetCoords, LINE_TYPES.CURVE_FULL);

        expect(path).toEqual("M1,2 A1,1 0 0,1 3,4");
      });
    });

    describe("when breakPoints specified", () => {
      test("should return expected path definition with breakPoints", () => {
        const sourceCoords = { x: 1, y: 2 };
        const targetCoords = { x: 3, y: 4 };
        const breakPoints = [
          { x: 5, y: 6 },
          { x: 7, y: 8 },
        ];
        const path = linkHelper.buildLinkPathDefinition(sourceCoords, targetCoords, LINE_TYPES.STRAIGHT, breakPoints);

        expect(path).toEqual("M1,2 A0,0 0 0,1 5,6 A0,0 0 0,1 7,8 A0,0 0 0,1 3,4");
      });
    });
  });
});
