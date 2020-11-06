import * as React from "react";
import { Dimensions, Platform, StyleSheet, Text, View, ViewStyle } from "react-native";
import { PanGestureHandler, State as GestureState, TapGestureHandler } from "react-native-gesture-handler";
import Animated, { add, block, call, Clock, cond, defined, Easing, eq, event, Extrapolate, interpolate, lessThan, min, multiply, set, stopClock, sub, timing, useValue, Value, not } from "react-native-reanimated";
import { runSpring } from "./animations";
import iPhoneHelper from "./iPhoneHelper";
import { CloseButtonProps, NotificationActions, NotificationParams, NotificationType } from "./types";
const screen = Dimensions.get("screen");

const TOSS_SEC = 5;
//const height = 100;
const offsetFullMode = 200;
//const fullHeight = offsetFullMode + height;

const topOffset = Platform.select({ ios: iPhoneHelper.isIphoneX() ? 45 : 20, default: 0 });

export type NotificationProps = {
    render?: (args: NotificationParams & NotificationActions) => React.ReactNode,
    //renderCloseButton?: (args: CloseButtonProps) => React.ReactNode,
    vibration?: boolean,
    showingCountInMoment?: number
}

const Notification: React.FC<NotificationParams & NotificationProps & {
    onClose: (height: number) => void,
    offset: number,
    id: string,
    onLayout: (height: number, setOffsetTop: (h: number) => void) => void,
}> = ({
    message,
    timeout,
    type,
    onClose,
    render,
    offset = 0,
    id,
    data,
    onPress,
    title,
    // renderCloseButton,
    onLayout,
}) => {

        const lastOffsetTop = React.useRef(0)
        const scale = useValue(1);
        const [height, setHeight] = React.useState(0);
        const fullHeight = offsetFullMode + height;
        // const heightAnimation = useValue(height);
        const [fullMode, setFullState] = React.useState(false);
        const fullState = useValue(0)

        const timer = React.useRef<any>(null);

        const dragY = useValue(0);
        const state = useValue(-1);


        const dragVY = useValue(0);

        const top = useValue(topOffset);

        const transY = new Value<number>(-screen.height);
        const prevDragY = new Value(0);

        const clock = React.useMemo(() => new Clock(), []);
        const clockHeight = React.useMemo(() => new Clock(), []);

        const wasDrag = useValue(0);

        const closedValue = (fullMode ? -fullHeight - (height * (offset + 1)) : -height * (offset + 1)) - topOffset;

        const snapPoint = React.useMemo(() => {
            return block([
                cond<number, number>(
                    lessThan(add(transY, multiply(TOSS_SEC, dragVY)), 0),
                    closedValue,
                    cond(fullState, 50, 0)
                )
            ]);
        }, [height])

        const close = React.useMemo(() => {
            return cond(lessThan(transY, -20), [
                call([], () => hideNotify())
            ])
        }, [])


        //         const setCloseVisible = React.useMemo(() => {
        //             return block([
        // //                cond(and(lessThan(dragY, offsetFullMode), greaterThan(dragY, 0), not(fullState)), set(heightAnimation, add(dragY, height))),
        //                 cond(and(greaterThan(dragY, offsetFullMode), not(fullState)), [
        //                     set(fullState, 1),
        //                     call([], () => { setFullState(true) })
        //                 ])
        //             ])
        //         }, [])

        const translateY = React.useMemo(() => cond(
            eq(state, GestureState.ACTIVE),
            [
                set(wasDrag, 1),
                stopClock(clock),
                set(transY, add(transY, sub(dragY, prevDragY))),
                //  setCloseVisible,
                // set(prevTanslateY, transY),
                set(prevDragY, dragY),

                transY,
            ],
            [
                cond(wasDrag, [
                    cond(lessThan(dragY, -20), call([], () => hideNotify())),
                    set(prevDragY, 0),
                    //cond(not(fullState), set(heightAnimation, runTiming(clockHeight)({ lastVal: heightAnimation, toValue: new Animated.Value(height), duration: 300 }))),
                    set(
                        transY,
                        cond(defined(transY), runSpring(clock, transY, dragVY, snapPoint, close), 0)
                    ),
                ], transY)
            ]
        ), [height])

        const closeNotify = () => {
            clearTimeout(timer.current);
            timing(transY, {
                duration: 250,
                toValue: closedValue,
                easing: Easing.ease
            }).start(() => { onClose(height) })
        }

        const hideNotify = () => {
            clearTimeout(timer.current);
            timing(scale, {
                duration: 250,
                toValue: 0,
                easing: Easing.ease
            }).start(() => { onClose(height) })
        }

        React.useEffect(() => {
            if (fullMode || !height) return;
            if (offset < 0) {
                hideNotify()
                return;
            }
        }, [offset, height])

        React.useEffect(() => {
            if (!height) return;
            if (!timer.current) {
                timer.current = setTimeout(closeNotify, timeout || 6000);
            }
            transY.setValue(-height);
            timing(transY, {
                duration: 250,
                toValue: 0,
                easing: Easing.ease
            }).start(() => { })
        }, [height])

        const onGestureEvent = event([
            { nativeEvent: { translationY: dragY, velocityY: dragVY, state: state } },
        ]);

        return (
            <PanGestureHandler
                onGestureEvent={onGestureEvent}
                onHandlerStateChange={onGestureEvent}
                activeOffsetY={[-15, 15]}
            >
                <Animated.Code>
                    {() =>
                        block([
                            eq(not(state), -1),
                            call([], () => clearTimeout(timer.current)),
                        ])
                    }
                </Animated.Code>
                <Animated.View
                    onLayout={(e) => {
                        if (!height) {
                            const { height } = e.nativeEvent.layout;
                            onLayout(height, (h) => {
                                timing(top, {
                                    duration: 250,
                                    toValue: lastOffsetTop.current + h + topOffset,
                                    easing: Easing.ease
                                }).start();
                                lastOffsetTop.current += h
                            });
                            setHeight(height);
                            transY.setValue(-height);
                        }
                    }}
                    style={[
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
                            top,
                            transform: [{ translateY, scale }],
                            // height: heightAnimation
                        }
                    ]}
                >
                    <TapGestureHandler
                        onHandlerStateChange={(e) => {
                            clearTimeout(timer.current)
                            if (e.nativeEvent.state === GestureState.END) {
                                onPress && onPress();
                                hideNotify();
                            }
                        }}
                        numberOfTaps={1}
                    >
                        <Animated.View
                            style={{ flex: 1 }}
                        >
                            {
                                !render &&
                                <View style={[
                                    type && styles[type],
                                    styles.notifyContainer,
                                    { height }
                                ]}>
                                    <Text style={{ color: "white", textAlign: "center" }}>
                                        {message}
                                    </Text>
                                </View>
                            }
                            {
                                !!render && render({
                                    message,
                                    timeout,
                                    type,
                                    data,
                                    close: hideNotify,
                                    title,
                                    //heightAnimation
                                })
                            }
                        </Animated.View>
                    </TapGestureHandler>
                    {/* {
                        renderCloseButton && renderCloseButton({
                            fullState,
                            onPress: (e) => {
                                clearTimeout(timer.current);
                                if (e.nativeEvent.state === GestureState.END) {
                                    hideNotify();
                                }
                            }
                        })
                    } */}
                </Animated.View>
            </PanGestureHandler>

        )
    }

export default Notification


const styles = StyleSheet.create<{
    root: ViewStyle,
    notifyContainer: ViewStyle,
    [NotificationType.error]: ViewStyle,
    [NotificationType.success]: ViewStyle,
    [NotificationType.info]: ViewStyle
}>({
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
})