import cn from 'classnames';
import React from 'react';
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
        aria-label="AI Badge"
      >
        <title>AI Badge</title>
        <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9ZM19 21H5V3H13V9H19V21Z" />
        <path d="M8 12H16V14H8V12ZM8 16H13V18H8V16Z" />
      </svg>
      <span>AI</span>
    </div>
  );
}
