import React from "react";
import { State, TNotificationsActions } from "./useNotificationState";

export default React.createContext<{
    //state: State, 
    dispatch: React.Dispatch<TNotificationsActions>
     //@ts-ignore
}>({})