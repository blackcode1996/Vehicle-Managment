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
      className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="relative max-w-xl w-full bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 ease-out scale-100 hover:scale-105 p-6"
      >
        <button
          onClick={onClose}
          className="absolute text-2xl top-[5px] right-[5px] bg-secondary text-neutral rounded-full w-8 h-8 flex items-center justify-center"
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
