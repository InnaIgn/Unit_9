import { test, expect } from '@playwright/test';
   
     test('Perform Login', async ({ page }) => {
      await page.goto('https://www.saucedemo.com/');
      await page.locator('[data-test="username"]').click();
      await page.locator('[data-test="username"]').fill('standard_user');
      await page.locator('[data-test="password"]').click();
      await page.locator('[data-test="password"]').fill('secret_sauce');
      await page.locator('[data-test="login-button"]').click();
      const titleLocator = page.locator('[data-test="title"]');
      await expect(titleLocator).toContainText('Products');
      const cartIconLocator = page.locator('[data-test="shopping-cart-link"]');
      await expect(cartIconLocator).toBeVisible();
      const productCards = page.locator('[data-test="inventory-item"]');
      const productCount = await productCards.count();
      expect(productCount).toBeGreaterThan(1);
    });

  test ('Test 2 - Add product to the cart', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  
  const cartBadge = page.locator('.shopping_cart_badge');
  await expect(cartBadge).toHaveText('1');
  
  await page.locator('[data-test="shopping-cart-link"]').click();
  const productName = page.locator('.inventory_item_name');
  await expect(productName).toHaveText('Sauce Labs Backpack');
  await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
  await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();
  const cartItems = page.locator('.cart_item');
  await expect(cartItems).toHaveCount(0);
});