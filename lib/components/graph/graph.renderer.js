"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true,
});
exports.renderGraph = renderGraph;

var _react = _interopRequireDefault(require("react"));

var _graph = _interopRequireDefault(require("./graph.const"));

var _marker = require("../marker/marker.const");

var _Link = _interopRequireDefault(require("../link/Link"));

var _Node = _interopRequireDefault(require("../node/Node"));

var _Marker = _interopRequireDefault(require("../marker/Marker"));

var _graph2 = require("./graph.builder");

var _graph3 = require("../graph/graph.helper");

var _collapse = require("./collapse.helper");

var _marker2 = require("../marker/marker.helper");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _extends() {
    _extends =
        Object.assign ||
        function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key];
                    }
                }
            }
            return target;
        };
    return _extends.apply(this, arguments);
}

function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly)
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        keys.push.apply(keys, symbols);
    }
    return keys;
}

function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        if (i % 2) {
            ownKeys(Object(source), true).forEach(function(key) {
                _defineProperty(target, key, source[key]);
            });
        } else if (Object.getOwnPropertyDescriptors) {
            Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        } else {
            ownKeys(Object(source)).forEach(function(key) {
                Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
            });
        }
    }
    return target;
}

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
        obj[key] = value;
    }
    return obj;
}

/**
 * Build Link components given a list of links.
 * @param  {Object.<string, Object>} nodes - same as {@link #graphrenderer|nodes in renderGraph}.
 * @param  {Array.<Object>} links - array of links {@link #Link|Link}.
 * @param  {Array.<Object>} linksMatrix - array of links {@link #Link|Link}.
 * @param  {Object} config - same as {@link #graphrenderer|config in renderGraph}.
 * @param  {Function[]} linkCallbacks - same as {@link #graphrenderer|linkCallbacks in renderGraph}.
 * @param  {string} highlightedNode - same as {@link #graphrenderer|highlightedNode in renderGraph}.
 * @param  {Object} highlightedLink - same as {@link #graphrenderer|highlightedLink in renderGraph}.
 * @param  {number} transform - value that indicates the amount of zoom transformation.
 * @returns {Array.<Object>} returns the generated array of Link components.
 * @memberof Graph/renderer
 */
function _renderLinks(nodes, links, linksMatrix, config, linkCallbacks, highlightedNode, highlightedLink, transform) {
    var outLinks = links;

    if (config.collapsible) {
        outLinks = outLinks.filter(function(_ref) {
            var isHidden = _ref.isHidden;
            return !isHidden;
        });
    }

    return outLinks.map(function(link) {
        var id = link.id,
            source = link.source,
            target = link.target;
        var sourceId = (0, _graph3.getId)(source);
        var targetId = (0, _graph3.getId)(target);

        var _id = id ? "_".concat(id) : "";

        var key = ""
            .concat(sourceId)
            .concat(_graph["default"].COORDS_SEPARATOR)
            .concat(targetId)
            .concat(_id);
        var props = (0, _graph2.buildLinkProps)(
            _objectSpread({}, link, {
                source: "".concat(sourceId),
                target: "".concat(targetId),
            }),
            nodes,
            linksMatrix,
            config,
            linkCallbacks,
            "".concat(highlightedNode),
            highlightedLink,
            transform
        );
        return _react["default"].createElement(
            _Link["default"],
            _extends(
                {
                    key: key,
                    id: id,
                },
                props
            )
        );
    });
}
/**
 * Function that builds Node components.
 * @param  {Object.<string, Object>} nodes - an object containing all nodes mapped by their id.
 * @param  {Function[]} nodeCallbacks - array of callbacks for used defined event handler for node interactions.
 * @param  {Object} config - an object containing rd3g consumer defined configurations {@link #config config} for the graph.
 * @param  {string} highlightedNode - this value contains a string that represents the some currently highlighted node.
 * @param  {Object} highlightedLink - this object contains a source and target property for a link that is highlighted at some point in time.
 * @param  {string} highlightedLink.source - id of source node for highlighted link.
 * @param  {string} highlightedLink.target - id of target node for highlighted link.
 * @param  {number} transform - value that indicates the amount of zoom transformation.
 * @param  {Object.<string, Object>} linksMatrix - the matrix of connections of the graph
 * @returns {Array.<Object>} returns the generated array of node components
 * @memberof Graph/renderer
 */

function _renderNodes(nodes, nodeCallbacks, config, highlightedNode, highlightedLink, transform, linksMatrix) {
    var outNodes = Object.keys(nodes);

    if (config.collapsible) {
        outNodes = outNodes.filter(function(nodeId) {
            return (0, _collapse.isNodeVisible)(nodeId, nodes, linksMatrix);
        });
    }

    return outNodes.map(function(nodeId) {
        var props = (0, _graph2.buildNodeProps)(
            _objectSpread({}, nodes[nodeId], {
                id: "".concat(nodeId),
            }),
            config,
            nodeCallbacks,
            highlightedNode,
            highlightedLink,
            transform
        );
        return _react["default"].createElement(
            _Node["default"],
            _extends(
                {
                    key: nodeId,
                },
                props
            )
        );
    });
}
/**
 * Builds graph defs (for now markers, but we could also have gradients for instance).
 * NOTE: defs are static svg graphical objects, thus we only need to render them once, the result
 * is cached on the 1st call and from there we simply return the cached jsx.
 * @returns {Function} memoized build definitions function.
 * @memberof Graph/renderer
 */

function _renderDefs() {
    var markerCache = {};
    return function(config) {
        var highlightColor =
            !config.link.highlightColor || config.link.highlightColor === "SAME"
                ? config.link.color
                : config.link.highlightColor;
        var color = config.link.color;
        var key = "".concat(color, "___").concat(highlightColor);

        if (!markerCache[key]) {
            var _getMarkerSize = (0, _marker2.getMarkerSize)(config),
                small = _getMarkerSize.small,
                medium = _getMarkerSize.medium,
                large = _getMarkerSize.large;

            var markerProps = {
                markerWidth: config.link.markerWidth,
                markerHeight: config.link.markerHeight,
            };
            markerCache[key] = _react["default"].createElement(
                "defs",
                null,
                _react["default"].createElement(
                    _Marker["default"],
                    _extends(
                        {
                            id: _marker.MARKERS.MARKER_S,
                            refX: small,
                            fill: color,
                        },
                        markerProps
                    )
                ),
                _react["default"].createElement(
                    _Marker["default"],
                    _extends(
                        {
                            id: _marker.MARKERS.MARKER_SH,
                            refX: small,
                            fill: highlightColor,
                        },
                        markerProps
                    )
                ),
                _react["default"].createElement(
                    _Marker["default"],
                    _extends(
                        {
                            id: _marker.MARKERS.MARKER_M,
                            refX: medium,
                            fill: color,
                        },
                        markerProps
                    )
                ),
                _react["default"].createElement(
                    _Marker["default"],
                    _extends(
                        {
                            id: _marker.MARKERS.MARKER_MH,
                            refX: medium,
                            fill: highlightColor,
                        },
                        markerProps
                    )
                ),
                _react["default"].createElement(
                    _Marker["default"],
                    _extends(
                        {
                            id: _marker.MARKERS.MARKER_L,
                            refX: large,
                            fill: color,
                        },
                        markerProps
                    )
                ),
                _react["default"].createElement(
                    _Marker["default"],
                    _extends(
                        {
                            id: _marker.MARKERS.MARKER_LH,
                            refX: large,
                            fill: highlightColor,
                        },
                        markerProps
                    )
                )
            );
        }

        return markerCache[key];
    };
}
/**
 * Memoized reference for _renderDefs.
 * @param  {Object} config - an object containing rd3g consumer defined configurations {@link #config config} for the graph.
 * @returns {Object} graph reusable objects [defs](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/defs).
 * @memberof Graph/renderer
 */

var _memoizedRenderDefs = _renderDefs();
/**
 * Method that actually is exported an consumed by Graph component in order to build all Nodes and Link
 * components.
 * @param  {Object.<string, Object>} nodes - an object containing all nodes mapped by their id.
 * @param  {Function[]} nodeCallbacks - array of callbacks for used defined event handler for node interactions.
 * @param  {Array.<Object>} links - array of links {@link #Link|Link}.
 * @param  {Object.<string, Object>} linksMatrix - an object containing a matrix of connections of the graph, for each nodeId,
 * there is an Object that maps adjacent nodes ids (string) and their values (number).
 * ```javascript
 *  // links example
 *  {
 *     "Androsynth": {
 *         "Chenjesu": 1,
 *         "Ilwrath": 1,
 *         "Mycon": 1,
 *         "Spathi": 1,
 *         "Umgah": 1,
 *         "VUX": 1,
 *         "Guardian": 1
 *     },
 *     "Chenjesu": {
 *         "Androsynth": 1,
 *         "Mycon": 1,
 *         "Spathi": 1,
 *         "Umgah": 1,
 *         "VUX": 1,
 *         "Broodhmome": 1
 *     },
 *     ...
 *  }
 * ```
 * @param  {Function[]} linkCallbacks - array of callbacks for used defined event handler for link interactions.
 * @param  {Object} config - an object containing rd3g consumer defined configurations {@link #config config} for the graph.
 * @param  {string} highlightedNode - this value contains a string that represents the some currently highlighted node.
 * @param  {Object} highlightedLink - this object contains a source and target property for a link that is highlighted at some point in time.
 * @param  {string} highlightedLink.source - id of source node for highlighted link.
 * @param  {string} highlightedLink.target - id of target node for highlighted link.
 * @param  {number} transform - value that indicates the amount of zoom transformation.
 * @returns {Object} returns an object containing the generated nodes and links that form the graph.
 * @memberof Graph/renderer
 */

function renderGraph(
    nodes,
    nodeCallbacks,
    links,
    linksMatrix,
    linkCallbacks,
    config,
    highlightedNode,
    highlightedLink,
    transform
) {
    return {
        nodes: _renderNodes(nodes, nodeCallbacks, config, highlightedNode, highlightedLink, transform, linksMatrix),
        links: _renderLinks(
            nodes,
            links,
            linksMatrix,
            config,
            linkCallbacks,
            highlightedNode,
            highlightedLink,
            transform
        ),
        defs: _memoizedRenderDefs(config),
    };
}
