import * as d3 from 'd3';

import CONST from './const';

/**
 * Converts a string that specifies a symbol into a concrete instance
 * of d3 symbol.
 * {@link https://github.com/d3/d3-shape/blob/master/README.md#symbol}
 * @param  {string} typeName - the string that specifies the symbol type.
 * @return {Object} concrete instance of d3 symbol.
 */
function _convertTypeToD3Symbol(typeName) {
    switch (typeName) {
        case CONST.SYMBOLS.CIRCLE:
            return d3.symbolCircle;
        case CONST.SYMBOLS.CROSS:
            return d3.symbolCross;
        case CONST.SYMBOLS.DIAMOND:
            return d3.symbolDiamond;
        case CONST.SYMBOLS.SQUARE:
            return d3.symbolSquare;
        case CONST.SYMBOLS.STAR:
            return d3.symbolStar;
        case CONST.SYMBOLS.TRIANGLE:
            return d3.symbolTriangle;
        case CONST.SYMBOLS.WYE:
            return d3.symbolWye;
    }
}

function buildSvgSymbol(size=80, symbolTypeDesc=CONST.SYMBOLS.CIRCLE) {
    return d3.symbol()
            .size((_) => size)
            .type((_) => _convertTypeToD3Symbol(symbolTypeDesc))(); // @TODO: Strange behavior d3.Symbol ret function
}

export default {
    buildSvgSymbol
};
