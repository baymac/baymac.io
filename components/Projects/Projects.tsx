import cn from 'classnames';
import Image from 'next/image';
import rootStyles from '../../styles/root.module.css';
import styles from './projects.module.css';

interface Project {
  title: string;
  description: string;
  link?: string;
  github?: string;
}

const projects = [
  {
    id: 'ace-base',
    title: 'Ace Base',
    description: 'A fast and responsive website for a tennis academy',
    link: 'https://acebasetennis.in/',
  },
  {
    id: 'fail-tell',
    title: 'Fail Tell',
    description:
      'Led infrastructure development, talent acquisition and product strategy for a mental health platform',
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
      'Managed operations, marketing and Shopify development for a cloud kitchen startup',
  },
  {
    id: 'upload-pdf-to-drive',
    title: 'Upload PDF to Drive',
    description:
      'A github action that uploads PDFs to Google Drive. Useful for LaTeX builds.',
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
    id: 'noodles-fi',
    title: 'Noodles.fi',
    description:
      'An analytics platform for SUI DeFi. Built for SUI Bangkok Hacker House hackathon. Won 1st place ($3k).',
    link: 'https://github.com/sui-foundation/sui-demo-day-bangkok/blob/main/demo-projects/noodles.fi.md',
  },
  {
    id: 'cred-jack',
    title: 'Cred Jack',
    description:
      'A gamified token rewards system using CRED app. Built for Solana Building Out Loud hackathon. Won 1st place ($5k).',
    link: 'https://github.com/baymac/cred-jack',
  },
  {
    id: 'buy-me-crypto',
    title: 'Buy Me Crypto',
    description:
      'A crypto platform enabling creators and fans to support each other. Submission for Solana Ignition.',
    link: 'https://github.com/baymac/buy-me-crypto',
  },
  {
    id: 'wallet-connect-cardano',
    title: 'Wallet Connect Cardano',
    description:
      'A dApp library that supports Cardano for compatible wallets. Received $5k grant from dcSpark.',
    link: 'https://x.com/dcspark_io/status/1688489778042351616',
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
      'A SL4A script to call a phone number at a given time. Useful for waking up someone who has early morning flight.',
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
  return (
    <section
      className={cn(rootStyles.section, styles.projects__section)}
      id="projects"
    >
      <div
        className={cn(
          rootStyles.container,
          rootStyles.grid,
          styles.projects__container
        )}
      >
        <h2 className={styles.projects__title}>Projects</h2>
        <p className={styles.projects__subtitle}>
          A collection of my work across web dev, blockchain and open source
        </p>

        <div className={styles.projects__grid}>
          {projects.map((project) => (
            <div key={project.id} className={styles.project__card}>
              <div className={styles.project__header}>
                <h3 className={styles.project__title}>{project.title}</h3>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.project__link}
                  >
                    <Image
                      src="/images/link.svg"
                      alt="Link"
                      width={24}
                      height={24}
                    />
                  </a>
                )}
              </div>

              <p className={styles.project__description}>
                {project.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
