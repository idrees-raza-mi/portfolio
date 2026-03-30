import styles from './StyleC.module.css';

export default function StyleC({ project, side }) {
  const colorSchemes = {
    3: { topBg: '#eef3ff', catColor: '#6b7aaa', accent: '#93b4e8', bar: '#f0f2fa', bg: '#eef1ff', text: '#3a4aaa', termBg: '#0e1120', termBar: '#191e34', termLine: '#1D9E75', backBg: '#1a1f3a', backCat: '#5a6aaa', backText: '#7a9aee' },
    7: { topBg: '#fff8ee', catColor: '#92640a', accent: '#fcd38a', bar: '#f0f2fa', bg: '#fef3c7', text: '#92400e', termBg: '#120f00', termBar: '#191e34', termLine: '#BA7517', backBg: '#1c1500', backCat: '#92640a', backText: '#d97706' },
  };
  const scheme = colorSchemes[project.id] || colorSchemes[3];

  if (side === 'back') {
    return (
      <div className={styles.backContainer} style={{ background: scheme.backBg }}>
        <div className={styles.scbTop} style={{ background: scheme.termBg === '#0e1120' ? '#131728' : '#120f00' }}>
          <div className={styles.scbTerm}>
            <div className={styles.scbTbar} style={{ background: scheme.termBar }}>
              <span className={styles.bd} style={{ background: '#ff5f57' }}></span>
              <span className={styles.bd} style={{ background: '#febc2e' }}></span>
              <span className={styles.bd} style={{ background: '#28c840' }}></span>
            </div>
            <div className={styles.scbTbody}>
              <span className={styles.scbTl} style={{ width: '68%', background: scheme.termLine, opacity: 0.7 }}></span>
              <span className={styles.scbTl} style={{ width: '82%', background: scheme.termBg === '#0e1120' ? '#252a45' : '#252010' }}></span>
              <span className={styles.scbTl} style={{ width: '48%', background: scheme.termLine, opacity: 0.5 }}></span>
            </div>
          </div>
        </div>
        <div className={styles.scbInfo}>
          <span className={styles.scbCat} style={{ color: scheme.backCat }}>BACKEND</span>
          <span className={styles.scbName}>{project.name}</span>
          <span className={styles.scbDesc} style={{ color: scheme.backText }}>{project.backDesc}</span>
        </div>
        <div className={styles.scbFoot}>
          {project.backTags.slice(0, 3).map(t => (
            <span key={t} className={styles.scbFt} style={{ background: scheme.termBg === '#0e1120' ? '#252a45' : '#1c1200', color: scheme.backText }}>{t}</span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.front}>
      <div className={styles.top} style={{ background: scheme.topBg }}>
        <div className={styles.browser}>
          <div className={styles.bbar} style={{ background: scheme.bar }}>
            <span className={styles.bd} style={{ background: '#ff5f57' }}></span>
            <span className={styles.bd} style={{ background: '#febc2e' }}></span>
            <span className={styles.bd} style={{ background: '#28c840' }}></span>
          </div>
          <div className={styles.bbody}>
            <div className={styles.bg}>
              <span className={styles.bb}></span>
              <span className={styles.bb}></span>
            </div>
            <span className={styles.bl} style={{ width: '70%', background: scheme.accent }}></span>
            <span className={styles.bl} style={{ width: '50%' }}></span>
          </div>
        </div>
      </div>
      <div className={styles.info}>
        <span className={styles.cat} style={{ color: scheme.catColor }}>FRONTEND</span>
        <span className={styles.name}>{project.name}</span>
        <span className={styles.desc} style={{ color: scheme.catColor }}>{project.frontDesc}</span>
      </div>
      <div className={styles.foot}>
        {project.frontTags.slice(0, 2).map(t => (
          <span key={t} className={styles.ft} style={{ background: scheme.bg, color: scheme.text }}>{t}</span>
        ))}
      </div>
    </div>
  );
}
