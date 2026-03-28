# Task Manager Pro - Completion Plan
Status: In Progress

## Approved Plan Steps:

### 1. Fix Lint Errors (High Priority)
- [ ] src/pages/HomePage.tsx: Fix 'priority' as any; remove unused FilterOptions, tasks var
- [ ] src/pages/StatsPage.tsx: Change any[] to Task[]
- [ ] src/pages/TaskFormPage.tsx: Remove unused 'format' and ghost date-fns
- [ ] src/hooks/useTasks.ts: Remove unused Status/Priority/Category imports
- [ ] src/context/TaskContext.tsx: Fix unused FC; react-refresh issue
- [ ] src/pages/AboutPage.tsx: Remove unused Github import
- [ ] Run `npm run lint` → 0 errors

### 2. Install Dependencies
- [ ] `npm i uuid date-fns react-hot-toast`
- [ ] `npm i -D @types/uuid @types/date-fns`

### 3. Fix Functionality
- [ ] src/hooks/useLocalStorage.ts: Remove console.error
- [ ] src/hooks/useTasks.ts: Use uuid for task IDs
- [ ] src/pages/TaskFormPage.tsx: Native date validation (no date-fns ghosts); add toast feedback
- [ ] Add toast notifications throughout app

### 4. Polish & Pro Features
- [ ] Remove empty src/utils/
- [ ] Update sampleTasks to use proper ISO dates
- [ ] Add loading/error states
- [ ] Run `npm run build` → success
- [ ] Full CRUD test

### 5. Final Checks
- [ ] 0 lint errors
- [ ] Responsive test
- [ ] PWA meta enhancements (optional)

**Current Step: 1.1 HomePage.tsx fixes**
