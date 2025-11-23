import { useEffect, useState } from "react";

export default function useThrottle<T>(value: T, interval: number) {
  const [throttledValue, setThrottledValue] = useState<T>();

  useEffect(() => {
    const handler = setTimeout(() => {
      setThrottledValue(value);
    }, interval);
    return () => clearTimeout(handler);
  }, [value, interval]);

  return throttledValue;
}
