import cn from 'classnames';
import rootStyles from '../../styles/root.module.css';
import styles from './timeline.module.css';

interface Experience {
  title: string;
  company: string;
  period: string;
  location: string;
  description: string[];
}

const experiences: Experience[] = [

  {
    title: 'Blockchain Engineer',
    company: 'Minswap',
    period: 'May 2022 - Jan 2025',
    location: 'Hanoi, Vietnam',
    description: [
      'Work on wallet experience - integrating wallets, transaction building sdk, portfolio services, data analytics'
    ]
  },
  {
    title: 'Blockchain Engineer',
    company: 'Exodus',
    period: 'May 2022 - July 2022',
    location: 'Bengaluru, India',
    description: [
      'Add support for ethereum and solana to wallet extension'
    ]
  },
  {
    title: 'Product Engineer',
    company: 'Udaan',
    period: 'Jan 2020 - March 2022',
    location: 'Bengaluru, India',
    description: [
      'Develop data platform - handling petabytes of data and serving business development'
    ]
  },
  {
    title: 'Blockchain Intern',
    company: 'Cypherock',
    period: 'Sept 2019 - Nov 2019',
    location: 'New Delhi, India',
    description: [
      'Develop signing only hardware wallet and wallet desktop application'
    ]
  },
  {
    title: 'Student Intern',
    company: 'Jenkins (Google Summer of Code)',
    period: 'May 2019 - Aug 2019',
    location: 'Rourkela, India',
    description: [
      'Develop Gitlab integration to Jenkins'
    ]
  }
];

export default function Timeline() {
  return (
    <section className={cn(rootStyles.section, styles.timeline__section)} id="experience">
      <div className={cn(rootStyles.container, rootStyles.grid, styles.timeline__container)}>
        <h2 className={styles.timeline__title}>Work Experience</h2>
        <p className={styles.timeline__subtitle}>
          My journey from intern to blockchain engineer
        </p>

        <div className={styles.timeline__content}>
          {experiences.map((experience, index) => (
            <div key={index} className={styles.timeline__item}>
              <div className={styles.timeline__marker}>
                <div className={styles.timeline__dot}></div>
                {index < experiences.length - 1 && (
                  <div className={styles.timeline__line}></div>
                )}
              </div>

              <div className={styles.timeline__content}>
                <div className={styles.timeline__header}>
                  <h3 className={styles.timeline__jobTitle}>{experience.title}</h3>
                  <span className={styles.timeline__company}>{experience.company}</span>
                  <span className={styles.timeline__period}>{experience.period}</span>
                  <span className={styles.timeline__location}>{experience.location}</span>
                </div>

                <div className={styles.timeline__description}>
                  {experience.description.map((desc, descIndex) => (
                    <p key={descIndex} className={styles.timeline__descItem}>
                      {desc}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
