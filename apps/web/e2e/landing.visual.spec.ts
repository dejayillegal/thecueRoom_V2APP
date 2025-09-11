import { test, expect } from '@playwright/test';

test.describe('Landing Page Visual Tests', () => {
  test('landing page matches expected design', async ({ page }) => {
    // Navigate to the landing page
    await page.goto('/');
    
    // Wait for the page to fully load
    await page.waitForLoadState('networkidle');
    
    // Wait for any animations or transitions to complete
    await page.waitForTimeout(1000);
    
    // Take a screenshot and compare with baseline
    await expect(page).toHaveScreenshot('landing-page.png', {
      fullPage: true,
      maxDiffPixels: 100, // Allow for minor differences
    });
  });

  test('auth modal opens and displays correctly', async ({ page }) => {
    await page.goto('/');
    
    // Click the login button to open modal
    await page.click('button:has-text("Login / Sign Up")');
    
    // Wait for modal to appear
    await page.waitForSelector('[role="dialog"]');
    
    // Take screenshot of modal
    await expect(page.locator('[role="dialog"]')).toHaveScreenshot('auth-modal.png', {
      maxDiffPixels: 50,
    });
  });

  test('auth modal tab switching works', async ({ page }) => {
    await page.goto('/');
    
    // Open modal
    await page.click('button:has-text("Login / Sign Up")');
    await page.waitForSelector('[role="dialog"]');
    
    // Test Sign Up tab
    await page.click('button:has-text("Sign Up")');
    await expect(page.locator('button:has-text("Sign Up")')).toHaveClass(/bg-lime-300/);
    
    // Test Forgot tab
    await page.click('button:has-text("Forgot")');
    await expect(page.locator('button:has-text("Forgot")')).toHaveClass(/bg-lime-300/);
    
    // Back to Sign In
    await page.click('button:has-text("Sign In")');
    await expect(page.locator('button:has-text("Sign In")')).toHaveClass(/bg-lime-300/);
  });

  test('modal closes with escape key', async ({ page }) => {
    await page.goto('/');
    
    // Open modal
    await page.click('button:has-text("Login / Sign Up")');
    await page.waitForSelector('[role="dialog"]');
    
    // Press escape key
    await page.keyboard.press('Escape');
    
    // Modal should be closed
    await expect(page.locator('[role="dialog"]')).not.toBeVisible();
  });

  test('logo has correct accessibility attributes', async ({ page }) => {
    await page.goto('/');
    
    const logo = page.locator('svg[aria-label="thecueRoom logo with anchored blink"]');
    await expect(logo).toBeVisible();
    await expect(logo).toHaveAttribute('role', 'img');
  });

  test('page has proper heading structure', async ({ page }) => {
    await page.goto('/');
    
    // Check main heading
    await expect(page.locator('h1')).toContainText('Welcome to thecueRoom');
    
    // Check section headings
    await expect(page.locator('h2:has-text("What you get")')).toBeVisible();
    await expect(page.locator('h2:has-text("Community Feed Preview")')).toBeVisible();
    await expect(page.locator('h2:has-text("How TheCueRoom Works")')).toBeVisible();
  });

  test('interactive elements have proper focus states', async ({ page }) => {
    await page.goto('/');
    
    // Test button focus
    const loginButton = page.locator('button:has-text("Login / Sign Up")');
    await loginButton.focus();
    
    // Check if focus ring is visible (testing focus-visible styles)
    const focusedButton = page.locator('button:focus');
    await expect(focusedButton).toBeVisible();
  });
});
import { test, expect } from '@playwright/test';

test.describe('Landing Page Visual Regression', () => {
  test('landing page matches exact design', async ({ page }) => {
    // Navigate to landing page
    await page.goto('/');
    
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');
    
    // Wait for logo animation to settle
    await page.waitForTimeout(1000);
    
    // Hide any dynamic content that might cause flaky tests
    await page.addStyleTag({
      content: `
        * {
          animation-duration: 0s !important;
          animation-delay: 0s !important;
          transition-duration: 0s !important;
          transition-delay: 0s !important;
        }
      `
    });
    
    // Take full page screenshot with zero tolerance
    await expect(page).toHaveScreenshot('landing-page.png', {
      fullPage: true,
      maxDiffPixels: 0,
      threshold: 0
    });
  });

  test('logo SVG remains unchanged', async ({ page }) => {
    await page.goto('/');
    
    const logoSvg = page.locator('svg[aria-label="thecueRoom logo with anchored blink"]');
    await expect(logoSvg).toBeVisible();
    
    // Verify logo has the exact expected structure
    await expect(logoSvg).toHaveAttribute('xmlns', 'http://www.w3.org/2000/svg');
    await expect(logoSvg).toHaveAttribute('viewBox', '0 0 1000 1000');
    
    // Verify blink animation exists
    const blinkPath = page.locator('#blinkPath');
    await expect(blinkPath).toHaveCount(1);
    
    // Verify lime color (#b2ff00) is present
    const pathElements = page.locator('svg path[fill="#b2ff00"]');
    await expect(pathElements).toHaveCount(3);
  });

  test('auth modal opens correctly', async ({ page }) => {
    await page.goto('/?auth=1');
    
    // Wait for modal to appear
    const modal = page.locator('[data-testid="auth-modal"]').or(page.locator('div:has(h2:text("Welcome Back"))'));
    await expect(modal).toBeVisible();
    
    // Take screenshot of auth modal
    await expect(modal).toHaveScreenshot('auth-modal.png', {
      maxDiffPixels: 100
    });
  });
});
