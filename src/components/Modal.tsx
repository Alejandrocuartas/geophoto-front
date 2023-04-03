import React from "react";
import ReactDOM from "react-dom";

import "./styles/Modal.css";

const Modal = ({ isOpen, onClose, children }: { isOpen: boolean, onClose: () => void, children: any}) => {
    if (!isOpen) {
        return null;
    }

    return ReactDOM.createPortal(
        <div className="Modal">
            <div className="Modal__container">
                <button onClick={onClose} className="Modal__close-button">
                    X
                </button>
                {children}
            </div>
        </div>,
        //@ts-ignore
        document.getElementById("modal")
    );
};

export default Modal;