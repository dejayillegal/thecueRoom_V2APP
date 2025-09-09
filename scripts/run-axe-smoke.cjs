const { chromium } = require('playwright');
const { injectAxe, checkA11y } = require('axe-playwright');

async function runAxeTests() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    console.log('🔍 Running accessibility tests...');

    // Test landing page
    console.log('Testing landing page...');
    await page.goto('http://localhost:4173');
    await injectAxe(page);
    await checkA11y(page, null, {
      detailedReport: true,
      detailedReportOptions: { html: true },
    });

    // Test auth modal
    console.log('Testing auth modal...');
    await page.click('button:has-text("Login / Sign Up")');
    await page.waitForSelector('[role="dialog"]');
    await checkA11y(page, '[role="dialog"]', {
      detailedReport: true,
      detailedReportOptions: { html: true },
    });

    console.log('✅ All accessibility tests passed!');
  } catch (error) {
    console.error('❌ Accessibility test failed:', error.message);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

runAxeTests();