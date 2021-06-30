import cn from 'classnames';
import { useReset } from '../../hooks/useReset';
import styles from './snackbar.module.css';

export type SnackbarVariants = 'success' | 'error' | 'warning' | 'info';

export interface ISnackbarProps {
  show: boolean;
  reset: () => void;
  onClose?: () => void;
  variant?: SnackbarVariants;
  message: string;
  duration?: number;
}

export default function Snackbar(props: ISnackbarProps) {
  const { show, duration, reset } = props;

  useReset(show, reset, duration ?? 1000);

  return (
    <div className={cn(styles.snackbar__container)}>
      <div className={styles.snackbar__content}>{props.message}</div>
    </div>
  );
}
