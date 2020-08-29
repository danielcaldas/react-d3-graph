/**
 * @module Link/helper
 * @description
 * A set of helper methods to manipulate/create links.
 */
import { LINE_TYPES } from "./link.const";

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
 * @param {number} delta - additional factor to tweak curvature.
 * @returns{number} value of radius.
 * @memberof Link/helper
 */
function smoothCurveRadius(x1, y1, x2, y2, delta = 1) {
    const dx = (x2 - x1) * delta;
    const dy = (y2 - y1) * delta;

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

const cacheLinksCount = new Map();
const cacheIdCount = new Map();
const _key = (s, t) => `${s}:${t}`;
const addLink = (s, t, id) => {
    if (!s || !t || !id) {
        return;
    }
    const k = _key(s, t);
    let c = 0;
    if (cacheLinksCount.has(k)) {
        const s = cacheLinksCount.get(k);
        s.add(id);
        c = s.size;
        cacheLinksCount.set(k, s);
    } else {
        const s = new Set();
        s.add(id);
        c = s.size;
        cacheLinksCount.set(k, s);
    }
    if (!cacheIdCount.has(id)) {
        cacheIdCount.set(id, c);
    }
};
const getCount = id => (id ? cacheIdCount.get(id) : undefined);

/**
 * This method returns the path definition for a given link base on the line type
 * and the link source and target.
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d|d attribute mdn}
 * @param {Object} link - the link to build the path definition
 * @param {string} link.id - optional id that client might set for a link
 * @param {Object} link.source - link source
 * @param {Object} link.target - link target
 * @param {string} type - the link line type
 * @returns {string} the path definition for the requested link
 * @memberof Link/helper
 */
function buildLinkPathDefinition({ id, source, target }, type = LINE_TYPES.STRAIGHT) {
    addLink(source.source, target.target, id);

    const { x: sx, y: sy } = source;
    const { x: tx, y: ty } = target;
    const validType = LINE_TYPES[type] || LINE_TYPES.STRAIGHT;
    let computeRadius = getRadiusStrategy(validType);
    const redundantCount = getCount(id);

    if (id && redundantCount > 1) {
        // for further redundant links we automatically compute the
        // curvature radius with the CURVE_SMOOTH function
        computeRadius = getRadiusStrategy(LINE_TYPES.CURVE_SMOOTH);
    }

    let radius = computeRadius(sx, sy, tx, ty, redundantCount);

    return `M${sx},${sy}A${radius},${radius} 0 0,1 ${tx},${ty}`;
}

export { buildLinkPathDefinition };
