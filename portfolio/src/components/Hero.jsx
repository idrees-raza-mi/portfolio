import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import projects from '../data/projects';
import StyleA from './StyleA';
import StyleB from './StyleB';
import StyleC from './StyleC';
import StyleD from './StyleD';
import styles from './Hero.module.css';

const styleComponents = {
  A: StyleA,
  B: StyleB,
  C: StyleC,
  D: StyleD,
};

function StackCard({ index, flipped, floatPaused, project, cardRef }) {
  const StyleComponent = styleComponents[project.style] || StyleA;
  
  return (
    <div
      ref={cardRef}
      className={`${styles.card} ${floatPaused ? styles.nofloat : ''}`}
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      <div className={styles.perspective}>
        <div 
          className={styles.inner}
          style={{ 
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            transformStyle: 'preserve-3d',
            transition: 'transform 0.75s cubic-bezier(0.4,0,0.2,1)'
          }}
        >
          <div className={styles.face} style={{ backfaceVisibility: 'hidden' }}>
            <StyleComponent project={project} side="front" />
          </div>
          <div className={styles.face} style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
          }}>
            <StyleComponent project={project} side="back" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero({ onStackReady, stackRef, stackCardRefs }) {
  const [flipped, setFlipped] = useState(Array(8).fill(false));
  const [status, setStatus]   = useState('frontend screens');
  const [floatPaused, setFloatPaused] = useState(false);
  const wrapRef  = useRef(null);
  const flipRef  = useRef({ idx: 0, goingBack: true, timer: null, paused: false });

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
        {projects.map((p, i) => (
          <StackCard
            key={p.id}
            index={i}
            flipped={flipped[i]}
            floatPaused={floatPaused}
            project={p}
            cardRef={el => { if (stackCardRefs) stackCardRefs.current[i] = el; }}
          />
        ))}
      </div>

      <p className={`scroll-hint ${styles.scrollHint}`}>scroll down ↓</p>
    </section>
  );
}
