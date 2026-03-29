import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import projectsData from '../data/projects';
import styles from './Projects.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Projects({ stackRef, stackCardRefs, flipControls }) {
  const placeholderRefs = useRef([]);

  useEffect(() => {
    // ── exact port of the HTML version ──────────────────────────
    // 1. Create project cards as real DOM nodes, append to body
    const projectCards = [];

    projectsData.forEach((p) => {
      const wrap = document.createElement('div');
      wrap.className = 'proj-card-body-wrap';
      wrap.style.cssText =
        'position:fixed;z-index:200;width:220px;height:148px;opacity:0;pointer-events:none;top:0;left:0;';

      wrap.innerHTML = `
        <div style="width:100%;height:100%;transform-style:preserve-3d;transition:transform 0.75s cubic-bezier(0.4,0,0.2,1);position:relative;border-radius:12px;box-shadow:0 8px 28px rgba(0,0,0,0.13);will-change:transform;" class="proj-body-inner">
          <div style="position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;border-radius:12px;padding:14px;display:flex;flex-direction:column;justify-content:space-between;background:#185FA5;">
            <div>
              <p style="font-size:9px;color:rgba(255,255,255,0.55);letter-spacing:1.5px;text-transform:uppercase;">FRONTEND</p>
              <p style="font-size:13px;font-weight:600;color:#fff;margin:5px 0 3px;line-height:1.3;">${p.name}</p>
              <p style="font-size:10px;color:rgba(255,255,255,0.82);line-height:1.5;flex:1;">${p.frontDesc}</p>
            </div>
            <div style="display:flex;flex-wrap:wrap;gap:4px;margin-top:7px;">${p.frontTags.map(t => `<span style="font-size:9px;background:rgba(255,255,255,0.2);color:rgba(255,255,255,0.9);padding:2px 8px;border-radius:20px;">${t}</span>`).join('')}</div>
          </div>
          <div style="position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;border-radius:12px;padding:14px;display:flex;flex-direction:column;justify-content:space-between;background:#3C3489;transform:rotateY(180deg);">
            <div>
              <p style="font-size:9px;color:rgba(255,255,255,0.55);letter-spacing:1.5px;text-transform:uppercase;">BACKEND</p>
              <p style="font-size:13px;font-weight:600;color:#fff;margin:5px 0 3px;line-height:1.3;">${p.name}</p>
              <p style="font-size:10px;color:rgba(255,255,255,0.82);line-height:1.5;flex:1;">${p.backDesc}</p>
            </div>
            <div style="display:flex;flex-wrap:wrap;gap:4px;margin-top:7px;">${p.backTags.map(t => `<span style="font-size:9px;background:rgba(255,255,255,0.2);color:rgba(255,255,255,0.9);padding:2px 8px;border-radius:20px;">${t}</span>`).join('')}</div>
          </div>
        </div>`;

      // hover flip
      wrap.addEventListener('mouseenter', () => {
        wrap.querySelector('.proj-body-inner').style.transform = 'rotateY(180deg)';
      });
      wrap.addEventListener('mouseleave', () => {
        wrap.querySelector('.proj-body-inner').style.transform = '';
      });
      wrap.addEventListener('click', () => {
        const inner = wrap.querySelector('.proj-body-inner');
        const flipped = inner.style.transform === 'rotateY(180deg)';
        inner.style.transform = flipped ? '' : 'rotateY(180deg)';
      });

      document.body.appendChild(wrap);
      projectCards.push(wrap);
    });

    // 2. Setup scroll animation — triggered once when #projects enters view
    let scrollAnimSetup = false;

    function setupScrollAnim() {
      if (scrollAnimSetup) return;
      scrollAnimSetup = true;

      const scCards = stackCardRefs?.current || [];
      scCards.forEach(c => { if (c) c.style.animationPlayState = 'paused'; });

      const scrollY    = window.scrollY;
      const stackRects = scCards.map(c => c ? c.getBoundingClientRect() : { left:0, top:0, width:220, height:148 });
      const targetRects = placeholderRefs.current.map(el => el.getBoundingClientRect());

      projectCards.forEach((card, i) => {
        const tr = targetRects[i];
        const sr = stackRects[i];

        card.style.position     = 'absolute';
        card.style.width        = tr.width  + 'px';
        card.style.height       = tr.height + 'px';
        card.style.top          = (tr.top  + scrollY) + 'px';
        card.style.left         = tr.left + 'px';
        card.style.opacity      = '0';
        card.style.pointerEvents = 'none';

        const dx = (sr.left + sr.width  / 2) - (tr.left + tr.width  / 2);
        const dy = (sr.top  + sr.height / 2) - (tr.top  + tr.height / 2);
        card.style.transform = `translate(${dx}px, ${dy}px)`;
        card._dx = dx;
        card._dy = dy;
      });

      ScrollTrigger.create({
        trigger: '#projects',
        start: 'top 80%',
        end:   'top 20%',
        scrub: 1.2,
        onUpdate(self) {
          const prog = self.progress;

          // cross-fade stack out / project cards in
          const stackOpacity = Math.max(0, 1 - prog * 8);
          const cardOpacity  = Math.min(1, prog * 5);

          scCards.forEach(c => { if (c) c.style.opacity = stackOpacity; });
          projectCards.forEach(c => { c.style.opacity = cardOpacity; });

          if (prog > 0.02) {
            scCards.forEach(c => { if (c) c.style.animation = 'none'; });
            if (flipControls?.current) flipControls.current.pause();
          }

          projectCards.forEach((card, i) => {
            const delay  = i * 0.08;
            const p      = Math.max(0, Math.min(1, (prog - delay * 0.3) / (1 - delay * 0.3)));
            const eased  = p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p;
            const x = card._dx * (1 - eased);
            const y = card._dy * (1 - eased);
            card.style.transform = `translate(${x}px, ${y}px)`;
          });

          const done = prog >= 0.98;
          projectCards.forEach(c => { c.style.pointerEvents = done ? 'auto' : 'none'; });
        },
        onLeaveBack() {
          const delays = [0, .15, .3, .45, .6, .75, .9, 1.05];
          scCards.forEach((c, j) => {
            if (!c) return;
            c.style.opacity        = '1';
            c.style.animation      = 'cardFloat 3s ease-in-out infinite';
            c.style.animationDelay = delays[j] + 's';
          });
          projectCards.forEach(c => {
            c.style.opacity      = '0';
            c.style.pointerEvents = 'none';
          });
          if (flipControls?.current) flipControls.current.resume();
        },
      });
    }

    ScrollTrigger.create({
      trigger: '#projects',
      start: 'top 90%',
      once: true,
      onEnter: setupScrollAnim,
    });

    return () => {
      projectCards.forEach(c => c.remove());
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section id="projects" className={styles.section}>
      <h2 className={styles.title}>Projects</h2>
      <p className={styles.sub}>Hover to flip · tap on mobile</p>
      <div className={styles.grid}>
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={i}
            className={styles.placeholder}
            ref={el => { placeholderRefs.current[i] = el; }}
          />
        ))}
      </div>
    </section>
  );
}
