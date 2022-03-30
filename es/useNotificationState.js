import { useReducer } from "react";
const initialState = {
    notifications: {}
};
export var NotificationsActions;
(function (NotificationsActions) {
    NotificationsActions["add"] = "add";
    NotificationsActions["remove"] = "remove";
})(NotificationsActions || (NotificationsActions = {}));
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
export default function () {
    return useReducer(reducer, initialState);
}
