import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { SkipForward, Plus } from 'lucide-react'
import { useWorkoutStore } from '../store/workoutStore'
import { audioManager } from '@/lib/audio'

export const WorkoutSession = () => {
  const {
    currentSession,
    workoutConfig,
    currentSetIndex,
    isRestMode,
    restTimeRemaining,
    completeSet,
    completeExercise,
    skipRest,
    extendRest,
    finishWorkout,
    clearSession,
  } = useWorkoutStore()

  const [sessionStartTime] = useState(Date.now())
  const [currentTime, setCurrentTime] = useState(Date.now())

  // Update current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Rest timer countdown
  useEffect(() => {
    if (!isRestMode || restTimeRemaining <= 0) return

    const timer = setInterval(() => {
      const newTime = restTimeRemaining - 1

      // Play warning sound at 10 seconds
      if (newTime === 10) {
        audioManager.playWarning()
      }

      // Play countdown beeps for last 3 seconds
      if (newTime <= 3 && newTime > 0) {
        audioManager.playCountdownBeep()
      }

      if (newTime <= 0) {
        audioManager.playTimerEnd()
        skipRest()
      } else {
        // Update rest time in store
        useWorkoutStore.setState({ restTimeRemaining: newTime })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [isRestMode, restTimeRemaining, skipRest])

  if (!currentSession) return null

  const sessionDuration = Math.floor((currentTime - sessionStartTime) / 1000)
  const minutes = Math.floor(sessionDuration / 60)
  const seconds = sessionDuration % 60

  const currentSet = currentSetIndex + 1
  const totalSets = workoutConfig.sets
  const progressPercentage = (currentSet / totalSets) * 100

  const formatTime = (timeInSeconds: number) => {
    const mins = Math.floor(timeInSeconds / 60)
    const secs = timeInSeconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleCompleteSet = () => {
    audioManager.playSetComplete()

    if (currentSet < totalSets) {
      completeSet()
    } else {
      // Create completed exercise for the final set
      const completedExercise = {
        id: crypto.randomUUID(),
        name: workoutConfig.exercise,
        type: 'strength' as const,
        sets: workoutConfig.sets,
        reps: workoutConfig.reps,
        weight: workoutConfig.isBodyweight ? 0 : workoutConfig.weight,
        restInterval: workoutConfig.restTime,
        notes: '',
        actualSets: workoutConfig.sets,
        actualReps: workoutConfig.reps,
        actualWeight: workoutConfig.isBodyweight ? 0 : workoutConfig.weight,
        completed: true,
      }

      completeExercise(completedExercise)
      audioManager.playWorkoutComplete()
      finishWorkout()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-700 bg-gray-800 p-4">
        <div>
          <h1 className="text-xl font-bold text-white">{workoutConfig.exercise}</h1>
          <p className="text-gray-400">
            Session Duration: {minutes}:{seconds.toString().padStart(2, '0')}
          </p>
        </div>
        <Button variant="ghost" onClick={clearSession} className="text-gray-400 hover:text-white">
          ✕
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 space-y-6 p-6">
        {/* Progress Bar */}
        <Card className="border-gray-700 bg-gray-800 p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-medium text-white">Progress</span>
            <span className="text-gray-400">
              {currentSet} / {totalSets} sets
            </span>
          </div>
          <div className="h-3 w-full rounded-full bg-gray-700">
            <div
              className="h-3 rounded-full bg-orange-600 transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </Card>

        {/* Current Set Info */}
        <Card className="border-gray-700 bg-gray-800 p-6">
          <div className="space-y-4 text-center">
            <div>
              <h2 className="mb-2 text-3xl font-bold text-white">Set {currentSet}</h2>
              <div className="space-y-2">
                <p className="text-xl text-gray-300">{workoutConfig.reps} reps</p>
                {!workoutConfig.isBodyweight && (
                  <p className="text-lg text-orange-400">{workoutConfig.weight}kg</p>
                )}
              </div>
            </div>

            {/* Rest Mode */}
            {isRestMode ? (
              <div className="space-y-4">
                <div className="text-center">
                  <h3 className="mb-2 text-xl font-semibold text-white">Rest Time</h3>
                  <div className="mb-4 text-4xl font-bold text-orange-500">
                    {formatTime(restTimeRemaining)}
                  </div>
                  <div className="flex justify-center gap-2">
                    <Button
                      onClick={() => extendRest(30)}
                      className="bg-gray-700 text-white hover:bg-gray-600"
                    >
                      <Plus className="mr-1 h-4 w-4" />
                      30s
                    </Button>
                    <Button
                      onClick={() => extendRest(60)}
                      className="bg-gray-700 text-white hover:bg-gray-600"
                    >
                      <Plus className="mr-1 h-4 w-4" />
                      60s
                    </Button>
                  </div>
                </div>
                <Button
                  onClick={skipRest}
                  className="w-full bg-orange-600 py-3 text-white hover:bg-orange-700"
                >
                  <SkipForward className="mr-2 h-5 w-5" />
                  Skip Rest
                </Button>
              </div>
            ) : (
              /* Active Set */
              <div className="space-y-4">
                <div className="text-center">
                  <p className="mb-4 text-gray-400">Complete your {workoutConfig.reps} reps</p>
                  <div className="mb-4 text-6xl">💪</div>
                </div>
                <Button
                  onClick={handleCompleteSet}
                  className="w-full bg-orange-600 py-4 text-lg font-medium text-white hover:bg-orange-700"
                >
                  {currentSet === totalSets ? <>Finish Workout</> : <>Complete Set {currentSet}</>}
                </Button>
              </div>
            )}
          </div>
        </Card>

        {/* Workout Summary */}
        <Card className="border-gray-700 bg-gray-800 p-4">
          <h3 className="mb-3 font-medium text-white">Workout Summary</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-400">Exercise</p>
              <p className="text-white">{workoutConfig.exercise}</p>
            </div>
            <div>
              <p className="text-gray-400">Weight</p>
              <p className="text-white">
                {workoutConfig.isBodyweight ? 'Bodyweight' : `${workoutConfig.weight}kg`}
              </p>
            </div>
            <div>
              <p className="text-gray-400">Reps per Set</p>
              <p className="text-white">{workoutConfig.reps}</p>
            </div>
            <div>
              <p className="text-gray-400">Rest Time</p>
              <p className="text-white">{workoutConfig.restTime}s</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
