# Code Review - Personal Site Creative

## Executive Summary

This is a well-structured Next.js 15 personal portfolio site with good TypeScript usage, modern React patterns, and thoughtful component organization. The project uses Contentful as a CMS, Framer Motion for animations, and Tailwind CSS for styling. Overall code quality is solid, but there are several areas for improvement around error handling, accessibility, performance, and code consistency.

---

## 🎯 Strengths

1. **Modern Tech Stack**: Next.js 15, React 19, TypeScript, Tailwind CSS v4
2. **Type Safety**: Good use of Zod schemas for runtime validation
3. **Component Organization**: Clear separation of concerns with reusable components
4. **Styling Approach**: Consistent use of `tailwind-variants` for style management
5. **Accessibility Awareness**: ARIA labels, semantic HTML, keyboard navigation in many places
6. **Responsive Design**: Mobile-first approach with dedicated mobile/desktop navbars

---

## 🔴 Critical Issues

### 1. **Missing Error Handling for Contentful API Calls**

**Location**: `src/app/landing/page.tsx`, `src/app/artwork/page.tsx`, `src/app/career/page.tsx`

**Issue**: No error handling if Contentful API calls fail or if schema validation fails.

```typescript
// Current code - no error handling
const res = await client.getEntries({ content_type: "photo" });
const photos = res.items;
const parsedPhotos = PhotoEntriesSchema.safeParse(photos);
```

**Recommendation**:
```typescript
try {
  const res = await client.getEntries({ content_type: "photo" });
  const photos = res.items;
  const parsedPhotos = PhotoEntriesSchema.safeParse(photos);
  
  if (!parsedPhotos.success) {
    console.error("Schema validation failed:", parsedPhotos.error);
    // Handle gracefully - show empty state or fallback
  }
} catch (error) {
  console.error("Failed to fetch photos:", error);
  // Return error page or empty state
}
```

### 2. **Environment Variables Not Validated**

**Location**: `src/lib/contentfulClient.ts`

**Issue**: Environment variables are cast without validation, which could cause runtime errors.

```typescript
// Current - unsafe
space: process.env.CONTENTFUL_SPACE_ID as string,
accessToken: process.env.CONTENTFUL_ACCESS_KEY as string,
```

**Recommendation**:
```typescript
const spaceId = process.env.CONTENTFUL_SPACE_ID;
const accessToken = process.env.CONTENTFUL_ACCESS_KEY;

if (!spaceId || !accessToken) {
  throw new Error("Missing required Contentful environment variables");
}

export const client = createClient({
  space: spaceId,
  accessToken: accessToken,
  host: process.env.CONTENTFUL_HOST || "cdn.contentful.com",
});
```

### 3. **Missing Error Boundaries**

**Issue**: No React Error Boundaries to catch component errors gracefully.

**Recommendation**: Add error boundaries at the page level or create a global error boundary component.

---

## ⚠️ High Priority Issues

### 4. **Inconsistent Error Handling for Schema Validation**

**Location**: Multiple pages

**Issue**: Schema validation results are checked inconsistently:
- `landing/page.tsx`: Uses optional chaining `parsedPhotos?.data`
- `artwork/page.tsx`: Uses `parsedPhotos.data &&`
- `career/page.tsx`: Uses `parsedJobs?.data?.map`

**Recommendation**: Create a consistent pattern:
```typescript
if (!parsedPhotos.success) {
  // Log error and return empty state or error UI
  return <EmptyState />;
}
```

### 5. **Accessibility Issues in Modals**

**Location**: `PolaroidModal.tsx`, `ImageModal.tsx`

**Issues**:
- `ImageModal.tsx` doesn't prevent body scroll (unlike `PolaroidModal.tsx`)
- Missing ESC key handler to close modals
- Focus trap not implemented (users can tab outside modal)

**Recommendation**:
```typescript
// Add ESC key handler
useEffect(() => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  };
  document.addEventListener("keydown", handleEscape);
  return () => document.removeEventListener("keydown", handleEscape);
}, [onClose]);

// Add focus trap (consider using a library like focus-trap-react)
```

### 6. **Performance: Missing Image Optimization**

**Location**: Multiple components using Next.js Image

**Issues**:
- Some images use hardcoded sizes that could be optimized
- Missing `priority` prop for above-the-fold images
- No loading="lazy" for below-the-fold images

**Recommendation**:
- Add `priority` to hero/landing images
- Use proper `sizes` attribute based on viewport
- Consider using `loading="lazy"` for images below the fold

### 7. **useIsMobile Hook Performance**

**Location**: `src/app/hooks/useIsMobile.tsx`

**Issue**: Hook causes layout shift and re-renders on every resize. Initial state is `false` which could cause hydration mismatch.

**Recommendation**:
```typescript
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }

    // Set initial value immediately
    handleResize();
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Return false as fallback during SSR
  return isMobile ?? false;
}
```

Or better yet, use CSS media queries with Tailwind's responsive classes instead of JavaScript.

---

## 🟡 Medium Priority Issues

### 8. **Commented Out Code**

**Location**: Multiple files

**Issues**:
- `tailwind.config.ts` is entirely commented out
- `section.tsx` has commented code blocks
- `globals.css` has commented CSS

**Recommendation**: Remove commented code or move to a separate reference file. If Tailwind v4 doesn't need a config file, delete it.

### 9. **Inconsistent Naming Conventions**

**Issues**:
- Component files: `Navbar.tsx` vs `MobileNavBar.tsx` (inconsistent casing)
- Some components use default exports, others use named exports inconsistently
- `pagex.tsx` in about folder (typo?)

**Recommendation**: 
- Standardize: Use PascalCase consistently (`MobileNavbar.tsx`)
- ✅ **Found**: `pagex.tsx` exists in `about/` folder - appears to be an alternative/old version of the about page. Should be deleted if not needed.

### 10. **Type Safety: Optional Chaining on Required Fields**

**Location**: `ArtworkCarousel.tsx`, `section.tsx`

**Issue**: Using optional chaining on fields that should be required after schema validation:

```typescript
// This suggests description might not exist, but schema should guarantee it
description={
  modalItem.fields.description.content[0]?.content[0]?.value ||
  "No description"
}
```

**Recommendation**: Either make description required in schema or handle the fallback more explicitly.

### 11. **Magic Numbers and Hardcoded Values**

**Location**: Multiple files

**Issues**:
- `FeaturedJobs.tsx`: `scale: isMobile ? 4 : 5` - very large scale values
- `NavBarDecider.tsx`: `navHeight = isOpen ? 200 : 50` - magic numbers
- Rotation angles hardcoded in multiple places

**Recommendation**: Extract to constants:
```typescript
const NAV_HEIGHTS = {
  open: 200,
  closed: 50,
} as const;

const POLAROID_ROTATIONS = [-2, 1, -1.5, 2, -1, 1.5] as const;
```

### 12. **Missing Loading States**

**Issue**: No loading states shown while fetching data from Contentful.

**Recommendation**: Add loading.tsx files for each route or use Suspense boundaries.

### 13. **Duplicate Modal Components**

**Location**: `PolaroidModal.tsx` and `ImageModal.tsx`

**Issue**: Two similar modal components with overlapping functionality.

**Recommendation**: Consider consolidating into a single, more flexible modal component.

### 14. **CSS Variable Duplication**

**Location**: `globals.css`

**Issue**: `--primary` and `--secondary` are defined twice (lines 6-7 and 16-17).

**Recommendation**: Remove duplicate definitions.

---

## 🟢 Low Priority / Suggestions

### 15. **Next.js Image Configuration**

**Location**: `next.config.ts`

**Issue**: Using deprecated `domains` instead of `remotePatterns`.

**Recommendation**:
```typescript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'images.ctfassets.net',
    },
  ],
},
```

### 16. **Missing Metadata for Some Pages**

**Location**: `landing/page.tsx`

**Issue**: Empty metadata object.

**Recommendation**: Add proper metadata for SEO.

### 17. **Array Index as Key**

**Location**: `career/page.tsx`, `FeaturedJobs.tsx`

**Issue**: Using array index as React key in some places.

```typescript
// Better to use unique ID
key={job.sys.id}
```

### 18. **Unused Dependencies**

**Location**: `package.json`

**Issues**:
- ✅ **Confirmed**: `styled-components` is installed but not used anywhere (project uses Tailwind)
- ✅ **Confirmed**: `motion` package is installed but not imported anywhere (only `framer-motion` is used)

**Recommendation**: Remove these unused dependencies:
```bash
npm uninstall styled-components motion
```

### 19. **Missing Prettier Configuration**

**Issue**: Prettier is installed but no config file present.

**Recommendation**: Add `.prettierrc` or configure in `package.json`.

### 20. **Experimental Page Contains Test Code**

**Location**: `experimental/page.tsx`

**Issue**: Contains todo list and test code that shouldn't be in production.

**Recommendation**: Either clean up or remove this route in production builds.

### 21. **Missing Tests**

**Issue**: No test files found in the project.

**Recommendation**: Add unit tests for utilities and integration tests for critical user flows.

### 22. **README is Minimal**

**Location**: `README.md`

**Issue**: Only contains basic getting started instructions.

**Recommendation**: Add:
- Project description
- Environment variable setup
- Deployment instructions
- Tech stack overview

---

## 📋 Code Quality Observations

### Positive Patterns

1. ✅ Good use of TypeScript with strict mode enabled
2. ✅ Consistent use of `tailwind-variants` for styling
3. ✅ Proper use of Next.js App Router patterns
4. ✅ Server components where appropriate
5. ✅ Client components properly marked with `"use client"`
6. ✅ Semantic HTML elements (`<article>`, `<time>`, etc.)
7. ✅ ARIA labels on interactive elements

### Areas for Improvement

1. ⚠️ Error handling needs to be more comprehensive
2. ⚠️ Some accessibility features incomplete (focus traps, ESC handlers)
3. ⚠️ Performance optimizations missing (loading states, image priorities)
4. ⚠️ Code consistency (naming, error handling patterns)

---

## 🎯 Priority Action Items

### Immediate (Before Production)
1. Add error handling for all Contentful API calls
2. Validate environment variables
3. Fix accessibility issues in modals (ESC key, focus trap)
4. Remove or fix duplicate CSS variables
5. Clean up commented code
6. Add loading states

### Short Term
1. Consolidate modal components
2. Extract magic numbers to constants
3. Fix `useIsMobile` hook to prevent hydration issues
4. Update Next.js image config to use `remotePatterns`
5. Add error boundaries
6. Remove unused dependencies

### Long Term
1. Add comprehensive test coverage
2. Improve README documentation
3. Set up CI/CD pipeline
4. Add performance monitoring
5. Consider adding analytics

---

## 📊 Overall Assessment

**Score: 7.5/10**

**Strengths**: Modern stack, good TypeScript usage, clean component structure, accessibility awareness.

**Weaknesses**: Error handling, some accessibility gaps, performance optimizations, code consistency.

The codebase shows good understanding of modern React/Next.js patterns and is well-structured. The main areas for improvement are around production readiness: error handling, accessibility completeness, and performance optimizations.

