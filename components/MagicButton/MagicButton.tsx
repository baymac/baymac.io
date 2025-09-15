import styles from './magicbutton.module.css';

interface MagicButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  label: string;
}

export default function MagicButton({ onClick, label }: MagicButtonProps) {
  return (
    <>
      <button className={styles.pushable} onClick={onClick} type="button">
        <span className={styles.shadow} />
        <span className={styles.edge} />
        <span className={styles.front}>{label}</span>
      </button>
    </>
  );
}
