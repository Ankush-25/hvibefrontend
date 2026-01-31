import { ReactNode } from 'react';

// Navigation and menu types
export interface MenuItem {
  label: string;
  path: string;
}

export interface FooterItem {
  name: string;
  path: string;
}

// Search bar types
export interface SearchPlaceholders {
  Firstplaceholder: string;
  Secondplaceholder: string;
  Thirdplaceholder: string;
}

// Job categories types
export interface JobCategory {
  title: string;
  category: string;
  icon: ReactNode;
  count: string;
  description: string;
}

// Job listing types
export interface JobListing {
  _id: string;
  title: string;
  company: string;
  location: string;
  type?: string;
  experience?: string;
  education?: string;
  salary?: string;
  skills?: string[];
  posted?: string;
}

export interface RecommendedJobsResponse {
  data: JobListing[];
}

// Internship types
export interface Internship {
  id: string;
  title: string;
  company: string;
  location: string;
}

export interface InternshipsResponse {
  internships: Internship[];
}

// Fresher job types
export interface FresherJob {
  id: string;
  title: string;
  company: string;
  location: string;
  experience: string;
  education: string;
  type: string;
  salary: string;
}

export interface FreshersJobsResponse {
  jobs: FresherJob[];
}

// Remote job types
export interface RemoteJob {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  experience: string;
  salary: string;
  skills: string[];
  posted: string;
}

// Component props types
export interface LandingPageParentProps {
  // Add any props if needed in the future
}

export interface UpperSectionParentProps {
  // Add any props if needed in the future
}

export interface MidSectionParentProps {
  // Add any props if needed in the future
}

export interface NavbarProps {
  // Add any props if needed in the future
}

export interface FooterProps {
  // Add any props if needed in the future
}

// Carousel component props
export interface CarouselProps {
  items: any[];
  title?: string;
  autoPlay?: boolean;
  showDots?: boolean;
  showArrows?: boolean;
}
