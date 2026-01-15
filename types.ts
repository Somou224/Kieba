
export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  avatar: string;
  bio: string;
  socials: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    whatsapp?: string;
    website?: string;
  };
  tags: string[];
}

export interface Encounter {
  id: string;
  contact: UserProfile;
  date: string;
  location?: string;
  notes?: string;
  aiInsights?: {
    category: string;
    opportunity: string;
    followUpPrompt: string;
  };
}

export enum AppMode {
  LANDING = 'LANDING',
  AUTH = 'AUTH',
  APP = 'APP'
}

export enum AppTab {
  PROFILE = 'PROFILE',
  SHARE = 'SHARE',
  HISTORY = 'HISTORY',
  AI = 'AI'
}

export interface DiscoveredDevice {
  id: string;
  name: string;
  rssi: number; // Signal strength simulation
  profile?: UserProfile;
}
