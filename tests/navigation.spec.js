const { test, expect } = require('@playwright/test');

const HOME_URL = '/index.html';

// 1) Main page loads
test('main page responds with status 200', async ({ request }) => {
  const res = await request.get(HOME_URL);
  expect(res.status()).toBe(200);
});

// 2) Header and footer exist
test('header and footer exist', async ({ page }) => {
  await page.goto(HOME_URL);
  await expect(page.locator('nav.navbar')).toBeVisible();
  await expect(page.locator('footer, [data-include="sections/footer.html"], .footer')).toHaveCount(1, { timeout: 5000 });
});

// 3) Menu links navigate via hash
test('menu links update URL hash', async ({ page }) => {
  await page.goto(HOME_URL);
  const links = page.locator('.nav-link[href^="#"]');
  const count = await links.count();
  for (let i = 0; i < count; i++) {
    const link = links.nth(i);
    const href = await link.getAttribute('href');
    await link.click();
    await expect(page).toHaveURL(new RegExp(`${href}$`));
  }
});

// 4) Key components/animations render
test('hero animations and gallery render', async ({ page }) => {
  await page.goto(HOME_URL);
  // hero container
  await expect(page.locator('.hero, #home')).toBeVisible();
  // image gallery indicators/cards appear after dynamic includes
  await page.waitForTimeout(1000);
  await expect(page.locator('.image-container')).toHaveCountGreaterThan(0);
});

// 5) Measure load time and log
test('log basic page load time', async ({ page }) => {
  const start = Date.now();
  await page.goto(HOME_URL);
  await page.waitForLoadState('networkidle');
  const elapsed = Date.now() - start;
  console.log(`E2E load time: ${elapsed}ms`);
  expect(elapsed).toBeGreaterThan(0);
});