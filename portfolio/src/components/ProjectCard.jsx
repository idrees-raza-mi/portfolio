import { useState } from 'react';
import styles from './ProjectCard.module.css';

export default function ProjectCard({ project }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={styles.wrap}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped(f => !f)}
    >
      <div className={`${styles.inner} ${flipped ? styles.flipped : ''}`}>

        <div className={`${styles.face} ${styles.front}`}>
          <div>
            <p className={styles.label}>FRONTEND</p>
            <p className={styles.name}>{project.name}</p>
            <p className={styles.desc}>{project.frontDesc}</p>
          </div>
          <div className={styles.tags}>
            {project.frontTags.map(t => <span key={t} className={styles.tag}>{t}</span>)}
          </div>
        </div>

        <div className={`${styles.face} ${styles.back}`}>
          <div>
            <p className={styles.label}>BACKEND</p>
            <p className={styles.name}>{project.name}</p>
            <p className={styles.desc}>{project.backDesc}</p>
          </div>
          <div className={styles.tags}>
            {project.backTags.map(t => <span key={t} className={styles.tag}>{t}</span>)}
          </div>
        </div>

      </div>
    </div>
  );
}
