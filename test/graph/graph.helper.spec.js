import * as graphHelper from "../../src/components/graph/graph.helper";

import config from "../../src/components/graph/graph.config";

import utils from "../../src/utils";
import * as linkHelper from "../../src/components/link/link.helper";

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

                expect(linkHelper.buildLinkPathDefinition).toHaveBeenCalledWith(
                    { source: { x: 0, y: 0 }, target: { x: 0, y: 0 } },
                    "STRAIGHT"
                );
            });

            describe("and no custom color is set", () => {
                test("should return default color defined in link config", () => {
                    const props = graphHelper.buildLinkProps(
                        that.link,
                        {},
                        {},
                        that.config,
                        [],
                        undefined,
                        undefined,
                        1
                    );

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

                expect(props).toEqual({
                    ...that.node,
                    className: "node",
                    cursor: "pointer",
                    cx: 1,
                    cy: 2,
                    dx: 15.5,
                    fill: "red",
                    fontSize: 12,
                    fontWeight: "bold",
                    fontColor: "black",
                    id: "id",
                    label: "id",
                    onClickNode: undefined,
                    onRightClickNode: undefined,
                    onMouseOut: undefined,
                    onMouseOverNode: undefined,
                    opacity: 1,
                    renderLabel: true,
                    size: 200,
                    stroke: "yellow",
                    strokeWidth: 2,
                    svg: "file.svg",
                    type: "circle",
                    viewGenerator: null,
                    overrideGlobalViewGenerator: undefined,
                });
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

                    expect(props).toEqual({
                        ...that.node,
                        className: "node",
                        cursor: "pointer",
                        cx: 1,
                        cy: 2,
                        dx: 11.5,
                        fill: "green",
                        fontSize: 8,
                        fontWeight: "normal",
                        fontColor: "black",
                        id: "id",
                        label: "id",
                        onClickNode: undefined,
                        onRightClickNode: undefined,
                        onMouseOut: undefined,
                        onMouseOverNode: undefined,
                        opacity: undefined,
                        renderLabel: true,
                        size: 200,
                        stroke: "none",
                        strokeWidth: 1.5,
                        svg: "file.svg",
                        type: "circle",
                        viewGenerator: null,
                        overrideGlobalViewGenerator: undefined,
                    });
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

                    expect(props).toEqual({
                        ...that.node,
                        className: "node",
                        cursor: "pointer",
                        cx: 1,
                        cy: 2,
                        dx: 11.5,
                        fill: "green",
                        fontSize: 8,
                        fontWeight: "normal",
                        fontColor: "black",
                        id: "id",
                        label: "id",
                        onClickNode: undefined,
                        onRightClickNode: undefined,
                        onMouseOut: undefined,
                        onMouseOverNode: undefined,
                        opacity: undefined,
                        renderLabel: true,
                        size: 200,
                        stroke: "none",
                        strokeWidth: 1.5,
                        svg: "file.svg",
                        type: "circle",
                        viewGenerator: null,
                        overrideGlobalViewGenerator: undefined,
                    });
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
                        links: [{ source: "A", target: "B" }, { source: "C", target: "A" }],
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

                    expect(newState.d3Nodes).toEqual([
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
                    ]);
                    expect(newState.d3Links).toEqual([
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
                    ]);
                });
            });

            describe("and received state is empty", () => {
                test("should create new graph structure with nodes and links", () => {
                    const data = {
                        nodes: [{ id: "A" }, { id: "B" }, { id: "C" }],
                        links: [{ source: "A", target: "B" }, { source: "C", target: "A" }],
                    };
                    const state = {};

                    const newState = graphHelper.initializeGraphState({ data, id: "id", config: {} }, state);

                    expect(newState.d3Nodes).toEqual([
                        {
                            highlighted: false,
                            id: "A",
                            x: 0,
                            y: 0,
                        },
                        {
                            highlighted: false,
                            id: "B",
                            x: 0,
                            y: 0,
                        },
                        {
                            highlighted: false,
                            id: "C",
                            x: 0,
                            y: 0,
                        },
                    ]);
                    expect(newState.d3Links).toEqual([
                        {
                            source: "A",
                            target: "B",
                        },
                        {
                            source: "C",
                            target: "A",
                        },
                    ]);
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
                    nodes: [{ id: "A" }, { id: "B" }, { id: "C" }],
                    links: [{ source: "A", target: "B" }, { source: "C", target: "A" }],
                };
                const state = {
                    nodes: {
                        A: { x: 20, y: 40 },
                        B: { x: 40, y: 60 },
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
                    },
                    simulation: {
                        force: forceStub,
                    },
                    transform: 1,
                });
            });
        });

        describe("when invalid graph data is provided", () => {
            describe("when no nodes are provided", () => {
                test("should throw INSUFFICIENT_DATA error", () => {
                    const data = { nodes: [], links: [] };

                    graphHelper.initializeGraphState(
                        {
                            data,
                            id: "id",
                            config: "config",
                        },
                        "state"
                    );

                    expect(utils.throwErr).toHaveBeenCalledWith(
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

                        graphHelper.initializeGraphState(
                            {
                                data,
                                id: "id",
                                config: "config",
                            },
                            "state"
                        );

                        expect(utils.throwErr).toHaveBeenCalledWith(
                            "Graph",
                            "you provided a invalid links data" +
                                // eslint-disable-next-line
                                ' structure. Links source and target attributes must point to an existent node - "B" is not a valid source node id'
                        );
                    });
                });

                describe("when link target references nonexistent node", () => {
                    test("should throw INVALID_LINKS error", () => {
                        const data = { nodes: [{ id: "A" }], links: [{ source: "A", target: "B" }] };

                        graphHelper.initializeGraphState(
                            {
                                data,
                                id: "id",
                                config: "config",
                            },
                            "state"
                        );

                        expect(utils.throwErr).toHaveBeenCalledWith(
                            "Graph",
                            "you provided a invalid links data" +
                                // eslint-disable-next-line
                                ' structure. Links source and target attributes must point to an existent node - "B" is not a valid target node id'
                        );
                    });
                });
            });
        });
    });
});
