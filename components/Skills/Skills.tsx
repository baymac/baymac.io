import cn from 'classnames';
import rootStyles from '../../styles/root.module.css';
import styles from './skills.module.css';

interface Skill {
  name: string;
  icon: string;
  level: 'expertise' | 'professional' | 'beginner';
}

const skills: Skill[] = [
  // Expertise
  { name: 'TypeScript', icon: '⚡', level: 'expertise' },
  { name: 'React.js', icon: '⚛️', level: 'expertise' },
  { name: 'Node.js', icon: '🟢', level: 'expertise' },

  // Professional
  { name: 'Bash', icon: '🐚', level: 'professional' },
  { name: 'Java/Kotlin', icon: '☕', level: 'professional' },
  { name: 'Python', icon: '🐍', level: 'professional' },
  { name: 'AWS', icon: '☁️', level: 'professional' },
  { name: 'Kubernetes', icon: '☸️', level: 'professional' },
  { name: 'Docker', icon: '🐳', level: 'professional' },
  { name: 'GraphQL', icon: '🔷', level: 'professional' },
  { name: 'OAuth2', icon: '🔥', level: 'professional' },
  { name: 'PostgreSQL', icon: '🐘', level: 'professional' },
  { name: 'CSS/Tailwind', icon: '🎨', level: 'professional' },

  // Beginner
  { name: 'Rust', icon: '🦀', level: 'beginner' },
  { name: 'Kafka', icon: '📨', level: 'beginner' },
  { name: 'Android', icon: '🤖', level: 'beginner' },
  { name: 'iOS', icon: '🍎', level: 'beginner' },
  { name: 'React Native', icon: '📱', level: 'beginner' },
];

export default function Skills() {
  const expertiseSkills = skills.filter(skill => skill.level === 'expertise');
  const professionalSkills = skills.filter(skill => skill.level === 'professional');
  const beginnerSkills = skills.filter(skill => skill.level === 'beginner');

  const SkillCategory = ({ title, skills, className }: { title: string; skills: Skill[]; className: string }) => (
    <div className={styles.skillCategory}>
      <h3 className={styles.categoryTitle}>{title}</h3>
      <div className={cn(styles.skillsGrid, className)}>
        {skills.map((skill, index) => (
          <div key={index} className={styles.skillItem}>
            <span className={styles.skillIcon}>{skill.icon}</span>
            <span className={styles.skillName}>{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section className={cn(rootStyles.section, styles.skills__section)} id="skills">
      <div className={cn(rootStyles.container, styles.skills__container)}>
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
