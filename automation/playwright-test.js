// test-playwright.js
import { chromium } from 'playwright';
import { fileURLToPath } from 'url';

// Reconstruct __filename for ES Modules
const __filename = fileURLToPath(import.meta.url + '/../fixtures/testfile.txt');

(async () => {
  // 1. Launch Browser
  const browser = await chromium.launch({ headless: false, slowMo: 500 });
  const page = await browser.newPage();

  // 2. Navigate
  await page.goto('http://localhost:5173');

  // 3. Fill Inputs
  await page.fill('[data-testid="input-name"]', 'Playwright Bot');
  await page.fill('[data-testid="input-email"]', 'bot@playwright.com');

  // 4. Select Dropdown
  await page.selectOption('[data-testid="select-experience"]', 'mid');

  // 5. Check Radio & Checkbox
  await page.check('[data-testid="radio-vue"]');
  await page.check('[data-testid="checkbox-terms"]');

  // 6. Handle Dynamic Content
  await page.click('[data-testid="btn-reveal"]');
  
  console.log('Waiting for secret field (Playwright auto-waits)...');
  await page.fill('[data-testid="input-secret"]', 'SuperSecret');

  // 7. File Upload
  await page.setInputFiles('[data-testid="input-file"]', __filename);

  //8. Shadow DOM
  await page.locator('[data-testid="shadow-button"]').click();

  //9. IFrame
  const iframe = page.frameLocator('[data-testid="iframe-host"]');
  await iframe.locator('[data-testid="iframe-btn"]').click();
  const iframeText = await iframe.locator('[data-testid="iframe-text"]').innerText();
  if(iframeText !== "Clicked!") throw new Error("Iframe interaction failed");

  // 10. Submit
  await page.click('[data-testid="btn-submit"]');

  // 11. Verification
  const result = await page.locator('[data-testid="result-area"]');
  await result.waitFor();
  
  const text = await result.innerText();
  
  if (text.includes('Playwright Bot')) {
    console.log('✅ Playwright Test Passed!');
  } else {
    console.error('❌ Playwright Test Failed');
  }

  await browser.close();
})();