import React, { useCallback, useMemo, useRef } from "react";
import { Vibration, View } from "react-native";
import NotificationContext from "./NotificationContext";
import Notification, { NotificationProps } from "./NotificationWrapper";
import useNotificationState, { NotificationsActions } from "./useNotificationState";

type Props = NotificationProps

const NotificationProvider: React.FC<Props> = ({ children, showingCountInMoment = 3, vibration, ...other }) => {

    const [state, disp] = useNotificationState();

    const dispatch = useCallback((a) => {
        if (vibration) {
            Vibration.vibrate(200);
        }
        disp(a);
    }, [vibration])

    const notifyRefs = useRef<Record<string, any>>({});

    const notifications = Object.keys(state.notifications);

    const Children = useMemo(() => (
        <View style={{ flex: 1 }}>
            {children}
        </View>
    ), []);

    const notificationsLength = notifications.length - 1;



    return (
        <View style={{ flex: 1 }}>
            <NotificationContext.Provider
                value={{
                    dispatch,
                }}
            >
                {Children}
                {
                    notifications.map((id, index) => {
                        const offsetIndex = index > notificationsLength - showingCountInMoment ? notificationsLength - index : -1;

                        return (
                            <Notification
                                key={id}
                                onClose={(height) => {
                                    if (!notifyRefs.current[id]) return;
                                    notifications.forEach((key, i) => {
                                        if (i < index) {
                                            notifyRefs.current[key] && notifyRefs.current[key](-height)
                                        }
                                    })
                                    delete notifyRefs.current[id];
                                    dispatch({
                                        type: NotificationsActions.remove,
                                        id
                                    })
                                }}
                                id={id}
                                offset={offsetIndex}
                                onLayout={(height, setOffsetTop) => {
                                    Object.values(notifyRefs.current).forEach((item) => {
                                        item(height);
                                    })
                                    notifyRefs.current[id] = setOffsetTop
                                }}
                                {...other}
                                {...state.notifications[id]}
                            />
                        )
                    })

                }

            </NotificationContext.Provider>
        </View>

    )
}

export default NotificationProvider