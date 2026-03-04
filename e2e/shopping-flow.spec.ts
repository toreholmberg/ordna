import { test, expect } from '@playwright/test'

test.describe('Shopping Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => localStorage.clear())
    await page.reload()
  })

  test('can add a manual item to a list', async ({ page }) => {
    // Create a list via meal plan + generate
    await page.goto('/recipes/new')
    await page.getByLabel('Recipe name').fill('Quick Recipe')
    await page.getByRole('button', { name: /add/i }).click()
    await page.getByPlaceholder('Name').last().fill('Garlic')
    await page.getByRole('button', { name: /add recipe/i }).click()

    await page.goto('/meal-plan')
    await page.getByRole('button', { name: /add dinner/i }).first().click()
    await page.getByText('Quick Recipe').click()
    await page.getByRole('button', { name: /generate list/i }).click()

    // Should be on list detail page with Garlic
    await expect(page.getByText('Garlic')).toBeVisible()

    // Add a manual item
    await page.getByRole('button', { name: /add item/i }).click()
    await expect(page.getByText('Add item')).toBeVisible()
    await page.getByLabel('Item name').fill('Butter')
    await page.getByRole('button', { name: /add to list/i }).click()

    await expect(page.getByText('Butter')).toBeVisible()
  })

  test('can check off items and they persist on refresh', async ({ page }) => {
    // Create list
    await page.goto('/recipes/new')
    await page.getByLabel('Recipe name').fill('Simple Dish')
    await page.getByRole('button', { name: /add/i }).click()
    await page.getByPlaceholder('Name').last().fill('Salt')
    await page.getByRole('button', { name: /add recipe/i }).click()

    await page.goto('/meal-plan')
    await page.getByRole('button', { name: /add dinner/i }).first().click()
    await page.getByText('Simple Dish').click()
    await page.getByRole('button', { name: /generate list/i }).click()

    // Check off Salt
    await page.getByRole('checkbox', { name: /mark salt/i }).click()
    await expect(page.getByRole('checkbox', { name: /mark salt/i })).toBeChecked()

    // Get current URL to come back
    const url = page.url()

    // Reload
    await page.reload()

    // Item should still be checked
    await expect(page.getByRole('checkbox', { name: /mark salt/i })).toBeChecked()
  })

  test('can navigate from lists page to list detail', async ({ page }) => {
    // Generate a list
    await page.goto('/recipes/new')
    await page.getByLabel('Recipe name').fill('Test Meal')
    await page.getByRole('button', { name: /add recipe/i }).click()

    await page.goto('/meal-plan')
    await page.getByRole('button', { name: /add dinner/i }).first().click()
    await page.getByText('Test Meal').click()
    await page.getByRole('button', { name: /generate list/i }).click()

    // Go to lists page
    await page.goto('/lists')
    await expect(page.getByText(/week of/i)).toBeVisible()

    // Click the list
    const listLink = page.locator('a').filter({ hasText: /week of/i })
    await listLink.click()

    // Should be on list detail
    await expect(page.url()).toContain('/lists/')
  })
})
