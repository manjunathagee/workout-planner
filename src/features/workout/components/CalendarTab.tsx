import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const CalendarTab = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'year'>('month');

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className="space-y-6">
      {/* Calendar View Toggle */}
      <div className="flex justify-center">
        <div className="flex bg-gray-800 rounded-lg p-1">
          <Button
            variant={viewMode === 'month' ? 'default' : 'ghost'}
            onClick={() => setViewMode('month')}
            className={`px-6 py-2 rounded-md ${
              viewMode === 'month' 
                ? 'bg-gray-700 text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Month
          </Button>
          <Button
            variant={viewMode === 'year' ? 'default' : 'ghost'}
            onClick={() => setViewMode('year')}
            className={`px-6 py-2 rounded-md ${
              viewMode === 'year' 
                ? 'bg-gray-700 text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Year
          </Button>
        </div>
      </div>

      {/* Calendar Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => navigateMonth('prev')}
          className="p-2 hover:bg-gray-800 rounded-lg"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        
        <h2 className="text-2xl font-semibold text-white">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        
        <Button
          variant="ghost"
          onClick={() => navigateMonth('next')}
          className="p-2 hover:bg-gray-800 rounded-lg"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      {/* Calendar Grid */}
      <Card className="bg-gray-800 border-gray-700 p-6 rounded-xl">
        {/* Days of Week Header */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {daysOfWeek.map((day) => (
            <div key={day} className="text-center text-gray-400 font-medium py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-2">
          {days.map((day, index) => (
            <div
              key={index}
              className={`
                aspect-square flex items-center justify-center rounded-lg border border-gray-700
                ${day ? 'hover:bg-gray-700 cursor-pointer' : ''}
                ${day ? 'text-white' : 'text-transparent'}
              `}
            >
              {day}
            </div>
          ))}
        </div>
      </Card>

      {/* Monthly Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-800 border-gray-700 p-6 rounded-xl">
          <h3 className="text-white text-lg font-semibold mb-2">Workouts This Month</h3>
          <div className="text-4xl font-bold text-white mb-1">0</div>
          <p className="text-gray-400 text-sm">~0.0 per week</p>
        </Card>

        <Card className="bg-gray-800 border-gray-700 p-6 rounded-xl">
          <h3 className="text-white text-lg font-semibold mb-2">Total Weight</h3>
          <div className="text-4xl font-bold text-white mb-1">0kg</div>
          <p className="text-gray-400 text-sm">This month</p>
        </Card>
      </div>
    </div>
  );
};