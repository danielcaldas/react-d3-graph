/**
 * @module Graph/builder
 * @description
 * Offers a series of methods that isolate the way graph elements are built (nodes and links mainly).
 */
import CONST from "./graph.const";

import { buildLinkPathDefinition } from "../link/link.helper";
import { getMarkerId } from "../marker/marker.helper";

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
    const someNodeHighlighted = !!(
        highlightedNode ||
        (highlightedLink && highlightedLink.source && highlightedLink.target)
    );
    let opacity;

    if (someNodeHighlighted && config.highlightDegree === 0) {
        opacity = highlight ? config.node.opacity : config.highlightOpacity;
    } else if (someNodeHighlighted) {
        opacity = highlight ? config.node.opacity : config.highlightOpacity;
    } else {
        opacity = config.node.opacity;
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
    const x1 = (nodes[source] && nodes[source].x) || 0;
    const y1 = (nodes[source] && nodes[source].y) || 0;
    const x2 = (nodes[target] && nodes[target].x) || 0;
    const y2 = (nodes[target] && nodes[target].y) || 0;

    const d = buildLinkPathDefinition({ source: { x: x1, y: y1 }, target: { x: x2, y: y2 } }, config.link.type);

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

    const reasonNode = mainNodeParticipates && nodes[source].highlighted && nodes[target].highlighted;
    const reasonLink =
        source === (highlightedLink && highlightedLink.source) &&
        target === (highlightedLink && highlightedLink.target);
    const highlight = reasonNode || reasonLink;

    let opacity = config.link.opacity;

    if (highlightedNode || (highlightedLink && highlightedLink.source)) {
        opacity = highlight ? config.link.opacity : config.highlightOpacity;
    }

    let stroke = link.color || config.link.color;

    if (highlight) {
        stroke = config.link.highlightColor === CONST.KEYWORDS.SAME ? config.link.color : config.link.highlightColor;
    }

    let strokeWidth = config.link.strokeWidth * (1 / transform);

    if (config.link.semanticStrokeWidth) {
        const linkValue = links[source][target] || links[target][source] || 1;

        strokeWidth += (linkValue * strokeWidth) / 10;
    }

    const markerId = config.directed ? getMarkerId(highlight, transform, config) : null;

    return {
        markerId,
        d,
        source,
        target,
        strokeWidth,
        stroke,
        mouseCursor: config.link.mouseCursor,
        className: CONST.LINK_CLASS_NAME,
        opacity,
        onClickLink: linkCallbacks.onClickLink,
        onRightClickLink: linkCallbacks.onRightClickLink,
        onMouseOverLink: linkCallbacks.onMouseOverLink,
        onMouseOutLink: linkCallbacks.onMouseOutLink,
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
        (node.id === (highlightedLink && highlightedLink.source) ||
            node.id === (highlightedLink && highlightedLink.target));
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

    const t = 1 / transform;
    const nodeSize = node.size || config.node.size;
    const fontSize = highlight ? config.node.highlightFontSize : config.node.fontSize;
    const dx = fontSize * t + nodeSize / 100 + 1.5;
    const strokeWidth = highlight ? config.node.highlightStrokeWidth : config.node.strokeWidth;
    const svg = node.svg || config.node.svg;
    const fontColor = node.fontColor || config.node.fontColor;

    return {
        ...node,
        className: CONST.NODE_CLASS_NAME,
        cursor: config.node.mouseCursor,
        cx: (node && node.x) || "0",
        cy: (node && node.y) || "0",
        fill,
        fontColor,
        fontSize: fontSize * t,
        dx,
        fontWeight: highlight ? config.node.highlightFontWeight : config.node.fontWeight,
        id: node.id,
        label,
        onClickNode: nodeCallbacks.onClickNode,
        onRightClickNode: nodeCallbacks.onRightClickNode,
        onMouseOverNode: nodeCallbacks.onMouseOverNode,
        onMouseOut: nodeCallbacks.onMouseOut,
        opacity,
        renderLabel: config.node.renderLabel,
        size: nodeSize * t,
        stroke,
        strokeWidth: strokeWidth * t,
        svg,
        type: node.symbolType || config.node.symbolType,
        viewGenerator: node.viewGenerator || config.node.viewGenerator,
        overrideGlobalViewGenerator: !node.viewGenerator && node.svg,
    };
}

export { buildLinkProps, buildNodeProps };
