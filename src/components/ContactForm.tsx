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

  const inputClass = "w-full px-3 py-2.5 text-sm rounded-sm border border-[var(--color-rule)] bg-[var(--color-paper)] text-[var(--color-ink)] placeholder:text-[var(--color-ink-faint)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/30 focus:border-[var(--color-accent)]/40 transition-colors";

  return (
    <div id="contact">
      <h2 className="font-display mb-2">Say Hello</h2>
      <p className="text-sm text-[var(--color-ink-muted)] mb-5">
        <a href={`mailto:${siteConfig.contact.email}`} className="text-[var(--color-ink)] underline hover:no-underline">{siteConfig.contact.email}</a>
        {' '}&middot; or drop a message below.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3 max-w-md">
        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <label htmlFor="name" className="block font-mono text-[10px] text-[var(--color-ink-faint)] uppercase tracking-wider mb-1">Name</label>
            <input type="text" id="name" required autoComplete="name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className={inputClass} />
          </div>
          <div>
            <label htmlFor="email" className="block font-mono text-[10px] text-[var(--color-ink-faint)] uppercase tracking-wider mb-1">Email</label>
            <input type="email" id="email" required autoComplete="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className={inputClass} />
          </div>
        </div>
        <div>
          <label htmlFor="msg" className="block font-mono text-[10px] text-[var(--color-ink-faint)] uppercase tracking-wider mb-1">Message</label>
          <textarea id="msg" required rows={4} value={form.message} onChange={e => setForm({...form, message: e.target.value})} className={`${inputClass} resize-none`} />
        </div>
        <div className="flex flex-wrap gap-3">
          <button type="submit" className="px-5 py-2.5 text-sm font-medium rounded-sm bg-[var(--color-ink)] text-[var(--color-paper)] hover:opacity-80 transition-opacity">
            Send via WhatsApp
          </button>
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="px-5 py-2.5 text-sm font-medium rounded-sm border border-[var(--color-ink)] text-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)] transition-colors"
          >
            Email directly
          </a>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
