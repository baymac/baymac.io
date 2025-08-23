import cn from 'classnames';
import Image from 'next/image';
import rootStyles from '../../styles/root.module.css';
import styles from './skills.module.css';

interface Skill {
  id: string;
  name: string;
  icon: string;
  level: 'expertise' | 'professional' | 'beginner';
}

const skills: Skill[] = [
  // Expertise
  {
    id: 'typescript',
    name: 'TypeScript',
    icon: '/skills/typescript.svg',
    level: 'expertise',
  },
  {
    id: 'react',
    name: 'React.js',
    icon: '/skills/react.svg',
    level: 'expertise',
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    icon: '/skills/nodejs.svg',
    level: 'expertise',
  },

  // Professional
  { id: 'bash', name: 'Bash', icon: '/skills/bash.svg', level: 'professional' },
  {
    id: 'kotlin',
    name: 'Kotlin/Java',
    icon: '/skills/kotlin.svg',
    level: 'professional',
  },
  {
    id: 'python',
    name: 'Python',
    icon: '/skills/python.svg',
    level: 'professional',
  },
  {
    id: 'kubernetes',
    name: 'Kubernetes',
    icon: '/skills/k8s.svg',
    level: 'professional',
  },
  {
    id: 'docker',
    name: 'Docker',
    icon: '/skills/docker.svg',
    level: 'professional',
  },
  {
    id: 'graphql',
    name: 'GraphQL',
    icon: '/skills/graphql.svg',
    level: 'professional',
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    icon: '/skills/postgresql.svg',
    level: 'professional',
  },
  {
    id: 'css',
    name: 'CSS/Tailwind',
    icon: '/skills/css.svg',
    level: 'professional',
  },
  { id: 'go', name: 'Go', icon: '/skills/go.svg', level: 'professional' },

  // Beginner
  { id: 'rust', name: 'Rust', icon: '/skills/rust.svg', level: 'beginner' },
  { id: 'kafka', name: 'Kafka', icon: '/skills/kafka.svg', level: 'beginner' },
  {
    id: 'android',
    name: 'Android',
    icon: '/skills/android.svg',
    level: 'beginner',
  },
  { id: 'ios', name: 'iOS', icon: '/skills/ios.svg', level: 'beginner' },
  {
    id: 'react-native',
    name: 'React Native',
    icon: '/skills/react-native.svg',
    level: 'beginner',
  },
  {
    id: 'redis',
    name: 'Redis',
    icon: '/skills/redis.svg',
    level: 'beginner',
  },
];

export default function Skills() {
  const expertiseSkills = skills.filter((skill) => skill.level === 'expertise');
  const professionalSkills = skills.filter(
    (skill) => skill.level === 'professional'
  );
  const beginnerSkills = skills.filter((skill) => skill.level === 'beginner');

  const SkillCategory = ({
    title,
    skills,
    className,
  }: { title: string; skills: Skill[]; className: string }) => (
    <div className={styles.skillCategory}>
      <h3 className={styles.categoryTitle}>{title}</h3>
      <div className={cn(styles.skillsGrid, className)}>
        {skills.map((skill) => (
          <div key={skill.id} className={styles.skillItem}>
            <Image
              src={skill.icon}
              alt={`${skill.name} icon`}
              className={styles.skillIcon}
              width={24}
              height={24}
            />
            <span className={styles.skillName}>{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section
      className={cn(rootStyles.section, styles.skills__section)}
      id="skills"
    >
      <div
        className={cn(
          rootStyles.container,
          rootStyles.grid,
          styles.skills__container
        )}
      >
        <h2 className={styles.skills__title}>Skills & Technologies</h2>
        <p className={styles.skills__subtitle}>
          My tech stack organized by proficiency level
        </p>

        <div className={styles.skills__content}>
          <SkillCategory
            title="Expertise"
            skills={expertiseSkills}
            className={styles.expertise}
          />
          <SkillCategory
            title="Professional"
            skills={professionalSkills}
            className={styles.professional}
          />
          <SkillCategory
            title="Learning"
            skills={beginnerSkills}
            className={styles.beginner}
          />
        </div>
      </div>
    </section>
  );
}
