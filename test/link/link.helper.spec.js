import * as linkHelper from "../../src/components/link/link.helper";

describe("Link Helper", () => {
  describe("#buildLinkPathDefinition", () => {
    test("should return expected path definition", () => {
      const sourceCoords = { x: "1", y: "2" };
      const targetCoords = { x: "3", y: "4" };
      const path = linkHelper.buildLinkPathDefinition(sourceCoords, targetCoords);

      expect(path).toEqual("M1,2A0,0 0 0,1 3,4");
    });
  });
});
