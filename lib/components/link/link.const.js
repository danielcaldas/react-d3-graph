"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true,
});
exports.LINE_TYPES = void 0;

/**
 * @module Link/const
 * @description
 * A set of constants that facilitate readability regarding links.
 */

/**
 * @typedef {Object} LINE_TYPES
 * @property {string} STRAIGHT - a straight line.
 * @property {string} CURVE_SMOOTH - a slight curve between two nodes
 * @property {string} CURVE_FULL - a semicircumference trajectory unites source and target nodes.
 * @memberof Link/const
 */
var LINE_TYPES = {
    STRAIGHT: "STRAIGHT",
    CURVE_SMOOTH: "CURVE_SMOOTH",
    CURVE_FULL: "CURVE_FULL",
};
exports.LINE_TYPES = LINE_TYPES;
