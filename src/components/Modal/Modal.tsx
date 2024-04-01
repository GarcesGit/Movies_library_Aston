import React, { Dispatch, SetStateAction } from 'react';
import cl from './Modal.module.css';

interface ModalProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  children: any;
}

export const Modal = ({ children, visible, setVisible }: ModalProps) => {
  const rootClasses = [cl.modal];
  if (visible) {
    rootClasses.push(cl.active);
  }

  return (
    <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
      <div
        className={cl.modalContent}
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
