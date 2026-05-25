import cn from 'classnames';
import type { CSSProperties } from 'react';
import styles from './tape.module.css';

export interface ITapeProps {
  /** Optional positioning + sizing styles (consumer places the tape absolutely). */
  style?: CSSProperties;
  className?: string;
  /** Tape rotation in degrees. Default: 0. */
  rotate?: number;
}

/**
 * Washi-tape decoration primitive. Consumers position with `style` (typically
 * `position: 'absolute', top, left, width`). Apply tilt via `rotate` prop.
 * Pairs with cards / polaroids / blog notes for the "stuck to a journal page"
 * scrapbook metaphor.
 */
export default function Tape({ style, className, rotate = 0 }: ITapeProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(styles.tape, className)}
      style={{ transform: `rotate(${rotate}deg)`, ...style }}
    />
  );
}
