const puppeteer = require('puppeteer');
const fs = require('fs');

const url = process.env.SCRAPE_URL;

(async () => {
  if (!url) {
    console.error('SCRAPE_URL environment variable not provided.');
    process.exit(1);
  }

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    executablePath: '/usr/bin/chromium'
  });

  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'domcontentloaded' });

  const data = await page.evaluate(() => ({
    title: document.title,
    h1: Array.from(document.querySelectorAll('h1')).map(el => el.innerText),
    h2: Array.from(document.querySelectorAll('h2')).map(el => el.innerText),
    h3: Array.from(document.querySelectorAll('h3')).map(el => el.innerText),
    paragraphs: Array.from(document.querySelectorAll('p')).map(el => el.innerText),
    links: Array.from(document.querySelectorAll('a')).map(el => el.href),
    images: Array.from(document.querySelectorAll('img')).map(el => el.src)
  }));

  fs.writeFileSync('scraped_data.json', JSON.stringify(data, null, 2));

  await browser.close();
})();

