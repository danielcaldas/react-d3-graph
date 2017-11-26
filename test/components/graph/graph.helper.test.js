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
    test('#createForceSimulation', () => {
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

    describe('#initializeGraphState', () => {
        describe('when valid graph data is provided', () => {
            // ...
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

                    // FIXME: below the most correct way to assert the error: expect(utils.throwErr).toThrowError(...)
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
