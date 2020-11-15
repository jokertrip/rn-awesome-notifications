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
import { useContext } from "react";
import { NotificationsActions } from "./useNotificationState";
import NotificationContext from "./NotificationContext";
import { NotificationType } from "./types";
import uuid from "react-native-uuid";
export default function () {
    var dispatch = useContext(NotificationContext).dispatch;
    var notify = function (params) {
        var id = uuid.v4();
        dispatch({
            type: NotificationsActions.add,
            notify: __assign(__assign({}, params), { id: id })
        });
    };
    notify.error = function (params) {
        notify(__assign(__assign({}, params), { type: NotificationType.error }));
    };
    notify.success = function (params) {
        notify(__assign(__assign({}, params), { type: NotificationType.success }));
    };
    notify.info = function (params) {
        notify(__assign(__assign({}, params), { type: NotificationType.info }));
    };
    return notify;
}
