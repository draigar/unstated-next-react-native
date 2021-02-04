import { useRef, useEffect } from "react";
import { detailedDiff } from "../helpers/utility";
import { LogEntries } from "../helpers/debug";

export function useLog(name, state) {
  const debugOn = process.env.NODE_ENV === "development";
  const cheapComparison = (obj1, obj2) => {
    return JSON.stringify(obj1) !== JSON.stringify(obj2);
  };

  const prevState = useRef(state);

  useEffect(() => {
    if (debugOn && cheapComparison(state, prevState.current)) {
      const deepComparison = detailedDiff(prevState.current, state);
      LogEntries(name, state, prevState.current, deepComparison);
    }

    return () => {
      prevState.current = state;
    };
  }, [name, state, prevState, debugOn]);
}
