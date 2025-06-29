import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import { WorkoutHeader } from '../components/WorkoutHeader';
import { WorkoutTabs } from '../components/WorkoutTabs';
import { ConfigureWorkoutModal } from '../components/ConfigureWorkoutModal';
import { WorkoutSession } from '../components/WorkoutSession';
import { useWorkoutStore } from '../store/workoutStore';

export const WorkoutPlanner = () => {
  const [isConfigureModalOpen, setIsConfigureModalOpen] = useState(false);
  const { currentSession } = useWorkoutStore();

  const handleStartWorkout = () => {
    // Workout session will be handled by the store
    console.log('Workout started successfully!');
  };

  // If there's an active session, show the workout session component
  if (currentSession) {
    return <WorkoutSession />;
  }

  return (
    <div className="min-h-screen bg-gray-900 relative">
      <WorkoutHeader />
      <WorkoutTabs />
      
      {/* Floating Action Button */}
      <Button
        onClick={() => setIsConfigureModalOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-orange-600 hover:bg-orange-700 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
        size="icon"
      >
        <Play className="w-6 h-6" />
      </Button>
      
      <ConfigureWorkoutModal
        isOpen={isConfigureModalOpen}
        onClose={() => setIsConfigureModalOpen(false)}
        onStartWorkout={handleStartWorkout}
      />
    </div>
  );
};