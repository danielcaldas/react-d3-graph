/**
 * @module Graph/collapse-helper
 * @description
 * Offers a series of methods that allow graph to perform the necessary operations to
 * create the collapsible behavior. These functions will most likely operate on
 * the links matrix.
 */
import { getId } from "./graph.helper";
import { logError } from "../../utils";

/**
 * For directed graphs.
 * Check based on node degrees whether it is a leaf node or not.
 * @param {number} inDegree - the in degree for a given node.
 * @param {number} outDegree - the out degree for a given node.
 * @returns {boolean} based on the degrees tells whether node is leaf or not.
 * @memberof Graph/collapse-helper
 */
function _isLeafDirected(inDegree, outDegree) {
  return inDegree <= 1 && outDegree < 1;
}

/**
 * For not directed graphs.
 * Check based on node degrees whether it is a leaf node or not.
 * @param {number} inDegree - the in degree for a given node.
 * @param {number} outDegree - the out degree for a given node.
 * @returns {boolean} based on the degrees tells whether node is leaf or not.
 * @memberof Graph/collapse-helper
 */
function _isLeafNotDirected(inDegree, outDegree) {
  return inDegree <= 1 && outDegree <= 1;
}

/**
 * Given in and out degree tells whether degrees indicate a leaf or non leaf scenario.
 * @param {string} nodeId - The id of the node to get the cardinality of.
 * @param {Object.<string, number>} linksMatrix - An object containing a matrix of connections of the nodes.
 * @param {boolean} directed - whether graph in context is directed or not.
 * @returns {boolean} flag that indicates whether node is leaf or not.
 * @memberof Graph/collapse-helper
 */
function _isLeaf(nodeId, linksMatrix, directed) {
  const { inDegree, outDegree } = computeNodeDegree(nodeId, linksMatrix);
  const fn = directed ? _isLeafDirected : _isLeafNotDirected;

  return fn(inDegree, outDegree);
}

/**
 * Calculates degree (in and out) of some provided node.
 * @param {string|number} nodeId - the id of the node whom degree we want to compute.
 * @param {Object.<string, Object>} linksMatrix - an object containing a matrix of connections of the graph, for each nodeId,
 * there is an object that maps adjacent nodes ids (string) and their values (number).
 * @returns {Object.<string, number>} returns object containing in and out degree of the node:
 * - inDegree: number
 * - outDegree: number
 * @memberof Graph/collapse-helper
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
          _acc.outDegree += linksMatrix[nodeId][target];
        }

        if (nodeId === target) {
          _acc.inDegree += linksMatrix[source][nodeId];
        }

        return _acc;
      }, acc);
    },
    {
      inDegree: 0,
      outDegree: 0,
    }
  );
}

/**
 * Given a node id we want to calculate the list of leaf connections
 * @param {string} rootNodeId - node who's leafs we want to calculate.
 * @param {Object.<string, Object>} linksMatrix - an object containing a matrix of connections of the graph, for each nodeId,
 * there is an object that maps adjacent nodes ids (string) and their values (number).
 * @param  {Object} config - same as {@link #graphrenderer|config in renderGraph}.
 * @param {boolean} config.directed - tells whether linksMatrix represents a directed graph or not.
 * @returns {Array.<Object.<string, string>>} a list of leaf connections.
 * What is a leaf connection? A leaf connection is a link between some node A and other node B
 * where A has id equal to rootNodeId and B has inDegree 1 and outDegree 0 (or outDegree 1 but the connection is with A).
 * @memberof Graph/collapse-helper
 */
function getTargetLeafConnections(rootNodeId, linksMatrix = {}, { directed }) {
  const rootConnectionsNodesIds = linksMatrix[rootNodeId] ? Object.keys(linksMatrix[rootNodeId]) : [];

  return rootConnectionsNodesIds.reduce((leafConnections, target) => {
    if (_isLeaf(target, linksMatrix, directed)) {
      leafConnections.push({
        source: rootNodeId,
        target,
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
 * always remember that *A leaf can, throughout time, both a visible or an invisible node!*.
 *
 * @param {string} nodeId - The id of the node to get the cardinality of
 * @param  {Object.<string, Object>} nodes - an object containing all nodes mapped by their id.
 * @param {Object.<string, number>} linksMatrix - An object containing a matrix of connections of the nodes.
 * @returns {boolean} flag that indicates whether node should or not be displayed.
 * @memberof Graph/collapse-helper
 */
function isNodeVisible(nodeId, nodes, linksMatrix) {
  const node = nodes[nodeId];

  if (!node) {
    if (process.env.NODE_ENV === "development") {
      logError(
        "graph/collapse.helper",
        `Trying to check if node ${nodeId} is visible but its not present in nodes: `,
        nodes
      );
    }
    return false;
  }
  if (nodes[nodeId]._orphan) {
    return true;
  }

  const { inDegree, outDegree } = computeNodeDegree(nodeId, linksMatrix);

  return inDegree > 0 || outDegree > 0;
}

/**
 * Updates d3Links by toggling given connections
 * @param {Array.<Object>} d3Links - An array containing all the d3 links.
 * @param {Array.<Object.<string, string>>} connectionMatrix - connections to toggle.
 * @returns {Array.<Object>} updated d3Links.
 * @memberof Graph/collapse-helper
 */
function toggleLinksConnections(d3Links, connectionMatrix) {
  return d3Links.map(d3Link => {
    const { source, target } = d3Link;
    const sourceId = getId(source);
    const targetId = getId(target);
    // connectionMatrix[sourceId][targetId] can be 0 or non existent
    const connection = connectionMatrix && connectionMatrix[sourceId] && connectionMatrix[sourceId][targetId];
    const isHidden = !connection;

    return { ...d3Link, isHidden };
  });
}

/**
 * Update matrix given array of connections to toggle.
 * @param {Object.<string, Object>} linksMatrix - an object containing a matrix of connections of the graph, for each nodeId,
 * there is an object that maps adjacent nodes ids (string) and their values (number).
 * @param {Array.<Object.<string, string>>} connections - connections to toggle on matrix.
 * @param  {Object} config - same as {@link #graphrenderer|config in renderGraph}.
 * @param {boolean} config.directed - tells whether linksMatrix represents a directed graph or not.
 * @returns {Object.<string, Object>} updated linksMatrix
 * @memberof Graph/collapse-helper
 */
function toggleLinksMatrixConnections(linksMatrix, connections, { directed }) {
  return connections.reduce(
    (newMatrix, link) => {
      if (!newMatrix[link.source]) {
        newMatrix[link.source] = {};
      }

      if (!newMatrix[link.source][link.target]) {
        newMatrix[link.source][link.target] = 0;
      }

      const newConnectionValue = newMatrix[link.source][link.target] === 0 ? 1 : 0;

      newMatrix[link.source][link.target] = newConnectionValue;

      if (!directed) {
        newMatrix[link.target][link.source] = newConnectionValue;
      }

      return newMatrix;
    },
    { ...linksMatrix }
  );
}

export {
  computeNodeDegree,
  getTargetLeafConnections,
  isNodeVisible,
  toggleLinksConnections,
  toggleLinksMatrixConnections,
};
