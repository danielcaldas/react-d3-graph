const data = require("./graph.config.jsdoc");

if (!data || !data.length || !data[0].params) {
    throw new Error("Invalid JSON provided from jsdoc parser");
}

/**
 * Parses a param and extracts its info
 * in a useful structure.
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
    const { type, optional, defaultvalue, description, name } = param;
    const types = type && type.names && type.names;
    const ftype = types && types.length ? types.join("|") : "*";

    // TODO: extract text only info from the description field, it may contain
    // md or html
    return {
        [name]: `type: ${ftype} | default value: ${defaultvalue} | optional: ${optional}\\n${description}`,
    };
}

const graphConfigElms = data[0].params.map(getParamInfo).reduce((acc, o) => ({ ...o, ...acc }), {});

console.log(JSON.stringify(graphConfigElms, null, 2));
