import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 transition-opacity duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <div className="sticky top-0 bg-white p-4 border-b border-slate-200 flex justify-between items-center z-10 rounded-t-lg">
          <h2 id="modal-title" className="text-xl font-bold text-slate-800">{title}</h2>
          <button 
            onClick={onClose} 
            className="text-slate-500 hover:text-slate-800 text-3xl font-light leading-none"
            aria-label="Close"
          >
            &times;
          </button>
        </div>
        <div className="p-6 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
