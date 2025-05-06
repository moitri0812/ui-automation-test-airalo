const { Given, When, Then } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const assert = require('assert');

let browser, context, page;

Given('I open Airalo website', async () => {
  browser = await chromium.launch({ headless: false });
  context = await browser.newContext();
  page = await context.newPage();
  await page.goto('https://www.airalo.com', { waitUntil: 'load' });

  //Wait for the cookie banner and click accept if visible
  try {
    await page.waitForSelector('#onetrust-banner-sdk', { timeout: 5000 });
    const acceptButton = await page.$('#onetrust-accept-btn-handler');
    if (acceptButton) {
      await acceptButton.click();
    }
  } catch (error) {
    console.log('Cookie banner did not appear or already dismissed.');
  }

  // Handle possible pop-up with selector #wzrk_wrapper > div.wzrk-alert.wiz-show-animate
  try {
    const popupSelector = '#wzrk_wrapper > div.wzrk-alert.wiz-show-animate';
    await page.waitForSelector(popupSelector, { timeout: 5000 });
    const closeBtn = await page.$(`${popupSelector} button`);
    if (closeBtn) {
      await closeBtn.click();
      console.log('Popup closed successfully.');
    }
  } catch (error) {
    console.log('No popup appeared or already handled.');
  }
});

When('I find the search bar on the home page', async () => {
  await page.waitForSelector('div.inp-search-container input[data-testid="search-input"]', { timeout: 10000 });
});

When('I input {string} into the search bar', async (country) => {
  await page.fill('div.inp-search-container input[data-testid="search-input"]', country);
  await page.waitForTimeout(2000);
});

When('I select {string} destination from the {string} section in the autocomplete options', async (country, section) => {
  await page.waitForSelector('ul.countries-list', { timeout: 10000 });

  const sectionHeaderSelector = `ul.countries-list .countries-search-segment p:text-is("${section}")`;
  await page.waitForSelector(sectionHeaderSelector, { timeout: 5000 });

  const countrySelector = `span[data-testid="${country}-name"]`;
  await page.waitForSelector(countrySelector, { timeout: 5000 });
  await page.click(countrySelector);
});

When('I select the first eSIM package', async () => {
  const esimSelector = 'a.sim-item-link[data-testid="sim-package-item"]';
  await page.waitForSelector(esimSelector, { timeout: 10000 });
});

When('I click on {string}', async (buttonText) => {
  await page.click(`button:has-text("${buttonText}")`);
});

Then('I should see package details:', async (dataTable) => {
  const selector = '[data-testid="sim-detail-info-list"]';
  const element = await page.waitForSelector(selector, { timeout: 10000 });
  const rawText = (await element.textContent()).trim();

  // Split lines and remove empty ones
  const lines = rawText.split('\n').map(line => line.trim()).filter(line => line);

  // Extract values by skipping label lines
  const values = lines.filter((_, index) => index % 2 === 1);

  // Create expected value array from feature file
  const expectedValues = dataTable.rows().map(row => row[1]);

  for (let i = 0; i < expectedValues.length; i++) {
    const expected = expectedValues[i].toLowerCase();
    const actual = values[i]?.toLowerCase();
    assert.strictEqual(
      actual,
      expected,
      `Expected "${expectedValues[i]}" but got "${values[i]}" at index ${i}`
    );
  }

  console.log('Package values verified successfully.');
  await browser.close();
});

// Optionally, close the browser at the end
