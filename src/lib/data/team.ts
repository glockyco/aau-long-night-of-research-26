import { z } from 'zod';

export const teamMemberSchema = z.object({
  name: z.string(),
  role: z.object({
    de: z.string(),
    en: z.string()
  }),
  url: z.string().url()
});

export const teamSchema = z.array(teamMemberSchema);

export type TeamMember = z.infer<typeof teamMemberSchema>;

export const team: TeamMember[] = [
  {
    name: 'Clemens Bauer',
    role: { de: 'Kollege', en: 'colleague' },
    url: 'https://clemi2806.github.io/'
  },
  {
    name: 'Johann Glock',
    role: { de: 'ich', en: 'myself' },
    url: 'https://glockyco.com/'
  },
  {
    name: 'Martin Pinzger',
    role: { de: 'Betreuer', en: 'Supervisor' },
    url: 'https://pinzger.github.io/'
  }
];
