import { useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Clock, Calendar, Weight } from 'lucide-react'
import { useWorkoutStore } from '../store/workoutStore'

export const HistoryTab = () => {
  const { recentSessions, loadRecentSessions } = useWorkoutStore()

  useEffect(() => {
    loadRecentSessions()
  }, [loadRecentSessions])

  const formatDuration = (duration: number) => {
    const minutes = Math.floor(duration / (1000 * 60))
    const seconds = Math.floor((duration % (1000 * 60)) / 1000)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (recentSessions.length === 0) {
    return (
      <Card className="rounded-xl border-gray-700 bg-gray-800 p-8">
        <div className="text-center text-gray-400">
          <div className="mb-4 text-4xl">📚</div>
          <h3 className="mb-2 text-lg font-medium">No workout history available</h3>
          <p className="text-sm">Start your first workout to see your history here.</p>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {recentSessions.map((session) => {
        const totalWeight = session.exercises.reduce(
          (sum, exercise) =>
            sum + exercise.actualWeight * exercise.actualSets * exercise.actualReps,
          0
        )

        return (
          <Card key={session.id} className="rounded-xl border-gray-700 bg-gray-800 p-6">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {session.exercises.length > 0
                    ? session.exercises[0]?.name || 'Workout'
                    : 'Workout'}
                </h3>
                <div className="mt-1 flex items-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {formatDate(session.date)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {formatDuration(session.duration)}
                  </div>
                </div>
              </div>
              <div
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  session.completed
                    ? 'bg-green-900 text-green-300'
                    : 'bg-yellow-900 text-yellow-300'
                }`}
              >
                {session.completed ? 'Completed' : 'In Progress'}
              </div>
            </div>

            {/* Exercise Details */}
            <div className="space-y-3">
              {session.exercises.map((exercise, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b border-gray-700 py-2 last:border-b-0"
                >
                  <div>
                    <p className="font-medium text-white">{exercise.name}</p>
                    <p className="text-sm text-gray-400">
                      {exercise.actualSets} sets × {exercise.actualReps} reps
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-orange-400">
                      <Weight className="h-4 w-4" />
                      <span className="font-medium">{exercise.actualWeight}kg</span>
                    </div>
                    <p className="text-sm text-gray-400">
                      {exercise.actualWeight * exercise.actualSets * exercise.actualReps}kg total
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Session Summary */}
            <div className="mt-4 border-t border-gray-700 pt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Total Weight Lifted:</span>
                <span className="font-semibold text-white">{totalWeight}kg</span>
              </div>
              {session.notes && (
                <div className="mt-2">
                  <span className="text-sm text-gray-400">Notes:</span>
                  <p className="mt-1 text-sm text-white">{session.notes}</p>
                </div>
              )}
            </div>
          </Card>
        )
      })}
    </div>
  )
}
