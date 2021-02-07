/*eslint require-jsdoc: 0, valid-jsdoc: 0*/

import LZString from "lz-string";

/**
 * Compressing an object into a sendable string
 *
 * @param {Object} object object to compress
 */
function compress(object) {
  return LZString.compressToBase64(JSON.stringify(object))
    .replace(/\+/g, "-") // Convert '+' to '-'
    .replace(/\//g, "_") // Convert '/' to '_'
    .replace(/=+$/, ""); // Remove ending '='
}

/**
 * Creating an hidden input to send the codesandbox
 */
function addHiddenInput(form, name, value) {
  const input = document.createElement("input");
  input.type = "hidden";
  input.name = name;
  input.value = value;
  form.appendChild(input);
}

/**
 * Content of the index.js file
 */
function getIndexFile() {
  return `import React from "react";
import ReactDOM from "react-dom";
import { Graph } from "react-d3-graph";

import config from "./config";
import data from "./data";

const rootElement = document.getElementById("root");
ReactDOM.render(<Graph id="graph" config={config} data={data} />, rootElement);`.trim();
}

/**
 * Formatting file into a sendable string
 * @param {*} json object to send
 */
function formatFile(json) {
  return `module.exports = ${JSON.stringify(json)}`;
}

/**
 * Remove the viewGenerator as it is not supported for now
 */
function formatConfig(config) {
  if (!config.node?.viewGenerator) {
    return config;
  }
  return {
    ...config,
    node: {
      ...config.node,
      viewGenerator: undefined,
    },
  };
}

/**
 * Create and send the code sandbox from the current sandbox data
 * @param {*} config current sandbox config
 * @param {*} data current sandbox data
 */
export function createCodeSandbox(config, data) {
  const parameters = compress({
    files: {
      "package.json": {
        content: {
          title: "react-d3-graph demo",
          dependencies: {
            "react-dom": "latest",
            react: "latest",
            "react-d3-graph": "latest",
            d3: "5.5.0",
          },
        },
      },
      "index.js": { content: getIndexFile() },
      "config.js": { content: formatFile(formatConfig(config)) },
      "data.js": { content: formatFile(data) },
    },
  });

  const form = document.createElement("form");
  form.method = "POST";
  form.target = "_blank";
  form.action = "https://codeSandbox.io/api/v1/sandboxes/define";
  addHiddenInput(form, "parameters", parameters);
  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
}
