define(["require", "exports", "react-native-reanimated"], function (require, exports, react_native_reanimated_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.runTiming = exports.runSpring = void 0;
    function runSpring(clock, value, velocity, dest, close) {
        var state = {
            finished: new react_native_reanimated_1.Value(0),
            velocity: new react_native_reanimated_1.Value(0),
            position: new react_native_reanimated_1.Value(0),
            time: new react_native_reanimated_1.Value(0),
        };
        var config = {
            damping: 10,
            mass: 1,
            stiffness: 100,
            overshootClamping: false,
            restSpeedThreshold: 0.001,
            restDisplacementThreshold: 0.001,
            toValue: new react_native_reanimated_1.Value(0),
        };
        return [
            react_native_reanimated_1.cond(react_native_reanimated_1.clockRunning(clock), 0, [
                react_native_reanimated_1.set(state.finished, 0),
                react_native_reanimated_1.set(state.velocity, velocity),
                react_native_reanimated_1.set(state.position, value),
                react_native_reanimated_1.set(config.toValue, dest),
                react_native_reanimated_1.startClock(clock),
            ]),
            react_native_reanimated_1.cond(react_native_reanimated_1.eq(value, dest), [], react_native_reanimated_1.spring(clock, state, config)),
            react_native_reanimated_1.cond(state.finished, [
                react_native_reanimated_1.stopClock(clock),
                close
            ]),
            state.position,
        ];
    }
    exports.runSpring = runSpring;
    function runTiming(clock) {
        return function (_a) {
            var duration = _a.duration, toValue = _a.toValue, lastVal = _a.lastVal;
            {
                var state = {
                    finished: new react_native_reanimated_1.Value(0),
                    position: lastVal,
                    time: new react_native_reanimated_1.Value(0),
                    frameTime: new react_native_reanimated_1.Value(0),
                };
                var config = {
                    duration: duration,
                    toValue: new react_native_reanimated_1.Value(0),
                    easing: react_native_reanimated_1.Easing.inOut(react_native_reanimated_1.Easing.ease),
                };
                return react_native_reanimated_1.block([
                    react_native_reanimated_1.cond(react_native_reanimated_1.clockRunning(clock), [
                        // if the clock is already running we update the toValue, in case a new dest has been passed in
                        react_native_reanimated_1.set(config.toValue, toValue),
                    ], [
                        // if the clock isn't running we reset all the animation params and start the clock
                        react_native_reanimated_1.set(state.finished, 0),
                        react_native_reanimated_1.set(state.time, 0),
                        react_native_reanimated_1.set(state.position, lastVal),
                        react_native_reanimated_1.set(state.frameTime, 0),
                        react_native_reanimated_1.set(config.toValue, toValue),
                        react_native_reanimated_1.startClock(clock),
                    ]),
                    // we run the step here that is going to update position
                    react_native_reanimated_1.timing(clock, state, config),
                    // if the animation is over we stop the clock
                    react_native_reanimated_1.cond(state.finished, react_native_reanimated_1.stopClock(clock)),
                    // we made the block return the updated position
                    state.position,
                ]);
            }
        };
    }
    exports.runTiming = runTiming;
});
