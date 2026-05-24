import cn from 'classnames';
import styles from './skeleton.module.css';

export interface ISkeletonProps {
  count?: number;
  className?: string;
}

/**
 * Lightweight placeholder for the blog list during tag-filter transitions.
 * Three pulsing sticky-note shapes; aria-hidden because the screen reader
 * already knows the list is updating.
 */
export default function Skeleton({ count = 3, className }: ISkeletonProps) {
  return (
    <div className={cn(styles.skeleton, className)} aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: static placeholder list
        <div key={i} className={styles.card} />
      ))}
    </div>
  );
}
