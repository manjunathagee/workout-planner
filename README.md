# Kettlebell Tracker - Workout Planner 💪

A comprehensive fitness tracking Progressive Web App (PWA) built with React 19, TypeScript, and modern web technologies. Track your kettlebell workouts, mobility sessions, and yoga practice with detailed analytics and offline functionality.

## 🎯 Features

### 🏋️ Workout Management
- **Create & Configure Plans** - Customize sets, reps, weights, and rest intervals
- **Exercise Library** - Kettlebell, mobility, and yoga exercises
- **Plan Cloning** - Duplicate and modify existing workout plans
- **Free-form Planning** - Flexible workout creation for any exercise type

### ⏱️ Smart Workout Sessions
- **Live Timer** - Rest period countdown with audio notifications
- **Timer Extensions** - +30s and +60s rest period adjustments
- **Progress Tracking** - Real-time set and exercise completion
- **Audio Feedback** - Sound alerts using Howler.js for timer events

### 📊 Analytics & Insights
- **Workout History** - Detailed session records with duration and notes
- **Progress Charts** - Visual progress tracking with Recharts
- **Statistics Dashboard** - Total weight lifted, preferred weights, workout patterns
- **Daily Steps** - Step counter with customizable daily goals

### 🗓️ Planning & Organization
- **Calendar View** - Monthly workout schedule with completion status
- **Workout Stats** - Monthly summaries and goal tracking
- **Data Management** - Export/import workout data as JSON
- **Goal Setting** - Track progress toward fitness milestones

### 💾 Data & Offline Support
- **IndexedDB Storage** - Offline data persistence with Dexie.js
- **PWA Support** - Install as native app with offline functionality
- **Data Export/Import** - Backup and restore workout data
- **Reset Options** - Clear all data for fresh start

### 🎨 User Experience
- **Dark/Light Themes** - Toggle between theme modes
- **Responsive Design** - Optimized for mobile and desktop
- **Accessibility** - WCAG 2.1 AA compliant
- **Touch-Friendly** - Mobile-optimized interactions

## 🛠️ Technology Stack

### Frontend Framework
- **React 19.0.0** - Latest React with modern features
- **TypeScript 5.8.2** - Strict type safety
- **Vite 6.0.0** - Lightning-fast build tool

### UI & Styling
- **Tailwind CSS v4.0** - Utility-first CSS framework
- **Shadcn/ui** - High-quality accessible components
- **Radix UI** - Unstyled, accessible UI primitives
- **Lucide React** - Beautiful icon library

### Data & State Management
- **Zustand** - Lightweight state management
- **Dexie.js** - IndexedDB wrapper for offline storage
- **TanStack Query** - Server state management

### Audio & Charts
- **Howler.js** - Cross-platform audio library
- **Recharts** - Composable charting library
- **Web Audio API** - Custom sound generation

### Development Tools
- **ESLint** - Code linting with TypeScript support
- **Prettier** - Code formatting
- **Vitest** - Fast unit testing
- **Playwright** - End-to-end testing
- **Husky** - Git hooks

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ (LTS recommended)
- pnpm 9+ (package manager)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd workout-planner
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start development server**
   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Usage

### Creating Your First Workout

1. **Click the floating play button** to open workout configuration
2. **Select exercise** from the dropdown (kettlebell, mobility, or yoga)
3. **Configure parameters**: weight, reps, sets, rest time
4. **Start workout** and follow the guided session
5. **Complete sets** with timer assistance and audio cues

### Managing Workout Plans

1. **Navigate to Plans tab** to view saved workout plans
2. **Create Plan** to generate structured workout templates
3. **Clone existing plans** to customize and reuse
4. **Start workouts** directly from saved plans

### Tracking Progress

1. **View History tab** for detailed workout records
2. **Check Stats tab** for analytics and progress charts
3. **Use Calendar view** to see workout schedule
4. **Track daily steps** with built-in step counter

### Data Management

1. **Export data** using the upload icon in header
2. **Import data** using the file icon in header
3. **Reset all data** using the refresh icon
4. **Toggle themes** with the sun/moon icon

## 📁 Project Structure

```
src/
├── features/workout/           # Workout-specific features
│   ├── components/            # UI components
│   │   ├── WorkoutTabs.tsx   # Main navigation
│   │   ├── ConfigureWorkoutModal.tsx
│   │   ├── WorkoutSession.tsx # Live workout tracking
│   │   ├── StatsTab.tsx      # Analytics dashboard
│   │   ├── HistoryTab.tsx    # Workout history
│   │   ├── CalendarTab.tsx   # Calendar view
│   │   ├── PlansTab.tsx      # Workout plans
│   │   └── StepsTracker.tsx  # Daily steps
│   ├── pages/
│   │   └── WorkoutPlanner.tsx # Main app page
│   ├── store/
│   │   └── workoutStore.ts   # Zustand state
│   └── types/
│       └── index.ts          # TypeScript types
├── lib/
│   ├── database.ts           # Dexie.js database
│   └── audio.ts              # Howler.js audio manager
├── components/ui/             # Reusable UI components
├── shared/                    # Shared utilities
└── types/                     # Global types
```

## 🛠️ Available Scripts

### Development
- `pnpm dev` - Start development server
- `pnpm build` - Build for production  
- `pnpm preview` - Preview production build

### Testing
- `pnpm test` - Run unit tests
- `pnpm test:ui` - Run tests with UI
- `pnpm test:coverage` - Generate coverage report
- `pnpm test:e2e` - Run end-to-end tests

### Code Quality
- `pnpm lint` - Lint TypeScript code
- `pnpm lint:fix` - Fix linting issues
- `pnpm typecheck` - Check TypeScript types
- `pnpm format` - Format code with Prettier

## 🎵 Audio Features

The app includes comprehensive audio feedback:

- **Timer End** - Alert when rest period completes
- **Set Complete** - Confirmation sound for completed sets
- **Workout Complete** - Celebration sound for finished workouts
- **Warning Beeps** - 10-second countdown warning
- **Final Countdown** - Beeps for last 3 seconds

Audio can be toggled on/off and works across all modern browsers.

## 📊 Data Analytics

### Workout Statistics
- Total weight lifted across all sessions
- Most frequently used weights
- Workout frequency by day of week
- Progress over time with trend charts

### Goal Tracking
- Set daily step goals (8K, 10K, 12K)
- Track workout plan completion
- Monitor consistency streaks
- Export data for external analysis

## 🌐 PWA Features

### Installation
- Install as native app on mobile and desktop
- Offline functionality with service worker
- App-like experience with splash screen
- Background sync for pending operations

### Offline Support
- Complete workout functionality without internet
- Local data storage with IndexedDB
- Cached resources for fast loading
- Background sync when connection restored

## 🎨 Customization

### Adding New Exercises
1. Edit `exerciseOptions` array in `ConfigureWorkoutModal.tsx`
2. Add new exercise types to TypeScript types
3. Update plan templates in `PlansTab.tsx`

### Modifying Audio
1. Replace base64 audio in `src/lib/audio.ts`
2. Add new sound events in `AudioManager` class
3. Integrate new sounds in workout session

### Custom Themes
1. Modify CSS variables in `src/index.css`
2. Update Tailwind configuration
3. Add theme variants to components

## 🚀 Deployment

### Build for Production
```bash
pnpm build
```

### Deploy to Vercel
```bash
vercel --prod
```

### Deploy to Netlify
```bash
netlify deploy --prod --dir dist
```

The app is optimized for static hosting and works with all major platforms.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [React 19 Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Vite Guide](https://vitejs.dev/guide)
- [Tailwind CSS](https://tailwindcss.com)
- [Dexie.js](https://dexie.org)
- [Howler.js](https://howlerjs.com)

---

**Built with ❤️ for fitness enthusiasts and developers**

Track your progress, stay motivated, and achieve your fitness goals with this modern workout tracking PWA!