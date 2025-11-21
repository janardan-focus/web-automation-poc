// test-puppeteer.js
import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';

// Reconstruct __filename and __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url + '/../fixtures/testfile.txt');

(async () => {
  // 1. Launch Browser
  const browser = await puppeteer.launch({ 
    headless: false, 
    slowMo: 50 
  });
  const page = await browser.newPage();

  // 2. Navigate
  await page.goto('http://localhost:5173');

  // 3. Fill Inputs
  await page.type('[data-testid="input-name"]', 'Puppeteer Bot');
  await page.type('[data-testid="input-email"]', 'bot@puppeteer.com');

  // 4. Select Dropdown
  await page.select('[data-testid="select-experience"]', 'senior');

  // 5. Click Radio & Checkbox
  await page.click('[data-testid="radio-react"]');
  await page.click('[data-testid="checkbox-terms"]');

  // 6. Handle Dynamic Content (The Wait)
  await page.click('[data-testid="btn-reveal"]');
  
  console.log('Waiting for secret field...');
  await page.waitForSelector('[data-testid="input-secret"]', { visible: true });
  await page.type('[data-testid="input-secret"]', 'OpenSesame');

  // 7. File Upload
  // Uploading this script file itself as a test
  const elementHandle = await page.$('[data-testid="input-file"]');
  await elementHandle.uploadFile(__filename); 

  // 8. Shadow DOM 
  // Interact with Shadow DOM element
  const shadowButton = await page.waitForSelector('[data-testid="shadow-host"] >>> [data-testid="shadow-button"]');
  page.once('dialog', async dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    await dialog.dismiss();
  });
  await shadowButton.click();

  // 9. IFrame
  const frameElement = await page.waitForSelector('[data-testid="iframe-host"]');
  const frame = await frameElement.contentFrame();
  // Interact within the iframe
  await frame.waitForSelector('[data-testid="iframe-btn"]');
  await frame.click('[data-testid="iframe-btn"]');
  const iframeResult = await frame.$eval('[data-testid="iframe-text"]', el => el.textContent);
  if(iframeResult !== "Clicked!") throw new Error("Iframe interaction failed");

  // 10. Submit
  await page.click('[data-testid="btn-submit"]');

  // 11. Verification
  await page.waitForSelector('[data-testid="result-area"]');
  const resultText = await page.$eval('[data-testid="result-area"]', el => el.textContent);

  if (resultText.includes('Puppeteer Bot')) {
    console.log('✅ Puppeteer Test Passed!');
  } else {
    console.error('❌ Puppeteer Test Failed');
  }

  await browser.close();
})();