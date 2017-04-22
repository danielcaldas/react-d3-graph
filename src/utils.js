const MAX_DEPTH = 5;

/**
 * This function merges two objects o1 and o2, where o2 properties override existent o1 properties, and
 * if o2 doesn't posses some o1 property the function will fallback to the o1 property.
 * @param {Object} o1 - object.
 * @param {Object} o2 - object that will override o1 properties.
 * @param {int} deepth - the deepth at which we are merging the object.
 * @return {Object} Object that is the result of merging o1 and o2, being o2 properties prioritray overriding
 * existent o1 properties.
 */
function merge(o1, o2, _deepth=0) {
    let o = {};

    for (let k of Object.keys(o1)) {
        const nestedO = o2[k] && typeof o2[k] === 'object' && typeof o1[k] === 'object' && _deepth < MAX_DEPTH;

        o[k] = nestedO ? merge(o1[k], o2[k], _deepth + 1) : o2.hasOwnProperty(k) ? o2[k] : o1[k];
    }

    return o;
}

/**
 * Checks whether or not a certain object is empty.
 * NOTE: If the passed parameter is not an object the method return false.
 * @param  {object}  o - object whom emptininess we want to check.
 * @return {boolean} true if the given object is in fact and object and is empty.
 */
function isObjectEmpty(o) {
    return !!o && typeof o === 'object' && !Object.keys(o).length;
}

function compareObjects(o1, o2, _deepth=0) {

    let diffs = [];

    for (let k of Object.keys(o1)) {
        const nestedO = _isPropertyNestedObject(o1, k) && _isPropertyNestedObject(o2, k);

        if (nestedO) {
            diffs.push(compareObjects(o1[k], o2[k], _deepth + 1));
        } else {
            const r = isObjectEmpty(o1[k]) && isObjectEmpty(o2[k]) || o2.hasOwnProperty(k) && o2[k] === o1[k];

            diffs.push(r);

            if (!r) {
                break;
            }
        }
    }

    return diffs.indexOf(false) === -1;
}

function _isPropertyNestedObject(o, k) {
    return o.hasOwnProperty(k) && typeof o[k] === 'object'
                                        && o[k] !== null
                                        && !isObjectEmpty(o[k]);
}

function throwErr(component, msg) {
    const error = `react-d3-graph :: ${component} :: ${msg}`;

    throw Error(error);
}

export default {
    compareObjects,
    isObjectEmpty,
    merge,
    throwErr
};
