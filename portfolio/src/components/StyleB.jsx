import styles from './StyleB.module.css';

export default function StyleB({ project, side }) {
  const colorSchemes = {
    2: { leftBg: '#185FA5', accent: '#6366f1', code: '#4f46e5', text: '#a5b4fc', textMuted: '#818cf8' },
    6: { leftBg: '#0F6E56', accent: '#059669', code: '#059669', text: '#6ee7b7', textMuted: '#6ee7b7' },
  };
  const scheme = colorSchemes[project.id] || colorSchemes[2];

  if (side === 'back') {
    return (
      <div className={styles.backContainer} style={{ background: scheme.leftBg === '#185FA5' ? '#1e1b4b' : '#064e3b' }}>
        <span className={styles.sbl} style={{ color: scheme.textMuted }}>BACKEND STACK</span>
        <span className={styles.sbn}>{project.name}</span>
        <span className={styles.sbd} style={{ color: scheme.text }}>{project.backDesc}</span>
        <div className={styles.sbc} style={{ background: `${scheme.leftBg === '#185FA5' ? '#12104a' : '#043a2c'}` }}>
          <span className={styles.sbli} style={{ width: '72%', background: scheme.code, opacity: 0.6 }}></span>
          <span className={styles.sbli} style={{ width: '50%', background: scheme.text, opacity: 0.4 }}></span>
          <span className={styles.sbli} style={{ width: '82%', background: scheme.code, opacity: 0.5 }}></span>
        </div>
        <div className={styles.sbt}>
          {project.backTags.slice(0, 3).map(t => (
            <span key={t} className={styles.sbti} style={{ background: `${scheme.text}20`, color: scheme.text }}>{t}</span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.front}>
      <div className={styles.left} style={{ background: scheme.leftBg }}>
        <div className={styles.logo}></div>
        <span className={styles.name}>{project.name}</span>
        <span className={styles.sub}>Personalizer</span>
      </div>
      <div className={styles.right}>
        <div className={styles.preview}>
          <span className={styles.pl} style={{ width: '65%', background: scheme.accent }}></span>
          <span className={styles.pl} style={{ width: '45%', background: `${scheme.accent}80` }}></span>
          <span className={styles.pb} style={{ background: `${scheme.accent}30` }}></span>
          <span className={styles.pl} style={{ width: '55%', background: `${scheme.accent}80` }}></span>
        </div>
        <div className={styles.meta}>
          <span className={styles.ml} style={{ color: scheme.accent }}>FRONTEND</span>
          <span className={styles.mv}>Canvas Editor</span>
        </div>
        <div className={styles.tags}>
          {project.frontTags.slice(0, 2).map(t => (
            <span key={t} className={styles.t} style={{ background: `${scheme.accent}20`, color: scheme.accent }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
