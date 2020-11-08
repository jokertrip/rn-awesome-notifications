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
import { Dimensions, Platform, StyleSheet } from "react-native";
import { PanGestureHandler, State as GestureState, TapGestureHandler } from "react-native-gesture-handler";
import Animated, { add, and, block, call, Clock, cond, defined, Easing, eq, event, Extrapolate, interpolate, lessThan, min, multiply, not, set, stopClock, sub, timing, useValue, Value } from "react-native-reanimated";
import { runSpring } from "./animations";
import iPhoneHelper from "./iPhoneHelper";
import DefaultNotification from "./Notification";
var screen = Dimensions.get("screen");
var TOSS_SEC = 5;
var offsetFullMode = 200;
var topOffset = Platform.select({ ios: iPhoneHelper.isIphoneX() ? 40 : 20, default: 0 });
var Notification = function (_a) {
    var message = _a.message, timeout = _a.timeout, type = _a.type, onClose = _a.onClose, render = _a.render, _b = _a.offset, offset = _b === void 0 ? 0 : _b, theme = _a.theme, data = _a.data, onPress = _a.onPress, title = _a.title, onLayout = _a.onLayout;
    var lastOffsetTop = React.useRef(0);
    var scale = useValue(1);
    var _c = React.useState(0), height = _c[0], setHeight = _c[1];
    var fullHeight = offsetFullMode + height;
    var _d = React.useState(false), fullMode = _d[0], setFullState = _d[1];
    var fullState = useValue(0);
    var timer = React.useRef(null);
    var dragY = useValue(0);
    var state = useValue(-1);
    var lastState = useValue(-1);
    var dragVY = useValue(0);
    var top = useValue(topOffset);
    var transY = new Value(-screen.height);
    var prevDragY = new Value(0);
    var clock = React.useMemo(function () { return new Clock(); }, []);
    var wasDrag = useValue(0);
    var closedValue = (fullMode ? -fullHeight - (height * (offset + 1)) : -height * (offset + 1)) - topOffset;
    var snapPoint = React.useMemo(function () {
        return block([
            cond(lessThan(add(transY, multiply(TOSS_SEC, dragVY)), 0), closedValue, cond(fullState, 50, 0))
        ]);
    }, [height]);
    var close = React.useMemo(function () {
        return block([]);
    }, []);
    var translateY = React.useMemo(function () { return cond(eq(state, GestureState.ACTIVE), [
        set(wasDrag, 1),
        stopClock(clock),
        set(transY, add(transY, sub(dragY, prevDragY))),
        set(prevDragY, dragY),
        transY,
    ], [
        cond(wasDrag, [
            cond(lessThan(dragY, -20), call([], function () { return hideNotify(); })),
            set(prevDragY, 0),
            set(transY, cond(defined(transY), runSpring(clock, transY, dragVY, snapPoint, close), 0)),
        ], transY)
    ]); }, [height]);
    var closeNotify = function () {
        clearTimeout(timer.current);
        timing(transY, {
            duration: 250,
            toValue: closedValue,
            easing: Easing.ease
        }).start(function () { onClose(height); });
    };
    var hideNotify = function () {
        clearTimeout(timer.current);
        timing(scale, {
            duration: 250,
            toValue: 0,
            easing: Easing.ease
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
        timing(transY, {
            duration: 250,
            toValue: 0,
            easing: Easing.ease
        }).start(function () { });
    }, [height]);
    var onGestureEvent = event([
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
    return (React.createElement(PanGestureHandler, { onGestureEvent: onGestureEvent, onHandlerStateChange: onGestureEvent, activeOffsetY: [-15, 15] },
        React.createElement(Animated.View, { onLayout: function (e) {
                if (!height) {
                    var height_1 = e.nativeEvent.layout.height;
                    onLayout(height_1, function (h) {
                        timing(top, {
                            duration: 250,
                            toValue: lastOffsetTop.current + h + topOffset,
                            easing: Easing.ease
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
                    opacity: min(interpolate(scale, {
                        inputRange: Platform.select({ ios: [.7, 1], default: [-1, 1] }),
                        outputRange: [0, 1],
                    }), interpolate(translateY, {
                        inputRange: [-height, 0],
                        outputRange: [0, 1],
                        extrapolate: Extrapolate.CLAMP
                    })),
                    top: top,
                    transform: [{ translateY: translateY, scale: scale }],
                }
            ] },
            React.createElement(Animated.Code, null, function () {
                return block([
                    cond(and(not(eq(state, -1)), eq(lastState, -1)), [
                        call([], function () { return clearTimeout(timer.current); }),
                        set(lastState, state)
                    ])
                ]);
            }),
            React.createElement(TapGestureHandler, { onHandlerStateChange: function (e) {
                    clearTimeout(timer.current);
                    if (e.nativeEvent.state === GestureState.END) {
                        onPress && onPress();
                        hideNotify();
                    }
                }, numberOfTaps: 1 },
                React.createElement(Animated.View, { style: { flex: 1 } },
                    !render &&
                        React.createElement(DefaultNotification, __assign({}, renderNotifyProps)),
                    !!render && render(renderNotifyProps))))));
};
export default Notification;
var styles = StyleSheet.create({
    root: {
        paddingTop: 5,
        position: "absolute",
        top: 0,
        width: "100%",
    },
});
