/**
 * @module Node/helper
 * @description
 * Some methods that help no the process of rendering a node.
 */
import {
    symbolCircle,
    symbolCross,
    symbolDiamond,
    symbolSquare,
    symbolStar,
    symbolTriangle,
    symbolWye,
    symbol
} from 'd3-shape';

import CONST from './const';

/**
 * Converts a string that specifies a symbol into a concrete instance
 * of d3 symbol.<br/>
 * {@link https://github.com/d3/d3-shape/blob/master/README.md#symbol}
 * @param  {string} typeName - the string that specifies the symbol type (should be one of {@link #node-symbol-type|node.symbolType}).
 * @return {Object} concrete instance of d3 symbol (defaults to circle).
 * @memberof Node/helper
 */
function _convertTypeToD3Symbol(typeName) {
    switch (typeName) {
        case CONST.SYMBOLS.CIRCLE:
            return symbolCircle;
        case CONST.SYMBOLS.CROSS:
            return symbolCross;
        case CONST.SYMBOLS.DIAMOND:
            return symbolDiamond;
        case CONST.SYMBOLS.SQUARE:
            return symbolSquare;
        case CONST.SYMBOLS.STAR:
            return symbolStar;
        case CONST.SYMBOLS.TRIANGLE:
            return symbolTriangle;
        case CONST.SYMBOLS.WYE:
            return symbolWye;
        default:
            return symbolCircle;
    }
}

/**
 * Build a d3 svg symbol based on passed symbol and symbol type.
 * @param  {number} [size=80] - the size of the symbol.
 * @param  {string} [symbolTypeDesc='circle'] - the string containing the type of symbol that we want to build
 * (should be one of {@link #node-symbol-type|node.symbolType}).
 * @return {Object} concrete instance of d3 symbol.
 * @memberof Node/helper
 */
function buildSvgSymbol(size=80, symbolTypeDesc=CONST.SYMBOLS.CIRCLE) {
    return symbol()
            .size(() => size)
            .type(() => _convertTypeToD3Symbol(symbolTypeDesc))(); // @todo: Strange behavior Symbol ret function
}

export default {
    buildSvgSymbol
};
