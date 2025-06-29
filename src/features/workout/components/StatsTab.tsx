import { useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useWorkoutStore } from '../store/workoutStore';
import { StepsTracker } from './StepsTracker';

export const StatsTab = () => {
  const { stats, loadStats } = useWorkoutStore();

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  if (!stats) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gray-800 border-gray-700 p-6 rounded-xl animate-pulse">
            <div className="h-4 bg-gray-700 rounded mb-2"></div>
            <div className="h-8 bg-gray-700 rounded mb-1"></div>
            <div className="h-3 bg-gray-700 rounded w-1/2"></div>
          </Card>
          <Card className="bg-gray-800 border-gray-700 p-6 rounded-xl animate-pulse">
            <div className="h-4 bg-gray-700 rounded mb-2"></div>
            <div className="h-8 bg-gray-700 rounded mb-1"></div>
            <div className="h-3 bg-gray-700 rounded w-1/2"></div>
          </Card>
        </div>
      </div>
    );
  }

  const hasData = stats.totalWorkouts > 0;

  // Prepare data for charts
  const workoutsByDayData = Object.entries(stats.workoutsByDay).map(([day, count]) => ({
    day: day.slice(0, 3), // Shorten day names
    workouts: count
  }));

  const weightOverTimeData = stats.weightOverTime.map(item => ({
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    weight: item.weight
  }));

  return (
    <div className="space-y-6">
      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-800 border-gray-700 p-6 rounded-xl">
          <h3 className="text-white text-lg font-semibold mb-2">Total Weight Lifted</h3>
          <div className="text-4xl font-bold text-white mb-1">{stats.totalWeight}kg</div>
          <p className="text-gray-400 text-sm">
            Across {stats.totalWorkouts} workout{stats.totalWorkouts !== 1 ? 's' : ''}
          </p>
        </Card>

        <Card className="bg-gray-800 border-gray-700 p-6 rounded-xl">
          <h3 className="text-white text-lg font-semibold mb-2">Most Used Weight</h3>
          <div className="text-4xl font-bold text-white mb-1">
            {hasData ? `${stats.mostUsedWeight}kg` : '0kg'}
          </div>
          <p className="text-gray-400 text-sm">
            {hasData ? stats.preferredKettlebell : 'Your preferred kettlebell'}
          </p>
        </Card>
      </div>

      {/* Weight Lifted Over Time Chart */}
      <Card className="bg-gray-800 border-gray-700 p-6 rounded-xl">
        <h3 className="text-white text-lg font-semibold mb-2">Weight Lifted Over Time</h3>
        <p className="text-gray-400 text-sm mb-4">Total weight lifted in recent workouts</p>
        
        {hasData && weightOverTimeData.length > 0 ? (
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={weightOverTimeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="date" 
                stroke="#9CA3AF"
                fontSize={12}
              />
              <YAxis 
                stroke="#9CA3AF"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '0.5rem',
                  color: '#F3F4F6'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="weight" 
                stroke="#EA580C" 
                strokeWidth={2}
                dot={{ fill: '#EA580C', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#EA580C', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-48 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <div className="text-lg mb-2">📊</div>
              <p>No data available yet</p>
              <p className="text-xs">Complete workouts to see your progress</p>
            </div>
          </div>
        )}
      </Card>

      {/* Steps Tracker */}
      <StepsTracker />

      {/* Workouts by Day Chart */}
      <Card className="bg-gray-800 border-gray-700 p-6 rounded-xl">
        <h3 className="text-white text-lg font-semibold mb-2">Workouts by Day</h3>
        <p className="text-gray-400 text-sm mb-4">Number of workouts per day of the week</p>
        
        {hasData && workoutsByDayData.length > 0 ? (
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={workoutsByDayData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="day" 
                stroke="#9CA3AF"
                fontSize={12}
              />
              <YAxis 
                stroke="#9CA3AF"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '0.5rem',
                  color: '#F3F4F6'
                }}
              />
              <Bar 
                dataKey="workouts" 
                fill="#EA580C"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-48 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <div className="text-lg mb-2">📅</div>
              <p>No workout data available</p>
              <p className="text-xs">Start tracking your workouts to see patterns</p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};