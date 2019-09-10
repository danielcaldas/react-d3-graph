/**
 * @module Marker/helper
 * @description
 * Offers a series of methods to compute proper markers within a given context.
 */
import { MARKERS, SIZES, HIGHLIGHTED } from "./marker.const";

/**
 * This function is a key template builder to access MARKERS structure.
 * @param {string} size - string that indicates size of marker.
 * @param {string} highlighted - string that indicates highlight state of marker.
 * @returns {string} the key of the marker.
 * @memberof Marker/helper
 */
function _markerKeyBuilder(size, highlighted) {
    return `MARKER_${size}${highlighted}`;
}

/**
 * This functions returns the proper marker size given the inputs that describe the scenario
 * where the marker is to be applied.
 * @param {number} transform - the delta zoom value to calculate resize transformations.
 * @param {number} mMax - a derived value from the max zoom config.
 * @param {number} lMax - a derived value from the min zoom config.
 * @returns {string} the size.
 * @memberof Marker/helper
 */
function _getMarkerSize(transform, mMax, lMax) {
    if (transform < mMax) {
        return SIZES.S;
    } else if (transform >= mMax && transform < lMax) {
        return SIZES.M;
    } else {
        return SIZES.L;
    }
}

/**
 * This function holds logic to retrieve the appropriate marker id that reflects the input
 * parameters, markers can vary with highlight and transform value.
 * @param {boolean} highlight - tells us whether or not some element (link or node) is highlighted.
 * @param {number} transform - the delta zoom value to calculate resize transformations.
 * @param {Object} config - the graph config object.
 * @returns {string} the id of the result marker.
 * @memberof Marker/helper
 */
function _computeMarkerId(highlight, transform, { maxZoom }) {
    const mMax = maxZoom / 4;
    const lMax = maxZoom / 2;
    const size = _getMarkerSize(transform, mMax, lMax);
    const highlighted = highlight ? HIGHLIGHTED : "";
    const markerKey = _markerKeyBuilder(size, highlighted);

    return MARKERS[markerKey];
}

/**
 * This function memoize results for _computeMarkerId
 * since many of the times user will be playing around with the same zoom
 * factor, we can take advantage of this and cache the results for a
 * given combination of highlight state, zoom transform value and maxZoom config.
 * @returns{Function} memoize wrapper to the _computeMarkerId operation.
 * @memberof Marker/helper
 */
function _memoizedComputeMarkerId() {
    let cache = {};

    return (highlight, transform, { maxZoom }) => {
        const cacheKey = `${highlight};${transform};${maxZoom}`;

        if (cache[cacheKey]) {
            return cache[cacheKey];
        }

        const markerId = _computeMarkerId(highlight, transform, { maxZoom });

        cache[cacheKey] = markerId;

        return markerId;
    };
}

/**
 * Memoized reference for _memoizedComputeMarkerId exposed
 * as getter for sake of readability.
 * Gets proper marker id given the highlight state and the zoom
 * transform.
 * @param {boolean} highlight - tells us whether or not some element (link or node) is highlighted.
 * @param {number} transform - the delta zoom value to calculate resize transformations.
 * @param {Object} config - the graph config object.
 * @param {Object} config.maxZoom - max zoom that can be performed against the graph.
 * @memberof Marker/helper
 */
const getMarkerId = _memoizedComputeMarkerId();

export { getMarkerId };
