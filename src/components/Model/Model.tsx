import React from "react";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  return (
    <div className="  flex items-center justify-center ">
      <div className="bg-white p-4 rounded-lg shadow-md">
        {children}
       
      </div>
    </div>
  );
};

export default Modal;
