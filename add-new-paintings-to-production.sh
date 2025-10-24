#!/bin/bash

# Add new paintings to production via API
# Categories: Basketball Players (8), K Pop Demon Hunters (5), Numbers (11), Mandalas (1)

API_URL="https://docker-composeyaml-production.up.railway.app/api/paintings"

echo "🎨 Adding new paintings to production..."
echo "========================================"

# Basketball Players
curl -X POST "$API_URL" -H "Content-Type: application/json" -d '{
  "urlKey": "giannis-antetokounmpo",
  "title": "Giannis Antetokounmpo",
  "description": "Color Giannis Antetokounmpo, the Greek Freak! Perfect for basketball fans and young athletes.",
  "titleEs": "Giannis Antetokounmpo",
  "descriptionEs": "¡Colorea a Giannis Antetokounmpo, el Greek Freak! Perfecto para fanáticos del baloncesto y jóvenes atletas.",
  "category": "Basketball Players",
  "difficulty": 2,
  "imageUrl": "/coloring-images/giannis_antetokounmpo.png",
  "thumbnailUrl": "/coloring-images/giannis_antetokounmpo.png",
  "featured": false
}'
echo "✅ Giannis Antetokounmpo"

curl -X POST "$API_URL" -H "Content-Type: application/json" -d '{
  "urlKey": "jayson-tatum",
  "title": "Jayson Tatum",
  "description": "Color Jayson Tatum, Boston Celtics star! Perfect for basketball fans and young athletes.",
  "titleEs": "Jayson Tatum",
  "descriptionEs": "¡Colorea a Jayson Tatum, estrella de Boston Celtics! Perfecto para fanáticos del baloncesto y jóvenes atletas.",
  "category": "Basketball Players",
  "difficulty": 2,
  "imageUrl": "/coloring-images/jayson_tatum.png",
  "thumbnailUrl": "/coloring-images/jayson_tatum.png",
  "featured": false
}'
echo "✅ Jayson Tatum"

curl -X POST "$API_URL" -H "Content-Type: application/json" -d '{
  "urlKey": "kawhi-leonard",
  "title": "Kawhi Leonard",
  "description": "Color Kawhi Leonard, the Klaw! Perfect for basketball fans and young athletes.",
  "titleEs": "Kawhi Leonard",
  "descriptionEs": "¡Colorea a Kawhi Leonard, el Klaw! Perfecto para fanáticos del baloncesto y jóvenes atletas.",
  "category": "Basketball Players",
  "difficulty": 2,
  "imageUrl": "/coloring-images/kawhi_leonard.png",
  "thumbnailUrl": "/coloring-images/kawhi_leonard.png",
  "featured": false
}'
echo "✅ Kawhi Leonard"

curl -X POST "$API_URL" -H "Content-Type: application/json" -d '{
  "urlKey": "kevin-durant",
  "title": "Kevin Durant",
  "description": "Color Kevin Durant, NBA superstar! Perfect for basketball fans and young athletes.",
  "titleEs": "Kevin Durant",
  "descriptionEs": "¡Colorea a Kevin Durant, superestrella de la NBA! Perfecto para fanáticos del baloncesto y jóvenes atletas.",
  "category": "Basketball Players",
  "difficulty": 2,
  "imageUrl": "/coloring-images/kevin_durant.png",
  "thumbnailUrl": "/coloring-images/kevin_durant.png",
  "featured": false
}'
echo "✅ Kevin Durant"

curl -X POST "$API_URL" -H "Content-Type: application/json" -d '{
  "urlKey": "kobe-bryant",
  "title": "Kobe Bryant",
  "description": "Color Kobe Bryant, the Black Mamba! Perfect for basketball fans and young athletes.",
  "titleEs": "Kobe Bryant",
  "descriptionEs": "¡Colorea a Kobe Bryant, la Mamba Negra! Perfecto para fanáticos del baloncesto y jóvenes atletas.",
  "category": "Basketball Players",
  "difficulty": 2,
  "imageUrl": "/coloring-images/kobe_bryant.png",
  "thumbnailUrl": "/coloring-images/kobe_bryant.png",
  "featured": false
}'
echo "✅ Kobe Bryant"

curl -X POST "$API_URL" -H "Content-Type: application/json" -d '{
  "urlKey": "lebron-james",
  "title": "LeBron James",
  "description": "Color LeBron James, the King! Perfect for basketball fans and young athletes.",
  "titleEs": "LeBron James",
  "descriptionEs": "¡Colorea a LeBron James, el Rey! Perfecto para fanáticos del baloncesto y jóvenes atletas.",
  "category": "Basketball Players",
  "difficulty": 2,
  "imageUrl": "/coloring-images/lebron_james.png",
  "thumbnailUrl": "/coloring-images/lebron_james.png",
  "featured": false
}'
echo "✅ LeBron James"

curl -X POST "$API_URL" -H "Content-Type: application/json" -d '{
  "urlKey": "michael-jordan",
  "title": "Michael Jordan",
  "description": "Color Michael Jordan, basketball legend! Perfect for basketball fans and young athletes.",
  "titleEs": "Michael Jordan",
  "descriptionEs": "¡Colorea a Michael Jordan, leyenda del baloncesto! Perfecto para fanáticos del baloncesto y jóvenes atletas.",
  "category": "Basketball Players",
  "difficulty": 2,
  "imageUrl": "/coloring-images/michael_jordan.png",
  "thumbnailUrl": "/coloring-images/michael_jordan.png",
  "featured": false
}'
echo "✅ Michael Jordan"

curl -X POST "$API_URL" -H "Content-Type: application/json" -d '{
  "urlKey": "stephen-curry",
  "title": "Stephen Curry",
  "description": "Color Stephen Curry, the three-point king! Perfect for basketball fans and young athletes.",
  "titleEs": "Stephen Curry",
  "descriptionEs": "¡Colorea a Stephen Curry, el rey de los triples! Perfecto para fanáticos del baloncesto y jóvenes atletas.",
  "category": "Basketball Players",
  "difficulty": 2,
  "imageUrl": "/coloring-images/stephen_curry.png",
  "thumbnailUrl": "/coloring-images/stephen_curry.png",
  "featured": false
}'
echo "✅ Stephen Curry"

# K Pop Demon Hunters
curl -X POST "$API_URL" -H "Content-Type: application/json" -d '{
  "urlKey": "k-pop-demon-hunters",
  "title": "K-Pop Demon Hunters",
  "description": "Color the K-Pop Demon Hunters team! Perfect for fans of action and music.",
  "titleEs": "Cazadores de Demonios K-Pop",
  "descriptionEs": "¡Colorea al equipo de Cazadores de Demonios K-Pop! Perfecto para fanáticos de la acción y la música.",
  "category": "K Pop Demon Hunters",
  "difficulty": 3,
  "imageUrl": "/coloring-images/k_pop_demon_hunters.png",
  "thumbnailUrl": "/coloring-images/k_pop_demon_hunters.png",
  "featured": true
}'
echo "✅ K-Pop Demon Hunters"

curl -X POST "$API_URL" -H "Content-Type: application/json" -d '{
  "urlKey": "mira",
  "title": "Mira",
  "description": "Color Mira, the fierce demon hunter! Perfect for fans of action heroes.",
  "titleEs": "Mira",
  "descriptionEs": "¡Colorea a Mira, la feroz cazadora de demonios! Perfecto para fanáticos de héroes de acción.",
  "category": "K Pop Demon Hunters",
  "difficulty": 3,
  "imageUrl": "/coloring-images/mira.png",
  "thumbnailUrl": "/coloring-images/mira.png",
  "featured": false
}'
echo "✅ Mira"

curl -X POST "$API_URL" -H "Content-Type: application/json" -d '{
  "urlKey": "rumi",
  "title": "Rumi",
  "description": "Color Rumi, the brave demon hunter! Perfect for fans of action heroes.",
  "titleEs": "Rumi",
  "descriptionEs": "¡Colorea a Rumi, la valiente cazadora de demonios! Perfecto para fanáticos de héroes de acción.",
  "category": "K Pop Demon Hunters",
  "difficulty": 3,
  "imageUrl": "/coloring-images/rumi.png",
  "thumbnailUrl": "/coloring-images/rumi.png",
  "featured": false
}'
echo "✅ Rumi"

curl -X POST "$API_URL" -H "Content-Type: application/json" -d '{
  "urlKey": "zoey",
  "title": "Zoey",
  "description": "Color Zoey, the powerful demon hunter! Perfect for fans of action heroes.",
  "titleEs": "Zoey",
  "descriptionEs": "¡Colorea a Zoey, la poderosa cazadora de demonios! Perfecto para fanáticos de héroes de acción.",
  "category": "K Pop Demon Hunters",
  "difficulty": 3,
  "imageUrl": "/coloring-images/zoey.png",
  "thumbnailUrl": "/coloring-images/zoey.png",
  "featured": false
}'
echo "✅ Zoey"

curl -X POST "$API_URL" -H "Content-Type: application/json" -d '{
  "urlKey": "the-saja-boys",
  "title": "The Saja Boys",
  "description": "Color the Saja Boys, demon hunting heroes! Perfect for fans of action teams.",
  "titleEs": "Los Chicos Saja",
  "descriptionEs": "¡Colorea a los Chicos Saja, héroes cazadores de demonios! Perfecto para fanáticos de equipos de acción.",
  "category": "K Pop Demon Hunters",
  "difficulty": 3,
  "imageUrl": "/coloring-images/the_saja_boys.png",
  "thumbnailUrl": "/coloring-images/the_saja_boys.png",
  "featured": false
}'
echo "✅ The Saja Boys"

# Numbers
curl -X POST "$API_URL" -H "Content-Type: application/json" -d '{
  "urlKey": "zero",
  "title": "Number Zero",
  "description": "Color the number 0! Perfect for learning numbers while having fun.",
  "titleEs": "Número Cero",
  "descriptionEs": "¡Colorea el número 0! Perfecto para aprender números mientras te diviertes.",
  "category": "Numbers",
  "difficulty": 1,
  "imageUrl": "/coloring-images/zero.png",
  "thumbnailUrl": "/coloring-images/zero.png",
  "featured": false
}'
echo "✅ Zero"

curl -X POST "$API_URL" -H "Content-Type: application/json" -d '{
  "urlKey": "one",
  "title": "Number One",
  "description": "Color the number 1! Perfect for learning numbers while having fun.",
  "titleEs": "Número Uno",
  "descriptionEs": "¡Colorea el número 1! Perfecto para aprender números mientras te diviertes.",
  "category": "Numbers",
  "difficulty": 1,
  "imageUrl": "/coloring-images/one.png",
  "thumbnailUrl": "/coloring-images/one.png",
  "featured": false
}'
echo "✅ One"

curl -X POST "$API_URL" -H "Content-Type: application/json" -d '{
  "urlKey": "two",
  "title": "Number Two",
  "description": "Color the number 2! Perfect for learning numbers while having fun.",
  "titleEs": "Número Dos",
  "descriptionEs": "¡Colorea el número 2! Perfecto para aprender números mientras te diviertes.",
  "category": "Numbers",
  "difficulty": 1,
  "imageUrl": "/coloring-images/two.png",
  "thumbnailUrl": "/coloring-images/two.png",
  "featured": false
}'
echo "✅ Two"

curl -X POST "$API_URL" -H "Content-Type: application/json" -d '{
  "urlKey": "three",
  "title": "Number Three",
  "description": "Color the number 3! Perfect for learning numbers while having fun.",
  "titleEs": "Número Tres",
  "descriptionEs": "¡Colorea el número 3! Perfecto para aprender números mientras te diviertes.",
  "category": "Numbers",
  "difficulty": 1,
  "imageUrl": "/coloring-images/three.png",
  "thumbnailUrl": "/coloring-images/three.png",
  "featured": false
}'
echo "✅ Three"

curl -X POST "$API_URL" -H "Content-Type: application/json" -d '{
  "urlKey": "four",
  "title": "Number Four",
  "description": "Color the number 4! Perfect for learning numbers while having fun.",
  "titleEs": "Número Cuatro",
  "descriptionEs": "¡Colorea el número 4! Perfecto para aprender números mientras te diviertes.",
  "category": "Numbers",
  "difficulty": 1,
  "imageUrl": "/coloring-images/four.png",
  "thumbnailUrl": "/coloring-images/four.png",
  "featured": false
}'
echo "✅ Four"

curl -X POST "$API_URL" -H "Content-Type: application/json" -d '{
  "urlKey": "five",
  "title": "Number Five",
  "description": "Color the number 5! Perfect for learning numbers while having fun.",
  "titleEs": "Número Cinco",
  "descriptionEs": "¡Colorea el número 5! Perfecto para aprender números mientras te diviertes.",
  "category": "Numbers",
  "difficulty": 1,
  "imageUrl": "/coloring-images/five.png",
  "thumbnailUrl": "/coloring-images/five.png",
  "featured": false
}'
echo "✅ Five"

curl -X POST "$API_URL" -H "Content-Type: application/json" -d '{
  "urlKey": "six",
  "title": "Number Six",
  "description": "Color the number 6! Perfect for learning numbers while having fun.",
  "titleEs": "Número Seis",
  "descriptionEs": "¡Colorea el número 6! Perfecto para aprender números mientras te diviertes.",
  "category": "Numbers",
  "difficulty": 1,
  "imageUrl": "/coloring-images/six.png",
  "thumbnailUrl": "/coloring-images/six.png",
  "featured": false
}'
echo "✅ Six"

curl -X POST "$API_URL" -H "Content-Type: application/json" -d '{
  "urlKey": "seven",
  "title": "Number Seven",
  "description": "Color the number 7! Perfect for learning numbers while having fun.",
  "titleEs": "Número Siete",
  "descriptionEs": "¡Colorea el número 7! Perfecto para aprender números mientras te diviertes.",
  "category": "Numbers",
  "difficulty": 1,
  "imageUrl": "/coloring-images/seven.png",
  "thumbnailUrl": "/coloring-images/seven.png",
  "featured": false
}'
echo "✅ Seven"

curl -X POST "$API_URL" -H "Content-Type: application/json" -d '{
  "urlKey": "eight",
  "title": "Number Eight",
  "description": "Color the number 8! Perfect for learning numbers while having fun.",
  "titleEs": "Número Ocho",
  "descriptionEs": "¡Colorea el número 8! Perfecto para aprender números mientras te diviertes.",
  "category": "Numbers",
  "difficulty": 1,
  "imageUrl": "/coloring-images/eight.png",
  "thumbnailUrl": "/coloring-images/eight.png",
  "featured": false
}'
echo "✅ Eight"

curl -X POST "$API_URL" -H "Content-Type: application/json" -d '{
  "urlKey": "nine",
  "title": "Number Nine",
  "description": "Color the number 9! Perfect for learning numbers while having fun.",
  "titleEs": "Número Nueve",
  "descriptionEs": "¡Colorea el número 9! Perfecto para aprender números mientras te diviertes.",
  "category": "Numbers",
  "difficulty": 1,
  "imageUrl": "/coloring-images/nine.png",
  "thumbnailUrl": "/coloring-images/nine.png",
  "featured": false
}'
echo "✅ Nine"

curl -X POST "$API_URL" -H "Content-Type: application/json" -d '{
  "urlKey": "ten",
  "title": "Number Ten",
  "description": "Color the number 10! Perfect for learning numbers while having fun.",
  "titleEs": "Número Diez",
  "descriptionEs": "¡Colorea el número 10! Perfecto para aprender números mientras te diviertes.",
  "category": "Numbers",
  "difficulty": 1,
  "imageUrl": "/coloring-images/ten.png",
  "thumbnailUrl": "/coloring-images/ten.png",
  "featured": false
}'
echo "✅ Ten"

# Mandalas
curl -X POST "$API_URL" -H "Content-Type: application/json" -d '{
  "urlKey": "flower-mandala",
  "title": "Flower Mandala",
  "description": "Color a beautiful flower mandala! Perfect for relaxation and creativity.",
  "titleEs": "Mandala de Flores",
  "descriptionEs": "¡Colorea un hermoso mandala de flores! Perfecto para relajación y creatividad.",
  "category": "Mandalas",
  "difficulty": 3,
  "imageUrl": "/coloring-images/flower_mandala.png",
  "thumbnailUrl": "/coloring-images/flower_mandala.png",
  "featured": false
}'
echo "✅ Flower Mandala"

echo ""
echo "========================================"
echo "✅ All 25 paintings added to production!"
echo "========================================"

