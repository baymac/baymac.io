import cn from 'classnames';
import Image from 'next/image';
import rootStyles from '../../styles/root.module.css';
import styles from './projects.module.css';

interface Project {
  id: string;
  title: string;
  description: string;
  link?: string;
  github?: string;
  featured?: boolean;
  prize?: string;
  context?: string;
}

const projects: Project[] = [
  {
    id: 'noodles-fi',
    title: 'Noodles.fi',
    description:
      'An analytics platform for SUI DeFi. Built for SUI Bangkok Hacker House hackathon. Won 1st place.',
    link: 'https://github.com/sui-foundation/sui-demo-day-bangkok/blob/main/demo-projects/noodles.fi.md',
    featured: true,
    prize: '$3k',
    context: 'SUI Bangkok Hacker House — 1st place',
  },
  {
    id: 'cred-jack',
    title: 'Cred Jack',
    description:
      'A gamified token rewards system using CRED app. Built for Solana Building Out Loud hackathon. Won 1st place.',
    link: 'https://github.com/baymac/cred-jack',
    featured: true,
    prize: '$5k',
    context: 'Solana Building Out Loud — 1st place',
  },
  {
    id: 'wallet-connect-cardano',
    title: 'Wallet Connect Cardano',
    description:
      'A dApp library that supports Cardano for compatible wallets.',
    link: 'https://x.com/dcspark_io/status/1688489778042351616',
    featured: true,
    prize: '$5k',
    context: 'dcSpark grant',
  },
  {
    id: 'ace-base',
    title: 'Ace Base',
    description:
      'A fast and responsive website for a tennis academy. POV not a designer',
    link: 'https://acebasetennis.in/',
  },
  {
    id: 'fail-tell',
    title: 'Fail Tell',
    description:
      'Helped with infrastructure and product development and talent acquisition for a mental wellness platform',
  },
  {
    id: 'material-ui-cron',
    title: 'Material UI Cron',
    description: 'An intuitive UI for building Cron expressions',
    link: 'https://github.com/baymac/material-ui-cron',
  },
  {
    id: 'biryanify',
    title: 'Biryanify',
    description:
      'Managed operations, marketing and web and app development for a cloud kitchen startup',
  },
  {
    id: 'upload-pdf-to-drive',
    title: 'Upload PDF to Drive',
    description:
      'A GitHub action that uploads PDFs to Google Drive. Useful for LaTeX builds.',
    link: 'https://github.com/baymac/upload-pdf-to-drive',
  },
  {
    id: 'eslint-plugin',
    title: 'ESLint Plugin',
    description:
      'An ESLint plugin for custom error handling and type-safe equality checks',
    link: 'https://github.com/minswap/eslint-plugin',
  },
  {
    id: 'buy-me-crypto',
    title: 'Buy Me Crypto',
    description:
      'A crypto platform enabling creators and fans to support each other. Submission for Solana Ignition.',
    link: 'https://github.com/baymac/buy-me-crypto',
  },
  {
    id: 'publish-docs-to-drive',
    title: 'Publish Docs to Drive',
    description:
      'An AppScript that publishes Google Docs to Google Drive as PDF.',
    link: 'https://github.com/baymac/fun-hacks/tree/master/Apps%20Script/Publish%20Over%20Drive%20-%20Docs',
  },
  {
    id: 'publish-form-to-database',
    title: 'Publish Form to Database',
    description:
      'An AppScript that publishes Google Form responses to Firebase.',
    link: 'https://github.com/baymac/fun-hacks/blob/master/Apps%20Script/Firebase%20Response/form.gs',
  },
  {
    id: 'phone-alarm-bot',
    title: 'Phone Alarm Bot',
    description:
      'A SL4A script to call a phone number at a specified time. Useful for waking up someone who has early morning flight.',
    link: 'https://github.com/baymac/fun-hacks/blob/master/Python/Android%20call%20bot/callBot.py',
  },
  {
    id: 'command-keeper',
    title: 'Command Keeper',
    description:
      'A gnome shell extension to store commands and copy to clipboard when needed.',
    link: 'https://github.com/baymac/command-keeper',
  },
  {
    id: 'personal-blog',
    title: 'Personal Blog',
    description:
      "A personal blog to showcase my projects and share ideas. Couldn't renew my domain now it is unaffordable, so using a backup",
    link: 'https://github.com/baymac/baymac.io',
  },
  {
    id: 'set-proxy',
    title: 'Set Proxy',
    description:
      'A CLI tool to set proxy for linux services. Develop website for this project. Internship at Kharagpur Winter of Code (KWoC).',
    link: 'https://github.com/thealphadollar/set_proxy',
  },
];

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const secondary = projects.filter((p) => !p.featured);

  return (
    <section
      className={cn(rootStyles.section, styles.projects__section)}
      id="projects"
    >
      <div className={cn(rootStyles.container, styles.projects__container)}>
        <h2 className={styles.projects__title}>things i&apos;ve built</h2>
        <p className={styles.projects__subtitle}>
          a collection of work across web dev, blockchain and open source
        </p>

        {/* Featured tier */}
        <div className={styles.featuredGrid}>
          {featured.map((project) => (
            <article
              key={project.id}
              className={styles.featuredCard}
              data-wobble
            >
              <div className={styles.featuredHeader}>
                <span className={styles.star} aria-hidden="true">
                  ★
                </span>
                <h3 className={styles.featuredTitle}>{project.title}</h3>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.project__link}
                    aria-label={`${project.title} link`}
                  >
                    <Image
                      src="/images/link.svg"
                      alt=""
                      width={24}
                      height={24}
                    />
                  </a>
                )}
              </div>
              {project.prize && (
                <div className={styles.featuredPrize}>
                  <span className={styles.prizeAmount}>+{project.prize}</span>
                  {project.context && (
                    <span className={styles.prizeContext}>
                      {project.context}
                    </span>
                  )}
                </div>
              )}
              <p className={styles.featuredDescription}>
                {project.description}
              </p>
            </article>
          ))}
        </div>

        {/* Secondary grid */}
        <div className={styles.secondaryGrid}>
          {secondary.map((project) => (
            <article
              key={project.id}
              className={styles.secondaryCard}
              data-wobble
            >
              <div className={styles.project__header}>
                <h3 className={styles.secondaryTitle}>{project.title}</h3>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.project__link}
                    aria-label={`${project.title} link`}
                  >
                    <Image
                      src="/images/link.svg"
                      alt=""
                      width={20}
                      height={20}
                    />
                  </a>
                )}
              </div>
              <p className={styles.secondaryDescription}>
                {project.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
