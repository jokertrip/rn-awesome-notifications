import React, { useReducer } from "react";
import { NotificationParams } from "./types";

export type State = {
    notifications: Record<string, NotificationParams>
}

interface AddNotify {
    type: typeof NotificationsActions.add,
    notify: NotificationParams & {
        id: string
    }
}

interface RemoveNotify {
    type: typeof NotificationsActions.remove,
    id: string
}

export type TNotificationsActions = AddNotify | RemoveNotify

const initialState: State = {
    notifications: {}
}

export enum NotificationsActions {
    add = "add",
    remove = "remove"
}


function reducer(state: State, action: TNotificationsActions): State {
    switch (action.type) {
        case NotificationsActions.add:
            return { ...state, notifications: { ...state.notifications, [action.notify.id]: action.notify } };
        case NotificationsActions.remove:
            const notifications = { ...state.notifications };
            notifications[action.id] && delete notifications[action.id];
            return { ...state, notifications };
        default:
            //@ts-ignore
            throw Error(`Unknown action ${action.type}`)
    }
}


export default function () {
    return useReducer(reducer, initialState);
}