"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true,
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _node = _interopRequireDefault(require("./node.helper"));

var _node2 = _interopRequireDefault(require("./node.const"));

var _utils = require("../../utils");

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
 * Node component is responsible for encapsulating node render.
 * @example
 * const onClickNode = function(nodeId) {
 *     window.alert('Clicked node', nodeId);
 * };
 *
 * const onRightClickNode = function(nodeId) {
 *     window.alert('Right clicked node', nodeId);
 * }
 *
 * const onMouseOverNode = function(nodeId) {
 *     window.alert('Mouse over node', nodeId);
 * };
 *
 * const onMouseOutNode = function(nodeId) {
 *     window.alert('Mouse out node', nodeId);
 * };
 *
 * const generateCustomNode(node) {
 *     return <CustomComponent node={node} />;
 * }
 *
 * <Node
 *     id='nodeId'
 *     cx=22
 *     cy=22
 *     fill='green'
 *     fontSize=10
 *     fontColor='black'
 *     fontWeight='normal'
 *     dx=90
 *     label='label text'
 *     labelPosition='top'
 *     opacity=1
 *     renderLabel=true
 *     size=200
 *     stroke='none'
 *     strokeWidth=1.5
 *     svg='assets/my-svg.svg'
 *     type='square'
 *     viewGenerator={generateCustomNode}
 *     className='node'
 *     onClickNode={onClickNode}
 *     onRightClickNode={onRightClickNode}
 *     onMouseOverNode={onMouseOverNode}
 *     onMouseOutNode={onMouseOutNode} />
 */
var Node = /*#__PURE__*/ (function(_React$Component) {
    _inherits(Node, _React$Component);

    function Node() {
        var _getPrototypeOf2;

        var _this;

        _classCallCheck(this, Node);

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        _this = _possibleConstructorReturn(
            this,
            (_getPrototypeOf2 = _getPrototypeOf(Node)).call.apply(_getPrototypeOf2, [this].concat(args))
        );

        _defineProperty(_assertThisInitialized(_this), "handleOnClickNode", function() {
            return _this.props.onClickNode && _this.props.onClickNode(_this.props.id);
        });

        _defineProperty(_assertThisInitialized(_this), "handleOnRightClickNode", function(event) {
            return _this.props.onRightClickNode && _this.props.onRightClickNode(event, _this.props.id);
        });

        _defineProperty(_assertThisInitialized(_this), "handleOnMouseOverNode", function() {
            return _this.props.onMouseOverNode && _this.props.onMouseOverNode(_this.props.id);
        });

        _defineProperty(_assertThisInitialized(_this), "handleOnMouseOutNode", function() {
            return _this.props.onMouseOut && _this.props.onMouseOut(_this.props.id);
        });

        return _this;
    }

    _createClass(Node, [
        {
            key: "render",
            value: function render() {
                var nodeProps = {
                    cursor: this.props.cursor,
                    onClick: this.handleOnClickNode,
                    onContextMenu: this.handleOnRightClickNode,
                    onMouseOut: this.handleOnMouseOutNode,
                    onMouseOver: this.handleOnMouseOverNode,
                    opacity: this.props.opacity,
                };

                var textProps = _objectSpread(
                    {},
                    _node["default"].getLabelPlacementProps(this.props.dx, this.props.labelPosition),
                    {
                        fill: this.props.fontColor,
                        fontSize: this.props.fontSize,
                        fontWeight: this.props.fontWeight,
                        opacity: this.props.opacity,
                    }
                );

                var size = this.props.size;
                var isSizeNumericalValue = _typeof(size) !== "object";
                var gtx = this.props.cx,
                    gty = this.props.cy,
                    label = null,
                    node = null;

                if (this.props.svg || this.props.viewGenerator) {
                    var height = isSizeNumericalValue ? size / 10 : size.height / 10;
                    var width = isSizeNumericalValue ? size / 10 : size.width / 10;
                    var tx = width / 2;
                    var ty = height / 2;
                    var transform = "translate(".concat(tx, ",").concat(ty, ")");
                    label = _react["default"].createElement(
                        "text",
                        _extends({}, textProps, {
                            transform: transform,
                        }),
                        this.props.label
                    ); // By default, if a view generator is set, it takes precedence over any svg image url

                    if (this.props.viewGenerator && !this.props.overrideGlobalViewGenerator) {
                        node = _react["default"].createElement(
                            "svg",
                            _extends({}, nodeProps, {
                                width: width,
                                height: height,
                            }),
                            _react["default"].createElement(
                                "foreignObject",
                                {
                                    x: "0",
                                    y: "0",
                                    width: "100%",
                                    height: "100%",
                                },
                                _react["default"].createElement(
                                    "section",
                                    {
                                        style: {
                                            height: height,
                                            width: width,
                                            backgroundColor: "transparent",
                                        },
                                    },
                                    this.props.viewGenerator(this.props)
                                )
                            )
                        );
                    } else {
                        node = _react["default"].createElement(
                            "image",
                            _extends({}, nodeProps, {
                                href: this.props.svg,
                                width: width,
                                height: height,
                            })
                        );
                    } // svg offset transform regarding svg width/height

                    gtx -= tx;
                    gty -= ty;
                } else {
                    if (!isSizeNumericalValue) {
                        (0, _utils.logWarning)("node.size should be a number when not using custom nodes.");
                        size = _node2["default"].DEFAULT_NODE_SIZE;
                    }

                    nodeProps.d = _node["default"].buildSvgSymbol(size, this.props.type);
                    nodeProps.fill = this.props.fill;
                    nodeProps.stroke = this.props.stroke;
                    nodeProps.strokeWidth = this.props.strokeWidth;
                    label = _react["default"].createElement("text", textProps, this.props.label);
                    node = _react["default"].createElement("path", nodeProps);
                }

                var gProps = {
                    className: this.props.className,
                    cx: this.props.cx,
                    cy: this.props.cy,
                    id: this.props.id,
                    transform: "translate(".concat(gtx, ",").concat(gty, ")"),
                };
                return _react["default"].createElement("g", gProps, node, this.props.renderLabel && label);
            },
        },
    ]);

    return Node;
})(_react["default"].Component);

exports["default"] = Node;
