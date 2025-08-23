import { UilPen } from '@iconscout/react-unicons';
import cn from 'classnames';
import Link from 'next/link';
import styles from './blogbutton.module.css';

export default function BlogButton() {
  return (
    <Link href="/blog" className={cn(styles.blogButton, styles.blogButtonFlex)}>
      Blog
      <UilPen />
    </Link>
  );
}
