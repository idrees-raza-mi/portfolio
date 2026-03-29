import styles from './About.module.css';

export default function About() {
  return (
    <section id="about" className={styles.section}>
      <h2 className={styles.title}>About</h2>
      <p className={styles.location}>Layyah, Punjab, Pakistan</p>
      <h3 className={styles.name}>Muhammad Idrees Raza</h3>
      <p className={styles.bio}>
        Full stack developer specializing in building production-ready web and mobile applications.
        Experienced with the Node.js&nbsp;+&nbsp;MongoDB backend ecosystem, React and React Native
        on the frontend, and the Shopify app development platform. Currently building PakiShip and
        working deep in the Shopify ecosystem.
      </p>
    </section>
  );
}
