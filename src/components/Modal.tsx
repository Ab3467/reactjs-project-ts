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
}

const Modal: React.FC<ModalProps> = ({ btnCaption, isOpen, onClose }) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Invalid Input</AlertDialogTitle>
          <AlertDialogDescription>
            Oops... Looks like you forgot to enter a value.
            Please make sure you provided a valid value for every input field.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={onClose}>{btnCaption}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Modal;