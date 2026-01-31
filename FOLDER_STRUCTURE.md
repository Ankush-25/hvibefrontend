# HiringStore Frontend - Folder Structure Documentation

This document provides a comprehensive overview of the folder structure for the HiringStore frontend application, which has been fully converted to TypeScript.

## 📁 Root Directory Structure

```
hiringstore-frontend/
├── 📄 .env                    # Environment variables
├── 📄 .git/                   # Git version control
├── 📄 .gitignore              # Git ignore rules
├── 📄 README.md               # Project documentation
├── 📄 dist/                   # Build output directory
├── 📄 eslint.config.js        # ESLint configuration
├── 📄 index.css               # Global CSS styles
├── 📄 index.html              # Main HTML entry point
├── 📄 node_modules/           # npm dependencies
├── 📄 package.json            # Project dependencies and scripts
├── 📄 package-lock.json       # Lock file for dependencies
├── 📄 public/                 # Static assets
├── 📄 src/                    # Source code directory
├── 📄 tailwind.config.ts      # Tailwind CSS configuration
├── 📄 tsconfig.json           # TypeScript configuration
├── 📄 tsconfig.node.json      # TypeScript Node.js configuration
├── 📄 vercel.json             # Vercel deployment configuration
└── 📄 vite.config.ts          # Vite build tool configuration
```

## 📂 Source Directory (`src/`)

### **📁 Core Application Files**
```
src/
├── 📄 App.tsx                 # Main application component with routing
├── 📄 Error404.tsx            # 404 error page component
├── 📄 authContext.tsx         # Authentication context provider
├── 📄 globalConfig.ts         # Global configuration constants
├── 📄 main.tsx                # Application entry point
├── 📄 vite-env.d.ts           # Vite environment type definitions
```

### **📁 Feature Modules**

#### **📁 App/ - Application Dashboard**
```
App/
├── 📄 AppDashboard.tsx        # Main dashboard component
├── 📄 DashboardHeroSec/
│   └── 📄 HeroSecDashboard.tsx # Dashboard hero section
├── 📄 JobPost/
│   └── 📄 JobDataComp.tsx      # Job posting data component
└── 📄 RecomendedJob.tsx       # Recommended jobs component
```

#### **📁 Blogs/ - Blog Management**
```
Blogs/
└── 📄 Blogs.tsx               # Blog listing and display component
```

#### **📁 Career/ - Career Resources**
```
Career/
└── 📄 Career.tsx              # Career guidance and resources
```

#### **📁 EmployerDashboard/ - Employer Portal**
```
EmployerDashboard/
├── 📄 EmployerDashboard.tsx  # Main employer dashboard
├── 📁 components/
│   ├── 📄 CompanyProfile.tsx   # Company profile management
│   └── 📄 JobPostingForm.tsx    # Job posting form component
└── 📄 EmployerDashboard.module.css # Dashboard styles
```

#### **📁 landingpage/ - Landing Page Components**
```
landingpage/
├── 📄 LandingPageParent.tsx    # Main landing page wrapper
├── 📄 Var.ts                  # Landing page data and constants
├── 📁 LandingPageLowersec/
│   ├── 📄 FooterSec.tsx        # Footer section component
│   └── 📄 FooterSecStyles.tsx  # Footer styled components
└── 📁 LandingPageUppersec/
    ├── 📁 MidSection/
    │   ├── 📄 MidSectionParent.tsx
    │   └── 📁 compainesSliderSection/
    │       ├── 📄 CompaniesComp.tsx
    │       └── 📄 CompaniesSliderStyles.tsx
    └── 📁 UpperSection/
        ├── 📁 Navbar/
        │   ├── 📄 LandingPageNavBar.tsx
        │   └── 📄 navbarstyes.tsx
        ├── 📁 UpperSectionSearchFeature/
        │   ├── 📄 UpperSectionParent.tsx
        │   ├── 📄 UpperSectionSearch.tsx
        │   ├── 📄 UpperSectionSearchStyles.tsx
        │   ├── 📄 FreshersJobsCarousel.jsx
        │   ├── 📄 InternshipsCrousel.tsx
        │   ├── 📄 RemoteJobsCarousel.jsx
        │   ├── 📄 SearchResults.jsx
        │   └── 📄 SearchResults.css
        └── 📁 UpperSectionType/
            ├── 📄 upperSecTypeParent.tsx
            └── 📄 UpperSecTypeStyles.tsx
```

#### **📁 Profile/ - User Profile Management**
```
profile/
├── 📄 profile.tsx              # Main profile component
├── 📄 profile.css              # Profile styles
└── 📄 profilestyle.tsx         # Profile styled components
```

#### **📁 Authentication**
```
login/
├── 📄 Login.tsx                # Login component
└── 📄 login.css                # Login styles

signUp/
└── 📄 SignUP.tsx               # Sign up component
```

### **📁 Shared Components**
```
components/
├── 📄 CarouselComponent.tsx    # Reusable carousel component
├── 📄 CategoryCard.tsx          # Category card component
├── 📄 CategoryGrid.tsx          # Category grid layout
├── 📄 CollapsibleCategoryGrid.tsx # Collapsible category grid
├── 📄 JobCard.tsx              # Job card display component
├── 📄 ProtectedRoute.tsx       # Route protection component
└── 📄 layout.tsx               # Layout wrapper component
```

### **📁 Business Logic**
```
redux/
├── 📄 searchSlice.ts           # Search state management
├── 📄 profileSlice.ts          # Profile state management
└── 📄 store.ts                # Redux store configuration

services/
└── 📄 api.ts                  # API service functions
```

### **📁 Type Definitions**
```
types/
├── 📄 authForms.ts             # Authentication form types
├── 📄 components.ts            # Component prop types
├── 📄 employerDashboard.ts     # Employer dashboard types
├── 📄 landingPage.ts           # Landing page data types
├── 📄 profile.ts               # Profile section types
└── 📄 redux.ts                 # Redux state types
```

### **📁 Page Components**
```
pages/
├── 📁 JobApplicationPage/
│   └── 📄 JobApplicationPage.tsx # Job application form
└── 📄 aboutPage/
    └── 📄 AboutUs.tsx            # About us page
```

### **📁 Job Management**
```
jobs/
└── 📄 jobDetail.tsx            # Job detail page component
```

### **📁 Static Assets**
```
assets/
└── 📁 Global_Need_files/
    ├── 📄 ImagesPaths.js         # Image path constants
    └── 📄 [other asset files]
```

### **📁 Contact & Other Pages**
```
contact-Us/
└── 📄 ContactUs.tsx            # Contact us page
```

## 🎯 TypeScript Conversion Status

### ✅ **Fully Converted to TypeScript:**
- All React components (`.jsx` → `.tsx`)
- Redux slices and store configuration
- Type definitions for all major sections
- Authentication components
- Employer dashboard
- Profile management
- Landing page components
- Shared components

### 🔄 **Remaining JSX Files (if any):**
- Some carousel components in landing page (FreshersJobsCarousel.jsx, RemoteJobsCarousel.jsx)
- Legacy components that may need conversion

## 🔧 Configuration Files

### **TypeScript Configuration (`tsconfig.json`)**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "jsx": "react-jsx",
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

### **Vite Configuration (`vite.config.ts`)**
- Build tool configuration
- Plugin setup
- Development server settings

## 📦 Key Dependencies

### **Core Framework:**
- React 18+ with TypeScript
- Vite as build tool
- React Router for navigation

### **State Management:**
- Redux Toolkit for state management
- React Context for authentication

### **UI/Styling:**
- Tailwind CSS for utility styling
- Styled Components for component styles
- FontAwesome for icons

### **Development Tools:**
- ESLint for code linting
- TypeScript for type safety

## 🚀 Getting Started

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Start Development Server:**
   ```bash
   npm run dev
   ```

3. **Build for Production:**
   ```bash
   npm run build
   ```

## 📝 Development Guidelines

### **TypeScript Best Practices:**
- All components must have proper prop interfaces
- Use strict TypeScript settings
- Define types for all data structures
- Prefer explicit typing over implicit typing

### **Component Structure:**
- Keep components focused and single-purpose
- Use proper TypeScript interfaces for props
- Separate styled components from logic
- Follow consistent naming conventions

### **State Management:**
- Use Redux Toolkit for global state
- React Context for authentication
- Local state for component-specific data

## 🔍 File Naming Conventions

- **Components:** PascalCase (e.g., `UserProfile.tsx`)
- **Utilities:** camelCase (e.g., `apiService.ts`)
- **Types:** camelCase (e.g., `authForms.ts`)
- **Constants:** UPPER_SNAKE_CASE (e.g., `API_BASE_URL`)
- **Styles:** camelCase with descriptive names (e.g., `profilestyle.tsx`)

## 📊 Project Statistics

- **Total Files:** 84+ files in `src/` directory
- **TypeScript Coverage:** ~90% converted
- **Components:** 20+ React components
- **Type Definitions:** 6+ type definition files
- **Redux Slices:** 2 state management slices

---

*This documentation is maintained alongside the codebase. Please update it when making structural changes to the project.*
