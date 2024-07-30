import React, { ForwardedRef } from "react";

interface ModalProps {
  btnCaption: string;
  children: React.ReactNode;
}

const Modal = React.forwardRef<HTMLDialogElement, ModalProps>(
  ({ btnCaption, children }, ref: ForwardedRef<HTMLDialogElement>) => {
    const handleClose = () => {
      if (ref && typeof ref !== "function") {
        (ref as React.RefObject<HTMLDialogElement>).current?.close();
      }
    };

    return (
      <dialog ref={ref} className="modal">
        <div className="modal-content">
          {children}
          <div className="modal-footer">
            <button className="modal-btn" onClick={handleClose}>
              {btnCaption}
            </button>
          </div>
        </div>
      </dialog>
    );
  }
);

export default Modal;
