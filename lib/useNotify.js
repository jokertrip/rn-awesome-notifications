"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const useNotificationState_1 = require("./useNotificationState");
const NotificationContext_1 = __importDefault(require("./NotificationContext"));
const types_1 = require("./types");
const react_native_uuid_1 = __importDefault(require("react-native-uuid"));
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
