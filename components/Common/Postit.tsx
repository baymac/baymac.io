import cn from 'classnames';
import type { CSSProperties, ReactNode } from 'react';
import styles from './postit.module.css';

export type PostitColor = 1 | 2 | 3 | 4 | 5;

export interface IPostitProps {
  /** Postit color from the rotation (1–5). See DESIGN.md → "Postit color rotation". */
  color?: PostitColor;
  /** Rotation in degrees. Negative tilts left, positive right. Default: 0. */
  rotate?: number;
  /** Optional extra inline styles (positioning, width, font-size overrides). */
  style?: CSSProperties;
  /** Optional className for layout composition. */
  className?: string;
  children: ReactNode;
}

/**
 * Sticky-note primitive. Pairs with `--postit-ink` for body text (NOT page
 * `--text-color`). See DESIGN.md for the rotation order and usage rules.
 */
export default function Postit({
  color = 1,
  rotate = 0,
  style,
  className,
  children,
}: IPostitProps) {
  return (
    <div
      className={cn(styles.postit, styles[`color${color}`], className)}
      style={{ transform: `rotate(${rotate}deg)`, ...style }}
    >
      {children}
    </div>
  );
}
