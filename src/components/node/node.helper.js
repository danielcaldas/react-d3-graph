/**
 * @module Node/helper
 * @description
 * Some methods that help no the process of rendering a node.
 */
import {
  symbolCircle as d3SymbolCircle,
  symbolCross as d3SymbolCross,
  symbolDiamond as d3SymbolDiamond,
  symbolSquare as d3SymbolSquare,
  symbolStar as d3SymbolStar,
  symbolTriangle as d3SymbolTriangle,
  symbolWye as d3SymbolWye,
  symbol as d3Symbol,
} from "d3-shape";

import CONST from "./node.const";

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
    case CONST.SYMBOLS.CIRCLE:
      return d3SymbolCircle;
    case CONST.SYMBOLS.CROSS:
      return d3SymbolCross;
    case CONST.SYMBOLS.DIAMOND:
      return d3SymbolDiamond;
    case CONST.SYMBOLS.SQUARE:
      return d3SymbolSquare;
    case CONST.SYMBOLS.STAR:
      return d3SymbolStar;
    case CONST.SYMBOLS.TRIANGLE:
      return d3SymbolTriangle;
    case CONST.SYMBOLS.WYE:
      return d3SymbolWye;
    default:
      return d3SymbolCircle;
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
function buildSvgSymbol(size = CONST.DEFAULT_NODE_SIZE, symbolTypeDesc = CONST.SYMBOLS.CIRCLE) {
  return d3Symbol()
    .size(() => size)
    .type(() => _convertTypeToD3Symbol(symbolTypeDesc))();
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
        dx: dx ? `${dx}` : CONST.NODE_LABEL_DX,
        dy: "0",
        dominantBaseline: "middle",
        textAnchor: "start",
      };
    case "left":
      return {
        dx: dx ? `${-dx}` : `-${CONST.NODE_LABEL_DX}`,
        dy: "0",
        dominantBaseline: "middle",
        textAnchor: "end",
      };
    case "top":
      return {
        dx: "0",
        dy: dx ? `${-dx}` : `-${CONST.NODE_LABEL_DX}`,
        dominantBaseline: "baseline",
        textAnchor: "middle",
      };
    case "bottom":
      return {
        dx: "0",
        dy: dx ? `${dx}` : CONST.NODE_LABEL_DX,
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
        dx: dx ? `${dx}` : CONST.NODE_LABEL_DX,
        dy: CONST.NODE_LABEL_DY,
      };
  }
}

export default {
  buildSvgSymbol,
  getLabelPlacementProps,
};
