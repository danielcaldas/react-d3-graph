/**
 * @module Link/helper
 * @description
 * A set of helper methods to manipulate/create links.
 */
import { LINE_TYPES, LINE_POS_OFFSET } from "./link.const";

/**
 * Computes radius value for a straight line.
 * @returns {number} radius for straight line.
 * @memberof Link/helper
 */
function straightLineRadius() {
    return 0;
}

/**
 * Computes radius for a smooth curve effect.
 * @param {number} x1 - x value for point 1
 * @param {number} y1 - y value for point 1
 * @param {number} x2 - y value for point 2
 * @param {number} y2 - y value for point 2
 * @returns{number} value of radius.
 * @memberof Link/helper
 */
function smoothCurveRadius(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;

    return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Computes radius value for a full curve (semi circumference).
 * @returns {number} radius for full curve.
 * @memberof Link/helper
 */
function fullCurveRadius() {
    return 1;
}

const RADIUS_STRATEGIES = {
    [LINE_TYPES.STRAIGHT]: straightLineRadius,
    [LINE_TYPES.CURVE_SMOOTH]: smoothCurveRadius,
    [LINE_TYPES.CURVE_FULL]: fullCurveRadius,
};

/**
 * Get a strategy to compute line radius.<br/>
 * *CURVE_SMOOTH* type inspired by {@link http://bl.ocks.org/mbostock/1153292|mbostock - Mobile Patent Suits}.
 * @param {string} [type=LINE_TYPES.STRAIGHT] type of curve to get radius strategy from.
 * @returns {Function} a function that calculates a radius
 * to match curve type expectation. Fallback is the straight line.
 * @memberof Link/helper
 */
function getRadiusStrategy(type) {
    return RADIUS_STRATEGIES[type] || RADIUS_STRATEGIES[LINE_TYPES.STRAIGHT];
}

/**
 * Returns the angle between the line defined by the given points and the X axis.
 * @param {number} x1 X-coordinate of the first point.
 * @param {number} y1 Y-coordinate of the first point.
 * @param {number} x2 X-coordinate of the second point.
 * @param {number} y2 Y-coordinate of the second point.
 * @returns {number} Angle between the two points and the X axis..
 */
function angleBetweenPoints(x1, y1, x2, y2) {
    if (x1 === x2) {
        if (y1 > y2) {
            return -Math.PI / 2;
        }
        return Math.PI / 2;
    }
    return Math.atan2(y2 - y1, x2 - x1);
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
    const { x: _sx, y: _sy } = source;
    const { x: _tx, y: _ty } = target;
    // Shift the line along its normal to prevent collision
    const offsetX = LINE_POS_OFFSET * Math.sin(angleBetweenPoints(_sx, _sy, _tx, _ty));
    const offsetY = LINE_POS_OFFSET * -Math.cos(angleBetweenPoints(_sx, _sy, _tx, _ty));
    const sx = _sx + offsetX;
    const sy = _sy + offsetY;
    const tx = _tx + offsetX;
    const ty = _ty + offsetY;
    const validType = LINE_TYPES[type] || LINE_TYPES.STRAIGHT;
    const radius = getRadiusStrategy(validType)(sx, sy, tx, ty);

    const midX = (tx - sx) * 0.9 + sx;
    const midY = (ty - sy) * 0.9 + sy;

    return `M${sx},${sy}L${midX},${midY}A${radius},${radius} 0 0,1 ${tx},${ty}`;
}

export { buildLinkPathDefinition };
