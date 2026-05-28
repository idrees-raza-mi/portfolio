/**
 * Shared project mockup HTML builders.
 * Used by both the Hero floating stack and the Projects grid so the
 * card design is identical in both places.
 *
 * Each builder returns a string of HTML (absolutely positioned inside
 * its parent .face / .body-wrap) — consumed via dangerouslySetInnerHTML
 * or innerHTML assignment.
 */

export function getFront(p) {
  switch (p.id) {
    case 1: return frontDevJour(p);
    case 2: return frontDesignEditor(p);
    case 3: return frontDriverApp(p);
    case 4: return frontEventPlatform(p);
    case 5: return frontStoreBuilder(p);
    case 6: return frontAuth(p);
    case 7: return frontApiToolkit(p);
    case 8: return frontPortfolioCMS(p);
    default: return frontDevJour(p);
  }
}

export function getBack(p) {
  const palettes = {
    1: { bg: '#0a1a14', accent: '#008060', tagBg: 'rgba(0,128,96,0.18)',   tagFg: '#5fd6a6' },
    2: { bg: '#1e1b4b', accent: '#6366f1', tagBg: 'rgba(99,102,241,0.22)', tagFg: '#a5b4fc' },
    3: { bg: '#0d1525', accent: '#3b82f6', tagBg: 'rgba(59,130,246,0.22)', tagFg: '#93c5fd' },
    4: { bg: '#1a0e2e', accent: '#a855f7', tagBg: 'rgba(168,85,247,0.22)', tagFg: '#d8b4fe' },
    5: { bg: '#1a1407', accent: '#f59e0b', tagBg: 'rgba(245,158,11,0.22)', tagFg: '#fcd34d' },
    6: { bg: '#0c1e16', accent: '#10b981', tagBg: 'rgba(16,185,129,0.22)', tagFg: '#6ee7b7' },
    7: { bg: '#1c0e0e', accent: '#f97316', tagBg: 'rgba(249,115,22,0.22)', tagFg: '#fdba74' },
    8: { bg: '#0f1419', accent: '#06b6d4', tagBg: 'rgba(6,182,212,0.22)',  tagFg: '#67e8f9' },
  };
  const c = palettes[p.id] || palettes[1];
  return `
    <div style="position:absolute;inset:0;background:${c.bg};padding:12px 13px;display:flex;flex-direction:column;color:#fff;">
      <span style="font-size:7px;letter-spacing:2.5px;color:${c.accent};font-weight:600;">TECH STACK</span>
      <span style="font-size:13px;font-weight:600;margin-top:4px;letter-spacing:-0.3px;">${p.name}</span>
      <span style="font-size:9px;line-height:1.55;color:rgba(255,255,255,0.55);margin-top:5px;flex:1;">${p.backDesc}</span>
      <div style="display:flex;gap:3px;flex-wrap:wrap;">
        ${p.backTags.slice(0, 4).map(t => `<span style="font-size:7px;padding:2px 6px;border-radius:8px;background:${c.tagBg};color:${c.tagFg};font-weight:500;">${t}</span>`).join('')}
      </div>
    </div>`;
}

/* ────────────────────────────────────────────────────────────── */
/* 1. DevJour — Shopify Subscriptions app                          */
function frontDevJour(p) {
  return `
    <div style="position:absolute;inset:0;background:#f6f6f7;display:flex;flex-direction:column;font-family:-apple-system,'Segoe UI',sans-serif;">
      <div style="height:18px;background:#008060;display:flex;align-items:center;padding:0 8px;gap:6px;">
        <span style="width:7px;height:7px;border-radius:2px;background:rgba(255,255,255,0.45);"></span>
        <span style="color:#fff;font-size:8px;font-weight:700;letter-spacing:0.3px;">DevJour</span>
        <span style="margin-left:auto;color:rgba(255,255,255,0.85);font-size:7px;">Subscriptions</span>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:4px;padding:6px 7px 4px;">
        <div style="background:#fff;border-radius:4px;padding:4px 5px;border:1px solid #e1e3e5;">
          <div style="font-size:6.5px;color:#6d7175;letter-spacing:0.3px;">MRR</div>
          <div style="font-size:10px;font-weight:700;color:#008060;">$2.4k</div>
        </div>
        <div style="background:#fff;border-radius:4px;padding:4px 5px;border:1px solid #e1e3e5;">
          <div style="font-size:6.5px;color:#6d7175;letter-spacing:0.3px;">ACTIVE</div>
          <div style="font-size:10px;font-weight:700;color:#202223;">142</div>
        </div>
        <div style="background:#fff;border-radius:4px;padding:4px 5px;border:1px solid #e1e3e5;">
          <div style="font-size:6.5px;color:#6d7175;letter-spacing:0.3px;">CHURN</div>
          <div style="font-size:10px;font-weight:700;color:#bf0711;">2.1%</div>
        </div>
      </div>
      <div style="padding:0 7px;display:flex;flex-direction:column;gap:3px;flex:1;">
        ${[
          ['#008060,#5c6ac4', '$29'],
          ['#bf0711,#f97316', '$99'],
          ['#5c6ac4,#008060', '$49'],
        ].map(([g, price]) => `
          <div style="background:#fff;border-radius:4px;padding:4px 6px;display:flex;align-items:center;gap:6px;border:1px solid #e1e3e5;">
            <span style="width:12px;height:12px;border-radius:50%;background:linear-gradient(135deg,${g});flex-shrink:0;"></span>
            <span style="flex:1;height:3px;border-radius:2px;background:#e1e3e5;"></span>
            <span style="font-size:7px;color:#008060;font-weight:700;">${price}/mo</span>
          </div>`).join('')}
      </div>
      <div style="display:flex;align-items:center;justify-content:space-between;padding:6px 8px;border-top:1px solid #e1e3e5;">
        <span style="font-size:9px;font-weight:700;color:#202223;">${p.name}</span>
        <span style="font-size:6.5px;padding:1px 5px;border-radius:6px;background:#e0f5e9;color:#008060;font-weight:600;">Shopify App</span>
      </div>
    </div>`;
}

/* 2. Design Editor — Canvas product personalizer                  */
function frontDesignEditor(p) {
  return `
    <div style="position:absolute;inset:0;background:#f5f3ff;display:flex;">
      <div style="flex:1;background:#fff;margin:6px;border-radius:6px;border:1px solid #e0e7ff;position:relative;display:flex;align-items:center;justify-content:center;">
        <div style="width:60%;height:62%;background:linear-gradient(135deg,#c7d2fe,#a5b4fc);border-radius:4px;position:relative;display:flex;align-items:center;justify-content:center;">
          <span style="font-size:9px;font-weight:700;color:#312e81;letter-spacing:1px;">HELLO</span>
          <span style="position:absolute;top:-4px;left:-4px;width:8px;height:8px;border:1.5px solid #6366f1;background:#fff;border-radius:50%;"></span>
          <span style="position:absolute;bottom:-4px;right:-4px;width:8px;height:8px;border:1.5px solid #6366f1;background:#fff;border-radius:50%;"></span>
        </div>
      </div>
      <div style="width:38px;background:#fff;border-left:1px solid #e0e7ff;display:flex;flex-direction:column;align-items:center;padding:8px 0;gap:6px;">
        ${[
          ['T', '#6366f1', '#fff'],
          ['◳', '#e0e7ff', '#6366f1'],
          ['◯', '#e0e7ff', '#6366f1'],
          ['✦', '#e0e7ff', '#6366f1'],
        ].map(([icon, bg, fg]) => `
          <span style="width:22px;height:22px;border-radius:5px;background:${bg};color:${fg};font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;">${icon}</span>
        `).join('')}
      </div>
      <div style="position:absolute;top:6px;left:10px;display:flex;align-items:center;gap:5px;">
        <span style="font-size:6.5px;letter-spacing:1.5px;color:#6366f1;font-weight:700;">CANVAS</span>
      </div>
      <div style="position:absolute;bottom:6px;left:10px;right:48px;display:flex;align-items:center;justify-content:space-between;">
        <span style="font-size:9px;font-weight:700;color:#1e1b4b;">${p.name}</span>
        <span style="font-size:6.5px;padding:1px 5px;border-radius:6px;background:#e0e7ff;color:#4f46e5;font-weight:600;">Fabric.js</span>
      </div>
    </div>`;
}

/* 3. Driver Management — Mobile app + admin                       */
function frontDriverApp(p) {
  return `
    <div style="position:absolute;inset:0;background:linear-gradient(135deg,#dbeafe,#bfdbfe);display:flex;align-items:center;justify-content:center;padding:8px;">
      <div style="width:72px;height:100%;max-height:130px;background:#0d1525;border-radius:10px;padding:4px;position:relative;border:1.5px solid #1e293b;box-shadow:0 4px 12px rgba(0,0,0,0.2);">
        <span style="position:absolute;top:3px;left:50%;transform:translateX(-50%);width:18px;height:3px;border-radius:2px;background:#1e293b;"></span>
        <div style="margin-top:8px;background:#0a1220;border-radius:6px;padding:5px 4px;height:calc(100% - 10px);display:flex;flex-direction:column;gap:3px;">
          <div style="font-size:6px;color:#3b82f6;font-weight:700;letter-spacing:0.5px;text-align:center;">DRIVERS</div>
          ${[
            ['#3b82f6', 'Online'],
            ['#10b981', 'Active'],
            ['#f59e0b', 'Break'],
          ].map(([color, label]) => `
            <div style="background:#1a2436;border-radius:3px;padding:3px 4px;display:flex;align-items:center;gap:3px;">
              <span style="width:10px;height:10px;border-radius:50%;background:${color};"></span>
              <span style="flex:1;display:flex;flex-direction:column;gap:1.5px;">
                <span style="height:2px;border-radius:1px;background:rgba(255,255,255,0.3);width:80%;"></span>
                <span style="font-size:5.5px;color:${color};font-weight:600;">${label}</span>
              </span>
            </div>`).join('')}
        </div>
      </div>
      <div style="flex:1;padding-left:10px;display:flex;flex-direction:column;gap:5px;">
        <span style="font-size:6.5px;letter-spacing:1.5px;color:#1d4ed8;font-weight:700;">FLEET</span>
        <span style="font-size:11px;font-weight:700;color:#0d1525;line-height:1.2;">Driver<br/>Management</span>
        <div style="display:flex;flex-direction:column;gap:3px;margin-top:2px;">
          <div style="display:flex;align-items:center;gap:4px;"><span style="width:5px;height:5px;border-radius:50%;background:#10b981;"></span><span style="font-size:7px;color:#1e3a8a;font-weight:600;">24 Active</span></div>
          <div style="display:flex;align-items:center;gap:4px;"><span style="width:5px;height:5px;border-radius:50%;background:#3b82f6;"></span><span style="font-size:7px;color:#1e3a8a;font-weight:600;">142 Total</span></div>
        </div>
      </div>
      <div style="position:absolute;bottom:6px;right:10px;">
        <span style="font-size:6.5px;padding:1px 5px;border-radius:6px;background:#1d4ed8;color:#fff;font-weight:600;">React Native</span>
      </div>
    </div>`;
}

/* 4. Event Platform — Stripe ticket checkout                      */
function frontEventPlatform(p) {
  return `
    <div style="position:absolute;inset:0;background:linear-gradient(135deg,#1a0e2e,#2d1b5e);padding:10px;display:flex;flex-direction:column;color:#fff;font-family:-apple-system,'Segoe UI',sans-serif;">
      <div style="display:flex;align-items:center;justify-content:space-between;">
        <span style="font-size:6.5px;letter-spacing:2px;color:#c4b5fd;font-weight:600;">LIVE EVENT</span>
        <span style="width:6px;height:6px;border-radius:50%;background:#a855f7;box-shadow:0 0 6px #a855f7;"></span>
      </div>
      <div style="margin-top:6px;background:rgba(255,255,255,0.05);border:1px solid rgba(168,85,247,0.3);border-radius:6px;padding:7px 8px;backdrop-filter:blur(8px);">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;">
          <div>
            <div style="font-size:10px;font-weight:700;letter-spacing:-0.2px;">Tech Summit '26</div>
            <div style="font-size:7px;color:#c4b5fd;margin-top:1px;">Mar 14 · Lahore</div>
          </div>
          <div style="text-align:right;">
            <div style="font-size:11px;font-weight:700;color:#d8b4fe;">$49</div>
            <div style="font-size:6px;color:#c4b5fd;">VIP</div>
          </div>
        </div>
        <div style="height:1px;background:rgba(168,85,247,0.2);margin:5px 0;"></div>
        <div style="display:flex;align-items:center;gap:3px;">
          ${[1,2,3,4].map(i => `<span style="width:11px;height:11px;border-radius:50%;background:linear-gradient(135deg,#a855f7,#ec4899);border:1px solid #1a0e2e;margin-left:${i === 1 ? '0' : '-4px'};"></span>`).join('')}
          <span style="font-size:7px;color:#c4b5fd;margin-left:3px;">+148 going</span>
        </div>
      </div>
      <button style="margin-top:auto;background:#635bff;color:#fff;border:none;padding:6px;border-radius:5px;font-size:8px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:4px;">
        Pay with <span style="font-weight:800;letter-spacing:-0.3px;">stripe</span>
      </button>
      <div style="display:flex;align-items:center;justify-content:space-between;margin-top:6px;">
        <span style="font-size:9px;font-weight:700;">${p.name}</span>
        <span style="font-size:6.5px;padding:1px 5px;border-radius:6px;background:rgba(168,85,247,0.25);color:#d8b4fe;font-weight:600;">Stripe</span>
      </div>
    </div>`;
}

/* 5. Shopify Store Builder — Storefront preview                   */
function frontStoreBuilder(p) {
  return `
    <div style="position:absolute;inset:0;background:#fffbeb;display:flex;flex-direction:column;">
      <div style="height:16px;background:#1a1407;display:flex;align-items:center;padding:0 8px;justify-content:space-between;">
        <span style="font-size:7.5px;color:#fcd34d;font-weight:700;letter-spacing:0.3px;">SHOP.</span>
        <div style="display:flex;gap:5px;">
          <span style="font-size:6px;color:rgba(252,211,77,0.6);">Cart</span>
          <span style="font-size:6px;color:rgba(252,211,77,0.6);">Acct</span>
        </div>
      </div>
      <div style="padding:7px;display:grid;grid-template-columns:1fr 1fr;gap:5px;flex:1;">
        ${[
          ['linear-gradient(135deg,#f59e0b,#d97706)', '$49'],
          ['linear-gradient(135deg,#fbbf24,#f59e0b)', '$29'],
          ['linear-gradient(135deg,#d97706,#92400e)', '$89'],
          ['linear-gradient(135deg,#fcd34d,#fbbf24)', '$19'],
        ].map(([g, price]) => `
          <div style="background:#fff;border-radius:4px;border:1px solid #fde68a;overflow:hidden;display:flex;flex-direction:column;">
            <div style="height:60%;background:${g};"></div>
            <div style="padding:3px 4px;display:flex;justify-content:space-between;align-items:center;">
              <span style="height:2px;width:60%;background:#fde68a;border-radius:1px;"></span>
              <span style="font-size:6.5px;font-weight:700;color:#92400e;">${price}</span>
            </div>
          </div>`).join('')}
      </div>
      <div style="display:flex;align-items:center;justify-content:space-between;padding:5px 8px 6px;border-top:1px solid #fde68a;">
        <span style="font-size:9px;font-weight:700;color:#78350f;">${p.name}</span>
        <span style="font-size:6.5px;padding:1px 5px;border-radius:6px;background:#fef3c7;color:#92400e;font-weight:600;">Liquid</span>
      </div>
    </div>`;
}

/* 6. Auth Boilerplate — Clean login form                          */
function frontAuth(p) {
  return `
    <div style="position:absolute;inset:0;background:linear-gradient(135deg,#ecfdf5,#d1fae5);display:flex;align-items:center;justify-content:center;padding:10px;">
      <div style="background:#fff;border-radius:8px;padding:10px 11px;width:100%;max-width:170px;box-shadow:0 4px 16px rgba(16,185,129,0.15);border:1px solid #d1fae5;">
        <div style="display:flex;align-items:center;gap:5px;margin-bottom:7px;">
          <span style="width:18px;height:18px;border-radius:5px;background:linear-gradient(135deg,#10b981,#059669);display:flex;align-items:center;justify-content:center;color:#fff;font-size:10px;font-weight:700;">✦</span>
          <span style="font-size:9px;font-weight:700;color:#064e3b;">Sign in</span>
        </div>
        <div style="display:flex;flex-direction:column;gap:4px;">
          <div style="border:1px solid #d1fae5;border-radius:4px;padding:4px 6px;background:#f0fdf4;">
            <div style="font-size:5.5px;color:#059669;letter-spacing:0.5px;font-weight:600;">EMAIL</div>
            <div style="height:3px;background:#d1fae5;border-radius:1px;margin-top:1px;width:75%;"></div>
          </div>
          <div style="border:1.5px solid #10b981;border-radius:4px;padding:4px 6px;background:#fff;box-shadow:0 0 0 2px rgba(16,185,129,0.1);">
            <div style="font-size:5.5px;color:#059669;letter-spacing:0.5px;font-weight:600;">PASSWORD</div>
            <div style="display:flex;gap:1.5px;margin-top:2px;">${Array(8).fill(0).map(() => `<span style="width:2px;height:2px;border-radius:50%;background:#10b981;"></span>`).join('')}</div>
          </div>
          <button style="background:#10b981;color:#fff;border:none;padding:5px;border-radius:4px;font-size:7.5px;font-weight:700;margin-top:2px;letter-spacing:0.3px;">Sign in →</button>
        </div>
      </div>
      <div style="position:absolute;top:6px;left:10px;">
        <span style="font-size:6.5px;letter-spacing:1.5px;color:#059669;font-weight:700;">JWT AUTH</span>
      </div>
      <div style="position:absolute;bottom:6px;left:10px;right:10px;display:flex;align-items:center;justify-content:space-between;">
        <span style="font-size:9px;font-weight:700;color:#064e3b;">${p.name}</span>
        <span style="font-size:6.5px;padding:1px 5px;border-radius:6px;background:#d1fae5;color:#065f46;font-weight:600;">bcrypt + JWT</span>
      </div>
    </div>`;
}

/* 7. REST API Toolkit — API explorer                              */
function frontApiToolkit(p) {
  return `
    <div style="position:absolute;inset:0;background:#1c0e0e;display:flex;font-family:'SF Mono',Menlo,monospace;color:#fff;">
      <div style="width:42px;background:#0f0707;border-right:1px solid #2a1410;padding:7px 4px;display:flex;flex-direction:column;gap:3px;">
        ${[
          ['GET', '#22c55e'],
          ['POST', '#3b82f6'],
          ['PUT', '#f59e0b'],
          ['DEL', '#ef4444'],
        ].map(([m, c]) => `
          <span style="font-size:6.5px;font-weight:700;color:${c};background:${c}22;border:1px solid ${c}55;border-radius:3px;padding:2.5px 0;text-align:center;letter-spacing:0.5px;">${m}</span>
        `).join('')}
      </div>
      <div style="flex:1;padding:7px 9px;display:flex;flex-direction:column;gap:5px;">
        <div style="background:#0f0707;border:1px solid #2a1410;border-radius:3px;padding:4px 6px;display:flex;align-items:center;gap:4px;">
          <span style="font-size:6.5px;color:#22c55e;font-weight:700;">GET</span>
          <span style="font-size:7px;color:#fdba74;">/api/users</span>
        </div>
        <div style="flex:1;background:#0f0707;border:1px solid #2a1410;border-radius:3px;padding:5px 7px;font-size:7px;line-height:1.5;">
          <div><span style="color:#6b7280;">{</span></div>
          <div style="padding-left:6px;"><span style="color:#f97316;">"status"</span><span style="color:#6b7280;">:</span> <span style="color:#22c55e;">200</span><span style="color:#6b7280;">,</span></div>
          <div style="padding-left:6px;"><span style="color:#f97316;">"data"</span><span style="color:#6b7280;">:</span> <span style="color:#6b7280;">[...]</span></div>
          <div><span style="color:#6b7280;">}</span></div>
        </div>
      </div>
      <div style="position:absolute;bottom:5px;left:50px;right:10px;display:flex;align-items:center;justify-content:space-between;">
        <span style="font-size:9px;font-weight:700;color:#fdba74;">${p.name}</span>
        <span style="font-size:6.5px;padding:1px 5px;border-radius:6px;background:rgba(249,115,22,0.25);color:#fdba74;font-weight:600;">Express</span>
      </div>
    </div>`;
}

/* 8. Portfolio CMS — Admin dashboard                              */
function frontPortfolioCMS(p) {
  return `
    <div style="position:absolute;inset:0;background:#0f1419;display:flex;color:#fff;">
      <div style="width:38px;background:#0a0f14;border-right:1px solid #1e293b;padding:7px 0;display:flex;flex-direction:column;gap:5px;align-items:center;">
        <span style="width:20px;height:20px;border-radius:5px;background:linear-gradient(135deg,#06b6d4,#0891b2);display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;">P</span>
        ${[
          ['#06b6d4', true],
          ['#475569', false],
          ['#475569', false],
          ['#475569', false],
        ].map(([c, active]) => `
          <span style="width:18px;height:14px;border-radius:3px;background:${active ? 'rgba(6,182,212,0.15)' : 'transparent'};border:1px solid ${c}44;display:flex;align-items:center;justify-content:center;">
            <span style="width:8px;height:2px;border-radius:1px;background:${c};"></span>
          </span>`).join('')}
      </div>
      <div style="flex:1;padding:7px 9px;display:flex;flex-direction:column;gap:4px;">
        <div style="display:flex;align-items:center;justify-content:space-between;">
          <span style="font-size:8.5px;font-weight:700;color:#fff;">Projects</span>
          <span style="font-size:6.5px;padding:1.5px 5px;border-radius:3px;background:#06b6d4;color:#0f1419;font-weight:700;">+ New</span>
        </div>
        ${[
          ['linear-gradient(135deg,#06b6d4,#0891b2)', 'Published'],
          ['linear-gradient(135deg,#a855f7,#7e22ce)', 'Draft'],
          ['linear-gradient(135deg,#f59e0b,#d97706)', 'Published'],
        ].map(([g, status]) => `
          <div style="display:flex;align-items:center;gap:5px;background:#161e29;border:1px solid #1e293b;border-radius:4px;padding:3px 5px;">
            <span style="width:14px;height:14px;border-radius:3px;background:${g};flex-shrink:0;"></span>
            <div style="flex:1;display:flex;flex-direction:column;gap:1px;">
              <span style="height:2.5px;width:70%;border-radius:1px;background:rgba(255,255,255,0.25);"></span>
              <span style="font-size:6px;color:${status === 'Published' ? '#67e8f9' : '#fcd34d'};font-weight:600;">${status}</span>
            </div>
          </div>`).join('')}
      </div>
      <div style="position:absolute;bottom:5px;left:46px;right:10px;display:flex;align-items:center;justify-content:space-between;">
        <span style="font-size:9px;font-weight:700;color:#fff;">${p.name}</span>
        <span style="font-size:6.5px;padding:1px 5px;border-radius:6px;background:rgba(6,182,212,0.22);color:#67e8f9;font-weight:600;">Headless CMS</span>
      </div>
    </div>`;
}
