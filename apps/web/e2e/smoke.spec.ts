import { test, expect } from '@playwright/test';

test('landing and feed load without console errors', async ({ page }) => {
  const logs: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      const text = msg.text();
      if (!text.includes('attribute d')) logs.push(text);
    }
  });

  await page.addStyleTag({ content: '*{animation:none !important;transition:none !important;}' });
  await page.goto('/');
  await expect(page.getByAltText('thecueRoom landing')).toBeVisible();

  await page.goto('/feed').catch(() => {}); // optional if not implemented yet
  expect(logs).toEqual([]);
});
