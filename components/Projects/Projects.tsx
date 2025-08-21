import cn from 'classnames';
import rootStyles from '../../styles/root.module.css';
import styles from './projects.module.css';

interface Project {
  title: string;
  description: string;
  link?: string;
  github?: string;
}

const projects: Project[] = [
  {
    title: 'Ace Base',
    description: 'A fast and responsive website for a tennis academy',
    link: 'https://acebasetennis.in/'
  },
  {
    title: 'Fail Tell',
    description: 'Led infrastructure development, talent acquisition and product strategy for a mental health platform'
  },
  {
    title: 'Material UI Cron',
    description: 'An intuitive UI for building Cron expressions',
    link: 'https://github.com/baymac/material-ui-cron'
  },
  {
    title: 'Biryanify',
    description: 'Managed operations, marketing and Shopify development for a cloud kitchen startup'
  },
  {
    title: 'Upload PDF to Drive',
    description: 'A github action that uploads PDFs to Google Drive. Useful for LaTeX builds.',
    link: 'https://github.com/baymac/upload-pdf-to-drive'
  },
  {
    title: 'ESLint Plugin',
    description: 'An ESLint plugin for custom error handling and type-safe equality checks',
    link: 'https://github.com/minswap/eslint-plugin'
  },
  {
    title: 'Noodles.fi',
    description: 'An analytics platform for SUI DeFi. Built for SUI Bangkok Hacker House hackathon. Won 1st place ($3k).',
    link: 'https://github.com/sui-foundation/sui-demo-day-bangkok/blob/main/demo-projects/noodles.fi.md'
  },
  {
    title: 'Cred Jack',
    description: 'A gamified token rewards system using CRED app. Built for Solana Building Out Loud hackathon. Won 1st place ($5k).',
    link: 'https://github.com/baymac/cred-jack'
  },
  {
    title: 'Buy Me Crypto',
    description: 'A Solana-based platform enabling creators and fans to support each other through crypto',
    link: 'https://github.com/baymac/buy-me-crypto'
  },
  {
    title: 'Wallet Connect Cardano',
    description: 'A dApp library that supports Cardano for compatible wallets. Received $5k grant from dcSpark.',
    link: 'https://x.com/dcspark_io/status/1688489778042351616'
  },
  {
    title: 'Publish Docs to Drive',
    description: 'An AppScript that publishes Google Docs to Google Drive as PDF.',
    link: 'https://github.com/baymac/fun-hacks/tree/master/Apps%20Script/Publish%20Over%20Drive%20-%20Docs'
  },
  {
    title: 'Publish Form to Database',
    description: 'An AppScript that publishes Google Form responses to Firebase.',
    link: 'https://github.com/baymac/fun-hacks/blob/master/Apps%20Script/Firebase%20Response/form.gs'
  },
  {
    title: 'Phone Alarm Bot',
    description: 'An Android bot to call a phone number at a given time. Useful for waking up someone who has early morning flight.',
    link: 'https://github.com/baymac/fun-hacks/blob/master/Python/Android%20call%20bot/callBot.py'
  },
  {
    title: 'Command Keeper',
    description: 'A gnome shell extension to store commands and copy to clipboard when needed.',
    link: 'https://github.com/baymac/command-keeper'
  },
];

export default function Projects() {
  return (
    <section className={cn(rootStyles.section, styles.projects__section)} id="projects">
      <div className={cn(rootStyles.container, rootStyles.grid, styles.projects__container)}>
        <h2 className={styles.projects__title}>Projects</h2>
        <p className={styles.projects__subtitle}>
          A collection of my work across web dev, blockchain and open source
        </p>

        <div className={styles.projects__grid}>
          {projects.map((project, index) => (
            <div key={index} className={styles.project__card}>
              <div className={styles.project__header}>
                <h3 className={styles.project__title}>{project.title}</h3>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.project__link}
                  >
                    🔗
                  </a>
                )}
              </div>

              <p className={styles.project__description}>{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
