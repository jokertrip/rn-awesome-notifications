"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
var react_native_gesture_handler_1 = require("react-native-gesture-handler");
var react_native_1 = require("react-native");
var blur_1 = require("@react-native-community/blur");
var icons_1 = __importDefault(require("./icons"));
var animations_1 = require("./animations");
var CloseButton = function (_a) {
    var fullState = _a.fullState, onPress = _a.onPress;
    var clock = React.useMemo(function () { return new react_native_reanimated_1.Clock(); }, []);
    var Container = react_native_1.Platform.OS === 'ios' ? blur_1.BlurView : react_native_1.View;
    return (React.createElement(react_native_reanimated_1.default.View, { style: [
            styles.root,
            {
                opacity: react_native_reanimated_1.cond(fullState, animations_1.runTiming(clock)({ duration: 300, toValue: new react_native_reanimated_1.Value(1), lastVal: new react_native_reanimated_1.Value(0) }), 0),
            }
        ] },
        React.createElement(react_native_gesture_handler_1.TapGestureHandler, { onHandlerStateChange: onPress, numberOfTaps: 1 },
            React.createElement(Container, { style: { flex: 1, flexDirection: "row", paddingHorizontal: 10, alignItems: "center" }, blurType: "xlight" },
                React.createElement(react_native_1.Image, { source: icons_1.default.close, style: styles.icon }),
                React.createElement(react_native_1.Text, { allowFontScaling: false, style: { color: "#4b4b4b", marginLeft: 2 } }, " \u0417\u0430\u043A\u0440\u044B\u0442\u044C ")))));
};
exports.default = CloseButton;
var styles = react_native_1.StyleSheet.create({
    root: {
        position: "absolute",
        top: -36,
        height: 36,
        right: 10,
        borderRadius: 18,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        backgroundColor: react_native_1.Platform.select({ ios: "transparent", default: "rgba(255, 255, 255, 1)" }),
        borderColor: "#eaeaea",
        borderWidth: react_native_1.StyleSheet.hairlineWidth,
        elevation: 5,
        shadowColor: 'black',
        shadowOpacity: .1,
        shadowRadius: 10,
    },
    icon: {
        width: 14,
        height: 14,
        resizeMode: "contain",
        tintColor: "#6b6b6b"
    }
});
