import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const htmlPath = path.join(__dirname, 'index.html');

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();

await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 });

await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0', timeout: 30000 });

// Wait for GSAP animations to settle
await new Promise(r => setTimeout(r, 3000));

// Hide the fog overlay and the easter-egg toggle
await page.evaluate(() => {
  const fog = document.querySelector('.fog');
  if (fog) fog.style.display = 'none';
  const toggle = document.getElementById('fog-toggle');
  if (toggle) toggle.style.display = 'none';
  const modal = document.querySelector('.fog-modal');
  if (modal) modal.style.display = 'none';
});

// Small pause for repaint
await new Promise(r => setTimeout(r, 500));

await page.screenshot({
  path: path.join(__dirname, 'og-image.png'),
  type: 'png',
  clip: { x: 0, y: 0, width: 1200, height: 630 }
});

console.log('Screenshot saved to og-image.png');
await browser.close();
