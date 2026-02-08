# Frontend Naming Conventions & Consistency Checklist

## 📁 Folder Naming Conventions

| Type                  | Convention  | Examples                            |
| --------------------- | ----------- | ----------------------------------- |
| **Feature folders**   | `camelCase` | `auth/`, `jobs/`, `profile/`        |
| **Component folders** | `camelCase` | `components/`, `context/`, `hooks/` |
| **Page folders**      | `camelCase` | `pages/auth/`, `pages/dashboard/`   |

---

## 📄 File Naming Conventions

| Type                  | Convention                      | Examples                            |
| --------------------- | ------------------------------- | ----------------------------------- |
| **React Components**  | `PascalCase.tsx`                | `LoginPage.tsx`, `JobCard.tsx`      |
| **Page Components**   | `PascalCase` + `Page` suffix    | `HomePage.tsx`, `ProfilePage.tsx`   |
| **Hooks**             | `camelCase` + `use` prefix      | `useAuth.ts`, `useProfile.ts`       |
| **Context**           | `PascalCase` + `Context` suffix | `AuthContext.tsx`                   |
| **Services**          | `camelCase` + `Service` suffix  | `authService.ts`, `apiService.ts`   |
| **Types/Interfaces**  | `camelCase.ts`                  | `auth.ts`, `components.ts`          |
| **Utilities**         | `camelCase.ts`                  | `utils.ts`, `helpers.ts`            |
| **Constants/Data**    | `camelCase.ts`                  | `constants.ts`, `config.ts`         |
| **Redux Slices**      | `camelCase` + `Slice` suffix    | `profileSlice.ts`, `searchSlice.ts` |
| **CSS Modules**       | `ComponentName.module.css`      | `Dashboard.module.css`              |
| **Styled Components** | `PascalCase` + `Styles.tsx`     | `FooterStyles.tsx`                  |

---

## 🔤 Code Naming Conventions

### Variables & Functions

| Type      | Convention             | Examples                                   |
| --------- | ---------------------- | ------------------------------------------ |
| Variables | `camelCase`            | `userName`, `isLoading`, `jobList`         |
| Functions | `camelCase`            | `handleClick`, `fetchData`, `validateForm` |
| Constants | `SCREAMING_SNAKE_CASE` | `API_URL`, `MAX_RETRIES`, `TOKEN_KEY`      |
| Boolean   | `is/has/should` prefix | `isActive`, `hasError`, `shouldRefresh`    |

### Components & Types

| Type             | Convention             | Examples                             |
| ---------------- | ---------------------- | ------------------------------------ |
| React Components | `PascalCase`           | `JobCard`, `LoginForm`, `NavBar`     |
| Interfaces/Types | `PascalCase`           | `User`, `JobData`, `AuthContextType` |
| Props Interfaces | `PascalCase` + `Props` | `JobCardProps`, `ButtonProps`        |
| Enums            | `PascalCase`           | `UserType`, `JobStatus`              |
| Enum Values      | `SCREAMING_SNAKE_CASE` | `JOB_SEEKER`, `FULL_TIME`            |

---

## ✅ Consistency Checklist

### Folders

- [ ] All feature folders use `camelCase`
- [ ] No `kebab-case` folders (fix: `contact-Us/` → `contactUs/`)
- [ ] No mixed casing (fix: `EmployerDashboard/` → `employerDashboard/`)
- [ ] All page subfolders in `pages/` use `camelCase`

### Files

- [ ] All React components use `PascalCase.tsx`
- [ ] All pages have `Page` suffix (e.g., `HomePage.tsx`)
- [ ] All hooks have `use` prefix (e.g., `useAuth.ts`)
- [ ] All services have `Service` suffix (e.g., `authService.ts`)
- [ ] All slices have `Slice` suffix (e.g., `profileSlice.ts`)

### Code

- [ ] No abbreviations in variable names (prefer `message` over `msg`)
- [ ] Boolean variables use `is/has/should` prefix
- [ ] Event handlers use `handle` prefix (e.g., `handleClick`)
- [ ] Async functions use descriptive names (e.g., `fetchUserData`)
- [ ] Props interfaces named as `ComponentNameProps`

### Imports

- [ ] Absolute imports use `@/` alias (configured in tsconfig)
- [ ] Group imports: React → Third-party → Local
- [ ] No circular dependencies

---

## 🗂️ Recommended Structure

```
src/
├── assets/              # Static files (images, fonts)
├── components/          # Reusable components
│   ├── ui/              # Basic UI (Button, Input, Card)
│   ├── layout/          # Layout (Navbar, Footer, Sidebar)
│   └── shared/          # Complex shared components
├── config/              # App configuration
├── context/             # React contexts
├── data/                # Static data, constants
├── features/            # Feature modules
│   └── [feature]/
│       └── components/  # Feature-specific components
├── hooks/               # Custom React hooks
├── lib/                 # Utility libraries
├── pages/               # Route-level page components
│   ├── auth/            # Auth pages
│   ├── dashboard/       # Dashboard pages
│   └── jobs/            # Job-related pages
├── redux/               # State management
│   └── slices/          # Redux slices
├── services/            # API services
└── types/               # TypeScript type definitions
```

---

## 🔄 Migration Fixes Applied

| Before               | After                       | Reason                       |
| -------------------- | --------------------------- | ---------------------------- |
| `contact-Us/`        | `pages/ContactPage.tsx`     | kebab-case → PascalCase file |
| `EmployerDashboard/` | `pages/dashboard/`          | folder in pages directory    |
| `landingpage/`       | `pages/HomePage.tsx`        | page component naming        |
| `signUp/SignUP.tsx`  | `pages/auth/SignUpPage.tsx` | consistent PascalCase        |
| `authContext.tsx`    | `context/AuthContext.tsx`   | PascalCase for context       |
| `globalConfig.ts`    | `config/globalConfig.ts`    | proper folder organization   |

---

_Last updated: 2026-02-01_
