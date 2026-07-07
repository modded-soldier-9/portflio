'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Send, CheckCircle, AlertCircle, Phone, MessageCircle } from 'lucide-react';
import { siteConfig } from '@/config/site';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormData, string>>;

const inputBase =
  'w-full px-4 py-3 rounded-lg bg-background border text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors duration-200';

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [contactMethod, setContactMethod] = useState<'whatsapp' | 'email'>('whatsapp');

  const validateForm = (): boolean => {
    const next: FormErrors = {};
    if (!formData.name.trim()) next.name = 'Name is required';
    else if (formData.name.trim().length < 2) next.name = 'Name must be at least 2 characters';

    if (!formData.email.trim()) next.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) next.email = 'Please enter a valid email address';

    if (!formData.subject.trim()) next.subject = 'Subject is required';
    else if (formData.subject.trim().length < 5) next.subject = 'Subject must be at least 5 characters';

    if (!formData.message.trim()) next.message = 'Message is required';
    else if (formData.message.trim().length < 10) next.message = 'Message must be at least 10 characters';

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      if (contactMethod === 'whatsapp') {
        const text = `Hi ${siteConfig.name.split(' ')[0]}! I'm ${formData.name} and I'd like to discuss: ${formData.subject}\n\nMy email: ${formData.email}\n\nMessage: ${formData.message}`;
        const url = `https://wa.me/${siteConfig.contact.whatsappCountryCode}${siteConfig.contact.whatsapp}?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank', 'noopener,noreferrer');
        await new Promise((r) => setTimeout(r, 800));
      } else {
        const url = `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`${formData.message}\n\n— ${formData.name} (${formData.email})`)}`;
        window.location.href = url;
        await new Promise((r) => setTimeout(r, 500));
      }
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      setErrors({ message: 'Something went wrong. Please try again or email me directly.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        className="max-w-2xl mx-auto text-center py-12"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        role="status"
        aria-live="polite"
      >
        <div className="w-16 h-16 rounded-full bg-primary/10 grid place-items-center mx-auto mb-6">
          {contactMethod === 'whatsapp' ? (
            <MessageCircle className="w-8 h-8 text-primary" aria-hidden="true" />
          ) : (
            <CheckCircle className="w-8 h-8 text-primary" aria-hidden="true" />
          )}
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">
          {contactMethod === 'whatsapp' ? 'WhatsApp Opened' : 'Email Draft Ready'}
        </h3>
        <p className="text-muted mb-6">
          {contactMethod === 'whatsapp'
            ? `If it didn't open, reach me directly at ${siteConfig.contact.phoneDisplay}.`
            : `If your mail client didn't open, email me at ${siteConfig.contact.email}.`}
        </p>
        <button type="button" onClick={() => setIsSubmitted(false)} className="btn-secondary">
          Send Another Message
        </button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-10">
        <span className="eyebrow justify-center">Contact</span>
        <h2 className="section-heading mt-4">Let&rsquo;s Work Together</h2>
        <p className="section-subtitle mt-4 max-w-xl mx-auto">
          Have a project in mind or want to discuss a cybersecurity opportunity? Send a message and
          I&rsquo;ll get back to you.
        </p>
      </div>

      {/* Contact method toggle */}
      <div className="flex justify-center mb-8" role="tablist" aria-label="Preferred contact method">
        {(['whatsapp', 'email'] as const).map((method) => (
          <button
            key={method}
            type="button"
            role="tab"
            aria-selected={contactMethod === method}
            onClick={() => setContactMethod(method)}
            className={`flex items-center gap-2 px-5 py-2 text-sm font-medium transition-colors first:rounded-l-lg last:rounded-r-lg border border-border ${
              contactMethod === method ? 'bg-primary text-[#05140d]' : 'bg-card text-muted hover:text-foreground'
            }`}
          >
            {method === 'whatsapp' ? <MessageCircle className="w-4 h-4" aria-hidden="true" /> : <Mail className="w-4 h-4" aria-hidden="true" />}
            {method === 'whatsapp' ? 'WhatsApp' : 'Email'}
          </button>
        ))}
      </div>

      {/* Direct contact info */}
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-8 text-sm text-muted">
        <a href={`tel:+${siteConfig.contact.whatsappCountryCode}${siteConfig.contact.whatsapp}`} className="inline-flex items-center gap-2 hover:text-primary transition-colors">
          <Phone className="w-4 h-4 text-primary" aria-hidden="true" />
          {siteConfig.contact.phoneDisplay}
        </a>
        <a href={`mailto:${siteConfig.contact.email}`} className="inline-flex items-center gap-2 hover:text-primary transition-colors">
          <Mail className="w-4 h-4 text-primary" aria-hidden="true" />
          {siteConfig.contact.email}
        </a>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-muted-strong mb-2">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              autoComplete="name"
              value={formData.name}
              onChange={handleInputChange}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
              className={`${inputBase} ${errors.name ? 'border-red-500' : 'border-border'}`}
              placeholder="Your full name…"
            />
            {errors.name && (
              <p id="name-error" className="mt-2 text-sm text-red-400 flex items-center gap-1" aria-live="polite">
                <AlertCircle className="w-4 h-4" aria-hidden="true" />
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-muted-strong mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              inputMode="email"
              spellCheck={false}
              value={formData.email}
              onChange={handleInputChange}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
              className={`${inputBase} ${errors.email ? 'border-red-500' : 'border-border'}`}
              placeholder="you@example.com"
            />
            {errors.email && (
              <p id="email-error" className="mt-2 text-sm text-red-400 flex items-center gap-1" aria-live="polite">
                <AlertCircle className="w-4 h-4" aria-hidden="true" />
                {errors.email}
              </p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-muted-strong mb-2">Subject</label>
          <input
            type="text"
            id="subject"
            name="subject"
            autoComplete="off"
            value={formData.subject}
            onChange={handleInputChange}
            aria-invalid={!!errors.subject}
            aria-describedby={errors.subject ? 'subject-error' : undefined}
            className={`${inputBase} ${errors.subject ? 'border-red-500' : 'border-border'}`}
            placeholder="e.g. Security assessment enquiry…"
          />
          {errors.subject && (
            <p id="subject-error" className="mt-2 text-sm text-red-400 flex items-center gap-1" aria-live="polite">
              <AlertCircle className="w-4 h-4" aria-hidden="true" />
              {errors.subject}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-muted-strong mb-2">
            <MessageSquare className="w-4 h-4 inline mr-1.5" aria-hidden="true" />
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            value={formData.message}
            onChange={handleInputChange}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'message-error' : undefined}
            className={`${inputBase} resize-none ${errors.message ? 'border-red-500' : 'border-border'}`}
            placeholder="Tell me about your project or how I can help…"
          />
          {errors.message && (
            <p id="message-error" className="mt-2 text-sm text-red-400 flex items-center gap-1" aria-live="polite">
              <AlertCircle className="w-4 h-4" aria-hidden="true" />
              {errors.message}
            </p>
          )}
        </div>

        <button type="submit" disabled={isSubmitting} className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed">
          {isSubmitting ? (
            <>
              <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" aria-hidden="true" />
              {contactMethod === 'whatsapp' ? 'Opening WhatsApp…' : 'Opening Email…'}
            </>
          ) : (
            <>
              {contactMethod === 'whatsapp' ? <MessageCircle className="w-5 h-5" aria-hidden="true" /> : <Send className="w-5 h-5" aria-hidden="true" />}
              {contactMethod === 'whatsapp' ? 'Send via WhatsApp' : 'Send via Email'}
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
