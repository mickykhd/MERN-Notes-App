import { useState, useEffect, useRef } from "react";

const useAutoSave = (value, callback) => {
  const debouncedValue = useDebounce(value, 1000);

  const prevValueRef = useRef(value);

  useEffect(() => {
    if (debouncedValue !== prevValueRef.current) {
      callback(debouncedValue);
      prevValueRef.current = debouncedValue;
    }
  }, [debouncedValue, callback]);
};

// Debounce hook implementation
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

export default useAutoSave;
