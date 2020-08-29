import * as collapseHelper from "../../src/components/graph/collapse.helper";
import * as graphData from "../../sandbox/data/default";
import { initializeGraphState } from "../../src/components/graph/graph.helper";

describe("Collapse Helper", () => {
  let directedState, defaultState;

  beforeEach(() => {
    directedState = initializeGraphState({ data: graphData, id: "id", config: { directed: true } });
    defaultState = initializeGraphState({ data: graphData, id: "id" });
  });

  describe("#computeNodeDegree", () => {
    describe("when graph is directed", () => {
      test("should calculate correct node degree for 'Androsynth'", () => {
        const nodeId = "Androsynth";

        expect(collapseHelper.computeNodeDegree(nodeId, directedState.links)).toEqual({
          inDegree: 0,
          outDegree: 7,
        });
      });

      test("should calculate correct node degree for 'Podship'", () => {
        const nodeId = "Podship";

        expect(collapseHelper.computeNodeDegree(nodeId, directedState.links)).toEqual({
          inDegree: 1,
          outDegree: 0,
        });
      });

      test("should calculate correct node degree for 'Mycon'", () => {
        const nodeId = "Mycon";

        expect(collapseHelper.computeNodeDegree(nodeId, directedState.links)).toEqual({
          inDegree: 2,
          outDegree: 3,
        });
      });
    });

    describe("when graph is not directed", () => {
      test("should calculate correct node degree for 'Androsynth'", () => {
        const nodeId = "Androsynth";

        expect(collapseHelper.computeNodeDegree(nodeId, defaultState.links)).toEqual({
          inDegree: 7,
          outDegree: 7,
        });
      });

      test("should calculate correct node degree for 'Podship'", () => {
        const nodeId = "Podship";

        expect(collapseHelper.computeNodeDegree(nodeId, defaultState.links)).toEqual({
          inDegree: 1,
          outDegree: 1,
        });
      });

      test("should calculate correct node degree for 'Mycon'", () => {
        const nodeId = "Mycon";

        expect(collapseHelper.computeNodeDegree(nodeId, defaultState.links)).toEqual({
          inDegree: 5,
          outDegree: 5,
        });
      });
    });
  });

  describe("#getTargetLeafConnections", () => {
    let directed;

    describe("when graph is directed", () => {
      beforeAll(() => {
        directed = true;
      });
      test("should return expected leaf connections for node 'Mycon'", () => {
        const nodeId = "Mycon";

        expect(collapseHelper.getTargetLeafConnections(nodeId, directedState.links, { directed })).toEqual([
          { source: "Mycon", target: "Podship" },
        ]);
      });

      test("should return expected leaf connections for node 'VUX'", () => {
        const nodeId = "VUX";

        expect(collapseHelper.getTargetLeafConnections(nodeId, directedState.links, { directed })).toEqual([
          { source: "VUX", target: "Intruder" },
        ]);
      });

      test("should return expected leaf connections for node 'Eluder'", () => {
        const nodeId = "Eluder";

        expect(collapseHelper.getTargetLeafConnections(nodeId, directedState.links, { directed })).toEqual([]);
      });
    });

    describe("when graph is not directed", () => {
      beforeAll(() => {
        directed = false;
      });

      test("should calculate correct node degree for 'Androsynth'", () => {
        const nodeId = "Mycon";

        expect(collapseHelper.getTargetLeafConnections(nodeId, defaultState.links, { directed })).toEqual([
          { source: "Mycon", target: "Podship" },
        ]);
      });

      test("should return expected leaf connections for node 'VUX'", () => {
        const nodeId = "VUX";

        expect(collapseHelper.getTargetLeafConnections(nodeId, defaultState.links, { directed })).toEqual([
          { source: "VUX", target: "Intruder" },
        ]);
      });

      test("should return expected leaf connections for node 'Eluder'", () => {
        const nodeId = "Eluder";

        expect(collapseHelper.getTargetLeafConnections(nodeId, defaultState.links, { directed })).toEqual([]);
      });
    });
  });

  describe("#toggleLinksConnections", () => {
    test("should properly set isHidden value for given links and linksMatrix", () => {
      const d3Links = directedState.d3Links;
      const connectionsMatrix = directedState.links;

      connectionsMatrix["Androsynth"]["Ilwrath"] = 0; // d3Links[1] isHidden: true
      delete connectionsMatrix["Androsynth"]["Chenjesu"]; // d3Links[0] isHidden: true

      const updatedD3Links = collapseHelper.toggleLinksConnections(d3Links, connectionsMatrix);

      expect(updatedD3Links[1].isHidden).toEqual(true);
      expect(updatedD3Links[0].isHidden).toEqual(true);

      expect(updatedD3Links).toMatchSnapshot();
    });
  });

  describe("#toggleLinksMatrixConnections", () => {
    describe("when graph is directed", () => {
      test("should properly toggle passed connections in links matrix", () => {
        const connections = [
          { source: "Androsynth", target: "Chenjesu" },
          { source: "Androsynth", target: "Ilwrath" },
        ];

        expect(
          collapseHelper.toggleLinksMatrixConnections(directedState.links, connections, { directed: true })
        ).toMatchSnapshot();
      });
    });

    describe("when graph is not directed", () => {
      test("should properly toggle passed connections in links matrix", () => {
        const connections = [
          { source: "Androsynth", target: "Chenjesu" },
          { source: "Androsynth", target: "Ilwrath" },
        ];

        expect(
          collapseHelper.toggleLinksMatrixConnections(defaultState.links, connections, { directed: false })
        ).toMatchSnapshot();
      });
    });
  });
});
