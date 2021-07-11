import { UilTimesCircle } from '@iconscout/react-unicons';
import FocusTrap from 'focus-trap-react';
import React, {
  KeyboardEvent,
  ReactChildren,
  useEffect,
  useRef,
  useState,
} from 'react';
import ReactDOM from 'react-dom';
import usePreventScroll from '../../hooks/usePreventScroll';
import styles from './modal.module.css';

export interface IModalProps {
  open: boolean;
  handleClose: () => void;
  children: ReactChildren;
}

function Modal(props: IModalProps) {
  const { open, handleClose, children } = props;
  usePreventScroll(open);

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

  const modalBgRef = useRef();

  const handleBgClick = (e) => {
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
          ref={modalBgRef}
          /* Works both for mouse click and touch events */
          onMouseDown={handleBgClick}
        >
          {/* To prevent any content being focused on modal open */}
          <div tabIndex={0}></div>
          <div
            className={styles.modal__content}
            role="dialog"
            id="modal-content"
          >
            <button
              onClick={(e) => handleCloseClick(e)}
              tabIndex={0}
              className={styles.modal__close_button}
            >
              <UilTimesCircle className={styles.modal__close} />
            </button>
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
