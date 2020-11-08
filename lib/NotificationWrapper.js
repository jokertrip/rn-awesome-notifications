"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var react_native_1 = require("react-native");
var react_native_gesture_handler_1 = require("react-native-gesture-handler");
var react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
var animations_1 = require("./animations");
var iPhoneHelper_1 = __importDefault(require("./iPhoneHelper"));
var Notification_1 = __importDefault(require("./Notification"));
var screen = react_native_1.Dimensions.get("screen");
var TOSS_SEC = 5;
var offsetFullMode = 200;
var topOffset = react_native_1.Platform.select({ ios: iPhoneHelper_1.default.isIphoneX() ? 40 : 20, default: 0 });
var Notification = function (_a) {
    var message = _a.message, timeout = _a.timeout, type = _a.type, onClose = _a.onClose, render = _a.render, _b = _a.offset, offset = _b === void 0 ? 0 : _b, theme = _a.theme, data = _a.data, onPress = _a.onPress, title = _a.title, onLayout = _a.onLayout;
    var lastOffsetTop = React.useRef(0);
    var scale = react_native_reanimated_1.useValue(1);
    var _c = React.useState(0), height = _c[0], setHeight = _c[1];
    var fullHeight = offsetFullMode + height;
    var _d = React.useState(false), fullMode = _d[0], setFullState = _d[1];
    var fullState = react_native_reanimated_1.useValue(0);
    var timer = React.useRef(null);
    var dragY = react_native_reanimated_1.useValue(0);
    var state = react_native_reanimated_1.useValue(-1);
    var lastState = react_native_reanimated_1.useValue(-1);
    var dragVY = react_native_reanimated_1.useValue(0);
    var top = react_native_reanimated_1.useValue(topOffset);
    var transY = new react_native_reanimated_1.Value(-screen.height);
    var prevDragY = new react_native_reanimated_1.Value(0);
    var clock = React.useMemo(function () { return new react_native_reanimated_1.Clock(); }, []);
    var wasDrag = react_native_reanimated_1.useValue(0);
    var closedValue = (fullMode ? -fullHeight - (height * (offset + 1)) : -height * (offset + 1)) - topOffset;
    var snapPoint = React.useMemo(function () {
        return react_native_reanimated_1.block([
            react_native_reanimated_1.cond(react_native_reanimated_1.lessThan(react_native_reanimated_1.add(transY, react_native_reanimated_1.multiply(TOSS_SEC, dragVY)), 0), closedValue, react_native_reanimated_1.cond(fullState, 50, 0))
        ]);
    }, [height]);
    var close = React.useMemo(function () {
        return react_native_reanimated_1.block([]);
    }, []);
    var translateY = React.useMemo(function () { return react_native_reanimated_1.cond(react_native_reanimated_1.eq(state, react_native_gesture_handler_1.State.ACTIVE), [
        react_native_reanimated_1.set(wasDrag, 1),
        react_native_reanimated_1.stopClock(clock),
        react_native_reanimated_1.set(transY, react_native_reanimated_1.add(transY, react_native_reanimated_1.sub(dragY, prevDragY))),
        react_native_reanimated_1.set(prevDragY, dragY),
        transY,
    ], [
        react_native_reanimated_1.cond(wasDrag, [
            react_native_reanimated_1.cond(react_native_reanimated_1.lessThan(dragY, -20), react_native_reanimated_1.call([], function () { return hideNotify(); })),
            react_native_reanimated_1.set(prevDragY, 0),
            react_native_reanimated_1.set(transY, react_native_reanimated_1.cond(react_native_reanimated_1.defined(transY), animations_1.runSpring(clock, transY, dragVY, snapPoint, close), 0)),
        ], transY)
    ]); }, [height]);
    var closeNotify = function () {
        clearTimeout(timer.current);
        react_native_reanimated_1.timing(transY, {
            duration: 250,
            toValue: closedValue,
            easing: react_native_reanimated_1.Easing.ease
        }).start(function () { onClose(height); });
    };
    var hideNotify = function () {
        clearTimeout(timer.current);
        react_native_reanimated_1.timing(scale, {
            duration: 250,
            toValue: 0,
            easing: react_native_reanimated_1.Easing.ease
        }).start(function () { onClose(height); });
    };
    React.useEffect(function () {
        if (fullMode || !height)
            return;
        if (offset < 0) {
            hideNotify();
            return;
        }
    }, [offset, height]);
    React.useEffect(function () {
        if (!height)
            return;
        if (!timer.current) {
            timer.current = setTimeout(closeNotify, timeout || 6000);
        }
        transY.setValue(-height);
        react_native_reanimated_1.timing(transY, {
            duration: 250,
            toValue: 0,
            easing: react_native_reanimated_1.Easing.ease
        }).start(function () { });
    }, [height]);
    var onGestureEvent = react_native_reanimated_1.event([
        { nativeEvent: { translationY: dragY, velocityY: dragVY, state: state } },
    ]);
    var renderNotifyProps = {
        message: message,
        timeout: timeout,
        type: type,
        data: data,
        close: hideNotify,
        title: title,
        theme: theme
    };
    return (React.createElement(react_native_gesture_handler_1.PanGestureHandler, { onGestureEvent: onGestureEvent, onHandlerStateChange: onGestureEvent, activeOffsetY: [-15, 15] },
        React.createElement(react_native_reanimated_1.default.View, { onLayout: function (e) {
                if (!height) {
                    var height_1 = e.nativeEvent.layout.height;
                    onLayout(height_1, function (h) {
                        react_native_reanimated_1.timing(top, {
                            duration: 250,
                            toValue: lastOffsetTop.current + h + topOffset,
                            easing: react_native_reanimated_1.Easing.ease
                        }).start();
                        lastOffsetTop.current += h;
                    });
                    setHeight(height_1);
                    transY.setValue(-height_1);
                }
            }, style: [
                styles.root,
                !height && { opacity: 0 },
                //@ts-ignore
                {
                    opacity: react_native_reanimated_1.min(react_native_reanimated_1.interpolate(scale, {
                        inputRange: react_native_1.Platform.select({ ios: [.7, 1], default: [-1, 1] }),
                        outputRange: [0, 1],
                    }), react_native_reanimated_1.interpolate(translateY, {
                        inputRange: [-height, 0],
                        outputRange: [0, 1],
                        extrapolate: react_native_reanimated_1.Extrapolate.CLAMP
                    })),
                    top: top,
                    transform: [{ translateY: translateY, scale: scale }],
                }
            ] },
            React.createElement(react_native_reanimated_1.default.Code, null, function () {
                return react_native_reanimated_1.block([
                    react_native_reanimated_1.cond(react_native_reanimated_1.and(react_native_reanimated_1.not(react_native_reanimated_1.eq(state, -1)), react_native_reanimated_1.eq(lastState, -1)), [
                        react_native_reanimated_1.call([], function () { return clearTimeout(timer.current); }),
                        react_native_reanimated_1.set(lastState, state)
                    ])
                ]);
            }),
            React.createElement(react_native_gesture_handler_1.TapGestureHandler, { onHandlerStateChange: function (e) {
                    clearTimeout(timer.current);
                    if (e.nativeEvent.state === react_native_gesture_handler_1.State.END) {
                        onPress && onPress();
                        hideNotify();
                    }
                }, numberOfTaps: 1 },
                React.createElement(react_native_reanimated_1.default.View, { style: { flex: 1 } },
                    !render &&
                        React.createElement(Notification_1.default, __assign({}, renderNotifyProps)),
                    !!render && render(renderNotifyProps))))));
};
exports.default = Notification;
var styles = react_native_1.StyleSheet.create({
    root: {
        paddingTop: 5,
        position: "absolute",
        top: 0,
        width: "100%",
    },
});
