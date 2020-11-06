var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "react", "react-native", "./NotificationContext", "./NotificationWrapper", "./useNotificationState"], function (require, exports, react_1, react_native_1, NotificationContext_1, NotificationWrapper_1, useNotificationState_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    react_1 = __importStar(react_1);
    NotificationContext_1 = __importDefault(NotificationContext_1);
    NotificationWrapper_1 = __importDefault(NotificationWrapper_1);
    useNotificationState_1 = __importStar(useNotificationState_1);
    var NotificationProvider = function (_a) {
        var children = _a.children, _b = _a.showingCountInMoment, showingCountInMoment = _b === void 0 ? 3 : _b, vibration = _a.vibration, other = __rest(_a, ["children", "showingCountInMoment", "vibration"]);
        var _c = useNotificationState_1.default(), state = _c[0], disp = _c[1];
        var dispatch = react_1.useCallback(function (a) {
            if (vibration) {
                react_native_1.Vibration.vibrate(200);
            }
            disp(a);
        }, [vibration]);
        var notifyRefs = react_1.useRef({});
        var notifications = Object.keys(state.notifications);
        var Children = react_1.useMemo(function () { return (react_1.default.createElement(react_native_1.View, { style: { flex: 1 } }, children)); }, []);
        var notificationsLength = notifications.length - 1;
        return (react_1.default.createElement(NotificationContext_1.default.Provider, { value: {
                dispatch: dispatch,
            } },
            Children,
            notifications.map(function (id, index) {
                var offsetIndex = index > notificationsLength - showingCountInMoment ? notificationsLength - index : -1;
                return (react_1.default.createElement(NotificationWrapper_1.default, __assign({ key: id, onClose: function (height) {
                        if (!notifyRefs.current[id])
                            return;
                        notifications.forEach(function (key, i) {
                            if (i < index) {
                                notifyRefs.current[key] && notifyRefs.current[key](-height);
                            }
                        });
                        delete notifyRefs.current[id];
                        dispatch({
                            type: useNotificationState_1.NotificationsActions.remove,
                            id: id
                        });
                    }, id: id, offset: offsetIndex, onLayout: function (height, setOffsetTop) {
                        Object.values(notifyRefs.current).forEach(function (item) {
                            item(height);
                        });
                        notifyRefs.current[id] = setOffsetTop;
                    } }, other, state.notifications[id])));
            })));
    };
    exports.default = NotificationProvider;
});
