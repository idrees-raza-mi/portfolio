import styles from './StyleD.module.css';

export default function StyleD({ project, side }) {
  const colorSchemes = {
    4: { primary: '#378ADD', secondary: '#7F77DD', frontBg: '#1a1a1a', backBg: '#1e1e30', backCode: '#252540' },
    8: { primary: '#D85A30', secondary: '#D85A30', frontBg: '#1a1a1a', backBg: '#251510', backCode: '#352015' },
  };
  const scheme = colorSchemes[project.id] || colorSchemes[4];
  const num = project.id === 4 ? '04' : '08';

  if (side === 'back') {
    return (
      <div className={styles.backContainer} style={{ background: scheme.backBg }}>
        <span className={styles.num}>{num}</span>
        <span className={styles.cat} style={{ color: scheme.secondary }}>BACKEND STACK</span>
        <span className={styles.name}>{project.name}</span>
        <span className={styles.line} style={{ background: scheme.secondary }}></span>
        <span className={styles.desc}>{project.backDesc}</span>
        <div className={styles.code} style={{ background: scheme.backCode }}>
          <span className={styles.l} style={{ width: '72%', background: scheme.secondary, opacity: 0.5 }}></span>
          <span className={styles.l} style={{ width: '50%', background: scheme.primary, opacity: 0.4 }}></span>
          <span className={styles.l} style={{ width: '82%', background: scheme.secondary, opacity: 0.4 }}></span>
        </div>
        <div className={styles.tags}>
          {project.backTags.slice(0, 3).map(t => (
            <span key={t} className={styles.t} style={{ background: scheme.backBg, color: scheme.secondary, border: '0.5px solid #3a1500' }}>{t}</span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.front} style={{ background: scheme.frontBg }}>
      <span className={styles.num}>{num}</span>
      <span className={styles.cat}>FRONTEND STACK</span>
      <span className={styles.name}>{project.name}</span>
      <span className={styles.line} style={{ background: scheme.primary }}></span>
      <span className={styles.desc}>{project.frontDesc}</span>
      <div className={styles.mini}>
        <span className={styles.m}><span className={styles.mb} style={{ background: scheme.primary }}></span></span>
        <span className={styles.m}><span className={styles.mb} style={{ background: scheme.secondary, width: '40%' }}></span></span>
      </div>
      <div className={styles.tags}>
        {project.frontTags.slice(0, 3).map(t => (
          <span key={t} className={styles.t}>{t}</span>
        ))}
      </div>
    </div>
  );
}
