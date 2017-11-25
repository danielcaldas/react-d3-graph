import graphHelper from '../../../src/components/graph/helper';

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
});
