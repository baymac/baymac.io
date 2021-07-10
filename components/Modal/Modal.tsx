import React, {
  ReactChildren,
  useEffect,
  useState,
  KeyboardEvent,
} from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import { UilTimesCircle } from '@iconscout/react-unicons';
import usePreventScroll from '../../hooks/usePreventScroll';
// import * as focusTrap from 'focus-trap'; // ESM
import FocusTrap from 'focus-trap-react';

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

  usePreventScroll(open);

  const modalContent = open ? (
    <div
      role="presentation"
      className={styles.modal__overlay}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.modal__backdrop} aria-hidden="true"></div>
      <FocusTrap
        focusTrapOptions={{
          returnFocusOnDeactivate: false,
        }}
      >
        <div
          className={styles.modal__container}
          tabIndex={-1}
          role="none presentation"
        >
          {/* To prevent any content being focused on modal open */}
          <div tabIndex={0}></div>
          <div
            className={styles.modal__content}
            role="dialog"
            id="modal-content"
          >
            <UilTimesCircle
              onClick={(e) => handleCloseClick(e)}
              className={styles.modal__close}
              tabIndex={0}
            />
            {children}
          </div>
        </div>
      </FocusTrap>
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
