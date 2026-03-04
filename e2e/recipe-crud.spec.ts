import { test, expect } from '@playwright/test'

test.describe('Recipe CRUD', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => localStorage.clear())
    await page.reload()
  })

  test('add a recipe with ingredients', async ({ page }) => {
    await page.goto('/recipes/new')

    await page.getByLabel('Recipe name').fill('Test Pasta')
    await page.getByLabel('Description').fill('A simple pasta dish')
    await page.getByLabel('Servings').fill('2')
    await page.getByLabel('Tags').fill('italian, quick')

    // Add an ingredient
    await page.getByRole('button', { name: 'Add ingredient' }).click()
    await page.getByPlaceholder('Name').last().fill('Spaghetti')

    await page.getByRole('button', { name: 'Add Recipe' }).click()

    // Should redirect to recipe detail
    await expect(page.getByText('Test Pasta')).toBeVisible()
    await expect(page.getByText('Spaghetti')).toBeVisible()
  })

  test('edit recipe name', async ({ page }) => {
    await page.goto('/recipes/new')
    await page.getByLabel('Recipe name').fill('Original Name')
    await page.getByRole('button', { name: 'Add Recipe' }).click()

    // Should be on detail page now
    await expect(page.getByText('Original Name')).toBeVisible()

    // Click edit link
    await page.getByRole('link', { name: 'Edit recipe' }).click()
    const nameInput = page.getByLabel('Recipe name')
    await nameInput.clear()
    await nameInput.fill('Updated Name')
    await page.getByRole('button', { name: 'Save Changes' }).click()

    await expect(page.getByText('Updated Name')).toBeVisible()
  })

  test('delete a recipe', async ({ page }) => {
    await page.goto('/recipes/new')
    await page.getByLabel('Recipe name').fill('To Delete')
    await page.getByRole('button', { name: 'Add Recipe' }).click()

    await expect(page.getByText('To Delete')).toBeVisible()

    page.on('dialog', (dialog) => dialog.accept())
    await page.getByRole('button', { name: 'Delete recipe' }).click()

    // Should be back on recipes page
    await expect(page.getByText('No recipes yet')).toBeVisible()
  })

  test('recipe appears in library', async ({ page }) => {
    await page.goto('/recipes/new')
    await page.getByLabel('Recipe name').fill('My Salad')
    await page.getByRole('button', { name: 'Add Recipe' }).click()

    await page.goto('/recipes')
    await expect(page.getByText('My Salad')).toBeVisible()
  })
})
