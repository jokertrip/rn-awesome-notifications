import * as React from "react";
import { NotificationParams, NotificationActions } from "./types";
export declare type NotificationExtra = {
    icon?: any;
    buttons?: {
        title: string | React.ReactNode;
        onPress: () => {};
    }[];
};
declare const Notification: React.FC<NotificationActions & NotificationParams<NotificationExtra>>;
export default Notification;
