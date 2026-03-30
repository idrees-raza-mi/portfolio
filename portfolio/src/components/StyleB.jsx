import styles from './StyleB.module.css';

export default function StyleB({ project, side }) {
  const colorSchemes = {
    2: { leftBg: '#185FA5', accent: '#6366f1', code: '#4f46e5', text: '#a5b4fc', textMuted: '#818cf8', previewBg: '#e8eeff', backBg: '#1e1b4b', codeBg: '#12104a' },
    6: { leftBg: '#0F6E56', accent: '#059669', code: '#059669', text: '#6ee7b7', textMuted: '#6ee7b7', previewBg: '#e6f9ef', backBg: '#064e3b', codeBg: '#043a2c' },
  };
  const colors = colorSchemes[project.id] || colorSchemes[2];

  if (side === 'back') {
    return (
      <div className={styles.backContainer} style={{ background: colors.backBg }}>
        <span className={styles.sbl} style={{ color: colors.textMuted }}>BACKEND STACK</span>
        <span className={styles.sbn}>{project.name}</span>
        <span className={styles.sbd} style={{ color: colors.text }}>{project.backDesc}</span>
        <div className={styles.sbc} style={{ background: colors.codeBg }}>
          <span className={styles.sbli} style={{ width: '72%', background: colors.code, opacity: 0.6 }}></span>
          <span className={styles.sbli} style={{ width: '50%', background: colors.text, opacity: 0.4 }}></span>
          <span className={styles.sbli} style={{ width: '82%', background: colors.code, opacity: 0.5 }}></span>
        </div>
        <div className={styles.sbt}>
          {project.backTags.slice(0, 3).map(t => (
            <span key={t} className={styles.sbti} style={{ background: `${colors.text}20`, color: colors.text }}>{t}</span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.front}>
      <div className={styles.left} style={{ background: colors.leftBg }}>
        <div className={styles.logo}></div>
        <span className={styles.name}>{project.name}</span>
        <span className={styles.sub}>Personalizer</span>
      </div>
      <div className={styles.right}>
        <div className={styles.preview} style={{ background: colors.previewBg }}>
          <span className={styles.pl} style={{ width: '65%', background: colors.accent }}></span>
          <span className={styles.pl} style={{ width: '45%', background: `${colors.accent}80` }}></span>
          <span className={styles.pb} style={{ background: `${colors.accent}30` }}></span>
          <span className={styles.pl} style={{ width: '55%', background: `${colors.accent}80` }}></span>
        </div>
        <div className={styles.meta}>
          <span className={styles.ml} style={{ color: colors.accent }}>FRONTEND</span>
          <span className={styles.mv}>Canvas Editor</span>
        </div>
        <div className={styles.tags}>
          {project.frontTags.slice(0, 2).map(t => (
            <span key={t} className={styles.t} style={{ background: `${colors.accent}20`, color: colors.accent }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
