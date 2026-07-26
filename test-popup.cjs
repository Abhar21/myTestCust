const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.setViewport({ width: 375, height: 812 });

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));

  console.log("Navigating to app...");
  await page.goto('http://localhost:5174/?page=detail&vendor=G.Pulla%20Reddy%20Sweets&when=', { waitUntil: 'networkidle2' });

  console.log("Checking if modal exists...");
  const hasModal = await page.evaluate(() => {
    return !!document.querySelector('.modal-backdrop-animate');
  });

  console.log("Modal exists:", hasModal);
  await browser.close();
})();
