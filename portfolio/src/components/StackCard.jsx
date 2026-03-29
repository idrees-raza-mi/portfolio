import { forwardRef } from 'react';
import styles from './StackCard.module.css';

const termLines = [
  [
    { t: 'cyan', text: 'GET /api/projects 200' },
    { t: 'dim',  text: 'POST /auth/login 201' },
    { t: 'green',text: 'Connected to MongoDB' },
    { t: 'dim',  text: 'Server running :3000' },
    { t: 'cyan', text: 'Webhook received ✓' },
  ],
  [
    { t: 'dim',  text: 'GET /api/orders 200' },
    { t: 'cyan', text: 'POST /auth/token' },
    { t: 'green',text: 'JWT verified ✓' },
    { t: 'dim',  text: 'Cloudinary upload OK' },
    { t: 'cyan', text: 'Rate limit: 98/100' },
  ],
  [
    { t: 'green',text: 'Stripe webhook OK' },
    { t: 'dim',  text: 'GET /drivers 200' },
    { t: 'cyan', text: 'Socket connected' },
    { t: 'dim',  text: 'Multer: file saved' },
    { t: 'green',text: 'Deployment live ✓' },
  ],
  [
    { t: 'cyan', text: 'POST /events/create' },
    { t: 'green',text: 'Payout sent ✓' },
    { t: 'dim',  text: 'bcrypt hash OK' },
    { t: 'cyan', text: 'Leopards: synced' },
    { t: 'dim',  text: 'MongoDB: 4 docs' },
  ],
  [
    { t: 'dim',  text: 'Metafield updated' },
    { t: 'green',text: 'Theme published ✓' },
    { t: 'cyan', text: 'GET /shop/products' },
    { t: 'dim',  text: 'Webhook: order/paid' },
    { t: 'green',text: 'Admin API 200 OK' },
  ],
  [
    { t: 'cyan', text: 'Refresh token issued' },
    { t: 'green',text: 'Role: admin ✓' },
    { t: 'dim',  text: 'bcrypt rounds: 12' },
    { t: 'cyan', text: 'Session stored' },
    { t: 'dim',  text: 'GET /user/me 200' },
  ],
  [
    { t: 'green',text: 'Rate limit OK' },
    { t: 'dim',  text: 'Morgan: GET /api' },
    { t: 'cyan', text: '200 ms response' },
    { t: 'dim',  text: 'Pagination applied' },
    { t: 'green',text: 'Modular route ✓' },
  ],
  [
    { t: 'cyan', text: 'Multer: image saved' },
    { t: 'green',text: 'Cloudinary CDN ✓' },
    { t: 'dim',  text: 'POST /portfolio/add' },
    { t: 'cyan', text: 'Admin authenticated' },
    { t: 'dim',  text: 'MongoDB updated' },
  ],
];

const navWidths = ['85%','70%','90%','75%','80%','65%','88%','72%'];
const footWidths = ['60%','45%','55%','50%','40%','70%','35%','48%'];

const StackCard = forwardRef(function StackCard({ index, flipped, floatPaused }, ref) {
  const lines = termLines[index];
  return (
    <div
      ref={ref}
      className={`${styles.card} ${floatPaused ? styles.nofloat : ''}`}
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      <div className={styles.perspective}>
        <div className={`${styles.inner} ${flipped ? styles.flipped : ''}`}>

          {/* FRONT — browser mock */}
          <div className={`${styles.face} ${styles.front}`}>
            <div className={styles.mockBar}>
              <span className={styles.dotR} /><span className={styles.dotY} /><span className={styles.dotG} />
            </div>
            <div className={styles.mockBody}>
              <div className={styles.mockNav} style={{ width: navWidths[index] }} />
              <div className={styles.mockHero} />
              <div className={styles.mockGrid}>
                <div className={styles.mockBlock} /><div className={styles.mockBlock} />
              </div>
              <div className={styles.mockFoot} style={{ width: footWidths[index] }} />
            </div>
            <span className={styles.label}>FRONTEND</span>
          </div>

          {/* BACK — terminal mock */}
          <div className={`${styles.face} ${styles.back}`}>
            <div className={styles.termBar}>
              <span className={styles.dotR} /><span className={styles.dotY} /><span className={styles.dotG} />
            </div>
            <div className={styles.termText}>
              {lines.map((l, i) => (
                <span key={i} className={styles[l.t]}>{l.text}</span>
              ))}
            </div>
            <span className={styles.label}>BACKEND</span>
          </div>

        </div>
      </div>
    </div>
  );
});

export default StackCard;
