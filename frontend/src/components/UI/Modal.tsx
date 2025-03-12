import React from "react";
import Button from "./Button";

interface ModalProps {
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
  isOpen: boolean;
}

const Modal: React.FC<ModalProps> = ({ title, description, onConfirm, onCancel, isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-dark-purple p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
        <h2 className="text-xl font-bold text-primary">{title}</h2>
        <p className="text-soft-beige mt-2">{description}</p>
        <div className="flex justify-center space-x-4 mt-4">
          <Button variant="delete" onClick={onConfirm}>Confirm</Button>
          <Button variant="cancel" onClick={onCancel}>Cancel</Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
