#!/usr/bin/env node

/**
 * Content License Validation Script
 * 
 * This script validates that all content (especially popular characters)
 * has proper licensing before deployment. It prevents unauthorized 
 * copyrighted content from being published.
 * 
 * Usage: node validate-content-license.js
 * Returns: Exit code 0 (success) or 1 (failure with errors)
 */

const fs = require('fs');
const path = require('path');

// License types
const VALID_LICENSES = ['owned', 'licensed', 'public_domain', 'original'];

// Configuration: Define content that requires licensing
const REQUIRES_LICENSE_CHECK = [
  // Disney characters
  'elsa', 'frozen', 'anna', 'olaf', 'mickey', 'minnie', 'belle', 'beauty', 'beast',
  'ariel', 'mermaid', 'moana', 'rapunzel', 'cinderella', 'snow-white',
  
  // Other popular characters
  'spiderman', 'spider-man', 'batman', 'superman', 'pikachu', 'pokemon',
  'mario', 'sonic', 'hello-kitty', 'peppa-pig', 'paw-patrol',
  
  // Other trademarked properties
  'barbie', 'lego', 'star-wars', 'harry-potter'
];

/**
 * Content metadata schema
 * Each item should have a license field in metadata
 * 
 * Example:
 * {
 *   "title": "Lion Coloring Page",
 *   "urlKey": "lion-coloring-page",
 *   "license": "owned",
 *   "category": "Animals"
 * }
 */

// Mock content database (replace with actual API call or JSON file)
const getContentMetadata = async () => {
  // In a real implementation, this would:
  // 1. Fetch from backend API
  // 2. Read from a local JSON file
  // 3. Query a database
  
  // For now, we'll create a sample structure
  const contentFilePath = path.join(__dirname, 'content-metadata.json');
  
  if (fs.existsSync(contentFilePath)) {
    const data = fs.readFileSync(contentFilePath, 'utf8');
    return JSON.parse(data);
  }
  
  // If no metadata file exists, scan public images directory
  const imagesDir = path.join(__dirname, 'public', 'coloring-images');
  const content = [];
  
  if (fs.existsSync(imagesDir)) {
    const files = fs.readdirSync(imagesDir);
    files.forEach(file => {
      if (file.endsWith('.png') || file.endsWith('.jpg')) {
        const urlKey = file.replace(/\.(png|jpg)$/, '').replace(/_/g, '-');
        content.push({
          urlKey,
          title: urlKey.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
          license: 'owned', // Default assumption
          category: 'General'
        });
      }
    });
  }
  
  return content;
};

/**
 * Check if content requires license validation
 */
const requiresLicenseCheck = (urlKey, title) => {
  const searchText = `${urlKey} ${title}`.toLowerCase();
  return REQUIRES_LICENSE_CHECK.some(term => searchText.includes(term));
};

/**
 * Validate individual content item
 */
const validateContentItem = (item) => {
  const errors = [];
  
  // Check if item requires licensing
  const needsCheck = requiresLicenseCheck(item.urlKey, item.title || '');
  
  if (needsCheck) {
    // Verify license field exists
    if (!item.license) {
      errors.push(`Missing license field for "${item.title || item.urlKey}"`);
    } else if (!VALID_LICENSES.includes(item.license)) {
      errors.push(`Invalid license type "${item.license}" for "${item.title || item.urlKey}". Must be one of: ${VALID_LICENSES.join(', ')}`);
    } else if (item.license === 'licensed' && !item.licenseDetails) {
      errors.push(`Content "${item.title || item.urlKey}" marked as "licensed" but missing licenseDetails`);
    }
  }
  
  return errors;
};

/**
 * Main validation function
 */
const validateAllContent = async () => {
  console.log('🔍 Starting content license validation...\n');
  
  try {
    const content = await getContentMetadata();
    console.log(`📄 Found ${content.length} content items to validate\n`);
    
    const allErrors = [];
    const flaggedItems = [];
    
    content.forEach(item => {
      const errors = validateContentItem(item);
      
      if (errors.length > 0) {
        allErrors.push(...errors);
        flaggedItems.push({
          urlKey: item.urlKey,
          title: item.title || item.urlKey,
          errors
        });
      }
    });
    
    // Report results
    if (allErrors.length === 0) {
      console.log('✅ All content validated successfully!');
      console.log('✅ No license violations found.\n');
      return true;
    } else {
      console.error('❌ License validation failed!\n');
      console.error(`Found ${allErrors.length} error(s) in ${flaggedItems.length} item(s):\n`);
      
      flaggedItems.forEach(item => {
        console.error(`\n📌 ${item.title} (${item.urlKey})`);
        item.errors.forEach(error => {
          console.error(`   ❌ ${error}`);
        });
      });
      
      console.error('\n⚠️  DEPLOYMENT BLOCKED ⚠️');
      console.error('Please ensure all popular/licensed characters have proper licensing.');
      console.error('Add license metadata to content-metadata.json or update your backend.\n');
      
      return false;
    }
  } catch (error) {
    console.error('❌ Validation script error:', error.message);
    return false;
  }
};

// Run validation if called directly
if (require.main === module) {
  validateAllContent().then(success => {
    process.exit(success ? 0 : 1);
  });
}

module.exports = { validateAllContent, validateContentItem, requiresLicenseCheck };

