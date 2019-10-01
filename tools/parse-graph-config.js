const data = require("./graph.config.jsdoc");
const TOOLTIPS_MAX_WIDTH = 400;

if (!data || !data.length || !data[0].params) {
    throw new Error("Invalid JSON provided from jsdoc parser");
}

/**
 * Parses a param and extracts its info in a useful structure.
 * @param {Object} param param JSON from jsdoc.
 * An example of a param:
 * {
 *     "type": {
 *         "names": [
 *             "string",
 *             "function"
 *         ]
 *     },
 *     "optional": true,
 *     "defaultvalue": false,
 *     "description": "this is the (...)",
 *     "name": "node.labelProperty"
 * }
 * @returns {Object} the para formatted
 * information mapped by the param name.
 */
function getParamInfo(param) {
    const { type, optional, defaultvalue, description: rawDescription, name } = param;
    const types = type && type.names && type.names;
    const ftype = types && types.length ? types.join("|") : "*";

    // make images smaller so that they fit in the tooltip
    const description = rawDescription
        .replace(/width="(\d+)"/gi, "width='400'")
        .replace(/height="(\d+)"/gi, "height='200'");

    // TODO: extract text only info from the description field, it may contain
    // md or html
    return {
        [name]: `\
            <h4>${name}</h4>\
            <b>type</b>: ${ftype} | <b>default value</b>: ${defaultvalue} | <b>optional</b>: ${optional}\
            <h5>Description</h5>\
            <div style="max-width: ${TOOLTIPS_MAX_WIDTH}px;">${description}</div>\
        `,
    };
}

const graphConfigElms = data[0].params.map(getParamInfo).reduce((acc, o) => ({ ...o, ...acc }), {});

// writes to STDOUT, system call is responsible to write to file
console.log(`export const tooltips = ${JSON.stringify(graphConfigElms, null, 4)};`);
