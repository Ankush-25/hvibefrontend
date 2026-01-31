// Profile Section Types

export interface UserProfile {
  _id?: string;
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
  bio?: string;
  profileImage?: string;
  resume?: string;
  experience?: Experience[];
  education?: Education[];
  skills?: string[];
  socialLinks?: SocialLink[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Experience {
  _id?: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  description?: string;
}

export interface Education {
  _id?: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  description?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
}

// Form State Types
export interface ProfileFormState {
  name: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
}

export interface ExperienceFormState {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface EducationFormState {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

// UI State Types
export interface ProfileUIState {
  loading: boolean;
  addData: 'experience' | 'education' | null;
  editExpData: number | null;
  editEduData: number | null;
  isOpenPosition: {
    Header: boolean;
  };
  showAddSkill: boolean;
  editingSkill: number | null;
  editSkillValue: string;
  newSkill: string;
  localSkills: string[];
  isEditingResume: boolean;
  resumeLink: string;
}

// Redux State Types
export interface ProfileState {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
}

// API Response Types
export interface ProfileResponse {
  success: boolean;
  data?: UserProfile;
  message?: string;
  error?: string;
}

// Component Props Types
export interface ProfileProps {
  // Add any props if needed in the future
}

export interface ProfileImageProps {
  src?: string;
  alt?: string;
}

// Form Event Handler Types
export type FormEventHandler = (e: React.FormEvent) => void;
export type ChangeEventHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
