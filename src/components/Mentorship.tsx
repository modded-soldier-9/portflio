'use client';

import { motion } from 'framer-motion';
import { mentorshipAchievements, mentorshipSkills } from '@/data/mentorship';

const Mentorship = () => {
  return (
    <section id="mentorship" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="eyebrow justify-center">Community</span>
          <h2 className="section-heading mt-4">Mentorship &amp; Speaking</h2>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {/* Main mentorship card */}
          <motion.div
            className="mentorship-card"
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-primary mb-3">
                AFRITECH Mentorship Impact
              </h3>

              <p className="text-muted-strong leading-relaxed mb-5">
                As a mentor at the AFRITECH event, I guided students in building innovative
                solutions for a cashless campus. Through dedicated mentorship and technical
                guidance, three teams under my supervision secured positions in the top 3.
              </p>

              <h4 className="text-sm font-semibold text-foreground mb-3">Key Achievements:</h4>

              <ul className="space-y-2 mb-6">
                {[
                  'Led 3 teams to top positions in the competition',
                  'Provided technical guidance on cashless payment solutions',
                  'Delivered motivational talks inspiring future tech leaders',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-muted-strong">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {mentorshipSkills.map((skill, i) => {
                  const Icon = skill.icon;
                  return (
                    <motion.span
                      key={skill.label}
                      className="skill-tag"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: i * 0.06 }}
                      viewport={{ once: true }}
                    >
                      <Icon className="w-4 h-4" aria-hidden="true" />
                      {skill.label}
                    </motion.span>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Achievement cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {mentorshipAchievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <motion.div
                  key={achievement.title}
                  className="card text-center"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.12 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -4 }}
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 grid place-items-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-primary" aria-hidden="true" />
                  </div>
                  <h4 className="text-base font-semibold text-foreground mb-2">
                    {achievement.title}
                  </h4>
                  <p className="text-sm text-muted leading-relaxed">{achievement.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mentorship;
