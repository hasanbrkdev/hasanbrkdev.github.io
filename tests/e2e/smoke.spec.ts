import { test, expect } from '@playwright/test'

test('home renders hero chrome and main sections', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('link', { name: 'Résumé' }).first()).toBeVisible()
  await expect(page.locator('#about')).toContainText('Hasan')
  await expect(page.locator('#work')).toContainText('Lumos Generative AI')
  await expect(page.locator('#journey')).toContainText('Ege University')
})

test('project row expands and shows the process diagram', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: /Lumos Generative AI/ }).click()
  await expect(page.locator('svg[aria-label*="Lumos"]')).toBeVisible()
  await expect(page.locator('#work')).toContainText('Pipeline architecture & AI orchestration')
})

test('resume page renders and downloads a PDF', async ({ page }) => {
  await page.goto('/#/resume')
  await expect(page.getByText('Hasan Burak Özdemir').first()).toBeVisible()
  await expect(page.getByText('İzmir, Turkey', { exact: false }).first()).toBeVisible()
  const downloadPromise = page.waitForEvent('download')
  await page.getByRole('button', { name: /Download PDF/ }).click()
  const download = await downloadPromise
  expect(download.suggestedFilename()).toBe('Hasan_Burak_Ozdemir_Resume.pdf')
})
