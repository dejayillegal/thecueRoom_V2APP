import { test, expect } from '@playwright/test';

test('home loads', async ({ page }) => {
  await page.goto('/');
  await expect(
    page.getByRole('heading', { name: /welcome to thecueroom/i })
  ).toBeVisible();
});

test('feed loads', async ({ page }) => {
  await page.goto('/feed');
  await expect(page.getByText('Hello Cue')).toBeVisible();
});
