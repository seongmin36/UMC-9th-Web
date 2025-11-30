import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { useShallow } from "zustand/react/shallow";

type ModalType = "search" | "cart" | null;

interface ModalActions {
  openModal: (type: ModalType) => void;
  closeModal: () => void;
}

interface ModalState {
  isOpen: boolean;
  type: ModalType;
  actions: ModalActions;
}

export const useModalStore = create<ModalState>()(
  immer((set) => ({
    isOpen: false,
    type: null,
    actions: {
      openModal: (type: ModalType) => {
        set((state) => {
          state.isOpen = true;
          state.type = type;
        });
      },
      closeModal: () => {
        set((state) => {
          state.isOpen = false;
          state.type = null;
        });
      },
    },
  }))
);

export const useModalInfo = () => {
  return useModalStore(
    useShallow((state) => ({
      isOpen: state.isOpen,
      type: state.type,
    }))
  );
};

export const useModalActions = () => {
  return useModalStore((state) => state.actions);
};
