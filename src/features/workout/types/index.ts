export interface Exercise {
  id: string;
  name: string;
  type: 'strength' | 'cardio' | 'mobility' | 'yoga';
  sets: number;
  reps: number;
  weight: number;
  restInterval: number;
  notes: string;
}

export interface WorkoutPlan {
  id: string;
  name: string;
  description: string;
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  timesPerWeek: number;
  exercises: Exercise[];
  goals: Goal[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Goal {
  id: string;
  target: number;
  achieved: number;
  type: 'weight' | 'reps' | 'duration';
}

export interface WorkoutSession {
  id: string;
  planId: string;
  date: Date;
  exercises: CompletedExercise[];
  duration: number;
  notes: string;
  completed: boolean;
}

export interface CompletedExercise extends Exercise {
  actualSets: number;
  actualReps: number;
  actualWeight: number;
  completed: boolean;
}

export interface WorkoutStats {
  totalWeight: number;
  totalWorkouts: number;
  mostUsedWeight: number;
  preferredKettlebell: string;
  workoutsByDay: { [key: string]: number };
  weightOverTime: { date: string; weight: number }[];
}