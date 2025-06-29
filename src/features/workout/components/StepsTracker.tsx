import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Activity, Plus, Target } from 'lucide-react';

export const StepsTracker = () => {
  const [dailySteps, setDailySteps] = useState(0);
  const [stepGoal, setStepGoal] = useState(10000);
  const [isTracking, setIsTracking] = useState(false);

  useEffect(() => {
    // Load stored data
    const storedSteps = localStorage.getItem('dailySteps');
    const storedGoal = localStorage.getItem('stepGoal');
    const today = new Date().toDateString();
    const lastTrackedDate = localStorage.getItem('lastTrackedDate');

    if (storedSteps && lastTrackedDate === today) {
      setDailySteps(parseInt(storedSteps));
    } else if (lastTrackedDate !== today) {
      // Reset steps for new day
      setDailySteps(0);
      localStorage.setItem('dailySteps', '0');
      localStorage.setItem('lastTrackedDate', today);
    }

    if (storedGoal) {
      setStepGoal(parseInt(storedGoal));
    }

    // Check if device supports step tracking
    if ('permissions' in navigator && 'query' in navigator.permissions) {
      navigator.permissions.query({ name: 'accelerometer' as PermissionName }).then(result => {
        setIsTracking(result.state === 'granted');
      });
    }
  }, []);

  const addSteps = (steps: number) => {
    const newSteps = dailySteps + steps;
    setDailySteps(newSteps);
    localStorage.setItem('dailySteps', newSteps.toString());
    localStorage.setItem('lastTrackedDate', new Date().toDateString());
  };

  const updateStepGoal = (newGoal: number) => {
    setStepGoal(newGoal);
    localStorage.setItem('stepGoal', newGoal.toString());
  };

  const progressPercentage = Math.min((dailySteps / stepGoal) * 100, 100);

  const requestStepPermission = async () => {
    try {
      // Request permission for device motion/step counter
      if ('DeviceMotionEvent' in window && typeof (DeviceMotionEvent as any).requestPermission === 'function') {
        const permission = await (DeviceMotionEvent as any).requestPermission();
        setIsTracking(permission === 'granted');
      } else {
        // For browsers that don't require permission
        setIsTracking(true);
      }
    } catch (error) {
      console.error('Failed to request step tracking permission:', error);
    }
  };

  return (
    <Card className="bg-gray-800 border-gray-700 p-6 rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-orange-500" />
          <h3 className="text-white font-semibold">Daily Steps</h3>
        </div>
        <div className="flex items-center gap-1 text-gray-400 text-sm">
          <Target className="w-4 h-4" />
          <span>{stepGoal.toLocaleString()}</span>
        </div>
      </div>

      {/* Steps Display */}
      <div className="text-center mb-4">
        <div className="text-4xl font-bold text-white mb-1">
          {dailySteps.toLocaleString()}
        </div>
        <p className="text-gray-400 text-sm">
          {(stepGoal - dailySteps) > 0 
            ? `${(stepGoal - dailySteps).toLocaleString()} steps to goal`
            : 'Goal achieved! 🎉'
          }
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="w-full bg-gray-700 rounded-full h-3">
          <div
            className="bg-orange-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>0</span>
          <span>{(progressPercentage).toFixed(1)}%</span>
          <span>{stepGoal.toLocaleString()}</span>
        </div>
      </div>

      {/* Manual Step Addition */}
      <div className="space-y-3">
        {!isTracking && (
          <Button
            onClick={requestStepPermission}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white text-sm"
          >
            Enable Step Tracking
          </Button>
        )}
        
        <div className="flex gap-2">
          <Button
            onClick={() => addSteps(1000)}
            variant="outline"
            className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700 text-sm"
          >
            <Plus className="w-3 h-3 mr-1" />
            1K
          </Button>
          <Button
            onClick={() => addSteps(2500)}
            variant="outline"
            className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700 text-sm"
          >
            <Plus className="w-3 h-3 mr-1" />
            2.5K
          </Button>
          <Button
            onClick={() => addSteps(5000)}
            variant="outline"
            className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700 text-sm"
          >
            <Plus className="w-3 h-3 mr-1" />
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
  );
};