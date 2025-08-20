import styles from './linkbutton.module.css';
import { ReactNode } from 'react';

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
    >
      {props.children}
    </button>
  );
}
