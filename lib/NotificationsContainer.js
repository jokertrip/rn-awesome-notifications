"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const NotificationWrapper_1 = __importDefault(require("./NotificationWrapper"));
const useNotificationState_1 = __importStar(require("./useNotificationState"));
const NotificationsContainer = ({ onSetDispatch, showingCountInMoment = 3, vibration, ...other }) => {
    const [state, disp] = (0, useNotificationState_1.default)();
    const dispatch = (0, react_1.useCallback)((params) => {
        if (vibration) {
            react_native_1.Vibration.vibrate(200);
        }
        disp(params);
    }, [vibration]);
    react_1.default.useEffect(() => {
        onSetDispatch(dispatch);
    }, [dispatch]);
    const notifyRefs = (0, react_1.useRef)({});
    const notifications = Object.keys(state.notifications);
    const notificationsLength = notifications.length - 1;
    return (react_1.default.createElement(react_1.default.Fragment, null, notifications.map((id, index) => {
        const offsetIndex = index > notificationsLength - showingCountInMoment ? notificationsLength - index : -1;
        return (react_1.default.createElement(NotificationWrapper_1.default, { key: id, onClose: (height) => {
                if (!notifyRefs.current[id])
                    return;
                notifications.forEach((key, i) => {
                    if (i < index) {
                        notifyRefs.current[key] && notifyRefs.current[key](-height);
                    }
                });
                delete notifyRefs.current[id];
                dispatch({
                    type: useNotificationState_1.NotificationsActions.remove,
                    id
                });
            }, id: id, offset: offsetIndex, onLayout: (height, setOffsetTop) => {
                Object.values(notifyRefs.current).forEach((item) => {
                    item(height);
                });
                notifyRefs.current[id] = setOffsetTop;
            }, ...other, ...state.notifications[id] }));
    })));
};
exports.default = NotificationsContainer;
