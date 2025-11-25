import { Stagehand } from "@browserbasehq/stagehand";
import { fileURLToPath } from "url";

// Reconstruct __filename for ES Modules (Same as your Playwright script)
const __filename = fileURLToPath(import.meta.url + "/../fixtures/testfile.txt");

(async () => {
  // 1. Initialize Stagehand
  const stagehand = new Stagehand({
    env: "LOCAL", // Or "BROWSERBASE" if running remotely
    model: "google/gemini-2.5-flash",
  });

  await stagehand.init();
  const page = stagehand.context.pages()[0]; // Access the underlying Playwright page

  try {
    // 2. Navigate
    await page.goto("http://localhost:5173");

    // 3. Fill Inputs & 4. Select Dropdown & 5. Check Radio/Checkbox
    // (We can combine multiple straightforward actions into one instruction)
    await stagehand.act(`Fill the name with "Stagehand Bot" `);
    await stagehand.act(`
        Fill the and email with "bot@stagehand.com".
      `);
    await stagehand.act(`Select "mid" from the experience dropdown.`);
    await stagehand.act(`Select the Vue radio button`);
    await stagehand.act(`Select the checkbox terms`);

    // 6. Handle Dynamic Content
    // Stagehand's AI vision will wait for elements to settle naturally
    await stagehand.act(
      `Click the reveal button, then enter 'SuperSecret' into the secret field that appears.`
    );

    // 7. File Upload
    // Note: While Stagehand can click upload buttons, passing a specific local OS path
    // is best done via the native Playwright API to ensure security permissions are handled correctly.
    console.log("Uploading file...");
    await stagehand.act(`Upload the file ${__filename}`);

    // 8. Shadow DOM & 9. IFrame
    // Stagehand automatically handles Shadow DOM and traversing Iframes without extra code.
    await stagehand.act(
      "Click the shadow button, then click the button inside the iframe."
    );

    // Verify Iframe Text using Extract
    const iframe = page.frameLocator('[data-testid="iframe-host"]');
    await iframe.locator('[data-testid="iframe-btn"]').click();
    const iframeText = await iframe
      .locator('[data-testid="iframe-text"]')
      .innerText();

    if (iframeText !== "Clicked!") {
      throw new Error(`Iframe interaction failed. Found: ${iframeStatus}`);
    }

    // 10. Submit
    await stagehand.act("Click the submit button");

    // 11. Verification
    // We wait for the result area to populate and extract the text
    const resultText = await stagehand.extract(
      "In the page can you extract submission successful and Stagheand bot in the json for submission?"
    );

    if (resultText["extraction"].includes("Stagehand Bot")) {
      console.log("✅ Stagehand Test Passed!");
    } else {
      console.error(`❌ Stagehand Test Failed. Result was: ${resultText}`);
    }
  } catch (error) {
    console.error("Test Failed:", error);
  } finally {
    await stagehand.close();
  }
})();
