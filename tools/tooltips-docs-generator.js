const data = require("./graph-config-jsdoc");
const TOOLTIPS_MAX_WIDTH = 400;
const LIVE_DOCS_LINK = "https://danielcaldas.github.io/react-d3-graph/docs/index.html";

if (!data || !data.length || !data[0].params) {
    throw new Error("Invalid JSON provided from jsdoc parser");
}

/**
 * Transforms a string into kebab case.
 * @param {string} s string to transform to kebab case.
 * @returns {string} new string which results on converting input string to kebab case.
 */
function strToKebabCase(s) {
    const _s = s.replace(".", "-"); // drop all the '.' dots

    return _s
        .replace(/([a-z])([A-Z])/g, "$1-$2")
        .replace(/\s+/g, "-")
        .toLowerCase();
}

/**
 * Generates anchor link based on the property name.
 * @param {string} name the name of the property to generate the anchor link for.
 * @returns {string} the anchor link, that points directly to the property `name` in the
 * official documentation website.
 */
function generatePropertyAnchorLink(name) {
    const suffix = strToKebabCase(name);

    return `${LIVE_DOCS_LINK}#${suffix}`;
}

/**
 * Generates anchor link based on the property name.
 * @param {string} name the name of the property to generate the anchor link for.
 * @returns {string} the footer for the given property.
 */
function generateCommonFooter(name) {
    const href = generatePropertyAnchorLink(name);

    return `\
        <small>\
            for more details check the <a target="_blank" href="${href}">official documentation</a>\
        </small>\
    `;
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
    const { type, optional, defaultvalue, description: rawDescription, name } = param;
    const types = type && type.names && type.names;
    const ftype = types && types.length ? types.join("|") : "*";

    // make images smaller so that they fit in the tooltip
    const description = rawDescription
        .replace(/width="(\d+)"/gi, "width='400'")
        .replace(/height="(\d+)"/gi, "height='200'")
        .replace("🔗", ""); // drop docs anchor links

    return {
        [name]: `\
            <h4>${name}</h4>\
            <b>type</b>: ${ftype} | <b>default value</b>: ${defaultvalue} | <b>optional</b>: ${optional}\
            <h5>Description</h5>\
            <div style="max-width: ${TOOLTIPS_MAX_WIDTH}px;">${description}</div>\
            ${generateCommonFooter(name)}\
        `,
    };
}

/**
 * Removes JavaScript markdown blocks from the input text.
 * @param {string} s the code block from where we want
 * to remove the code block marks.
 * @returns {string} final text without javascript code blocks.
 */
function stripJsMdBlocks(s) {
    return s.replace(/```javascript(.*)```/gi, "");
}

const graphConfigElms = data[0].params.map(getParamInfo).reduce((acc, o) => ({ ...o, ...acc }), {});
const output = `\
/*eslint-disable*/\n\
export const tooltips = ${JSON.stringify(graphConfigElms, null, 2)};\
`;

console.log(stripJsMdBlocks(output));
