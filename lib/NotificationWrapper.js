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
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_native_gesture_handler_1 = require("react-native-gesture-handler");
const react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
const animations_1 = require("./animations");
const iPhoneHelper_1 = __importDefault(require("./iPhoneHelper"));
const Notification_1 = __importDefault(require("./Notification"));
const screen = react_native_1.Dimensions.get("screen");
const TOSS_SEC = 5;
const offsetFullMode = 200;
const topOffset = react_native_1.Platform.select({ ios: iPhoneHelper_1.default.isIphoneX() ? 40 : 20, default: 0 });
const Notification = ({ message, timeout, type, onClose, render, offset = 0, theme, data, onPress, title, onLayout, offsetTop }) => {
    const lastOffsetTop = React.useRef(0);
    const scale = (0, react_native_reanimated_1.useValue)(1);
    const [height, setHeight] = React.useState(0);
    const fullHeight = offsetFullMode + height;
    const [fullMode, setFullState] = React.useState(false);
    const fullState = (0, react_native_reanimated_1.useValue)(0);
    const timer = React.useRef(null);
    const dragY = (0, react_native_reanimated_1.useValue)(0);
    const state = (0, react_native_reanimated_1.useValue)(-1);
    const lastState = (0, react_native_reanimated_1.useValue)(-1);
    const dragVY = (0, react_native_reanimated_1.useValue)(0);
    const finalOffsetTop = topOffset + (offsetTop || 0);
    const top = (0, react_native_reanimated_1.useValue)(finalOffsetTop);
    const transY = new react_native_reanimated_1.Value(-screen.height);
    const prevDragY = new react_native_reanimated_1.Value(0);
    const clock = React.useMemo(() => new react_native_reanimated_1.Clock(), []);
    const wasDrag = (0, react_native_reanimated_1.useValue)(0);
    const closedValue = (fullMode ? -fullHeight - (height * (offset + 1)) : -height * (offset + 1)) - finalOffsetTop;
    const snapPoint = React.useMemo(() => {
        return (0, react_native_reanimated_1.block)([
            (0, react_native_reanimated_1.cond)((0, react_native_reanimated_1.lessThan)((0, react_native_reanimated_1.add)(transY, (0, react_native_reanimated_1.multiply)(TOSS_SEC, dragVY)), 0), closedValue, (0, react_native_reanimated_1.cond)(fullState, 50, 0))
        ]);
    }, [height]);
    const close = React.useMemo(() => {
        return (0, react_native_reanimated_1.block)([]);
    }, []);
    const translateY = React.useMemo(() => (0, react_native_reanimated_1.cond)((0, react_native_reanimated_1.eq)(state, react_native_gesture_handler_1.State.ACTIVE), [
        (0, react_native_reanimated_1.set)(wasDrag, 1),
        (0, react_native_reanimated_1.stopClock)(clock),
        (0, react_native_reanimated_1.set)(transY, (0, react_native_reanimated_1.add)(transY, (0, react_native_reanimated_1.sub)(dragY, prevDragY))),
        (0, react_native_reanimated_1.set)(prevDragY, dragY),
        transY,
    ], [
        (0, react_native_reanimated_1.cond)(wasDrag, [
            (0, react_native_reanimated_1.cond)((0, react_native_reanimated_1.lessThan)(dragY, -20), (0, react_native_reanimated_1.call)([], () => hideNotify())),
            (0, react_native_reanimated_1.set)(prevDragY, 0),
            (0, react_native_reanimated_1.set)(transY, (0, react_native_reanimated_1.cond)((0, react_native_reanimated_1.defined)(transY), (0, animations_1.runSpring)(clock, transY, dragVY, snapPoint, close), 0)),
        ], transY)
    ]), [height]);
    const closeNotify = () => {
        clearTimeout(timer.current);
        (0, react_native_reanimated_1.timing)(transY, {
            duration: 250,
            toValue: closedValue,
            easing: react_native_reanimated_1.EasingNode.ease
        }).start(() => { onClose(height); });
    };
    const hideNotify = () => {
        clearTimeout(timer.current);
        (0, react_native_reanimated_1.timing)(scale, {
            duration: 250,
            toValue: 0,
            easing: react_native_reanimated_1.EasingNode.ease
        }).start(() => { onClose(height); });
    };
    React.useEffect(() => {
        if (fullMode || !height)
            return;
        if (offset < 0) {
            hideNotify();
            return;
        }
    }, [offset, height]);
    React.useEffect(() => {
        if (!height)
            return;
        if (!timer.current) {
            timer.current = setTimeout(closeNotify, timeout || 6000);
        }
        transY.setValue(-height);
        (0, react_native_reanimated_1.timing)(transY, {
            duration: 250,
            toValue: 0,
            easing: react_native_reanimated_1.EasingNode.ease
        }).start(() => { });
    }, [height]);
    const onGestureEvent = (0, react_native_reanimated_1.event)([
        { nativeEvent: { translationY: dragY, velocityY: dragVY, state: state } },
    ]);
    const opacity = (0, react_native_reanimated_1.min)((0, react_native_reanimated_1.interpolateNode)(scale, {
        inputRange: react_native_1.Platform.select({ ios: [.7, 1], default: [-1, 1] }),
        outputRange: [0, 1],
    }), (0, react_native_reanimated_1.interpolateNode)(translateY, {
        inputRange: [-height, 0],
        outputRange: [0, 1],
        extrapolate: react_native_reanimated_1.Extrapolate.CLAMP
    }));
    const renderNotifyProps = {
        message,
        timeout,
        type,
        data,
        close: hideNotify,
        title,
        theme,
        opacity
    };
    return (React.createElement(react_native_gesture_handler_1.PanGestureHandler, { onGestureEvent: onGestureEvent, onHandlerStateChange: onGestureEvent, activeOffsetY: [-15, 15] },
        React.createElement(react_native_reanimated_1.default.View, { onLayout: (e) => {
                if (!height) {
                    const { height } = e.nativeEvent.layout;
                    onLayout(height, (h) => {
                        (0, react_native_reanimated_1.timing)(top, {
                            duration: 250,
                            toValue: lastOffsetTop.current + h + finalOffsetTop,
                            easing: react_native_reanimated_1.EasingNode.ease
                        }).start();
                        lastOffsetTop.current += h;
                    });
                    setHeight(height);
                    transY.setValue(-height);
                }
            }, style: [
                styles.root,
                !height && { opacity: 0 },
                //@ts-ignore
                {
                    opacity,
                    top,
                    transform: [{ translateY, scale }],
                }
            ] },
            React.createElement(react_native_reanimated_1.default.Code, null, () => (0, react_native_reanimated_1.block)([
                (0, react_native_reanimated_1.cond)((0, react_native_reanimated_1.and)((0, react_native_reanimated_1.not)((0, react_native_reanimated_1.eq)(state, -1)), (0, react_native_reanimated_1.eq)(lastState, -1)), [
                    (0, react_native_reanimated_1.call)([], () => clearTimeout(timer.current)),
                    (0, react_native_reanimated_1.set)(lastState, state)
                ])
            ])),
            React.createElement(react_native_gesture_handler_1.TapGestureHandler, { onHandlerStateChange: (e) => {
                    clearTimeout(timer.current);
                    if (e.nativeEvent.state === react_native_gesture_handler_1.State.END) {
                        onPress && onPress();
                        hideNotify();
                    }
                }, numberOfTaps: 1 },
                React.createElement(react_native_reanimated_1.default.View, { style: { flex: 1 } },
                    !render &&
                        React.createElement(Notification_1.default, { ...renderNotifyProps }),
                    !!render && render(renderNotifyProps))))));
};
exports.default = Notification;
const styles = react_native_1.StyleSheet.create({
    root: {
        paddingTop: 5,
        position: "absolute",
        top: 0,
        width: "100%",
    },
});
