import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Sun, Moon, Wifi, Download, Upload, RotateCcw, FileUp } from 'lucide-react';
import { useWorkoutStore } from '../store/workoutStore';
import { dbHelpers } from '@/lib/database';

export const WorkoutHeader = () => {
  const [isDark, setIsDark] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { clearAllData, recentSessions, loadWorkoutPlans, loadStats, loadRecentSessions } = useWorkoutStore();

  const handleThemeToggle = () => {
    setIsDark(!isDark);
    // Toggle dark class on document
    document.documentElement.classList.toggle('dark');
  };

  const handleExport = () => {
    if (recentSessions.length === 0) {
      alert('No workout data to export');
      return;
    }

    const dataToExport = {
      exportDate: new Date().toISOString(),
      workouts: recentSessions
    };

    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], {
      type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kettlebell-workout-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleReset = async () => {
    if (confirm('Are you sure you want to clear all workout data? This action cannot be undone.')) {
      await clearAllData();
      alert('All workout data has been cleared.');
    }
  };

  const handleImport = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const data = JSON.parse(text);
      
      if (data.workouts && Array.isArray(data.workouts)) {
        // Import workout sessions
        for (const workout of data.workouts) {
          await dbHelpers.createWorkoutSession({
            ...workout,
            id: crypto.randomUUID(), // Generate new ID to avoid conflicts
            date: new Date(workout.date)
          });
        }
        
        // Refresh all data
        await loadWorkoutPlans();
        await loadStats();
        await loadRecentSessions();
        
        alert(`Successfully imported ${data.workouts.length} workouts!`);
      } else {
        alert('Invalid file format. Please select a valid workout data file.');
      }
    } catch (error) {
      alert('Error importing file. Please check the file format.');
      console.error('Import error:', error);
    }
    
    // Clear the input
    event.target.value = '';
  };

  const handleInstallApp = () => {
    // Check if PWA installation is available
    if ('serviceWorker' in navigator) {
      alert('To install this app, click "Add to Home Screen" in your browser menu.');
    } else {
      alert('PWA installation not supported in this browser.');
    }
  };

  return (
    <header className="flex items-center justify-between p-4 bg-gray-900 border-b border-gray-800">
      <h1 className="text-xl font-bold text-white">Kettlebell Tracker</h1>
      
      <div className="flex items-center gap-2">
        {/* Theme Toggle */}
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-gray-400 hover:text-white"
          onClick={handleThemeToggle}
          title="Toggle theme"
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </Button>
        
        {/* Online Status */}
        <div className="flex items-center gap-1 text-green-500 text-sm">
          <Wifi className="w-4 h-4" />
          <span className="hidden sm:inline">Online</span>
        </div>
        
        {/* Install App */}
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-gray-400 hover:text-white"
          onClick={handleInstallApp}
          title="Install as app"
        >
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline ml-1">Install App</span>
        </Button>
        
        {/* Import */}
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-gray-400 hover:text-white"
          onClick={handleImport}
          title="Import workout data"
        >
          <FileUp className="w-4 h-4" />
        </Button>
        
        {/* Export */}
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-gray-400 hover:text-white"
          onClick={handleExport}
          title="Export workout data"
        >
          <Upload className="w-4 h-4" />
        </Button>
        
        {/* Reset */}
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-gray-400 hover:text-white"
          onClick={handleReset}
          title="Clear all data"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>
      
      {/* Hidden file input for import */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileUpload}
        style={{ display: 'none' }}
      />
    </header>
  );
};