import Animated from "react-native-reanimated"
import { TapGestureHandlerStateChangeEvent } from "react-native-gesture-handler"

export enum NotificationType {
    error = "error",
    success = "success",
    info = "info"
}

export type NotificationParams<TData = any> = {
    title: string,
    message?: string,
    type?: NotificationType,
    timeout?: number,
    data?: TData,
    onPress?: ()=>void,
    heightAnimation?: Animated.Value<number>
}

export type NotificationActions = {
    close: ()=>void
}


export type CloseButtonProps = {
    fullState: Animated.Value<number>,
    onPress: (event: TapGestureHandlerStateChangeEvent)=>void
}