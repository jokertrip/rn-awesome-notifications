import React, { useRef } from "react";
import { View } from "react-native";
import NotificationContext from "./NotificationContext";
import NotificationsContainer from "./NotificationsContainer";
const NotificationProvider = ({ children, ...props }) => {
    const dispatch = useRef(() => { });
    return (React.createElement(NotificationContext.Provider, { value: {
            dispatch: (...args) => dispatch.current(...args),
        } },
        React.createElement(View, { style: { flex: 1 } }, children),
        React.createElement(NotificationsContainer, { onSetDispatch: (f) => dispatch.current = f, ...props })));
};
export default NotificationProvider;
