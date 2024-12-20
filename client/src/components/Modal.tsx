import { ReactNode } from "react";
import React from "react";

interface ModalType {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalType> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-40 flex justify-center items-center bg-primary bg-opacity-50 backdrop-blur-sm overflow-auto"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="relative my-8 mx-auto max-w-xl w-full bg-white rounded-lg shadow-lg transform transition-all duration-300 ease-out scale-100 hover:scale-105 p-6 z-50"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-secondary text-neutral rounded-full w-8 h-8 flex items-center justify-center text-sm"
        >
          ✕
        </button>
        <div className="text-center">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;