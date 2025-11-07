import { useEffect, useRef } from "react";

export function useResponsiveSidebar(
  isOpen: boolean,
  onClose: () => void,
  onOpen: () => void,
  breakpoint: number
) {
  const prevWidthRef = useRef<number>(window.innerWidth);

  useEffect(() => {
    // 창 크기 변경 시 사이드바 닫기
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      const prevWidth = prevWidthRef.current;

      const isShrinking = currentWidth < prevWidth;

      if (currentWidth < breakpoint && isOpen) onClose();
      if (!isShrinking && currentWidth >= breakpoint && !isOpen) onOpen();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen, breakpoint, onClose, onOpen]);
}
