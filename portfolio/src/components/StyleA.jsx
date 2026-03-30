import styles from './StyleA.module.css';

export default function StyleA({ project, side }) {
  const accentColors = {
    1: { primary: '#378ADD', secondary: '#0F6E56', bodyBg: '#252540', statBg: '#1e1e30' },
    2: { primary: '#6366f1', secondary: '#4f46e5', bodyBg: '#252540', statBg: '#1e1e30' },
    5: { primary: '#534AB7', secondary: '#185FA5', bodyBg: '#252540', statBg: '#1e1e30' },
  };
  const colors = accentColors[project.id] || { primary: '#378ADD', secondary: '#0F6E56', bodyBg: '#252540', statBg: '#1e1e30' };

  if (side === 'back') {
    return (
      <div className={styles.backContainer}>
        <div className={styles.bar}>
          <span className={styles.dot} style={{ background: '#ff5f57' }}></span>
          <span className={styles.dot} style={{ background: '#febc2e' }}></span>
          <span className={styles.dot} style={{ background: '#28c840' }}></span>
        </div>
        <div className={styles.termBody}>
          <span className={styles.tl} style={{ width: '78%', background: '#1D9E75' }}></span>
          <span className={styles.tl} style={{ width: '55%' }}></span>
          <span className={styles.tl} style={{ width: '66%', background: '#1D9E75' }}></span>
          <span className={styles.tl} style={{ width: '42%', background: '#BA7517' }}></span>
          <span className={styles.tl} style={{ width: '82%', background: '#1D9E75' }}></span>
          <span className={styles.tl} style={{ width: '50%' }}></span>
        </div>
        <div className={styles.foot}>
          <span className={styles.pname}>{project.name}</span>
          <div className={styles.tags}>
            {project.backTags.slice(0, 2).map(t => (
              <span key={t} className={styles.tag} style={{ background: `${colors.secondary}30`, color: colors.secondary }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.front}>
      <div className={styles.bar}>
        <span className={styles.dot} style={{ background: '#ff5f57' }}></span>
        <span className={styles.dot} style={{ background: '#febc2e' }}></span>
        <span className={styles.dot} style={{ background: '#28c840' }}></span>
      </div>
      <div className={styles.body}>
        <div className={styles.nav}>
          <span className={styles.ni} style={{ width: 28 }}></span>
          <span className={styles.ni} style={{ width: 20, opacity: 0.3 }}></span>
          <span className={styles.ni} style={{ width: 24, opacity: 0.3 }}></span>
        </div>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.snum} style={{ color: colors.primary }}>142</span>
            <span className={styles.slbl}>Orders</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.snum} style={{ color: colors.primary }}>98%</span>
            <span className={styles.slbl}>Delivered</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.snum} style={{ color: colors.primary }}>12</span>
            <span className={styles.slbl}>Couriers</span>
          </div>
        </div>
        <div className={styles.rows}>
          <div className={styles.row}><span className={styles.badge} style={{ background: colors.secondary }}></span></div>
          <div className={styles.row}><span className={styles.badge} style={{ background: colors.primary }}></span></div>
          <div className={styles.row}><span className={styles.badge} style={{ background: colors.secondary }}></span></div>
        </div>
      </div>
      <div className={styles.foot}>
        <span className={styles.pname}>{project.name}</span>
        <div className={styles.tags}>
          {project.frontTags.slice(0, 2).map(t => (
            <span key={t} className={styles.tag} style={{ background: `${colors.primary}30`, color: colors.primary }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
