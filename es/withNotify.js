import * as React from "react";
import staticProps from "hoist-non-react-statics";
import useNotify from "./useNotify";
export default function (WrappedComponent) {
    const Wrapper = function (props) {
        const notify = useNotify();
        return React.createElement(WrappedComponent, { ...props, notify: notify });
    };
    return staticProps(Wrapper, WrappedComponent);
}
