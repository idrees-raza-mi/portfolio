import styles from './Nav.module.css';

export default function Nav({ theme, onToggleTheme }) {
  return (
    <nav className={styles.nav}>
      <span className={styles.logo}>MIR</span>
      <div className={styles.right}>
        <div className={styles.links}>
          <a href="#projects">Projects</a>
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </div>
        <button className={styles.toggle} onClick={onToggleTheme} aria-label="Toggle theme">
          {theme === 'dark' ? '☾ Dark' : '☀ Light'}
        </button>
      </div>
    </nav>
  );
}
