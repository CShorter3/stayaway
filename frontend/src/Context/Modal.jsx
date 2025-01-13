// create react context called ModalContext
// create function component called ModalProvider

import { useRef, createContext } from 'react';
import { useState } from 'react';

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