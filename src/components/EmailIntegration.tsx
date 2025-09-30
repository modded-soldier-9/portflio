'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, Loader } from 'lucide-react';

interface EmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface EmailIntegrationProps {
  onEmailSent?: (success: boolean) => void;
}

const EmailIntegration = ({ onEmailSent }: EmailIntegrationProps) => {
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const sendEmail = async (emailData: EmailData) => {
    setIsSending(true);
    setStatus('idle');
    setErrorMessage('');

    try {
      // In a real implementation, you would call your API endpoint
      // For now, we'll simulate the API call
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: 'contact@mohamedelsheikh.dev',
          from: emailData.email,
          subject: `Portfolio Contact: ${emailData.subject}`,
          text: `
            Name: ${emailData.name}
            Email: ${emailData.email}
            Subject: ${emailData.subject}
            
            Message:
            ${emailData.message}
          `,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #6366f1;">New Contact Form Submission</h2>
              <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Name:</strong> ${emailData.name}</p>
                <p><strong>Email:</strong> ${emailData.email}</p>
                <p><strong>Subject:</strong> ${emailData.subject}</p>
              </div>
              <div style="background: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
                <h3 style="color: #374151; margin-top: 0;">Message:</h3>
                <p style="color: #6b7280; line-height: 1.6;">${emailData.message.replace(/\n/g, '<br>')}</p>
              </div>
              <div style="margin-top: 20px; padding: 15px; background: #f0f9ff; border-radius: 8px; border-left: 4px solid #3b82f6;">
                <p style="margin: 0; color: #1e40af; font-size: 14px;">
                  This message was sent from your portfolio contact form at mohamedelsheikh.dev
                </p>
              </div>
            </div>
          `,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      setStatus('success');
      onEmailSent?.(true);
    } catch (error) {
      console.error('Error sending email:', error);
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to send email');
      onEmailSent?.(false);
    } finally {
      setIsSending(false);
    }
  };

  // This would be used by the ContactForm component
  return { sendEmail, isSending, status, errorMessage };
};

// Email service configuration
export const emailConfig = {
  service: 'resend', // or 'nodemailer', 'sendgrid', etc.
  apiKey: process.env.NEXT_PUBLIC_EMAIL_API_KEY,
  fromEmail: 'noreply@mohamedelsheikh.dev',
  toEmail: 'contact@mohamedelsheikh.dev',
};

// Email templates
export const emailTemplates = {
  contact: {
    subject: 'New Contact Form Submission - Portfolio',
    template: (data: EmailData) => ({
      text: `
        New contact form submission from ${data.name} (${data.email})
        
        Subject: ${data.subject}
        
        Message:
        ${data.message}
        
        ---
        Sent from mohamedelsheikh.dev portfolio
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #6366f1; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Contact Information</h3>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Subject:</strong> ${data.subject}</p>
          </div>
          
          <div style="background: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <h3 style="color: #374151; margin-top: 0;">Message</h3>
            <p style="color: #6b7280; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background: #f0f9ff; border-radius: 8px; border-left: 4px solid #3b82f6;">
            <p style="margin: 0; color: #1e40af; font-size: 14px;">
              📧 This message was sent from your portfolio contact form at 
              <a href="https://mohamedelsheikh.dev" style="color: #3b82f6;">mohamedelsheikh.dev</a>
            </p>
          </div>
        </div>
      `,
    }),
  },
  
  autoReply: {
    subject: 'Thank you for contacting Mohamed Elsheikh',
    template: (data: EmailData) => ({
      text: `
        Hi ${data.name},
        
        Thank you for reaching out! I've received your message about "${data.subject}" and will get back to you as soon as possible.
        
        Best regards,
        Mohamed Elsheikh
        Head of Cyber Security | AWS Academy Graduate
        
        ---
        This is an automated response. Please do not reply to this email.
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #6366f1; margin-bottom: 10px;">Thank You!</h1>
            <p style="color: #6b7280; font-size: 18px;">Your message has been received</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="color: #374151; margin: 0 0 10px 0;">Hi ${data.name},</p>
            <p style="color: #6b7280; line-height: 1.6; margin: 0;">
              Thank you for reaching out! I've received your message about 
              <strong>"${data.subject}"</strong> and will get back to you as soon as possible.
            </p>
          </div>
          
          <div style="background: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <p style="color: #374151; margin: 0 0 10px 0;">Best regards,</p>
            <p style="color: #6366f1; font-weight: bold; margin: 0 0 5px 0;">Mohamed Elsheikh</p>
            <p style="color: #6b7280; margin: 0; font-size: 14px;">
              Head of Cyber Security | AWS Academy Graduate
            </p>
          </div>
          
          <div style="margin-top: 30px; padding: 15px; background: #f9fafb; border-radius: 8px; text-align: center;">
            <p style="margin: 0; color: #9ca3af; font-size: 12px;">
              This is an automated response. Please do not reply to this email.
            </p>
          </div>
        </div>
      `,
    }),
  },
};

// Email status component
export const EmailStatus = ({ status, errorMessage }: { status: string; errorMessage?: string }) => {
  if (status === 'success') {
    return (
      <motion.div
        className="flex items-center space-x-2 text-green-400"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <CheckCircle className="w-5 h-5" />
        <span>Email sent successfully!</span>
      </motion.div>
    );
  }

  if (status === 'error') {
    return (
      <motion.div
        className="flex items-center space-x-2 text-red-400"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <AlertCircle className="w-5 h-5" />
        <span>{errorMessage || 'Failed to send email'}</span>
      </motion.div>
    );
  }

  return null;
};

// Loading component
export const EmailLoading = () => {
  return (
    <motion.div
      className="flex items-center space-x-2 text-indigo-400"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Loader className="w-5 h-5 animate-spin" />
      <span>Sending email...</span>
    </motion.div>
  );
};

export default EmailIntegration;
