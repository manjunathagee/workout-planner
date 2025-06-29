# Technical Product Requirements Document - Workout Planner

## 1. Overview
A comprehensive workout planning and tracking application built as a Progressive Web App (PWA) with offline capabilities. The application will help users create, manage, and track their fitness routines with detailed analytics and progression tracking.

## 2. Technical Architecture

### 2.1 Technology Stack (2025 Latest)
- **Frontend**: React 19.0.0 with Vite 5.3.0+ (TypeScript)
- **UI Framework**: Shadcn/ui (latest CLI) with Radix UI primitives
- **Styling**: Tailwind CSS v4.0 (zero-config)
- **Database**: IndexedDB with Dexie.js for offline storage
- **Charts**: Chart.js or Recharts for data visualization
- **Audio**: Howler.js for timer notifications and sounds
- **PWA**: Service Worker for offline functionality
- **TypeScript**: v5.8.3 for type safety
- **Build Tool**: Vite with SWC for optimal performance

### 2.2 System Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React App     │    │   IndexedDB     │    │  Service Worker │
│   (Frontend)    │◄───┤   (Dexie.js)    │    │   (PWA Cache)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Context API    │    │  Data Models    │    │  Offline Sync   │
│ (State Mgmt)    │    │  (Workouts)     │    │  (Background)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### 2.3 Data Models

#### Workout Plan
```typescript
interface WorkoutPlan {
  id: string;
  name: string;
  description: string;
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  timesPerWeek: number;
  exercises: Exercise[];
  goals: Goal[];
  createdAt: Date;
  updatedAt: Date;
}
```

#### Exercise
```typescript
interface Exercise {
  id: string;
  name: string;
  type: 'strength' | 'cardio' | 'mobility' | 'yoga';
  sets: number;
  reps: number;
  weight: number;
  restInterval: number;
  notes: string;
}
```

#### Workout Session
```typescript
interface WorkoutSession {
  id: string;
  planId: string;
  date: Date;
  exercises: CompletedExercise[];
  duration: number;
  notes: string;
  completed: boolean;
}
```

## 3. Sprint Breakdown

### Sprint 1: Foundation & Core Setup (2 weeks)
**Epic**: Project Foundation

**Setup Commands**:
```bash
# Create Vite React TypeScript project
npm create vite@latest workout-planner -- --template react-ts
cd workout-planner
npm install

# Install Tailwind CSS v4.0
npm install tailwindcss@next

# Initialize Shadcn/ui
npx shadcn@latest init

# Add essential components
npx shadcn@latest add button card input label textarea dialog alert

# Install additional dependencies
npm install dexie howler
npm install -D @types/howler
```

**Development Tasks**:
- Set up React application with Vite + TypeScript
- Configure Tailwind CSS v4.0 (zero-config setup)
- Set up Shadcn/ui with latest CLI
- Set up IndexedDB with Dexie.js
- Create basic routing structure
- Implement responsive layout components
- Set up Context API for state management
- Create basic data models and schemas

**User Stories**:
- As a developer, I want to set up the project foundation so that the team can start development
- As a user, I want to see a responsive layout that works on all devices

**Acceptance Criteria**:
- React 19 + Vite app created and running
- Tailwind CSS v4.0 configured with @import "tailwindcss"
- Shadcn/ui components installed and working
- Basic navigation between sections
- IndexedDB connection established
- TypeScript configured properly

### Sprint 2: Workout Plan Management (2 weeks)
**Epic**: Workout Plan CRUD Operations
- Create workout plan creation form
- Implement exercise configuration (sets, reps, weight, rest intervals)
- Add workout plan listing and selection
- Implement clone functionality for existing plans
- Create workout plan templates

**User Stories**:
- As a user, I want to create a workout plan with custom exercises
- As a user, I want to configure sets, reps, and rest intervals for each exercise
- As a user, I want to clone existing workout plans and modify them

**Acceptance Criteria**:
- Workout plans can be created with multiple exercises
- All exercise parameters are configurable
- Plans can be cloned and edited
- Data persists in IndexedDB

### Sprint 3: Workout Execution & Timer (2 weeks)
**Epic**: Workout Session Management
- Implement workout session start/pause/complete flow
- Create timer functionality with Howler.js sounds
- Add timer extension options (+30sec, +60sec)
- Implement rest interval tracking
- Create workout progress tracking during sessions

**User Stories**:
- As a user, I want to start a workout and follow the planned exercises
- As a user, I want timer notifications with sound alerts
- As a user, I want to extend rest periods when needed

**Acceptance Criteria**:
- Workout sessions can be started from selected plans
- Timers work with audio notifications
- Rest periods can be extended
- Session progress is tracked and saved

### Sprint 4: Calendar & History (2 weeks)
**Epic**: Workout Calendar and History
- Create calendar view for workout scheduling
- Implement workout history tracking
- Add ability to edit past workouts from calendar
- Create workout completion status indicators
- Implement workout streak tracking

**User Stories**:
- As a user, I want to see my workout schedule in a calendar view
- As a user, I want to review and edit my past workouts
- As a user, I want to track my workout consistency

**Acceptance Criteria**:
- Calendar displays workout schedule
- Past workouts can be viewed and edited
- Workout completion status is visible
- History data is preserved

### Sprint 5: Stats & Analytics (2 weeks)
**Epic**: Progress Tracking and Analytics
- Implement chart library for data visualization
- Create progression charts for individual exercises
- Add overall progress statistics
- Implement goal tracking and achievement metrics
- Create weekly/monthly progress reports

**User Stories**:
- As a user, I want to see my workout progression over time
- As a user, I want to track my goals and achievements
- As a user, I want visual charts showing my progress

**Acceptance Criteria**:
- Charts display exercise progression
- Goal tracking shows completion percentage
- Progress statistics are accurate
- Data can be filtered by time periods

### Sprint 6: Advanced Features (2 weeks)
**Epic**: Advanced Functionality
- Implement daily step tracking
- Create free-form plans for mobility/yoga
- Add challenge tracking (10k challenge, 3-month goals)
- Implement data export/import functionality
- Add workout plan sharing capabilities

**User Stories**:
- As a user, I want to track my daily steps
- As a user, I want to create flexible workout plans for mobility
- As a user, I want to participate in fitness challenges

**Acceptance Criteria**:
- Step tracking is integrated
- Flexible plan creation works
- Challenge progress is tracked
- Export/import functions work

### Sprint 7: Settings & PWA (2 weeks)
**Epic**: App Configuration and PWA
- Implement settings page with theme switching
- Add user authentication (signup/signin)
- Create data reset functionality
- Implement PWA features (service worker, offline mode)
- Add app installation prompts
- Create notification system

**User Stories**:
- As a user, I want to customize app settings and themes
- As a user, I want to use the app offline
- As a user, I want to install the app on my device

**Acceptance Criteria**:
- Light/dark theme toggle works
- App works offline
- App can be installed as PWA
- User data can be reset
- Notifications work properly

### Sprint 8: Testing & Polish (1 week)
**Epic**: Quality Assurance and Launch Preparation
- Comprehensive testing across all features
- Performance optimization
- Bug fixes and edge case handling
- UI/UX polish and accessibility improvements
- Documentation and deployment preparation

**User Stories**:
- As a user, I want a bug-free, performant application
- As a user, I want accessible features that work for everyone

**Acceptance Criteria**:
- All features tested and working
- Performance metrics meet standards
- Accessibility standards met
- Ready for production deployment

## 4. UI Design Specifications

Based on the provided screenshots, the application follows a dark theme kettlebell tracker design with the following key UI components:

### 4.1 Design System
- **Color Scheme**: Dark theme with gray-900 background, gray-800 cards, white text
- **Accent Color**: Orange (#ea580c) for primary actions and selected states
- **Typography**: Clean, modern sans-serif font family
- **Layout**: Responsive card-based layout with proper spacing

### 4.2 Main Navigation
- **Tab System**: Four main tabs - History, Stats, Calendar, Plans
- **Selected State**: Active tab has darker background (gray-800)
- **Unselected State**: Inactive tabs have gray-400 text with hover effects

### 4.3 Statistics Dashboard (Stats Tab)
- **Metric Cards**: 
  - Total Weight Lifted: Large number display with description
  - Most Used Weight: Shows preferred kettlebell weight
- **Charts**:
  - Weight Lifted Over Time: Line chart showing progression
  - Workouts by Day: Bar chart showing weekly patterns
- **Empty States**: Placeholder content with icons when no data available

### 4.4 Calendar View
- **Month Navigation**: Left/right arrows for month switching
- **View Toggle**: Month/Year toggle buttons
- **Calendar Grid**: 7-column layout with rounded date cells
- **Summary Cards**: Monthly statistics below calendar

### 4.5 Configure Workout Modal
- **Exercise Selection**: Dropdown with add button
- **Bodyweight Toggle**: iOS-style toggle switch
- **Weight Selection**: Horizontal button group (12kg, 16kg, 24kg, 32kg, 40kg)
- **Range Sliders**: Orange-colored sliders for Reps, Sets, Rest Time
- **Start Button**: Large orange button with play icon

### 4.6 Header Component
- **App Title**: "Kettlebell Tracker" on the left
- **Status Indicators**: Online status with green wifi icon
- **Action Buttons**: Theme toggle, Install App, Export, Reset options

### 4.7 Responsive Design
- **Mobile First**: Optimized for mobile devices
- **Grid Layouts**: Responsive grid for cards (1 column on mobile, 2 on desktop)
- **Touch Targets**: Appropriately sized buttons and interactive elements

## 5. Implementation Status

### 5.1 Completed Components ✅
- **WorkoutTabs**: Main navigation and tab switching
- **StatsTab**: Statistics dashboard with metric cards
- **HistoryTab**: Empty state for workout history
- **CalendarTab**: Monthly calendar view with navigation
- **PlansTab**: Workout plans management
- **ConfigureWorkoutModal**: Exercise configuration interface
- **WorkoutHeader**: App header with PWA features
- **WorkoutPlanner**: Main page component

### 5.2 Technology Stack Verification ✅
- **React 19.0.0**: ✅ Implemented
- **Vite 6.0.0**: ✅ Configured
- **Tailwind CSS v4.0.0-beta.5**: ✅ Integrated
- **TypeScript 5.8.2**: ✅ Strict mode enabled
- **Shadcn/ui**: ✅ Components configured
- **pnpm**: ✅ Package manager configured

### 5.3 Project Structure ✅
```
src/
├── features/
│   └── workout/
│       ├── components/
│       │   ├── WorkoutTabs.tsx
│       │   ├── StatsTab.tsx
│       │   ├── HistoryTab.tsx
│       │   ├── CalendarTab.tsx
│       │   ├── PlansTab.tsx
│       │   ├── ConfigureWorkoutModal.tsx
│       │   └── WorkoutHeader.tsx
│       ├── pages/
│       │   └── WorkoutPlanner.tsx
│       └── types/
│           └── index.ts
└── components/ui/ (Shadcn components)
```

## 6. Technical Implementation Details

### 4.0 Project Initialization Commands
For quick reference, here are the complete setup commands:

```bash
# 1. Create Vite React TypeScript project
npm create vite@latest workout-planner -- --template react-ts
cd workout-planner
npm install

# 2. Install Tailwind CSS v4.0 (zero-config)
npm install tailwindcss@next

# 3. Add Tailwind to src/index.css
echo '@import "tailwindcss";' > src/index.css

# 4. Initialize Shadcn/ui (note: use 'shadcn' not 'shadcn-ui')
npx shadcn@latest init

# 5. Add essential UI components for workout planner
npx shadcn@latest add button card input label textarea
npx shadcn@latest add dialog alert dropdown-menu calendar
npx shadcn@latest add table badge progress tabs

# 6. Install additional dependencies
npm install dexie howler
npm install -D @types/howler

# 7. Start development server
npm run dev
```

**Important Notes**:
- Use `npx shadcn@latest init` (not `shadcn-ui`)
- Tailwind v4.0 uses single `@import "tailwindcss"` instead of multiple `@tailwind` directives
- React 19 has minimal breaking changes from v18
- Vite provides significantly faster builds than Create React App

### 4.1 IndexedDB Schema
```javascript
const db = new Dexie('WorkoutPlannerDB');
db.version(1).stores({
  workoutPlans: '++id, name, frequency, createdAt',
  exercises: '++id, planId, name, type',
  sessions: '++id, planId, date, completed',
  goals: '++id, planId, target, achieved',
  settings: '++id, key, value'
});
```

### 4.2 Context API Structure
- **AuthContext**: User authentication state
- **WorkoutContext**: Current workout session state
- **SettingsContext**: App configuration and preferences
- **DataContext**: Workout plans, exercises, and history

### 4.3 PWA Configuration
- Service Worker for caching strategies
- Web App Manifest for installation
- Offline data synchronization
- Background sync for pending operations

### 4.4 Performance Considerations
- Code splitting for route-based components
- Lazy loading for chart components
- IndexedDB query optimization
- Memoization for expensive calculations

## 5. Non-Functional Requirements

### 5.1 Performance
- Initial load time < 3 seconds
- Smooth animations at 60fps
- Efficient IndexedDB queries
- Optimized bundle size

### 5.2 Accessibility
- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support

### 5.3 Security
- Client-side data encryption
- Secure authentication flows
- Data validation and sanitization
- Privacy-focused data handling

### 5.4 Compatibility
- **Modern browsers**: Chrome 111+, Safari 16.4+, Firefox 128+ (Tailwind v4.0 requirements)
- **Mobile responsive**: iOS 16+, Android 10+ (React 19 compatibility)
- **PWA support**: All modern browsers with service worker support
- **Touch and mouse interaction**: Full support for both input methods
- **TypeScript**: Full type safety with v5.8.3

## 6. Deployment Strategy

### 6.1 Development Environment
- **Local development**: Vite dev server with HMR (Hot Module Replacement)
- **Code quality**: ESLint and Prettier for code quality
- **Git hooks**: Pre-commit validation with Husky
- **Testing**: Vitest (Vite's test runner) + React Testing Library
- **TypeScript**: Strict mode enabled for better type safety
- **Build optimization**: SWC for faster compilation

### 6.2 Production Deployment
- Static site hosting (Vercel/Netlify)
- Service Worker for offline functionality
- Performance monitoring
- Error tracking and logging

## 7. Success Metrics

### 7.1 Technical Metrics
- < 3s initial load time
- > 95% uptime
- < 1% error rate
- PWA installation rate > 20%

### 7.2 User Engagement
- Daily active users
- Workout completion rate
- Feature adoption metrics
- User retention over 30 days