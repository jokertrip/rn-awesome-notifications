import React, { useContext } from "react";
import { NotificationsActions } from "./useNotificationState";
import NotificationContext from "./NotificationContext";
import { NotificationParams, NotificationType } from "./types";
import uuid from "react-native-uuid";

type NotifyHandle<T> = (parmas: NotificationParams<T>)=>void;

export default function<T = any>(): NotifyHandle<T> & { error: NotifyHandle<T>, success: NotifyHandle<T>, info: NotifyHandle<T>  } {

    const { dispatch } = useContext(NotificationContext);

    const notify = (params: NotificationParams<T>)=>{

        const id = uuid.v4();
    
        dispatch({
            type: NotificationsActions.add,
            notify: {
                ...params,
                id
            }
        })
    }

    notify.error = (params: NotificationParams<T>)=>{
        notify({...params, type: NotificationType.error})
    }

    notify.success = (params: NotificationParams<T>)=>{
        notify({...params, type: NotificationType.success})
    }

    notify.info = (params: NotificationParams<T>)=>{
        notify({...params, type: NotificationType.info})
    }

    return notify
}