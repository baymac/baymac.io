import { ReactNode } from 'react';
import styles from './imageborder.module.css';

export interface IImageBorderProps {
  children: ReactNode;
  maxHeight: number;
}

export default function ImageBorder(props: IImageBorderProps) {
  return (
    <div className={styles.box} style={{ maxHeight: props.maxHeight }}>
      <div className={styles.img_container}>{props.children}</div>
    </div>
  );
}
