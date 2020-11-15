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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "react", "./useNotificationState", "./NotificationContext", "./types", "react-native-uuid"], function (require, exports, react_1, useNotificationState_1, NotificationContext_1, types_1, react_native_uuid_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    NotificationContext_1 = __importDefault(NotificationContext_1);
    react_native_uuid_1 = __importDefault(react_native_uuid_1);
    function default_1() {
        var dispatch = react_1.useContext(NotificationContext_1.default).dispatch;
        var notify = function (params) {
            var id = react_native_uuid_1.default.v4();
            dispatch({
                type: useNotificationState_1.NotificationsActions.add,
                notify: __assign(__assign({}, params), { id: id })
            });
        };
        notify.error = function (params) {
            notify(__assign(__assign({}, params), { type: types_1.NotificationType.error }));
        };
        notify.success = function (params) {
            notify(__assign(__assign({}, params), { type: types_1.NotificationType.success }));
        };
        notify.info = function (params) {
            notify(__assign(__assign({}, params), { type: types_1.NotificationType.info }));
        };
        return notify;
    }
    exports.default = default_1;
});
