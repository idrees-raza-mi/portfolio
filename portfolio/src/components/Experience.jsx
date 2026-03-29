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
    company: 'PakiShip',
    role: 'Lead Developer @ PakiShip',
    period: 'Jun 2023 – Present',
    bullets: [
      'Architected and built a Pakistan-focused shipping aggregator platform from the ground up.',
      'Integrated multiple courier APIs (Leopards, TCS, Call Courier) into a unified dashboard.',
      'Implemented real-time order tracking, automated label generation, and Stripe-based payouts.',
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
          <ul className={styles.sidebar}>
            {jobs.map((j, i) => (
              <li
                key={j.company}
                className={`${styles.tab} ${i === active ? styles.activeTab : ''}`}
                onClick={() => setActive(i)}
              >
                {j.company}
              </li>
            ))}
          </ul>

          {/* Detail panel */}
          <div className={styles.panel} key={active}>
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
