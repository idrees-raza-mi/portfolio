import { useState } from 'react';
import { FiMail, FiUser, FiMessageSquare, FiSend } from 'react-icons/fi';
import styles from './Contact.module.css';

const EMAIL = 'razaidrees.m@gmail.com';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: null });
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Please enter your name';
    if (!form.email.trim()) next.email = 'Please enter your email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email';
    if (!form.message.trim()) next.message = 'Please write a message';
    else if (form.message.trim().length < 10) next.message = 'Message is a bit short (min 10 chars)';
    return next;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name}`);
    const body = encodeURIComponent(
      `Hi Idrees,\n\n${form.message}\n\n— ${form.name}\n${form.email}`
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;

    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.title}>Let's Build Something</h2>
        <p className={styles.sub}>Available for freelance projects and full-time roles</p>

        <a href={`mailto:${EMAIL}`} className={styles.email}>
          <FiMail size={14} style={{ marginRight: 6, verticalAlign: 'middle' }} />
          {EMAIL}
        </a>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="c-name" className={styles.label}>
                <FiUser size={12} /> Name
              </label>
              <input
                id="c-name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'c-name-err' : undefined}
              />
              {errors.name && <span id="c-name-err" className={styles.error}>{errors.name}</span>}
            </div>

            <div className={styles.field}>
              <label htmlFor="c-email" className={styles.label}>
                <FiMail size={12} /> Email
              </label>
              <input
                id="c-email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'c-email-err' : undefined}
              />
              {errors.email && <span id="c-email-err" className={styles.error}>{errors.email}</span>}
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="c-msg" className={styles.label}>
              <FiMessageSquare size={12} /> Message
            </label>
            <textarea
              id="c-msg"
              name="message"
              rows="5"
              value={form.message}
              onChange={handleChange}
              placeholder="Tell me about your project..."
              className={`${styles.input} ${styles.textarea} ${errors.message ? styles.inputError : ''}`}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? 'c-msg-err' : undefined}
            />
            {errors.message && <span id="c-msg-err" className={styles.error}>{errors.message}</span>}
          </div>

          <button type="submit" className={styles.submitBtn}>
            <FiSend size={14} />
            {sent ? 'Opening your email…' : 'Send Message'}
          </button>
          {sent && (
            <p className={styles.success} role="status">
              Your email client should be open now. If not, copy {EMAIL}.
            </p>
          )}
        </form>

        <div className={styles.btns}>
          <a href="https://www.linkedin.com/in/idrees-raza-7781413bb" target="_blank" rel="noreferrer" className={`${styles.btn} ${styles.li}`}>LinkedIn ↗</a>
          <a href="https://github.com/idrees-raza-mi" target="_blank" rel="noreferrer" className={`${styles.btn} ${styles.gh}`}>GitHub ↗</a>
        </div>
      </div>
    </section>
  );
}
