import type { ReactNode } from 'react';
import styles from './linkbutton.module.css';

export interface ILinkButtonProps {
  children: ReactNode | string;
  onClick: () => void;
  disabled?: boolean;
}

export default function LinkButton(props: ILinkButtonProps) {
  return (
    <button
      className={styles.link_button}
      onClick={props.onClick}
      disabled={props.disabled}
      type="button"
    >
      {props.children}
    </button>
  );
}
