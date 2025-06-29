import { Routes, Route } from 'react-router-dom'

import { WorkoutPlanner } from '@/features/workout/pages/WorkoutPlanner'
import { NotFound } from '@/shared/components/NotFound'
import { useTheme } from '@/shared/hooks/useTheme'

function App() {
  // Initialize theme system
  useTheme()

  return (
    <Routes>
      <Route path="/" element={<WorkoutPlanner />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App