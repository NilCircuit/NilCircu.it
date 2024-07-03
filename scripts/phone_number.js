// Below is a NodeJS script, default js doesn't have require()

// const puppeteer = require('puppeteer');

// (async () => {
//   const browser = await puppeteer.launch({ headless: true });
//   const page = await browser.newPage();
  
//   // Navigate to a website (Example: Google Search)
//   await page.goto('https://www.google.com');

//   // Enter a search term
//   await page.type('input[name=q]', 'phone number lookup', { delay: 100 });
//   await page.keyboard.press('Enter');

//   // Wait for search results to load
//   await page.waitForSelector('h3');

//   // Extract search results
//   const results = await page.evaluate(() => {
//     const items = Array.from(document.querySelectorAll('h3'));
//     return items.map(item => item.textContent);
//   });

//   console.log(results);

//   await browser.close();
// })();
