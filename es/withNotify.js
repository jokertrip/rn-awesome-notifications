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
import * as React from "react";
import staticProps from "hoist-non-react-statics";
import useNotify from "./useNotify";
export default function (WrappedComponent) {
    var Wrapper = function (props) {
        var notify = useNotify();
        return React.createElement(WrappedComponent, __assign({}, props, { notify: notify }));
    };
    return staticProps(Wrapper, WrappedComponent);
}
