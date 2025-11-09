import { useCallback, useRef, useState } from "react";
import { useOnClickOutside } from "./useOnClickOutside";
import { useResponsiveSidebar } from "./useResponsiveSidebar";

export function useSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  // 사이드바 영역 밖 클릭 시 닫기
  useOnClickOutside(
    [
      sidebarRef as React.RefObject<HTMLElement>,
      triggerRef as React.RefObject<HTMLButtonElement>,
    ],
    close
  );

  useResponsiveSidebar(isOpen, close, open, 768);

  return { isOpen, sidebarRef, triggerRef, open, close, toggle };
}
