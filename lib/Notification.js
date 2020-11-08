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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var blur_1 = require("@react-native-community/blur");
var React = __importStar(require("react"));
var react_native_1 = require("react-native");
var react_native_gesture_handler_1 = require("react-native-gesture-handler");
var icons_1 = __importDefault(require("./icons"));
var screen = react_native_1.Dimensions.get("window");
var Notification = function (_a) {
    var title = _a.title, message = _a.message, data = _a.data, close = _a.close, type = _a.type, theme = _a.theme;
    var _b = React.useState(false), longMessage = _b[0], setState = _b[1];
    var _c = React.useState(""), loading = _c[0], setLoaderState = _c[1];
    var Container = react_native_1.Platform.OS === 'ios' ? blur_1.BlurView : react_native_1.View;
    var light = theme === "light" || !theme;
    var borderColor = React.useMemo(function () {
        if (light)
            return styles.borderColorlight;
        return styles.borderColordark;
    }, [theme]);
    var themeBlurStyle = React.useMemo(function () {
        if (light)
            return styles.blurlight;
        return styles.blurdark;
    }, [theme]);
    var themeText = React.useMemo(function () {
        if (light)
            return styles.textlight;
        return styles.textdark;
    }, [theme]);
    return (React.createElement(react_native_1.View, { style: { flex: 1, alignItems: "center" } },
        React.createElement(react_native_1.View, { style: [styles.root, borderColor] },
            React.createElement(Container, { style: [styles.blur, themeBlurStyle], blurType: light ? "xlight" : "dark" },
                React.createElement(react_native_1.View, { style: styles.main, collapsable: false },
                    type && React.createElement(react_native_1.View, { style: styles.iconContainer },
                        React.createElement(react_native_1.Image, { source: icons_1.default[type], style: { width: 30, height: 30, marginRight: 10, }, resizeMode: "contain" })),
                    (data === null || data === void 0 ? void 0 : data.icon) && React.createElement(react_native_1.Image, { source: data === null || data === void 0 ? void 0 : data.icon, style: styles.image }),
                    React.createElement(react_native_1.View, { style: [
                            styles.stretchContainer,
                            styles.messageContainer
                        ] },
                        React.createElement(react_native_1.Text, { allowFontScaling: false, numberOfLines: 2, style: [{ fontWeight: "bold" }, themeText] }, title),
                        React.createElement(react_native_1.Text, { allowFontScaling: false, style: themeText, onLayout: function (e) {
                                if ((e.nativeEvent.layout.height > 30)) {
                                    setState(true);
                                }
                            } }, message)),
                    ((data === null || data === void 0 ? void 0 : data.buttons) || []).map(function (_a, i) {
                        var title = _a.title, onPress = _a.onPress;
                        var key = typeof title === "string" ? title : String(i);
                        return (React.createElement(react_native_gesture_handler_1.TapGestureHandler, { key: key, onHandlerStateChange: function (e) { return __awaiter(void 0, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!(e.nativeEvent.state == react_native_gesture_handler_1.State.END && !loading)) return [3 /*break*/, 2];
                                            setLoaderState(key);
                                            return [4 /*yield*/, onPress()];
                                        case 1:
                                            _a.sent();
                                            close();
                                            _a.label = 2;
                                        case 2: return [2 /*return*/];
                                    }
                                });
                            }); } },
                            React.createElement(react_native_1.View, { style: [styles.button, borderColor] },
                                loading === key && React.createElement(react_native_1.ActivityIndicator, { size: "small", color: "gray", collapsable: false }),
                                loading !== key &&
                                    React.createElement(react_native_1.Text, { allowFontScaling: false, style: [{ opacity: loading ? .3 : 1 }, themeText] }, title))));
                    }))))));
};
exports.default = Notification;
function getContainerWidth() {
    if (screen.width < screen.height)
        return screen.width;
    return screen.height;
}
var styles = react_native_1.StyleSheet.create({
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
        borderColor: "#212121",
    },
    blur: {
        flex: 1,
        borderRadius: 14,
    },
    blurlight: {
        backgroundColor: react_native_1.Platform.select({ ios: "transparent", default: "white" })
    },
    blurdark: {
        backgroundColor: react_native_1.Platform.select({ ios: "transparent", default: "#1e1e1e" })
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
});
