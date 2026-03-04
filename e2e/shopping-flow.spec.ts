import { test, expect } from '@playwright/test'

test.describe('Shopping Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => localStorage.clear())
    await page.reload()
  })

  async function createListWithIngredient(page: ReturnType<typeof test.extend>, recipeName: string, ingredient: string) {
    await page.goto('/recipes/new')
    await page.getByLabel('Recipe name').fill(recipeName)
    await page.getByRole('button', { name: 'Add ingredient' }).click()
    await page.getByPlaceholder('Name').last().fill(ingredient)
    await page.getByRole('button', { name: 'Add Recipe' }).click()
    await expect(page.getByText(recipeName)).toBeVisible()

    await page.goto('/meal-plan')
    await page.getByRole('button', { name: 'Add dinner' }).first().click()
    await page.getByText(recipeName).click()
    await page.getByRole('button', { name: 'Generate list' }).click()
    await page.waitForURL(/\/lists\//)
  }

  test('can add a manual item to a list', async ({ page }) => {
    await createListWithIngredient(page, 'Quick Recipe', 'Garlic')
    await expect(page.getByText('Garlic')).toBeVisible()

    // Add a manual item
    await page.getByRole('button', { name: 'Add item' }).click()
    await expect(page.getByRole('heading', { name: 'Add item' })).toBeVisible()
    await page.getByLabel('Item name').fill('Butter')
    await page.getByRole('button', { name: 'Add to list' }).click()

    await expect(page.getByText('Butter')).toBeVisible()
  })

  test('can check off items and they persist on refresh', async ({ page }) => {
    await createListWithIngredient(page, 'Simple Dish', 'Salt')
    await expect(page.getByText('Salt')).toBeVisible()

    // Check off Salt
    await page.getByRole('checkbox', { name: /mark salt/i }).click()
    await expect(page.getByRole('checkbox', { name: /mark salt/i })).toBeChecked()

    // Reload and verify persistence
    await page.reload()
    await expect(page.getByRole('checkbox', { name: /mark salt/i })).toBeChecked()
  })

  test('can navigate from lists page to list detail', async ({ page }) => {
    await createListWithIngredient(page, 'Test Meal', 'Rice')

    // Go to lists page
    await page.goto('/lists')
    await expect(page.getByText(/week of/i)).toBeVisible()

    // Click the list card (avoid the archive button)
    await page.locator('a').filter({ hasText: /week of/i }).click()
    await page.waitForURL(/\/lists\//)

    await expect(page.url()).toContain('/lists/')
  })
})
