/*eslint require-jsdoc: 0, valid-jsdoc: 0, no-undef: 0, no-empty: 0, no-console: 0*/
import React from "react";
import queryString from "query-string";
import { LINE_TYPES } from "../src/components/link/link.const";
import DEFAULT_CONFIG from "../src/components/graph/graph.config";
import { merge } from "../src/utils";
import { tooltips } from "./graph-config-tooltips";

const LABEL_POSITION_OPTIONS = ["left", "right", "top", "bottom", "center"];

/**
 * This two functions generate the react-jsonschema-form
 * schema from some passed graph configuration.
 */
function formMap(k, v) {
    // customized props
    switch (k) {
        case "link.type": {
            return {
                type: "array",
                title: "link.type",
                items: {
                    enum: Object.keys(LINE_TYPES),
                },
                uniqueItems: true,
            };
        }
        case "node.labelPosition": {
            return {
                type: "array",
                title: "node.labelPosition",
                items: {
                    enum: LABEL_POSITION_OPTIONS,
                },
                uniqueItems: true,
            };
        }
    }

    return {
        title: k,
        type: typeof v,
        default: v,
    };
}

function generateFormSchema(o, rootSpreadProp, accum = {}) {
    for (let k of Object.keys(o)) {
        const kk = rootSpreadProp ? `${rootSpreadProp}.${k}` : k;

        if (o[k] !== undefined && o[k] !== null && typeof o[k] !== "function") {
            typeof o[k] === "object" ? generateFormSchema(o[k], kk, accum) : (accum[kk] = formMap(kk, o[k]));
        }
    }

    return accum;
}

function loadDataset() {
    const queryParams = queryString.parse(location.search);

    let fullscreen = false;

    if (queryParams && queryParams.fullscreen) {
        fullscreen = new Boolean(queryParams.fullscreen);
    }

    if (queryParams && queryParams.data) {
        const dataset = queryParams.data.toLowerCase();

        try {
            const data = require(`./data/${dataset}/${dataset}.data`);
            const datasetConfig = require(`./data/${dataset}/${dataset}.config`);
            // hasOwnProperty(datasetConfig, "default") hack to get around mixed module systems
            const tmp = Object.prototype.hasOwnProperty.call(datasetConfig, "default")
                ? datasetConfig.default
                : datasetConfig;
            const config = merge(DEFAULT_CONFIG, tmp);

            return { data, config, fullscreen };
        } catch (error) {
            console.warn(
                `dataset with name ${dataset} not found, falling back to default, make sure it is a valid dataset`
            );
        }
    }

    const config = {};
    const data = require("./data/default");

    return {
        config,
        data,
        fullscreen,
    };
}

function isArray(o) {
    return o && typeof o === "object" && Object.prototype.hasOwnProperty.call(o, "length");
}

function setValue(obj, access, value) {
    if (typeof access == "string") {
        access = access.split(".");
    }

    // check for non existence of root property before advancing
    if (!obj[access[0]]) {
        obj[access[0]] = {};
    }

    const v = isArray(value) ? value[0] : value;

    if (access.length > 1) {
        setValue(obj[access.shift()], access, v);
    } else {
        obj[access[0]] = v;
    }
}

function tooltipReducer(schemaProps, key) {
    const uiHelp = tooltips[key] ? (
        <small className="tooltip-help" data-tip={tooltips[key]}>
            ℹ️ documentation
        </small>
    ) : (
        undefined
    );

    schemaProps[key] = {
        ...schemaProps[key],
        "ui:help": uiHelp,
    };

    return schemaProps;
}

export { generateFormSchema, loadDataset, setValue, tooltipReducer };
