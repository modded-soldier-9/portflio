'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, User, MessageSquare, Send, CheckCircle, AlertCircle, Phone, MessageCircle } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [contactMethod, setContactMethod] = useState<'whatsapp' | 'email'>('whatsapp');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = 'Subject must be at least 5 characters';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      if (contactMethod === 'whatsapp') {
        // Format message for WhatsApp
        const whatsappMessage = `Hi Mohamed! I'm ${formData.name} and I'd like to discuss: ${formData.subject}

My email: ${formData.email}

Message: ${formData.message}

Looking forward to hearing from you!`;
        
        // Create WhatsApp URL
        const whatsappNumber = '0665623383';
        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappUrl = `https://wa.me/27${whatsappNumber.replace(/^0/, '')}?text=${encodedMessage}`;
        
        // Open WhatsApp
        window.open(whatsappUrl, '_blank');
        
        // Simulate delay for UX
        await new Promise(resolve => setTimeout(resolve, 1000));
      } else {
        // Email functionality (if needed in future)
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log('Email form submitted:', formData);
      }
      
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (isSubmitted) {
    return (
      <motion.div
        className="text-center py-12"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 0.6, repeat: 2 }}
        >
          {contactMethod === 'whatsapp' ? (
            <MessageCircle className="w-10 h-10 text-green-500" />
          ) : (
            <CheckCircle className="w-10 h-10 text-green-500" />
          )}
        </motion.div>
        <h3 className="text-2xl font-bold text-white mb-2">
          {contactMethod === 'whatsapp' ? 'WhatsApp Opened!' : 'Message Sent!'}
        </h3>
        <p className="text-gray-400 mb-6">
          {contactMethod === 'whatsapp' 
            ? 'WhatsApp should have opened with your message. If not, please try again or contact me directly at +27 66 562 3383'
            : 'Thank you for your message. I\'ll get back to you as soon as possible.'
          }
        </p>
        <motion.button
          onClick={() => setIsSubmitted(false)}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Send Another Message
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="max-w-2xl mx-auto"
    >
      <motion.h2 
        className="text-3xl font-bold text-center mb-8 gradient-text"
        variants={itemVariants}
      >
        Get In Touch
      </motion.h2>
      
      <motion.p 
        className="text-center text-gray-400 mb-8"
        variants={itemVariants}
      >
        Have a project in mind or want to discuss cybersecurity opportunities? 
        I&apos;d love to hear from you!
      </motion.p>

      {/* Contact Method Selector */}
      <motion.div
        className="flex justify-center mb-8"
        variants={itemVariants}
      >
        <div className="flex bg-gray-800/50 rounded-lg p-1">
          <motion.button
            onClick={() => setContactMethod('whatsapp')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
              contactMethod === 'whatsapp'
                ? 'bg-green-500 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp</span>
          </motion.button>
          <motion.button
            onClick={() => setContactMethod('email')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
              contactMethod === 'email'
                ? 'bg-indigo-500 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mail className="w-4 h-4" />
            <span>Email</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Contact Info */}
      <motion.div
        className="text-center mb-8 p-4 bg-gray-800/30 rounded-lg border border-gray-700/50"
        variants={itemVariants}
      >
        <div className="flex items-center justify-center space-x-6 text-sm text-gray-400">
          <div className="flex items-center space-x-2">
            <Phone className="w-4 h-4 text-green-400" />
            <span>+27 66 562 3383</span>
          </div>
          <div className="flex items-center space-x-2">
            <Mail className="w-4 h-4 text-indigo-400" />
            <span>contact@mohamedelsheikh.dev</span>
          </div>
        </div>
      </motion.div>

      <motion.form
        onSubmit={handleSubmit}
        className="space-y-6"
        variants={itemVariants}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
              <User className="w-4 h-4 inline mr-2" />
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 rounded-lg bg-gray-800/50 border backdrop-blur-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                errors.name 
                  ? 'border-red-500 focus:ring-red-500/50' 
                  : 'border-gray-600 focus:ring-indigo-500/50 focus:border-indigo-500'
              }`}
              placeholder="Your full name"
            />
            {errors.name && (
              <motion.p 
                className="mt-2 text-sm text-red-400 flex items-center"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.name}
              </motion.p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              <Mail className="w-4 h-4 inline mr-2" />
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 rounded-lg bg-gray-800/50 border backdrop-blur-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                errors.email 
                  ? 'border-red-500 focus:ring-red-500/50' 
                  : 'border-gray-600 focus:ring-indigo-500/50 focus:border-indigo-500'
              }`}
              placeholder="your.email@example.com"
            />
            {errors.email && (
              <motion.p 
                className="mt-2 text-sm text-red-400 flex items-center"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.email}
              </motion.p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 rounded-lg bg-gray-800/50 border backdrop-blur-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
              errors.subject 
                ? 'border-red-500 focus:ring-red-500/50' 
                : 'border-gray-600 focus:ring-indigo-500/50 focus:border-indigo-500'
            }`}
            placeholder="What's this about?"
          />
          {errors.subject && (
            <motion.p 
              className="mt-2 text-sm text-red-400 flex items-center"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.subject}
            </motion.p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
            <MessageSquare className="w-4 h-4 inline mr-2" />
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={6}
            className={`w-full px-4 py-3 rounded-lg bg-gray-800/50 border backdrop-blur-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 resize-none ${
              errors.message 
                ? 'border-red-500 focus:ring-red-500/50' 
                : 'border-gray-600 focus:ring-indigo-500/50 focus:border-indigo-500'
            }`}
            placeholder="Tell me about your project or how I can help..."
          />
          {errors.message && (
            <motion.p 
              className="mt-2 text-sm text-red-400 flex items-center"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.message}
            </motion.p>
          )}
        </div>

        <motion.button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-300 flex items-center justify-center space-x-2 ${
            isSubmitting
              ? 'bg-gray-600 cursor-not-allowed'
              : contactMethod === 'whatsapp'
                ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 hover:scale-105'
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 hover:scale-105'
          }`}
          whileHover={!isSubmitting ? { scale: 1.02 } : {}}
          whileTap={!isSubmitting ? { scale: 0.98 } : {}}
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>{contactMethod === 'whatsapp' ? 'Opening WhatsApp...' : 'Sending...'}</span>
            </>
          ) : (
            <>
              {contactMethod === 'whatsapp' ? (
                <MessageCircle className="w-5 h-5" />
              ) : (
                <Send className="w-5 h-5" />
              )}
              <span>{contactMethod === 'whatsapp' ? 'Open WhatsApp' : 'Send Message'}</span>
            </>
          )}
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default ContactForm;
