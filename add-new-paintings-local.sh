#!/bin/bash

# Script to add new paintings to local database via API
BACKEND_URL="http://localhost:8080"

echo "Adding new Occupations paintings to local database..."

# Occupations
curl -X POST "${BACKEND_URL}/api/paintings" \
  -H "Content-Type: application/json" \
  -d '{
    "urlKey": "policewoman",
    "title": "Policewoman",
    "titleEs": "Mujer Policía",
    "description": "A brave policewoman protecting the community - color her uniform and badge!",
    "descriptionEs": "Una valiente mujer policía protegiendo la comunidad - ¡colorea su uniforme y placa!",
    "imageUrl": "/coloring-images/policewoman.png",
    "category": "Occupations",
    "difficulty": 2,
    "featured": false
  }'

curl -X POST "${BACKEND_URL}/api/paintings" \
  -H "Content-Type: application/json" \
  -d '{
    "urlKey": "chef-holding-a-dish",
    "title": "Chef Holding a Dish",
    "titleEs": "Chef Con un Plato",
    "description": "A talented chef presenting a delicious dish - color this culinary masterpiece!",
    "descriptionEs": "Un talentoso chef presentando un delicioso plato - ¡colorea esta obra maestra culinaria!",
    "imageUrl": "/coloring-images/chef_holding_a_dish.png",
    "category": "Occupations",
    "difficulty": 2,
    "featured": false
  }'

curl -X POST "${BACKEND_URL}/api/paintings" \
  -H "Content-Type: application/json" \
  -d '{
    "urlKey": "post-woman",
    "title": "Post Woman",
    "titleEs": "Cartera",
    "description": "A friendly mail carrier delivering letters and packages - color her uniform!",
    "descriptionEs": "Una amable cartera entregando cartas y paquetes - ¡colorea su uniforme!",
    "imageUrl": "/coloring-images/post_woman.png",
    "category": "Occupations",
    "difficulty": 2,
    "featured": false
  }'

curl -X POST "${BACKEND_URL}/api/paintings" \
  -H "Content-Type: application/json" \
  -d '{
    "urlKey": "construction-worker",
    "title": "Construction Worker",
    "titleEs": "Trabajador de Construcción",
    "description": "A hardworking construction worker building amazing structures - color their safety gear!",
    "descriptionEs": "Un trabajador de construcción trabajando duro construyendo estructuras increíbles - ¡colorea su equipo de seguridad!",
    "imageUrl": "/coloring-images/construction_worker.png",
    "category": "Occupations",
    "difficulty": 2,
    "featured": false
  }'

curl -X POST "${BACKEND_URL}/api/paintings" \
  -H "Content-Type: application/json" \
  -d '{
    "urlKey": "artist",
    "title": "Artist",
    "titleEs": "Artista",
    "description": "A creative artist painting a beautiful picture - color this artistic scene!",
    "descriptionEs": "Un artista creativo pintando una hermosa imagen - ¡colorea esta escena artística!",
    "imageUrl": "/coloring-images/artist.png",
    "category": "Occupations",
    "difficulty": 2,
    "featured": false
  }'

curl -X POST "${BACKEND_URL}/api/paintings" \
  -H "Content-Type: application/json" \
  -d '{
    "urlKey": "teacher",
    "title": "Teacher",
    "titleEs": "Maestra",
    "description": "An inspiring teacher helping students learn - color this educational scene!",
    "descriptionEs": "Una maestra inspiradora ayudando a los estudiantes a aprender - ¡colorea esta escena educativa!",
    "imageUrl": "/coloring-images/teacher.png",
    "category": "Occupations",
    "difficulty": 2,
    "featured": false
  }'

curl -X POST "${BACKEND_URL}/api/paintings" \
  -H "Content-Type: application/json" \
  -d '{
    "urlKey": "male-chef",
    "title": "Male Chef",
    "titleEs": "Chef",
    "description": "A skilled chef cooking delicious meals - color his chef hat and apron!",
    "descriptionEs": "Un chef hábil cocinando comidas deliciosas - ¡colorea su gorro y delantal de chef!",
    "imageUrl": "/coloring-images/male_chef.png",
    "category": "Occupations",
    "difficulty": 2,
    "featured": false
  }'

curl -X POST "${BACKEND_URL}/api/paintings" \
  -H "Content-Type: application/json" \
  -d '{
    "urlKey": "astronaut-in-space",
    "title": "Astronaut in Space",
    "titleEs": "Astronauta en el Espacio",
    "description": "An astronaut exploring the wonders of space - color this cosmic adventure!",
    "descriptionEs": "Un astronauta explorando las maravillas del espacio - ¡colorea esta aventura cósmica!",
    "imageUrl": "/coloring-images/astronaut_in_space.png",
    "category": "Occupations",
    "difficulty": 3,
    "featured": false
  }'

curl -X POST "${BACKEND_URL}/api/paintings" \
  -H "Content-Type: application/json" \
  -d '{
    "urlKey": "female-chef",
    "title": "Female Chef",
    "titleEs": "Chef Mujer",
    "description": "A talented female chef creating culinary delights - color her kitchen attire!",
    "descriptionEs": "Una talentosa chef creando delicias culinarias - ¡colorea su atuendo de cocina!",
    "imageUrl": "/coloring-images/female_chef.png",
    "category": "Occupations",
    "difficulty": 2,
    "featured": false
  }'

curl -X POST "${BACKEND_URL}/api/paintings" \
  -H "Content-Type: application/json" \
  -d '{
    "urlKey": "firewoman",
    "title": "Firewoman",
    "titleEs": "Bombera",
    "description": "A brave firewoman saving lives and fighting fires - color her firefighter gear!",
    "descriptionEs": "Una valiente bombera salvando vidas y apagando incendios - ¡colorea su equipo de bombero!",
    "imageUrl": "/coloring-images/firewoman.png",
    "category": "Occupations",
    "difficulty": 2,
    "featured": false
  }'

curl -X POST "${BACKEND_URL}/api/paintings" \
  -H "Content-Type: application/json" \
  -d '{
    "urlKey": "doctor",
    "title": "Doctor",
    "titleEs": "Doctor",
    "description": "A caring doctor helping patients feel better - color this medical hero!",
    "descriptionEs": "Un doctor cariñoso ayudando a los pacientes a sentirse mejor - ¡colorea a este héroe médico!",
    "imageUrl": "/coloring-images/doctor.png",
    "category": "Occupations",
    "difficulty": 2,
    "featured": false
  }'

echo ""
echo "Adding new Vehicles paintings to local database..."

# Vehicles (Transportation)
curl -X POST "${BACKEND_URL}/api/paintings" \
  -H "Content-Type: application/json" \
  -d '{
    "urlKey": "airplane",
    "title": "Airplane",
    "titleEs": "Avión",
    "description": "A fantastic airplane flying through the clouds - color this amazing aircraft!",
    "descriptionEs": "Un fantástico avión volando por las nubes - ¡colorea esta increíble aeronave!",
    "imageUrl": "/coloring-images/airplane.png",
    "category": "Vehicles",
    "difficulty": 2,
    "featured": false
  }'

curl -X POST "${BACKEND_URL}/api/paintings" \
  -H "Content-Type: application/json" \
  -d '{
    "urlKey": "ship",
    "title": "Ship",
    "titleEs": "Barco",
    "description": "A majestic ship sailing the seas - color this seafaring vessel!",
    "descriptionEs": "Un majestuoso barco navegando los mares - ¡colorea este barco marinero!",
    "imageUrl": "/coloring-images/ship.png",
    "category": "Vehicles",
    "difficulty": 2,
    "featured": false
  }'

curl -X POST "${BACKEND_URL}/api/paintings" \
  -H "Content-Type: application/json" \
  -d '{
    "urlKey": "kids-sailing-a-boat",
    "title": "Kids Sailing a Boat",
    "titleEs": "Niños Navegando un Bote",
    "description": "Kids having fun sailing a boat on the water - color this nautical adventure!",
    "descriptionEs": "Niños divirtiéndose navegando un bote en el agua - ¡colorea esta aventura náutica!",
    "imageUrl": "/coloring-images/kids_sailing_a_boat.png",
    "category": "Vehicles",
    "difficulty": 2,
    "featured": false
  }'

curl -X POST "${BACKEND_URL}/api/paintings" \
  -H "Content-Type: application/json" \
  -d '{
    "urlKey": "spaceship",
    "title": "Spaceship",
    "titleEs": "Nave Espacial",
    "description": "A futuristic spaceship traveling through the cosmos - color this space vehicle!",
    "descriptionEs": "Una nave espacial futurista viajando por el cosmos - ¡colorea este vehículo espacial!",
    "imageUrl": "/coloring-images/spaceship.png",
    "category": "Vehicles",
    "difficulty": 2,
    "featured": false
  }'

curl -X POST "${BACKEND_URL}/api/paintings" \
  -H "Content-Type: application/json" \
  -d '{
    "urlKey": "kid-riding-a-bicycle",
    "title": "Kid Riding a Bicycle",
    "titleEs": "Niño Montando una Bicicleta",
    "description": "A happy kid riding a bicycle on a sunny day - color this fun ride!",
    "descriptionEs": "Un niño feliz montando una bicicleta en un día soleado - ¡colorea este paseo divertido!",
    "imageUrl": "/coloring-images/kid_riding_a_bicycle.png",
    "category": "Vehicles",
    "difficulty": 2,
    "featured": false
  }'

curl -X POST "${BACKEND_URL}/api/paintings" \
  -H "Content-Type: application/json" \
  -d '{
    "urlKey": "motorcycle",
    "title": "Motorcycle",
    "titleEs": "Motocicleta",
    "description": "A cool motorcycle ready for adventure - color this awesome bike!",
    "descriptionEs": "Una genial motocicleta lista para la aventura - ¡colorea esta increíble moto!",
    "imageUrl": "/coloring-images/motorcycle.png",
    "category": "Vehicles",
    "difficulty": 2,
    "featured": false
  }'

curl -X POST "${BACKEND_URL}/api/paintings" \
  -H "Content-Type: application/json" \
  -d '{
    "urlKey": "beetle",
    "title": "Beetle Car",
    "titleEs": "Volkswagen Beetle",
    "description": "A classic Volkswagen Beetle car - color this iconic vehicle!",
    "descriptionEs": "Un clásico auto Volkswagen Beetle - ¡colorea este vehículo icónico!",
    "imageUrl": "/coloring-images/beetle.png",
    "category": "Vehicles",
    "difficulty": 2,
    "featured": false
  }'

curl -X POST "${BACKEND_URL}/api/paintings" \
  -H "Content-Type: application/json" \
  -d '{
    "urlKey": "muscle-car",
    "title": "Muscle Car",
    "titleEs": "Auto Muscle",
    "description": "A powerful muscle car with amazing style - color this speed machine!",
    "descriptionEs": "Un poderoso auto muscle con estilo increíble - ¡colorea esta máquina de velocidad!",
    "imageUrl": "/coloring-images/muscle_car.png",
    "category": "Vehicles",
    "difficulty": 2,
    "featured": false
  }'

curl -X POST "${BACKEND_URL}/api/paintings" \
  -H "Content-Type: application/json" \
  -d '{
    "urlKey": "mercedes-gull-wing-coupe",
    "title": "Mercedes Gull Wing Coupe",
    "titleEs": "Mercedes Coupé Alas de Gaviota",
    "description": "A stunning Mercedes coupe with gull-wing doors - color this luxury sports car!",
    "descriptionEs": "Un impresionante coupé Mercedes con puertas de alas de gaviota - ¡colorea este auto deportivo de lujo!",
    "imageUrl": "/coloring-images/mercedes_gull_wing_coupe.png",
    "category": "Vehicles",
    "difficulty": 3,
    "featured": false
  }'

echo ""
echo "Adding new Mandalas paintings to local database..."

# Mandalas
curl -X POST "${BACKEND_URL}/api/paintings" \
  -H "Content-Type: application/json" \
  -d '{
    "urlKey": "star-mandala",
    "title": "Star Mandala",
    "titleEs": "Mandala de Estrella",
    "description": "A beautiful star mandala with intricate patterns - perfect for relaxation and creativity!",
    "descriptionEs": "Una hermosa mandala de estrella con patrones intrincados - ¡perfecta para relajación y creatividad!",
    "imageUrl": "/coloring-images/star_mandala.png",
    "category": "Mandalas",
    "difficulty": 3,
    "featured": false
  }'

curl -X POST "${BACKEND_URL}/api/paintings" \
  -H "Content-Type: application/json" \
  -d '{
    "urlKey": "heart-with-cover-mandala",
    "title": "Heart with Cover Mandala",
    "titleEs": "Mandala de Corazón con Cubierta",
    "description": "An elegant heart mandala with decorative cover - color this loving design!",
    "descriptionEs": "Una elegante mandala de corazón con cubierta decorativa - ¡colorea este diseño amoroso!",
    "imageUrl": "/coloring-images/heart_with_cover_mandala.png",
    "category": "Mandalas",
    "difficulty": 3,
    "featured": false
  }'

curl -X POST "${BACKEND_URL}/api/paintings" \
  -H "Content-Type: application/json" \
  -d '{
    "urlKey": "sun-mandala",
    "title": "Sun Mandala",
    "titleEs": "Mandala de Sol",
    "description": "A radiant sun mandala with beautiful rays - color this bright design!",
    "descriptionEs": "Una mandala de sol radiante con hermosos rayos - ¡colorea este diseño brillante!",
    "imageUrl": "/coloring-images/sun_mandala.png",
    "category": "Mandalas",
    "difficulty": 3,
    "featured": false
  }'

curl -X POST "${BACKEND_URL}/api/paintings" \
  -H "Content-Type: application/json" \
  -d '{
    "urlKey": "dolphin-mandala",
    "title": "Dolphin Mandala",
    "titleEs": "Mandala de Delfín",
    "description": "A playful dolphin mandala with ocean vibes - color this aquatic masterpiece!",
    "descriptionEs": "Una mandala de delfín juguetón con vibras del océano - ¡colorea esta obra maestra acuática!",
    "imageUrl": "/coloring-images/dolphine_mandala.png",
    "category": "Mandalas",
    "difficulty": 3,
    "featured": false
  }'

curl -X POST "${BACKEND_URL}/api/paintings" \
  -H "Content-Type: application/json" \
  -d '{
    "urlKey": "heart-mandala",
    "title": "Heart Mandala",
    "titleEs": "Mandala de Corazón",
    "description": "A lovely heart mandala filled with love and beauty - color with joy!",
    "descriptionEs": "Una hermosa mandala de corazón llena de amor y belleza - ¡colorea con alegría!",
    "imageUrl": "/coloring-images/heart_mandala.png",
    "category": "Mandalas",
    "difficulty": 3,
    "featured": false
  }'

echo ""
echo "✅ All new paintings added to local database!"
