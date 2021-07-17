import styles from './linkbutton.module.css';
import { ReactChildren } from 'react';

export interface ILinkButtonProps {
  children: ReactChildren | string;
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
