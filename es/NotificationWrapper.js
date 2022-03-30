import * as React from "react";
import { Dimensions, Platform, StyleSheet } from "react-native";
import { PanGestureHandler, State as GestureState, TapGestureHandler } from "react-native-gesture-handler";
import Animated, { add, and, block, call, Clock, cond, defined, EasingNode, eq, event, Extrapolate, interpolateNode, lessThan, min, multiply, not, set, stopClock, sub, timing, useValue, Value } from "react-native-reanimated";
import { runSpring } from "./animations";
import iPhoneHelper from "./iPhoneHelper";
import DefaultNotification from "./Notification";
const screen = Dimensions.get("screen");
const TOSS_SEC = 5;
const offsetFullMode = 200;
const topOffset = Platform.select({ ios: iPhoneHelper.isIphoneX() ? 40 : 20, default: 0 });
const Notification = ({ message, timeout, type, onClose, render, offset = 0, theme, data, onPress, title, onLayout, offsetTop }) => {
    const lastOffsetTop = React.useRef(0);
    const scale = useValue(1);
    const [height, setHeight] = React.useState(0);
    const fullHeight = offsetFullMode + height;
    const [fullMode, setFullState] = React.useState(false);
    const fullState = useValue(0);
    const timer = React.useRef(null);
    const dragY = useValue(0);
    const state = useValue(-1);
    const lastState = useValue(-1);
    const dragVY = useValue(0);
    const finalOffsetTop = topOffset + (offsetTop || 0);
    const top = useValue(finalOffsetTop);
    const transY = new Value(-screen.height);
    const prevDragY = new Value(0);
    const clock = React.useMemo(() => new Clock(), []);
    const wasDrag = useValue(0);
    const closedValue = (fullMode ? -fullHeight - (height * (offset + 1)) : -height * (offset + 1)) - finalOffsetTop;
    const snapPoint = React.useMemo(() => {
        return block([
            cond(lessThan(add(transY, multiply(TOSS_SEC, dragVY)), 0), closedValue, cond(fullState, 50, 0))
        ]);
    }, [height]);
    const close = React.useMemo(() => {
        return block([]);
    }, []);
    const translateY = React.useMemo(() => cond(eq(state, GestureState.ACTIVE), [
        set(wasDrag, 1),
        stopClock(clock),
        set(transY, add(transY, sub(dragY, prevDragY))),
        set(prevDragY, dragY),
        transY,
    ], [
        cond(wasDrag, [
            cond(lessThan(dragY, -20), call([], () => hideNotify())),
            set(prevDragY, 0),
            set(transY, cond(defined(transY), runSpring(clock, transY, dragVY, snapPoint, close), 0)),
        ], transY)
    ]), [height]);
    const closeNotify = () => {
        clearTimeout(timer.current);
        timing(transY, {
            duration: 250,
            toValue: closedValue,
            easing: EasingNode.ease
        }).start(() => { onClose(height); });
    };
    const hideNotify = () => {
        clearTimeout(timer.current);
        timing(scale, {
            duration: 250,
            toValue: 0,
            easing: EasingNode.ease
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
        timing(transY, {
            duration: 250,
            toValue: 0,
            easing: EasingNode.ease
        }).start(() => { });
    }, [height]);
    const onGestureEvent = event([
        { nativeEvent: { translationY: dragY, velocityY: dragVY, state: state } },
    ]);
    const opacity = min(interpolateNode(scale, {
        inputRange: Platform.select({ ios: [.7, 1], default: [-1, 1] }),
        outputRange: [0, 1],
    }), interpolateNode(translateY, {
        inputRange: [-height, 0],
        outputRange: [0, 1],
        extrapolate: Extrapolate.CLAMP
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
    return (React.createElement(PanGestureHandler, { onGestureEvent: onGestureEvent, onHandlerStateChange: onGestureEvent, activeOffsetY: [-15, 15] },
        React.createElement(Animated.View, { onLayout: (e) => {
                if (!height) {
                    const { height } = e.nativeEvent.layout;
                    onLayout(height, (h) => {
                        timing(top, {
                            duration: 250,
                            toValue: lastOffsetTop.current + h + finalOffsetTop,
                            easing: EasingNode.ease
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
            React.createElement(Animated.Code, null, () => block([
                cond(and(not(eq(state, -1)), eq(lastState, -1)), [
                    call([], () => clearTimeout(timer.current)),
                    set(lastState, state)
                ])
            ])),
            React.createElement(TapGestureHandler, { onHandlerStateChange: (e) => {
                    clearTimeout(timer.current);
                    if (e.nativeEvent.state === GestureState.END) {
                        onPress && onPress();
                        hideNotify();
                    }
                }, numberOfTaps: 1 },
                React.createElement(Animated.View, { style: { flex: 1 } },
                    !render &&
                        React.createElement(DefaultNotification, { ...renderNotifyProps }),
                    !!render && render(renderNotifyProps))))));
};
export default Notification;
const styles = StyleSheet.create({
    root: {
        paddingTop: 5,
        position: "absolute",
        top: 0,
        width: "100%",
    },
});
