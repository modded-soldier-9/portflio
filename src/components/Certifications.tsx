'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Calendar } from 'lucide-react';

const Certifications = () => {
  const certificationGroups = [
    {
      title: 'AWS Academy Certifications',
      icon: '☁️',
      color: 'text-orange-600',
      certifications: [
        {
          name: 'AWS Academy Graduate - AWS Academy Cloud Architecting',
          issuer: 'Amazon Web Services (AWS)',
          issued: 'Apr 2024',
          skills: '',
          link: 'https://www.credly.com/badges/b355c7a0-5150-42a1-9660-25c6adb6c434/linked_in_profile',
        },
        {
          name: 'AWS Academy Graduate - AWS Academy Cloud Foundations',
          issuer: 'Amazon Web Services (AWS)',
          issued: 'Mar 2024',
          skills: 'Cloud Computing, Amazon Web Services (AWS)',
          link: 'https://www.credly.com/badges/1fcdf7e7-e223-40d4-8a19-02f3adabb05b/linked_in_profile',
        },
      ],
    },
    {
      title: 'Microsoft Certifications',
      icon: '🔷',
      color: 'text-blue-600',
      certifications: [
        {
          name: 'Microsoft Cybersecurity Analyst',
          issuer: 'Microsoft',
          issued: 'Mar 2025 | Expires: Mar 2035',
          skills: 'Credential ID: 7Z1WLTXOC8PF',
          link: 'https://www.coursera.org/account/accomplishments/professional-cert/certificate/7Z1WLTXOC8PF',
        },
      ],
    },
    {
      title: 'Google Cybersecurity Certifications',
      icon: '🔍',
      color: 'text-green-600',
      certifications: [
        {
          name: 'Google Cybersecurity',
          issuer: 'Google',
          issued: 'Mar 2025 | Expires: Dec 2035',
          skills: 'Cyber Security Risk',
          link: 'https://coursera.org/share/196a8bbc031285f1730cea31ce230b14',
        },
        {
          name: 'Assets, Threats, and Vulnerabilities',
          issuer: 'Google',
          issued: 'Mar 2025',
          skills: '',
          link: 'https://www.coursera.org/account/accomplishments/records/22WLAYVUOLU3',
        },
        {
          name: 'Automate Cybersecurity Tasks with Python',
          issuer: 'Google',
          issued: 'Mar 2025',
          skills: '',
          link: 'https://www.coursera.org/account/accomplishments/records/LWXA5E5BRTOL',
        },
        {
          name: 'Connect and Protect: Networks and Network Security',
          issuer: 'Google',
          issued: 'Mar 2025',
          skills: '',
          link: 'https://www.coursera.org/account/accomplishments/records/connect-and-protect-networks-and-network-security',
        },
        {
          name: 'Foundations of Cybersecurity',
          issuer: 'Google',
          issued: 'Mar 2025',
          skills: '',
          link: 'https://www.coursera.org/account/accomplishments/records/foundations-of-cybersecurity',
        },
        {
          name: 'Play It Safe: Manage Security Risks',
          issuer: 'Google',
          issued: 'Mar 2025',
          skills: '',
          link: 'https://www.coursera.org/account/accomplishments/records/play-it-safe-manage-security-risks',
        },
        {
          name: 'Put It to Work: Prepare for Cybersecurity Jobs',
          issuer: 'Google',
          issued: 'Mar 2025',
          skills: '',
          link: 'https://www.coursera.org/account/accomplishments/records/put-it-to-work-prepare-for-cybersecurity-jobs',
        },
        {
          name: 'Sound the Alarm: Detection and Response',
          issuer: 'Google',
          issued: 'Mar 2025',
          skills: '',
          link: 'https://www.coursera.org/account/accomplishments/records/sound-the-alarm-detection-and-response',
        },
        {
          name: 'Tools of the Trade: Linux and SQL',
          issuer: 'Google',
          issued: 'Mar 2025',
          skills: '',
          link: 'https://www.coursera.org/account/accomplishments/records/tools-of-the-trade-linux-and-sql',
        },
      ],
    },
    {
      title: 'Web Development Certifications',
      icon: '💻',
      color: 'text-purple-600',
      certifications: [
        {
          name: 'Responsive Web Design',
          issuer: 'freeCodeCamp',
          issued: 'Feb 2024',
          skills: '',
          link: 'https://www.freecodecamp.org/certification/mohamed-elsheikh/responsive-web-design',
        },
      ],
    },
  ];

  return (
    <section id="certifications" className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900"></div>
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-heading">Professional Certifications</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Industry-recognized certifications validating expertise in cybersecurity, cloud computing, and web development.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {certificationGroups.map((group, groupIndex) => (
              <motion.div
                key={groupIndex}
                className="card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: groupIndex * 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-3">
                  <span className="text-2xl">{group.icon}</span>
                  <span className="gradient-text">{group.title}</span>
                </h3>

                <div className="space-y-4">
                  {group.certifications.map((cert, certIndex) => (
                    <motion.div
                      key={certIndex}
                      className="cert-card"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: certIndex * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <h4 className="font-semibold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                        {cert.name}
                      </h4>
                      
                      <div className="space-y-1 text-sm text-gray-400">
                        <p className="text-indigo-400 font-medium">{cert.issuer}</p>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{cert.issued}</span>
                        </div>
                        {cert.skills && (
                          <p className="text-xs text-gray-500">
                            {cert.skills}
                          </p>
                        )}
                      </div>
                      
                      <motion.a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center mt-3 text-indigo-400 hover:text-indigo-300 transition-colors text-sm font-medium group"
                        whileHover={{ x: 5 }}
                      >
                        <ExternalLink className="w-3 h-3 mr-1 group-hover:translate-x-1 transition-transform" />
                        Verify Credential
                      </motion.a>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
