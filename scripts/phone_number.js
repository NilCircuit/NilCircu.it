const puppeteer = require('puppeteer');
const fs = require('fs');

function delay(time) {
    return new Promise(function(resolve) {
        setTimeout(resolve, time);
    });
}

// Function to save the page content to a file
async function savePageContent(page, filePath) {
    const content = await page.evaluate(() => document.body.innerHTML);
    fs.writeFileSync(filePath, content);
}

(async () => {
    const browser = await puppeteer.launch(); // Remove the executablePath to use default Chromium
    const page = await browser.newPage();

    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    await page.goto('https://www.fastpeoplesearch.com/769-229-2929'); // Open the website
    await page.setViewport({ width: 1920, height: 1080 });

    page.on('console', (msg) => {
        for (let i = 0; i < msg.args().length; ++i) {
            console.log(`${i}: ${msg.args()[i]}`);
        }
    });

    // Wait for 5 seconds
    console.warn('Waiting...');
    await delay(3500);
    console.warn('Finished waiting!');

    // Take a screenshot
    console.warn('Getting screenshot and page contents...');
    await page.evaluate(() => {
        for (const card of document.getElementsByClassName('card-block')) {
            try {
                console.log(`Name: ${card.getElementsByClassName('larger')[0].innerText}`);
            } catch (err) {
                console.error(err);
            }
            try {
                console.log(`City / State: ${card.getElementsByClassName('grey')[0].innerText}`);
            } catch (err) {
                console.error(err);
            }
            try {
                console.log(`Address: ${card.getElementsByTagName('div')[0].outerText}`);
            } catch (err) {
                console.error(err);
            }
    
            for (const i of card.getElementsByTagName('a')) {
                if (i.title.startsWith('Search people with phone number')) {
                    try {
                        console.log(`Possible number: ${i.innerText}`);
                    } catch (err) {
                        console.error(err);
                    }
                }
            }
        }
    });
    
    await page.screenshot({ path: 'screenshot.png' });
    console.warn('Done!');

    await browser.close();
})();
