import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  
  await page.goto('https://www.dafontfree.net/le-petit-cochon/f166547.htm', { waitUntil: 'domcontentloaded' });
  
  const hrefs = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('a')).map(a => a.href);
  });
  
  for (let href of hrefs) {
    if (href.includes('download') || href.includes('.zip') || href.includes('dl')) {
      console.log('Possible link:', href);
    }
  }
  
  await browser.close();
})();
