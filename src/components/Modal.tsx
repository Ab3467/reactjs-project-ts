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

interface ModalProps {
  btnCaption: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void; // Add an onConfirm prop
  title?: string;
  message?: string;
}

const Modal: React.FC<ModalProps> = ({ btnCaption, isOpen, onClose, onConfirm, title, message }) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        {title && <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {message && <AlertDialogDescription>{message}</AlertDialogDescription>}
        </AlertDialogHeader>}
        <AlertDialogFooter>
          {onConfirm && (
            <AlertDialogAction onClick={onConfirm} className="bg-red-600 text-white hover:bg-red-700">
              Confirm
            </AlertDialogAction>
          )}
          <AlertDialogAction onClick={onClose} className="bg-gray-300 hover:bg-gray-400">
            {btnCaption}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Modal;
