import { useEffect } from "react";

export function useOnClickOutside(
  refs: React.RefObject<HTMLElement>[],
  handler: (event: MouseEvent) => void
) {
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      const target = e.target as Node;

      if (refs.some((ref) => ref.current && ref.current.contains(target))) {
        return;
      }
      handler(e);
    };
    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [refs, handler]);
}
