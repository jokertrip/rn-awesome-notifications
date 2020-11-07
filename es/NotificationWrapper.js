import * as React from "react";
import { Dimensions, Platform, StyleSheet, Text, View } from "react-native";
import { PanGestureHandler, State as GestureState, TapGestureHandler } from "react-native-gesture-handler";
import Animated, { add, block, call, Clock, cond, defined, Easing, eq, event, Extrapolate, interpolate, lessThan, min, multiply, set, stopClock, sub, timing, useValue, Value, not } from "react-native-reanimated";
import { runSpring } from "./animations";
import iPhoneHelper from "./iPhoneHelper";
import { NotificationType } from "./types";
var screen = Dimensions.get("screen");
var TOSS_SEC = 5;
//const height = 100;
var offsetFullMode = 200;
//const fullHeight = offsetFullMode + height;
var topOffset = Platform.select({ ios: iPhoneHelper.isIphoneX() ? 45 : 20, default: 0 });
var Notification = function (_a) {
    var message = _a.message, timeout = _a.timeout, type = _a.type, onClose = _a.onClose, render = _a.render, _b = _a.offset, offset = _b === void 0 ? 0 : _b, id = _a.id, data = _a.data, onPress = _a.onPress, title = _a.title, 
    // renderCloseButton,
    onLayout = _a.onLayout;
    var lastOffsetTop = React.useRef(0);
    var scale = useValue(1);
    var _c = React.useState(0), height = _c[0], setHeight = _c[1];
    var fullHeight = offsetFullMode + height;
    // const heightAnimation = useValue(height);
    var _d = React.useState(false), fullMode = _d[0], setFullState = _d[1];
    var fullState = useValue(0);
    var timer = React.useRef(null);
    var dragY = useValue(0);
    var state = useValue(-1);
    var dragVY = useValue(0);
    var top = useValue(topOffset);
    var transY = new Value(-screen.height);
    var prevDragY = new Value(0);
    var clock = React.useMemo(function () { return new Clock(); }, []);
    var clockHeight = React.useMemo(function () { return new Clock(); }, []);
    var wasDrag = useValue(0);
    var closedValue = (fullMode ? -fullHeight - (height * (offset + 1)) : -height * (offset + 1)) - topOffset;
    var snapPoint = React.useMemo(function () {
        return block([
            cond(lessThan(add(transY, multiply(TOSS_SEC, dragVY)), 0), closedValue, cond(fullState, 50, 0))
        ]);
    }, [height]);
    var close = React.useMemo(function () {
        return cond(lessThan(transY, -20), [
            call([], function () { return hideNotify(); })
        ]);
    }, []);
    //         const setCloseVisible = React.useMemo(() => {
    //             return block([
    // //                cond(and(lessThan(dragY, offsetFullMode), greaterThan(dragY, 0), not(fullState)), set(heightAnimation, add(dragY, height))),
    //                 cond(and(greaterThan(dragY, offsetFullMode), not(fullState)), [
    //                     set(fullState, 1),
    //                     call([], () => { setFullState(true) })
    //                 ])
    //             ])
    //         }, [])
    var translateY = React.useMemo(function () { return cond(eq(state, GestureState.ACTIVE), [
        set(wasDrag, 1),
        stopClock(clock),
        set(transY, add(transY, sub(dragY, prevDragY))),
        //  setCloseVisible,
        // set(prevTanslateY, transY),
        set(prevDragY, dragY),
        transY,
    ], [
        cond(wasDrag, [
            cond(lessThan(dragY, -20), call([], function () { return hideNotify(); })),
            set(prevDragY, 0),
            //cond(not(fullState), set(heightAnimation, runTiming(clockHeight)({ lastVal: heightAnimation, toValue: new Animated.Value(height), duration: 300 }))),
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
                    eq(not(state), -1),
                    call([], function () { return clearTimeout(timer.current); }),
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
                        React.createElement(View, { style: [
                                type && styles[type],
                                styles.notifyContainer,
                                { height: height }
                            ] },
                            React.createElement(Text, { style: { color: "white", textAlign: "center" } }, message)),
                    !!render && render({
                        message: message,
                        timeout: timeout,
                        type: type,
                        data: data,
                        close: hideNotify,
                        title: title,
                    }))))));
};
export default Notification;
var styles = StyleSheet.create({
    root: {
        paddingTop: 5,
        position: "absolute",
        top: 0,
        width: "100%",
    },
    error: {
        backgroundColor: "red",
    },
    success: {
        backgroundColor: "green",
    },
    info: {
        backgroundColor: "blue",
    },
    notifyContainer: {
        flex: 1,
        paddingVertical: 20,
        paddingHorizontal: 20
    }
});
