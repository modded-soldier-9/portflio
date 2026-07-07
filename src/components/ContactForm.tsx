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

  return (
    <section id="contact" className="py-20">
      <div className="container">
        <div className="max-w-lg">
          <h2 className="text-2xl font-bold mb-2">Get in Touch</h2>
          <p className="text-sm text-fg-muted mb-8">
            Reach me at{' '}
            <a href={`mailto:${siteConfig.contact.email}`} className="text-accent hover:underline">
              {siteConfig.contact.email}
            </a>{' '}
            or use the form below.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-xs font-medium text-fg-muted mb-1.5">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  autoComplete="name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg bg-bg-raised border border-border text-fg placeholder:text-fg-faint focus:outline-none focus:ring-2 focus:ring-accent/40"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs font-medium text-fg-muted mb-1.5">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg bg-bg-raised border border-border text-fg placeholder:text-fg-faint focus:outline-none focus:ring-2 focus:ring-accent/40"
                  placeholder="you@example.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-xs font-medium text-fg-muted mb-1.5">Message</label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-lg bg-bg-raised border border-border text-fg placeholder:text-fg-faint focus:outline-none focus:ring-2 focus:ring-accent/40 resize-none"
                placeholder="How can I help?"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-accent text-[#05140d] text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Send via WhatsApp
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
