"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true,
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

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
 * Link component is responsible for encapsulating link render.
 * @example
 * const onClickLink = function(source, target) {
 *      window.alert(`Clicked link between ${source} and ${target}`);
 * };
 *
 * const onRightClickLink = function(source, target) {
 *      window.alert(`Right clicked link between ${source} and ${target}`);
 * };
 *
 * const onMouseOverLink = function(source, target) {
 *      window.alert(`Mouse over in link between ${source} and ${target}`);
 * };
 *
 * const onMouseOutLink = function(source, target) {
 *      window.alert(`Mouse out link between ${source} and ${target}`);
 * };
 *
 * <Link
 *     d="M1..."
 *     source="idSourceNode"
 *     target="idTargetNode"
 *     markerId="marker-small"
 *     strokeWidth=1.5
 *     stroke="green"
 *     className="link"
 *     opacity=1
 *     mouseCursor="pointer"
 *     onClickLink={onClickLink}
 *     onRightClickLink={onRightClickLink}
 *     onMouseOverLink={onMouseOverLink}
 *     onMouseOutLink={onMouseOutLink} />
 */
var Link = /*#__PURE__*/ (function(_React$Component) {
    _inherits(Link, _React$Component);

    function Link() {
        var _getPrototypeOf2;

        var _this;

        _classCallCheck(this, Link);

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        _this = _possibleConstructorReturn(
            this,
            (_getPrototypeOf2 = _getPrototypeOf(Link)).call.apply(_getPrototypeOf2, [this].concat(args))
        );

        _defineProperty(_assertThisInitialized(_this), "handleOnClickLink", function() {
            return _this.props.onClickLink && _this.props.onClickLink(_this.props.source, _this.props.target);
        });

        _defineProperty(_assertThisInitialized(_this), "handleOnRightClickLink", function(event) {
            return (
                _this.props.onRightClickLink &&
                _this.props.onRightClickLink(event, _this.props.source, _this.props.target)
            );
        });

        _defineProperty(_assertThisInitialized(_this), "handleOnMouseOverLink", function() {
            return (
                // NOTE: this.props.id is optional, it might be undefined
                _this.props.onMouseOverLink &&
                _this.props.onMouseOverLink(_this.props.source, _this.props.target, _this.props.id)
            );
        });

        _defineProperty(_assertThisInitialized(_this), "handleOnMouseOutLink", function() {
            return (
                // NOTE: this.props.id is optional, it might be undefined
                _this.props.onMouseOutLink &&
                _this.props.onMouseOutLink(_this.props.source, _this.props.target, _this.props.id)
            );
        });

        return _this;
    }

    _createClass(Link, [
        {
            key: "render",
            value: function render() {
                var lineStyle = {
                    strokeWidth: this.props.strokeWidth,
                    stroke: this.props.stroke,
                    opacity: this.props.opacity,
                    fill: "none",
                    cursor: this.props.mouseCursor,
                };
                var lineProps = {
                    className: this.props.className,
                    d: this.props.d,
                    onClick: this.handleOnClickLink,
                    onContextMenu: this.handleOnRightClickLink,
                    onMouseOut: this.handleOnMouseOutLink,
                    onMouseOver: this.handleOnMouseOverLink,
                    style: lineStyle,
                };

                if (this.props.markerId) {
                    lineProps.markerEnd = "url(#".concat(this.props.markerId, ")");
                }

                var _this$props = this.props,
                    label = _this$props.label,
                    id = _this$props.id;
                var textProps = {
                    dy: -1,
                    style: {
                        fill: this.props.fontColor,
                        fontSize: this.props.fontSize,
                        fontWeight: this.props.fontWeight,
                    },
                };
                return _react["default"].createElement(
                    "g",
                    null,
                    _react["default"].createElement(
                        "path",
                        _extends({}, lineProps, {
                            id: id,
                        })
                    ),
                    label &&
                        _react["default"].createElement(
                            "text",
                            _extends(
                                {
                                    style: {
                                        textAnchor: "middle",
                                    },
                                },
                                textProps
                            ),
                            _react["default"].createElement(
                                "textPath",
                                {
                                    href: "#".concat(id),
                                    startOffset: "50%",
                                },
                                label
                            )
                        )
                );
            },
        },
    ]);

    return Link;
})(_react["default"].Component);

exports["default"] = Link;
