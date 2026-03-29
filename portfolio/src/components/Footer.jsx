import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiGithub, FiLinkedin, FiMail, FiMapPin } from 'react-icons/fi';
import styles from './Footer.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;

    const cols   = el.querySelectorAll('[data-col]');
    const bottom = el.querySelector('[data-bottom]');

    // Replay animation every time footer enters viewport
    ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      onEnter: () => animate(cols, bottom),
      onEnterBack: () => animate(cols, bottom),
    });

    function animate(cols, bottom) {
      gsap.fromTo(cols,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'bounce.out', stagger: 0.15 }
      );
      gsap.fromTo(bottom,
        { opacity: 0, y: 12 },
        { opacity: 0.65, y: 0, duration: 0.6, delay: 0.45 }
      );
    }

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <footer ref={footerRef} className={styles.footer}>
      <div className={styles.inner}>

        {/* Brand */}
        <div data-col className={styles.col}>
          <span className={styles.logo}>MIR</span>
          <p className={styles.tagline}>
            Full Stack Developer crafting production-ready<br />
            web &amp; mobile experiences.
          </p>
          <p className={styles.location}>
            <FiMapPin size={13} style={{ marginRight: 5, verticalAlign: 'middle' }} />
            Layyah, Punjab, Pakistan
          </p>
        </div>

        {/* Navigation */}
        <div data-col className={styles.col}>
          <h4 className={styles.colHead}>Navigation</h4>
          <ul className={styles.list}>
            <li><a href="#hero">Home</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div data-col className={styles.col}>
          <h4 className={styles.colHead}>Get in Touch</h4>
          <a href="mailto:hello@muhammadidreesraza.com" className={styles.emailLink}>
            <FiMail size={13} style={{ marginRight: 6, verticalAlign: 'middle', flexShrink: 0 }} />
            hello@muhammadidreesraza.com
          </a>
          <div className={styles.socials}>
            <a
              href="https://github.com/idrees-raza-mi"
              target="_blank"
              rel="noreferrer"
              className={styles.socialBtn}
              aria-label="GitHub"
            >
              <FiGithub size={16} />
              <span>GitHub</span>
            </a>
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              className={styles.socialBtn}
              aria-label="LinkedIn"
            >
              <FiLinkedin size={16} />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div data-bottom className={styles.bottom}>
        <span>© 2025 Muhammad Idrees Raza. All rights reserved.</span>
        <span>Built with React &amp; GSAP</span>
      </div>
    </footer>
  );
}
