'use client';

import { motion } from 'framer-motion';
import { Users, Mic, Lightbulb, CreditCard, GraduationCap, Trophy, Cog, MessageCircle } from 'lucide-react';

const Mentorship = () => {
  const achievements = [
    {
      icon: Trophy,
      title: 'Competition Success',
      description: 'Guided three student teams to achieve top positions in the AFRITECH innovation competition, demonstrating excellence in project development and execution.',
    },
    {
      icon: Cog,
      title: 'Technical Guidance',
      description: 'Provided expert technical direction on developing cashless campus payment solutions, helping students translate innovative ideas into functional prototypes.',
    },
    {
      icon: MessageCircle,
      title: 'Inspirational Speaking',
      description: 'Delivered engaging motivational talks that inspired the next generation of technology leaders, encouraging innovation and persistence in problem-solving.',
    },
  ];

  const mentorshipSkills = [
    { icon: Users, label: 'Mentorship' },
    { icon: Mic, label: 'Public Speaking' },
    { icon: Lightbulb, label: 'Innovation' },
    { icon: CreditCard, label: 'Fintech' },
    { icon: GraduationCap, label: 'Education' },
  ];

  return (
    <section id="mentorship" className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.h2
          className="section-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Mentorship & Speaking
        </motion.h2>

        <div className="max-w-6xl mx-auto">
          {/* Main Mentorship Card */}
          <motion.div
            className="mentorship-card"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative z-10">
              <h3 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
                AFRITECH Mentorship Impact
              </h3>
              
              <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                As a mentor at the AFRITECH event, I had the privilege of guiding students in building innovative solutions for a cashless campus. Through dedicated mentorship and technical guidance, three teams under my supervision achieved remarkable success by securing positions in the top 3.
              </p>
              
              <h4 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">
                Key Achievements:
              </h4>
              
              <ul className="space-y-2 mb-6 text-gray-700 dark:text-gray-300">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Led 3 teams to top positions in the competition</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Provided technical guidance on cashless payment solutions</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Delivered motivational talks inspiring future tech leaders</span>
                </li>
              </ul>
              
              <div className="flex flex-wrap gap-2">
                {mentorshipSkills.map((skill, index) => (
                  <motion.span
                    key={skill.label}
                    className="skill-tag flex items-center space-x-2"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <skill.icon className="w-4 h-4" />
                    <span>{skill.label}</span>
                  </motion.span>
                ))}
              </div>
            </div>
            <div className="mentorship-card-overlay"></div>
          </motion.div>

          {/* Achievement Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                className="card text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="mb-4">
                  <div className="inline-block p-3 rounded-full mb-3 bg-blue-100 dark:bg-blue-900">
                    <achievement.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {achievement.title}
                  </h4>
                </div>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {achievement.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mentorship;
