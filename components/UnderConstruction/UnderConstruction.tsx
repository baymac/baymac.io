import { UilApps } from '@iconscout/react-unicons';
import cn from 'classnames';
import rootStyles from '../../styles/root.module.css';
import styles from './underconstruction.module.css';

export default function UnderConstruction() {
  return (
    <section className={cn(rootStyles.section, styles.underConstructionFlex)}>
      <div
        className={cn(
          rootStyles.container,
          rootStyles.grid,
          styles.underConstructionContainer
        )}
      >
        <UilApps className={styles.underConstructionIcon} />
        <h2 className={styles.underConstructionText}>
          This website is under construction so a few features might not work
        </h2>
        <UilApps className={styles.underConstructionIcon} />
      </div>
    </section>
  );
}
