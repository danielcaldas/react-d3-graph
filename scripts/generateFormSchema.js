import config from '../src/components/Graph/config';

let schema = {};

function formMap(k, v) {
    return {
        type: typeof v,
        title: k,
        default: v
    };
}

function generateFormSchema(o, rootSpreadProp) {
    for(let k of Object.keys(o)) {
        typeof o[k] === 'object' ? generateFormSchema(o[k], `${rootSpreadProp}.k`)
                                : schema.push(formMap(o[k]));
    }
}

// Dump schema
console.log(JSON.stringify(schema));
