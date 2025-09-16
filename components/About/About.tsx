import cn from 'classnames';
import Image from 'next/image';
import profileImage from '/public/images/profile.jpeg';
import rootStyles from '../../styles/root.module.css';
import ImageBorder from '../ImageBorder/ImageBorder';
import styles from './about.module.css';

export default function About() {
  return (
    <section
      className={cn(rootStyles.section, styles.about__section)}
      id="aboutme"
    >
      <div
        className={cn(
          rootStyles.container,
          rootStyles.grid,
          styles.about__container
        )}
      >
        <h1 className={styles.about__title}>Hey, I am Parichay</h1>
        <p className={styles.about__subtitle}>
          Software Engineer based out of nowhere (digital nomad)
        </p>
        <div className={styles.about__img}>
          <ImageBorder maxHeight={300}>
            <Image
              priority
              src={profileImage}
              height={300}
              width={200}
              alt={'Parichay'}
              layout="fixed"
              placeholder={'blur'}
            />
          </ImageBorder>
        </div>

        <div className={styles.about__description}>
          <p>
            I love data and crypto. When not working, I am usually working on my
            side projects. This section is a flex of grid.
          </p>
        </div>
      </div>
    </section>
  );
}
