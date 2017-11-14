import graphHelper from '../../../src/components/graph/helper';

import {
    forceX,
    forceY,
    forceSimulation,
    forceManyBody
} from 'd3-force';

describe('Graph Helper', () => {
    let that = {};
    const mockFn = jest.fn();

    beforeEach(() => {
        forceSimulation.mockImplementation(() => '');
    });

    test('createForceSimulation', () => {
        graphHelper.createForceSimulation(500, 500);

        expect(forceSimulation).toHaveBeenCalled();
    });
});
