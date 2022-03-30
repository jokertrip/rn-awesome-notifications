import { BlurView } from "@react-native-community/blur";
import * as React from "react";
import { ActivityIndicator, Dimensions, Image, Platform, StyleSheet, Text, View } from "react-native";
import { State, TapGestureHandler } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import icons from "./icons";
const screen = Dimensions.get("window");
const Notification = ({ title, message, data, close, type, theme, opacity }) => {
    const [longMessage, setState] = React.useState(false);
    const [loading, setLoaderState] = React.useState("");
    const Container = Platform.OS === 'ios' ? BlurView : View;
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
    return (React.createElement(View, { style: { flex: 1, alignItems: "center" } },
        React.createElement(Animated.View, { style: [styles.root, borderColor, Platform.OS === "android" && { opacity }] },
            React.createElement(Container, { style: [styles.blur, themeBlurStyle], blurType: light ? "xlight" : "dark" },
                React.createElement(View, { style: styles.main, collapsable: false },
                    type && React.createElement(View, { style: styles.iconContainer },
                        React.createElement(Image, { source: icons[type], style: { width: 30, height: 30, marginRight: 10, }, resizeMode: "contain" })),
                    data?.icon && React.createElement(Image, { source: data?.icon, style: styles.image }),
                    React.createElement(View, { style: [
                            styles.stretchContainer,
                            styles.messageContainer
                        ] },
                        React.createElement(Text, { allowFontScaling: false, numberOfLines: 2, style: [{ fontWeight: "bold" }, themeText] }, title),
                        React.createElement(Text, { allowFontScaling: false, style: themeText, onLayout: (e) => {
                                if ((e.nativeEvent.layout.height > 30)) {
                                    setState(true);
                                }
                            } }, message)),
                    (data?.buttons || []).map(({ title, icon, onPress, titleStyle }, i) => {
                        const key = typeof title === "string" ? title : String(i);
                        return (React.createElement(TapGestureHandler, { key: key, onHandlerStateChange: async (e) => {
                                if (e.nativeEvent.state == State.END && !loading) {
                                    setLoaderState(key);
                                    await onPress();
                                    close();
                                }
                            } },
                            React.createElement(View, { style: [styles.button, borderColor] },
                                loading === key && React.createElement(ActivityIndicator, { size: "small", color: "gray", collapsable: false }),
                                loading !== key &&
                                    !!title &&
                                    React.createElement(Text, { allowFontScaling: false, style: [{ opacity: loading ? .3 : 1, textAlign: "center" }, themeText, titleStyle] }, title),
                                loading !== key &&
                                    !!icon &&
                                    React.createElement(View, { style: styles.buttonIconContainer },
                                        React.createElement(Image, { source: icon, style: styles.icon })))));
                    }))))));
};
export default Notification;
function getContainerWidth() {
    if (screen.width < screen.height)
        return screen.width;
    return screen.height;
}
const styles = StyleSheet.create({
    root: {
        flex: 1,
        borderWidth: StyleSheet.hairlineWidth,
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
        borderColor: Platform.select({ ios: "#4f4f4f", default: "#5a5a5a" }),
    },
    blur: {
        flex: 1,
        borderRadius: 14,
    },
    blurlight: {
        backgroundColor: Platform.select({ ios: "transparent", default: "white" })
    },
    blurdark: {
        backgroundColor: Platform.select({ ios: "transparent", default: "#313131" })
    },
    main: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
    },
    button: {
        borderLeftWidth: StyleSheet.hairlineWidth,
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
