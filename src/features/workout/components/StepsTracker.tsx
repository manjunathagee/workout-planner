import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Activity, Plus, Target } from 'lucide-react'

export const StepsTracker = () => {
  const [dailySteps, setDailySteps] = useState(0)
  const [stepGoal, setStepGoal] = useState(10000)
  const [isTracking, setIsTracking] = useState(false)

  useEffect(() => {
    // Load stored data
    const storedSteps = localStorage.getItem('dailySteps')
    const storedGoal = localStorage.getItem('stepGoal')
    const today = new Date().toDateString()
    const lastTrackedDate = localStorage.getItem('lastTrackedDate')

    if (storedSteps && lastTrackedDate === today) {
      setDailySteps(parseInt(storedSteps))
    } else if (lastTrackedDate !== today) {
      // Reset steps for new day
      setDailySteps(0)
      localStorage.setItem('dailySteps', '0')
      localStorage.setItem('lastTrackedDate', today)
    }

    if (storedGoal) {
      setStepGoal(parseInt(storedGoal))
    }

    // Check if device supports step tracking
    if ('permissions' in navigator && 'query' in navigator.permissions) {
      navigator.permissions.query({ name: 'accelerometer' as never }).then((result) => {
        setIsTracking(result.state === 'granted')
      })
    }
  }, [])

  const addSteps = (steps: number) => {
    const newSteps = dailySteps + steps
    setDailySteps(newSteps)
    localStorage.setItem('dailySteps', newSteps.toString())
    localStorage.setItem('lastTrackedDate', new Date().toDateString())
  }

  const updateStepGoal = (newGoal: number) => {
    setStepGoal(newGoal)
    localStorage.setItem('stepGoal', newGoal.toString())
  }

  const progressPercentage = Math.min((dailySteps / stepGoal) * 100, 100)

  const requestStepPermission = async () => {
    try {
      // Request permission for device motion/step counter
      if (
        'DeviceMotionEvent' in window &&
        typeof (DeviceMotionEvent as unknown as { requestPermission?: () => Promise<string> })
          .requestPermission === 'function'
      ) {
        const permission = await (
          DeviceMotionEvent as unknown as { requestPermission: () => Promise<string> }
        ).requestPermission()
        setIsTracking(permission === 'granted')
      } else {
        // For browsers that don't require permission
        setIsTracking(true)
      }
    } catch (error) {
      console.error('Failed to request step tracking permission:', error)
    }
  }

  return (
    <Card className="rounded-xl border-gray-700 bg-gray-800 p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-orange-500" />
          <h3 className="font-semibold text-white">Daily Steps</h3>
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-400">
          <Target className="h-4 w-4" />
          <span>{stepGoal.toLocaleString()}</span>
        </div>
      </div>

      {/* Steps Display */}
      <div className="mb-4 text-center">
        <div className="mb-1 text-4xl font-bold text-white">{dailySteps.toLocaleString()}</div>
        <p className="text-sm text-gray-400">
          {stepGoal - dailySteps > 0
            ? `${(stepGoal - dailySteps).toLocaleString()} steps to goal`
            : 'Goal achieved! 🎉'}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="h-3 w-full rounded-full bg-gray-700">
          <div
            className="h-3 rounded-full bg-orange-600 transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <div className="mt-1 flex justify-between text-xs text-gray-400">
          <span>0</span>
          <span>{progressPercentage.toFixed(1)}%</span>
          <span>{stepGoal.toLocaleString()}</span>
        </div>
      </div>

      {/* Manual Step Addition */}
      <div className="space-y-3">
        {!isTracking && (
          <Button
            onClick={requestStepPermission}
            className="w-full bg-orange-600 text-sm text-white hover:bg-orange-700"
          >
            Enable Step Tracking
          </Button>
        )}

        <div className="flex gap-2">
          <Button
            onClick={() => addSteps(1000)}
            variant="outline"
            className="flex-1 border-gray-600 text-sm text-gray-300 hover:bg-gray-700"
          >
            <Plus className="mr-1 h-3 w-3" />
            1K
          </Button>
          <Button
            onClick={() => addSteps(2500)}
            variant="outline"
            className="flex-1 border-gray-600 text-sm text-gray-300 hover:bg-gray-700"
          >
            <Plus className="mr-1 h-3 w-3" />
            2.5K
          </Button>
          <Button
            onClick={() => addSteps(5000)}
            variant="outline"
            className="flex-1 border-gray-600 text-sm text-gray-300 hover:bg-gray-700"
          >
            <Plus className="mr-1 h-3 w-3" />
            5K
          </Button>
        </div>

        {/* Goal Adjustment */}
        <div className="flex gap-2 text-xs">
          <Button
            onClick={() => updateStepGoal(8000)}
            variant="ghost"
            className={`flex-1 text-gray-400 hover:text-white ${stepGoal === 8000 ? 'bg-gray-700' : ''}`}
          >
            8K Goal
          </Button>
          <Button
            onClick={() => updateStepGoal(10000)}
            variant="ghost"
            className={`flex-1 text-gray-400 hover:text-white ${stepGoal === 10000 ? 'bg-gray-700' : ''}`}
          >
            10K Goal
          </Button>
          <Button
            onClick={() => updateStepGoal(12000)}
            variant="ghost"
            className={`flex-1 text-gray-400 hover:text-white ${stepGoal === 12000 ? 'bg-gray-700' : ''}`}
          >
            12K Goal
          </Button>
        </div>
      </div>
    </Card>
  )
}
