import LZString from "lz-string";

/**
 * Compressing an object into a sendable string
 * lz-string API: https://pieroxy.net/blog/pages/lz-string/index.html
 * @param {Object} object object to compress
 * @returns {string} base64 encoded string
 */
function compress(object) {
  return LZString.compressToBase64(JSON.stringify(object))
    .replace(/\+/g, "-") // Convert '+' to '-'
    .replace(/\//g, "_") // Convert '/' to '_'
    .replace(/=+$/, ""); // Remove ending '='
}

/**
 * Creating an hidden input to send the codesandbox
 * @param {HTMLFormElement} form target to add the hidden input
 * @param {string} name input name
 * @param {string} value input value
 * @returns {undefined}
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
 * @returns {string} index file code in a string
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
 * @param {Object} json object to send
 * @returns {string} exports statement
 */
function formatFile(json) {
  return `module.exports = ${JSON.stringify(json)}`;
}

/**
 * Create and send the code sandbox from the current sandbox data
 * @param {Object} config current sandbox config
 * @param {Object} data current sandbox data
 * @returns {undefined}
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
      "config.js": { content: formatFile(config) },
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

/**
 * We deactivate code sandboxes link generation for sandboxes that
 * have a view generator
 * See : https://github.com/danielcaldas/react-d3-graph/pull/417#issuecomment-763051874
 * @param {Object} config react-d3-graph config
 * @returns {boolean} true if the code sandbox link should not apply
 */
export function deactivateCodeSandboxLink(config) {
  return !!config.node?.viewGenerator;
}
