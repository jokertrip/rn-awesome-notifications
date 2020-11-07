import React, { useCallback, useRef } from "react";
import { Vibration } from "react-native";
import Notification, { NotificationProps } from "./NotificationWrapper";
import useNotificationState, { NotificationsActions, TNotificationsActions } from "./useNotificationState";

const NotificationsContainer: React.FC<NotificationProps & { onSetDispatch: (disp: React.Dispatch<TNotificationsActions>)=>void }> = ({ onSetDispatch,  showingCountInMoment = 3, vibration, ...other}) => {

    const [state, disp] = useNotificationState();

    const dispatch: React.Dispatch<TNotificationsActions> = useCallback((params: TNotificationsActions) => {
        if (vibration) {
            Vibration.vibrate(200);
        }
        disp(params);
    }, [vibration]);


    React.useEffect(()=>{
        onSetDispatch(dispatch);
    },[dispatch])

    const notifyRefs = useRef<Record<string, any>>({});

    const notifications = Object.keys(state.notifications);


    const notificationsLength = notifications.length - 1;

    return (
        <>
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
        </>
    )
}

export default NotificationsContainer;