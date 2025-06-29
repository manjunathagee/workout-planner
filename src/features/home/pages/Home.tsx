import { useTranslation } from 'react-i18next'
import { FeatureCard } from '../components/FeatureCard'

const features = [
  {
    icon: '⚡',
    titleKey: 'pages.home.features.modern',
    descKey: 'pages.home.features.modernDesc',
  },
  {
    icon: '🏗️',
    titleKey: 'pages.home.features.architecture',
    descKey: 'pages.home.features.architectureDesc',
  },
  {
    icon: '🔄',
    titleKey: 'pages.home.features.state',
    descKey: 'pages.home.features.stateDesc',
  },
  {
    icon: '🧪',
    titleKey: 'pages.home.features.testing',
    descKey: 'pages.home.features.testingDesc',
  },
  {
    icon: '🎨',
    titleKey: 'pages.home.features.ui',
    descKey: 'pages.home.features.uiDesc',
  },
  {
    icon: '🌍',
    titleKey: 'pages.home.features.i18n',
    descKey: 'pages.home.features.i18nDesc',
  },
]

export function Home() {
  const { t } = useTranslation()

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-foreground">
          {t('pages.home.title')}
        </h1>
        <p className="text-xl text-muted-foreground">
          {t('pages.home.subtitle')}
        </p>
      </div>
      
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-center text-foreground">
          {t('pages.home.features.title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={t(feature.titleKey)}
              description={t(feature.descKey)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}