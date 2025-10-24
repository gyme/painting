#!/usr/bin/env python3
"""
Add new ABC category and new images to database via API
Includes Spanish translations for all images
"""

import requests

# API endpoints
LOCAL_API = "http://localhost:8080/api/paintings"
PROD_API = "https://docker-composeyaml-production.up.railway.app/api/paintings"

# New images with all required fields
new_paintings = [
    # ABC / Letters Category (NEW)
    {
        "urlKey": "abc",
        "title": "ABC Coloring Page",
        "titleEs": "Página para Colorear ABC",
        "description": "Learn the alphabet with this fun ABC coloring page!",
        "descriptionEs": "¡Aprende el alfabeto con esta divertida página para colorear ABC!",
        "imageUrl": "/coloring-images/abc.png",
        "thumbnailUrl": "/coloring-images/abc.png",
        "category": "ABC",
        "difficulty": 1,
        "featured": False
    },
    {
        "urlKey": "the-letter-a",
        "title": "Letter A Coloring Page",
        "titleEs": "Página para Colorear Letra A",
        "description": "Practice writing and coloring the letter A!",
        "descriptionEs": "¡Practica escribir y colorear la letra A!",
        "imageUrl": "/coloring-images/the_letter_a.png",
        "thumbnailUrl": "/coloring-images/the_letter_a.png",
        "category": "ABC",
        "difficulty": 1,
        "featured": False
    },
    {
        "urlKey": "the-letter-b",
        "title": "Letter B Coloring Page",
        "titleEs": "Página para Colorear Letra B",
        "description": "Practice writing and coloring the letter B!",
        "descriptionEs": "¡Practica escribir y colorear la letra B!",
        "imageUrl": "/coloring-images/the_letter_b.png",
        "thumbnailUrl": "/coloring-images/the_letter_b.png",
        "category": "ABC",
        "difficulty": 1,
        "featured": False
    },
    {
        "urlKey": "the-letter-c",
        "title": "Letter C Coloring Page",
        "titleEs": "Página para Colorear Letra C",
        "description": "Practice writing and coloring the letter C!",
        "descriptionEs": "¡Practica escribir y colorear la letra C!",
        "imageUrl": "/coloring-images/the_letter_c.png",
        "thumbnailUrl": "/coloring-images/the_letter_c.png",
        "category": "ABC",
        "difficulty": 1,
        "featured": False
    },
    {
        "urlKey": "the-letter-d",
        "title": "Letter D Coloring Page",
        "titleEs": "Página para Colorear Letra D",
        "description": "Practice writing and coloring the letter D!",
        "descriptionEs": "¡Practica escribir y colorear la letra D!",
        "imageUrl": "/coloring-images/the_letter_d.png",
        "thumbnailUrl": "/coloring-images/the_letter_d.png",
        "category": "ABC",
        "difficulty": 1,
        "featured": False
    },
    {
        "urlKey": "the-letter-e",
        "title": "Letter E Coloring Page",
        "titleEs": "Página para Colorear Letra E",
        "description": "Practice writing and coloring the letter E!",
        "descriptionEs": "¡Practica escribir y colorear la letra E!",
        "imageUrl": "/coloring-images/the_letter_e.png",
        "thumbnailUrl": "/coloring-images/the_letter_e.png",
        "category": "ABC",
        "difficulty": 1,
        "featured": False
    },
    {
        "urlKey": "the-letter-f",
        "title": "Letter F Coloring Page",
        "titleEs": "Página para Colorear Letra F",
        "description": "Practice writing and coloring the letter F!",
        "descriptionEs": "¡Practica escribir y colorear la letra F!",
        "imageUrl": "/coloring-images/the_letter_f.png",
        "thumbnailUrl": "/coloring-images/the_letter_f.png",
        "category": "ABC",
        "difficulty": 1,
        "featured": False
    },
    {
        "urlKey": "the-letter-g",
        "title": "Letter G Coloring Page",
        "titleEs": "Página para Colorear Letra G",
        "description": "Practice writing and coloring the letter G!",
        "descriptionEs": "¡Practica escribir y colorear la letra G!",
        "imageUrl": "/coloring-images/the_letter_g.png",
        "thumbnailUrl": "/coloring-images/the_letter_g.png",
        "category": "ABC",
        "difficulty": 1,
        "featured": False
    },
    {
        "urlKey": "the-letter-h",
        "title": "Letter H Coloring Page",
        "titleEs": "Página para Colorear Letra H",
        "description": "Practice writing and coloring the letter H!",
        "descriptionEs": "¡Practica escribir y colorear la letra H!",
        "imageUrl": "/coloring-images/the_letter_h.png",
        "thumbnailUrl": "/coloring-images/the_letter_h.png",
        "category": "ABC",
        "difficulty": 1,
        "featured": False
    },
    {
        "urlKey": "the-letter-i",
        "title": "Letter I Coloring Page",
        "titleEs": "Página para Colorear Letra I",
        "description": "Practice writing and coloring the letter I!",
        "descriptionEs": "¡Practica escribir y colorear la letra I!",
        "imageUrl": "/coloring-images/the_letter_i.png",
        "thumbnailUrl": "/coloring-images/the_letter_i.png",
        "category": "ABC",
        "difficulty": 1,
        "featured": False
    },
    {
        "urlKey": "the-letter-j",
        "title": "Letter J Coloring Page",
        "titleEs": "Página para Colorear Letra J",
        "description": "Practice writing and coloring the letter J!",
        "descriptionEs": "¡Practica escribir y colorear la letra J!",
        "imageUrl": "/coloring-images/the_letter_j.png",
        "thumbnailUrl": "/coloring-images/the_letter_j.png",
        "category": "ABC",
        "difficulty": 1,
        "featured": False
    },
    {
        "urlKey": "the-letter-k",
        "title": "Letter K Coloring Page",
        "titleEs": "Página para Colorear Letra K",
        "description": "Practice writing and coloring the letter K!",
        "descriptionEs": "¡Practica escribir y colorear la letra K!",
        "imageUrl": "/coloring-images/the_letter_k.png",
        "thumbnailUrl": "/coloring-images/the_letter_k.png",
        "category": "ABC",
        "difficulty": 1,
        "featured": False
    },
    {
        "urlKey": "the-letter-l",
        "title": "Letter L Coloring Page",
        "titleEs": "Página para Colorear Letra L",
        "description": "Practice writing and coloring the letter L!",
        "descriptionEs": "¡Practica escribir y colorear la letra L!",
        "imageUrl": "/coloring-images/the_letter_l.png",
        "thumbnailUrl": "/coloring-images/the_letter_l.png",
        "category": "ABC",
        "difficulty": 1,
        "featured": False
    },
    {
        "urlKey": "the-letter-m",
        "title": "Letter M Coloring Page",
        "titleEs": "Página para Colorear Letra M",
        "description": "Practice writing and coloring the letter M!",
        "descriptionEs": "¡Practica escribir y colorear la letra M!",
        "imageUrl": "/coloring-images/the_letter_m.png",
        "thumbnailUrl": "/coloring-images/the_letter_m.png",
        "category": "ABC",
        "difficulty": 1,
        "featured": False
    },
    {
        "urlKey": "the-letter-n",
        "title": "Letter N Coloring Page",
        "titleEs": "Página para Colorear Letra N",
        "description": "Practice writing and coloring the letter N!",
        "descriptionEs": "¡Practica escribir y colorear la letra N!",
        "imageUrl": "/coloring-images/the_letter_n.png",
        "thumbnailUrl": "/coloring-images/the_letter_n.png",
        "category": "ABC",
        "difficulty": 1,
        "featured": False
    },
    {
        "urlKey": "the-letter-o",
        "title": "Letter O Coloring Page",
        "titleEs": "Página para Colorear Letra O",
        "description": "Practice writing and coloring the letter O!",
        "descriptionEs": "¡Practica escribir y colorear la letra O!",
        "imageUrl": "/coloring-images/the_letter_o.png",
        "thumbnailUrl": "/coloring-images/the_letter_o.png",
        "category": "ABC",
        "difficulty": 1,
        "featured": False
    },
    {
        "urlKey": "the-letter-p",
        "title": "Letter P Coloring Page",
        "titleEs": "Página para Colorear Letra P",
        "description": "Practice writing and coloring the letter P!",
        "descriptionEs": "¡Practica escribir y colorear la letra P!",
        "imageUrl": "/coloring-images/the_letter_p.png",
        "thumbnailUrl": "/coloring-images/the_letter_p.png",
        "category": "ABC",
        "difficulty": 1,
        "featured": False
    },
    {
        "urlKey": "the-letter-q",
        "title": "Letter Q Coloring Page",
        "titleEs": "Página para Colorear Letra Q",
        "description": "Practice writing and coloring the letter Q!",
        "descriptionEs": "¡Practica escribir y colorear la letra Q!",
        "imageUrl": "/coloring-images/the_letter_q.png",
        "thumbnailUrl": "/coloring-images/the_letter_q.png",
        "category": "ABC",
        "difficulty": 1,
        "featured": False
    },
    {
        "urlKey": "the-letter-r",
        "title": "Letter R Coloring Page",
        "titleEs": "Página para Colorear Letra R",
        "description": "Practice writing and coloring the letter R!",
        "descriptionEs": "¡Practica escribir y colorear la letra R!",
        "imageUrl": "/coloring-images/the_letter_r.png",
        "thumbnailUrl": "/coloring-images/the_letter_r.png",
        "category": "ABC",
        "difficulty": 1,
        "featured": False
    },
    {
        "urlKey": "the-letter-s",
        "title": "Letter S Coloring Page",
        "titleEs": "Página para Colorear Letra S",
        "description": "Practice writing and coloring the letter S!",
        "descriptionEs": "¡Practica escribir y colorear la letra S!",
        "imageUrl": "/coloring-images/the_letter_s.png",
        "thumbnailUrl": "/coloring-images/the_letter_s.png",
        "category": "ABC",
        "difficulty": 1,
        "featured": False
    },
    {
        "urlKey": "the-letter-t",
        "title": "Letter T Coloring Page",
        "titleEs": "Página para Colorear Letra T",
        "description": "Practice writing and coloring the letter T!",
        "descriptionEs": "¡Practica escribir y colorear la letra T!",
        "imageUrl": "/coloring-images/the_letter_t.png",
        "thumbnailUrl": "/coloring-images/the_letter_t.png",
        "category": "ABC",
        "difficulty": 1,
        "featured": False
    },
    {
        "urlKey": "the-letter-u",
        "title": "Letter U Coloring Page",
        "titleEs": "Página para Colorear Letra U",
        "description": "Practice writing and coloring the letter U!",
        "descriptionEs": "¡Practica escribir y colorear la letra U!",
        "imageUrl": "/coloring-images/the_letter_u.png",
        "thumbnailUrl": "/coloring-images/the_letter_u.png",
        "category": "ABC",
        "difficulty": 1,
        "featured": False
    },
    {
        "urlKey": "the-letter-v",
        "title": "Letter V Coloring Page",
        "titleEs": "Página para Colorear Letra V",
        "description": "Practice writing and coloring the letter V!",
        "descriptionEs": "¡Practica escribir y colorear la letra V!",
        "imageUrl": "/coloring-images/the_letter_v.png",
        "thumbnailUrl": "/coloring-images/the_letter_v.png",
        "category": "ABC",
        "difficulty": 1,
        "featured": False
    },
    {
        "urlKey": "the-letter-w",
        "title": "Letter W Coloring Page",
        "titleEs": "Página para Colorear Letra W",
        "description": "Practice writing and coloring the letter W!",
        "descriptionEs": "¡Practica escribir y colorear la letra W!",
        "imageUrl": "/coloring-images/the_letter_w.png",
        "thumbnailUrl": "/coloring-images/the_letter_w.png",
        "category": "ABC",
        "difficulty": 1,
        "featured": False
    },
    {
        "urlKey": "the-letter-x",
        "title": "Letter X Coloring Page",
        "titleEs": "Página para Colorear Letra X",
        "description": "Practice writing and coloring the letter X!",
        "descriptionEs": "¡Practica escribir y colorear la letra X!",
        "imageUrl": "/coloring-images/the_letter_x.png",
        "thumbnailUrl": "/coloring-images/the_letter_x.png",
        "category": "ABC",
        "difficulty": 1,
        "featured": False
    },
    {
        "urlKey": "the-letter-y",
        "title": "Letter Y Coloring Page",
        "titleEs": "Página para Colorear Letra Y",
        "description": "Practice writing and coloring the letter Y!",
        "descriptionEs": "¡Practica escribir y colorear la letra Y!",
        "imageUrl": "/coloring-images/the_letter_y.png",
        "thumbnailUrl": "/coloring-images/the_letter_y.png",
        "category": "ABC",
        "difficulty": 1,
        "featured": False
    },
    {
        "urlKey": "the-letter-z",
        "title": "Letter Z Coloring Page",
        "titleEs": "Página para Colorear Letra Z",
        "description": "Practice writing and coloring the letter Z!",
        "descriptionEs": "¡Practica escribir y colorear la letra Z!",
        "imageUrl": "/coloring-images/the_letter_z.png",
        "thumbnailUrl": "/coloring-images/the_letter_z.png",
        "category": "ABC",
        "difficulty": 1,
        "featured": False
    },
    
    # Mandalas
    {
        "urlKey": "dragon-mandala",
        "title": "Dragon Mandala Coloring Page",
        "titleEs": "Página para Colorear Mandala de Dragón",
        "description": "A beautiful dragon mandala with intricate patterns to color!",
        "descriptionEs": "¡Un hermoso mandala de dragón con patrones intrincados para colorear!",
        "imageUrl": "/coloring-images/dragon_mandala.png",
        "thumbnailUrl": "/coloring-images/dragon_mandala.png",
        "category": "Mandalas",
        "difficulty": 3,
        "featured": False
    },
    
    # Fantasy
    {
        "urlKey": "friendly-dragon",
        "title": "Friendly Dragon Coloring Page",
        "titleEs": "Página para Colorear Dragón Amistoso",
        "description": "A friendly dragon ready to be your colorful companion!",
        "descriptionEs": "¡Un dragón amistoso listo para ser tu compañero colorido!",
        "imageUrl": "/coloring-images/friendly_dragon.png",
        "thumbnailUrl": "/coloring-images/friendly_dragon.png",
        "category": "Fantasy",
        "difficulty": 2,
        "featured": False
    },
    {
        "urlKey": "rainbow-unicorn",
        "title": "Rainbow Unicorn Coloring Page",
        "titleEs": "Página para Colorear Unicornio Arcoíris",
        "description": "A magical unicorn surrounded by rainbows!",
        "descriptionEs": "¡Un unicornio mágico rodeado de arcoíris!",
        "imageUrl": "/coloring-images/rainbow_unicorn.png",
        "thumbnailUrl": "/coloring-images/rainbow_unicorn.png",
        "category": "Fantasy",
        "difficulty": 2,
        "featured": False
    },
    {
        "urlKey": "castle",
        "title": "Castle Coloring Page",
        "titleEs": "Página para Colorear Castillo",
        "description": "A majestic castle fit for princes and princesses!",
        "descriptionEs": "¡Un castillo majestuoso digno de príncipes y princesas!",
        "imageUrl": "/coloring-images/castle.png",
        "thumbnailUrl": "/coloring-images/castle.png",
        "category": "Fantasy",
        "difficulty": 2,
        "featured": False
    },
    {
        "urlKey": "baby-unicorn",
        "title": "Baby Unicorn Coloring Page",
        "titleEs": "Página para Colorear Bebé Unicornio",
        "description": "An adorable baby unicorn learning to use its magic!",
        "descriptionEs": "¡Un adorable bebé unicornio aprendiendo a usar su magia!",
        "imageUrl": "/coloring-images/baby_unicorn.png",
        "thumbnailUrl": "/coloring-images/baby_unicorn.png",
        "category": "Fantasy",
        "difficulty": 1,
        "featured": False
    },
    
    # Dinosaurs
    {
        "urlKey": "happy-dinosaur",
        "title": "Happy Dinosaur Coloring Page",
        "titleEs": "Página para Colorear Dinosaurio Feliz",
        "description": "A cheerful dinosaur with a big smile!",
        "descriptionEs": "¡Un dinosaurio alegre con una gran sonrisa!",
        "imageUrl": "/coloring-images/happy_dinosaur.png",
        "thumbnailUrl": "/coloring-images/happy_dinosaur.png",
        "category": "Dinosaurs",
        "difficulty": 1,
        "featured": False
    },
    {
        "urlKey": "baby-dinosaur",
        "title": "Baby Dinosaur Coloring Page",
        "titleEs": "Página para Colorear Bebé Dinosaurio",
        "description": "A cute baby dinosaur hatching from its egg!",
        "descriptionEs": "¡Un lindo bebé dinosaurio saliendo de su huevo!",
        "imageUrl": "/coloring-images/baby_dinosaur.png",
        "thumbnailUrl": "/coloring-images/baby_dinosaur.png",
        "category": "Dinosaurs",
        "difficulty": 1,
        "featured": False
    },
    
    # Vehicles
    {
        "urlKey": "tractor",
        "title": "Tractor Coloring Page",
        "titleEs": "Página para Colorear Tractor",
        "description": "A powerful tractor working on the farm!",
        "descriptionEs": "¡Un tractor potente trabajando en la granja!",
        "imageUrl": "/coloring-images/tractor.png",
        "thumbnailUrl": "/coloring-images/tractor.png",
        "category": "Vehicles",
        "difficulty": 2,
        "featured": False
    },
    {
        "urlKey": "monster-truck",
        "title": "Monster Truck Coloring Page",
        "titleEs": "Página para Colorear Camión Monstruo",
        "description": "A huge monster truck with giant wheels!",
        "descriptionEs": "¡Un enorme camión monstruo con ruedas gigantes!",
        "imageUrl": "/coloring-images/monster_truck.png",
        "thumbnailUrl": "/coloring-images/monster_truck.png",
        "category": "Vehicles",
        "difficulty": 2,
        "featured": False
    },
    
    # Animals
    {
        "urlKey": "cute-little-cat",
        "title": "Cute Little Cat Coloring Page",
        "titleEs": "Página para Colorear Gatito Lindo",
        "description": "An adorable little kitten ready to play!",
        "descriptionEs": "¡Un adorable gatito listo para jugar!",
        "imageUrl": "/coloring-images/cute_little_cat.png",
        "thumbnailUrl": "/coloring-images/cute_little_cat.png",
        "category": "Animals",
        "difficulty": 1,
        "featured": False
    },
    {
        "urlKey": "cute-little-puppy",
        "title": "Cute Little Puppy Coloring Page",
        "titleEs": "Página para Colorear Cachorro Lindo",
        "description": "A sweet puppy wagging its tail!",
        "descriptionEs": "¡Un dulce cachorro moviendo su cola!",
        "imageUrl": "/coloring-images/cute_little_puppy.png",
        "thumbnailUrl": "/coloring-images/cute_little_puppy.png",
        "category": "Animals",
        "difficulty": 1,
        "featured": False
    },
    {
        "urlKey": "baby-animal-zoo",
        "title": "Baby Zoo Animals Coloring Page",
        "titleEs": "Página para Colorear Animales Bebés del Zoológico",
        "description": "Adorable baby animals at the zoo!",
        "descriptionEs": "¡Adorables animales bebés en el zoológico!",
        "imageUrl": "/coloring-images/baby_animal_zoo.png",
        "thumbnailUrl": "/coloring-images/baby_animal_zoo.png",
        "category": "Animals",
        "difficulty": 2,
        "featured": False
    },
    {
        "urlKey": "life-under-the-sea",
        "title": "Life Under the Sea Coloring Page",
        "titleEs": "Página para Colorear Vida Bajo el Mar",
        "description": "Discover the wonders of ocean life!",
        "descriptionEs": "¡Descubre las maravillas de la vida marina!",
        "imageUrl": "/coloring-images/life_under_the_sea.png",
        "thumbnailUrl": "/coloring-images/life_under_the_sea.png",
        "category": "Animals",
        "difficulty": 2,
        "featured": False
    },
    
    # Sports
    {
        "urlKey": "kid-playing-soccer",
        "title": "Kid Playing Soccer Coloring Page",
        "titleEs": "Página para Colorear Niño Jugando Fútbol",
        "description": "A kid having fun playing soccer!",
        "descriptionEs": "¡Un niño divirtiéndose jugando fútbol!",
        "imageUrl": "/coloring-images/kid_playing_soccer.png",
        "thumbnailUrl": "/coloring-images/kid_playing_soccer.png",
        "category": "Sports",
        "difficulty": 2,
        "featured": False
    },
    
    # Characters
    {
        "urlKey": "friendly-robot",
        "title": "Friendly Robot Coloring Page",
        "titleEs": "Página para Colorear Robot Amistoso",
        "description": "A helpful robot friend with cool features!",
        "descriptionEs": "¡Un robot amigo útil con características geniales!",
        "imageUrl": "/coloring-images/friendly_robot.png",
        "thumbnailUrl": "/coloring-images/friendly_robot.png",
        "category": "Characters",
        "difficulty": 2,
        "featured": False
    }
]

def add_paintings(api_url, environment):
    """Add all paintings to the specified API"""
    print(f"\n{'='*60}")
    print(f"Adding {len(new_paintings)} images to {environment}")
    print(f"API: {api_url}")
    print(f"{'='*60}\n")
    
    success_count = 0
    error_count = 0
    
    for painting in new_paintings:
        try:
            response = requests.post(api_url, json=painting)
            
            if response.status_code in [200, 201]:
                print(f"✅ {painting['title']}")
                success_count += 1
            else:
                print(f"❌ {painting['title']} - Status {response.status_code}")
                error_count += 1
                
        except Exception as e:
            print(f"❌ {painting['title']}: {str(e)}")
            error_count += 1
    
    print(f"\n{'-'*60}")
    print(f"✅ Success: {success_count}/{len(new_paintings)}")
    if error_count > 0:
        print(f"❌ Errors: {error_count}")
    print(f"{'-'*60}\n")
    
    return success_count, error_count

def main():
    print("\n" + "="*60)
    print("🎨 Adding New ABC Category and Images")
    print("="*60)
    
    # Add to local
    print("\n🖥️  ADDING TO LOCAL")
    local_success, local_errors = add_paintings(LOCAL_API, "LOCAL")
    
    # Add to production
    print("\n🌐 ADDING TO PRODUCTION")
    prod_success, prod_errors = add_paintings(PROD_API, "PRODUCTION")
    
    # Summary
    print("\n" + "="*60)
    print("📊 FINAL SUMMARY")
    print("="*60)
    print(f"Local:      {local_success} ✅  {local_errors} ❌")
    print(f"Production: {prod_success} ✅  {prod_errors} ❌")
    print("="*60)
    
    if local_errors == 0 and prod_errors == 0:
        print("\n🎉 All images successfully added!")

if __name__ == "__main__":
    main()

