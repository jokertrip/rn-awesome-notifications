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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsActions = void 0;
var react_1 = require("react");
var initialState = {
    notifications: {}
};
var NotificationsActions;
(function (NotificationsActions) {
    NotificationsActions["add"] = "add";
    NotificationsActions["remove"] = "remove";
})(NotificationsActions = exports.NotificationsActions || (exports.NotificationsActions = {}));
function reducer(state, action) {
    var _a;
    switch (action.type) {
        case NotificationsActions.add:
            return __assign(__assign({}, state), { notifications: __assign(__assign({}, state.notifications), (_a = {}, _a[action.notify.id] = action.notify, _a)) });
        case NotificationsActions.remove:
            var notifications = __assign({}, state.notifications);
            notifications[action.id] && delete notifications[action.id];
            return __assign(__assign({}, state), { notifications: notifications });
        default:
            //@ts-ignore
            throw Error("Unknown action " + action.type);
    }
}
function default_1() {
    return react_1.useReducer(reducer, initialState);
}
exports.default = default_1;
