/**
 * @module Link/helper
 * @description
 * A set of helper methods to manipulate/create links.
 */
import { LINE_TYPES } from './link.const';

/**
 * Get a strategy to compute line radius.<br/>
 * *CURVE_SMOOTH* type inspired by {@link http://bl.ocks.org/mbostock/1153292|mbostock - Mobile Patent Suits}.
 * @param {string} type type of curve to get radius strategy from.
 * @returns {Function} a function that calculates a radius
 * to match curve type expectation. Fallback is the straight line.
 * @memberof Link/helper
 */
function getRadiusStrategy(type) {
    switch (type) {
        case LINE_TYPES.STRAIGHT:
            return () => 0;
        case LINE_TYPES.CURVE_SMOOTH:
            return (x1, y1, x2, y2) => {
                const dx = x2 - x1;
                const dy = y2 - y1;

                return Math.sqrt(dx * dx + dy * dy);
            };
        case LINE_TYPES.CURVE_FULL:
            return () => 1;
    }
}

/**
 * This method returns the path definition for a given link base on the line type
 * and the link source and target.
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d|d attribute mdn}
 * @param {Object} link - the link to build the path definition
 * @param {Object} link.source - link source
 * @param {Object} link.target - link target
 * @param {string} type - the link line type
 * @returns {string} the path definition for the requested link
 * @memberof Link/helper
 */
function buildLinkPathDefinition({ source = {}, target = {} }, type = LINE_TYPES.STRAIGHT) {
    const { x: sx, y: sy } = source;
    const { x: tx, y: ty } = target;
    const radius = getRadiusStrategy(type)(sx, sy, tx, ty);

    return `M${sx},${sy}A${radius},${radius} 0 0,1 ${tx},${ty}`;
}

export { buildLinkPathDefinition };
