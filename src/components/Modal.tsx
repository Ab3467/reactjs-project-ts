import React, { forwardRef, useImperativeHandle, useRef} from "react";
import { createPortal } from "react-dom";
import { Button } from "./ui/button";

// Define the type for the props
type ModalProps = {
  children: React.ReactNode;
  btnCaption: string;
};

// Define the type for the ref
type ModalHandle = {
  open: () => void;
};

const Modal = forwardRef<ModalHandle, ModalProps>(function Modal({ children, btnCaption }, ref) {
  const dialog = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => ({
    open() {
      if (dialog.current) {
        dialog.current.showModal();
      }
    },
  }));

  return createPortal(
    <dialog ref={dialog} className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md">
      {children}
      <form method="dialog" className="mt-4 text-right">
        <Button>{btnCaption}</Button>
      </form>
    </dialog>,
    document.getElementById("modal-root")!
  );
});

export default Modal;
