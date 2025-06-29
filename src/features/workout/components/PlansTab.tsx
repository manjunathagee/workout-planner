import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Clock, Dumbbell, Target, MoreVertical, Copy, Play, Edit } from 'lucide-react';
import { useWorkoutStore } from '../store/workoutStore';
import type { WorkoutPlan } from '../types';

export const PlansTab = () => {
  const { workoutPlans, createWorkoutPlan, loadWorkoutPlans, startWorkout } = useWorkoutStore();
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    loadWorkoutPlans();
  }, [loadWorkoutPlans]);

  const handleCreateQuickPlan = async () => {
    setIsCreating(true);
    try {
      // Randomly select between different plan types
      const planTypes = ['strength', 'mobility', 'yoga'];
      const selectedType = planTypes[Math.floor(Math.random() * planTypes.length)];
      
      let quickPlan: Omit<WorkoutPlan, 'id' | 'createdAt' | 'updatedAt'>;
      
      if (selectedType === 'mobility') {
        quickPlan = {
          name: 'Daily Mobility Routine',
          description: 'A gentle mobility routine to improve flexibility and movement',
          frequency: 'daily',
          timesPerWeek: 7,
          exercises: [
            {
              id: crypto.randomUUID(),
              name: 'Hip Circles',
              type: 'mobility',
              sets: 2,
              reps: 10,
              weight: 0,
              restInterval: 30,
              notes: 'Slow controlled circles in both directions'
            },
            {
              id: crypto.randomUUID(),
              name: 'Cat-Cow Stretch',
              type: 'mobility',
              sets: 1,
              reps: 15,
              weight: 0,
              restInterval: 30,
              notes: 'Focus on spinal movement'
            },
            {
              id: crypto.randomUUID(),
              name: 'Hip Flexor Stretch',
              type: 'mobility',
              sets: 2,
              reps: 30,
              weight: 0,
              restInterval: 30,
              notes: 'Hold for 30 seconds each side'
            }
          ],
          goals: [
            {
              id: crypto.randomUUID(),
              target: 30,
              achieved: 0,
              type: 'duration'
            }
          ]
        };
      } else if (selectedType === 'yoga') {
        quickPlan = {
          name: 'Morning Yoga Flow',
          description: 'A calming yoga sequence to start your day',
          frequency: 'daily',
          timesPerWeek: 5,
          exercises: [
            {
              id: crypto.randomUUID(),
              name: 'Sun Salutation',
              type: 'yoga',
              sets: 3,
              reps: 1,
              weight: 0,
              restInterval: 60,
              notes: 'Flow through the complete sequence'
            },
            {
              id: crypto.randomUUID(),
              name: 'Warrior II',
              type: 'yoga',
              sets: 2,
              reps: 1,
              weight: 0,
              restInterval: 30,
              notes: 'Hold for 30 seconds each side'
            },
            {
              id: crypto.randomUUID(),
              name: 'Child\'s Pose',
              type: 'yoga',
              sets: 1,
              reps: 1,
              weight: 0,
              restInterval: 0,
              notes: 'Rest and breathe deeply'
            }
          ],
          goals: [
            {
              id: crypto.randomUUID(),
              target: 20,
              achieved: 0,
              type: 'duration'
            }
          ]
        };
      } else {
        // Default strength plan
        quickPlan = {
          name: 'Quick Kettlebell Workout',
          description: 'A simple kettlebell workout for daily training',
          frequency: 'daily',
          timesPerWeek: 5,
          exercises: [
            {
              id: crypto.randomUUID(),
              name: 'Kettlebell Swing',
              type: 'strength',
              sets: 3,
              reps: 15,
              weight: 24,
              restInterval: 60,
              notes: 'Focus on hip hinge movement'
            },
            {
              id: crypto.randomUUID(),
              name: 'Turkish Get-Up',
              type: 'strength',
              sets: 2,
              reps: 5,
              weight: 16,
              restInterval: 90,
              notes: 'Perform slowly with control'
            }
          ],
          goals: [
            {
              id: crypto.randomUUID(),
              target: 1000,
              achieved: 0,
              type: 'weight'
            }
          ]
        };
      }

      await createWorkoutPlan(quickPlan);
    } catch (error) {
      console.error('Failed to create workout plan:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleClonePlan = async (plan: WorkoutPlan) => {
    setIsCreating(true);
    try {
      const clonedPlan: Omit<WorkoutPlan, 'id' | 'createdAt' | 'updatedAt'> = {
        name: `${plan.name} (Copy)`,
        description: plan.description,
        frequency: plan.frequency,
        timesPerWeek: plan.timesPerWeek,
        exercises: plan.exercises.map(exercise => ({
          ...exercise,
          id: crypto.randomUUID() // New ID for cloned exercise
        })),
        goals: plan.goals.map(goal => ({
          ...goal,
          id: crypto.randomUUID(), // New ID for cloned goal
          achieved: 0 // Reset progress
        }))
      };

      await createWorkoutPlan(clonedPlan);
    } catch (error) {
      console.error('Failed to clone workout plan:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleStartPlanWorkout = async (plan: WorkoutPlan) => {
    if (plan.exercises.length > 0) {
      const firstExercise = plan.exercises[0];
      const workoutConfig = {
        exercise: firstExercise.name,
        isBodyweight: firstExercise.weight === 0,
        weight: firstExercise.weight,
        reps: firstExercise.reps,
        sets: firstExercise.sets,
        restTime: firstExercise.restInterval
      };
      
      await startWorkout(workoutConfig);
    }
  };

  const formatFrequency = (frequency: string, timesPerWeek: number) => {
    switch (frequency) {
      case 'daily':
        return 'Daily';
      case 'weekly':
        return `${timesPerWeek}x per week`;
      case 'monthly':
        return 'Monthly';
      case 'quarterly':
        return 'Quarterly';
      default:
        return frequency;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-white">Workout Plans</h2>
        <Button 
          className="bg-orange-600 hover:bg-orange-700 text-white"
          onClick={handleCreateQuickPlan}
          disabled={isCreating}
        >
          <Plus className="w-4 h-4 mr-2" />
          {isCreating ? 'Creating...' : 'Create Plan'}
        </Button>
      </div>

      {/* Plans List */}
      {workoutPlans.length === 0 ? (
        <Card className="bg-gray-800 border-gray-700 p-8 rounded-xl">
          <div className="text-center text-gray-400">
            <div className="text-4xl mb-4">💪</div>
            <h3 className="text-lg font-medium mb-2">No workout plans yet</h3>
            <p className="text-sm mb-4">Create your first workout plan to get started with your fitness journey.</p>
            <Button 
              className="bg-orange-600 hover:bg-orange-700 text-white"
              onClick={handleCreateQuickPlan}
              disabled={isCreating}
            >
              <Plus className="w-4 h-4 mr-2" />
              {isCreating ? 'Creating...' : 'Create Your First Plan'}
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid gap-4">
          {workoutPlans.map((plan) => (
            <Card key={plan.id} className="bg-gray-800 border-gray-700 p-6 rounded-xl hover:bg-gray-750 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-400 text-sm mb-3">{plan.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {formatFrequency(plan.frequency, plan.timesPerWeek)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Dumbbell className="w-4 h-4" />
                      {plan.exercises.length} exercise{plan.exercises.length !== 1 ? 's' : ''}
                    </div>
                    <div className="flex items-center gap-1">
                      <Target className="w-4 h-4" />
                      {plan.goals.length} goal{plan.goals.length !== 1 ? 's' : ''}
                    </div>
                  </div>
                </div>
                
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>

              {/* Exercise Preview */}
              <div className="space-y-2 mb-4">
                <h4 className="text-sm font-medium text-gray-300">Exercises:</h4>
                {plan.exercises.slice(0, 3).map((exercise) => (
                  <div key={exercise.id} className="flex justify-between items-center text-sm">
                    <span className="text-white">{exercise.name}</span>
                    <span className="text-gray-400">
                      {exercise.sets}x{exercise.reps} @ {exercise.weight}kg
                    </span>
                  </div>
                ))}
                {plan.exercises.length > 3 && (
                  <p className="text-xs text-gray-500">+{plan.exercises.length - 3} more exercises</p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button 
                  className="bg-orange-600 hover:bg-orange-700 text-white flex-1"
                  onClick={() => handleStartPlanWorkout(plan)}
                >
                  <Play className="w-4 h-4 mr-1" />
                  Start Workout
                </Button>
                <Button 
                  variant="outline" 
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                  onClick={() => handleClonePlan(plan)}
                  disabled={isCreating}
                  title="Clone plan"
                >
                  <Copy className="w-4 h-4" />
                </Button>
                <Button 
                  variant="outline" 
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                  title="Edit plan"
                >
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};