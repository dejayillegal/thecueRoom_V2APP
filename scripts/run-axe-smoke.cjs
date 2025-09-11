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
#!/usr/bin/env node

const { execSync } = require('child_process');
const { chromium } = require('playwright');

async function runAxeTest() {
  console.log('🔍 Running accessibility smoke tests...');
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  try {
    // Inject axe-core
    await page.addInitScript({
      path: require.resolve('axe-core/axe.min.js')
    });
    
    console.log('  • Testing landing page...');
    await page.goto('http://localhost:5000');
    await page.waitForLoadState('networkidle');
    
    const landingResults = await page.evaluate(() => {
      return new Promise((resolve) => {
        window.axe.run(document, {
          rules: {
            'color-contrast': { enabled: true },
            'keyboard-navigation': { enabled: true },
            'focus-visible': { enabled: true },
            'aria-labels': { enabled: true }
          }
        }, (err, results) => {
          if (err) throw err;
          resolve(results);
        });
      });
    });
    
    if (landingResults.violations.length > 0) {
      console.error('❌ Landing page accessibility violations:');
      landingResults.violations.forEach(violation => {
        console.error(`  - ${violation.id}: ${violation.description}`);
        violation.nodes.forEach(node => {
          console.error(`    Target: ${node.target.join(', ')}`);
        });
      });
      process.exit(1);
    }
    
    console.log('  ✅ Landing page passed');
    
    console.log('  • Testing auth modal...');
    await page.goto('http://localhost:5000/?auth=1');
    await page.waitForTimeout(1000); // Wait for modal to open
    
    const modalResults = await page.evaluate(() => {
      return new Promise((resolve) => {
        window.axe.run(document, {
          rules: {
            'color-contrast': { enabled: true },
            'keyboard-navigation': { enabled: true },
            'focus-visible': { enabled: true },
            'aria-labels': { enabled: true }
          }
        }, (err, results) => {
          if (err) throw err;
          resolve(results);
        });
      });
    });
    
    if (modalResults.violations.length > 0) {
      console.error('❌ Auth modal accessibility violations:');
      modalResults.violations.forEach(violation => {
        console.error(`  - ${violation.id}: ${violation.description}`);
        violation.nodes.forEach(node => {
          console.error(`    Target: ${node.target.join(', ')}`);
        });
      });
      process.exit(1);
    }
    
    console.log('  ✅ Auth modal passed');
    
    console.log('✅ All accessibility tests passed');
    
  } catch (error) {
    console.error('❌ Accessibility test error:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

if (require.main === module) {
  runAxeTest().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

module.exports = { runAxeTest };
