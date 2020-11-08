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
import { v4 } from "uuid";
export default function () {
    var dispatch = useContext(NotificationContext).dispatch;
    return function (params) {
        var id = v4();
        dispatch({
            type: NotificationsActions.add,
            notify: __assign(__assign({}, params), { id: id })
        });
    };
}
