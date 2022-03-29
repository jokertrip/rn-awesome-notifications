import * as React from "react";
import Animated, { cond, Clock, Value } from "react-native-reanimated";
import { State, TapGestureHandler } from "react-native-gesture-handler";
import { View, StyleSheet, Image, ViewStyle, ImageStyle, Text, Platform } from "react-native";
import { CloseButtonProps } from "./types";
import { BlurView } from "@react-native-community/blur";
import icons from "./icons";
import { runTiming } from "./animations";



const CloseButton: React.FC<CloseButtonProps> = ({ fullState, onPress }) => {
    const clock = React.useMemo(() => new Clock(), []);

    const Container: any = Platform.OS === 'ios' ? BlurView : View;

    return (
        <Animated.View
            style={[
                styles.root,
                // @ts-ignore
                {
                    opacity: cond(fullState, runTiming(clock)({ duration: 300, toValue: new Value(1), lastVal: new Value(0) }), 0),
                }
            ]}
        >
            <TapGestureHandler
                onHandlerStateChange={onPress}
                numberOfTaps={1}
            >
                <Container
                    style={{ flex: 1, flexDirection: "row", paddingHorizontal: 10, alignItems: "center" }}
                    blurType={"xlight"}
                >
                    <Image
                        source={icons.close}
                        style={styles.icon}
                    />
                    <Text allowFontScaling={false} style={{ color: "#4b4b4b", marginLeft: 2 }}> Закрыть </Text>
                </Container>


            </TapGestureHandler>
        </Animated.View>
    )
}

export default CloseButton;

const styles = StyleSheet.create<{
    root: ViewStyle,
    icon: ImageStyle
}>({
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
})
