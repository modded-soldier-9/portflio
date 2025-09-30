'use client';

import { useEffect } from 'react';

// Google Analytics 4 implementation
const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX';

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag: {
      (...args: unknown[]): void;
      q: unknown[];
    };
  }
}

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window !== 'undefined' && GA_TRACKING_ID) {
    // Load Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.gtag = window.gtag || function(...args: unknown[]) {
      (window.gtag.q = window.gtag.q || []).push(args);
    };
    
    window.gtag('js', new Date());
    window.gtag('config', GA_TRACKING_ID, {
      page_title: document.title,
      page_location: window.location.href,
    });
  }
};

// Track page views
export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// Track custom events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track section views
export const trackSectionView = (sectionName: string) => {
  trackEvent('section_view', 'engagement', sectionName);
};

// Track button clicks
export const trackButtonClick = (buttonName: string, location: string) => {
  trackEvent('button_click', 'interaction', `${buttonName}_${location}`);
};

// Track form submissions
export const trackFormSubmission = (formName: string) => {
  trackEvent('form_submit', 'conversion', formName);
};

// Track external link clicks
export const trackExternalLink = (url: string, linkText: string) => {
  trackEvent('external_link_click', 'outbound', `${linkText}_${url}`);
};

// Track download events
export const trackDownload = (fileName: string) => {
  trackEvent('file_download', 'engagement', fileName);
};

// Track search events
export const trackSearch = (searchTerm: string, resultsCount: number) => {
  trackEvent('search', 'engagement', searchTerm, resultsCount);
};

// Track theme changes
export const trackThemeChange = (theme: string) => {
  trackEvent('theme_change', 'preference', theme);
};

// Track scroll depth
export const trackScrollDepth = (depth: number) => {
  trackEvent('scroll_depth', 'engagement', `${depth}%`);
};

// Analytics component
const Analytics = () => {
  useEffect(() => {
    initGA();

    // Track page load
    trackPageView(window.location.pathname);

    // Track scroll depth
    let maxScrollDepth = 0;
    const trackScroll = () => {
      const scrollDepth = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      
      if (scrollDepth > maxScrollDepth) {
        maxScrollDepth = scrollDepth;
        
        // Track milestone scroll depths
        if (scrollDepth >= 25 && maxScrollDepth < 25) {
          trackScrollDepth(25);
        } else if (scrollDepth >= 50 && maxScrollDepth < 50) {
          trackScrollDepth(50);
        } else if (scrollDepth >= 75 && maxScrollDepth < 75) {
          trackScrollDepth(75);
        } else if (scrollDepth >= 90 && maxScrollDepth < 90) {
          trackScrollDepth(90);
        }
      }
    };

    // Track section views using Intersection Observer
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionName = entry.target.id || entry.target.className;
          trackSectionView(sectionName);
        }
      });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => {
      sectionObserver.observe(section);
    });

    // Add scroll listener
    window.addEventListener('scroll', trackScroll, { passive: true });

    // Track performance metrics
    const trackPerformance = () => {
      if ('performance' in window) {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
        
        trackEvent('page_load_time', 'performance', 'load_time', Math.round(loadTime));
      }
    };

    // Track performance after page load
    window.addEventListener('load', trackPerformance);

    return () => {
      window.removeEventListener('scroll', trackScroll);
      window.removeEventListener('load', trackPerformance);
      sectionObserver.disconnect();
    };
  }, []);

  return null; // This component doesn't render anything
};

export default Analytics;
