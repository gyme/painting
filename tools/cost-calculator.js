#!/usr/bin/env node

/**
 * Cost Calculator for Batch Coloring Page Generation
 * 
 * Estimates costs for different generation methods and scales.
 * 
 * Usage:
 *   node cost-calculator.js 1000
 *   node cost-calculator.js 1000 --service dalle --quality hd
 */

const args = process.argv.slice(2);

if (args.length === 0 || args[0] === '--help') {
  console.log(`
💰 Coloring Page Generation Cost Calculator

Usage:
  node cost-calculator.js <quantity> [options]

Options:
  --service <dalle|stability|local>    Service to use (default: all)
  --quality <standard|hd>              Image quality (default: standard)
  --compare                            Compare all options

Examples:
  node cost-calculator.js 1000
  node cost-calculator.js 5000 --service dalle --quality hd
  node cost-calculator.js 10000 --compare

Services:
  dalle      - OpenAI DALL-E 3 (highest quality)
  stability  - Stability AI (good quality, lower cost)
  local      - Local Stable Diffusion (free, requires GPU)
`);
  process.exit(0);
}

const quantity = parseInt(args[0]);
const service = args.includes('--service') ? args[args.indexOf('--service') + 1] : null;
const quality = args.includes('--quality') ? args[args.indexOf('--quality') + 1] : 'standard';
const compare = args.includes('--compare');

// Cost per image for different services
const COSTS = {
  dalle: {
    standard: 0.040,
    hd: 0.080
  },
  stability: {
    standard: 0.012,
    hd: 0.015
  },
  local: {
    standard: 0,
    hd: 0
  }
};

// Generation time estimates (minutes per 100 images)
const TIME_PER_100 = {
  dalle: 20,        // ~2 seconds per image + API overhead
  stability: 15,    // ~1.5 seconds per image
  local: 40         // ~4 seconds per image (depends on GPU)
};

// Setup costs
const SETUP_COSTS = {
  dalle: 0,         // Just API key
  stability: 0,     // Just API key
  local: 1500       // GPU hardware (RTX 3090 or similar)
};

function formatCost(cost) {
  return `$${cost.toFixed(2)}`;
}

function formatTime(minutes) {
  if (minutes < 60) return `${Math.round(minutes)} minutes`;
  const hours = Math.floor(minutes / 60);
  const mins = Math.round(minutes % 60);
  if (hours < 24) return `${hours}h ${mins}m`;
  const days = Math.floor(hours / 24);
  const remainingHours = hours % 24;
  return `${days}d ${remainingHours}h`;
}

function calculateCosts(service, quality, quantity) {
  const costPerImage = COSTS[service][quality];
  const totalCost = costPerImage * quantity;
  const setupCost = SETUP_COSTS[service];
  const totalTime = (quantity / 100) * TIME_PER_100[service];
  
  return {
    service,
    quality,
    quantity,
    costPerImage,
    totalCost,
    setupCost,
    totalWithSetup: totalCost + setupCost,
    totalTime,
    costPer1000: costPerImage * 1000
  };
}

function printCalculation(calc) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`${calc.service.toUpperCase()} - ${calc.quality.toUpperCase()} Quality`);
  console.log('='.repeat(60));
  console.log(`\nQuantity: ${calc.quantity.toLocaleString()} images`);
  console.log(`\nCosts:`);
  console.log(`  • Per image: ${formatCost(calc.costPerImage)}`);
  console.log(`  • Per 1,000: ${formatCost(calc.costPer1000)}`);
  console.log(`  • Total generation: ${formatCost(calc.totalCost)}`);
  if (calc.setupCost > 0) {
    console.log(`  • Setup cost: ${formatCost(calc.setupCost)}`);
    console.log(`  • Grand total: ${formatCost(calc.totalWithSetup)}`);
  }
  console.log(`\nTime: ${formatTime(calc.totalTime)}`);
  
  // Break-even analysis for local
  if (calc.service === 'local' && calc.setupCost > 0) {
    const dalleStandardCost = COSTS.dalle.standard * calc.quantity;
    const breakEvenImages = Math.ceil(calc.setupCost / COSTS.dalle.standard);
    console.log(`\nBreak-even analysis:`);
    console.log(`  • vs DALL-E standard: ${breakEvenImages.toLocaleString()} images`);
    console.log(`  • Savings vs DALL-E: ${formatCost(dalleStandardCost - calc.totalWithSetup)}`);
  }
}

function compareAll(quantity, quality) {
  console.log(`\n💰 Cost Comparison for ${quantity.toLocaleString()} ${quality} images\n`);
  
  const services = ['dalle', 'stability', 'local'];
  const calculations = services.map(s => calculateCosts(s, quality, quantity));
  
  // Sort by total cost (with setup)
  calculations.sort((a, b) => a.totalWithSetup - b.totalWithSetup);
  
  console.log('┌─────────────┬──────────────┬──────────────┬──────────────┬─────────────┐');
  console.log('│ Service     │ Per Image    │ Per 1,000    │ Total Cost   │ Time        │');
  console.log('├─────────────┼──────────────┼──────────────┼──────────────┼─────────────┤');
  
  calculations.forEach(calc => {
    const service = calc.service.padEnd(11);
    const perImage = formatCost(calc.costPerImage).padEnd(12);
    const per1000 = formatCost(calc.costPer1000).padEnd(12);
    const total = formatCost(calc.totalWithSetup).padEnd(12);
    const time = formatTime(calc.totalTime).padEnd(11);
    
    console.log(`│ ${service} │ ${perImage} │ ${per1000} │ ${total} │ ${time} │`);
  });
  
  console.log('└─────────────┴──────────────┴──────────────┴──────────────┴─────────────┘');
  
  // Recommendations
  console.log(`\n📊 Recommendations:\n`);
  
  const cheapest = calculations[0];
  console.log(`💰 Most cost-effective: ${cheapest.service.toUpperCase()}`);
  console.log(`   ${formatCost(cheapest.totalWithSetup)} total`);
  
  const fastest = calculations.reduce((a, b) => a.totalTime < b.totalTime ? a : b);
  console.log(`\n⚡ Fastest: ${fastest.service.toUpperCase()}`);
  console.log(`   ${formatTime(fastest.totalTime)}`);
  
  const dalleCalc = calculations.find(c => c.service === 'dalle');
  console.log(`\n⭐ Best quality: DALL-E`);
  console.log(`   ${formatCost(dalleCalc.totalWithSetup)} total`);
  
  // Hybrid recommendation
  const hybridDallePremium = quantity * 0.1 * COSTS.dalle.hd;
  const hybridStabilityBulk = quantity * 0.9 * COSTS.stability.standard;
  const hybridTotal = hybridDallePremium + hybridStabilityBulk;
  
  console.log(`\n🎯 Hybrid approach (recommended):`);
  console.log(`   10% DALL-E HD (premium): ${formatCost(hybridDallePremium)}`);
  console.log(`   90% Stability (bulk): ${formatCost(hybridStabilityBulk)}`);
  console.log(`   Total: ${formatCost(hybridTotal)}`);
  console.log(`   Savings vs full DALL-E: ${formatCost(dalleCalc.totalCost - hybridTotal)}`);
}

// Main
console.log('\n🎨 Coloring Page Generation Cost Calculator\n');

if (isNaN(quantity) || quantity < 1) {
  console.error('❌ Error: Please specify a valid quantity');
  process.exit(1);
}

if (compare || !service) {
  compareAll(quantity, quality);
} else {
  if (!COSTS[service]) {
    console.error(`❌ Error: Unknown service '${service}'`);
    console.error(`Available: dalle, stability, local`);
    process.exit(1);
  }
  
  const calc = calculateCosts(service, quality, quantity);
  printCalculation(calc);
}

console.log('\n💡 Tips for cost optimization:');
console.log('  • Use standard quality for bulk content');
console.log('  • Reserve HD quality for featured/premium images');
console.log('  • Consider hybrid approach for best value');
console.log('  • Local generation breaks even at ~37,500 images');
console.log('  • Batch processing reduces overhead');
console.log('');

