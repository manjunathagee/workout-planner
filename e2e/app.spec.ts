import { test, expect } from '@playwright/test'

test.describe('App', () => {
  test('should load the home page', async ({ page }) => {
    await page.goto('/')

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/React Velocity Starter/)

    // Check if the main heading is visible
    await expect(page.getByRole('heading', { name: /Welcome to React Velocity Starter/i })).toBeVisible()
  })

  test('should have feature cards', async ({ page }) => {
    await page.goto('/')

    // Check if feature cards are present
    await expect(page.getByText('Modern Tech Stack')).toBeVisible()
    await expect(page.getByText('Scalable Architecture')).toBeVisible()
    await expect(page.getByText('State Management')).toBeVisible()
  })

  test('should switch themes', async ({ page }) => {
    await page.goto('/')

    // Find and click the theme toggle button
    const themeToggle = page.getByRole('button', { name: /switch to/i })
    await themeToggle.click()

    // Check if dark class is applied to the html element
    const html = page.locator('html')
    await expect(html).toHaveClass(/dark/)
  })

  test('should navigate to 404 page for unknown routes', async ({ page }) => {
    await page.goto('/unknown-route')

    await expect(page.getByText('Page Not Found')).toBeVisible()
    await expect(page.getByText('404')).toBeVisible()
  })
})