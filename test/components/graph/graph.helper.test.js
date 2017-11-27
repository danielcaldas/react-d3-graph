import graphHelper from '../../../src/components/graph/helper';

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
    describe('#createForceSimulation', () => {
        test('should properly create d3 simulation object', () => {
            const fr = 10;
            const forceStub = jest.fn();
    
            d3ForceX.mockImplementation(() => {
                return {
                    strength: () => fr
                };
            });
            d3ForceY.mockImplementation(() => {
                return {
                    strength: () => fr
                };
            });
            d3ForceManyBody.mockImplementation(() => {
                return {
                    strength: () => fr
                };
            });
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
    
            graphHelper.createForceSimulation(1000, 1000);
    
            expect(d3ForceX).toHaveBeenCalledWith(500);
            expect(d3ForceY).toHaveBeenCalledWith(500);
            expect(d3ForceSimulation).toHaveBeenCalledWith();
            expect(forceStub).toHaveBeenCalledTimes(3);
            expect(forceStub).toHaveBeenCalledWith('charge', fr);
            expect(forceStub).toHaveBeenCalledWith('x', fr);
            expect(forceStub).toHaveBeenLastCalledWith('y', fr);
        });
    });

    describe('#initializeGraphState', () => {
        describe('when valid graph data is provided', () => {
            beforeEach(() => {
                utils.merge.mockImplementation(() => {
                    return {
                        config: 'config'
                    };
                });
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
                        config: {config: 'config'},
                        configUpdated: false,
                        d3Links: [{
                            source: 'A',
                            target: 'B'
                        }, {
                            source: 'C',
                            target: 'A'
                        }],
                        d3Nodes: [{
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
                        }],
                        highlightedNode: '',
                        id: 'id',
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
                        nodeIndexMapping: {
                            0: 'A',
                            1: 'B',
                            2: 'C'
                        },
                        nodes: {
                            A: {
                                highlighted: false,
                                id: 'A',
                                x: 20,
                                y: 40
                            },
                            B: {
                                highlighted: false,
                                id: 'B',
                                x: 40,
                                y: 60
                            },
                            C: {
                                highlighted: false,
                                id: 'C',
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
