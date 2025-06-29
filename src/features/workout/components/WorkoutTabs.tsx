import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { StatsTab } from './StatsTab'
import { HistoryTab } from './HistoryTab'
import { CalendarTab } from './CalendarTab'
import { PlansTab } from './PlansTab'

type TabType = 'history' | 'stats' | 'calendar' | 'plans'

export const WorkoutTabs = () => {
  const [activeTab, setActiveTab] = useState<TabType>('stats')

  const tabs = [
    { id: 'history' as const, label: 'History' },
    { id: 'stats' as const, label: 'Stats' },
    { id: 'calendar' as const, label: 'Calendar' },
    { id: 'plans' as const, label: 'Plans' },
  ]

  return (
    <div className="min-h-screen bg-gray-900 p-4 text-white">
      {/* Navigation Tabs */}
      <div className="mb-6 flex space-x-1">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? 'default' : 'ghost'}
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-lg px-6 py-3 font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-gray-800 text-white'
                : 'bg-transparent text-gray-400 hover:text-white'
            }`}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'history' && <HistoryTab />}
        {activeTab === 'stats' && <StatsTab />}
        {activeTab === 'calendar' && <CalendarTab />}
        {activeTab === 'plans' && <PlansTab />}
      </div>
    </div>
  )
}
