import { test, expect } from '@playwright/test'

test.describe('Recipe CRUD', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto('/')
    await page.evaluate(() => localStorage.clear())
    await page.reload()
  })

  test('add a recipe with ingredients', async ({ page }) => {
    await page.goto('/recipes')
    await page.getByRole('link', { name: /add/i }).click()

    await page.getByLabel('Recipe name').fill('Test Pasta')
    await page.getByLabel('Description').fill('A simple pasta dish')
    await page.getByLabel('Servings').fill('2')
    await page.getByLabel('Tags').fill('italian, quick')

    // Add an ingredient
    await page.getByRole('button', { name: /add/i }).click()
    await page.getByPlaceholder('Name').last().fill('Spaghetti')
    await page.locator('input[type="number"]').filter({ has: page.locator('[placeholder="2"]') }).last().fill('200')
    await page.getByPlaceholder('kg').last().fill('g')

    await page.getByRole('button', { name: /add recipe/i }).click()

    // Should redirect to recipe detail
    await expect(page.getByText('Test Pasta')).toBeVisible()
    await expect(page.getByText('Spaghetti')).toBeVisible()
  })

  test('edit recipe name', async ({ page }) => {
    // First add a recipe via the store directly (navigate and create)
    await page.goto('/recipes/new')
    await page.getByLabel('Recipe name').fill('Original Name')
    await page.getByRole('button', { name: /add recipe/i }).click()

    // Now edit
    await page.getByRole('button', { name: /pencil|edit/i }).click()
    const nameInput = page.getByLabel('Recipe name')
    await nameInput.clear()
    await nameInput.fill('Updated Name')
    await page.getByRole('button', { name: /save changes/i }).click()

    await expect(page.getByText('Updated Name')).toBeVisible()
  })

  test('delete a recipe', async ({ page }) => {
    await page.goto('/recipes/new')
    await page.getByLabel('Recipe name').fill('To Delete')
    await page.getByRole('button', { name: /add recipe/i }).click()

    // Click delete (trash icon)
    page.on('dialog', (dialog) => dialog.accept())
    await page.getByRole('button', { name: /delete|trash/i }).click()

    // Should be back on recipes page, no recipes
    await expect(page.getByText('No recipes yet')).toBeVisible()
  })

  test('recipe appears in library', async ({ page }) => {
    await page.goto('/recipes/new')
    await page.getByLabel('Recipe name').fill('My Salad')
    await page.getByRole('button', { name: /add recipe/i }).click()

    await page.goto('/recipes')
    await expect(page.getByText('My Salad')).toBeVisible()
  })
})
