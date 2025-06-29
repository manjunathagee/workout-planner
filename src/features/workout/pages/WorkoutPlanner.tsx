import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Play } from 'lucide-react'
import { WorkoutHeader } from '../components/WorkoutHeader'
import { WorkoutTabs } from '../components/WorkoutTabs'
import { ConfigureWorkoutModal } from '../components/ConfigureWorkoutModal'
import { WorkoutSession } from '../components/WorkoutSession'
import { useWorkoutStore } from '../store/workoutStore'

export const WorkoutPlanner = () => {
  const [isConfigureModalOpen, setIsConfigureModalOpen] = useState(false)
  const { currentSession } = useWorkoutStore()

  const handleStartWorkout = () => {
    // Workout session will be handled by the store
    console.warn('Workout started successfully - logging for debug purposes')
  }

  // If there's an active session, show the workout session component
  if (currentSession) {
    return <WorkoutSession />
  }

  return (
    <div className="relative min-h-screen bg-gray-900">
      <WorkoutHeader />
      <WorkoutTabs />

      {/* Floating Action Button */}
      <Button
        onClick={() => setIsConfigureModalOpen(true)}
        className="fixed right-6 bottom-6 h-14 w-14 rounded-full bg-orange-600 shadow-lg transition-all duration-200 hover:scale-110 hover:bg-orange-700 hover:shadow-xl"
        size="icon"
      >
        <Play className="h-6 w-6" />
      </Button>

      <ConfigureWorkoutModal
        isOpen={isConfigureModalOpen}
        onClose={() => setIsConfigureModalOpen(false)}
        onStartWorkout={handleStartWorkout}
      />
    </div>
  )
}
