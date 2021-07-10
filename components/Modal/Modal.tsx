import React, { ReactChildren, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import { UilTimesCircle } from '@iconscout/react-unicons';
import usePreventScroll from '../../hooks/usePreventScroll';

export interface IModalProps {
  open: boolean;
  handleClose: () => void;
  children: ReactChildren;
}

function Modal(props: IModalProps) {
  const { open, handleClose, children } = props;

  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleCloseClick = (e) => {
    e.preventDefault();
    handleClose();
  };

  usePreventScroll(open);

  const modalContent = open ? (
    <div role="presentation" className={styles.modal__overlay}>
      <div className={styles.modal__backdrop} aria-hidden="true"></div>
      <div
        className={styles.modal__container}
        tabIndex={-1}
        role="none presentation"
      >
        <div
          className={styles.modal__content}
          role="dialog"
          aria-labelledby="simple-dialog-title"
        >
          <UilTimesCircle
            onClick={(e) => handleCloseClick(e)}
            className={styles.modal__close}
            tabIndex={0}
          />
          {children}
        </div>
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById('modal-root')
    );
  } else {
    return null;
  }
}

export default Modal;
