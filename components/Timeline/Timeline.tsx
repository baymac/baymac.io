import cn from 'classnames';
import rootStyles from '../../styles/root.module.css';
import Tape from '../Common/Tape';
import styles from './timeline.module.css';

interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  location: string;
  tag: string;
}

// Reverse chronological — most recent first. Compact per design (jobs ≈ stamps).
const experiences: Experience[] = [
  {
    id: 'minswap',
    company: 'Minswap',
    title: 'Blockchain Engineer',
    period: '2022—2025',
    location: 'Hanoi, VN',
    tag: 'crypto',
  },
  {
    id: 'exodus',
    company: 'Exodus',
    title: 'Blockchain Engineer',
    period: '2022',
    location: 'Bengaluru, IN',
    tag: 'crypto',
  },
  {
    id: 'udaan',
    company: 'Udaan',
    title: 'Product Engineer',
    period: '2020—2022',
    location: 'Bengaluru, IN',
    tag: 'data',
  },
  {
    id: 'cypherock',
    company: 'Cypherock',
    title: 'Blockchain Intern',
    period: '2019',
    location: 'New Delhi, IN',
    tag: 'crypto',
  },
  {
    id: 'jenkins-gsoc',
    company: 'Jenkins (GSoC)',
    title: 'Student Intern',
    period: '2019',
    location: 'Rourkela, IN',
    tag: 'oss',
  },
];

// Slight tilt per card so they read as stamps on paper, not a grid.
const CARD_ROTATIONS = [1, -1.5, 1, -2, 0.5];

export default function Timeline() {
  return (
    <section
      className={cn(rootStyles.section, styles.timeline__section)}
      id="experience"
    >
      <div className={cn(rootStyles.container, styles.timeline__container)}>
        <h2 className={styles.timeline__title}>
          where i&apos;ve been{' '}
          <span className={styles.timeline__annot}>(jobs ≈ stamps)</span>
        </h2>

        <div className={styles.grid}>
          {experiences.map((experience, index) => (
            <div
              key={experience.id}
              className={styles.cardWrap}
              style={{
                transform: `rotate(${
                  CARD_ROTATIONS[index % CARD_ROTATIONS.length]
                }deg)`,
              }}
            >
              <Tape
                rotate={CARD_ROTATIONS[index % CARD_ROTATIONS.length] * -2}
                style={{
                  /* Half-on / half-off: tape center sits on the card's top
                     edge. cardWrap has no padding-top, so tape top = -h/2
                     puts its center at y=0 (the article top). Matches the
                     washi design ref (lu5BsM). */
                  left: '50%',
                  top: -14,
                  marginLeft: -42,
                  width: 84,
                  height: 28,
                  zIndex: 2,
                }}
              />
              <article className={styles.card} data-wobble>
                <h3 className={styles.company}>{experience.company}</h3>
                <p className={styles.title}>{experience.title}</p>
                <div className={styles.meta}>
                  <span>{experience.period}</span>
                  <span>{experience.location}</span>
                </div>
                <div className={styles.tagLine}>► tag: {experience.tag}</div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
