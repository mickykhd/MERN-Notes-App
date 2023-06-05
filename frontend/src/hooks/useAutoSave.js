import { useState, useEffect, useRef } from "react";

// Custom hook to debounce a value
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const useAutoSave = (value, callback) => {
  const debouncedValue = useDebounce(value, 1000);

  const prevValue = useRef(value);

  useEffect(() => {
    if (debouncedValue !== prevValue.current) {
      callback(debouncedValue);
      prevValue.current = debouncedValue;
    }
  }, [debouncedValue, callback]);
};

export default useAutoSave;
