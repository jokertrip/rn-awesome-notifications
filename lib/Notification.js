"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
const blur_1 = require("@react-native-community/blur");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_native_gesture_handler_1 = require("react-native-gesture-handler");
const react_native_reanimated_1 = __importDefault(require("react-native-reanimated"));
const icons_1 = __importDefault(require("./icons"));
const screen = react_native_1.Dimensions.get("window");
const Notification = ({ title, message, data, close, type, theme, opacity }) => {
    const [longMessage, setState] = React.useState(false);
    const [loading, setLoaderState] = React.useState("");
    const Container = react_native_1.Platform.OS === 'ios' ? blur_1.BlurView : react_native_1.View;
    const light = theme === "light" || !theme;
    const borderColor = React.useMemo(() => {
        if (light)
            return styles.borderColorlight;
        return styles.borderColordark;
    }, [theme]);
    const themeBlurStyle = React.useMemo(() => {
        if (light)
            return styles.blurlight;
        return styles.blurdark;
    }, [theme]);
    const themeText = React.useMemo(() => {
        if (light)
            return styles.textlight;
        return styles.textdark;
    }, [theme]);
    return (React.createElement(react_native_1.View, { style: { flex: 1, alignItems: "center" } },
        React.createElement(react_native_reanimated_1.default.View, { style: [styles.root, borderColor, react_native_1.Platform.OS === "android" && { opacity }] },
            React.createElement(Container, { style: [styles.blur, themeBlurStyle], blurType: light ? "xlight" : "dark" },
                React.createElement(react_native_1.View, { style: styles.main, collapsable: false },
                    type && React.createElement(react_native_1.View, { style: styles.iconContainer },
                        React.createElement(react_native_1.Image, { source: icons_1.default[type], style: { width: 30, height: 30, marginRight: 10, }, resizeMode: "contain" })),
                    data?.icon && React.createElement(react_native_1.Image, { source: data?.icon, style: styles.image }),
                    React.createElement(react_native_1.View, { style: [
                            styles.stretchContainer,
                            styles.messageContainer
                        ] },
                        React.createElement(react_native_1.Text, { allowFontScaling: false, numberOfLines: 2, style: [{ fontWeight: "bold" }, themeText] }, title),
                        React.createElement(react_native_1.Text, { allowFontScaling: false, style: themeText, onLayout: (e) => {
                                if ((e.nativeEvent.layout.height > 30)) {
                                    setState(true);
                                }
                            } }, message)),
                    (data?.buttons || []).map(({ title, icon, onPress, titleStyle }, i) => {
                        const key = typeof title === "string" ? title : String(i);
                        return (React.createElement(react_native_gesture_handler_1.TapGestureHandler, { key: key, onHandlerStateChange: async (e) => {
                                if (e.nativeEvent.state == react_native_gesture_handler_1.State.END && !loading) {
                                    setLoaderState(key);
                                    await onPress();
                                    close();
                                }
                            } },
                            React.createElement(react_native_1.View, { style: [styles.button, borderColor] },
                                loading === key && React.createElement(react_native_1.ActivityIndicator, { size: "small", color: "gray", collapsable: false }),
                                loading !== key &&
                                    !!title &&
                                    React.createElement(react_native_1.Text, { allowFontScaling: false, style: [{ opacity: loading ? .3 : 1, textAlign: "center" }, themeText, titleStyle] }, title),
                                loading !== key &&
                                    !!icon &&
                                    React.createElement(react_native_1.View, { style: styles.buttonIconContainer },
                                        React.createElement(react_native_1.Image, { source: icon, style: styles.icon })))));
                    }))))));
};
exports.default = Notification;
function getContainerWidth() {
    if (screen.width < screen.height)
        return screen.width;
    return screen.height;
}
const styles = react_native_1.StyleSheet.create({
    root: {
        flex: 1,
        borderWidth: react_native_1.StyleSheet.hairlineWidth,
        elevation: 5,
        borderRadius: 14,
        shadowColor: 'black',
        shadowOpacity: .1,
        shadowRadius: 10,
        width: getContainerWidth() - 20
    },
    borderColorlight: {
        borderColor: "#eaeaea",
    },
    borderColordark: {
        borderColor: react_native_1.Platform.select({ ios: "#4f4f4f", default: "#5a5a5a" }),
    },
    blur: {
        flex: 1,
        borderRadius: 14,
    },
    blurlight: {
        backgroundColor: react_native_1.Platform.select({ ios: "transparent", default: "white" })
    },
    blurdark: {
        backgroundColor: react_native_1.Platform.select({ ios: "transparent", default: "#313131" })
    },
    main: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
    },
    button: {
        borderLeftWidth: react_native_1.StyleSheet.hairlineWidth,
        alignSelf: 'stretch',
        justifyContent: "center",
        paddingLeft: 10,
        width: 80
    },
    stretchContainer: {
        alignSelf: 'stretch',
    },
    messageContainer: {
        flex: 1,
        paddingVertical: 10,
        paddingRight: 10,
        justifyContent: "center"
    },
    image: {
        width: 60,
        height: 60,
        marginRight: 10,
        borderRadius: 10,
        resizeMode: "cover"
    },
    iconContainer: {
        width: 60,
        height: 60,
        alignItems: "center",
        justifyContent: "center"
    },
    textlight: { color: "#4b4b4b" },
    textdark: { color: "#ccc" },
    icon: {
        width: 30,
        height: 30,
        resizeMode: "contain"
    },
    buttonIconContainer: { flex: 1, alignItems: "center", justifyContent: "center" }
});
