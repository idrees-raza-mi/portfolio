import styles from './Skills.module.css';

const groups = [
  {
    title: 'Frontend',
    skills: ['HTML & CSS', 'JavaScript', 'React', 'React Native', 'Next.js'],
  },
  {
    title: 'Backend',
    skills: ['Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'JWT Auth'],
  },
  {
    title: 'Shopify',
    skills: ['App Development', 'Polaris & Admin API', 'Liquid & Themes', 'Shopify CLI', 'Webhooks'],
  },
  {
    title: 'Tools',
    skills: ['Git & GitHub', 'Vercel', 'Cloudinary', 'GSAP', 'Figma'],
  },
];

export default function Skills() {
  return (
    <section id="skills" className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.title}>Skills<span className={styles.dot}>.</span></h2>
        <div className={styles.grid}>
          {groups.map(g => (
            <div key={g.title} className={styles.group}>
              <p className={styles.groupTitle}>{g.title}</p>
              <ul className={styles.list}>
                {g.skills.map(s => (
                  <li key={s} className={styles.item}>{s}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
