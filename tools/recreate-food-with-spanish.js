#!/usr/bin/env node

/**
 * Delete and recreate food paintings with Spanish translations included from the start
 */

const http = require('http');

const foodPaintings = [
  {urlKey:"apple",title:"Apple",titleEs:"Manzana",description:"A delicious apple coloring page! Perfect for learning about healthy fruits and nutrition.",descriptionEs:"¡Una deliciosa página para colorear de manzana! Perfecta para aprender sobre frutas saludables y nutrición.",category:"Food",tags:"apple,fruit,healthy,food,snack,nutrition",imageUrl:"/coloring-images/apple.png",thumbnailUrl:"/coloring-images/apple.png",difficulty:1},
  {urlKey:"banana",title:"Banana",titleEs:"Plátano",description:"A fun banana coloring page! Kids can learn about this popular yellow fruit.",descriptionEs:"¡Una divertida página para colorear de plátano! Los niños pueden aprender sobre esta popular fruta amarilla.",category:"Food",tags:"banana,fruit,yellow,healthy,food,snack",imageUrl:"/coloring-images/banana.png",thumbnailUrl:"/coloring-images/banana.png",difficulty:1},
  {urlKey:"bread",title:"Bread",titleEs:"Pan",description:"A delicious loaf of bread coloring page! Learn about baking and this staple food.",descriptionEs:"¡Una deliciosa página para colorear de pan! Aprende sobre hornear y este alimento básico.",category:"Food",tags:"bread,baking,food,bakery,loaf,wheat",imageUrl:"/coloring-images/bread.png",thumbnailUrl:"/coloring-images/bread.png",difficulty:2},
  {urlKey:"broccoli",title:"Broccoli",titleEs:"Brócoli",description:"Healthy broccoli coloring page! A fun way to learn about green vegetables.",descriptionEs:"¡Página para colorear de brócoli saludable! Una forma divertida de aprender sobre verduras verdes.",category:"Food",tags:"broccoli,vegetable,healthy,green,food,nutrition",imageUrl:"/coloring-images/broccoli.png",thumbnailUrl:"/coloring-images/broccoli.png",difficulty:2},
  {urlKey:"carrot",title:"Carrot",titleEs:"Zanahoria",description:"A crunchy carrot coloring page! Perfect for learning about orange vegetables.",descriptionEs:"¡Una página para colorear de zanahoria crujiente! Perfecta para aprender sobre verduras naranjas.",category:"Food",tags:"carrot,vegetable,healthy,orange,food,crunchy",imageUrl:"/coloring-images/carrot.png",thumbnailUrl:"/coloring-images/carrot.png",difficulty:1},
  {urlKey:"cheese",title:"Cheese",titleEs:"Queso",description:"Delicious cheese coloring page! Kids can color this tasty dairy product.",descriptionEs:"¡Deliciosa página para colorear de queso! Los niños pueden colorear este sabroso producto lácteo.",category:"Food",tags:"cheese,dairy,food,snack,yellow",imageUrl:"/coloring-images/cheese.png",thumbnailUrl:"/coloring-images/cheese.png",difficulty:2},
  {urlKey:"corn",title:"Corn",titleEs:"Maíz",description:"Sweet corn on the cob coloring page! A fun vegetable that kids love to eat and color.",descriptionEs:"¡Página para colorear de mazorca de maíz dulce! Una verdura divertida que a los niños les encanta comer y colorear.",category:"Food",tags:"corn,vegetable,yellow,food,cob,sweet",imageUrl:"/coloring-images/corn.png",thumbnailUrl:"/coloring-images/corn.png",difficulty:2},
  {urlKey:"cupcake",title:"Cupcake",titleEs:"Cupcake",description:"A sweet cupcake coloring page! Perfect for birthday parties and celebrations.",descriptionEs:"¡Una dulce página para colorear de cupcake! Perfecta para fiestas de cumpleaños y celebraciones.",category:"Food",tags:"cupcake,dessert,sweet,cake,birthday,treat",imageUrl:"/coloring-images/cupcake.png",thumbnailUrl:"/coloring-images/cupcake.png",difficulty:2},
  {urlKey:"donuts",title:"Donuts",titleEs:"Donas",description:"Yummy donuts coloring page! Sweet treats with frosting and sprinkles to color.",descriptionEs:"¡Página para colorear de donas deliciosas! Dulces con glaseado y chispas para colorear.",category:"Food",tags:"donuts,dessert,sweet,treats,frosting,sprinkles",imageUrl:"/coloring-images/donuts.png",thumbnailUrl:"/coloring-images/donuts.png",difficulty:2},
  {urlKey:"fries",title:"French Fries",titleEs:"Papas Fritas",description:"Crispy french fries coloring page! A popular fast food favorite.",descriptionEs:"¡Página para colorear de papas fritas crujientes! Un favorito popular de comida rápida.",category:"Food",tags:"fries,french fries,fast food,potatoes,snack",imageUrl:"/coloring-images/fries.png",thumbnailUrl:"/coloring-images/fries.png",difficulty:2},
  {urlKey:"grapes",title:"Grapes",titleEs:"Uvas",description:"A bunch of delicious grapes coloring page! Learn about this healthy fruit.",descriptionEs:"¡Una página para colorear de un racimo de uvas deliciosas! Aprende sobre esta fruta saludable.",category:"Food",tags:"grapes,fruit,healthy,purple,bunch,snack",imageUrl:"/coloring-images/grapes.png",thumbnailUrl:"/coloring-images/grapes.png",difficulty:2},
  {urlKey:"hamburger",title:"Hamburger",titleEs:"Hamburguesa",description:"A juicy hamburger coloring page! Color the bun, patty, lettuce, and toppings.",descriptionEs:"¡Una página para colorear de hamburguesa jugosa! Colorea el pan, la carne, la lechuga y los ingredientes.",category:"Food",tags:"hamburger,burger,fast food,lunch,sandwich",imageUrl:"/coloring-images/humburger.png",thumbnailUrl:"/coloring-images/humburger.png",difficulty:2},
  {urlKey:"hotdog",title:"Hot Dog",titleEs:"Perrito Caliente",description:"A tasty hot dog coloring page! Perfect for picnics and barbecues.",descriptionEs:"¡Una página para colorear de perrito caliente sabroso! Perfecta para picnics y barbacoas.",category:"Food",tags:"hotdog,hot dog,fast food,picnic,bbq,sandwich",imageUrl:"/coloring-images/hotdog.png",thumbnailUrl:"/coloring-images/hotdog.png",difficulty:2},
  {urlKey:"ice-cream",title:"Ice Cream",titleEs:"Helado",description:"Delicious ice cream cone coloring page! A sweet summer treat to color.",descriptionEs:"¡Deliciosa página para colorear de cono de helado! Un dulce regalo de verano para colorear.",category:"Food",tags:"ice cream,dessert,sweet,cone,summer,treat",imageUrl:"/coloring-images/ice_cream.png",thumbnailUrl:"/coloring-images/ice_cream.png",difficulty:2},
  {urlKey:"pineapple",title:"Pineapple",titleEs:"Piña",description:"A tropical pineapple coloring page! Learn about this sweet and tangy fruit.",descriptionEs:"¡Una página para colorear de piña tropical! Aprende sobre esta fruta dulce y ácida.",category:"Food",tags:"pineapple,fruit,tropical,yellow,sweet,healthy",imageUrl:"/coloring-images/pineapple.png",thumbnailUrl:"/coloring-images/pineapple.png",difficulty:2},
  {urlKey:"pizza",title:"Pizza",titleEs:"Pizza",description:"A delicious pizza slice coloring page! Color the cheese, sauce, and toppings.",descriptionEs:"¡Una deliciosa página para colorear de rebanada de pizza! Colorea el queso, la salsa y los ingredientes.",category:"Food",tags:"pizza,italian,food,cheese,slice,dinner",imageUrl:"/coloring-images/pizza.png",thumbnailUrl:"/coloring-images/pizza.png",difficulty:2},
  {urlKey:"sushi",title:"Sushi",titleEs:"Sushi",description:"Traditional Japanese sushi coloring page! Learn about this healthy and delicious food.",descriptionEs:"¡Página para colorear de sushi japonés tradicional! Aprende sobre esta comida saludable y deliciosa.",category:"Food",tags:"sushi,japanese,food,rice,fish,healthy,asian",imageUrl:"/coloring-images/sushi.png",thumbnailUrl:"/coloring-images/sushi.png",difficulty:3},
  {urlKey:"tortilla",title:"Tortilla",titleEs:"Tortilla",description:"A stack of tortillas coloring page! Learn about this important Mexican food.",descriptionEs:"¡Una página para colorear de pila de tortillas! Aprende sobre esta importante comida mexicana.",category:"Food",tags:"tortilla,mexican,food,flatbread,corn,flour",imageUrl:"/coloring-images/tortilla.png",thumbnailUrl:"/coloring-images/tortilla.png",difficulty:2},
  {urlKey:"watermelon",title:"Watermelon",titleEs:"Sandía",description:"A juicy watermelon slice coloring page! Perfect summer fruit to color.",descriptionEs:"¡Una página para colorear de rebanada de sandía jugosa! Fruta de verano perfecta para colorear.",category:"Food",tags:"watermelon,fruit,summer,juicy,red,healthy",imageUrl:"/coloring-images/watermelon.png",thumbnailUrl:"/coloring-images/watermelon.png",difficulty:2}
];

function getPainting(urlKey) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 8080,
      path: `/api/paintings/${urlKey}`,
      method: 'GET'
    };

    http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(JSON.parse(data));
        } else {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null)).end();
  });
}

function deletePainting(id) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: 8080,
      path: `/api/paintings/${id}`,
      method: 'DELETE'
    };

    http.request(options, (res) => {
      resolve(res.statusCode === 204);
    }).on('error', () => resolve(false)).end();
  });
}

function createPainting(painting) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(painting);

    const options = {
      hostname: 'localhost',
      port: 8080,
      path: '/api/paintings',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    };

    const req = http.request(options, (res) => {
      let responseData = '';
      res.on('data', (chunk) => { responseData += chunk; });
      res.on('end', () => {
        if (res.statusCode === 200 || res.statusCode === 201) {
          resolve({ success: true, painting: JSON.parse(responseData) });
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
  console.log('🔄 Recreating Food Paintings with Spanish Translations');
  console.log('='.repeat(70));
  console.log();

  let successCount = 0;
  let failureCount = 0;

  for (const painting of foodPaintings) {
    try {
      process.stdout.write(`🍎 ${painting.title}... `);
      
      // Delete existing if present
      const existing = await getPainting(painting.urlKey);
      if (existing) {
        await deletePainting(existing.id);
        process.stdout.write(`deleted... `);
        await new Promise(resolve => setTimeout(resolve, 200));
      }
      
      // Create with Spanish
      const result = await createPainting(painting);
      
      if (result.success && result.painting.titleEs) {
        console.log(`✅ → ${result.painting.titleEs}`);
        successCount++;
      } else {
        console.log(`❌`);
        failureCount++;
      }
      
      await new Promise(resolve => setTimeout(resolve, 200));
      
    } catch (error) {
      console.log(`❌ ${error.message}`);
      failureCount++;
    }
  }

  console.log();
  console.log('='.repeat(70));
  console.log(`✅ Success: ${successCount}/${foodPaintings.length}`);
  console.log(`❌ Failed: ${failureCount}/${foodPaintings.length}`);
}

main().catch(console.error);

