
import { UserProfile, Encounter } from './types';

export const initialProfile: UserProfile = {
  id: 'me',
  firstName: 'Marc',
  lastName: 'Duchamp',
  title: 'Senior Product Manager',
  company: 'InnovateX',
  email: 'marc.d@innovatex.com',
  phone: '+33 7 88 99 00 11',
  avatar: 'https://picsum.photos/seed/marc/200',
  bio: 'Passionné par l\'innovation UX et les technologies mobiles.',
  socials: {
    linkedin: 'marc-duchamp',
    twitter: '@mduchamp'
  },
  tags: ['Product', 'UX Design', 'SaaS', 'Web3']
};

export const mockEncounters: Encounter[] = [
  {
    id: 'e1',
    contact: {
      id: 'c1',
      firstName: 'Sophie',
      lastName: 'Girard',
      title: 'CTO',
      company: 'DataFlow',
      email: 'sophie@dataflow.tech',
      phone: '+33 6 44 55 66 77',
      avatar: '',
      bio: 'Expertise en architectures cloud scalables.',
      socials: { linkedin: 'sophiegirard' },
      tags: ['Cloud', 'DevOps', 'Scaling']
    },
    date: '2024-05-12T14:30:00Z',
    location: 'VivaTech, Paris'
  },
  {
    id: 'e2',
    contact: {
      id: 'c2',
      firstName: 'Thomas',
      lastName: 'Leroy',
      title: 'Venture Capitalist',
      company: 'Bright Ventures',
      email: 'thomas.l@bright.vc',
      phone: '+33 1 22 33 44 55',
      avatar: '',
      bio: 'Investisseur passionné par le futur du travail.',
      socials: { linkedin: 'thomasleroy' },
      tags: ['VC', 'Startups', 'Fintech']
    },
    date: '2024-05-11T10:15:00Z',
    location: 'BPI Inno Generation'
  }
];
