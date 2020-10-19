"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true,
});
exports["default"] = void 0;

var _const = _interopRequireDefault(require("../../const"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
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

var _default = _objectSpread(
    {
        COORDS_SEPARATOR: ",",
        FORCE_X: 0.06,
        FORCE_Y: 0.06,
        GRAPH_CONTAINER_ID: "graph-container-zoomable",
        GRAPH_WRAPPER_ID: "graph-wrapper",
        KEYWORDS: {
            SAME: "SAME",
        },
        LINK_CLASS_NAME: "link",
        NODE_CLASS_NAME: "node",
        TTL_DOUBLE_CLICK_IN_MS: 300,
    },
    _const["default"]
);

exports["default"] = _default;
