import { useEffect, useRef, useState } from 'react';
import styles from './Skills.module.css';

const groups = [
  {
    title: 'Frontend', color: '#185FA5',
    skills: [
      { name: 'HTML & CSS',    pct: 90 },
      { name: 'JavaScript',    pct: 88 },
      { name: 'React',         pct: 85 },
      { name: 'React Native',  pct: 80 },
    ],
  },
  {
    title: 'Backend', color: '#3C3489',
    skills: [
      { name: 'Node.js',    pct: 85 },
      { name: 'Express.js', pct: 83 },
      { name: 'MongoDB',    pct: 80 },
    ],
  },
  {
    title: 'Shopify', color: '#185FA5',
    skills: [
      { name: 'App Development',   pct: 78 },
      { name: 'Polaris & Admin API', pct: 75 },
      { name: 'Liquid & Themes',   pct: 70 },
    ],
  },
  {
    title: 'Tools', color: '#3C3489',
    skills: [
      { name: 'Git & GitHub',        pct: 85 },
      { name: 'Vercel & Cloudinary', pct: 75 },
      { name: 'GSAP',                pct: 70 },
    ],
  },
];

export default function Skills() {
  const sectionRef = useRef(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true); },
      { threshold: 0.25 }
    );
    obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="skills" className={styles.section} ref={sectionRef}>
      <div className={styles.inner}>
        <h2 className={styles.title}>Skills</h2>
        <p className={styles.sub}>Animated on scroll</p>
        <div className={styles.grid}>
          {groups.map(g => (
            <div key={g.title} className={styles.group}>
              <p className={styles.groupTitle} style={{ color: g.color }}>{g.title}</p>
              {g.skills.map((s, i) => (
                <div key={s.name} className={styles.row}>
                  <div className={styles.labelRow}>
                    <span className={styles.skillName}>{s.name}</span>
                    <span className={styles.skillPct}>{s.pct}%</span>
                  </div>
                  <div className={styles.track}>
                    <div
                      className={styles.bar}
                      style={{
                        width: animated ? s.pct + '%' : '0%',
                        background: g.color,
                        transitionDelay: animated ? `${i * 80}ms` : '0ms',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
