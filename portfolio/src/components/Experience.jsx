import { useState } from 'react';
import styles from './Experience.module.css';

const jobs = [
  {
    company: 'Freelance',
    role: 'Full Stack Developer',
    period: 'Jan 2023 – Present',
    bullets: [
      'Built and delivered full-stack web applications for clients across e-commerce, logistics, and SaaS.',
      'Developed Shopify apps and custom themes using Polaris, Admin API, and Liquid templating.',
      'Integrated third-party services including Stripe, Cloudinary, and Leopards Courier API.',
    ],
  },
  {
    company: 'DevJour',
    role: 'Full Stack Developer @ DevJour',
    period: 'Jun 2023 – Present',
    bullets: [
      'Built a subscription management Shopify app embedded directly in the merchant admin using App Bridge and Polaris.',
      'Implemented recurring billing flows on top of the Shopify Subscriptions and Billing APIs with retry and dunning logic.',
      'Designed merchant-facing analytics for MRR, churn, and active subscribers with webhook-driven real-time updates.',
    ],
  },
  {
    company: 'Design Editor',
    role: 'Frontend Developer @ Design Editor',
    period: 'Mar 2023 – Oct 2023',
    bullets: [
      'Built an interactive drag-and-drop design editor embedded live inside Shopify storefronts.',
      'Used React, Canvas API, and Fabric.js for real-time element manipulation and export.',
      'Optimised rendering performance to handle 50+ simultaneous canvas objects smoothly.',
    ],
  },
  {
    company: 'EVP',
    role: 'Full Stack Developer @ EVP',
    period: 'Aug 2022 – Apr 2023',
    bullets: [
      'Developed a full-featured event management platform with ticketing and Stripe checkout.',
      'Built organiser dashboards with real-time attendee tracking and payout management.',
      'Implemented role-based access control for organizers, staff, and attendees.',
    ],
  },
  {
    company: 'Auth Boilerplate',
    role: 'Backend Developer @ Auth Boilerplate',
    period: 'Jan 2023 – Mar 2023',
    bullets: [
      'Created a production-ready authentication boilerplate with JWT access and refresh tokens.',
      'Implemented role-based access, bcrypt password hashing, and secure session management.',
      'Open-sourced the project with full documentation and example usage.',
    ],
  },
];

export default function Experience() {
  const [active, setActive] = useState(0);
  const job = jobs[active];

  return (
    <section id="experience" className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.title}>Experience<span className={styles.dot}>.</span></h2>
        <div className={styles.layout}>

          {/* Sidebar */}
          <div className={styles.sidebar} role="tablist" aria-label="Work experience">
            {jobs.map((j, i) => (
              <button
                key={j.company}
                role="tab"
                type="button"
                id={`exp-tab-${i}`}
                aria-selected={i === active}
                aria-controls={`exp-panel-${i}`}
                tabIndex={i === active ? 0 : -1}
                className={`${styles.tab} ${i === active ? styles.activeTab : ''}`}
                onClick={() => setActive(i)}
              >
                {j.company}
              </button>
            ))}
          </div>

          {/* Detail panel */}
          <div
            className={styles.panel}
            key={active}
            role="tabpanel"
            id={`exp-panel-${active}`}
            aria-labelledby={`exp-tab-${active}`}
          >
            <h3 className={styles.role}>{job.role}</h3>
            <p className={styles.period}>{job.period}</p>
            <ul className={styles.bullets}>
              {job.bullets.map((b, i) => (
                <li key={i} className={styles.bullet}>
                  <span className={styles.check}>✓</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
