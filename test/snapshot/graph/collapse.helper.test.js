import * as collapseHelper from '../../../src/components/graph/collapse.helper';
import * as graphData from '../../../sandbox/data/default';
import { initializeGraphState } from '../../../src/components/graph/graph.helper';

describe('Collapse Helper', () => {
    let directedState;
    let defaultState;

    beforeAll(() => {
        directedState = initializeGraphState({ data: graphData, id: 'id', config: { directed: true } });
        defaultState = initializeGraphState({ data: graphData, id: 'id' });
    });

    describe('#computeNodeDegree', () => {
        describe('when graph is directed', () => {
            test('should calculate correct node degree for "Androsynth"', () => {
                const nodeId = 'Androsynth';

                expect(collapseHelper.computeNodeDegree(nodeId, directedState.links)).toEqual({
                    inDegree: 0,
                    outDegree: 7
                });
            });

            test('should calculate correct node degree for "Podship"', () => {
                const nodeId = 'Podship';

                expect(collapseHelper.computeNodeDegree(nodeId, directedState.links)).toEqual({
                    inDegree: 1,
                    outDegree: 0
                });
            });

            test('should calculate correct node degree for "Mycon"', () => {
                const nodeId = 'Mycon';

                expect(collapseHelper.computeNodeDegree(nodeId, directedState.links)).toEqual({
                    inDegree: 2,
                    outDegree: 3
                });
            });
        });

        describe('when graph is not directed', () => {
            test('should calculate correct node degree for "Androsynth"', () => {
                const nodeId = 'Androsynth';

                expect(collapseHelper.computeNodeDegree(nodeId, defaultState.links)).toEqual({
                    inDegree: 7,
                    outDegree: 7
                });
            });

            test('should calculate correct node degree for "Podship"', () => {
                const nodeId = 'Podship';

                expect(collapseHelper.computeNodeDegree(nodeId, defaultState.links)).toEqual({
                    inDegree: 1,
                    outDegree: 1
                });
            });

            test('should calculate correct node degree for "Mycon"', () => {
                const nodeId = 'Mycon';

                expect(collapseHelper.computeNodeDegree(nodeId, defaultState.links)).toEqual({
                    inDegree: 5,
                    outDegree: 5
                });
            });
        });
    });

    describe('#getTargetLeafConnections', () => {
        describe('when graph is directed', () => {
            test('should return expected leaf connections for node "Mycon"', () => {
                const nodeId = 'Mycon';

                expect(collapseHelper.getTargetLeafConnections(nodeId, directedState.links)).toEqual([
                    { source: 'Mycon', target: 'Podship' }
                ]);
            });

            test('should return expected leaf connections for node "VUX"', () => {
                const nodeId = 'VUX';

                expect(collapseHelper.getTargetLeafConnections(nodeId, directedState.links)).toEqual([
                    { source: 'VUX', target: 'Intruder' }
                ]);
            });

            test('should return expected leaf connections for node "Eluder"', () => {
                const nodeId = 'Eluder';

                expect(collapseHelper.getTargetLeafConnections(nodeId, directedState.links)).toEqual([]);
            });
        });

        describe('when graph is not directed', () => {
            test('should calculate correct node degree for "Androsynth"', () => {
                const nodeId = 'Mycon';

                expect(collapseHelper.getTargetLeafConnections(nodeId, defaultState.links)).toEqual([
                    { source: 'Mycon', target: 'Podship' }
                ]);
            });

            test('should return expected leaf connections for node "VUX"', () => {
                const nodeId = 'VUX';

                expect(collapseHelper.getTargetLeafConnections(nodeId, defaultState.links)).toEqual([
                    { source: 'VUX', target: 'Intruder' }
                ]);
            });

            test('should return expected leaf connections for node "Eluder"', () => {
                const nodeId = 'Eluder';

                expect(collapseHelper.getTargetLeafConnections(nodeId, defaultState.links)).toEqual([]);
            });
        });
    });

    describe('#toggleLinksMatrixConnections', () => {
        describe('when graph is directed', () => {
            test('should properly toggle passed connections in links matrix', () => {
                const connections = [
                    { source: 'Androsynth', target: 'Chenjesu' },
                    { source: 'Androsynth', target: 'Ilwrath' }
                ];

                expect(
                    collapseHelper.toggleLinksMatrixConnections(directedState.links, connections, true)
                ).toMatchSnapshot();
            });
        });

        describe('when graph is not directed', () => {
            test('should properly toggle passed connections in links matrix', () => {
                const connections = [
                    { source: 'Androsynth', target: 'Chenjesu' },
                    { source: 'Androsynth', target: 'Ilwrath' }
                ];

                expect(
                    collapseHelper.toggleLinksMatrixConnections(defaultState.links, connections, false)
                ).toMatchSnapshot();
            });
        });
    });
});
