// Environment variables with defaults and validation

export const env = {
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  APP_TITLE: import.meta.env.VITE_APP_TITLE || 'React Velocity Starter',
  ENABLE_DEV_TOOLS: import.meta.env.VITE_ENABLE_DEV_TOOLS === 'true',
  ENABLE_MOCK_API: import.meta.env.VITE_ENABLE_MOCK_API === 'true',
  
  // Optional analytics
  GOOGLE_ANALYTICS_ID: import.meta.env.VITE_GOOGLE_ANALYTICS_ID,
  SENTRY_DSN: import.meta.env.VITE_SENTRY_DSN,
} as const

// Validate required environment variables
const requiredEnvVars: (keyof typeof env)[] = ['API_URL']

for (const envVar of requiredEnvVars) {
  if (!env[envVar]) {
    throw new Error(`Missing required environment variable: VITE_${envVar}`)
  }
}