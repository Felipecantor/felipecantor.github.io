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
  // Esperar a que el footer real se cargue o al menos el contenedor esté presente
  const footer = page.locator('footer .footer, footer.footer, .footer');
  await expect(footer.first()).toBeVisible();
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
  const imageCount = await page.locator('.image-container').count();
  expect(imageCount).toBeGreaterThan(0);
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