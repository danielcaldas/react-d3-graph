import * as graphHelper from "../../src/components/graph/graph.builder";

import config from "../../src/components/graph/graph.config";

import * as utils from "../../src/utils";
import * as linkHelper from "../../src/components/link/link.helper";

describe("Graph Helper", () => {
  beforeAll(() => {
    utils.isDeepEqual = jest.fn();
    utils.isEmptyObject = jest.fn();
    utils.merge = jest.fn();
    utils.throwErr = jest.fn();
    jest.spyOn(linkHelper, "buildLinkPathDefinition");
  });

  describe("#buildLinkProps", () => {
    let that = {};

    beforeAll(() => {
      that = {
        config: { link: config.link },
        link: { source: "source", target: "target" },
      };
    });

    describe("when building props for a link", () => {
      test("should call buildLinkPathDefinition with expected parameters", () => {
        graphHelper.buildLinkProps(that.link, {}, {}, that.config, [], undefined, undefined, 1);

        const sourceCoords = { x: 0, y: 0 };
        const targetCoords = { x: 0, y: 0 };

        expect(linkHelper.buildLinkPathDefinition).toHaveBeenCalledWith(sourceCoords, targetCoords, "STRAIGHT");
      });

      describe("and no custom color is set", () => {
        test("should return default color defined in link config", () => {
          const props = graphHelper.buildLinkProps(that.link, {}, {}, that.config, [], undefined, undefined, 1);

          expect(props.stroke).toEqual(that.config.link.color);
        });
      });

      describe("and custom color is set to green", () => {
        test("should return green color in the props", () => {
          const props = graphHelper.buildLinkProps(
            { ...that.link, color: "green" },
            {},
            {},
            that.config,
            [],
            undefined,
            undefined,
            1
          );

          expect(props.stroke).toEqual("green");
        });
      });
    });
  });

  describe("#buildNodeProps", () => {
    let that = {};

    beforeEach(() => {
      const nodeConfig = Object.assign({}, config.node, { svg: "file.svg" });
      const linkConfig = Object.assign({}, config.link);

      that = {
        config: { node: nodeConfig, link: linkConfig },
        node: {
          id: "id",
          x: 1,
          y: 2,
          color: "green",
          highlighted: false,
          symbolType: undefined,
        },
      };
    });
    describe("when node to build is the highlightedNode", () => {
      test("should return node props with proper highlight values", () => {
        that.node.highlighted = true;
        Object.assign(that.config.node, {
          highlightColor: "red",
          highlightFontSize: 12,
          highlightFontWeight: "bold",
          highlightStrokeColor: "yellow",
          highlightStrokeWidth: 2,
        });
        const props = graphHelper.buildNodeProps(that.node, that.config, undefined, "id", undefined, 1);

        expect(props).toMatchSnapshot();
      });
    });
    describe("when node to build is the highlightedLink target (or source)", () => {
      describe("and highlight degree is 0", () => {
        test("should properly build node props ()", () => {
          that.config.highlightDegree = 0;

          const props = graphHelper.buildNodeProps(
            that.node,
            that.config,
            undefined,
            {
              source: "some other id",
              target: "id",
            },
            undefined,
            1
          );

          expect(props).toMatchSnapshot();
        });
      });
      describe("and highlight degree is bigger then 0", () => {
        test("should properly build node props", () => {
          that.config.highlightDegree = 2;

          const props = graphHelper.buildNodeProps(
            that.node,
            that.config,
            undefined,
            {
              source: "some other id",
              target: "id",
            },
            undefined,
            1
          );

          expect(props).toMatchSnapshot();
        });
      });
    });
    describe("and no custom strokeColor is set", () => {
      test("should return the default strokeColor in the props", () => {
        const props = graphHelper.buildNodeProps(that.node, that.config, undefined, undefined, undefined, 1);

        expect(props.stroke).toEqual("none");
      });
    });
    describe("and custom strokeColor is set to yellow", () => {
      test("should return yellow strokeColor in the props", () => {
        const props = graphHelper.buildNodeProps(
          { ...that.node, strokeColor: "yellow" },
          that.config,
          undefined,
          undefined,
          undefined,
          1
        );

        expect(props.stroke).toEqual("yellow");
      });
    });
    describe("and no custom fontSize is set", () => {
      test("should return the fontSize from the config in the props", () => {
        const props = graphHelper.buildNodeProps(
          that.node,
          { ...that.config, node: { ...that.config.node, fontSize: 10 } },
          undefined,
          undefined,
          undefined,
          1
        );
        expect(props.fontSize).toEqual(10);
      });
    });
    describe("and custom fontSize is set to 6", () => {
      test("should override the value of fontSize set in the props", () => {
        const props = graphHelper.buildNodeProps(
          { ...that.node, fontSize: 6 },
          { ...that.config, node: { ...that.config.node, fontSize: 10 } },
          undefined,
          undefined,
          undefined,
          1
        );

        expect(props.fontSize).toEqual(6);
      });
    });
  });
});
