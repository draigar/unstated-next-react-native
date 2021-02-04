import {useEffect, useCallback, useRef, useState} from 'react';

export function useDebounce(value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );

  return debouncedValue;
}

export function useDebouncedCallback(callback, delay, options = {maxWait: 0}) {
  const {maxWait} = options;
  const maxWaitHandler = useRef(null);
  const maxWaitArgs = useRef([]);

  const {leading} = options;
  const trailing = options.trailing === undefined ? true : options.trailing;
  const leadingCall = useRef(false);

  const functionTimeoutHandler = useRef(null);
  const isComponentUnmounted = useRef(false);

  const debouncedFunction = useRef(callback);
  debouncedFunction.current = callback;

  const cancelDebouncedCallback = useCallback(() => {
    clearTimeout(functionTimeoutHandler.current);
    clearTimeout(maxWaitHandler.current);
    maxWaitHandler.current = null;
    maxWaitArgs.current = [];
    functionTimeoutHandler.current = null;
    leadingCall.current = false;
  }, []);

  useEffect(
    () => () => {
      isComponentUnmounted.current = true;
    },
    []
  );

  const debouncedCallback = useCallback(
    (...args) => {
      maxWaitArgs.current = args;
      clearTimeout(functionTimeoutHandler.current);
      if (leadingCall.current) {
        leadingCall.current = false;
      }
      if (!functionTimeoutHandler.current && leading && !leadingCall.current) {
        debouncedFunction.current(...args);
        leadingCall.current = true;
      }

      functionTimeoutHandler.current = setTimeout(() => {
        let shouldCallFunction = true;
        if (leading && leadingCall.current) {
          shouldCallFunction = false;
        }
        cancelDebouncedCallback();

        if (!isComponentUnmounted.current && trailing && shouldCallFunction) {
          debouncedFunction.current(...args);
        }
      }, delay);

      if (maxWait && !maxWaitHandler.current && trailing) {
        maxWaitHandler.current = setTimeout(() => {
          const argsOut = maxWaitArgs.current;
          cancelDebouncedCallback();

          if (!isComponentUnmounted.current) {
            debouncedFunction.current.apply(null, argsOut);
          }
        }, maxWait);
      }
    },
    [maxWait, delay, cancelDebouncedCallback, leading, trailing]
  );

  const callPending = () => {
    if (!functionTimeoutHandler.current) {
      return;
    }

    debouncedFunction.current.apply(null, maxWaitArgs.current);
    cancelDebouncedCallback();
  };

  return [debouncedCallback, cancelDebouncedCallback, callPending];
}
