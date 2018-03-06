/*eslint require-jsdoc: 0, valid-jsdoc: 0*/
function setValue(obj, access, value) {
    if (typeof access == 'string') {
        access = access.split('.');
    }

    // Check for non existence of root property before advancing
    if (!obj[access[0]]) {
        obj[access[0]] = {};
    }

    access.length > 1 ? setValue(obj[access.shift()], access, value) : (obj[access[0]] = value);
}

/**
 * This two functions generate the react-jsonschema-form
 * schema from some passed graph configuration.
 */
function formMap(k, v) {
    return {
        title: k,
        type: typeof v,
        default: v
    };
}

function generateFormSchema(o, rootSpreadProp, accum = {}) {
    for (let k of Object.keys(o)) {
        const kk = rootSpreadProp ? `${rootSpreadProp}.${k}` : k;

        typeof o[k] === 'object' ? generateFormSchema(o[kk], kk, accum) : (accum[kk] = formMap(kk, o[k]));
    }

    return accum;
}

export default {
    setValue,
    generateFormSchema
};
