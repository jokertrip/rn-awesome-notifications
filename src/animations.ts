import Animated, { Value, cond, clockRunning, set, spring, startClock, stopClock, Clock, call, Easing, block, timing, debug, eq} from "react-native-reanimated";

export function runSpring(clock: Clock, value: Value<number>, velocity: Value<number>, dest: Animated.Node<number>, close:  Animated.Node<number>) {

    const state = {
      finished: new Value(0),
      velocity: new Value(0),
      position: new Value(0),
      time: new Value(0),
    };
  
    const config = {
      damping: 10,
      mass: 1,
      stiffness: 100,
      overshootClamping: false,
      restSpeedThreshold: 0.001,
      restDisplacementThreshold: 0.001,
      toValue: new Value(0),
    };
  
    return [
      cond(clockRunning(clock), 0, [
        set(state.finished, 0),
        set(state.velocity, velocity),
        set(state.position, value),
        set(config.toValue, dest),
        startClock(clock),
      ]),
      cond(eq(value, dest),[], spring(clock, state, config)),
      cond(state.finished, [
        stopClock(clock),
        close
      ]),
      state.position,
    ];
  }





  type TConfig = {
    duration: number,
    toValue: Animated.Value<number>,
    lastVal: Animated.Value<number>,
  }
  export function runTiming(clock: Animated.Clock) {
    return function ({
      duration,
      toValue,
      lastVal
    }: TConfig) {
      {
        const state = {
          finished: new Value(0),
          position: lastVal,
          time: new Value(0),
          frameTime: new Value(0),
        };
  
        const config = {
          duration,
          toValue: new Value(0),
          easing: Easing.inOut(Easing.ease),
        };
  
        return block([
          cond(
            clockRunning(clock),
            [
              // if the clock is already running we update the toValue, in case a new dest has been passed in
              set(config.toValue, toValue),
            ],
            [
              // if the clock isn't running we reset all the animation params and start the clock
              set(state.finished, 0),
              set(state.time, 0),
              set(state.position, lastVal),
              set(state.frameTime, 0),
              set(config.toValue, toValue),
              startClock(clock),
            ]
          ),
          // we run the step here that is going to update position
          timing(clock, state, config),
          // if the animation is over we stop the clock
          cond(state.finished,  stopClock(clock)),
          // we made the block return the updated position
          state.position,
        ]);
      }
    }
  }