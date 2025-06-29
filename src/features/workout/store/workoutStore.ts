import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import type {
  WorkoutPlan,
  WorkoutSession,
  Exercise,
  CompletedExercise,
  WorkoutStats,
} from '../types'
import { dbHelpers } from '@/lib/database'

interface WorkoutState {
  // Data
  workoutPlans: WorkoutPlan[]
  currentSession: WorkoutSession | null
  stats: WorkoutStats | null
  recentSessions: WorkoutSession[]

  // UI State
  isLoading: boolean
  error: string | null
  currentExerciseIndex: number
  currentSetIndex: number
  isRestMode: boolean
  restTimeRemaining: number

  // Current workout configuration
  selectedPlan: WorkoutPlan | null
  workoutConfig: {
    exercise: string
    isBodyweight: boolean
    weight: number
    reps: number
    sets: number
    restTime: number
  }
}

interface WorkoutActions {
  // Data actions
  loadWorkoutPlans: () => Promise<void>
  loadStats: () => Promise<void>
  loadRecentSessions: () => Promise<void>

  // Workout plan management
  createWorkoutPlan: (plan: Omit<WorkoutPlan, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
  updateWorkoutPlan: (id: string, updates: Partial<WorkoutPlan>) => Promise<void>
  deleteWorkoutPlan: (id: string) => Promise<void>

  // Workout session management
  startWorkout: (config: WorkoutState['workoutConfig']) => Promise<void>
  completeExercise: (exercise: CompletedExercise) => void
  completeSet: () => void
  startRest: () => void
  skipRest: () => void
  extendRest: (seconds: number) => void
  finishWorkout: () => Promise<void>

  // Configuration
  updateWorkoutConfig: (config: Partial<WorkoutState['workoutConfig']>) => void

  // UI actions
  setError: (error: string | null) => void
  clearSession: () => void

  // Settings
  clearAllData: () => Promise<void>
}

const initialWorkoutConfig = {
  exercise: 'Swing',
  isBodyweight: false,
  weight: 24,
  reps: 10,
  sets: 3,
  restTime: 60,
}

export const useWorkoutStore = create<WorkoutState & WorkoutActions>()(
  subscribeWithSelector((set, get) => ({
    // Initial state
    workoutPlans: [],
    currentSession: null,
    stats: null,
    recentSessions: [],
    isLoading: false,
    error: null,
    currentExerciseIndex: 0,
    currentSetIndex: 0,
    isRestMode: false,
    restTimeRemaining: 0,
    selectedPlan: null,
    workoutConfig: initialWorkoutConfig,

    // Data actions
    loadWorkoutPlans: async () => {
      try {
        set({ isLoading: true, error: null })
        const plans = await dbHelpers.getWorkoutPlans()
        set({ workoutPlans: plans, isLoading: false })
      } catch (error) {
        set({ error: (error as Error).message, isLoading: false })
      }
    },

    loadStats: async () => {
      try {
        const stats = await dbHelpers.getStats()
        set({ stats })
      } catch (error) {
        set({ error: (error as Error).message })
      }
    },

    loadRecentSessions: async () => {
      try {
        const sessions = await dbHelpers.getWorkoutSessions(10)
        set({ recentSessions: sessions })
      } catch (error) {
        set({ error: (error as Error).message })
      }
    },

    // Workout plan management
    createWorkoutPlan: async (planData) => {
      try {
        set({ isLoading: true, error: null })
        await dbHelpers.createWorkoutPlan(planData)
        await get().loadWorkoutPlans()
      } catch (error) {
        set({ error: (error as Error).message, isLoading: false })
      }
    },

    updateWorkoutPlan: async (id, updates) => {
      try {
        await dbHelpers.updateWorkoutPlan(id, updates)
        await get().loadWorkoutPlans()
      } catch (error) {
        set({ error: (error as Error).message })
      }
    },

    deleteWorkoutPlan: async (id) => {
      try {
        await dbHelpers.deleteWorkoutPlan(id)
        await get().loadWorkoutPlans()
      } catch (error) {
        set({ error: (error as Error).message })
      }
    },

    // Workout session management
    startWorkout: async (config) => {
      try {
        const _exercise: Exercise = {
          id: crypto.randomUUID(),
          name: config.exercise,
          type: 'strength',
          sets: config.sets,
          reps: config.reps,
          weight: config.isBodyweight ? 0 : config.weight,
          restInterval: config.restTime,
          notes: '',
        }

        const session: WorkoutSession = {
          id: crypto.randomUUID(),
          planId: '', // Quick workout, no plan
          date: new Date(),
          exercises: [],
          duration: 0,
          notes: '',
          completed: false,
        }

        set({
          currentSession: session,
          currentExerciseIndex: 0,
          currentSetIndex: 0,
          isRestMode: false,
          workoutConfig: config,
        })
      } catch (error) {
        set({ error: (error as Error).message })
      }
    },

    completeExercise: (exercise) => {
      const { currentSession } = get()
      if (!currentSession) return

      const updatedSession = {
        ...currentSession,
        exercises: [...currentSession.exercises, exercise],
      }

      set({ currentSession: updatedSession })
    },

    completeSet: () => {
      const { currentSetIndex, workoutConfig, isRestMode: _isRestMode } = get()

      if (currentSetIndex < workoutConfig.sets - 1) {
        set({
          currentSetIndex: currentSetIndex + 1,
          isRestMode: true,
          restTimeRemaining: workoutConfig.restTime,
        })
      } else {
        // Exercise completed
        get().finishWorkout()
      }
    },

    startRest: () => {
      const { workoutConfig } = get()
      set({
        isRestMode: true,
        restTimeRemaining: workoutConfig.restTime,
      })
    },

    skipRest: () => {
      set({
        isRestMode: false,
        restTimeRemaining: 0,
      })
    },

    extendRest: (seconds) => {
      const { restTimeRemaining } = get()
      set({ restTimeRemaining: restTimeRemaining + seconds })
    },

    finishWorkout: async () => {
      try {
        const { currentSession } = get()
        if (!currentSession) return

        const completedSession = {
          ...currentSession,
          completed: true,
          duration: Date.now() - currentSession.date.getTime(),
        }

        await dbHelpers.createWorkoutSession(completedSession)
        await get().loadStats()
        await get().loadRecentSessions()

        set({
          currentSession: null,
          currentExerciseIndex: 0,
          currentSetIndex: 0,
          isRestMode: false,
          restTimeRemaining: 0,
        })
      } catch (error) {
        set({ error: (error as Error).message })
      }
    },

    // Configuration
    updateWorkoutConfig: (config) => {
      set({
        workoutConfig: {
          ...get().workoutConfig,
          ...config,
        },
      })
    },

    // UI actions
    setError: (error) => set({ error }),

    clearSession: () => {
      set({
        currentSession: null,
        currentExerciseIndex: 0,
        currentSetIndex: 0,
        isRestMode: false,
        restTimeRemaining: 0,
      })
    },

    // Settings
    clearAllData: async () => {
      try {
        await dbHelpers.clearAllData()
        set({
          workoutPlans: [],
          currentSession: null,
          stats: null,
          recentSessions: [],
          currentExerciseIndex: 0,
          currentSetIndex: 0,
          isRestMode: false,
          restTimeRemaining: 0,
        })
      } catch (error) {
        set({ error: (error as Error).message })
      }
    },
  }))
)

// Auto-load data on store creation
useWorkoutStore.getState().loadWorkoutPlans()
useWorkoutStore.getState().loadStats()
useWorkoutStore.getState().loadRecentSessions()
