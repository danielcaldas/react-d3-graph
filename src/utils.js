// This variable assures that recursive methods such as merge and isEqual do not fall on
// circular JSON structure evaluation.
const MAX_DEPTH = 5;

/**
 * Checks whether a certain object property is from object type and is a non empty object.
 * @param  {Object} o - the object.
 * @param  {number|string} k - the object property.
 * @return {boolean} returns true if o[k] is an non empty object.
 */
function _isPropertyNestedObject(o, k) {
    return o.hasOwnProperty(k) && typeof o[k] === 'object' && o[k] !== null && !isObjectEmpty(o[k]);
}

/**
 * Generic deep comparison between javascript simple or complex objects.
 * @param  {Object} o1 - one of the objects to be compared.
 * @param  {Object} o2 - second object to compare with first.
 * @param  {number} [_depth=0] - this parameter serves only for internal usage.
 * @return {boolean} returns true if o1 and o2 have exactly the same content, or are exactly the same object (reference).
 */
function isEqual(o1, o2, _depth=0) {
    let diffs = [];

    if (_depth === 0 && o1 === o2) {
        return true;
    }

    if (isObjectEmpty(o1) && !isObjectEmpty(o2) || !isObjectEmpty(o1) && isObjectEmpty(o2)) {
        return false;
    }

    for (let k of Object.keys(o1)) {
        const nestedO = _isPropertyNestedObject(o1, k) && _isPropertyNestedObject(o2, k);

        if (nestedO && _depth < MAX_DEPTH) {
            diffs.push(isEqual(o1[k], o2[k], _depth + 1));
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

/**
 * Checks whether or not a certain object is empty.
 * NOTE: If the passed parameter is not an object the method return false.
 * @param  {Object}  o - object whom emptiness we want to check.
 * @return {boolean} true if the given object is n ft and object and is empty.
 */
function isObjectEmpty(o) {
    return !!o && typeof o === 'object' && !Object.keys(o).length;
}

/**
 * This function merges two objects o1 and o2, where o2 properties override existent o1 properties, and
 * if o2 doesn't posses some o1 property the function will fallback to the o1 property.
 * @param  {Object} o1 - object.
 * @param  {Object} o2 - object that will override o1 properties.
 * @param  {int} depth - the depth at which we are merging the object.
 * @return {Object} object that is the result of merging o1 and o2, being o2 properties priority overriding
 * existent o1 properties.
 */
function merge(o1={}, o2={}, _depth=0) {
    let o = {};

    for (let k of Object.keys(o1)) {
        const nestedO = o2[k] && typeof o2[k] === 'object' && typeof o1[k] === 'object' && _depth < MAX_DEPTH;

        o[k] = nestedO ? merge(o1[k], o2[k], _depth + 1) : o2.hasOwnProperty(k) ? o2[k] : o1[k];
    }

    return o;
}

/**
 * Helper function for customized error logging.
 * @param  {string} component - the name of the component where the error is to be thrown.
 * @param  {string} msg - the message contain a more detailed explanation about the error.
 * @return {Error} the thrown error.
 */
function throwErr(component, msg) {
    const error = `react-d3-graph :: ${component} :: ${msg}`;

    throw Error(error);
}

export default {
    isEqual,
    isObjectEmpty,
    merge,
    throwErr
};
