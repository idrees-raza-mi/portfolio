import { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import styles from './Nav.module.css';

// Replace with your WhatsApp number (country code + number, no + or spaces)
const WA_NUMBER = '77770306873';

export default function Nav({ theme, onToggleTheme }) {
  const [showQuote, setShowQuote] = useState(false);

  // Auto-show theme quote after 4s, hide after 5.5s, repeat every 12s
  useEffect(() => {
    const show = () => {
      setShowQuote(true);
      setTimeout(() => setShowQuote(false), 5500);
    };
    const t = setTimeout(() => {
      show();
      const interval = setInterval(show, 12000);
      return () => clearInterval(interval);
    }, 4000);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <nav className={styles.nav}>
        {/* Logo — left */}
        <span className={styles.logo}>MIR</span>

        {/* Links — center */}
        <div className={styles.links}>
          <a href="#projects">Projects</a>
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </div>

        {/* WhatsApp chat — top right */}
        <div className={styles.chatWrap}>
          <span className={styles.chatTooltip}>Get in Touch 💬</span>
          <a
            href={`https://wa.me/${WA_NUMBER}?text=Hi%20Idrees%2C%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect!`}
            target="_blank"
            rel="noreferrer"
            className={styles.chatBtn}
            aria-label="Chat on WhatsApp"
          >
            <FaWhatsapp size={20} />
          </a>
        </div>
      </nav>

      {/* Sticky theme toggle — bottom-left */}
      <div className={styles.themeWrap}>
        <div className={`${styles.themeQuote} ${showQuote ? styles.quoteVisible : ''}`}>
          {theme === 'dark' ? 'Dark mode on 🌙' : 'Easy on the eyes? ^_^'}
          <br />
          <span>{theme === 'dark' ? 'Great choice for night owls.' : 'Switch for eye comfort.'}</span>
        </div>
        <button
          className={`${styles.themeBtn} ${showQuote ? styles.shaking : ''}`}
          onClick={onToggleTheme}
          onMouseEnter={() => setShowQuote(true)}
          onMouseLeave={() => setShowQuote(false)}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? '☾' : '☀'}
        </button>
      </div>
    </>
  );
}
