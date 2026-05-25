import cn from 'classnames';
import styles from './ai-badge.module.css';

interface IAiBadgeProps {
  className?: string;
}

export default function AiBadge({ className }: IAiBadgeProps) {
  return (
    <div className={cn(styles.aiBadge, className)}>
      <svg
        className={styles.aiBadgeIcon}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="AI assisted"
      >
        <title>AI assisted</title>
        {/* Sparkles — 4-point star (big + small) with concave points,
            modern AI iconography. */}
        <path d="M10 2c.4 3.1 1.4 4.6 5 5-3.6.4-4.6 1.9-5 5-.4-3.1-1.4-4.6-5-5 3.6-.4 4.6-1.9 5-5Z" />
        <path d="M18 12c.3 2.1.8 2.7 3 3-2.2.3-2.7.9-3 3-.3-2.1-.8-2.7-3-3 2.2-.3 2.7-.9 3-3Z" />
      </svg>
      <span className={styles.aiBadgeText}>AI</span>
    </div>
  );
}
