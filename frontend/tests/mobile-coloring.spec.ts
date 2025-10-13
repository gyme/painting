import { test, expect } from '@playwright/test';

test.describe('Mobile Coloring Page Layout', () => {
  test.beforeEach(async ({ page }) => {
    // Set mobile viewport (iPhone 12 Pro)
    await page.setViewportSize({ width: 390, height: 844 });
  });

  test('canvas should be fully visible and not cropped by fixed controls', async ({ page }) => {
    // Navigate to a coloring page
    await page.goto('/painting/police-officer', { waitUntil: 'domcontentloaded', timeout: 30000 });
    
    // Wait for canvas to be visible and loaded
    await page.waitForSelector('canvas', { state: 'visible', timeout: 20000 });
    await page.waitForTimeout(2000); // Wait for canvas to fully render
    
    // Get canvas bounding box
    const canvas = page.locator('canvas').first();
    await canvas.waitFor({ state: 'visible' });
    const canvasBox = await canvas.boundingBox();
    
    if (!canvasBox) {
      throw new Error('Canvas not found');
    }
    
    // Find fixed elements by looking for elements with position fixed
    const fixedElements = await page.evaluate(() => {
      const elements = Array.from(document.querySelectorAll('*'));
      const fixed = elements.filter(el => {
        const style = window.getComputedStyle(el);
        return style.position === 'fixed' && style.bottom === '0px';
      });
      return fixed.map(el => {
        const rect = el.getBoundingClientRect();
        return {
          top: rect.top,
          bottom: rect.bottom,
          height: rect.height
        };
      }).sort((a, b) => a.top - b.top); // Sort by top position
    });
    
    if (fixedElements.length === 0) {
      throw new Error('No fixed elements found at bottom');
    }
    
    // Get the topmost fixed element (color slider is above toolbar)
    const topFixedElement = fixedElements[0];
    
    // Calculate canvas bottom position
    const canvasBottom = canvasBox.y + canvasBox.height;
    
    // Calculate fixed element top position
    const fixedElementTop = topFixedElement.top;
    
    // Verify canvas bottom is ABOVE fixed element top
    const clearance = fixedElementTop - canvasBottom;
    
    console.log('Canvas bottom:', canvasBottom);
    console.log('Fixed element top:', fixedElementTop);
    console.log('Clearance:', clearance);
    console.log('Fixed elements found:', fixedElements.length);
    
    // Assert canvas is not overlapping with fixed controls
    expect(clearance).toBeGreaterThan(0);
    
    // Assert there's reasonable clearance (at least 10px to account for margins)
    expect(clearance).toBeGreaterThanOrEqual(10);
    
    console.log('✅ Test passed: Canvas is fully visible and not cropped');
  });

  test('page should allow zoom on mobile', async ({ page }) => {
    await page.goto('/painting/police-officer', { waitUntil: 'domcontentloaded', timeout: 30000 });
    
    // Wait for canvas
    await page.waitForSelector('canvas', { state: 'visible', timeout: 20000 });
    await page.waitForTimeout(1000);
    
    const canvas = page.locator('canvas').first();
    
    // Check that touch-action allows zooming
    const touchAction = await canvas.evaluate((el) => {
      return window.getComputedStyle(el).touchAction;
    });
    
    // touch-action should allow pinch-zoom (pan-x pan-y pinch-zoom)
    expect(touchAction).toContain('pinch-zoom');
    
    console.log('✅ Test passed: Touch action allows zooming');
  });
});

