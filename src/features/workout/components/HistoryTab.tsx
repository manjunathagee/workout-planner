import { useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Clock, Calendar, Weight } from 'lucide-react';
import { useWorkoutStore } from '../store/workoutStore';

export const HistoryTab = () => {
  const { recentSessions, loadRecentSessions } = useWorkoutStore();

  useEffect(() => {
    loadRecentSessions();
  }, [loadRecentSessions]);

  const formatDuration = (duration: number) => {
    const minutes = Math.floor(duration / (1000 * 60));
    const seconds = Math.floor((duration % (1000 * 60)) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (recentSessions.length === 0) {
    return (
      <Card className="bg-gray-800 border-gray-700 p-8 rounded-xl">
        <div className="text-center text-gray-400">
          <div className="text-4xl mb-4">📚</div>
          <h3 className="text-lg font-medium mb-2">No workout history available</h3>
          <p className="text-sm">Start your first workout to see your history here.</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {recentSessions.map((session) => {
        const totalWeight = session.exercises.reduce((sum, exercise) => 
          sum + (exercise.actualWeight * exercise.actualSets * exercise.actualReps), 0
        );

        return (
          <Card key={session.id} className="bg-gray-800 border-gray-700 p-6 rounded-xl">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-white font-semibold text-lg">
                  {session.exercises.length > 0 ? session.exercises[0].name : 'Workout'}
                </h3>
                <div className="flex items-center gap-4 text-gray-400 text-sm mt-1">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {formatDate(session.date)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {formatDuration(session.duration)}
                  </div>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                session.completed 
                  ? 'bg-green-900 text-green-300' 
                  : 'bg-yellow-900 text-yellow-300'
              }`}>
                {session.completed ? 'Completed' : 'In Progress'}
              </div>
            </div>

            {/* Exercise Details */}
            <div className="space-y-3">
              {session.exercises.map((exercise, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-gray-700 last:border-b-0">
                  <div>
                    <p className="text-white font-medium">{exercise.name}</p>
                    <p className="text-gray-400 text-sm">
                      {exercise.actualSets} sets × {exercise.actualReps} reps
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-orange-400">
                      <Weight className="w-4 h-4" />
                      <span className="font-medium">{exercise.actualWeight}kg</span>
                    </div>
                    <p className="text-gray-400 text-sm">
                      {exercise.actualWeight * exercise.actualSets * exercise.actualReps}kg total
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Session Summary */}
            <div className="mt-4 pt-4 border-t border-gray-700">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">Total Weight Lifted:</span>
                <span className="text-white font-semibold">{totalWeight}kg</span>
              </div>
              {session.notes && (
                <div className="mt-2">
                  <span className="text-gray-400 text-sm">Notes:</span>
                  <p className="text-white text-sm mt-1">{session.notes}</p>
                </div>
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
};