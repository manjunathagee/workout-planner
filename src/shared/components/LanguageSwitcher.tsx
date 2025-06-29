import { useTranslation } from 'react-i18next'

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
]

export function LanguageSwitcher() {
  const { i18n } = useTranslation()

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }

  return (
    <select
      value={i18n.language}
      onChange={(e) => changeLanguage(e.target.value)}
      className="px-3 py-1 border rounded-md bg-background text-foreground"
    >
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code} className="bg-background text-foreground">
          {lang.name}
        </option>
      ))}
    </select>
  )
}