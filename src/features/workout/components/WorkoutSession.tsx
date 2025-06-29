import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Play, Pause, SkipForward, Plus } from 'lucide-react';
import { useWorkoutStore } from '../store/workoutStore';
import { audioManager } from '@/lib/audio';

export const WorkoutSession = () => {
  const {
    currentSession,
    workoutConfig,
    currentSetIndex,
    isRestMode,
    restTimeRemaining,
    completeSet,
    completeExercise,
    startRest,
    skipRest,
    extendRest,
    finishWorkout,
    clearSession
  } = useWorkoutStore();

  const [sessionStartTime] = useState(Date.now());
  const [currentTime, setCurrentTime] = useState(Date.now());

  // Update current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Rest timer countdown
  useEffect(() => {
    if (!isRestMode || restTimeRemaining <= 0) return;

    const timer = setInterval(() => {
      const newTime = restTimeRemaining - 1;
      
      // Play warning sound at 10 seconds
      if (newTime === 10) {
        audioManager.playWarning();
      }
      
      // Play countdown beeps for last 3 seconds
      if (newTime <= 3 && newTime > 0) {
        audioManager.playCountdownBeep();
      }
      
      if (newTime <= 0) {
        audioManager.playTimerEnd();
        skipRest();
      } else {
        // Update rest time in store
        useWorkoutStore.setState({ restTimeRemaining: newTime });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isRestMode, restTimeRemaining, skipRest]);

  if (!currentSession) return null;

  const sessionDuration = Math.floor((currentTime - sessionStartTime) / 1000);
  const minutes = Math.floor(sessionDuration / 60);
  const seconds = sessionDuration % 60;

  const currentSet = currentSetIndex + 1;
  const totalSets = workoutConfig.sets;
  const progressPercentage = (currentSet / totalSets) * 100;

  const formatTime = (timeInSeconds: number) => {
    const mins = Math.floor(timeInSeconds / 60);
    const secs = timeInSeconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCompleteSet = () => {
    audioManager.playSetComplete();
    
    if (currentSet < totalSets) {
      completeSet();
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
        completed: true
      };
      
      completeExercise(completedExercise);
      audioManager.playWorkoutComplete();
      finishWorkout();
    }
  };

  return (
    <div className=\"fixed inset-0 bg-gray-900 z-50 flex flex-col\">
      {/* Header */}
      <div className=\"bg-gray-800 p-4 flex justify-between items-center border-b border-gray-700\">
        <div>
          <h1 className=\"text-xl font-bold text-white\">{workoutConfig.exercise}</h1>
          <p className=\"text-gray-400\">Session Duration: {minutes}:{seconds.toString().padStart(2, '0')}</p>
        </div>
        <Button
          variant=\"ghost\"
          onClick={clearSession}
          className=\"text-gray-400 hover:text-white\"
        >
          ✕
        </Button>
      </div>

      {/* Main Content */}
      <div className=\"flex-1 p-6 space-y-6\">
        {/* Progress Bar */}
        <Card className=\"bg-gray-800 border-gray-700 p-4\">
          <div className=\"flex justify-between items-center mb-2\">
            <span className=\"text-white font-medium\">Progress</span>
            <span className=\"text-gray-400\">{currentSet} / {totalSets} sets</span>
          </div>
          <div className=\"w-full bg-gray-700 rounded-full h-3\">
            <div
              className=\"bg-orange-600 h-3 rounded-full transition-all duration-300\"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </Card>

        {/* Current Set Info */}
        <Card className=\"bg-gray-800 border-gray-700 p-6\">
          <div className=\"text-center space-y-4\">
            <div>
              <h2 className=\"text-3xl font-bold text-white mb-2\">Set {currentSet}</h2>
              <div className=\"space-y-2\">
                <p className=\"text-xl text-gray-300\">{workoutConfig.reps} reps</p>
                {!workoutConfig.isBodyweight && (
                  <p className=\"text-lg text-orange-400\">{workoutConfig.weight}kg</p>
                )}\n              </div>\n            </div>\n\n            {/* Rest Mode */}\n            {isRestMode ? (\n              <div className=\"space-y-4\">\n                <div className=\"text-center\">\n                  <h3 className=\"text-xl font-semibold text-white mb-2\">Rest Time</h3>\n                  <div className=\"text-4xl font-bold text-orange-500 mb-4\">\n                    {formatTime(restTimeRemaining)}\n                  </div>\n                  <div className=\"flex justify-center gap-2\">\n                    <Button\n                      onClick={() => extendRest(30)}\n                      className=\"bg-gray-700 hover:bg-gray-600 text-white\"\n                    >\n                      <Plus className=\"w-4 h-4 mr-1\" />\n                      30s\n                    </Button>\n                    <Button\n                      onClick={() => extendRest(60)}\n                      className=\"bg-gray-700 hover:bg-gray-600 text-white\"\n                    >\n                      <Plus className=\"w-4 h-4 mr-1\" />\n                      60s\n                    </Button>\n                  </div>\n                </div>\n                <Button\n                  onClick={skipRest}\n                  className=\"w-full bg-orange-600 hover:bg-orange-700 text-white py-3\"\n                >\n                  <SkipForward className=\"w-5 h-5 mr-2\" />\n                  Skip Rest\n                </Button>\n              </div>\n            ) : (\n              /* Active Set */\n              <div className=\"space-y-4\">\n                <div className=\"text-center\">\n                  <p className=\"text-gray-400 mb-4\">Complete your {workoutConfig.reps} reps</p>\n                  <div className=\"text-6xl mb-4\">💪</div>\n                </div>\n                <Button\n                  onClick={handleCompleteSet}\n                  className=\"w-full bg-orange-600 hover:bg-orange-700 text-white py-4 text-lg font-medium\"\n                >\n                  {currentSet === totalSets ? (\n                    <>Finish Workout</>\n                  ) : (\n                    <>Complete Set {currentSet}</>\n                  )}\n                </Button>\n              </div>\n            )}\n          </div>\n        </Card>\n\n        {/* Workout Summary */}\n        <Card className=\"bg-gray-800 border-gray-700 p-4\">\n          <h3 className=\"text-white font-medium mb-3\">Workout Summary</h3>\n          <div className=\"grid grid-cols-2 gap-4 text-sm\">\n            <div>\n              <p className=\"text-gray-400\">Exercise</p>\n              <p className=\"text-white\">{workoutConfig.exercise}</p>\n            </div>\n            <div>\n              <p className=\"text-gray-400\">Weight</p>\n              <p className=\"text-white\">\n                {workoutConfig.isBodyweight ? 'Bodyweight' : `${workoutConfig.weight}kg`}\n              </p>\n            </div>\n            <div>\n              <p className=\"text-gray-400\">Reps per Set</p>\n              <p className=\"text-white\">{workoutConfig.reps}</p>\n            </div>\n            <div>\n              <p className=\"text-gray-400\">Rest Time</p>\n              <p className=\"text-white\">{workoutConfig.restTime}s</p>\n            </div>\n          </div>\n        </Card>\n      </div>\n    </div>\n  );\n};