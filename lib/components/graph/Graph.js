"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true,
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _d3Drag = require("d3-drag");

var _d3Force = require("d3-force");

var _d3Selection = require("d3-selection");

var _d3Zoom = require("d3-zoom");

var _graph = _interopRequireDefault(require("./graph.const"));

var _graph2 = _interopRequireDefault(require("./graph.config"));

var _err = _interopRequireDefault(require("../../err"));

var _collapse = require("./collapse.helper");

var _graph3 = require("./graph.helper");

var _graph4 = require("./graph.renderer");

var _utils = require("../../utils");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _typeof(obj) {
    "@babel/helpers - typeof";
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof(obj) {
            return typeof obj;
        };
    } else {
        _typeof = function _typeof(obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype
                ? "symbol"
                : typeof obj;
        };
    }
    return _typeof(obj);
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

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
    }
    return _assertThisInitialized(self);
}

function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function _getPrototypeOf(o) {
              return o.__proto__ || Object.getPrototypeOf(o);
          };
    return _getPrototypeOf(o);
}

function _assertThisInitialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: { value: subClass, writable: true, configurable: true },
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
    _setPrototypeOf =
        Object.setPrototypeOf ||
        function _setPrototypeOf(o, p) {
            o.__proto__ = p;
            return o;
        };
    return _setPrototypeOf(o, p);
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
 * Graph component is the main component for react-d3-graph components, its interface allows its user
 * to build the graph once the user provides the data, configuration (optional) and callback interactions (also optional).
 * The code for the [live example](https://danielcaldas.github.io/react-d3-graph/sandbox/index.html)
 * can be consulted [here](https://github.com/danielcaldas/react-d3-graph/blob/master/sandbox/Sandbox.jsx)
 * @example
 * import { Graph } from 'react-d3-graph';
 *
 * // graph payload (with minimalist structure)
 * const data = {
 *     nodes: [
 *       {id: 'Harry'},
 *       {id: 'Sally'},
 *       {id: 'Alice'}
 *     ],
 *     links: [
 *         {source: 'Harry', target: 'Sally'},
 *         {source: 'Harry', target: 'Alice'},
 *     ]
 * };
 *
 * // the graph configuration, you only need to pass down properties
 * // that you want to override, otherwise default ones will be used
 * const myConfig = {
 *     nodeHighlightBehavior: true,
 *     node: {
 *         color: 'lightgreen',
 *         size: 120,
 *         highlightStrokeColor: 'blue'
 *     },
 *     link: {
 *         highlightColor: 'lightblue'
 *     }
 * };
 *
 * // Callback to handle click on the graph.
 * // @param {Object} event click dom event
 * const onClickGraph = function(event) {
 *      window.alert('Clicked the graph background');
 * };
 *
 * const onClickNode = function(nodeId) {
 *      window.alert('Clicked node ${nodeId}');
 * };
 *
 * const onDoubleClickNode = function(nodeId) {
 *      window.alert('Double clicked node ${nodeId}');
 * };
 *
 * const onRightClickNode = function(event, nodeId) {
 *      window.alert('Right clicked node ${nodeId}');
 * };
 *
 * const onMouseOverNode = function(nodeId) {
 *      window.alert(`Mouse over node ${nodeId}`);
 * };
 *
 * const onMouseOutNode = function(nodeId) {
 *      window.alert(`Mouse out node ${nodeId}`);
 * };
 *
 * const onClickLink = function(source, target) {
 *      window.alert(`Clicked link between ${source} and ${target}`);
 * };
 *
 * const onRightClickLink = function(event, source, target) {
 *      window.alert('Right clicked link between ${source} and ${target}');
 * };
 *
 * // @deprecated in react-d3-graph 3.0.0 signature will change to
 * // onMouseOverLink(id, source, target)
 * const onMouseOverLink = function(source, target, id) {
 *      window.alert(`Mouse over in link between ${source} and ${target} (id: ${id})`);
 * };
 *
 * const onMouseOutLink = function(source, target) {
 *      window.alert(`Mouse out link between ${source} and ${target}`);
 * };
 *
 * const onNodePositionChange = function(nodeId, x, y) {
 *      window.alert(`Node ${nodeId} moved to new position x= ${x} y= ${y}`);
 * };
 *
 * // Callback that's called whenever the graph is zoomed in/out
 * // @param {number} previousZoom the previous graph zoom
 * // @param {number} newZoom the new graph zoom
 * const onZoomChange = function(previousZoom, newZoom) {
 *      window.alert(`Graph is now zoomed at ${newZoom} from ${previousZoom}`);
 * };
 *
 *
 * <Graph
 *      id='graph-id' // id is mandatory, if no id is defined rd3g will throw an error
 *      data={data}
 *      config={myConfig}
 *      onClickGraph={onClickGraph}
 *      onClickNode={onClickNode}
 *      onDoubleClickNode={onDoubleClickNode}
 *      onRightClickNode={onRightClickNode}
 *      onClickLink={onClickLink}
 *      onRightClickLink={onRightClickLink}
 *      onMouseOverNode={onMouseOverNode}
 *      onMouseOutNode={onMouseOutNode}
 *      onMouseOverLink={onMouseOverLink}
 *      onMouseOutLink={onMouseOutLink}
 *      onZoomChange={onZoomChange}/>
 */
var Graph = /*#__PURE__*/ (function(_React$Component) {
    _inherits(Graph, _React$Component);

    _createClass(Graph, [
        {
            key: "_graphLinkForceConfig",

            /**
             * Obtain a set of properties which will be used to perform the focus and zoom animation if
             * required. In case there's not a focus and zoom animation in progress, it should reset the
             * transition duration to zero and clear transformation styles.
             * @returns {Object} - Focus and zoom animation properties.
             */

            /**
             * This method runs {@link d3-force|https://github.com/d3/d3-force}
             * against the current graph.
             * @returns {undefined}
             */
            value: function _graphLinkForceConfig() {
                var forceLink = (0, _d3Force.forceLink)(this.state.d3Links)
                    .id(function(l) {
                        return l.id;
                    })
                    .distance(this.state.config.d3.linkLength)
                    .strength(this.state.config.d3.linkStrength);
                this.state.simulation.force(_graph["default"].LINK_CLASS_NAME, forceLink);
            },
            /**
             * This method runs {@link d3-drag|https://github.com/d3/d3-drag}
             * against the current graph.
             * @returns {undefined}
             */
        },
        {
            key: "_graphNodeDragConfig",
            value: function _graphNodeDragConfig() {
                var customNodeDrag = (0, _d3Drag.drag)()
                    .on("start", this._onDragStart)
                    .on("drag", this._onDragMove)
                    .on("end", this._onDragEnd);
                (0, _d3Selection.select)("#".concat(this.state.id, "-").concat(_graph["default"].GRAPH_WRAPPER_ID))
                    .selectAll(".node")
                    .call(customNodeDrag);
            },
            /**
             * Sets d3 tick function and configures other d3 stuff such as forces and drag events.
             * Whenever called binds Graph component state with d3.
             * @returns {undefined}
             */
        },
        {
            key: "_graphBindD3ToReactComponent",
            value: function _graphBindD3ToReactComponent() {
                if (!this.state.config.d3.disableLinkForce) {
                    this.state.simulation.nodes(this.state.d3Nodes).on("tick", this._tick);

                    this._graphLinkForceConfig();
                }

                this._graphNodeDragConfig();
            },
            /**
             * Handles d3 drag 'end' event.
             * @returns {undefined}
             */
        },
    ]);

    function Graph(props) {
        var _this;

        _classCallCheck(this, Graph);

        _this = _possibleConstructorReturn(this, _getPrototypeOf(Graph).call(this, props));

        _defineProperty(_assertThisInitialized(_this), "_generateFocusAnimationProps", function() {
            var focusedNodeId = _this.state.focusedNodeId; // In case an older animation was still not complete, clear previous timeout to ensure the new one is not cancelled

            if (_this.state.enableFocusAnimation) {
                if (_this.focusAnimationTimeout) {
                    clearTimeout(_this.focusAnimationTimeout);
                }

                _this.focusAnimationTimeout = setTimeout(function() {
                    return _this.setState({
                        enableFocusAnimation: false,
                    });
                }, _this.state.config.focusAnimationDuration * 1000);
            }

            var transitionDuration = _this.state.enableFocusAnimation ? _this.state.config.focusAnimationDuration : 0;
            return {
                style: {
                    transitionDuration: "".concat(transitionDuration, "s"),
                },
                transform: focusedNodeId ? _this.state.focusTransformation : null,
            };
        });

        _defineProperty(_assertThisInitialized(_this), "_onDragEnd", function() {
            _this.isDraggingNode = false;

            if (_this.state.draggedNode) {
                _this.onNodePositionChange(_this.state.draggedNode);

                _this._tick({
                    draggedNode: null,
                });
            }

            !_this.state.config.staticGraph &&
                _this.state.config.automaticRearrangeAfterDropNode &&
                _this.state.simulation.alphaTarget(_this.state.config.d3.alphaTarget).restart();
        });

        _defineProperty(_assertThisInitialized(_this), "_onDragMove", function(ev, index, nodeList) {
            var id = nodeList[index].id;

            if (!_this.state.config.staticGraph) {
                // this is where d3 and react bind
                var draggedNode = _this.state.nodes[id];
                draggedNode.oldX = draggedNode.x;
                draggedNode.oldY = draggedNode.y;
                draggedNode.x += _d3Selection.event.dx;
                draggedNode.y += _d3Selection.event.dy; // set nodes fixing coords fx and fy

                draggedNode["fx"] = draggedNode.x;
                draggedNode["fy"] = draggedNode.y;

                _this._tick({
                    draggedNode: draggedNode,
                });
            }
        });

        _defineProperty(_assertThisInitialized(_this), "_onDragStart", function() {
            _this.isDraggingNode = true;

            _this.pauseSimulation();

            if (_this.state.enableFocusAnimation) {
                _this.setState({
                    enableFocusAnimation: false,
                });
            }
        });

        _defineProperty(_assertThisInitialized(_this), "_setNodeHighlightedValue", function(id) {
            var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
            return _this._tick(
                (0, _graph3.updateNodeHighlightedValue)(
                    _this.state.nodes,
                    _this.state.links,
                    _this.state.config,
                    id,
                    value
                )
            );
        });

        _defineProperty(_assertThisInitialized(_this), "_tick", function() {
            var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var cb = arguments.length > 1 ? arguments[1] : undefined;
            return cb ? _this.setState(state, cb) : _this.setState(state);
        });

        _defineProperty(_assertThisInitialized(_this), "_zoomConfig", function() {
            var selector = (0, _d3Selection.select)(
                "#".concat(_this.state.id, "-").concat(_graph["default"].GRAPH_WRAPPER_ID)
            );
            var zoomObject = (0, _d3Zoom.zoom)()
                .scaleExtent([_this.state.config.minZoom, _this.state.config.maxZoom])
                .on("zoom", _this._zoomed);

            if (_this.state.config.initialZoom !== null) {
                zoomObject.scaleTo(selector, _this.state.config.initialZoom);
            } // avoid double click on graph to trigger zoom
            // for more details consult: https://github.com/danielcaldas/react-d3-graph/pull/202

            selector.call(zoomObject).on("dblclick.zoom", null);
        });

        _defineProperty(_assertThisInitialized(_this), "_zoomed", function() {
            var transform = _d3Selection.event.transform;
            (0, _d3Selection.selectAll)(
                "#".concat(_this.state.id, "-").concat(_graph["default"].GRAPH_CONTAINER_ID)
            ).attr("transform", transform);
            _this.state.config.panAndZoom &&
                _this.setState({
                    transform: transform.k,
                }); // only send zoom change events if the zoom has changed (_zoomed() also gets called when panning)

            if (_this.debouncedOnZoomChange && _this.state.previousZoom !== transform.k) {
                _this.debouncedOnZoomChange(_this.state.previousZoom, transform.k);

                _this.setState({
                    previousZoom: transform.k,
                });
            }
        });

        _defineProperty(_assertThisInitialized(_this), "onClickGraph", function(e) {
            var _e$target, _e$target$attributes, _e$target$attributes$;

            if (_this.state.enableFocusAnimation) {
                _this.setState({
                    enableFocusAnimation: false,
                });
            } // Only trigger the graph onClickHandler, if not clicked a node or link.
            // toUpperCase() is added as a precaution, as the documentation says tagName should always
            // return in UPPERCASE, but chrome returns lowercase

            var tagName = e.target && e.target.tagName;
            var name =
                e === null || e === void 0
                    ? void 0
                    : (_e$target = e.target) === null || _e$target === void 0
                    ? void 0
                    : (_e$target$attributes = _e$target.attributes) === null || _e$target$attributes === void 0
                    ? void 0
                    : (_e$target$attributes$ = _e$target$attributes.name) === null || _e$target$attributes$ === void 0
                    ? void 0
                    : _e$target$attributes$.value;
            var svgContainerName = "svg-container-".concat(_this.state.id);

            if (tagName.toUpperCase() === "SVG" && name === svgContainerName) {
                _this.props.onClickGraph && _this.props.onClickGraph(e);
            }
        });

        _defineProperty(_assertThisInitialized(_this), "onClickNode", function(clickedNodeId) {
            if (_this.state.config.collapsible) {
                var leafConnections = (0, _collapse.getTargetLeafConnections)(
                    clickedNodeId,
                    _this.state.links,
                    _this.state.config
                );
                var links = (0, _collapse.toggleLinksMatrixConnections)(
                    _this.state.links,
                    leafConnections,
                    _this.state.config
                );
                var d3Links = (0, _collapse.toggleLinksConnections)(_this.state.d3Links, links);
                var firstLeaf = leafConnections === null || leafConnections === void 0 ? void 0 : leafConnections["0"];
                var isExpanding = false;

                if (firstLeaf) {
                    var visibility = links[firstLeaf.source][firstLeaf.target];
                    isExpanding = visibility === 1;
                }

                _this._tick(
                    {
                        links: links,
                        d3Links: d3Links,
                    },
                    function() {
                        _this.props.onClickNode && _this.props.onClickNode(clickedNodeId);

                        if (isExpanding) {
                            _this._graphNodeDragConfig();
                        }
                    }
                );
            } else {
                if (!_this.nodeClickTimer) {
                    _this.nodeClickTimer = setTimeout(function() {
                        _this.props.onClickNode && _this.props.onClickNode(clickedNodeId);
                        _this.nodeClickTimer = null;
                    }, _graph["default"].TTL_DOUBLE_CLICK_IN_MS);
                } else {
                    _this.props.onDoubleClickNode && _this.props.onDoubleClickNode(clickedNodeId);
                    _this.nodeClickTimer = clearTimeout(_this.nodeClickTimer);
                }
            }
        });

        _defineProperty(_assertThisInitialized(_this), "onMouseOverNode", function(id) {
            if (_this.isDraggingNode) {
                return;
            }

            _this.props.onMouseOverNode && _this.props.onMouseOverNode(id);
            _this.state.config.nodeHighlightBehavior && _this._setNodeHighlightedValue(id, true);
        });

        _defineProperty(_assertThisInitialized(_this), "onMouseOutNode", function(id) {
            if (_this.isDraggingNode) {
                return;
            }

            _this.props.onMouseOutNode && _this.props.onMouseOutNode(id);
            _this.state.config.nodeHighlightBehavior && _this._setNodeHighlightedValue(id, false);
        });

        _defineProperty(_assertThisInitialized(_this), "onMouseOverLink", function(source, target, id) {
            // exclude id from arguments in case is not defined so that the onMouseOverLink API is
            // retro-compatible and will function if the callee is expecting only (source, target) arguments
            _this.props.onMouseOverLink && _this.props.onMouseOverLink(source, target, id);

            if (_this.state.config.linkHighlightBehavior) {
                var highlightedLink = {
                    id: id,
                    source: source,
                    target: target,
                };

                _this._tick({
                    highlightedLink: highlightedLink,
                });
            }
        });

        _defineProperty(_assertThisInitialized(_this), "onMouseOutLink", function(source, target) {
            _this.props.onMouseOutLink && _this.props.onMouseOutLink(source, target);

            if (_this.state.config.linkHighlightBehavior) {
                var highlightedLink = undefined;

                _this._tick({
                    highlightedLink: highlightedLink,
                });
            }
        });

        _defineProperty(_assertThisInitialized(_this), "onNodePositionChange", function(node) {
            if (!_this.props.onNodePositionChange) {
                return;
            }

            var id = node.id,
                x = node.x,
                y = node.y;

            _this.props.onNodePositionChange(id, x, y);
        });

        _defineProperty(_assertThisInitialized(_this), "pauseSimulation", function() {
            return _this.state.simulation.stop();
        });

        _defineProperty(_assertThisInitialized(_this), "resetNodesPositions", function() {
            if (!_this.state.config.staticGraph) {
                for (var nodeId in _this.state.nodes) {
                    var node = _this.state.nodes[nodeId];

                    if (node.fx && node.fy) {
                        Reflect.deleteProperty(node, "fx");
                        Reflect.deleteProperty(node, "fy");
                    }
                }

                _this.state.simulation.alphaTarget(_this.state.config.d3.alphaTarget).restart();

                _this._tick();
            }
        });

        _defineProperty(_assertThisInitialized(_this), "restartSimulation", function() {
            return !_this.state.config.staticGraph && _this.state.simulation.restart();
        });

        if (!_this.props.id) {
            (0, _utils.throwErr)(_this.constructor.name, _err["default"].GRAPH_NO_ID_PROP);
        }

        _this.focusAnimationTimeout = null;
        _this.nodeClickTimer = null;
        _this.isDraggingNode = false;
        _this.state = (0, _graph3.initializeGraphState)(_this.props, _this.state);
        _this.debouncedOnZoomChange = _this.props.onZoomChange
            ? (0, _utils.debounce)(_this.props.onZoomChange, 100)
            : null;
        return _this;
    }
    /**
     * @deprecated
     * `componentWillReceiveProps` has a replacement method in react v16.3 onwards.
     * that is getDerivedStateFromProps.
     * But one needs to be aware that if an anti pattern of `componentWillReceiveProps` is
     * in place for this implementation the migration might not be that easy.
     * See {@link https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html}.
     * @param {Object} nextProps - props.
     * @returns {undefined}
     */
    // eslint-disable-next-line

    _createClass(Graph, [
        {
            key: "UNSAFE_componentWillReceiveProps",
            value: function UNSAFE_componentWillReceiveProps(nextProps) {
                var _checkForGraphElement = (0, _graph3.checkForGraphElementsChanges)(nextProps, this.state),
                    graphElementsUpdated = _checkForGraphElement.graphElementsUpdated,
                    newGraphElements = _checkForGraphElement.newGraphElements;

                var state = graphElementsUpdated
                    ? (0, _graph3.initializeGraphState)(nextProps, this.state)
                    : this.state;
                var newConfig = nextProps.config || {};

                var _checkForGraphConfigC = (0, _graph3.checkForGraphConfigChanges)(nextProps, this.state),
                    configUpdated = _checkForGraphConfigC.configUpdated,
                    d3ConfigUpdated = _checkForGraphConfigC.d3ConfigUpdated;

                var config = configUpdated ? (0, _utils.merge)(_graph2["default"], newConfig) : this.state.config; // in order to properly update graph data we need to pause eventual d3 ongoing animations

                newGraphElements && this.pauseSimulation();
                var transform = newConfig.panAndZoom !== this.state.config.panAndZoom ? 1 : this.state.transform;
                var focusedNodeId = nextProps.data.focusedNodeId;
                var d3FocusedNode = this.state.d3Nodes.find(function(node) {
                    return "".concat(node.id) === "".concat(focusedNodeId);
                });
                var focusTransformation = (0, _graph3.getCenterAndZoomTransformation)(d3FocusedNode, this.state.config);
                var enableFocusAnimation = this.props.data.focusedNodeId !== nextProps.data.focusedNodeId; // if we're given a function to call when the zoom changes, we create a debounced version of it
                // this is because this function gets called in very rapid succession when zooming

                if (nextProps.onZoomChange) {
                    this.debouncedOnZoomChange = (0, _utils.debounce)(nextProps.onZoomChange, 100);
                }

                this.setState(
                    _objectSpread({}, state, {
                        config: config,
                        configUpdated: configUpdated,
                        d3ConfigUpdated: d3ConfigUpdated,
                        newGraphElements: newGraphElements,
                        transform: transform,
                        focusedNodeId: focusedNodeId,
                        enableFocusAnimation: enableFocusAnimation,
                        focusTransformation: focusTransformation,
                    })
                );
            },
        },
        {
            key: "componentDidUpdate",
            value: function componentDidUpdate() {
                // if the property staticGraph was activated we want to stop possible ongoing simulation
                var shouldPause = this.state.config.staticGraph || this.state.config.staticGraphWithDragAndDrop;

                if (shouldPause) {
                    this.pauseSimulation();
                }

                if (!this.state.config.staticGraph && (this.state.newGraphElements || this.state.d3ConfigUpdated)) {
                    this._graphBindD3ToReactComponent();

                    if (!this.state.config.staticGraphWithDragAndDrop) {
                        this.restartSimulation();
                    }

                    this.setState({
                        newGraphElements: false,
                        d3ConfigUpdated: false,
                    });
                } else if (this.state.configUpdated) {
                    this._graphNodeDragConfig();
                }

                if (this.state.configUpdated) {
                    this._zoomConfig();

                    this.setState({
                        configUpdated: false,
                    });
                }
            },
        },
        {
            key: "componentDidMount",
            value: function componentDidMount() {
                if (!this.state.config.staticGraph) {
                    this._graphBindD3ToReactComponent();
                } // graph zoom and drag&drop all network

                this._zoomConfig();
            },
        },
        {
            key: "componentWillUnmount",
            value: function componentWillUnmount() {
                this.pauseSimulation();

                if (this.nodeClickTimer) {
                    clearTimeout(this.nodeClickTimer);
                    this.nodeClickTimer = null;
                }

                if (this.focusAnimationTimeout) {
                    clearTimeout(this.focusAnimationTimeout);
                    this.focusAnimationTimeout = null;
                }
            },
        },
        {
            key: "render",
            value: function render() {
                var _renderGraph = (0, _graph4.renderGraph)(
                        this.state.nodes,
                        {
                            onClickNode: this.onClickNode,
                            onDoubleClickNode: this.onDoubleClickNode,
                            onRightClickNode: this.props.onRightClickNode,
                            onMouseOverNode: this.onMouseOverNode,
                            onMouseOut: this.onMouseOutNode,
                        },
                        this.state.d3Links,
                        this.state.links,
                        {
                            onClickLink: this.props.onClickLink,
                            onRightClickLink: this.props.onRightClickLink,
                            onMouseOverLink: this.onMouseOverLink,
                            onMouseOutLink: this.onMouseOutLink,
                        },
                        this.state.config,
                        this.state.highlightedNode,
                        this.state.highlightedLink,
                        this.state.transform
                    ),
                    nodes = _renderGraph.nodes,
                    links = _renderGraph.links,
                    defs = _renderGraph.defs;

                var svgStyle = {
                    height: this.state.config.height,
                    width: this.state.config.width,
                };

                var containerProps = this._generateFocusAnimationProps();

                return _react["default"].createElement(
                    "div",
                    {
                        id: "".concat(this.state.id, "-").concat(_graph["default"].GRAPH_WRAPPER_ID),
                    },
                    _react["default"].createElement(
                        "svg",
                        {
                            name: "svg-container-".concat(this.state.id),
                            style: svgStyle,
                            onClick: this.onClickGraph,
                        },
                        defs,
                        _react["default"].createElement(
                            "g",
                            _extends(
                                {
                                    id: "".concat(this.state.id, "-").concat(_graph["default"].GRAPH_CONTAINER_ID),
                                },
                                containerProps
                            ),
                            links,
                            nodes
                        )
                    )
                );
            },
        },
    ]);

    return Graph;
})(_react["default"].Component);

exports["default"] = Graph;
