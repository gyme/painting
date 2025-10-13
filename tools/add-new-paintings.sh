#!/bin/bash
# Add new paintings to database

API="http://localhost:8080/api/paintings"

# Medusa Mandala
curl -s -X POST $API -H "Content-Type: application/json" -d '{
  "urlKey":"medusa-mandala",
  "title":"Medusa Mandala",
  "description":"A mystical medusa mandala with flowing tentacles and ocean-inspired patterns!",
  "category":"Animals",
  "tags":"medusa,jellyfish,mandala,patterns,intricate,meditation,relaxing,coloring,kids,adults,ocean,sea",
  "imageUrl":"/coloring-images/meduza_mandala.png",
  "thumbnailUrl":"/coloring-images/meduza_mandala.png",
  "difficulty":3,
  "colorPalette":"[\"#E6B3FF\",\"#9966CC\",\"#CC99FF\",\"#B19CD9\",\"#DDA0DD\"]",
  "featured":true
}' | jq -r '.title // "ERROR"'

# Tiger Mandala
curl -s -X POST $API -H "Content-Type: application/json" -d '{
  "urlKey":"tiger-mandala",
  "title":"Tiger Mandala",
  "description":"A fierce and beautiful tiger mandala with bold stripes and intricate patterns!",
  "category":"Animals",
  "tags":"tiger,mandala,patterns,intricate,meditation,relaxing,coloring,kids,adults,stripes,wild",
  "imageUrl":"/coloring-images/tiger_mandala.png",
  "thumbnailUrl":"/coloring-images/tiger_mandala.png",
  "difficulty":3,
  "colorPalette":"[\"#FF8C00\",\"#FFA500\",\"#FF6347\",\"#FF7F50\",\"#FFB347\"]",
  "featured":true
}' | jq -r '.title // "ERROR"'

# Cute Bat
curl -s -X POST $API -H "Content-Type: application/json" -d '{
  "urlKey":"cute-bat",
  "title":"Cute Bat",
  "description":"An adorable bat with big wings perfect for Halloween or any time!",
  "category":"Animals",
  "tags":"bat,cute,halloween,spooky,animal,wings,coloring,kids",
  "imageUrl":"/coloring-images/cute_bat.png",
  "thumbnailUrl":"/coloring-images/cute_bat.png",
  "difficulty":2,
  "colorPalette":"[\"#8B4789\",\"#663399\",\"#9370DB\",\"#BA55D3\",\"#DDA0DD\"]",
  "featured":false
}' | jq -r '.title // "ERROR"'

# Cute Bear
curl -s -X POST $API -H "Content-Type: application/json" -d '{
  "urlKey":"cute-bear",
  "title":"Cute Bear",
  "description":"A sweet teddy bear with a friendly smile perfect for young artists!",
  "category":"Animals",
  "tags":"bear,teddy,cute,animal,friendly,coloring,kids,toddler",
  "imageUrl":"/coloring-images/cute_bear.png",
  "thumbnailUrl":"/coloring-images/cute_bear.png",
  "difficulty":1,
  "colorPalette":"[\"#8B4513\",\"#D2691E\",\"#DEB887\",\"#F4A460\",\"#FFE4B5\"]",
  "featured":false
}' | jq -r '.title // "ERROR"'

# Cute Elephant
curl -s -X POST $API -H "Content-Type: application/json" -d '{
  "urlKey":"cute-elephant",
  "title":"Cute Elephant",
  "description":"An adorable baby elephant with big ears and a cheerful expression!",
  "category":"Animals",
  "tags":"elephant,cute,animal,baby,trunk,coloring,kids,toddler",
  "imageUrl":"/coloring-images/cute_elephant.png",
  "thumbnailUrl":"/coloring-images/cute_elephant.png",
  "difficulty":1,
  "colorPalette":"[\"#778899\",\"#708090\",\"#B0C4DE\",\"#87CEEB\",\"#E0E0E0\"]",
  "featured":false
}' | jq -r '.title // "ERROR"'

# Cute Hamster
curl -s -X POST $API -H "Content-Type: application/json" -d '{
  "urlKey":"cute-hamster",
  "title":"Cute Hamster",
  "description":"A fluffy hamster with chubby cheeks perfect for pet lovers!",
  "category":"Animals",
  "tags":"hamster,cute,pet,animal,rodent,fluffy,coloring,kids",
  "imageUrl":"/coloring-images/cute_hamster.png",
  "thumbnailUrl":"/coloring-images/cute_hamster.png",
  "difficulty":2,
  "colorPalette":"[\"#CD853F\",\"#DEB887\",\"#F5DEB3\",\"#FFE4B5\",\"#FAEBD7\"]",
  "featured":false
}' | jq -r '.title // "ERROR"'

# Flying Koala
curl -s -X POST $API -H "Content-Type: application/json" -d '{
  "urlKey":"flying-koala",
  "title":"Flying Koala",
  "description":"A whimsical koala soaring through the sky with magical wings!",
  "category":"Animals",
  "tags":"koala,flying,fantasy,magical,animal,wings,coloring,kids,imaginative",
  "imageUrl":"/coloring-images/flying_kuala.png",
  "thumbnailUrl":"/coloring-images/flying_kuala.png",
  "difficulty":2,
  "colorPalette":"[\"#708090\",\"#B0C4DE\",\"#87CEEB\",\"#ADD8E6\",\"#F0F8FF\"]",
  "featured":false
}' | jq -r '.title // "ERROR"'

# Koala Love
curl -s -X POST $API -H "Content-Type: application/json" -d '{
  "urlKey":"koala-love",
  "title":"Koala Love",
  "description":"An adorable koala hugging a tree with hearts and love!",
  "category":"Animals",
  "tags":"koala,love,hearts,animal,cute,tree,australia,coloring,kids",
  "imageUrl":"/coloring-images/koala_love.png",
  "thumbnailUrl":"/coloring-images/koala_love.png",
  "difficulty":2,
  "colorPalette":"[\"#808080\",\"#C0C0C0\",\"#FF69B4\",\"#FF1493\",\"#FFB6C1\"]",
  "featured":false
}' | jq -r '.title // "ERROR"'

# Bonsai
curl -s -X POST $API -H "Content-Type: application/json" -d '{
  "urlKey":"bonsai",
  "title":"Bonsai Tree",
  "description":"A beautiful miniature bonsai tree with intricate branches and leaves!",
  "category":"Nature",
  "tags":"bonsai,tree,nature,zen,japanese,meditation,plants,coloring,kids,adults",
  "imageUrl":"/coloring-images/bonsai.png",
  "thumbnailUrl":"/coloring-images/bonsai.png",
  "difficulty":2,
  "colorPalette":"[\"#228B22\",\"#2E8B57\",\"#3CB371\",\"#8FBC8F\",\"#98D8C8\"]",
  "featured":false
}' | jq -r '.title // "ERROR"'

# Fairy Butterfly
curl -s -X POST $API -H "Content-Type: application/json" -d '{
  "urlKey":"fairy-butterfly",
  "title":"Fairy Butterfly",
  "description":"A magical fairy with beautiful butterfly wings!",
  "category":"Fantasy",
  "tags":"fairy,butterfly,wings,magical,fantasy,coloring,kids,girls,enchanted",
  "imageUrl":"/coloring-images/fairy_butterfly.png",
  "thumbnailUrl":"/coloring-images/fairy_butterfly.png",
  "difficulty":2,
  "colorPalette":"[\"#FF69B4\",\"#FF1493\",\"#DDA0DD\",\"#EE82EE\",\"#DA70D6\"]",
  "featured":false
}' | jq -r '.title // "ERROR"'

# Fairy on a Flower
curl -s -X POST $API -H "Content-Type: application/json" -d '{
  "urlKey":"fairy-on-flower",
  "title":"Fairy on a Flower",
  "description":"A delicate fairy resting on a beautiful flower in an enchanted garden!",
  "category":"Fantasy",
  "tags":"fairy,flower,garden,magical,fantasy,nature,coloring,kids,girls,enchanted",
  "imageUrl":"/coloring-images/fairy_on_a_flower.png",
  "thumbnailUrl":"/coloring-images/fairy_on_a_flower.png",
  "difficulty":3,
  "colorPalette":"[\"#FF69B4\",\"#FFB6C1\",\"#FFE4E1\",\"#FFC0CB\",\"#FF1493\"]",
  "featured":false
}' | jq -r '.title // "ERROR"'

# Little Princess
curl -s -X POST $API -H "Content-Type: application/json" -d '{
  "urlKey":"little-princess",
  "title":"Little Princess",
  "description":"A charming little princess with a beautiful dress and crown!",
  "category":"People",
  "tags":"princess,royalty,dress,crown,girl,fairy-tale,coloring,kids,girls",
  "imageUrl":"/coloring-images/little_princess.png",
  "thumbnailUrl":"/coloring-images/little_princess.png",
  "difficulty":2,
  "colorPalette":"[\"#FF69B4\",\"#FFB6C1\",\"#FFD700\",\"#FFA500\",\"#FF1493\"]",
  "featured":false
}' | jq -r '.title // "ERROR"'

# Princess in the Wood
curl -s -X POST $API -H "Content-Type: application/json" -d '{
  "urlKey":"princess-in-wood",
  "title":"Princess in the Wood",
  "description":"A beautiful princess walking through an enchanted forest!",
  "category":"Fantasy",
  "tags":"princess,forest,woods,nature,fairy-tale,magical,coloring,kids,girls,enchanted",
  "imageUrl":"/coloring-images/princess_in_the_wood.png",
  "thumbnailUrl":"/coloring-images/princess_in_the_wood.png",
  "difficulty":3,
  "colorPalette":"[\"#FF69B4\",\"#32CD32\",\"#228B22\",\"#FFD700\",\"#9370DB\"]",
  "featured":false
}' | jq -r '.title // "ERROR"'

# Queen
curl -s -X POST $API -H "Content-Type: application/json" -d '{
  "urlKey":"queen",
  "title":"Queen",
  "description":"A regal queen with an elegant gown and sparkling crown!",
  "category":"People",
  "tags":"queen,royalty,crown,elegant,dress,fairy-tale,coloring,kids,girls,adults",
  "imageUrl":"/coloring-images/queen.png",
  "thumbnailUrl":"/coloring-images/queen.png",
  "difficulty":2,
  "colorPalette":"[\"#9370DB\",\"#8B008B\",\"#FFD700\",\"#FF69B4\",\"#DDA0DD\"]",
  "featured":false
}' | jq -r '.title // "ERROR"'

# Astronaut
curl -s -X POST $API -H "Content-Type: application/json" -d '{
  "urlKey":"astronaut",
  "title":"Astronaut",
  "description":"An adventurous astronaut exploring space with a spacesuit!",
  "category":"People",
  "tags":"astronaut,space,science,exploration,career,coloring,kids,educational",
  "imageUrl":"/coloring-images/astronaut.png",
  "thumbnailUrl":"/coloring-images/astronaut.png",
  "difficulty":2,
  "colorPalette":"[\"#4169E1\",\"#1E90FF\",\"#87CEEB\",\"#C0C0C0\",\"#FFD700\"]",
  "featured":false
}' | jq -r '.title // "ERROR"'

# Drummer
curl -s -X POST $API -H "Content-Type: application/json" -d '{
  "urlKey":"drummer",
  "title":"Drummer",
  "description":"A talented drummer playing the drums with energy and rhythm!",
  "category":"People",
  "tags":"drummer,music,instrument,musician,performance,coloring,kids,educational",
  "imageUrl":"/coloring-images/drummer.png",
  "thumbnailUrl":"/coloring-images/drummer.png",
  "difficulty":2,
  "colorPalette":"[\"#FF6347\",\"#FFD700\",\"#4169E1\",\"#32CD32\",\"#FF1493\"]",
  "featured":false
}' | jq -r '.title // "ERROR"'

# Karate
curl -s -X POST $API -H "Content-Type: application/json" -d '{
  "urlKey":"karate",
  "title":"Karate Kid",
  "description":"A martial artist practicing karate moves with focus and discipline!",
  "category":"People",
  "tags":"karate,martial-arts,sports,activity,kids,coloring,educational,fitness",
  "imageUrl":"/coloring-images/karate.png",
  "thumbnailUrl":"/coloring-images/karate.png",
  "difficulty":2,
  "colorPalette":"[\"#FFFFFF\",\"#000000\",\"#FFD700\",\"#FF6347\",\"#4169E1\"]",
  "featured":false
}' | jq -r '.title // "ERROR"'

# Student
curl -s -X POST $API -H "Content-Type: application/json" -d '{
  "urlKey":"student",
  "title":"Student",
  "description":"A bright student learning and studying with books and supplies!",
  "category":"People",
  "tags":"student,school,learning,education,books,coloring,kids,educational",
  "imageUrl":"/coloring-images/student.png",
  "thumbnailUrl":"/coloring-images/student.png",
  "difficulty":1,
  "colorPalette":"[\"#4169E1\",\"#FFD700\",\"#FF6347\",\"#32CD32\",\"#FFA500\"]",
  "featured":false
}' | jq -r '.title // "ERROR"'

# Toy Builder
curl -s -X POST $API -H "Content-Type: application/json" -d '{
  "urlKey":"toy-builder",
  "title":"Toy Builder",
  "description":"A creative kid building with colorful toy blocks and bricks!",
  "category":"People",
  "tags":"toys,building,blocks,creative,play,kids,coloring,fun",
  "imageUrl":"/coloring-images/toy_builder.png",
  "thumbnailUrl":"/coloring-images/toy_builder.png",
  "difficulty":2,
  "colorPalette":"[\"#FF6347\",\"#4169E1\",\"#FFD700\",\"#32CD32\",\"#FF69B4\"]",
  "featured":false
}' | jq -r '.title // "ERROR"'

# Mushroom House
curl -s -X POST $API -H "Content-Type: application/json" -d '{
  "urlKey":"mushroom-house",
  "title":"Mushroom House",
  "description":"A whimsical mushroom house from a fairy tale forest!",
  "category":"Fantasy",
  "tags":"mushroom,house,fairy-tale,fantasy,magical,nature,coloring,kids,imaginative",
  "imageUrl":"/coloring-images/mushroom_house.png",
  "thumbnailUrl":"/coloring-images/mushroom_house.png",
  "difficulty":2,
  "colorPalette":"[\"#FF6347\",\"#DC143C\",\"#FFFFFF\",\"#32CD32\",\"#228B22\"]",
  "featured":false
}' | jq -r '.title // "ERROR"'

# Animal Holiday Gift
curl -s -X POST $API -H "Content-Type: application/json" -d '{
  "urlKey":"animal-holiday-gift",
  "title":"Animal Holiday Gift",
  "description":"A cute animal with holiday presents perfect for Christmas or celebrations!",
  "category":"Holidays",
  "tags":"holiday,christmas,gift,present,animal,celebration,coloring,kids,festive",
  "imageUrl":"/coloring-images/animal_holiday_gift.png",
  "thumbnailUrl":"/coloring-images/animal_holiday_gift.png",
  "difficulty":2,
  "colorPalette":"[\"#DC143C\",\"#228B22\",\"#FFD700\",\"#4169E1\",\"#FF6347\"]",
  "featured":false
}' | jq -r '.title // "ERROR"'

# Little Easter Bunny
curl -s -X POST $API -H "Content-Type: application/json" -d '{
  "urlKey":"little-easter-bunny",
  "title":"Little Easter Bunny",
  "description":"An adorable little bunny with Easter eggs and springtime joy!",
  "category":"Holidays",
  "tags":"easter,bunny,rabbit,eggs,spring,holiday,coloring,kids,festive",
  "imageUrl":"/coloring-images/little_easter_bunny.png",
  "thumbnailUrl":"/coloring-images/little_easter_bunny.png",
  "difficulty":2,
  "colorPalette":"[\"#FFB6C1\",\"#87CEEB\",\"#98FB98\",\"#FFD700\",\"#FF69B4\"]",
  "featured":false
}' | jq -r '.title // "ERROR"'

# Cute Scarecrow
curl -s -X POST $API -H "Content-Type: application/json" -d '{
  "urlKey":"cute-scarecrow",
  "title":"Cute Scarecrow",
  "description":"A friendly scarecrow perfect for fall and harvest time!",
  "category":"Holidays",
  "tags":"scarecrow,fall,autumn,harvest,halloween,thanksgiving,coloring,kids,seasonal",
  "imageUrl":"/coloring-images/cute_scarecrow.png",
  "thumbnailUrl":"/coloring-images/cute_scarecrow.png",
  "difficulty":2,
  "colorPalette":"[\"#FF8C00\",\"#8B4513\",\"#FFD700\",\"#DC143C\",\"#228B22\"]",
  "featured":false
}' | jq -r '.title // "ERROR"'

# Wizard
curl -s -X POST $API -H "Content-Type: application/json" -d '{
  "urlKey":"wizard",
  "title":"Wizard",
  "description":"A wise wizard with a magical staff and mystical powers!",
  "category":"Fantasy",
  "tags":"wizard,magic,magical,fantasy,sorcerer,spell,coloring,kids,adults,mystical",
  "imageUrl":"/coloring-images/wizzard.png",
  "thumbnailUrl":"/coloring-images/wizzard.png",
  "difficulty":3,
  "colorPalette":"[\"#4B0082\",\"#8B008B\",\"#FFD700\",\"#4169E1\",\"#9370DB\"]",
  "featured":false
}' | jq -r '.title // "ERROR"'

echo "Done!"

