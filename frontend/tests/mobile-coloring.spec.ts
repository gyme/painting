import { test, expect } from '@playwright/test';

test.describe('Mobile Coloring Page Layout', () => {
  test.beforeEach(async ({ page }) => {
    // Set mobile viewport (iPhone 12 Pro)
    await page.setViewportSize({ width: 390, height: 844 });
  });

  test('canvas should be fully visible and not cropped by fixed controls', async ({ page }) => {
    // Navigate to a coloring page
    await page.goto('/painting/police-officer');
    
    // Wait for canvas to load
    await page.waitForSelector('canvas', { timeout: 10000 });
    
    // Get canvas bounding box
    const canvas = await page.locator('canvas');
    const canvasBox = await canvas.boundingBox();
    
    if (!canvasBox) {
      throw new Error('Canvas not found');
    }
    
    // Get color slider position (it's fixed at bottom)
    const colorSlider = await page.locator('[class*="MobileColorSlider"]').first();
    const colorSliderBox = await colorSlider.boundingBox();
    
    if (!colorSliderBox) {
      throw new Error('Color slider not found');
    }
    
    // Get toolbar position (it's fixed at bottom)
    const toolbar = await page.locator('[class*="MobileToolbar"]').first();
    const toolbarBox = await toolbar.boundingBox();
    
    if (!toolbarBox) {
      throw new Error('Toolbar not found');
    }
    
    // Calculate canvas bottom position
    const canvasBottom = canvasBox.y + canvasBox.height;
    
    // Calculate color slider top position
    const colorSliderTop = colorSliderBox.y;
    
    // Verify canvas bottom is ABOVE color slider top
    // Add 20px buffer to account for visual spacing
    const clearance = colorSliderTop - canvasBottom;
    
    console.log('Canvas bottom:', canvasBottom);
    console.log('Color slider top:', colorSliderTop);
    console.log('Clearance:', clearance);
    
    // Assert canvas is not overlapping with fixed controls
    expect(clearance).toBeGreaterThan(0);
    
    // Assert there's at least 20px of clearance
    expect(clearance).toBeGreaterThanOrEqual(20);
    
    // Scroll to bottom to ensure full canvas is accessible
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    
    // Wait a bit for scroll
    await page.waitForTimeout(500);
    
    // Verify canvas is still visible after scrolling
    await expect(canvas).toBeVisible();
    
    console.log('✅ Test passed: Canvas is fully visible and not cropped');
  });

  test('page should allow zoom on mobile', async ({ page }) => {
    await page.goto('/painting/police-officer');
    
    // Wait for canvas
    await page.waitForSelector('canvas', { timeout: 10000 });
    
    const canvas = await page.locator('canvas');
    
    // Check that touch-action allows zooming
    const touchAction = await canvas.evaluate((el) => {
      return window.getComputedStyle(el).touchAction;
    });
    
    // touch-action should be 'manipulation' to allow pinch-zoom
    expect(touchAction).toBe('manipulation');
    
    console.log('✅ Test passed: Touch action allows zooming');
  });
});

