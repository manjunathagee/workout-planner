import Dexie, { type EntityTable } from 'dexie';
import type { WorkoutPlan, Exercise, WorkoutSession, Goal } from '@/features/workout/types';

interface WorkoutDatabase extends Dexie {
  workoutPlans: EntityTable<WorkoutPlan, 'id'>;
  exercises: EntityTable<Exercise, 'id'>;
  sessions: EntityTable<WorkoutSession, 'id'>;
  goals: EntityTable<Goal, 'id'>;
  settings: EntityTable<{ key: string; value: any }, 'key'>;
}

export const db = new Dexie('WorkoutPlannerDB') as WorkoutDatabase;

db.version(1).stores({
  workoutPlans: '++id, name, frequency, createdAt, updatedAt',
  exercises: '++id, planId, name, type, sets, reps, weight, restInterval',
  sessions: '++id, planId, date, completed, duration',
  goals: '++id, planId, target, achieved, type',
  settings: '&key, value'
});

// Initialize default settings
db.on('ready', async () => {
  const settingsCount = await db.settings.count();
  if (settingsCount === 0) {
    await db.settings.bulkAdd([
      { key: 'theme', value: 'dark' },
      { key: 'defaultWeight', value: 24 },
      { key: 'defaultReps', value: 10 },
      { key: 'defaultSets', value: 3 },
      { key: 'defaultRestTime', value: 60 },
      { key: 'soundEnabled', value: true }
    ]);
  }
});

export const dbHelpers = {
  // Workout Plans
  createWorkoutPlan: async (plan: Omit<WorkoutPlan, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date();
    return await db.workoutPlans.add({
      ...plan,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now
    });
  },

  getWorkoutPlans: async () => {
    return await db.workoutPlans.orderBy('updatedAt').reverse().toArray();
  },

  updateWorkoutPlan: async (id: string, updates: Partial<WorkoutPlan>) => {
    return await db.workoutPlans.update(id, {
      ...updates,
      updatedAt: new Date()
    });
  },

  deleteWorkoutPlan: async (id: string) => {
    await db.transaction('rw', [db.workoutPlans, db.exercises, db.sessions], async () => {
      await db.workoutPlans.delete(id);
      await db.exercises.where('planId').equals(id).delete();
      await db.sessions.where('planId').equals(id).delete();
    });
  },

  // Workout Sessions
  createWorkoutSession: async (session: Omit<WorkoutSession, 'id'>) => {
    return await db.sessions.add({
      ...session,
      id: crypto.randomUUID()
    });
  },

  getWorkoutSessions: async (limit?: number) => {
    const query = db.sessions.orderBy('date').reverse();
    return limit ? await query.limit(limit).toArray() : await query.toArray();
  },

  getSessionsByDateRange: async (startDate: Date, endDate: Date) => {
    return await db.sessions
      .where('date')
      .between(startDate, endDate, true, true)
      .toArray();
  },

  // Statistics
  getStats: async () => {
    const sessions = await db.sessions.where('completed').equals(true).toArray();
    
    const totalWeight = sessions.reduce((sum, session) => {
      return sum + session.exercises.reduce((exerciseSum, exercise) => {
        return exerciseSum + (exercise.actualWeight * exercise.actualSets * exercise.actualReps);
      }, 0);
    }, 0);

    const weights = sessions.flatMap(session => 
      session.exercises.map(exercise => exercise.actualWeight)
    );
    
    const weightCounts = weights.reduce((acc, weight) => {
      acc[weight] = (acc[weight] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);

    const mostUsedWeight = Object.keys(weightCounts).reduce((a, b) => 
      weightCounts[Number(a)] > weightCounts[Number(b)] ? a : b, '0'
    );

    // Workouts by day of week
    const workoutsByDay = sessions.reduce((acc, session) => {
      const day = session.date.getDay();
      const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][day];
      acc[dayName] = (acc[dayName] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Weight over time (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const recentSessions = sessions.filter(session => session.date >= thirtyDaysAgo);
    const weightOverTime = recentSessions.map(session => ({
      date: session.date.toISOString().split('T')[0],
      weight: session.exercises.reduce((sum, exercise) => 
        sum + (exercise.actualWeight * exercise.actualSets * exercise.actualReps), 0
      )
    }));

    return {
      totalWeight,
      totalWorkouts: sessions.length,
      mostUsedWeight: Number(mostUsedWeight),
      preferredKettlebell: `${mostUsedWeight}kg`,
      workoutsByDay,
      weightOverTime
    };
  },

  // Settings
  getSetting: async (key: string) => {
    const setting = await db.settings.get(key);
    return setting?.value;
  },

  setSetting: async (key: string, value: any) => {
    await db.settings.put({ key, value });
  },

  // Clear all data
  clearAllData: async () => {
    await db.transaction('rw', [db.workoutPlans, db.exercises, db.sessions, db.goals], async () => {
      await db.workoutPlans.clear();
      await db.exercises.clear();
      await db.sessions.clear();
      await db.goals.clear();
    });
  }
};

export default db;