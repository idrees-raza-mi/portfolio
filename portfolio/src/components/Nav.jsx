import { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { FiMenu, FiX } from 'react-icons/fi';
import styles from './Nav.module.css';

// Replace with your WhatsApp number (country code + number, no + or spaces)
const WA_NUMBER = '77066513615';

const LINKS = [
  { href: '#projects', label: 'Projects' },
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
];

export default function Nav({ theme, onToggleTheme }) {
  const [showQuote, setShowQuote] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Close menu on Escape
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  return (
    <>
      <nav className={styles.nav}>
        {/* Logo — left */}
        <a href="#hero" className={styles.logo}>MIR</a>

        {/* Links — center (desktop) */}
        <div className={styles.links}>
          {LINKS.map(l => (
            <a key={l.href} href={l.href}>{l.label}</a>
          ))}
        </div>

        {/* Right side: WhatsApp + Hamburger */}
        <div className={styles.right}>
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

          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <FiMenu size={22} />
          </button>
        </div>
      </nav>

      {/* Mobile menu — slide-in drawer */}
      <div
        id="mobile-menu"
        className={`${styles.mobileMenu} ${menuOpen ? styles.menuOpen : ''}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!menuOpen}
      >
        <button
          className={styles.closeBtn}
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        >
          <FiX size={24} />
        </button>
        <div className={styles.mobileLinks}>
          {LINKS.map(l => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>

      {/* Backdrop for mobile menu */}
      {menuOpen && (
        <div
          className={styles.backdrop}
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

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
          aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          aria-pressed={theme === 'dark'}
        >
          {theme === 'dark' ? '☾' : '☀'}
        </button>
      </div>
    </>
  );
}
