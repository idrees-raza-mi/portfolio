import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectCard from './ProjectCard';
import projects from '../data/projects';
import styles from './ScrollAnimCards.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollAnimCards({ stackRef, placeholderRefs, flipControls }) {
  const cardRefs  = useRef([]);
  const wrapperRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Double rAF: ensures both Hero and Projects have painted and measured
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        const stackEl = stackRef.current;
        if (!stackEl || !placeholderRefs.current[0]) return;

        const scrollY   = window.scrollY;
        const stackRect = stackEl.getBoundingClientRect();

        // Target: each card's final grid position in document coords
        const targets = placeholderRefs.current.map(el => {
          const r = el.getBoundingClientRect();
          return {
            top:    r.top    + scrollY,
            left:   r.left,
            width:  r.width,
            height: r.height,
          };
        });

        // Position each flying card at its target slot.
        // Use GSAP x/y to offset it visually to the stack position.
        // Cards stay target-sized throughout — zero width/height changes during scroll.
        cardRefs.current.forEach((card, i) => {
          if (!card) return;
          const t = targets[i];

          // Center of stack vs center of target
          const dx = (stackRect.left + stackRect.width  / 2) - (t.left + t.width  / 2) + i * 4;
          const dy = (stackRect.top  + scrollY + stackRect.height / 2) - (t.top  + t.height / 2) + i * 4;

          gsap.set(card, {
            position: 'absolute',
            top:      t.top,
            left:     t.left,
            width:    t.width,
            height:   t.height,
            x:        dx,
            y:        dy,
            opacity:  0,
            pointerEvents: 'none',
            zIndex:   50,
          });
        });

        setReady(true);

        // Small delay so stack cards are still visible at start
        requestAnimationFrame(() => {
          gsap.to(cardRefs.current, { opacity: 1, duration: 0 });
        });

        // ── SCROLL TRIGGER ──
        // Animate x/y from stack offset → 0 (grid position)
        // Pure transform — no layout reflow per frame
        gsap.to(cardRefs.current, {
          x: 0,
          y: 0,
          ease: 'power2.inOut',
          stagger: 0.06,
          scrollTrigger: {
            trigger: '#projects',
            start: 'top 85%',
            end:   'top 10%',
            scrub: 1.2,
            onUpdate(self) {
              const prog = self.progress;

              // Cross-fade: stack fades out, flying cards fade in as scroll starts
              if (stackEl) {
                stackEl.style.opacity = String(Math.max(0, 1 - prog * 6));
              }

              // Pause flip loop once we start scrolling
              if (prog > 0.05 && flipControls.current) {
                flipControls.current.pause();
              }
            },
            onLeave() {
              // Fully settled in grid — enable interactions
              cardRefs.current.forEach(c => {
                if (c) c.style.pointerEvents = 'auto';
              });
            },
            onEnterBack() {
              // Scrolling back up — disable interactions while animating
              cardRefs.current.forEach(c => {
                if (c) c.style.pointerEvents = 'none';
              });
            },
            onLeaveBack() {
              // Back above trigger — restore stack
              if (stackEl) stackEl.style.opacity = '1';
              if (flipControls.current) flipControls.current.resume();
            },
          },
        });
      })
    );

    return () => {
      cancelAnimationFrame(raf);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    // Wrapper spans full document so absolute children use document coords
    <div ref={wrapperRef} className={styles.wrapper}>
      {projects.map((p, i) => (
        <div
          key={p.id}
          ref={el => { cardRefs.current[i] = el; }}
          className={styles.flyCard}
          style={{ opacity: ready ? 1 : 0 }}
        >
          <ProjectCard project={p} />
        </div>
      ))}
    </div>
  );
}
