import * as React from "react";
import staticProps from "hoist-non-react-statics";
import useNotify from "./useNotify";
import { NotificationParams } from "./types";


export type WithNotify<Extra = {}> = {
    notify: (params: NotificationParams<Extra>)=>void
}

export default function<P>(WrappedComponent: React.ComponentType<P>){

    const Wrapper: React.FC<P> = function(props){

        const notify = useNotify();

        return <WrappedComponent {...props} notify={notify}/>
    }


    return staticProps(Wrapper, WrappedComponent)
}