import { 
  MenuItem, 
  SearchPlaceholders, 
  JobCategory, 
  FooterItem, 
  RecommendedJobsResponse,
  InternshipsResponse,
  FreshersJobsResponse,
  RemoteJob 
} from '../types/landingPage';

export const TopMenus: MenuItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Login', path: '/login' },
  { label: 'Sign Up', path: '/signup' },
  { label: 'About Us', path: '/aboutUs' },
  { label: 'Blogs', path: '/blogs' }
];

//SearchBar
export const Searchplaceholders: SearchPlaceholders = {
  Firstplaceholder: "Skill / Designation / Companies",
  Secondplaceholder: "Experience",
  Thirdplaceholder: "Location"
}

// Job categories (simplified for TypeScript compatibility)
export const jobCategories: JobCategory[] = [
  {
    title: "Software Development",
    category: "IT",
    icon: "💻",
    count: "5,280",
    description: "Software engineering, web development, and programming roles"
  },
  {
    title: "Data Science",
    category: "IT",
    icon: "📊",
    count: "3,450",
    description: "Data analysis, machine learning, and AI roles"
  },
  {
    title: "Marketing",
    category: "Marketing",
    icon: "📢",
    count: "2,890",
    description: "Digital marketing, content creation, and brand management"
  },
  {
    title: "Finance",
    category: "Finance",
    icon: "🏦",
    count: "2,150",
    description: "Accounting, financial analysis, and banking roles"
  },
  {
    title: "Human Resources",
    category: "Other",
    icon: "👥",
    count: "1,780",
    description: "Recruitment, employee relations, and HR management"
  },
  {
    title: "Remote Work",
    category: "Other",
    icon: "🏠",
    count: "4,620",
    description: "Work from home and remote-first positions"
  }
];

export const Footerfunctions: FooterItem[] = [
  { name: "About Us", path: "/about" },
  { name: "Contact-Us", path: "/contact-us" },
  { name: "Privacy Policy", path: "/privacy-policy" },
  { name: "Terms of Service", path: "/terms-of-service" },
  { name: "Blogs", path: "/blogs" },
  { name: "FAQs", path: "/faqs" },
  { name: "Sitemap", path: "/sitemap" },
  { name: "Help Center", path: "/help" },
  { name: "Browse Jobs", path: "/jobs" },
  { name: "Post a Job", path: "/employer/post-job" },
  { name: "Companies", path: "/companies" },
  { name: "Career", path: "/career" }
];

// this data should have to remove after some time creating after the backend
export const recommendedJobs: RecommendedJobsResponse = {
  data: [
    {
      _id: "1",
      title: "Senior Frontend Developer",
      company: "TechNova Inc.",
      location: "Remote"
    },
    {
      _id: "2",
      title: "Machine Learning Engineer",
      company: "DataWorks",
      location: "Remote"
    },
    {
      _id: "3",
      title: "Cloud Infrastructure Engineer",
      company: "DeployNow",
      location: "Remote"
    },
    {
      _id: "4",
      title: "Product Designer",
      company: "DesignPro",
      location: "New York, NY"
    },
    {
      _id: "5",
      title: "Backend Developer",
      company: "CodeBase",
      location: "Austin, TX"
    }
  ]
};

export const internships: InternshipsResponse = {
  internships: [
    { id: "1", title: "Software Engineering Intern", company: "Google", location: "Bangalore, India" },
    { id: "2", title: "Data Science Intern", company: "Microsoft", location: "Hyderabad, India" },
    { id: "3", title: "Frontend Developer Intern", company: "Swiggy", location: "Remote" },
    { id: "4", title: "Backend Developer Intern", company: "Zoho", location: "Chennai, India" },
    { id: "5", title: "UI/UX Design Intern", company: "Razorpay", location: "Remote" }
  ]
};

export const freshersJobs: FreshersJobsResponse = {
  jobs: [
    { 
      id: "f1", 
      title: "Associate Software Engineer", 
      company: "Microsoft", 
      location: "Bangalore, India",
      experience: "0-1 years",
      education: "B.Tech in CSE/IT/ECE",
      type: "Full-time",
      salary: "₹12L - ₹18L/year"
    },
    { 
      id: "f2", 
      title: "Junior Frontend Developer", 
      company: "Swiggy", 
      location: "Remote",
      experience: "Fresher",
      education: "B.E/B.Tech in any stream",
      type: "Full-time",
      salary: "₹8L - ₹12L/year"
    },
    { 
      id: "f3", 
      title: "Data Analyst", 
      company: "Amazon", 
      location: "Hyderabad, India",
      experience: "0-2 years",
      education: "B.Tech/B.Sc in CS/IT/Statistics",
      type: "Full-time",
      salary: "₹10L - ₹15L/year"
    }
  ]
};

export const mockRemoteJobs: RemoteJob[] = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "RemoteTech Inc.",
    location: "Remote",
    type: "Full-time",
    experience: "5+ years",
    salary: "$90,000 - $120,000/year",
    skills: ["React", "TypeScript", "Node.js", "AWS"],
    posted: "2 days ago"
  },
  {
    id: 2,
    title: "UX/UI Designer",
    company: "DesignHub",
    location: "Remote (Global)",
    type: "Contract",
    experience: "3+ years",
    salary: "$70 - $100/hour",
    skills: ["Figma", "Sketch", "UI/UX", "Prototyping"],
    posted: "1 week ago"
  }
];
