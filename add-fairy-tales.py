#!/usr/bin/env python3
"""
Add fairy tale coloring pages to database (both local and production)
"""

import requests
import json
import sys

def add_fairy_tales(api_url):
    """Add all fairy tales to database"""
    
    # Fairy tale data with Spanish translations
    fairy_tales = [
        {
            "urlKey": "red-riding-hood",
            "title": "Little Red Riding Hood",
            "titleEs": "Caperucita Roja",
            "description": "Color the classic tale of Little Red Riding Hood! A beloved fairy tale character perfect for creative kids.",
            "descriptionEs": "¡Colorea el cuento clásico de Caperucita Roja! Un personaje de cuento de hadas querido, perfecto para niños creativos.",
            "category": "Fairy Tales",
            "imageUrl": "/coloring-images/red_riding_hood.png",
            "thumbnailUrl": "/coloring-images/red_riding_hood.png",
            "tags": "red riding hood,fairy tale,classic story,wolf,grandmother",
            "difficulty": 2,
            "featured": False
        },
        {
            "urlKey": "puss-in-boots",
            "title": "Puss in Boots",
            "titleEs": "El Gato con Botas",
            "description": "Color the clever Puss in Boots! A charming fairy tale cat with magical boots and clever tricks.",
            "descriptionEs": "¡Colorea al astuto Gato con Botas! Un encantador gato de cuento de hadas con botas mágicas y trucos ingeniosos.",
            "category": "Fairy Tales",
            "imageUrl": "/coloring-images/puss_in_boots.png",
            "thumbnailUrl": "/coloring-images/puss_in_boots.png",
            "tags": "puss in boots,cat,fairy tale,boots,clever",
            "difficulty": 3,
            "featured": False
        },
        {
            "urlKey": "goldilocks-and-the-three-bears",
            "title": "Goldilocks and the Three Bears",
            "titleEs": "Ricitos de Oro y los Tres Osos",
            "description": "Color Goldilocks and the Three Bears! A classic fairy tale teaching about respect and boundaries.",
            "descriptionEs": "¡Colorea Ricitos de Oro y los Tres Osos! Un cuento de hadas clásico que enseña sobre respeto y límites.",
            "category": "Fairy Tales",
            "imageUrl": "/coloring-images/goldilocks_and_the_three_bears.png",
            "thumbnailUrl": "/coloring-images/goldilocks_and_the_three_bears.png",
            "tags": "goldilocks,three bears,fairy tale,porridge,classic story",
            "difficulty": 3,
            "featured": False
        },
        {
            "urlKey": "pinocchio",
            "title": "Pinocchio",
            "titleEs": "Pinocho",
            "description": "Color the famous wooden puppet Pinocchio! A timeless tale about honesty and becoming real.",
            "descriptionEs": "¡Colorea al famoso títere de madera Pinocho! Un cuento atemporal sobre la honestidad y hacerse real.",
            "category": "Fairy Tales",
            "imageUrl": "/coloring-images/pinocchio.png",
            "thumbnailUrl": "/coloring-images/pinocchio.png",
            "tags": "pinocchio,puppet,fairy tale,wooden boy,honesty",
            "difficulty": 2,
            "featured": False
        },
        {
            "urlKey": "alice-in-wonderland",
            "title": "Alice in Wonderland",
            "titleEs": "Alicia en el País de las Maravillas",
            "description": "Color Alice in Wonderland! Follow Alice down the rabbit hole into a magical adventure.",
            "descriptionEs": "¡Colorea Alicia en el País de las Maravillas! Sigue a Alicia por la madriguera del conejo hacia una aventura mágica.",
            "category": "Fairy Tales",
            "imageUrl": "/coloring-images/alice_in_wonderland.png",
            "thumbnailUrl": "/coloring-images/alice_in_wonderland.png",
            "tags": "alice,wonderland,fairy tale,rabbit hole,adventure",
            "difficulty": 3,
            "featured": False
        },
        {
            "urlKey": "three-little-pigs",
            "title": "Three Little Pigs",
            "titleEs": "Los Tres Cerditos",
            "description": "Color the Three Little Pigs and the Big Bad Wolf! A classic tale about hard work and perseverance.",
            "descriptionEs": "¡Colorea Los Tres Cerditos y el Lobo Feroz! Un cuento clásico sobre trabajo duro y perseverancia.",
            "category": "Fairy Tales",
            "imageUrl": "/coloring-images/three_little_pigs_wolf_huff_and_puff.png",
            "thumbnailUrl": "/coloring-images/three_little_pigs_wolf_huff_and_puff.png",
            "tags": "three little pigs,wolf,fairy tale,houses,huff and puff",
            "difficulty": 3,
            "featured": False
        },
        {
            "urlKey": "rapunzel",
            "title": "Rapunzel",
            "titleEs": "Rapunzel",
            "description": "Color beautiful Rapunzel with her long magical hair! A fairy tale princess locked in a tower.",
            "descriptionEs": "¡Colorea a la hermosa Rapunzel con su largo cabello mágico! Una princesa de cuento de hadas encerrada en una torre.",
            "category": "Fairy Tales",
            "imageUrl": "/coloring-images/rapunzel.png",
            "thumbnailUrl": "/coloring-images/rapunzel.png",
            "tags": "rapunzel,princess,long hair,tower,fairy tale",
            "difficulty": 3,
            "featured": False
        },
        {
            "urlKey": "princess-and-the-frog",
            "title": "The Princess and the Frog",
            "titleEs": "La Princesa y el Sapo",
            "description": "Color the Princess and the Frog! A magical tale about transformation and true love's kiss.",
            "descriptionEs": "¡Colorea La Princesa y el Sapo! Un cuento mágico sobre transformación y el beso del amor verdadero.",
            "category": "Fairy Tales",
            "imageUrl": "/coloring-images/princess_and_the_frog.png",
            "thumbnailUrl": "/coloring-images/princess_and_the_frog.png",
            "tags": "princess,frog,fairy tale,transformation,kiss",
            "difficulty": 2,
            "featured": False
        },
        {
            "urlKey": "hansel-and-gretel",
            "title": "Hansel and Gretel",
            "titleEs": "Hansel y Gretel",
            "description": "Color Hansel and Gretel's adventure! A classic fairy tale about a gingerbread house and clever children.",
            "descriptionEs": "¡Colorea la aventura de Hansel y Gretel! Un cuento de hadas clásico sobre una casa de jengibre y niños astutos.",
            "category": "Fairy Tales",
            "imageUrl": "/coloring-images/hansel_and_gretel.png",
            "thumbnailUrl": "/coloring-images/hansel_and_gretel.png",
            "tags": "hansel and gretel,gingerbread house,witch,fairy tale,breadcrumbs",
            "difficulty": 3,
            "featured": False
        },
        {
            "urlKey": "the-gingerbread-man",
            "title": "The Gingerbread Man",
            "titleEs": "El Hombre de Jengibre",
            "description": "Color the speedy Gingerbread Man! Run, run as fast as you can with this fun fairy tale character.",
            "descriptionEs": "¡Colorea al veloz Hombre de Jengibre! Corre, corre tan rápido como puedas con este divertido personaje de cuento.",
            "category": "Fairy Tales",
            "imageUrl": "/coloring-images/the_gingerbread_man.png",
            "thumbnailUrl": "/coloring-images/the_gingerbread_man.png",
            "tags": "gingerbread man,run,fairy tale,cookie,chase",
            "difficulty": 2,
            "featured": False
        }
    ]
    
    print(f"🧚 Adding {len(fairy_tales)} fairy tales to database...")
    print(f"API URL: {api_url}\n")
    
    success_count = 0
    error_count = 0
    
    for tale in fairy_tales:
        try:
            print(f"Adding: {tale['title']} ({tale['titleEs']})...")
            
            response = requests.post(
                f"{api_url}/paintings",
                json=tale,
                headers={"Content-Type": "application/json"}
            )
            
            if response.status_code in [200, 201]:
                success_count += 1
                print(f"  ✅ Success! ID: {response.json().get('id')}")
            else:
                error_count += 1
                print(f"  ❌ Failed: {response.status_code} - {response.text}")
                
        except Exception as e:
            error_count += 1
            print(f"  ❌ Error: {str(e)}")
        
        print()
    
    print(f"\n{'='*60}")
    print(f"✅ Successfully added: {success_count} fairy tales")
    if error_count > 0:
        print(f"❌ Failed: {error_count} fairy tales")
    print(f"{'='*60}")
    
    return success_count

if __name__ == "__main__":
    # Determine which environment to use
    if len(sys.argv) > 1 and sys.argv[1] == "production":
        API_URL = "https://docker-composeyaml-production.up.railway.app/api"
        print("🌍 PRODUCTION MODE\n")
    else:
        API_URL = "http://localhost:8080/api"
        print("🏠 LOCAL MODE\n")
    
    success = add_fairy_tales(API_URL)
    
    if success > 0:
        print("\n✅ Fairy tales added successfully!")
        if "localhost" in API_URL:
            print("\n📋 Test locally at:")
            print("  - http://localhost:3000/category/Fairy%20Tales")
            print("  - http://localhost:3000/es/category/Fairy%20Tales")
        else:
            print("\n📋 Test in production at:")
            print("  - https://painting-sand.vercel.app/category/Fairy%20Tales")
            print("  - https://painting-sand.vercel.app/es/category/Fairy%20Tales")



