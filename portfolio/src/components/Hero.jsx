import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import StackCard from './StackCard';
import styles from './Hero.module.css';

export default function Hero({ onStackReady, stackRef, stackCardRefs }) {
  const [flipped, setFlipped] = useState(Array(8).fill(false));
  const [status, setStatus]   = useState('frontend screens');
  const [floatPaused, setFloatPaused] = useState(false);
  const wrapRef  = useRef(null);
  const flipRef  = useRef({ idx: 0, goingBack: true, timer: null, paused: false });

  // Expose pause/resume to parent (for scroll anim)
  useEffect(() => {
    if (onStackReady) onStackReady(wrapRef, {
      pause: () => {
        flipRef.current.paused = true;
        clearTimeout(flipRef.current.timer);
        setFloatPaused(true);
      },
      resume: () => {
        if (!flipRef.current.paused) return;
        flipRef.current.paused = false;
        setFloatPaused(false);
        scheduleNext(600);
      }
    });
  }, []);

  function scheduleNext(ms) {
    flipRef.current.timer = setTimeout(tick, ms);
  }

  function tick() {
    if (flipRef.current.paused) return;
    const { idx, goingBack } = flipRef.current;

    setFlipped(prev => {
      const next = [...prev];
      next[idx] = goingBack;
      return next;
    });

    if (goingBack) {
      const nextIdx = idx + 1;
      if (nextIdx >= 8) {
        flipRef.current = { ...flipRef.current, idx: 7, goingBack: false };
        setStatus('backend screens');
        scheduleNext(2500);
      } else {
        flipRef.current.idx = nextIdx;
        scheduleNext(600);
      }
    } else {
      const nextIdx = idx - 1;
      if (nextIdx < 0) {
        flipRef.current = { ...flipRef.current, idx: 0, goingBack: true };
        setStatus('frontend screens');
        scheduleNext(2500);
      } else {
        flipRef.current.idx = nextIdx;
        scheduleNext(600);
      }
    }
  }

  useEffect(() => {
    scheduleNext(1000);
    return () => clearTimeout(flipRef.current.timer);
  }, []);

  // Hero entrance animation
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo('.hero-tag',   { opacity:0, y:16 }, { opacity:1, y:0, duration:.7 }, 0.15)
      .fromTo('.hero-name',  { opacity:0, y:24 }, { opacity:1, y:0, duration:.8 }, 0.3)
      .fromTo('.hero-sub',   { opacity:0, y:16 }, { opacity:1, y:0, duration:.7 }, 0.45)
      .fromTo('.stack-wrap', { opacity:0, y:28, scale:.96 }, { opacity:1, y:0, scale:1, duration:.9 }, 0.6)
      .fromTo('.scroll-hint',{ opacity:0 }, { opacity:1, duration:.5 }, 1.4);
  }, []);

  return (
    <section id="hero" className={styles.hero}>
      <p className={`hero-tag ${styles.tag}`}>Full Stack Developer</p>
      <h1 className={`hero-name ${styles.name}`}>Muhammad Idrees Raza</h1>
      <p className={`hero-sub ${styles.sub}`}>Building production-ready web &amp; mobile applications</p>
      <p className={styles.status}>{status}</p>

      <div className={`stack-wrap ${styles.stackWrap}`} ref={el => { wrapRef.current = el; if (stackRef) stackRef.current = el; }}>
        {Array.from({ length: 8 }, (_, i) => (
          <StackCard
            key={i}
            index={i}
            flipped={flipped[i]}
            floatPaused={floatPaused}
            ref={el => { if (stackCardRefs) stackCardRefs.current[i] = el; }}
          />
        ))}
      </div>

      <p className={`scroll-hint ${styles.scrollHint}`}>scroll down ↓</p>
    </section>
  );
}
