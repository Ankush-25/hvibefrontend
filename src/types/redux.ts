// Profile slice types
export interface Education {
  id?: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
}

export interface Experience {
  id?: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  description?: string;
}

export interface RecruiterInfo {
  companies: string[];
}

export interface ProfileState {
  _id: string;
  username: string;
  FullName: string;
  email: string;
  ProfileImage: string;
  Role: string;
  bio: string;
  location: string;
  resume: string;
  profile: {
    education: Education[];
    experience: Experience[];
    skills: string[];
  };
  savedJobs: string[];
  Recruiter: RecruiterInfo;
  createdAt: string;
  loading: boolean;
  error: string | null;
}

// Search slice types
export interface SearchState {
  data: any;
}

// Root state type
export interface RootState {
  usrProfile: ProfileState;
  search: SearchState;
}
