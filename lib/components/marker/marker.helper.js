"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true,
});
exports.getMarkerSize = getMarkerSize;
exports.getMarkerId = void 0;

var _marker = require("./marker.const");

var _graph = _interopRequireDefault(require("../graph/graph.const"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * @module Marker/helper
 * @description
 * Offers a series of methods to compute proper markers within a given context.
 */

/**
 * This function is a key template builder to access MARKERS structure.
 * @param {string} size - string that indicates size of marker.
 * @param {string} highlighted - string that indicates highlight state of marker.
 * @returns {string} the key of the marker.
 * @memberof Marker/helper
 */
function _markerKeyBuilder(size, highlighted) {
    return "MARKER_".concat(size).concat(highlighted);
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
        return _marker.SIZES.S;
    } else if (transform >= mMax && transform < lMax) {
        return _marker.SIZES.M;
    } else {
        return _marker.SIZES.L;
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

function _computeMarkerId(highlight, transform, _ref) {
    var maxZoom = _ref.maxZoom;
    var mMax = maxZoom / 4;
    var lMax = maxZoom / 2;

    var size = _getMarkerSize(transform, mMax, lMax);

    var highlighted = highlight ? _marker.HIGHLIGHTED : "";

    var markerKey = _markerKeyBuilder(size, highlighted);

    return _marker.MARKERS[markerKey];
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
    var cache = {};
    return function(highlight, transform, _ref2) {
        var maxZoom = _ref2.maxZoom;
        var cacheKey = ""
            .concat(highlight, ";")
            .concat(transform, ";")
            .concat(maxZoom);

        if (cache[cacheKey]) {
            return cache[cacheKey];
        }

        var markerId = _computeMarkerId(highlight, transform, {
            maxZoom: maxZoom,
        });

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

var getMarkerId = _memoizedComputeMarkerId();
/**
 * Computes the three marker sizes
 * For supported shapes in {@link Graph/helper/getNormalizedNodeCoordinates}, the function should return 0,
 * to be able to control more accurately nodes and arrows sizes and positions in directional graphs.
 * @param {Object} config - the graph config object.
 * @returns {Object} size of markers
 * @memberof Marker/helper
 */

exports.getMarkerId = getMarkerId;

function getMarkerSize(config) {
    var small = _marker.MARKER_SMALL_SIZE;
    var medium = small + (_marker.MARKER_MEDIUM_OFFSET * config.maxZoom) / 3;
    var large = small + (_marker.MARKER_LARGE_OFFSET * config.maxZoom) / 3;

    if (config.node && !config.node.viewGenerator) {
        switch (config.node.symbolType) {
            case _graph["default"].SYMBOLS.CIRCLE:
                small = 0;
                medium = 0;
                large = 0;
                break;
        }
    }

    return {
        small: small,
        medium: medium,
        large: large,
    };
}
