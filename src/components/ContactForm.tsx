'use client';

import { useState } from 'react';
import { siteConfig } from '@/config/site';

const ContactForm = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hi! I'm ${form.name} (${form.email}).\n\n${form.message}`;
    window.open(
      `https://wa.me/${siteConfig.contact.whatsappCountryCode}${siteConfig.contact.whatsapp}?text=${encodeURIComponent(text)}`,
      '_blank'
    );
  };

  const inputClass = "w-full px-3 py-2 text-sm rounded border border-rule bg-paper-3/50 text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/40 transition-colors";

  return (
    <section id="contact">
      <h2 className="font-display mb-2">Get in Touch</h2>
      <p className="text-sm text-ink-muted mb-6">
        <a href={`mailto:${siteConfig.contact.email}`} className="text-accent hover:underline">{siteConfig.contact.email}</a>
        {' '}&middot;{' '}or use the form.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3 max-w-sm">
        <div>
          <label htmlFor="name" className="block text-xs text-ink-muted mb-1">Name</label>
          <input type="text" id="name" required autoComplete="name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className={inputClass} />
        </div>
        <div>
          <label htmlFor="email" className="block text-xs text-ink-muted mb-1">Email</label>
          <input type="email" id="email" required autoComplete="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className={inputClass} />
        </div>
        <div>
          <label htmlFor="msg" className="block text-xs text-ink-muted mb-1">Message</label>
          <textarea id="msg" required rows={3} value={form.message} onChange={e => setForm({...form, message: e.target.value})} className={`${inputClass} resize-none`} />
        </div>
        <button type="submit" className="px-4 py-2 text-sm font-medium rounded bg-accent text-paper hover:opacity-90 transition-opacity">
          Send via WhatsApp
        </button>
      </form>
    </section>
  );
};

export default ContactForm;
