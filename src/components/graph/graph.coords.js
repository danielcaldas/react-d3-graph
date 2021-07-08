import CONST from "./graph.const";
import { logWarning } from "../../utils";

/**
 * Computes the normalized vector from a vector.
 *
 * @param {Object} vector - A 2D vector with x and y components.
 * @param {number} vector.x - The X coordinate.
 * @param {number} vector.y - The Y coordinate.
 * @returns {Object} Normalized vector.
 * @memberof Graph/helper
 */
function normalize(vector) {
  const norm = Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));
  return norm === 0 ? vector : { x: vector.x / norm, y: vector.y / norm };
}

/**
 * Calculates the vector length from the center of a rectangle to the closest edge following a direction.
 * This calculation is taken from https://stackoverflow.com/a/3197924.
 *
 * @param {Object.<string, number>} RectangleCoords - The coords of the left-top vertex, and the right-bottom vertex.
 * @param {Object.<string, number>} VectorOriginCoords - The center of the rectangle coords.
 * @param {Object.<string, number>} directionVector - A 2D vector with x and y components.
 * @returns {number} The length of the vector from the center of the symbol to it's closet edge, considering the given direction vector.
 */
function calcRectangleVectorLengthFromCoords({ x1, y1, x2, y2 }, { px, py }, directionVector) {
  const angle = Math.atan(directionVector.y / directionVector.x);

  const vx = Math.cos(angle);
  const vy = Math.sin(angle);

  if (vx === 0) {
    return x2 - x1;
  } else if (vy === 0) {
    return y2 - y1;
  }

  const leftEdge = (x1 - px) / vx;
  const rightEdge = (x2 - px) / vx;

  const topEdge = (y1 - py) / vy;
  const bottomEdge = (y2 - py) / vy;

  return Math.min(...[leftEdge, rightEdge, topEdge, bottomEdge].filter(edge => edge > 0));
}

/**
 * Calculates the radius of the node.
 *
 * @param {number} nodeSize - The size of the circle, when no viewGenerator is specified, else the size of an edge of the viewGenerator square.
 * @param {boolean} isCustomNode - Is viewGenerator specified.
 * @returns {number} The length of the vector from the center of the symbol to it's closet edge, considering the given direction vector.
 */
function calcCircleVectorLength(nodeSize, isCustomNode) {
  let radiusLength;
  if (isCustomNode) {
    // nodeSize equals the Diameter in the case of custome-node.
    radiusLength = nodeSize / 10 / 2;
  } else {
    // because this is a circle and A = pi * r^2.
    radiusLength = Math.sqrt(nodeSize / Math.PI);
  }
  return radiusLength;
}

/**
 * Calculates the vector length from the center of a square to the closest edge following a direction.
 *
 * @param {number} nodeSize - The size of the square, when no viewGenerator is specified, else the size of an edge of the viewGenerator square.
 * @param {Object.<string, number>} nodeCoords - The coords of a the square node.
 * @param {Object.<string, number>} directionVector - A 2D vector with x and y components.
 * @param {boolean} isCustomNode - Is viewGenerator specified.
 * @returns {number} The length of the vector from the center of the symbol to it's closet edge, considering the given direction vector.
 */
function calcSquareVectorLength(nodeSize, { x, y }, directionVector, isCustomNode) {
  let edgeSize;
  if (isCustomNode) {
    // nodeSize equals the edgeSize in the case of custome-node.
    edgeSize = nodeSize / 10;
  } else {
    // All the edges of a square are equal, inorder to calc its size we multplie two edges.
    edgeSize = Math.sqrt(nodeSize);
  }

  // The x and y coords represent the top center of the component
  const leftSquareX = x - edgeSize / 2;
  const topSquareY = y - edgeSize / 2;

  return calcRectangleVectorLengthFromCoords(
    { x1: leftSquareX, y1: topSquareY, x2: leftSquareX + edgeSize, y2: topSquareY + edgeSize },
    { px: x, py: y },
    directionVector
  );
}

/**
 * Calculates the vector length from the center of a rectangle to the closest edge following a direction.
 *
 * @param {number} nodeSize - The size of the square, when no viewGenerator is specified, else the size of an edge of the viewGenerator square.
 * @param {Object.<string, number>} nodeCoords - The coords of a the square node.
 * @param {Object.<string, number>} directionVector - A 2D vector with x and y components.
 * @returns {number} The length of the vector from the center of the symbol to it's closet edge, considering the given direction vector.
 */
function calcRectangleVectorLength(nodeSize, { x, y }, directionVector) {
  const horizEdgeSize = nodeSize.width / 10;
  const vertEdgeSize = nodeSize.height / 10;

  // The x and y coords in this library, represent the top center of the component.
  const leftSquareX = x - horizEdgeSize / 2;
  const topSquareY = y - vertEdgeSize / 2;

  // The size between the square center, to the appropriate square edges
  return calcRectangleVectorLengthFromCoords(
    { x1: leftSquareX, y1: topSquareY, x2: leftSquareX + horizEdgeSize, y2: topSquareY + vertEdgeSize },
    { px: x, py: y },
    directionVector
  );
}

/**
 * Calculate a the vector length of symbol that included in symbols with optimized positioning.
 *
 * @param {string} symbolType - The string that specifies the symbol type (should be one of {@link #node-symbol-type|node.symbolType}).
 * @param {(number | Object.<string, number>)} nodeSize - The size of the square, when no viewGenerator is specified, else the size of an edge of the viewGenerator square.
 * @param {Object.<string, number>} nodeCoords - The coords of a the square node.
 * @param {Object.<string, number>} directionVector - A 2D vector with x and y components.
 * @param {boolean} isCustomNode - Is viewGenerator specified.
 * @returns {number} The length of the vector from the center of the symbol to it's closet edge, considering the given direction vector.
 */
function calcVectorLength(symbolType, nodeSize, { x, y }, directionVector, isCustomNode) {
  if (isCustomNode && typeof nodeSize === "object" && nodeSize?.width && nodeSize?.height) {
    return calcRectangleVectorLength(nodeSize, { x, y }, directionVector);
  }

  switch (symbolType) {
    case CONST.SYMBOLS.CIRCLE:
      if (typeof nodeSize !== "number") {
        logWarning("When specifiying 'circle' as node symbol, the size of the node must be a number.");
        break;
      }
      return calcCircleVectorLength(nodeSize, isCustomNode);

    case CONST.SYMBOLS.SQUARE:
      if (typeof nodeSize !== "number") {
        logWarning("When specifiying 'square' as node symbol, the size of the node must be a number.");
        break;
      }
      return calcSquareVectorLength(nodeSize, { x, y }, directionVector, isCustomNode);
  }

  return 1;
}

/**
 * When directed graph is specified, we add arrow head to the link.
 * In order to add the arrow head we subtract its size from the last point of the link.
 *
 * @param {number} p1 - x or y coordinate, of the link last point.
 * @param {number} p2 - x or y coordinate, of the link ending point.
 * @param {number} pDirectionVector - The link direction vector in the x or y axis.
 * @param {number} arrowSize - The size of the arrow head.
 * @returns {number} The amount we should add to the x or y coords, in order to free up space for the arrow head.
 */
function directedGraphCoordsOptimization(p1, p2, pDirectionVector, arrowSize) {
  const pDiff = Math.abs(p2 - p1);
  const invertedDirectionVector = pDirectionVector * -1;
  const pVectorArrowSize = Math.abs(arrowSize * invertedDirectionVector);

  let p2opti;
  if (pDiff > pVectorArrowSize) {
    p2opti = arrowSize * invertedDirectionVector;
  } else {
    p2opti = (pDiff - 1) * invertedDirectionVector;
  }

  return p2opti;
}

/**
 * When directed graph is specified, we add arrow head to the link.
 * In order to add the arrow head we subtract its size from the last point of the link.
 *
 * @param {Object.<string, number>} optimizedTargetCoords - The modified coords of the target node.
 * @param {Object.<string, number>} prevCoords - The coords of a the last point in the link (last link.breakPoints or the sourceCoords).
 * @param {Object.<string, number>} directionVector - A 2D vector with x and y components.
 * @param {number} arrowSize - The size of the arrow head.
 * @param {Object.<string, number>} targetCoords - The initial coords of the target node.
 * @param {(number | Object.<string, number>)} targetNodeSize - The target node size.
 * @param {boolean} isCustomNode - Is viewGenerator specified.
 * @returns {Object.<string, number>} The amount we should add to the x or y coords, in order to free up space for the arrow head.
 */
function directedGraphOptimization(
  { x: trgX, y: trgY },
  { x: prevX, y: prevY },
  directionVector,
  arrowSize,
  targetCoords,
  targetNodeSize,
  isCustomNode
) {
  // Check if the last link coord overlaps with the target node.
  if (isCustomNode && typeof targetNodeSize === "object" && targetNodeSize?.width && targetNodeSize?.height) {
    const targetNodeWidth = targetNodeSize.width / 10;
    const targetNodeHeight = targetNodeSize.height / 10;

    const leftTargetNodeRectangleX = targetCoords.x - targetNodeWidth / 2;
    const xOverlaps = leftTargetNodeRectangleX < prevX && prevX < leftTargetNodeRectangleX + targetNodeWidth;

    const topTargetNodeRectangleY = targetCoords.y - targetNodeHeight / 2;
    const yOverlaps = topTargetNodeRectangleY < prevY && prevY < topTargetNodeRectangleY + targetNodeHeight;

    if (xOverlaps && yOverlaps) {
      return targetCoords;
    }
  }
  const optTrgX = directedGraphCoordsOptimization(prevX, trgX, directionVector.x, arrowSize);
  const newTrgX = trgX + optTrgX;

  const optTrgY = directedGraphCoordsOptimization(prevY, trgY, directionVector.y, arrowSize);
  const newTrgY = trgY + optTrgY;

  return { x: newTrgX, y: newTrgY };
}

/**
 * Computes new node coordinates to make arrowheads point at nodes.
 * Arrow configuration is only available for circles, squares and rectangles.
 *
 * @param {Object} info - The couple of nodes we need to compute new coordinates.
 * @param {string} info.sourceId - Node source id.
 * @param {string} info.targetId - Node target id.
 * @param {Object} info.sourceCoords - Node source coordinates.
 * @param {Object} info.targetCoords - Node target coordinates.
 * @param {Object.<string, Object>} nodes - Same as {@link #graphrenderer|nodes in renderGraph}.
 * @param {Object} config - Same as {@link #graphrenderer|config in renderGraph}.
 * @param {number} strokeWidth - Width of the link stroke.
 * @param {Array.<Object>} breakPoints - Additional set of points that the link will cross.
 * @returns {Object} new nodes coordinates
 * @memberof Graph/helper
 */
function getNormalizedNodeCoordinates(
  { sourceId, targetId, sourceCoords = {}, targetCoords = {} },
  nodes,
  config,
  strokeWidth,
  breakPoints = []
) {
  const sourceNode = nodes?.[sourceId];
  const targetNode = nodes?.[targetId];

  if (!sourceNode || !targetNode) {
    return { sourceCoords, targetCoords };
  }

  const sourceSymbolType = sourceNode.symbolType || config.node?.symbolType;
  const targetSymbolType = targetNode.symbolType || config.node?.symbolType;

  const sourceWithOptimizedPositioning = CONST.SYMBOLS_WITH_OPTIMIZED_POSITIONING.has(sourceSymbolType);
  const sourceRectangleWithViewGenerator =
    !!(sourceNode?.viewGenerator || config.node?.viewGenerator) &&
    !!(typeof (sourceNode?.size || config.node?.size) === "object");

  const targetWithOptimizedPositioning = CONST.SYMBOLS_WITH_OPTIMIZED_POSITIONING.has(targetSymbolType);
  const targetRectangleWithViewGenerator =
    !!(targetNode?.viewGenerator || config.node?.viewGenerator) &&
    !!(typeof (sourceNode?.size || config.node?.size) === "object");

  if (
    !(sourceWithOptimizedPositioning || sourceRectangleWithViewGenerator) &&
    !(targetWithOptimizedPositioning || targetRectangleWithViewGenerator)
  ) {
    // if symbols don't have optimized positioning implementations fallback to input coords
    return { sourceCoords, targetCoords };
  }

  let { x: srcX, y: srcY } = sourceCoords;
  let { x: trgX, y: trgY } = targetCoords;

  const { x: nextX, y: nextY } = breakPoints.length > 0 ? breakPoints[0] : targetCoords;
  const firstDirectionVector = normalize({ x: nextX - srcX, y: nextY - srcY });

  const isSourceCustomNode = sourceNode?.viewGenerator || config.node?.viewGenerator;
  const sourceNodeSize = sourceNode?.size || config.node?.size;

  const sourceVectorLength =
    calcVectorLength(sourceSymbolType, sourceNodeSize, { x: srcX, y: srcY }, firstDirectionVector, isSourceCustomNode) *
    0.95;

  srcX += sourceVectorLength * firstDirectionVector.x;
  srcY += sourceVectorLength * firstDirectionVector.y;

  const { x: prevX, y: prevY } = breakPoints.length > 0 ? breakPoints[breakPoints.length - 1] : { x: srcX, y: srcY };
  const secondDirectionVector = normalize({ x: trgX - prevX, y: trgY - prevY });

  // it's fine `markerWidth` or `markerHeight` we just want to fallback to a number
  // to avoid NaN on `Math.min(undefined, undefined) > NaN
  const strokeSize = strokeWidth * Math.min(config.link?.markerWidth || 5, config.link?.markerHeight || 5);
  const isTargetCustomNode = targetNode?.viewGenerator || config.node?.viewGenerator;
  const targetNodeSize = targetNode?.size || config.node?.size;

  const targetVectorLength =
    calcVectorLength(
      targetSymbolType,
      targetNodeSize,
      { x: trgX, y: trgY },
      secondDirectionVector,
      isTargetCustomNode
    ) * 0.95;

  const arrowSize = config.directed ? strokeSize : 0;
  trgX -= targetVectorLength * secondDirectionVector.x;
  trgY -= targetVectorLength * secondDirectionVector.y;

  const { x: newTrgX, y: newTrgY } = directedGraphOptimization(
    { x: trgX, y: trgY },
    { x: prevX, y: prevY },
    secondDirectionVector,
    arrowSize,
    targetCoords,
    targetNodeSize,
    isTargetCustomNode
  );
  trgX = newTrgX;
  trgY = newTrgY;

  return { sourceCoords: { x: srcX, y: srcY }, targetCoords: { x: trgX, y: trgY } };
}

export { getNormalizedNodeCoordinates };
