"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var useNotificationState_1 = require("./useNotificationState");
var NotificationContext_1 = __importDefault(require("./NotificationContext"));
var uuid_1 = __importDefault(require("uuid"));
function default_1() {
    var dispatch = react_1.useContext(NotificationContext_1.default).dispatch;
    return function (params) {
        var id = uuid_1.default.v4();
        dispatch({
            type: useNotificationState_1.NotificationsActions.add,
            notify: __assign(__assign({}, params), { id: id })
        });
    };
}
exports.default = default_1;
