var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "react", "hoist-non-react-statics", "./useNotify"], function (require, exports, React, hoist_non_react_statics_1, useNotify_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    React = __importStar(React);
    hoist_non_react_statics_1 = __importDefault(hoist_non_react_statics_1);
    useNotify_1 = __importDefault(useNotify_1);
    function default_1(WrappedComponent) {
        var Wrapper = function (props) {
            var notify = useNotify_1.default();
            return React.createElement(WrappedComponent, __assign({}, props, { notify: notify }));
        };
        return hoist_non_react_statics_1.default(Wrapper, WrappedComponent);
    }
    exports.default = default_1;
});
