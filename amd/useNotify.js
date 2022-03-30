var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "react", "./useNotificationState", "./NotificationContext", "./types", "react-native-uuid"], function (require, exports, react_1, useNotificationState_1, NotificationContext_1, types_1, react_native_uuid_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    NotificationContext_1 = __importDefault(NotificationContext_1);
    react_native_uuid_1 = __importDefault(react_native_uuid_1);
    function default_1() {
        const { dispatch } = (0, react_1.useContext)(NotificationContext_1.default);
        const notify = (params) => {
            const id = react_native_uuid_1.default.v4();
            dispatch({
                type: useNotificationState_1.NotificationsActions.add,
                notify: {
                    ...params,
                    id
                }
            });
        };
        notify.error = (params) => {
            notify({ ...params, type: types_1.NotificationType.error });
        };
        notify.success = (params) => {
            notify({ ...params, type: types_1.NotificationType.success });
        };
        notify.info = (params) => {
            notify({ ...params, type: types_1.NotificationType.info });
        };
        return notify;
    }
    exports.default = default_1;
});
