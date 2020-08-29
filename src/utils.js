/**
 * @module utils
 * @description
 * Offers a series of generic methods for object manipulation, and other operations
 * that are common across rd3g such as error logging.
 */

// This variable assures that recursive methods such as merge and isDeepEqual do not fall on
// circular JSON structure evaluation.
const MAX_DEPTH = 20;

/**
 * Checks whether a certain object property is from object type and is a non empty object.
 * @param  {Object} o - the object.
 * @param  {string} k - the object property.
 * @returns {boolean} returns true if o[k] is an non empty object.
 * @memberof utils
 */
function _isPropertyNestedObject(o, k) {
  return (
    !!o &&
    Object.prototype.hasOwnProperty.call(o, k) &&
    typeof o[k] === "object" &&
    o[k] !== null &&
    !isEmptyObject(o[k])
  );
}

/**
 * Generic deep comparison between javascript simple or complex objects.
 * @param  {Object} o1 - one of the objects to be compared.
 * @param  {Object} o2 - second object to compare with first.
 * @param  {number} [_depth=0] - this parameter serves only for internal usage.
 * @returns {boolean} returns true if o1 and o2 have exactly the same content, or are exactly the same object reference.
 * @memberof utils
 */
function isDeepEqual(o1, o2, _depth = 0) {
  let diffs = [];

  if (_depth === 0 && o1 === o2) {
    return true;
  }

  if ((isEmptyObject(o1) && !isEmptyObject(o2)) || (!isEmptyObject(o1) && isEmptyObject(o2))) {
    return false;
  }

  const o1Keys = Object.keys(o1);
  const o2Keys = Object.keys(o2);

  if (o1Keys.length !== o2Keys.length) {
    return false;
  }

  for (let k of o1Keys) {
    const nestedO = _isPropertyNestedObject(o1, k) && _isPropertyNestedObject(o2, k);

    if (nestedO && _depth < MAX_DEPTH) {
      diffs.push(isDeepEqual(o1[k], o2[k], _depth + 1));
    } else {
      const r =
        (isEmptyObject(o1[k]) && isEmptyObject(o2[k])) ||
        (Object.prototype.hasOwnProperty.call(o2, k) && o2[k] === o1[k]);

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
 * @returns {boolean} true if the given object is n ft and object and is empty.
 * @memberof utils
 */
function isEmptyObject(o) {
  return !!o && typeof o === "object" && !Object.keys(o).length;
}

/**
 * Function to deep clone plain javascript objects.
 * @param {Object} o - the object to clone.
 * @param {Object} _clone - carries the cloned output throughout the
 * recursive calls. Parameter serves only for internal usage.
 * @param {number} _depth - this parameter serves only for internal usage.
 * @returns {Object} - the cloned object.
 * @memberof utils
 */
function deepClone(o, _clone = {}, _depth = 0) {
  const oKeys = Object.keys(o);

  for (let k of oKeys) {
    const nested = _isPropertyNestedObject(o, k);

    _clone[k] = nested && _depth < MAX_DEPTH ? deepClone(o[k], {}, _depth + 1) : o[k];
  }

  return _clone;
}

/**
 * This function merges two objects o1 and o2, where o2 properties override existent o1 properties, and
 * if o2 doesn't posses some o1 property the fallback will be the o1 property.
 * @param  {Object} o1 - object.
 * @param  {Object} o2 - object that will override o1 properties.
 * @param  {int} [_depth=0] - the depth at which we are merging the object.
 * @returns {Object} object that is the result of merging o1 and o2, being o2 properties priority overriding
 * existent o1 properties.
 * @memberof utils
 */
function merge(o1 = {}, o2 = {}, _depth = 0) {
  let o = {};

  if (Object.keys(o1 || {}).length === 0) {
    return o2 && !isEmptyObject(o2) ? o2 : {};
  }

  for (let k of Object.keys(o1)) {
    const nestedO = !!(o2[k] && typeof o2[k] === "object" && typeof o1[k] === "object" && _depth < MAX_DEPTH);

    if (nestedO) {
      const r = merge(o1[k], o2[k], _depth + 1);

      o[k] =
        Object.prototype.hasOwnProperty.call(o1[k], "length") && Object.prototype.hasOwnProperty.call(o2[k], "length")
          ? Object.keys(r).map(rk => r[rk])
          : r;
    } else {
      o[k] = Object.prototype.hasOwnProperty.call(o2, k) ? o2[k] : o1[k];
    }
  }

  return o;
}

/**
 * Create new object from the inputted one only with the props passed
 * in the props list.
 * @param {Object} o - the object to pick props from.
 * @param {Array.<string>} props - list of props that we want to pick from o.
 * @returns {Object} the object resultant from the picking operation.
 * @memberof utils
 */
function pick(o, props = []) {
  return props.reduce((acc, k) => {
    if (Object.prototype.hasOwnProperty.call(o, k)) {
      acc[k] = o[k];
    }

    return acc;
  }, {});
}

/**
 * Picks all props except the ones passed in the props array.
 * @param {Object} o - the object to pick props from.
 * @param {Array.<string>} props - list of props that we DON'T want to pick from o.
 * @returns {Object} the object resultant from the anti picking operation.
 * @memberof utils
 */
function antiPick(o, props = []) {
  const wanted = Object.keys(o).filter(k => !props.includes(k));

  return pick(o, wanted);
}

/**
 * Given a function, returns a function that will only be called after it stops
 * being called for `time` seconds.
 * @param {function} fn Function to debounce
 * @param {number} time Milliseconds to wait before invoking the function if it is called repeatedly
 * @returns {function} Version of function that will only be called every `time` milliseconds
 */
function debounce(fn, time) {
  let timer;

  return function exec(...args) {
    const later = () => {
      clearTimeout(timer);
      fn(...args);
    };
    timer && clearTimeout(timer);
    timer = setTimeout(later, time);
  };
}

/**
 * Formats an error message with fallbacks for the given parameters.
 * @param {string} component component name.
 * @param {string} msg message to log.
 * @returns {string} the error message.
 * @memberof utils
 */
function buildFormattedErrorMessage(component = "N/A", msg = "N/A") {
  return `react-d3-graph :: ${component} :: ${msg}`;
}

/**
 * Helper function for customized error logging.
 * @param  {string} component - the name of the component where the error is to be thrown.
 * @param  {string} msg - the message contain a more detailed explanation about the error.
 * @returns {Error} the thrown error.
 * @memberof utils
 */
function throwErr(component, msg) {
  throw Error(buildFormattedErrorMessage(component, msg));
}

/**
 * Logs formatted `react-d3-graph` error with `console.error`.
 * @param {string} component component name.
 * @param {string} msg message to log.
 * @returns {undefined}
 * @memberof utils
 */
function logError(component, msg) {
  console.error(buildFormattedErrorMessage(component, msg));
}

/**
 * Helper function for customized warning logging.
 * @param  {string} component - the name of the component where the warning is to be thrown.
 * @param  {string} msg - the message contain a more detailed explanation about the error.
 * @returns {Warning} the thrown warning.
 * @memberof utils
 */
function logWarning(component, msg) {
  const warning = `react-d3-graph :: ${component} :: ${msg}`;

  console.warn(warning);
}

export { isDeepEqual, isEmptyObject, deepClone, merge, pick, antiPick, debounce, throwErr, logError, logWarning };
