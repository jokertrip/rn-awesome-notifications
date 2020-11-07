var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useCallback, useRef } from "react";
import { Vibration } from "react-native";
import Notification from "./NotificationWrapper";
import useNotificationState, { NotificationsActions } from "./useNotificationState";
var NotificationsContainer = function (_a) {
    var onSetDispatch = _a.onSetDispatch, _b = _a.showingCountInMoment, showingCountInMoment = _b === void 0 ? 3 : _b, vibration = _a.vibration, other = __rest(_a, ["onSetDispatch", "showingCountInMoment", "vibration"]);
    var _c = useNotificationState(), state = _c[0], disp = _c[1];
    var dispatch = useCallback(function (params) {
        if (vibration) {
            Vibration.vibrate(200);
        }
        disp(params);
    }, [vibration]);
    React.useEffect(function () {
        onSetDispatch(dispatch);
    }, [dispatch]);
    var notifyRefs = useRef({});
    var notifications = Object.keys(state.notifications);
    var notificationsLength = notifications.length - 1;
    return (React.createElement(React.Fragment, null, notifications.map(function (id, index) {
        var offsetIndex = index > notificationsLength - showingCountInMoment ? notificationsLength - index : -1;
        return (React.createElement(Notification, __assign({ key: id, onClose: function (height) {
                if (!notifyRefs.current[id])
                    return;
                notifications.forEach(function (key, i) {
                    if (i < index) {
                        notifyRefs.current[key] && notifyRefs.current[key](-height);
                    }
                });
                delete notifyRefs.current[id];
                dispatch({
                    type: NotificationsActions.remove,
                    id: id
                });
            }, id: id, offset: offsetIndex, onLayout: function (height, setOffsetTop) {
                Object.values(notifyRefs.current).forEach(function (item) {
                    item(height);
                });
                notifyRefs.current[id] = setOffsetTop;
            } }, other, state.notifications[id])));
    })));
};
export default NotificationsContainer;
