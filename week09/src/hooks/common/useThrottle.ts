import { useCallback, useRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function useThrottle<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
) {
  const lastTime = useRef(0);

  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      if (now - lastTime.current >= delay) {
        lastTime.current = now;
        fn(...args);
      } else {
        const remainingTime = delay - (now - lastTime.current);
        setTimeout(() => {
          fn(...args);
        }, remainingTime);
      }
    },
    [delay, fn]
  );
}
