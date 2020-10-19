"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true,
});
exports["default"] = void 0;

var _d3Shape = require("d3-shape");

var _node = _interopRequireDefault(require("./node.const"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * @module Node/helper
 * @description
 * Some methods that help no the process of rendering a node.
 */

/**
 * Converts a string that specifies a symbol into a concrete instance
 * of d3 symbol.<br/>
 * {@link https://github.com/d3/d3-shape/blob/master/README.md#symbol}
 * @param  {string} typeName - the string that specifies the symbol type (should be one of {@link #node-symbol-type|node.symbolType}).
 * @returns {Object} concrete instance of d3 symbol (defaults to circle).
 * @memberof Node/helper
 */
function _convertTypeToD3Symbol(typeName) {
    switch (typeName) {
        case _node["default"].SYMBOLS.CIRCLE:
            return _d3Shape.symbolCircle;

        case _node["default"].SYMBOLS.CROSS:
            return _d3Shape.symbolCross;

        case _node["default"].SYMBOLS.DIAMOND:
            return _d3Shape.symbolDiamond;

        case _node["default"].SYMBOLS.SQUARE:
            return _d3Shape.symbolSquare;

        case _node["default"].SYMBOLS.STAR:
            return _d3Shape.symbolStar;

        case _node["default"].SYMBOLS.TRIANGLE:
            return _d3Shape.symbolTriangle;

        case _node["default"].SYMBOLS.WYE:
            return _d3Shape.symbolWye;

        default:
            return _d3Shape.symbolCircle;
    }
}
/**
 * Build a d3 svg symbol based on passed symbol and symbol type.
 * @param  {number} [size=80] - the size of the symbol.
 * @param  {string} [symbolTypeDesc='circle'] - the string containing the type of symbol that we want to build
 * (should be one of {@link #node-symbol-type|node.symbolType}).
 * @returns {Object} concrete instance of d3 symbol.
 * @memberof Node/helper
 */

function buildSvgSymbol() {
    var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _node["default"].DEFAULT_NODE_SIZE;
    var symbolTypeDesc =
        arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _node["default"].SYMBOLS.CIRCLE;
    return (0, _d3Shape.symbol)()
        .size(function() {
            return size;
        })
        .type(function() {
            return _convertTypeToD3Symbol(symbolTypeDesc);
        })();
}
/**
 * return dx, dy, and potentially alignmentBaseline and textAnchor props to put label in correct position relative to node
 * @param {number | undefined} dx - default computed offset of label to the right of the node
 * @param {'left' | 'right' | 'top' | 'bottom' | 'center' | undefined} labelPosition - user specified position of label relative to node
 * @returns {{dx: string, dy: string} | {dx: string, dy: string, textAnchor: string, dominantBaseline: string}}
 * props to put text svg for label in correct spot. default case returns just dx and dy, without textAnchor and dominantBaseline
 * @memberof Node/helper
 */

function getLabelPlacementProps(dx, labelPosition) {
    switch (labelPosition) {
        case "right":
            return {
                dx: dx ? "".concat(dx) : _node["default"].NODE_LABEL_DX,
                dy: "0",
                dominantBaseline: "middle",
                textAnchor: "start",
            };

        case "left":
            return {
                dx: dx ? "".concat(-dx) : "-".concat(_node["default"].NODE_LABEL_DX),
                dy: "0",
                dominantBaseline: "middle",
                textAnchor: "end",
            };

        case "top":
            return {
                dx: "0",
                dy: dx ? "".concat(-dx) : "-".concat(_node["default"].NODE_LABEL_DX),
                dominantBaseline: "baseline",
                textAnchor: "middle",
            };

        case "bottom":
            return {
                dx: "0",
                dy: dx ? "".concat(dx) : _node["default"].NODE_LABEL_DX,
                dominantBaseline: "hanging",
                textAnchor: "middle",
            };

        case "center":
            return {
                dx: "0",
                dy: "0",
                dominantBaseline: "middle",
                textAnchor: "middle",
            };

        default:
            return {
                dx: dx ? "".concat(dx) : _node["default"].NODE_LABEL_DX,
                dy: _node["default"].NODE_LABEL_DY,
            };
    }
}

var _default = {
    buildSvgSymbol: buildSvgSymbol,
    getLabelPlacementProps: getLabelPlacementProps,
};
exports["default"] = _default;
