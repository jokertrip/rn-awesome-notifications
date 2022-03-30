"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsActions = void 0;
const react_1 = require("react");
const initialState = {
    notifications: {}
};
var NotificationsActions;
(function (NotificationsActions) {
    NotificationsActions["add"] = "add";
    NotificationsActions["remove"] = "remove";
})(NotificationsActions = exports.NotificationsActions || (exports.NotificationsActions = {}));
function reducer(state, action) {
    switch (action.type) {
        case NotificationsActions.add:
            return { ...state, notifications: { ...state.notifications, [action.notify.id]: action.notify } };
        case NotificationsActions.remove:
            const notifications = { ...state.notifications };
            notifications[action.id] && delete notifications[action.id];
            return { ...state, notifications };
        default:
            //@ts-ignore
            throw Error(`Unknown action ${action.type}`);
    }
}
function default_1() {
    return (0, react_1.useReducer)(reducer, initialState);
}
exports.default = default_1;
