import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Play, Plus } from 'lucide-react';
import { useWorkoutStore } from '../store/workoutStore';

interface ConfigureWorkoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartWorkout: () => void;
}

const exerciseOptions = [
  // Strength exercises
  'Swing',
  'Clean',
  'Press',
  'Snatch',
  'Turkish Get-Up',
  'Deadlift',
  'Squat',
  'Goblet Squat',
  'Single-Arm Row',
  'Overhead Carry',
  
  // Mobility exercises
  'Hip Circles',
  'Leg Swings',
  'Arm Circles',
  'Shoulder Rolls',
  'Neck Stretches',
  'Cat-Cow Stretch',
  'Hip Flexor Stretch',
  'Hamstring Stretch',
  'Quad Stretch',
  'Calf Stretch',
  
  // Yoga poses
  'Downward Dog',
  'Warrior I',
  'Warrior II',
  'Tree Pose',
  'Child\'s Pose',
  'Cobra Pose',
  'Pigeon Pose',
  'Bridge Pose',
  'Triangle Pose',
  'Mountain Pose',
  'Sun Salutation',
  'Seated Forward Fold',
  'Corpse Pose'
];

export const ConfigureWorkoutModal = ({ isOpen, onClose, onStartWorkout }: ConfigureWorkoutModalProps) => {
  const { workoutConfig, updateWorkoutConfig, startWorkout } = useWorkoutStore();
  
  const {
    exercise,
    isBodyweight,
    weight,
    reps,
    sets,
    restTime
  } = workoutConfig;

  const weights = [12, 16, 24, 32, 40];

  // Update slider progress for visual feedback
  useEffect(() => {
    const updateSliderProgress = () => {
      const repsSlider = document.querySelector('.reps-slider') as HTMLInputElement;
      const setsSlider = document.querySelector('.sets-slider') as HTMLInputElement;
      const restSlider = document.querySelector('.rest-slider') as HTMLInputElement;
      
      if (repsSlider) {
        const repsProgress = ((reps - 1) / (50 - 1)) * 100;
        repsSlider.style.setProperty('--range-progress', `${repsProgress}%`);
      }
      
      if (setsSlider) {
        const setsProgress = ((sets - 1) / (10 - 1)) * 100;
        setsSlider.style.setProperty('--range-progress', `${setsProgress}%`);
      }
      
      if (restSlider) {
        const restProgress = ((restTime - 30) / (300 - 30)) * 100;
        restSlider.style.setProperty('--range-progress', `${restProgress}%`);
      }
    };
    
    updateSliderProgress();
  }, [reps, sets, restTime]);

  const handleStartWorkout = async () => {
    await startWorkout(workoutConfig);
    onStartWorkout();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="bg-gray-800 border-gray-700 p-6 rounded-xl max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">Configure Workout</h2>
          <Button
            variant="ghost"
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            ×
          </Button>
        </div>

        <div className="space-y-6">
          {/* Exercise Selection */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-white font-medium">Exercise</span>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white p-1"
                onClick={() => {
                  // TODO: Add custom exercise functionality
                  console.log('Add custom exercise');
                }}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <select
              value={exercise}
              onChange={(e) => updateWorkoutConfig({ exercise: e.target.value })}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-orange-500 focus:outline-none"
            >
              {exerciseOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          {/* Bodyweight Toggle */}
          <div className="flex items-center justify-between">
            <span className="text-white font-medium">Bodyweight Exercise</span>
            <button
              type="button"
              onClick={() => updateWorkoutConfig({ isBodyweight: !isBodyweight })}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isBodyweight ? 'bg-orange-600' : 'bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isBodyweight ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Weight Selection */}
          {!isBodyweight && (
            <div>
              <span className="text-white font-medium mb-3 block">Weight</span>
              <div className="flex gap-2 flex-wrap">
                {weights.map((weightOption) => (
                  <button
                    key={weightOption}
                    onClick={() => updateWorkoutConfig({ weight: weightOption })}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      weight === weightOption
                        ? 'bg-orange-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {weightOption}kg
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Reps Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-white font-medium">Reps</span>
              <span className="text-gray-400">{reps} reps</span>
            </div>
            <input
              type="range"
              min="1"
              max="50"
              value={reps}
              onChange={(e) => updateWorkoutConfig({ reps: Number(e.target.value) })}
              className="reps-slider w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-orange"
            />
          </div>

          {/* Sets Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-white font-medium">Sets</span>
              <span className="text-gray-400">{sets} sets</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={sets}
              onChange={(e) => updateWorkoutConfig({ sets: Number(e.target.value) })}
              className="sets-slider w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-orange"
            />
          </div>

          {/* Rest Time Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-white font-medium">Rest Time</span>
              <span className="text-gray-400">{restTime} seconds</span>
            </div>
            <input
              type="range"
              min="30"
              max="300"
              step="30"
              value={restTime}
              onChange={(e) => updateWorkoutConfig({ restTime: Number(e.target.value) })}
              className="rest-slider w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-orange"
            />
          </div>

          {/* Start Workout Button */}
          <Button
            onClick={handleStartWorkout}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 text-lg font-medium transition-all hover:scale-105"
          >
            <Play className="w-5 h-5 mr-2" />
            Start Workout
          </Button>
        </div>
      </Card>

    </div>
  );
};