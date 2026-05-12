import styles from './Contact.module.css';

export default function Contact() {
  return (
    <section id="contact" className={styles.section}>
      <h2 className={styles.title}>Let's Build Something</h2>
      <p className={styles.sub}>Available for freelance projects and full-time roles</p>
      <a href="mailto:hello@razaidrees.m@gmail.com" className={styles.email}>
        hello@razaidrees.m@gmail.com
      </a>
      <div className={styles.btns}>
        <a href="https://www.linkedin.com/in/idrees-raza-7781413bb" target="_blank" rel="noreferrer" className={`${styles.btn} ${styles.li}`}>LinkedIn ↗</a>
        <a href="https://github.com/idrees-raza-mi" target="_blank" rel="noreferrer" className={`${styles.btn} ${styles.gh}`}>GitHub ↗</a>
      </div>
    </section>
  );
}
