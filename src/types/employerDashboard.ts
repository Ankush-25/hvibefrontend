import { ReactNode } from 'react';

// Employer Dashboard Types
export interface EmployerDashboardProps {
  // Add any props if needed in the future
}

export interface TabConfig {
  id: string;
  label: string;
  icon: ReactNode;
  component: ReactNode;
}

export interface UserCompany {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  website?: string;
  address?: string;
  description?: string;
  industry?: string;
  companySize?: string;
  foundedYear?: string;
}

// Company Profile Types
export interface CompanyProfileProps {
  // Add any props if needed in the future
}

export interface CompanyFormData {
  companyName: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  description: string;
  industry: string;
  companySize: string;
  foundedYear: string;
}

export interface CompanyProfileState {
  isEditing: boolean;
  isLoading: boolean;
  formData: CompanyFormData;
}

// Job Posting Form Types
export interface JobPostingFormProps {
  userCompany?: UserCompany[];
}

export interface JobFormData {
  title: string;
  company: string;
  location: string;
  jobType: string;
  salary: string;
  description: string;
  category: string;
  experienceLevel: number;
  skillsRequired: string;
}

export interface JobPostingState {
  isSubmitting: boolean;
  error: string;
}

export interface JobData {
  title: string;
  company: string;
  location: string;
  jobType: string;
  salary?: number;
  description: string;
  category: string;
  experienceLevel: number;
  skillsRequired: string[];
  postedBy: string;
  postedDate?: string;
  deadline?: string;
  status?: string;
}

// Dashboard Statistics Types
export interface DashboardStats {
  totalJobs: number;
  activeApplications: number;
  totalViews: number;
  recentApplications: number;
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  experience: string;
  skills: string[];
  resume: string;
  coverLetter: string;
  appliedDate: string;
  status: 'pending' | 'reviewing' | 'accepted' | 'rejected';
}

// Form Validation Types
export interface FormErrors {
  title?: string;
  company?: string;
  location?: string;
  description?: string;
  skillsRequired?: string;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Navigation Types
export type DashboardTab = 'post-job' | 'my-jobs' | 'applications' | 'company-profile' | 'analytics' | 'RecruiterProfile';

// Common Employer Types
export interface RecruiterProfile {
  userId: string;
  companyName: string;
  name: string;
  email: string;
  phone?: string;
  website?: string;
  address?: string;
  description?: string;
  industry?: string;
  companySize?: string;
  foundedYear?: string;
  userType: 'employer';
}
