// Global type definitions

declare const __DEV__: boolean

interface ImportMetaEnv {
  readonly VITE_API_URL?: string
  readonly VITE_APP_TITLE?: string
  readonly VITE_ENABLE_DEV_TOOLS?: string
  readonly VITE_ENABLE_MOCK_API?: string
  readonly VITE_GOOGLE_ANALYTICS_ID?: string
  readonly VITE_SENTRY_DSN?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}