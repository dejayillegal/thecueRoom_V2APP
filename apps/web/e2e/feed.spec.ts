import { test, expect } from '@playwright/test';

test('feed page loads', async ({ page }) => {
  await page.goto('/feed');
  await expect(page).toHaveURL(/feed/);
});
