import { BlurView } from "@react-native-community/blur";
import * as React from "react";
import { ActivityIndicator, Dimensions, Image, ImageStyle, Platform, StyleSheet, Text, View, ViewStyle } from "react-native";
import { State, TapGestureHandler } from "react-native-gesture-handler";
import icons from "./icons";
import { NotificationActions, NotificationParams } from "./types";

const screen = Dimensions.get("window");

export type NotificationExtra = { icon?: any, buttons?: { title: string | React.ReactNode, onPress: () => {} }[] }

const Notification: React.FC<NotificationActions & NotificationParams<NotificationExtra>> = ({ title, message, data, close, type, theme }) => {
    const [longMessage, setState] = React.useState(false);
    const [loading, setLoaderState] = React.useState("");

    const Container: any = Platform.OS === 'ios' ? BlurView : View;

    const light = theme === "light" || !theme;

    const backgroundColor = Platform.select({ ios: "transparent", default: light ? "white" : "#646464" })

    return (
        <View style={{ flex: 1, alignItems: "center" }}>
            <View style={styles.root}>
                <Container style={[styles.blur, { backgroundColor }]} blurType={light ? "xlight" : "dark"}>

                    <View style={styles.main} collapsable={false}>
                        {
                            type && <View style={styles.iconContainer}>
                                <Image
                                    source={icons[type]}
                                    style={{ width: 30, height: 30, marginRight: 10, }}
                                    resizeMode={"contain"}
                                />
                            </View>
                        }
                        {
                            data?.icon && <Image
                                source={data?.icon}
                                style={styles.image}
                            />
                        }

                        <View
                            style={[
                                styles.stretchContainer,
                                styles.messageContainer
                            ]}
                        >
                            <Text allowFontScaling={false} numberOfLines={2} style={{ fontWeight: "bold", color: "#4b4b4b" }}>{title}</Text>
                            <Text
                                allowFontScaling={false}
                                style={{ color: "#4b4b4b" }}
                                onLayout={(e) => {
                                    if ((e.nativeEvent.layout.height > 30)) {
                                        setState(true)
                                    }
                                }}

                            >{message}</Text>
                        </View>
                        {
                            (data?.buttons || []).map(({ title, onPress }, i) => {
                                const key = typeof title === "string" ? title : String(i);
                                return (
                                    <TapGestureHandler
                                        key={key}
                                        onHandlerStateChange={async (e) => {
                                            if (e.nativeEvent.state == State.END && !loading) {
                                                setLoaderState(key);
                                                await onPress();
                                                close();
                                            }
                                        }}
                                    >
                                        <View style={styles.button}>
                                            {
                                                loading === key && <ActivityIndicator size={"small"} color={"gray"} collapsable={false} />
                                            }
                                            {
                                                loading !== key &&
                                                <Text
                                                    allowFontScaling={false}
                                                    style={{ color: "#4b4b4b", opacity: loading ? .3 : 1 }}
                                                >
                                                    {title}
                                                </Text>
                                            }
                                        </View>
                                    </TapGestureHandler>

                                )
                            })
                        }


                    </View>
                </Container>
            </View>
        </View>
    )
}

export default Notification;


function getContainerWidth() {
    if (screen.width < screen.height) return screen.width;
    return screen.height;
}

const styles = StyleSheet.create<{
    root: ViewStyle,
    blur: ViewStyle,
    main: ViewStyle,
    button: ViewStyle,
    stretchContainer: ViewStyle,
    messageContainer: ViewStyle,
    image: ImageStyle,
    iconContainer: ViewStyle
}>({
    root: {
        flex: 1,
        borderColor: "#eaeaea",
        borderWidth: StyleSheet.hairlineWidth,
        elevation: 5,
        borderRadius: 14,
        shadowColor: 'black',
        shadowOpacity: .1,
        shadowRadius: 10,
        width: getContainerWidth() - 20
    },
    blur: {
        flex: 1,
        borderRadius: 14,
    },
    main: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
    },
    button: {
        borderColor: "#ccc",
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
    }
})