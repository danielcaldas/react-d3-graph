/* eslint-disable max-lines */
import * as graphHelper from "../../src/components/graph/graph.helper";

import * as utils from "../../src/utils";

jest.mock("d3-force");
import {
  forceX as d3ForceX,
  forceY as d3ForceY,
  forceSimulation as d3ForceSimulation,
  forceManyBody as d3ForceManyBody,
} from "d3-force";

describe("Graph Helper", () => {
  beforeAll(() => {
    utils.isDeepEqual = jest.fn();
    utils.isEmptyObject = jest.fn();
    utils.merge = jest.fn();
    utils.throwErr = jest.fn();
    utils.logWarning = jest.fn();
  });

  describe("#initializeGraphState", () => {
    describe("when valid graph data is provided", () => {
      beforeEach(() => {
        const fr = 10;
        const forceStub = jest.fn();

        d3ForceX.mockImplementation(() => ({ strength: () => fr }));
        d3ForceY.mockImplementation(() => ({ strength: () => fr }));
        d3ForceManyBody.mockImplementation(() => ({ strength: () => fr }));
        forceStub.mockImplementation(() => ({ force: forceStub }));
        d3ForceSimulation.mockImplementation(() => ({ force: forceStub }));
        utils.merge.mockImplementation(() => ({ config: "config" }));
      });

      describe("and received state was already initialized", () => {
        test("should create graph structure absorbing stored nodes and links behavior", () => {
          const data = {
            nodes: [{ id: "A" }, { id: "B" }, { id: "C" }],
            links: [
              { source: "A", target: "B" },
              { source: "C", target: "A" },
            ],
          };
          const state = {
            nodes: {
              A: { x: 20, y: 40 },
              B: { x: 40, y: 60 },
            },
            links: [],
            nodeIndexMapping: "nodeIndexMapping",
          };

          const newState = graphHelper.initializeGraphState({ data, id: "id", config: {} }, state);

          expect(newState.d3Nodes).toMatchSnapshot();
          expect(newState.d3Links).toMatchSnapshot();
        });
        describe("and the new state has nodes removed", () => {
          test("should create graph structure preserving subset of original structure", () => {
            const data = {
              nodes: [{ id: "B" }, { id: "C" }],
              links: [{ source: "B", target: "C" }],
            };
            const state = {
              nodes: {
                A: { x: 20, y: 40 },
                B: { x: 40, y: 60 },
                C: { x: 60, y: 80 },
              },
              links: [
                { source: "A", target: "B" },
                { source: "C", target: "A" },
                { source: "B", target: "C" },
              ],
              d3Links: [
                {
                  index: 0,
                  source: {
                    highlighted: false,
                    id: "A",
                  },
                  target: {
                    highlighted: false,
                    id: "B",
                  },
                },
                {
                  index: 1,
                  source: {
                    highlighted: false,
                    id: "C",
                  },
                  target: {
                    highlighted: false,
                    id: "A",
                  },
                },
                {
                  index: 2,
                  isHidden: false,
                  source: {
                    highlighted: false,
                    id: "B",
                  },
                  target: {
                    highlighted: false,
                    id: "C",
                  },
                },
              ],
              nodeIndexMapping: "nodeIndexMapping",
            };

            const newState = graphHelper.initializeGraphState({ data, id: "id", config: {} }, state);

            expect(newState.d3Nodes).toMatchSnapshot();
            expect(newState.d3Links).toMatchSnapshot();
          });
        });
      });

      describe("and received state is empty", () => {
        test("should create new graph structure with nodes and links", () => {
          const data = {
            nodes: [{ id: "A" }, { id: "B" }, { id: "C" }],
            links: [
              { source: "A", target: "B" },
              { source: "C", target: "A" },
            ],
          };
          const state = {};

          const newState = graphHelper.initializeGraphState({ data, id: "id", config: {} }, state);

          expect(newState.d3Nodes).toMatchSnapshot();
          expect(newState.d3Links).toMatchSnapshot();
        });
      });

      test("should return proper state object for given inputs", () => {
        const forceStub = jest.fn();

        forceStub.mockImplementation(() => {
          return {
            force: forceStub,
          };
        });

        d3ForceSimulation.mockImplementation(() => {
          return {
            force: forceStub,
          };
        });

        const data = {
          nodes: [{ id: "A" }, { id: "B" }, { id: "C" }, { id: "D", fx: 80, fy: 100 }],
          links: [
            { source: "A", target: "B" },
            { source: "C", target: "A" },
          ],
        };
        const state = {
          nodes: {
            A: { x: 20, y: 40 },
            B: { x: 40, y: 60 },
            D: { fx: 80, fy: 100 },
          },
          links: "links",
          nodeIndexMapping: "nodeIndexMapping",
        };

        const newState = graphHelper.initializeGraphState({ data, id: "id", config: undefined }, state);

        expect(newState).toEqual({
          config: {
            config: "config",
          },
          configUpdated: false,
          d3Links: [
            {
              index: 0,
              source: {
                highlighted: false,
                id: "A",
              },
              target: {
                highlighted: false,
                id: "B",
              },
            },
            {
              index: 1,
              source: {
                highlighted: false,
                id: "C",
              },
              target: {
                highlighted: false,
                id: "A",
              },
            },
          ],
          d3Nodes: [
            {
              highlighted: false,
              id: "A",
              x: 20,
              y: 40,
            },
            {
              highlighted: false,
              id: "B",
              x: 40,
              y: 60,
            },
            {
              highlighted: false,
              id: "C",
              x: 0,
              y: 0,
            },
            {
              // the fx and fy here are used to set the node's x and y
              fx: 80,
              fy: 100,
              highlighted: false,
              id: "D",
              x: 80,
              y: 100,
            },
          ],
          highlightedNode: "",
          id: "id",
          links: {
            A: {
              B: 1,
              C: 1,
            },
            B: {
              A: 1,
            },
            C: {
              A: 1,
            },
          },
          newGraphElements: false,
          nodes: {
            A: {
              highlighted: false,
              id: "A",
              x: 20,
              y: 40,
            },
            B: {
              highlighted: false,
              id: "B",
              x: 40,
              y: 60,
            },
            C: {
              highlighted: false,
              id: "C",
              x: 0,
              y: 0,
            },
            D: {
              _orphan: true,
              fx: 80,
              fy: 100,
              highlighted: false,
              id: "D",
              x: 80,
              y: 100,
            },
          },
          simulation: {
            force: forceStub,
          },
          transform: 1,
          draggedNode: null,
        });
      });
    });

    describe("when invalid graph data is provided", () => {
      const callInitializeGraph = data =>
        graphHelper.initializeGraphState(
          {
            data,
            id: "id",
            config: "config",
          },
          "state"
        );

      describe("when no data is provided", () => {
        test("should log INSUFFICIENT_DATA warning", () => {
          callInitializeGraph({});

          expect(utils.throwErr).not.toHaveBeenCalled();
          expect(utils.logWarning).toHaveBeenCalledWith(
            "Graph",
            "you have not provided enough data" +
              " for react-d3-graph to render something. You need to provide at least one node"
          );
        });
      });

      describe("when no nodes are provided", () => {
        test("should log INSUFFICIENT_DATA warning", () => {
          const data = { nodes: [] };
          callInitializeGraph(data);

          expect(utils.throwErr).not.toHaveBeenCalled();
          expect(utils.logWarning).toHaveBeenCalledWith(
            "Graph",
            "you have not provided enough data" +
              " for react-d3-graph to render something. You need to provide at least one node"
          );
        });
      });

      describe("when invalid link structure is found", () => {
        afterEach(() => {
          utils.throwErr.mockReset();
        });

        describe("when link source references nonexistent node", () => {
          test("should throw INVALID_LINKS error", () => {
            const data = { nodes: [{ id: "A" }], links: [{ source: "B", target: "A" }] };
            callInitializeGraph(data);

            expect(utils.throwErr).toHaveBeenCalledWith(
              "Graph",
              "you provided a invalid links data structure. " +
                // eslint-disable-next-line
                'Links source and target attributes must point to an existent node - "B" is not a valid source node id'
            );
          });
        });

        describe("when link target references nonexistent node", () => {
          test("should throw INVALID_LINKS error", () => {
            const data = { nodes: [{ id: "A" }], links: [{ source: "A", target: "B" }] };
            callInitializeGraph(data);

            expect(utils.throwErr).toHaveBeenCalledWith(
              "Graph",
              "you provided a invalid links data structure. " +
                // eslint-disable-next-line
                'Links source and target attributes must point to an existent node - "B" is not a valid target node id'
            );
          });
        });
      });
    });
  });

  describe("#getNormalizedNodeCoordinates", () => {
    const mockInfo = {
      sourceId: "a",
      targetId: "b",
      sourceCoords: {
        x: 1,
        y: 1,
      },
      targetCoords: {
        x: 2,
        y: 2,
      },
    };

    it("should return same sourceCoords and targetCoords when nodes are not in the collection of nodes", () => {
      let coords = graphHelper.getNormalizedNodeCoordinates(
        mockInfo,
        {
          a: {},
        },
        {
          node: {},
        }
      );

      expect(coords).toEqual({
        sourceCoords: { x: 1, y: 1 },
        targetCoords: { x: 2, y: 2 },
      });

      coords = graphHelper.getNormalizedNodeCoordinates(
        mockInfo,
        {
          b: {},
        },
        {
          node: {},
        }
      );

      expect(coords).toEqual({
        sourceCoords: { x: 1, y: 1 },
        targetCoords: { x: 2, y: 2 },
      });
    });

    it("should return same coordinates when config or nodes have a viewGenerator", () => {
      let coords = graphHelper.getNormalizedNodeCoordinates(
        mockInfo,
        {
          a: {},
          b: {},
        },
        {
          node: {
            viewGenerator: () => {},
          },
        }
      );

      expect(coords).toEqual({
        sourceCoords: { x: 1, y: 1 },
        targetCoords: { x: 2, y: 2 },
      });

      coords = graphHelper.getNormalizedNodeCoordinates(
        mockInfo,
        {
          a: {
            id: "a",
            viewGenerator: () => {},
            symbolType: "circle",
          },
          b: {},
        },
        {
          node: {
            symbolType: "circle",
          },
        }
      );

      expect(coords).toEqual({
        sourceCoords: { x: 1, y: 1 },
        targetCoords: { x: 2, y: 2 },
      });
    });

    it("should return same sourceCoords and targetCoords when symbolType is something rather than CIRCLE", () => {
      let coords = graphHelper.getNormalizedNodeCoordinates(
        mockInfo,
        {
          a: {},
          b: {},
        },
        {
          node: {
            symbolType: "square",
          },
        }
      );

      expect(coords).toEqual({
        sourceCoords: { x: 1, y: 1 },
        targetCoords: { x: 2, y: 2 },
      });

      coords = graphHelper.getNormalizedNodeCoordinates(
        mockInfo,
        {
          a: {
            symbolType: "square",
          },
          b: {},
        },
        {
          node: {},
        }
      );

      expect(coords).toEqual({
        sourceCoords: { x: 1, y: 1 },
        targetCoords: { x: 2, y: 2 },
      });
    });

    it("should properly compute new coordinates for symbolType CIRCLE", () => {
      let coords = graphHelper.getNormalizedNodeCoordinates(
        mockInfo,
        {
          a: { size: 100 },
          b: { size: 200 },
        },
        {
          node: {
            symbolType: "circle",
          },
          link: {
            markerWith: 2,
            markerHeight: 4,
          },
        }
      );
      const expectedCoords = {
        sourceCoords: { x: 4.78995166381361, y: 4.78995166381361 },
        targetCoords: { x: -3.3598010437036843, y: -3.3598010437036843 },
      };

      expect(coords).toEqual(expectedCoords);

      // check for global fallback
      coords = graphHelper.getNormalizedNodeCoordinates(
        mockInfo,
        {
          a: {},
          b: { size: 200 },
        },
        {
          node: {
            symbolType: "circle",
            size: 100,
          },
          link: {
            markerWith: 2,
            markerHeight: 4,
          },
        }
      );

      expect(coords).toEqual(expectedCoords);
    });

    it("should properly compute new coordinates if given (x, y) for source and target are 0", () => {
      // caught in: https://github.com/danielcaldas/react-d3-graph/issues/351
      let coords = graphHelper.getNormalizedNodeCoordinates(
        {
          ...mockInfo,
          targetCoords: {
            x: 1,
            y: 1,
          },
        },
        {
          a: { size: 100 },
          b: { size: 200 },
        },
        {
          node: {
            symbolType: "circle",
          },
          link: {
            markerWith: 2,
            markerHeight: 4,
          },
        }
      );

      expect(coords).toEqual({
        sourceCoords: { x: 1, y: 1 },
        targetCoords: { x: 1, y: 1 },
      });

      // with config.directed: true and no link marker properties
      coords = graphHelper.getNormalizedNodeCoordinates(
        {
          ...mockInfo,
          targetCoords: {
            x: 1,
            y: 1,
          },
        },
        {
          a: { size: 100 },
          b: { size: 200 },
        },
        {
          directed: true,
          node: {
            symbolType: "circle",
          },
          link: {},
        },
        2 // strokeWidth
      );

      expect(coords).toEqual({
        sourceCoords: { x: 1, y: 1 },
        targetCoords: { x: 1, y: 1 },
      });
    });
  });
});
