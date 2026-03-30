import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import projectsData from '../data/projects';
import styles from './Projects.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Projects({ stackRef, stackCardRefs, flipControls }) {
  const placeholderRefs = useRef([]);

  useEffect(() => {
    const projectCards = [];

    projectsData.forEach((p) => {
      const wrap = document.createElement('div');
      wrap.className = 'proj-card-body-wrap';
      wrap.style.cssText =
        'position:fixed;z-index:200;width:220px;height:148px;opacity:0;pointer-events:none;top:0;left:0;';

      wrap.innerHTML = getCardHTML(p);

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

function getCardHTML(p) {
  const frontBg = { A: '#0f0f13', B: '#f0f4ff', C: '#f8faff', D: '#080808' }[p.style] || '#0f0f13';
  const backBg = { A: '#0d0d1a', B: '#1e1b4b', C: '#1a1f3a', D: '#0c0820' }[p.style] || '#0d0d1a';
  
  return `
    <div style="width:100%;height:100%;transform-style:preserve-3d;transition:transform 0.75s cubic-bezier(0.4,0,0.2,1);position:relative;border-radius:12px;box-shadow:0 8px 28px rgba(0,0,0,0.13);will-change:transform;" class="proj-body-inner">
      ${getFrontHTML(p, frontBg)}
      <div style="position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;border-radius:12px;transform:rotateY(180deg);">
        ${getBackHTML(p, backBg)}
      </div>
    </div>`;
}

function getFrontHTML(p, bg) {
  if (p.style === 'A') return getStyleAFront(p, bg);
  if (p.style === 'B') return getStyleBFront(p, bg);
  if (p.style === 'C') return getStyleCFront(p, bg);
  if (p.style === 'D') return getStyleDFront(p, bg);
  return getStyleAFront(p, bg);
}

function getBackHTML(p, bg) {
  if (p.style === 'A') return getStyleABack(p, bg);
  if (p.style === 'B') return getStyleBBack(p, bg);
  if (p.style === 'C') return getStyleCBack(p, bg);
  if (p.style === 'D') return getStyleDBack(p, bg);
  return getStyleABack(p, bg);
}

function getStyleAFront(p, bg) {
  return `<div style="position:absolute;inset:0;backface-visibility:hidden;border-radius:12px;padding:8px;background:${bg};">
    <div style="height:22px;background:#1c1c24;display:flex;align-items:center;gap:4px;padding:0 8px;border-bottom:0.5px solid #2a2a36;border-radius:12px 12px 0 0;margin:-8px -8px 0 -8px;">
      <span style="width:7px;height:7px;border-radius:50%;background:#ff5f57;"></span>
      <span style="width:7px;height:7px;border-radius:50%;background:#febc2e;"></span>
      <span style="width:7px;height:7px;border-radius:50%;background:#28c840;"></span>
    </div>
    <div style="display:flex;flex-direction:column;gap:5px;margin-top:8px;">
      <div style="height:20px;background:#16213e;border-radius:4px;display:flex;align-items:center;gap:5px;padding:0 6px;">
        <span style="height:5px;border-radius:2px;background:#378ADD;opacity:0.65;width:28px;"></span>
        <span style="height:5px;border-radius:2px;background:#378ADD;opacity:0.2;width:20px;"></span>
        <span style="height:5px;border-radius:2px;background:#378ADD;opacity:0.2;width:24px;"></span>
      </div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:4px;">
        <div style="background:#141420;border-radius:5px;padding:5px;"><span style="font-size:11px;font-weight:500;color:#378ADD;">142</span><div style="font-size:7px;color:#3a3a50;">Orders</div></div>
        <div style="background:#141420;border-radius:5px;padding:5px;"><span style="font-size:11px;font-weight:500;color:#378ADD;">98%</span><div style="font-size:7px;color:#3a3a50;">Delivered</div></div>
        <div style="background:#141420;border-radius:5px;padding:5px;"><span style="font-size:11px;font-weight:500;color:#378ADD;">12</span><div style="font-size:7px;color:#3a3a50;">Couriers</div></div>
      </div>
    </div>
    <div style="position:absolute;bottom:7px;left:8px;right:8px;display:flex;align-items:center;justify-content:space-between;">
      <span style="font-size:11px;font-weight:500;color:rgba(255,255,255,0.85);">${p.name}</span>
      <div style="display:flex;gap:3px;">${p.frontTags.slice(0,2).map(t => `<span style="font-size:7px;padding:1px 5px;border-radius:8px;background:rgba(55,138,221,0.18);color:#85B7EB;">${t}</span>`).join('')}</div>
    </div>
  </div>`;
}

function getStyleABack(p, bg) {
  return `<div style="position:absolute;inset:0;backface-visibility:hidden;border-radius:12px;padding:8px;background:${bg};">
    <div style="height:22px;background:#141425;display:flex;align-items:center;gap:4px;padding:0 8px;border-bottom:0.5px solid #1f1f30;border-radius:12px 12px 0 0;margin:-8px -8px 0 -8px;">
      <span style="width:7px;height:7px;border-radius:50%;background:#ff5f57;"></span>
      <span style="width:7px;height:7px;border-radius:50%;background:#febc2e;"></span>
      <span style="width:7px;height:7px;border-radius:50%;background:#28c840;"></span>
    </div>
    <div style="padding:8px;display:flex;flex-direction:column;gap:4px;">
      <span style="height:4px;border-radius:2px;background:#1D9E75;opacity:0.75;width:78%;"></span>
      <span style="height:4px;border-radius:2px;background:#252535;width:55%;"></span>
      <span style="height:4px;border-radius:2px;background:#1D9E75;opacity:0.75;width:66%;"></span>
      <span style="height:4px;border-radius:2px;background:#BA7517;opacity:0.6;width:42%;"></span>
      <span style="height:4px;border-radius:2px;background:#1D9E75;opacity:0.75;width:82%;"></span>
      <span style="height:4px;border-radius:2px;background:#252535;width:50%;"></span>
    </div>
    <div style="position:absolute;bottom:7px;left:8px;right:8px;display:flex;align-items:center;justify-content:space-between;">
      <span style="font-size:11px;font-weight:500;color:rgba(255,255,255,0.85);">${p.name}</span>
      <div style="display:flex;gap:3px;">${p.backTags.slice(0,2).map(t => `<span style="font-size:7px;padding:1px 5px;border-radius:8px;background:rgba(29,158,117,0.18);color:#5DCAA5;">${t}</span>`).join('')}</div>
    </div>
  </div>`;
}

function getStyleBFront(p, bg) {
  return `<div style="position:absolute;inset:0;backface-visibility:hidden;border-radius:12px;display:flex;background:${bg};">
    <div style="width:40%;background:#185FA5;padding:12px 10px;display:flex;flex-direction:column;">
      <div style="width:26px;height:26px;border-radius:6px;background:rgba(255,255,255,0.18);margin-bottom:auto;"></div>
      <span style="font-size:12px;font-weight:500;color:white;margin-top:auto;line-height:1.3;">${p.name}</span>
      <span style="font-size:8px;color:rgba(255,255,255,0.5);margin-top:2px;">Personalizer</span>
    </div>
    <div style="flex:1;padding:10px;display:flex;flex-direction:column;gap:7px;">
      <div style="border-radius:6px;flex:1;padding:7px;display:flex;flex-direction:column;gap:3px;background:#e8eeff;">
        <span style="height:3px;border-radius:2px;background:#6366f1;width:65%;"></span>
        <span style="height:3px;border-radius:2px;background:#a5b4fc;width:45%;"></span>
        <span style="height:18px;border-radius:4px;background:#dde4ff;"></span>
        <span style="height:3px;border-radius:2px;background:#a5b4fc;width:55%;"></span>
      </div>
      <div style="display:flex;flex-direction:column;gap:3px;">
        <span style="font-size:8px;font-weight:500;letter-spacing:1px;color:#6366f1;">FRONTEND</span>
        <span style="font-size:11px;font-weight:500;color:#1e1b4b;">Canvas Editor</span>
      </div>
      <div style="display:flex;gap:3px;flex-wrap:wrap;margin-top:auto;">
        ${p.frontTags.slice(0,2).map(t => `<span style="font-size:7px;padding:2px 6px;border-radius:10px;background:#e0e7ff;color:#3730a3;">${t}</span>`).join('')}
      </div>
    </div>
  </div>`;
}

function getStyleBBack(p, bg) {
  return `<div style="position:absolute;inset:0;backface-visibility:hidden;border-radius:12px;padding:14px;display:flex;flex-direction:column;gap:8px;background:${bg};">
    <span style="font-size:8px;letter-spacing:2px;color:#818cf8;">BACKEND STACK</span>
    <span style="font-size:13px;font-weight:500;color:white;">${p.name}</span>
    <span style="font-size:9px;line-height:1.6;flex:1;color:#a5b4fc;">${p.backDesc}</span>
    <div style="border-radius:5px;padding:7px;display:flex;flex-direction:column;gap:3px;background:#12104a;">
      <span style="height:3px;border-radius:2px;background:#4f46e5;opacity:0.6;width:72%;"></span>
      <span style="height:3px;border-radius:2px;background:#818cf8;opacity:0.4;width:50%;"></span>
      <span style="height:3px;border-radius:2px;background:#4f46e5;opacity:0.5;width:82%;"></span>
    </div>
    <div style="display:flex;gap:3px;flex-wrap:wrap;">
      ${p.backTags.slice(0,3).map(t => `<span style="font-size:7px;padding:2px 6px;border-radius:10px;background:rgba(129,140,248,0.2);color:#a5b4fc;">${t}</span>`).join('')}
    </div>
  </div>`;
}

function getStyleCFront(p, bg) {
  return `<div style="position:absolute;inset:0;backface-visibility:hidden;border-radius:12px;display:flex;flex-direction:column;background:${bg};border:0.5px solid #dde4f5;">
    <div style="height:104px;background:#eef3ff;display:flex;align-items:center;justify-content:center;">
      <div style="width:130px;background:white;border-radius:5px;border:0.5px solid #d1d9f0;overflow:hidden;">
        <div style="height:15px;background:#f0f2fa;display:flex;align-items:center;gap:3px;padding:0 5px;">
          <span style="width:4px;height:4px;border-radius:50%;background:#ff5f57;"></span>
          <span style="width:4px;height:4px;border-radius:50%;background:#febc2e;"></span>
          <span style="width:4px;height:4px;border-radius:50%;background:#28c840;"></span>
        </div>
        <div style="padding:5px;display:flex;flex-direction:column;gap:3px;">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:2px;"><span style="height:11px;border-radius:3px;background:#eef1ff;"></span><span style="height:11px;border-radius:3px;background:#eef1ff;"></span></div>
          <span style="height:3px;border-radius:2px;background:#93b4e8;width:70%;"></span>
          <span style="height:3px;border-radius:2px;background:#d1d9f0;width:50%;"></span>
        </div>
      </div>
    </div>
    <div style="padding:10px 12px;flex:1;display:flex;flex-direction:column;gap:4px;">
      <span style="font-size:8px;letter-spacing:2px;color:#6b7aaa;font-weight:500;">FRONTEND</span>
      <span style="font-size:13px;font-weight:500;color:#1a1f3a;">${p.name}</span>
      <span style="font-size:9px;color:#6b7aaa;line-height:1.5;flex:1;">${p.frontDesc}</span>
    </div>
    <div style="display:flex;gap:3px;flex-wrap:wrap;padding:0 12px 9px;">
      ${p.frontTags.slice(0,2).map(t => `<span style="font-size:7px;padding:2px 6px;border-radius:8px;background:#eef1ff;color:#3a4aaa;">${t}</span>`).join('')}
    </div>
  </div>`;
}

function getStyleCBack(p, bg) {
  return `<div style="position:absolute;inset:0;backface-visibility:hidden;border-radius:12px;display:flex;flex-direction:column;background:${bg};">
    <div style="height:104px;background:#131728;display:flex;align-items:center;justify-content:center;padding:10px;">
      <div style="width:100%;background:#0e1120;border-radius:5px;border:0.5px solid #252a45;overflow:hidden;">
        <div style="height:15px;background:#191e34;display:flex;align-items:center;gap:3px;padding:0 5px;">
          <span style="width:4px;height:4px;border-radius:50%;background:#ff5f57;"></span>
          <span style="width:4px;height:4px;border-radius:50%;background:#febc2e;"></span>
          <span style="width:4px;height:4px;border-radius:50%;background:#28c840;"></span>
        </div>
        <div style="padding:5px;display:flex;flex-direction:column;gap:3px;">
          <span style="height:3px;border-radius:2px;background:#1D9E75;opacity:0.7;width:68%;"></span>
          <span style="height:3px;border-radius:2px;background:#252a45;width:82%;"></span>
          <span style="height:3px;border-radius:2px;background:#1D9E75;opacity:0.5;width:48%;"></span>
        </div>
      </div>
    </div>
    <div style="padding:10px 12px;flex:1;display:flex;flex-direction:column;gap:4px;">
      <span style="font-size:8px;letter-spacing:2px;color:#5a6aaa;">BACKEND</span>
      <span style="font-size:13px;font-weight:500;color:white;">${p.name}</span>
      <span style="font-size:9px;color:#7a8acc;line-height:1.5;flex:1;">${p.backDesc}</span>
    </div>
    <div style="display:flex;gap:3px;flex-wrap:wrap;padding:0 12px 9px;">
      ${p.backTags.slice(0,3).map(t => `<span style="font-size:7px;padding:2px 6px;border-radius:8px;background:#252a45;color:#7a9aee;">${t}</span>`).join('')}
    </div>
  </div>`;
}

function getStyleDFront(p, bg) {
  const num = p.id === 4 ? '04' : '08';
  const accent = p.id === 4 ? '#378ADD' : '#D85A30';
  return `<div style="position:absolute;inset:0;backface-visibility:hidden;border-radius:12px;padding:14px;display:flex;flex-direction:column;background:${bg};">
    <span style="position:absolute;top:-8px;right:6px;font-size:68px;font-weight:500;color:rgba(255,255,255,0.03);line-height:1;">${num}</span>
    <span style="font-size:8px;letter-spacing:3px;color:#444;margin-bottom:auto;">FRONTEND STACK</span>
    <span style="font-size:18px;font-weight:500;color:white;margin-top:auto;line-height:1.2;">${p.name}</span>
    <span style="width:28px;height:2px;margin:7px 0;background:${accent};"></span>
    <span style="font-size:9px;color:#666;line-height:1.6;margin-bottom:7px;">${p.frontDesc}</span>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;margin-top:auto;">
      <span style="height:30px;border-radius:4px;background:#111;border:0.5px solid #1e1e1e;display:flex;align-items:flex-end;padding:4px;"><span style="height:3px;border-radius:2px;width:60%;background:${accent};"></span></span>
      <span style="height:30px;border-radius:4px;background:#111;border:0.5px solid #1e1e1e;display:flex;align-items:flex-end;padding:4px;"><span style="height:3px;border-radius:2px;width:40%;background:#7F77DD;"></span></span>
    </div>
    <div style="display:flex;gap:3px;flex-wrap:wrap;margin-top:7px;">
      ${p.frontTags.slice(0,3).map(t => `<span style="font-size:7px;padding:2px 6px;border-radius:8px;background:#111;border:0.5px solid #222;color:#555;">${t}</span>`).join('')}
    </div>
  </div>`;
}

function getStyleDBack(p, bg) {
  const num = p.id === 4 ? '04' : '08';
  const accent = p.id === 4 ? '#7F77DD' : '#D85A30';
  const primary = p.id === 4 ? '#378ADD' : '#D85A30';
  return `<div style="position:absolute;inset:0;backface-visibility:hidden;border-radius:12px;padding:14px;display:flex;flex-direction:column;background:${bg};">
    <span style="position:absolute;top:-8px;right:6px;font-size:68px;font-weight:500;color:rgba(255,255,255,0.03);line-height:1;">${num}</span>
    <span style="font-size:8px;letter-spacing:3px;color:${accent};margin-bottom:auto;">BACKEND STACK</span>
    <span style="font-size:18px;font-weight:500;color:white;margin-top:auto;line-height:1.2;">${p.name}</span>
    <span style="width:28px;height:2px;margin:7px 0;background:${accent};"></span>
    <span style="font-size:9px;color:#666;line-height:1.6;margin-bottom:7px;">${p.backDesc}</span>
    <div style="border-radius:5px;padding:7px;display:flex;flex-direction:column;gap:3px;margin-top:auto;background:${p.id === 4 ? '#0d0b1a' : '#100500'};">
      <span style="height:3px;border-radius:2px;background:${accent};opacity:0.5;width:72%;"></span>
      <span style="height:3px;border-radius:2px;background:${primary};opacity:0.4;width:50%;"></span>
      <span style="height:3px;border-radius:2px;background:${accent};opacity:0.4;width:82%;"></span>
    </div>
    <div style="display:flex;gap:3px;flex-wrap:wrap;margin-top:7px;">
      ${p.backTags.slice(0,3).map(t => `<span style="font-size:7px;padding:2px 6px;border-radius:8px;background:${bg};color:${accent};border:0.5px solid #3a1500;">${t}</span>`).join('')}
    </div>
  </div>`;
}
