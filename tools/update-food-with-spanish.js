#!/usr/bin/env node

/**
 * Update the food paintings we just added with Spanish translations
 */

const http = require('http');

const API_BASE_URL = 'http://localhost:8080/api/paintings';

// Spanish translations to add to existing paintings
const spanishUpdates = [
  { urlKey: 'apple', titleEs: 'Manzana', descriptionEs: '¡Una deliciosa página para colorear de manzana! Perfecta para aprender sobre frutas saludables y nutrición.' },
  { urlKey: 'banana', titleEs: 'Plátano', descriptionEs: '¡Una divertida página para colorear de plátano! Los niños pueden aprender sobre esta popular fruta amarilla.' },
  { urlKey: 'bread', titleEs: 'Pan', descriptionEs: '¡Una deliciosa página para colorear de pan! Aprende sobre hornear y este alimento básico.' },
  { urlKey: 'broccoli', titleEs: 'Brócoli', descriptionEs: '¡Página para colorear de brócoli saludable! Una forma divertida de aprender sobre verduras verdes.' },
  { urlKey: 'carrot', titleEs: 'Zanahoria', descriptionEs: '¡Una página para colorear de zanahoria crujiente! Perfecta para aprender sobre verduras naranjas.' },
  { urlKey: 'cheese', titleEs: 'Queso', descriptionEs: '¡Deliciosa página para colorear de queso! Los niños pueden colorear este sabroso producto lácteo.' },
  { urlKey: 'corn', titleEs: 'Maíz', descriptionEs: '¡Página para colorear de mazorca de maíz dulce! Una verdura divertida que a los niños les encanta comer y colorear.' },
  { urlKey: 'cupcake', titleEs: 'Cupcake', descriptionEs: '¡Una dulce página para colorear de cupcake! Perfecta para fiestas de cumpleaños y celebraciones.' },
  { urlKey: 'donuts', titleEs: 'Donas', descriptionEs: '¡Página para colorear de donas deliciosas! Dulces con glaseado y chispas para colorear.' },
  { urlKey: 'fries', titleEs: 'Papas Fritas', descriptionEs: '¡Página para colorear de papas fritas crujientes! Un favorito popular de comida rápida.' },
  { urlKey: 'grapes', titleEs: 'Uvas', descriptionEs: '¡Una página para colorear de un racimo de uvas deliciosas! Aprende sobre esta fruta saludable.' },
  { urlKey: 'hamburger', titleEs: 'Hamburguesa', descriptionEs: '¡Una página para colorear de hamburguesa jugosa! Colorea el pan, la carne, la lechuga y los ingredientes.' },
  { urlKey: 'hotdog', titleEs: 'Perrito Caliente', descriptionEs: '¡Una página para colorear de perrito caliente sabroso! Perfecta para picnics y barbacoas.' },
  { urlKey: 'ice-cream', titleEs: 'Helado', descriptionEs: '¡Deliciosa página para colorear de cono de helado! Un dulce regalo de verano para colorear.' },
  { urlKey: 'pineapple', titleEs: 'Piña', descriptionEs: '¡Una página para colorear de piña tropical! Aprende sobre esta fruta dulce y ácida.' },
  { urlKey: 'pizza', titleEs: 'Pizza', descriptionEs: '¡Una deliciosa página para colorear de rebanada de pizza! Colorea el queso, la salsa y los ingredientes.' },
  { urlKey: 'sushi', titleEs: 'Sushi', descriptionEs: '¡Página para colorear de sushi japonés tradicional! Aprende sobre esta comida saludable y deliciosa.' },
  { urlKey: 'tortilla', titleEs: 'Tortilla', descriptionEs: '¡Una página para colorear de pila de tortillas! Aprende sobre esta importante comida mexicana.' },
  { urlKey: 'watermelon', titleEs: 'Sandía', descriptionEs: '¡Una página para colorear de rebanada de sandía jugosa! Fruta de verano perfecta para colorear.' }
];

function getPaintingByUrlKey(urlKey) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 8080,
      path: `/api/paintings/${urlKey}`,
      method: 'GET'
    };

    const req = http.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(JSON.parse(data));
        } else {
          reject(new Error(`GET failed with status ${res.statusCode}`));
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

function updatePainting(id, painting) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(painting);

    const options = {
      hostname: 'localhost',
      port: 8080,
      path: `/api/paintings/${id}`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    };

    const req = http.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve({ success: true, painting });
        } else {
          resolve({ success: false, status: res.statusCode, error: responseData });
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function main() {
  console.log('🇪🇸 Adding Spanish Translations to Food Paintings');
  console.log('='.repeat(70));
  console.log();
  console.log(`Paintings to update: ${spanishUpdates.length}`);
  console.log();

  let successCount = 0;
  let failureCount = 0;
  const failures = [];

  for (const update of spanishUpdates) {
    try {
      process.stdout.write(`🍎 ${update.urlKey}... `);
      
      // Get existing painting
      const painting = await getPaintingByUrlKey(update.urlKey);
      
      // Add Spanish translations
      painting.titleEs = update.titleEs;
      painting.descriptionEs = update.descriptionEs;
      
      // Update
      const result = await updatePainting(painting.id, painting);
      
      if (result.success) {
        console.log(`✅ → ${update.titleEs}`);
        successCount++;
      } else {
        console.log(`❌ (${result.status})`);
        failureCount++;
        failures.push({ urlKey: update.urlKey, error: result.error });
      }
      
      // Small delay
      await new Promise(resolve => setTimeout(resolve, 100));
      
    } catch (error) {
      console.log(`❌ ${error.message}`);
      failureCount++;
      failures.push({ urlKey: update.urlKey, error: error.message });
    }
  }

  console.log();
  console.log('='.repeat(70));
  console.log('📊 Summary:');
  console.log(`   ✅ Success: ${successCount}/${spanishUpdates.length}`);
  console.log(`   ❌ Failed: ${failureCount}/${spanishUpdates.length}`);
  
  if (failures.length > 0) {
    console.log();
    console.log('❌ Failures:');
    failures.forEach(f => {
      console.log(`   - ${f.urlKey}: ${f.error}`);
    });
  }
  
  console.log();
  console.log('✨ Done! All food paintings now have Spanish translations!');
  console.log('   Visit: http://localhost:3000/category/food');
  console.log('   Or Spanish: http://localhost:3000/es/category/food');
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});

