import React, { useRef } from "react";
import { View } from "react-native";
import NotificationContext from "./NotificationContext";
import NotificationsContainer from "./NotificationsContainer";
import { NotificationProps } from "./NotificationWrapper";
import { TNotificationsActions } from "./useNotificationState";

type Props = NotificationProps

const NotificationProvider: React.FC<Props> = ({ children, ...props }) => {

    const dispatch = useRef<React.Dispatch<TNotificationsActions>>(()=>{})



    return (
        <NotificationContext.Provider
            value={{
                dispatch: dispatch.current,
            }}
        >
            <View style={{ flex: 1 }}>
                {children}
            </View>
            
            <NotificationsContainer
                onSetDispatch={(f)=>dispatch.current=f}
                {...props}
            />

        </NotificationContext.Provider>
    )
}

export default NotificationProvider