import cn from 'classnames';
import Image from 'next/image';
import rootStyles from '../../styles/root.module.css';
import styles from './about.module.css';
// import ImageBorder from '../ImageBorder/ImageBorder';
import profileImage from '/public/images/profile.jpeg';

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
          Software Engineer based out of nowhere
        </p>
        <div className={styles.about__img}>
          {/* <ImageBorder maxHeight={300}> */}
          <Image
            priority
            src={profileImage}
            height={300}
            width={200}
            alt={'Parichay'}
            layout="fixed"
            placeholder={'blur'}
          />
          {/* </ImageBorder> */}
        </div>

        <div className={styles.about__description}>
          <p>
            I love data and crypto. I am trying to build something that users are going to genuinely love and use.
            I am forever trying to be consistent and deal with my ADHD problems.
          </p>
        </div>
      </div>
    </section>
  );
}
