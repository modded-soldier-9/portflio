import { Users, Mic, Lightbulb, CreditCard, GraduationCap, Trophy, Cog, MessageCircle } from 'lucide-react';
import type { MentorshipAchievement, MentorshipSkill } from '@/types';

export const mentorshipAchievements: MentorshipAchievement[] = [
  {
    icon: Trophy,
    title: 'Competition Success',
    description:
      'Guided three student teams to achieve top positions in the AFRITECH innovation competition, demonstrating excellence in project development and execution.',
  },
  {
    icon: Cog,
    title: 'Technical Guidance',
    description:
      'Provided expert technical direction on developing cashless campus payment solutions, helping students translate innovative ideas into functional prototypes.',
  },
  {
    icon: MessageCircle,
    title: 'Inspirational Speaking',
    description:
      'Delivered engaging motivational talks that inspired the next generation of technology leaders, encouraging innovation and persistence in problem-solving.',
  },
];

export const mentorshipSkills: MentorshipSkill[] = [
  { icon: Users, label: 'Mentorship' },
  { icon: Mic, label: 'Public Speaking' },
  { icon: Lightbulb, label: 'Innovation' },
  { icon: CreditCard, label: 'Fintech' },
  { icon: GraduationCap, label: 'Education' },
];
