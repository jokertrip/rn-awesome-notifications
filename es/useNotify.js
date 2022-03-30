import { useContext } from "react";
import { NotificationsActions } from "./useNotificationState";
import NotificationContext from "./NotificationContext";
import { NotificationType } from "./types";
import uuid from "react-native-uuid";
export default function () {
    const { dispatch } = useContext(NotificationContext);
    const notify = (params) => {
        const id = uuid.v4();
        dispatch({
            type: NotificationsActions.add,
            notify: {
                ...params,
                id
            }
        });
    };
    notify.error = (params) => {
        notify({ ...params, type: NotificationType.error });
    };
    notify.success = (params) => {
        notify({ ...params, type: NotificationType.success });
    };
    notify.info = (params) => {
        notify({ ...params, type: NotificationType.info });
    };
    return notify;
}
