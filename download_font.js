import { chromium } from 'playwright';
import fs from 'fs';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  
  // Go to dafontsfree
  await page.goto('https://www.dafontfree.net/le-petit-cochon/f166547.htm');
  
  // wait for download button
  const downloadPromise = page.waitForEvent('download', { timeout: 15000 }).catch(() => null);
  
  // Click on something that looks like download
  const btn = await page.$('a:has-text("Download")');
  if (btn) {
      await btn.click();
  }
  
  const download = await downloadPromise;
  if (download) {
      await download.saveAs('/tmp/le_petit_cochon.zip');
      console.log('Downloaded successfully');
  } else {
      console.log('Download failed');
  }
  
  await browser.close();
})();
