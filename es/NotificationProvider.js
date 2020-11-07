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
import React, { useCallback, useMemo, useRef } from "react";
import { Vibration, View } from "react-native";
import NotificationContext from "./NotificationContext";
import Notification from "./NotificationWrapper";
import useNotificationState, { NotificationsActions } from "./useNotificationState";
var NotificationProvider = function (_a) {
    var children = _a.children, _b = _a.showingCountInMoment, showingCountInMoment = _b === void 0 ? 3 : _b, vibration = _a.vibration, other = __rest(_a, ["children", "showingCountInMoment", "vibration"]);
    var _c = useNotificationState(), state = _c[0], disp = _c[1];
    var dispatch = useCallback(function (a) {
        if (vibration) {
            Vibration.vibrate(200);
        }
        disp(a);
    }, [vibration]);
    var notifyRefs = useRef({});
    var notifications = Object.keys(state.notifications);
    var Children = useMemo(function () { return (React.createElement(View, { style: { flex: 1 } }, children)); }, []);
    var notificationsLength = notifications.length - 1;
    return (React.createElement(View, { style: { flex: 1 } },
        React.createElement(NotificationContext.Provider, { value: {
                dispatch: dispatch,
            } },
            Children,
            notifications.map(function (id, index) {
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
            }))));
};
export default NotificationProvider;
