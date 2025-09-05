import { test, expect } from '@playwright/test';

test.skip('feed page click-through', async ({ page }) => {
  await page.goto('/feed');
  await expect(page).toHaveURL(/feed/);
  const firstLink = page.getByRole('link').first();
  if (await firstLink.isVisible()) {
    await firstLink.click();
  }
});
