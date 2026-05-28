import { test, expect } from '@playwright/test';

test('app loads and displays correctly', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Vite \+ React \+ TS|Diablo 2|App/i);
  await expect(page.locator('body')).not.toBeEmpty();
});
