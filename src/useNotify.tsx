import React, { useContext } from "react";
import { NotificationsActions } from "./useNotificationState";
import NotificationContext from "./NotificationContext";
import { NotificationParams } from "./types";
import { v4 } from "react-native-uuid";

export default function<T = any>(){

    const { dispatch } = useContext(NotificationContext);

    return (params: NotificationParams<T>)=>{

        const id = v4();
    
        dispatch({
            type: NotificationsActions.add,
            notify: {
                ...params,
                id
            }
        })
    }
}