import React from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

type ModalProps ={
  btnCaption: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title?: string;
  message?: string;
}

const Modal: React.FC<ModalProps> = ({ btnCaption, isOpen, onClose, onConfirm, title, message }) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="bg-white text-black p-4 rounded-lg shadow-lg">
        <AlertDialogHeader>
          {title && <AlertDialogTitle className="text-lg font-semibold">{title}</AlertDialogTitle>}
          {message && <AlertDialogDescription className="mt-2">{message}</AlertDialogDescription>}
        </AlertDialogHeader>
        <AlertDialogFooter className="flex gap-2">
          {onConfirm && (
            <AlertDialogAction 
              onClick={onConfirm} 
              className="bg-black text-white border border-black hover:bg-gray-800"
            >
              Confirm
            </AlertDialogAction>
          )}
          <AlertDialogAction 
            onClick={onClose} 
            className="bg-black text-white border border-black hover:bg-gray-800"
          >
            {btnCaption}
          </AlertDialogAction>
          {!onConfirm && (
            <AlertDialogAction 
              onClick={onClose} 
              className="text-black border border-black hover:bg-gray-100"
            >
              Cancel
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Modal;
