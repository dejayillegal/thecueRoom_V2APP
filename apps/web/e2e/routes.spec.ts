import { test, expect } from '@playwright/test';

const routes = ['/feed', '/meme-studio', '/playlists', '/gig-radar', '/profile/testhandle', '/admin'];

for (const r of routes) {
  test(`route ${r} responds`, async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    const res = await page.goto(r);
    expect(res?.status()).toBeLessThan(500);
    if (r === '/admin' || r.startsWith('/profile')) {
      await expect(page.locator('text=sign in')).not.toHaveCount(0);
    }
    expect(errors).toEqual([]);
  });
}
