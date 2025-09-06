import { test, expect } from '@playwright/test';

const routes = ['/', '/feed', '/meme-studio', '/playlists', '/gig-radar'];

for (const r of routes) {
  test(`route ${r} responds without 5xx`, async ({ page }) => {
    const resp = await page.goto(r);
    expect(resp?.status()).toBeLessThan(500);
  });
}
