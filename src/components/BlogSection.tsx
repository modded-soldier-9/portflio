'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, User, ArrowRight, BookOpen, ExternalLink } from 'lucide-react';
import { useState } from 'react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  category: string;
  featured: boolean;
  image?: string;
  slug: string;
}

interface BlogSectionProps {
  className?: string;
}

const BlogSection = ({ className = '' }: BlogSectionProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string>('all');

  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'The Smowl Proctoring Extension: A Deep Dive into Academic Surveillance Gone Wrong',
      excerpt: 'A critical security analysis revealing how the Smowl Proctoring Extension represents one of the most dangerous privacy violations, with universal keystroke logging, complete system reconnaissance, and data exfiltration capabilities that any website can exploit.',
      content: 'The Smowl Proctoring Extension represents one of the most dangerous privacy violations I\'ve ever analyzed. This isn\'t just exam monitoring, it\'s complete system surveillance that ANY website can exploit. The extension injects a comprehensive keylogger into every single website you visit, including all keystrokes, text selections, clipboard operations, keyboard shortcuts, and PrintScreen attempts. It also collects extensive system information, performs screen and desktop capture, monitors behavioral patterns, and sends all collected data to remote servers. The critical issue is that any website can communicate with the extension and have it perform these surveillance activities, making it a privacy nightmare that can invalidate exams and compromise user security.',
      author: 'Mohamed Elsheikh',
      date: '2024-09-25',
      readTime: '15 min read',
      tags: ['Cybersecurity', 'Privacy', 'Security Analysis', 'Browser Extensions', 'Surveillance'],
      category: 'Security',
      featured: true,
      slug: 'smowl-proctoring-extension-security-analysis',
      image: '/og-image.jpg'
    }
  ];

  const categories = ['all', 'Security'];
  const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags)));

  const filteredPosts = blogPosts.filter(post => {
    const categoryMatch = selectedCategory === 'all' || post.category === selectedCategory;
    const tagMatch = selectedTag === 'all' || post.tags.includes(selectedTag);
    return categoryMatch && tagMatch;
  });

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Security': 'from-red-500 to-pink-500',
      'Cloud': 'from-blue-500 to-cyan-500',
      'Programming': 'from-green-500 to-emerald-500',
      'Management': 'from-purple-500 to-indigo-500'
    };
    return colors[category] || 'from-gray-500 to-gray-600';
  };

  return (
    <section id="blog" className={`py-24 relative overflow-hidden ${className}`}>
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900"></div>
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-heading">Blog & Insights</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Sharing knowledge, insights, and best practices in cybersecurity, cloud computing, and technology leadership.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="flex flex-col lg:flex-row gap-4 justify-between items-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                    : 'bg-gray-800/50 text-gray-400 border border-gray-700/50 hover:bg-gray-700/50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category === 'all' ? 'All Categories' : category}
              </motion.button>
            ))}
          </div>

          {/* Tag Filter */}
          <div className="flex flex-wrap gap-2">
            <span className="text-gray-400 text-sm">Tags:</span>
            {allTags.slice(0, 5).map((tag) => (
              <motion.button
                key={tag}
                onClick={() => setSelectedTag(selectedTag === tag ? 'all' : tag)}
                className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${
                  selectedTag === tag
                    ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                    : 'bg-gray-800/50 text-gray-400 border border-gray-700/50 hover:bg-gray-700/50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tag}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
              <BookOpen className="w-6 h-6 mr-3 text-indigo-400" />
              Featured Articles
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  className="card group relative overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  {/* Featured Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className="px-3 py-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-semibold rounded-full">
                      Featured
                    </span>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className={`px-3 py-1 bg-gradient-to-r ${getCategoryColor(post.category)} text-white text-xs font-semibold rounded-full`}>
                      {post.category}
                    </span>
                  </div>

                  <div className="p-8">
                    <h4 className="text-2xl font-bold text-white mb-4 group-hover:text-indigo-400 transition-colors">
                      {post.title}
                    </h4>
                    <p className="text-gray-400 mb-6 leading-relaxed">
                      {post.excerpt}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center space-x-6 text-sm text-gray-500 mb-6">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(post.date)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Read More Button */}
                    <motion.a
                      href="https://www.linkedin.com/pulse/smowl-proctoring-extension-deep-dive-academic-gone-wrong-elsheikh-c6orf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-indigo-400 hover:text-indigo-300 transition-colors group"
                      whileHover={{ x: 5 }}
                    >
                      <span>Read Article on LinkedIn</span>
                      <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </motion.a>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </motion.article>
              ))}
            </div>
          </motion.div>
        )}

        {/* Regular Posts */}
        {regularPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-8">Latest Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  className="card group relative overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <div className="p-6">
                    {/* Category Badge */}
                    <div className="mb-4">
                      <span className={`px-3 py-1 bg-gradient-to-r ${getCategoryColor(post.category)} text-white text-xs font-semibold rounded-full`}>
                        {post.category}
                      </span>
                    </div>

                    <h4 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors">
                      {post.title}
                    </h4>
                    <p className="text-gray-400 mb-4 leading-relaxed text-sm">
                      {post.excerpt}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(post.date)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                      {post.tags.length > 3 && (
                        <span className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-md">
                          +{post.tags.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Read More Button */}
                    <motion.a
                      href="https://www.linkedin.com/pulse/smowl-proctoring-extension-deep-dive-academic-gone-wrong-elsheikh-c6orf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-indigo-400 hover:text-indigo-300 transition-colors group text-sm"
                      whileHover={{ x: 5 }}
                    >
                      <span>Read on LinkedIn</span>
                      <ExternalLink className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </motion.a>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </motion.article>
              ))}
            </div>
          </motion.div>
        )}

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">No Articles Found</h3>
            <p className="text-gray-400">Try adjusting your filters to see more articles.</p>
          </motion.div>
        )}

        {/* View All Button */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <BookOpen className="w-5 h-5" />
            <span>View All Articles</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;
