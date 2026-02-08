# Change History

## 2026-02-01 - Frontend Folder Structure Refactoring

### Summary

Refactored frontend folder structure for better organization, consistency, and maintainability.

---

### New Directories Created

| Directory                    | Purpose                     |
| ---------------------------- | --------------------------- |
| `src/config/`                | App configuration files     |
| `src/context/`               | React context providers     |
| `src/data/`                  | Static data and constants   |
| `src/hooks/`                 | Custom React hooks          |
| `src/pages/auth/`            | Auth-related pages          |
| `src/pages/dashboard/`       | Dashboard pages             |
| `src/pages/jobs/`            | Job-related pages           |
| `src/components/ui/`         | Basic UI components         |
| `src/components/layout/`     | Layout components           |
| `src/components/shared/`     | Complex shared components   |
| `src/features/*/components/` | Feature-specific components |

---

### Files Migrated

| From                       | To                             |
| -------------------------- | ------------------------------ |
| `authContext.tsx`          | `context/AuthContext.tsx`      |
| `globalConfig.ts`          | `config/globalConfig.ts`       |
| `Error404.tsx`             | `pages/Error404Page.tsx`       |
| `login/Login.tsx`          | `pages/auth/LoginPage.tsx`     |
| `signUp/SignUP.tsx`        | `pages/auth/SignUpPage.tsx` ⚡ |
| `aboutPage/AboutUs.tsx`    | `pages/AboutPage.tsx`          |
| `Blogs/Blogs.tsx`          | `pages/BlogsPage.tsx`          |
| `Career/Career.tsx`        | `pages/CareerPage.tsx`         |
| `contact-Us/ContactUs.tsx` | `pages/ContactPage.tsx`        |
| `jobs/jobDetail.tsx`       | `pages/jobs/JobDetailPage.tsx` |

> ⚡ SignUpPage converted from legacy CSS to Tailwind

---

### Documentation Added

- `NAMING_CONVENTIONS.md` - Naming standards and consistency checklist

---

### App.tsx Updates

- Updated imports to use new page locations
- Routes now use consistent `*Page` component naming

---

### Build Status

---

_Last updated: 2026-02-01_

---

## 2026-02-01 - Phase 2: Complete File Migration

### Components Migrated to `components/ui/`

| File                    | Lines | Purpose                            |
| ----------------------- | ----- | ---------------------------------- |
| `CarouselComponent.tsx` | 163   | Reusable carousel with react-slick |
| `JobCard.tsx`           | 191   | Job listing card display           |
| `CategoryCard.tsx`      | 95    | Category card with gradient        |

### Components Migrated to `components/shared/`

| File                          | Lines | Purpose                               |
| ----------------------------- | ----- | ------------------------------------- |
| `CategoryGrid.tsx`            | 73    | Grid layout for categories            |
| `CollapsibleCategoryGrid.tsx` | 138   | Expandable category grid              |
| `ProtectedRoute.tsx`          | 40    | Auth guard + Tailwind loading spinner |

### Other Files Migrated

| From                    | To                             |
| ----------------------- | ------------------------------ |
| `components/layout.tsx` | `components/layout/Layout.tsx` |
| `landingpage/Var.ts`    | `data/constants.ts`            |

### Updated Imports

- `main.tsx`: AuthProvider from `context/AuthContext`
- `App.tsx`: ProtectedRoute from `components/shared/`, Layout from `components/layout/`

### Build Status

✅ Build verified - all migrations successful
