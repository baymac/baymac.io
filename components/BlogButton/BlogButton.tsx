import cn from 'classnames';
import Link from 'next/link';
import { UilPen } from '../Icons/UilIcons';
import styles from './blogbutton.module.css';

export default function BlogButton() {
  return (
    <Link href="/blog" className={cn(styles.blogButton, styles.blogButtonFlex)}>
      Blog
      <UilPen />
    </Link>
  );
}
