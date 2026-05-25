import cn from 'classnames';
import rootStyles from '../../styles/root.module.css';
import styles from './projects.module.css';

function LinkIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M10,17.55,8.23,19.27a2.47,2.47,0,0,1-3.5-3.5l4.54-4.55a2.46,2.46,0,0,1,3.39-.09l.12.1a1,1,0,0,0,1.4-1.43A2.75,2.75,0,0,0,14,9.59a4.46,4.46,0,0,0-6.09.22L3.31,14.36a4.48,4.48,0,0,0,6.33,6.33L11.37,19A1,1,0,0,0,10,17.55ZM20.69,3.31a4.49,4.49,0,0,0-6.33,0L12.63,5A1,1,0,0,0,14,6.45l1.73-1.72a2.47,2.47,0,0,1,3.5,3.5l-4.54,4.55a2.46,2.46,0,0,1-3.39.09l-.12-.1a1,1,0,0,0-1.4,1.43,2.75,2.75,0,0,0,.23.21,4.47,4.47,0,0,0,6.09-.22l4.55-4.55A4.49,4.49,0,0,0,20.69,3.31Z"
      />
    </svg>
  );
}

interface Project {
  id: string;
  title: string;
  description: string;
  link?: string;
  github?: string;
  featured?: boolean;
  prize?: string;
}

// Featured = won money or major grant. Star + accent border only — same
// card size + section as every other project (per design feedback F4 + F18).
// Order: paid projects first (most recent / biggest impact first), then
// unpaid sorted by relevance (active + substantive at the top).
const projects: Project[] = [
  {
    id: 'noodles-fi',
    title: 'Noodles.fi',
    description: 'SUI DeFi analytics. 1st place hackathon.',
    link: 'https://github.com/sui-foundation/sui-demo-day-bangkok/blob/main/demo-projects/noodles.fi.md',
    featured: true,
    prize: '$3k',
  },
  {
    id: 'cred-jack',
    title: 'Cred Jack',
    description: 'Token rewards via CRED. 1st place hackathon.',
    link: 'https://github.com/baymac/cred-jack',
    featured: true,
    prize: '$5k',
  },
  {
    id: 'wallet-connect-cardano',
    title: 'Wallet Connect Cardano',
    description: 'dApp lib for Cardano. dcSpark grant.',
    link: 'https://x.com/dcspark_io/status/1688489778042351616',
    featured: true,
    prize: '$5k',
  },
  {
    id: 'gitlab-branch-source-plugin',
    title: 'GitLab Branch Source',
    description: 'Jenkins multibranch for GitLab. GSoC.',
    link: 'https://github.com/jenkinsci/gitlab-branch-source-plugin',
    featured: true,
    prize: '$3k',
  },
  {
    id: 'ace-base',
    title: 'Ace Base',
    description: 'Tennis academy site. POV not a designer.',
    link: 'https://acebasetennis.in/',
    featured: true,
    prize: '$100',
  },
  {
    id: 'dj',
    title: 'DJ',
    description: 'Enrich tracks from Beatport + many other sources.',
    link: 'https://github.com/baymac/dj',
  },
  {
    id: 'self-notes',
    title: 'Self Notes',
    description: 'Local RAG over Notion. Ollama-powered.',
    link: 'https://github.com/baymac/self-notes',
  },
  {
    id: 'buy-me-crypto',
    title: 'Buy Me Crypto',
    description: 'Creator tipping on Solana. Solana Ignition.',
    link: 'https://github.com/baymac/buy-me-crypto',
  },
  {
    id: 'eslint-plugin',
    title: 'ESLint Plugin',
    description: 'Custom error handling + type-safe equality.',
    link: 'https://github.com/minswap/eslint-plugin',
  },
  {
    id: 'material-ui-cron',
    title: 'Material UI Cron',
    description: 'Intuitive cron expression builder.',
    link: 'https://github.com/baymac/material-ui-cron',
  },
  {
    id: 'yt-sum',
    title: 'YT Sum',
    description: 'Chrome ext: summarize YouTube videos.',
    link: 'https://github.com/baymac/yt-sum',
  },
  {
    id: 'x-article-pdf',
    title: 'X Article PDF',
    description: 'Save X (Twitter) articles as PDFs.',
    link: 'https://github.com/baymac/x-article-pdf',
  },
  {
    id: 'quick-vpn',
    title: 'Quick VPN',
    description: 'One-shot VPN connect script.',
    link: 'https://github.com/baymac/quick-vpn',
  },
  {
    id: 'fail-tell',
    title: 'Fail Tell',
    description: 'Mental wellness platform. Infra + product.',
  },
  {
    id: 'biryanify',
    title: 'Biryanify',
    description: 'Cloud kitchen ops, marketing, web/app.',
  },
  {
    id: 'upload-pdf-to-drive',
    title: 'Upload PDF to Drive',
    description: 'GitHub Action for LaTeX builds.',
    link: 'https://github.com/baymac/upload-pdf-to-drive',
  },
  {
    id: 'command-keeper',
    title: 'Command Keeper',
    description: 'Gnome shell extension for commands.',
    link: 'https://github.com/baymac/command-keeper',
  },
  {
    id: 'phone-alarm-bot',
    title: 'Phone Alarm Bot',
    description: 'SL4A wake-up call script.',
    link: 'https://github.com/baymac/fun-hacks/blob/master/Python/Android%20call%20bot/callBot.py',
  },
  {
    id: 'publish-docs-to-drive',
    title: 'Publish Docs to Drive',
    description: 'AppScript: Docs → PDF on Drive.',
    link: 'https://github.com/baymac/fun-hacks/tree/master/Apps%20Script/Publish%20Over%20Drive%20-%20Docs',
  },
  {
    id: 'set-proxy',
    title: 'Set Proxy',
    description: 'CLI proxy setter for Linux. KWoC.',
    link: 'https://github.com/thealphadollar/set_proxy',
  },
];

export default function Projects() {
  return (
    <section
      className={cn(rootStyles.section, styles.projects__section)}
      id="projects"
    >
      <div className={cn(rootStyles.container, styles.projects__container)}>
        <h2 className={styles.projects__title}>
          things i&apos;ve built{' '}
          <span className={styles.projects__annot}>(★ = got paid)</span>
        </h2>

        <div className={styles.grid}>
          {projects.map((project) => (
            <article
              key={project.id}
              className={cn(
                styles.card,
                project.featured && styles.cardFeatured
              )}
              data-wobble
            >
              <div className={styles.cornerIcons}>
                {project.featured && (
                  <span
                    className={styles.star}
                    role="img"
                    aria-label="featured project"
                    title={
                      project.prize
                        ? `Featured — ${project.prize}`
                        : 'Featured project'
                    }
                  >
                    ★
                  </span>
                )}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.cardLink}
                    aria-label={`${project.title} link`}
                  >
                    <LinkIcon />
                  </a>
                )}
              </div>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle} title={project.title}>
                  {project.title}
                </h3>
              </div>
              <p className={styles.cardDescription} title={project.description}>
                {project.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
