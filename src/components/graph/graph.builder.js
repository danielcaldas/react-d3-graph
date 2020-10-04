/**
 * @module Graph/builder
 * @description
 * Offers a series of methods that isolate the way graph elements are built (nodes and links mainly).
 */
import CONST from "./graph.const";

import { buildLinkPathDefinition } from "../link/link.helper";
import { getMarkerId } from "../marker/marker.helper";
import { getNormalizedNodeCoordinates } from "./graph.helper";

/**
 * Get the correct node opacity in order to properly make decisions based on context such as currently highlighted node.
 * @param  {Object} node - the node object for whom we will generate properties.
 * @param  {string} highlightedNode - same as {@link #graphrenderer|highlightedNode in renderGraph}.
 * @param  {Object} highlightedLink - same as {@link #graphrenderer|highlightedLink in renderGraph}.
 * @param  {Object} config - same as {@link #graphrenderer|config in renderGraph}.
 * @returns {number} the opacity value for the given node.
 * @memberof Graph/builder
 */
function _getNodeOpacity(node, highlightedNode, highlightedLink, config) {
  const highlight =
    node.highlighted ||
    node.id === (highlightedLink && highlightedLink.source) ||
    node.id === (highlightedLink && highlightedLink.target);
  const someLinkHighlighted = highlightedLink && highlightedLink.source && highlightedLink.target;
  const someNodeHighlighted = !!(highlightedNode || someLinkHighlighted);

  let opacity;

  if (someNodeHighlighted && config.highlightDegree === 0) {
    opacity = highlight ? config.node.opacity : config.highlightOpacity;
  } else if (someNodeHighlighted) {
    opacity = highlight ? config.node.opacity : config.highlightOpacity;
  } else {
    opacity = node.opacity || config.node.opacity;
  }

  return opacity;
}

/**
 * Build some Link properties based on given parameters.
 * @param  {Object} link - the link object for which we will generate properties.
 * @param  {Object.<string, Object>} nodes - same as {@link #graphrenderer|nodes in renderGraph}.
 * @param  {Object.<string, Object>} links - same as {@link #graphrenderer|links in renderGraph}.
 * @param  {Object} config - same as {@link #graphrenderer|config in renderGraph}.
 * @param  {Function[]} linkCallbacks - same as {@link #graphrenderer|linkCallbacks in renderGraph}.
 * @param  {string} highlightedNode - same as {@link #graphrenderer|highlightedNode in renderGraph}.
 * @param  {Object} highlightedLink - same as {@link #graphrenderer|highlightedLink in renderGraph}.
 * @param  {number} transform - value that indicates the amount of zoom transformation.
 * @returns {Object} returns an object that aggregates all props for creating respective Link component instance.
 * @memberof Graph/builder
 */
function buildLinkProps(link, nodes, links, config, linkCallbacks, highlightedNode, highlightedLink, transform) {
  const { source, target } = link;
  let x1 = nodes?.[source]?.x || 0;
  let y1 = nodes?.[source]?.y || 0;
  let x2 = nodes?.[target]?.x || 0;
  let y2 = nodes?.[target]?.y || 0;

  const type = link.type || config.link.type;

  let mainNodeParticipates = false;

  switch (config.highlightDegree) {
    case 0:
      break;
    case 2:
      mainNodeParticipates = true;
      break;
    default:
      // 1st degree is the fallback behavior
      mainNodeParticipates = source === highlightedNode || target === highlightedNode;
      break;
  }

  const guiltyNode = mainNodeParticipates && nodes[source].highlighted && nodes[target].highlighted;
  const guiltyLink =
    source === (highlightedLink && highlightedLink.source) && target === (highlightedLink && highlightedLink.target);
  const highlight = guiltyNode || guiltyLink;

  let opacity = link.opacity || config.link.opacity;

  if (highlightedNode || (highlightedLink && highlightedLink.source)) {
    opacity = highlight ? config.link.opacity : config.highlightOpacity;
  }

  let stroke = link.color || config.link.color;

  if (highlight) {
    stroke = config.link.highlightColor === CONST.KEYWORDS.SAME ? config.link.color : config.link.highlightColor;
  }

  let strokeWidth = (link.strokeWidth || config.link.strokeWidth) * (1 / transform);

  if (config.link.semanticStrokeWidth) {
    const linkValue = links[source][target] || links[target][source] || 1;

    strokeWidth += (linkValue * strokeWidth) / 10;
  }

  const markerId = config.directed ? getMarkerId(highlight, transform, config) : null;

  const t = 1 / transform;

  let fontSize = null,
    fontColor = null,
    fontWeight = null,
    label = null;

  if (config.link.renderLabel) {
    if (typeof config.link.labelProperty === "function") {
      label = config.link.labelProperty(link);
    } else {
      label = link[config.link.labelProperty];
    }

    fontSize = link.fontSize || config.link.fontSize;
    fontColor = link.fontColor || config.link.fontColor;
    fontWeight = highlight ? config.link.highlightFontWeight : config.link.fontWeight;
  }

  const { sourceCoords, targetCoords } = getNormalizedNodeCoordinates(
    { sourceId: source, targetId: target, sourceCoords: { x: x1, y: y1 }, targetCoords: { x: x2, y: y2 } },
    nodes,
    config,
    strokeWidth
  );
  const d = buildLinkPathDefinition(sourceCoords, targetCoords, type);

  return {
    className: CONST.LINK_CLASS_NAME,
    d,
    fontColor,
    fontSize: fontSize * t,
    fontWeight,
    label,
    markerId,
    mouseCursor: config.link.mouseCursor,
    opacity,
    source,
    stroke,
    strokeWidth,
    target,
    onClickLink: linkCallbacks.onClickLink,
    onMouseOutLink: linkCallbacks.onMouseOutLink,
    onMouseOverLink: linkCallbacks.onMouseOverLink,
    onRightClickLink: linkCallbacks.onRightClickLink,
  };
}

/**
 * Build some Node properties based on given parameters.
 * @param  {Object} node - the node object for whom we will generate properties.
 * @param  {Object} config - same as {@link #graphrenderer|config in renderGraph}.
 * @param  {Function[]} nodeCallbacks - same as {@link #graphrenderer|nodeCallbacks in renderGraph}.
 * @param  {string} highlightedNode - same as {@link #graphrenderer|highlightedNode in renderGraph}.
 * @param  {Object} highlightedLink - same as {@link #graphrenderer|highlightedLink in renderGraph}.
 * @param  {number} transform - value that indicates the amount of zoom transformation.
 * @returns {Object} returns object that contain Link props ready to be feeded to the Link component.
 * @memberof Graph/builder
 */
function buildNodeProps(node, config, nodeCallbacks = {}, highlightedNode, highlightedLink, transform) {
  const highlight =
    node.highlighted ||
    node.id === (highlightedLink && highlightedLink.source) ||
    node.id === (highlightedLink && highlightedLink.target);
  const opacity = _getNodeOpacity(node, highlightedNode, highlightedLink, config);
  let fill = node.color || config.node.color;

  if (highlight && config.node.highlightColor !== CONST.KEYWORDS.SAME) {
    fill = config.node.highlightColor;
  }

  let stroke = node.strokeColor || config.node.strokeColor;

  if (highlight && config.node.highlightStrokeColor !== CONST.KEYWORDS.SAME) {
    stroke = config.node.highlightStrokeColor;
  }

  let label = node[config.node.labelProperty] || node.id;

  if (typeof config.node.labelProperty === "function") {
    label = config.node.labelProperty(node);
  }

  let labelPosition = node.labelPosition || config.node.labelPosition;
  let strokeWidth = node.strokeWidth || config.node.strokeWidth;

  if (highlight && config.node.highlightStrokeWidth !== CONST.KEYWORDS.SAME) {
    strokeWidth = config.node.highlightStrokeWidth;
  }

  const t = 1 / transform;
  const nodeSize = node.size || config.node.size;

  let offset;
  const isSizeNumericValue = typeof nodeSize !== "object";

  if (isSizeNumericValue) {
    offset = nodeSize;
  } else if (labelPosition === "top" || labelPosition === "bottom") {
    offset = nodeSize.height;
  } else {
    nodeSize.width;
  }

  const fontSize = node.fontSize || config.node.fontSize;
  const highlightFontSize = node.highlightFontSize || config.node.highlightFontSize;

  const finalFontSize = highlight ? highlightFontSize : fontSize;
  const dx = finalFontSize * t + offset / 100 + 1.5;

  const svg = node.svg || config.node.svg;
  const fontColor = node.fontColor || config.node.fontColor;

  let renderLabel = config.node.renderLabel;
  if (node.renderLabel !== undefined && typeof node.renderLabel === "boolean") {
    renderLabel = node.renderLabel;
  }

  return {
    ...node,
    className: CONST.NODE_CLASS_NAME,
    cursor: config.node.mouseCursor,
    cx: node?.x || "0",
    cy: node?.y || "0",
    dx,
    fill,
    fontColor,
    fontSize: finalFontSize * t,
    fontWeight: highlight ? config.node.highlightFontWeight : config.node.fontWeight,
    id: node.id,
    label,
    labelPosition,
    opacity,
    overrideGlobalViewGenerator: !node.viewGenerator && node.svg,
    renderLabel,
    size: isSizeNumericValue ? nodeSize * t : { height: nodeSize.height * t, width: nodeSize.width * t },
    stroke,
    strokeWidth: strokeWidth * t,
    svg,
    type: node.symbolType || config.node.symbolType,
    viewGenerator: node.viewGenerator || config.node.viewGenerator,
    onClickNode: nodeCallbacks.onClickNode,
    onMouseOut: nodeCallbacks.onMouseOut,
    onMouseOverNode: nodeCallbacks.onMouseOverNode,
    onRightClickNode: nodeCallbacks.onRightClickNode,
  };
}

export { buildLinkProps, buildNodeProps };
