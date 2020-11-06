import * as React from "react";
import Animated, { cond, Clock, Value } from "react-native-reanimated";
import { TapGestureHandler } from "react-native-gesture-handler";
import { View, StyleSheet, Image, Text, Platform } from "react-native";
import { BlurView } from "@react-native-community/blur";
import icons from "./icons";
import { runTiming } from "./animations";
var CloseButton = function (_a) {
    var fullState = _a.fullState, onPress = _a.onPress;
    var clock = React.useMemo(function () { return new Clock(); }, []);
    var Container = Platform.OS === 'ios' ? BlurView : View;
    return (React.createElement(Animated.View, { style: [
            styles.root,
            {
                opacity: cond(fullState, runTiming(clock)({ duration: 300, toValue: new Value(1), lastVal: new Value(0) }), 0),
            }
        ] },
        React.createElement(TapGestureHandler, { onHandlerStateChange: onPress, numberOfTaps: 1 },
            React.createElement(Container, { style: { flex: 1, flexDirection: "row", paddingHorizontal: 10, alignItems: "center" }, blurType: "xlight" },
                React.createElement(Image, { source: icons.close, style: styles.icon }),
                React.createElement(Text, { allowFontScaling: false, style: { color: "#4b4b4b", marginLeft: 2 } }, " \u0417\u0430\u043A\u0440\u044B\u0442\u044C ")))));
};
export default CloseButton;
var styles = StyleSheet.create({
    root: {
        position: "absolute",
        top: -36,
        height: 36,
        right: 10,
        borderRadius: 18,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        backgroundColor: Platform.select({ ios: "transparent", default: "rgba(255, 255, 255, 1)" }),
        borderColor: "#eaeaea",
        borderWidth: StyleSheet.hairlineWidth,
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
