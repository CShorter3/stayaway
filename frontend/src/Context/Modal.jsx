// create react context called ModalContext
// create function component called ModalProvider

import { useRef, createContext } from 'react';
import { useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const ModalContext = createContext();

export function ModalProvider({ children }) {
    const modalRef = useRef();
    const [modalContent, setModalContent] = useState(null);
    const [onModalClose, setOnModalClose] = useState(null);
  
    // runs when Modal is unmounted
    const closeModal = () => {
        setModalContent(null); // clear modal contents
        if(typeof onModalClose === "function"){
            setOnModalClose(null);
            onModalClose();
        }
    };

    const contextValue = {
      modalRef, // reference to modal div
      modalContent, // React component to render inside modal
      setModalContent, // function to set the React component to render inside modal
      setOnModalClose, // function to set the callback function to be called when modal is closing
      closeModal       
    };
  
    return (
      <>
        <ModalContext.Provider value={contextValue}>
          {children}
        </ModalContext.Provider>
        <div ref={modalRef} />
      </>
    );
  }

  export function Modal(){
    const { modalRef, modalContent, closeModal } = useContext(ModalContext);

    if(!modalRef || !modalRef.current || !modalContent) return null;

    return ReactDOM.createPortal(
        <div id="modal">
            <div id="modal-background" onClick={closeModal} />
            <div id="modal-content">
              {modalContent}
            </div>
        </div>,
        modalRef.current
    );
  }

  export const useModal = () => useContext(ModalContext);