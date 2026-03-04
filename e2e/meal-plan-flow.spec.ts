import { test, expect } from '@playwright/test'

test.describe('Meal Plan Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => localStorage.clear())
    await page.reload()
  })

  test('can navigate to meal plan page', async ({ page }) => {
    await page.goto('/meal-plan')
    await expect(page.getByText(/week of/i)).toBeVisible()
  })

  test('shows 7 day slots', async ({ page }) => {
    await page.goto('/meal-plan')
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    for (const day of days) {
      await expect(page.getByText(day)).toBeVisible()
    }
  })

  test('can assign a recipe to a day and generate shopping list', async ({ page }) => {
    // Create a recipe first
    await page.goto('/recipes/new')
    await page.getByLabel('Recipe name').fill('Taco Night')
    await page.getByRole('button', { name: 'Add ingredient' }).click()
    await page.getByPlaceholder('Name').last().fill('Tortillas')
    await page.getByRole('button', { name: 'Add Recipe' }).click()
    await expect(page.getByText('Taco Night')).toBeVisible()

    // Go to meal plan
    await page.goto('/meal-plan')

    // Add dinner for Monday
    await page.getByRole('button', { name: 'Add dinner' }).first().click()

    // Recipe picker dialog
    await expect(page.getByText('Pick a recipe')).toBeVisible()
    await page.getByText('Taco Night').click()

    // Monday row should now show the recipe name
    await expect(page.locator('main').getByText('Taco Night').first()).toBeVisible()

    // Generate shopping list
    await page.getByRole('button', { name: 'Generate list' }).click()

    // Should navigate to the list detail with the ingredient
    await page.waitForURL(/\/lists\//)
    await expect(page.getByText('Tortillas')).toBeVisible()
  })
})
