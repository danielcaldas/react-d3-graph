/**
Developer notes - collapsing nodes and maintaining state on links matrix.

User interaction flow
1. User clicks node
2. All leaf connections of that node are not rendered anymore
3. User clicks on same node
4. All leaf connections of that node are rendered

rd3g calculations
1. User clicks node
2. Compute leaf connections for clicked node (targetNode)
3. Update connections matrix (based on 2.)
4. Update d3Links array with toggled connections (based on 2.)
*/

/**
 * Given in and out degree tells whether degrees indicate a leaf or non leaf scenario.
 * @param {string} nodeId - The id of the node to get the cardinality of.
 * @param {Object.<string, number>} linksMatrix - An object containing a matrix of connections of the nodes.
 * @returns {boolean} flag that indicates whether node is leaf or not.
 * @memberof Graph/collapse.helper
 */
function _isLeaf(nodeId, linksMatrix) {
    const { inDegree, outDegree } = computeNodeDegree(nodeId, linksMatrix);

    return inDegree <= 1 && outDegree <= 1;
}

/**
 * Calculates degree (in an out) of some provided node.
 * @param {string|number} nodeId - the id of the node whom degree we want to compute.
 * @param {Object.<string, Object>} linksMatrix - an object containing a matrix of connections of the graph, for each nodeId,
 * there is an object that maps adjacent nodes ids (string) and their values (number).
 * @returns {Object.<string, number>} returns object containing in and out degree of the node:
 * - inDegree: number
 * - outDegree: number
 */
function computeNodeDegree(nodeId, linksMatrix = {}) {
    return Object.keys(linksMatrix).reduce(
        (acc, source) => {
            if (!linksMatrix[source]) {
                return acc;
            }

            const currentNodeConnections = Object.keys(linksMatrix[source]);

            return currentNodeConnections.reduce((_acc, target) => {
                if (nodeId === source) {
                    return {
                        ..._acc,
                        outDegree: _acc.outDegree + linksMatrix[source][target]
                    };
                }

                if (nodeId === target) {
                    return {
                        ..._acc,
                        inDegree: _acc.inDegree + linksMatrix[source][target]
                    };
                }

                return _acc;
            }, acc);
        },
        {
            inDegree: 0,
            outDegree: 0
        }
    );
}

/**
 * Given a node id we want to calculate the list of leaf connections
 * @param {string} rootNodeId - node who's leafs we want to calculate.
 * @param {Object.<string, Object>} linksMatrix - an object containing a matrix of connections of the graph, for each nodeId,
 * there is an object that maps adjacent nodes ids (string) and their values (number).
 * @returns {Array.<Object.<string, string>>} a list of leaf connections.
 * What is a leaf connection? A leaf connection is a link between some node A and other node B
 * where A has id equal to rootNodeId and B has inDegree 1 and outDegree 0 (or outDegree 1 but the connection is with A).
 */
function getTargetLeafConnections(rootNodeId, linksMatrix = {}) {
    const rootConnectionsNodesIds = Object.keys(linksMatrix[rootNodeId]);

    return rootConnectionsNodesIds.reduce((leafConnections, target) => {
        if (_isLeaf(target, linksMatrix)) {
            leafConnections.push({
                source: rootNodeId,
                target
            });
        }

        return leafConnections;
    }, []);
}

/**
 * Given a node and the connections matrix, check if node should be displayed
 * NOTE: this function is meant to be used under the `collapsible` toggle, meaning
 * that the `isNodeVisible` actually is checking visibility on collapsible graphs.
 * If you think that this code is confusing and could potentially collide (🤞) with #_isLeaf
 * always remember that *A leaf can, through time, be both a visible or an invisible node!*.
 *
 * @param {string} nodeId - The id of the node to get the cardinality of
 * @param {Object.<string, number>} linksMatrix - An object containing a matrix of connections of the nodes.
 * @returns {boolean} flag that indicates whether node should or not be displayed.
 * @memberof Graph/collapse.helper
 */
function isNodeVisible(nodeId, linksMatrix) {
    const { inDegree, outDegree } = computeNodeDegree(nodeId, linksMatrix);

    return inDegree >= 1 || outDegree >= 1;
}

/**
 * Update matrix given array of connections to toggle.
 * @param {Object.<string, Object>} linksMatrix - an object containing a matrix of connections of the graph, for each nodeId,
 * there is an object that maps adjacent nodes ids (string) and their values (number).
 * @param {Array.<Object.<string, string>>} connections - connections to toggle on matrix.
 * @param {boolean} directed - tells whether linksMatrix represents a directed graph or not.
 * @returns {Object.<string, Object>} updated linksMatrix
 */
function toggleLinksMatrixConnections(linksMatrix, connections, directed) {
    return connections.reduce(
        (newMatrix, link) => {
            if (!newMatrix[link.source]) {
                newMatrix[link.source] = {};
            }

            if (!newMatrix[link.source][link.target]) {
                newMatrix[link.source][link.target] = 0;
            }

            newMatrix[link.source][link.target] = newMatrix[link.source][link.target] === 0 ? 1 : 0;

            if (!directed) {
                newMatrix[link.target][link.source] = newMatrix[link.source][link.target];
            }

            return newMatrix;
        },
        { ...linksMatrix }
    );
}

/**
 * Updates d3Links by toggling given connections
 * @param {Array.<Object>} d3Links - An array containing all the d3 links.
 * @param {Array.<Object.<string, string>>} connectionMatrix - connections to toggle.
 * @returns {Array.<Object>} updated d3Links.
 */
function toggleLinksConnections(d3Links, connectionMatrix) {
    return d3Links.map(d3Link => {
        const { source, target } = d3Link;
        // TODO: Confirm whether fallbacks are needed in this situation
        const sourceId = source.id || source;
        const targetId = target.id || target;

        // TODO: Improve this code
        if (!(connectionMatrix && connectionMatrix[sourceId] && connectionMatrix[sourceId][targetId])) {
            return { ...d3Link, isHidden: true };
        }

        if (connectionMatrix[sourceId][targetId] === 0) {
            return { ...d3Link, isHidden: true };
        } else {
            return { ...d3Link, isHidden: false };
        }
    });
}

export {
    computeNodeDegree,
    getTargetLeafConnections,
    isNodeVisible,
    toggleLinksMatrixConnections,
    toggleLinksConnections
};
