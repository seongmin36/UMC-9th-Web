import type { ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalPortalProps {
  children: ReactNode;
}

export default function ModalPortal({ children }: ModalPortalProps) {
  const modalRoot = document.getElementById("modal-root") as HTMLElement;
  if (!modalRoot) return null;

  return createPortal(children, modalRoot);
}
