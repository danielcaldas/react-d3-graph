import * as graphHelper from '../../../src/components/graph/graph.helper';

import config from '../../../src/components/graph/config';

jest.mock('../../../src/utils');
import utils from '../../../src/utils';

jest.mock('d3-force');
import {
    forceX as d3ForceX,
    forceY as d3ForceY,
    forceSimulation as d3ForceSimulation,
    forceManyBody as d3ForceManyBody
} from 'd3-force';

describe('Graph Helper', () => {
    describe('#buildNodeProps', () => {
        let that = {};

        beforeEach(() => {
            const nodeConfig = Object.assign({}, config.node);
            const linkConfig = Object.assign({}, config.link);

            that = {
                config: { node: nodeConfig, link: linkConfig },
                node: {
                    id: 'id',
                    x: 1,
                    y: 2,
                    color: 'green',
                    highlighted: false,
                    symbolType: undefined
                }
            };
        });
        describe('when node to build is the highlightedNode', () => {

        });
        describe('when node to build is the highlightedLink target (or source)', () => {
            describe('and highlight degree is 0', () => {

            });
            describe('and highlight degree is bigger then 0', () => {

            });
        });
        describe('when node to build is neither highlightedNode neither highlightedLink source/target', () => {
            beforeEach(() => {
                // set common node structure so that below we only override small stuff
            });
            describe('and config.node.highlightColor is "SAME"', () => {

            });
            describe('and config.node.highlightStrokeColor is "SAME"', () => {

            });
            describe('and config.node.labelProperty some label property (not id)', () => {

            });
            describe('and node has a self (node level) color', () => {

            });
            describe('and node has a self (node level) symbolType', () => {

            });
        });
    });

    describe('#initializeGraphState', () => {
        describe('when valid graph data is provided', () => {
            beforeEach(() => {
                const fr = 10;
                const forceStub = jest.fn();

                d3ForceX.mockImplementation(() => ({strength: () => fr}));
                d3ForceY.mockImplementation(() => ({strength: () => fr}));
                d3ForceManyBody.mockImplementation(() => ({strength: () => fr}));
                forceStub.mockImplementation(() => ({force: forceStub}));
                d3ForceSimulation.mockImplementation(() => ({force: forceStub}));
                utils.merge.mockImplementation(() => ({config: 'config'}));
            });

            describe('and received state was already initialized', () => {
                test('should create graph structure absorbing stored nodes behavior in state obj', () => {
                    const data = {
                        nodes: [{id: 'A'}, {id: 'B'}, {id: 'C'}],
                        links: [{source: 'A', target: 'B'}, {source: 'C', target: 'A'}]
                    };
                    const state = {
                        nodes: {
                            A: { x: 20, y: 40 },
                            B: { x: 40, y: 60 }
                        },
                        links: 'links',
                        nodeIndexMapping: 'nodeIndexMapping'
                    };

                    const newState = graphHelper.initializeGraphState({data, id: 'id', config: {}}, state);

                    expect(newState.d3Nodes).toEqual(
                        [{
                            highlighted: false,
                            id: 'A',
                            x: 20,
                            y: 40
                        }, {
                            highlighted: false,
                            id: 'B',
                            x: 40,
                            y: 60
                        }, {
                            highlighted: false,
                            id: 'C',
                            x: 0,
                            y: 0
                        }]
                    );
                    expect(newState.d3Links).toEqual(
                        [{
                            source: 'A',
                            target: 'B'
                        }, {
                            source: 'C',
                            target: 'A'
                        }]
                    );
                });
            });

            describe('and received state is empty', () => {
                test('should create new graph structure with nodes and links', () => {
                    const data = {
                        nodes: [{id: 'A'}, {id: 'B'}, {id: 'C'}],
                        links: [{source: 'A', target: 'B'}, {source: 'C', target: 'A'}]
                    };
                    const state = {};

                    const newState = graphHelper.initializeGraphState({data, id: 'id', config: {}}, state);

                    expect(newState.d3Nodes).toEqual(
                        [{
                            highlighted: false,
                            id: 'A',
                            x: 0,
                            y: 0
                        }, {
                            highlighted: false,
                            id: 'B',
                            x: 0,
                            y: 0
                        }, {
                            highlighted: false,
                            id: 'C',
                            x: 0,
                            y: 0
                        }]
                    );
                    expect(newState.d3Links).toEqual(
                        [{
                            source: 'A',
                            target: 'B'
                        }, {
                            source: 'C',
                            target: 'A'
                        }]
                    );
                });
            });

            test('should return proper state object for given inputs', () => {
                const forceStub = jest.fn();

                forceStub.mockImplementation(() => {
                    return {
                        force: forceStub
                    };
                });

                d3ForceSimulation.mockImplementation(() => {
                    return {
                        force: forceStub
                    };
                });

                const data = {
                    nodes: [{id: 'A'}, {id: 'B'}, {id: 'C'}],
                    links: [{source: 'A', target: 'B'}, {source: 'C', target: 'A'}]
                };
                const state = {
                    nodes: {
                        A: { x: 20, y: 40 },
                        B: { x: 40, y: 60 }
                    },
                    links: 'links',
                    nodeIndexMapping: 'nodeIndexMapping'
                };

                const newState = graphHelper.initializeGraphState({data, id: 'id', config: undefined}, state);

                expect(newState).toEqual(
                    {
                        config: {
                            config: "config"
                        },
                        configUpdated: false,
                        d3Links: [{
                            source: "A",
                            target: "B"
                        }, {
                            source: "C",
                            target: "A"
                        }],
                        d3Nodes: [{
                            highlighted: false,
                            id: "A",
                            x: 20,
                            y: 40
                        }, {
                            highlighted: false,
                            id: "B",
                            x: 40,
                            y: 60
                        }, {
                            highlighted: false,
                            id: "C",
                            x: 0,
                            y: 0
                        }],
                        highlightedNode: "",
                        id: "id",
                        links: {
                            A: {
                                B: 1,
                                C: 1
                            },
                            B: {
                                A: 1
                            },
                            C: {
                                A: 1
                            }
                        },
                        newGraphElements: false,
                        nodes: {
                            A: {
                                highlighted: false,
                                id: "A",
                                x: 20,
                                y: 40
                            },
                            B: {
                                highlighted: false,
                                id: "B",
                                x: 40,
                                y: 60
                            },
                            C: {
                                highlighted: false,
                                id: "C",
                                x: 0,
                                y: 0
                            }
                        },
                        simulation: {
                            force: forceStub
                        },
                        transform: 1
                    }
                );
            });
        });

        describe('when invalid graph data is provided', () => {
            describe('when no nodes are provided', () => {
                test('should throw INSUFFICIENT_DATA error', () => {
                    const data = { nodes: [], links: [] };

                    graphHelper.initializeGraphState({
                        data,
                        id: 'id',
                        config: 'config'
                    }, 'state');

                    expect(utils.throwErr).toHaveBeenCalledWith('Graph', 'you have not provided enough data'
                        + ' for react-d3-graph to render something. You need to provide at least one node');
                });
            });

            describe('when invalid link structure is found', () => {
                afterEach(() => {
                    utils.throwErr.mockReset();
                });

                describe('when link source references nonexistent node', () => {
                    test('should throw INVALID_LINKS error', () => {
                        const data = { nodes: [{id: 'A'}], links: [{source: 'B', target: 'A'}] };

                        graphHelper.initializeGraphState({
                            data,
                            id: 'id',
                            config: 'config'
                        }, 'state');

                        expect(utils.throwErr).toHaveBeenCalledWith('Graph', 'you provided a invalid links data'
                            + ' structure. Links source and target attributes must point to an existent node - "B" is not a valid source node id');
                    });
                });

                describe('when link target references nonexistent node', () => {
                    test('should throw INVALID_LINKS error', () => {
                        const data = { nodes: [{id: 'A'}], links: [{source: 'A', target: 'B'}] };

                        graphHelper.initializeGraphState({
                            data,
                            id: 'id',
                            config: 'config'
                        }, 'state');

                        expect(utils.throwErr).toHaveBeenCalledWith('Graph', 'you provided a invalid links data'
                            + ' structure. Links source and target attributes must point to an existent node - "B" is not a valid target node id');
                    });
                });
            });
        });
    });
});
