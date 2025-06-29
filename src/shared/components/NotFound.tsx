import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export function NotFound() {
  const { t } = useTranslation()

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-4">
        {t('pages.notFound.title', 'Page Not Found')}
      </h2>
      <p className="text-gray-600 mb-8 max-w-md">
        {t('pages.notFound.description', 'The page you are looking for does not exist or has been moved.')}
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        {t('pages.notFound.backHome', 'Back to Home')}
      </Link>
    </div>
  )
}