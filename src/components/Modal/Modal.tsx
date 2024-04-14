import React, { MouseEvent } from 'react';
import cl from './Modal.module.css';

type ModalProps = {
  visible: boolean;
  setVisible: (value: boolean) => void;
  children: any;
};

export const Modal = ({ children, visible, setVisible }: ModalProps) => {
  const rootClasses = [cl.modal];
  if (visible) {
    rootClasses.push(cl.active);
  }
  const handleCloseModal = () => setVisible(false);
  const handleStopPropagation = (event: MouseEvent<HTMLDivElement>) =>
    event.stopPropagation();

  return (
    <div className={rootClasses.join(' ')} onClick={handleCloseModal}>
      <div className={cl.modalContent} onClick={handleStopPropagation}>
        {children}
      </div>
    </div>
  );
};
