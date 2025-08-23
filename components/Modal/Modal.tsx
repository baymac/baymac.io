'use client';

import { UilMultiply } from '@iconscout/react-unicons';
import FocusTrap from 'focus-trap-react';
import type React from 'react';
import {
  type KeyboardEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import usePreventScroll from '../../hooks/usePreventScroll';
import styles from './modal.module.css';

export interface IModalProps {
  open: boolean;
  handleClose: () => void;
  children: ReactNode;
}

function Modal(props: IModalProps) {
  const { open, handleClose, children } = props;
  usePreventScroll(open);

  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleCloseClick = (e: React.MouseEvent) => {
    e.preventDefault();
    handleClose();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    // The handler doesn't take event.defaultPrevented into account:
    //
    // event.preventDefault() is meant to stop default behaviors like
    // clicking a checkbox to check it, hitting a button to submit a form,
    // and hitting left arrow to move the cursor in a text input etc.
    // Only special HTML elements have these default behaviors.
    if (event.key !== 'Escape') {
      return;
    }

    event.stopPropagation();

    handleClose();
  };

  const modalBgRef = useRef<HTMLDivElement>(null);

  const handleBgClick = (e: React.MouseEvent) => {
    if (modalBgRef.current === e.target) {
      handleCloseClick(e);
    }
  };

  const modalContent = open ? (
    <div
      role="presentation"
      className={styles.modal__overlay}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.modal__backdrop} aria-hidden="true" />
      <FocusTrap
        focusTrapOptions={{
          returnFocusOnDeactivate: false,
        }}
      >
        <div
          className={styles.modal__container}
          tabIndex={-1}
          ref={modalBgRef}
          /* Works both for mouse click and touch events */
          onMouseDown={handleBgClick}
        >
          {/* To prevent any content being focused on modal open */}
          <div />
          <div
            className={styles.modal__content}
            id="modal-content"
            tabIndex={-1}
          >
            <div className={styles.modal__content_header}>
              <button
                onClick={(e) => handleCloseClick(e)}
                tabIndex={0}
                className={styles.modal__close_button}
                type="button"
              >
                <UilMultiply className={styles.modal__close} />
              </button>
            </div>
            {children}
          </div>
        </div>
      </FocusTrap>
    </div>
  ) : null;

  if (isBrowser) {
    const modalRoot = document.getElementById('modal-root');
    if (modalRoot) {
      return createPortal(modalContent, modalRoot);
    }
  }
  return null;
}

export default Modal;
