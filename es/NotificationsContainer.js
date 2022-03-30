import React, { useCallback, useRef } from "react";
import { Vibration } from "react-native";
import Notification from "./NotificationWrapper";
import useNotificationState, { NotificationsActions } from "./useNotificationState";
const NotificationsContainer = ({ onSetDispatch, showingCountInMoment = 3, vibration, ...other }) => {
    const [state, disp] = useNotificationState();
    const dispatch = useCallback((params) => {
        if (vibration) {
            Vibration.vibrate(200);
        }
        disp(params);
    }, [vibration]);
    React.useEffect(() => {
        onSetDispatch(dispatch);
    }, [dispatch]);
    const notifyRefs = useRef({});
    const notifications = Object.keys(state.notifications);
    const notificationsLength = notifications.length - 1;
    return (React.createElement(React.Fragment, null, notifications.map((id, index) => {
        const offsetIndex = index > notificationsLength - showingCountInMoment ? notificationsLength - index : -1;
        return (React.createElement(Notification, { key: id, onClose: (height) => {
                if (!notifyRefs.current[id])
                    return;
                notifications.forEach((key, i) => {
                    if (i < index) {
                        notifyRefs.current[key] && notifyRefs.current[key](-height);
                    }
                });
                delete notifyRefs.current[id];
                dispatch({
                    type: NotificationsActions.remove,
                    id
                });
            }, id: id, offset: offsetIndex, onLayout: (height, setOffsetTop) => {
                Object.values(notifyRefs.current).forEach((item) => {
                    item(height);
                });
                notifyRefs.current[id] = setOffsetTop;
            }, ...other, ...state.notifications[id] }));
    })));
};
export default NotificationsContainer;
