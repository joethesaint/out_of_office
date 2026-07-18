const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto('http://localhost:5183', { waitUntil: 'networkidle' });
  await page.waitForTimeout(4000); // let boot sequence finish
  await page.screenshot({ path: '/tmp/before.png' });
  await browser.close();
})();
