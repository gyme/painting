#!/usr/bin/env python3
"""
Add Inspiring People Category with Spanish Translations
This script adds famous inspiring historical figures to the coloring website
"""

import requests
import json

# API Configuration
API_URL = "https://docker-composeyaml-production.up.railway.app/api"

# Famous inspiring people with Spanish translations
INSPIRING_PEOPLE = [
    {
        "name": "Leonardo da Vinci",
        "nameSpanish": "Leonardo da Vinci",
        "urlKey": "leonardo-da-vinci",
        "imagePath": "coloring-images/leonardo_de_vinci.png",
        "category": "inspiring-people",
        "description": "Renaissance artist, inventor, and scientist - painter of the Mona Lisa",
        "descriptionSpanish": "Artista del Renacimiento, inventor y científico - pintor de la Mona Lisa"
    },
    {
        "name": "Albert Einstein",
        "nameSpanish": "Albert Einstein",
        "urlKey": "albert-einstein",
        "imagePath": "coloring-images/albert_einstein.png",
        "category": "inspiring-people",
        "description": "Theoretical physicist who developed the theory of relativity",
        "descriptionSpanish": "Físico teórico que desarrolló la teoría de la relatividad"
    },
    {
        "name": "Marie Curie",
        "nameSpanish": "Marie Curie",
        "urlKey": "marie-curie",
        "imagePath": "coloring-images/marie_curie.png",
        "category": "inspiring-people",
        "description": "First woman to win a Nobel Prize, pioneering research on radioactivity",
        "descriptionSpanish": "Primera mujer en ganar un Premio Nobel, investigación pionera sobre la radioactividad"
    },
    {
        "name": "Amelia Earhart",
        "nameSpanish": "Amelia Earhart",
        "urlKey": "amelia-earhart",
        "imagePath": "coloring-images/amelia_earhart.png",
        "category": "inspiring-people",
        "description": "First female aviator to fly solo across the Atlantic Ocean",
        "descriptionSpanish": "Primera aviadora en volar en solitario a través del Océano Atlántico"
    },
    {
        "name": "Neil Armstrong",
        "nameSpanish": "Neil Armstrong",
        "urlKey": "neil-armstrong",
        "imagePath": "coloring-images/neil_armstrong.png",
        "category": "inspiring-people",
        "description": "First person to walk on the Moon",
        "descriptionSpanish": "Primera persona en caminar sobre la Luna"
    },
    {
        "name": "Frida Kahlo",
        "nameSpanish": "Frida Kahlo",
        "urlKey": "frida-kahlo",
        "imagePath": "coloring-images/frida_kahlo.png",
        "category": "inspiring-people",
        "description": "Mexican artist known for her powerful self-portraits",
        "descriptionSpanish": "Artista mexicana conocida por sus poderosos autorretratos"
    },
    {
        "name": "Nikola Tesla",
        "nameSpanish": "Nikola Tesla",
        "urlKey": "nikola-tesla",
        "imagePath": "coloring-images/nikola_tesla.png",
        "category": "inspiring-people",
        "description": "Inventor and electrical engineer who pioneered AC electricity",
        "descriptionSpanish": "Inventor e ingeniero eléctrico que fue pionero en la electricidad AC"
    },
    {
        "name": "William Shakespeare",
        "nameSpanish": "William Shakespeare",
        "urlKey": "william-shakespeare",
        "imagePath": "coloring-images/william_shakespeare.png",
        "category": "inspiring-people",
        "description": "Greatest writer in the English language, playwright of Romeo and Juliet",
        "descriptionSpanish": "El mayor escritor en lengua inglesa, dramaturgo de Romeo y Julieta"
    },
    {
        "name": "Ludwig van Beethoven",
        "nameSpanish": "Ludwig van Beethoven",
        "urlKey": "ludwig-van-beethoven",
        "imagePath": "coloring-images/ludwig_van_beethoven.png",
        "category": "inspiring-people",
        "description": "Composer who continued creating music even after losing his hearing",
        "descriptionSpanish": "Compositor que continuó creando música incluso después de perder la audición"
    },
    {
        "name": "Rosa Parks",
        "nameSpanish": "Rosa Parks",
        "urlKey": "rosa-parks",
        "imagePath": "coloring-images/rosa_parks.png",
        "category": "inspiring-people",
        "description": "Civil rights activist who sparked the Montgomery Bus Boycott",
        "descriptionSpanish": "Activista de derechos civiles que inició el boicot de autobuses de Montgomery"
    },
    {
        "name": "Martin Luther King Jr.",
        "nameSpanish": "Martin Luther King Jr.",
        "urlKey": "martin-luther-king-jr",
        "imagePath": "coloring-images/martin_luther_king_jr..png",
        "category": "inspiring-people",
        "description": "Civil rights leader who fought for equality through peaceful protest",
        "descriptionSpanish": "Líder de derechos civiles que luchó por la igualdad mediante la protesta pacífica"
    },
    {
        "name": "Mahatma Gandhi",
        "nameSpanish": "Mahatma Gandhi",
        "urlKey": "mahatma-gandhi",
        "imagePath": "coloring-images/mahatma_gandhi.png",
        "category": "inspiring-people",
        "description": "Leader of India's independence movement through nonviolent resistance",
        "descriptionSpanish": "Líder del movimiento de independencia de India mediante la resistencia no violenta"
    },
    {
        "name": "Harriet Tubman",
        "nameSpanish": "Harriet Tubman",
        "urlKey": "harriet-tubman",
        "imagePath": "coloring-images/harriet_tubman.png",
        "category": "inspiring-people",
        "description": "Escaped slave who led hundreds to freedom on the Underground Railroad",
        "descriptionSpanish": "Esclava escapada que llevó a cientos a la libertad en el Ferrocarril Subterráneo"
    },
    {
        "name": "Sally Ride",
        "nameSpanish": "Sally Ride",
        "urlKey": "sally-ride",
        "imagePath": "coloring-images/sally_ride.png",
        "category": "inspiring-people",
        "description": "First American woman in space",
        "descriptionSpanish": "Primera mujer estadounidense en el espacio"
    },
    {
        "name": "Ada Lovelace",
        "nameSpanish": "Ada Lovelace",
        "urlKey": "ada-lovelace",
        "imagePath": "coloring-images/ada_lovelace.png",
        "category": "inspiring-people",
        "description": "World's first computer programmer",
        "descriptionSpanish": "La primera programadora de computadoras del mundo"
    },
    {
        "name": "Abraham Lincoln",
        "nameSpanish": "Abraham Lincoln",
        "urlKey": "abraham-lincoln",
        "imagePath": "coloring-images/abraham_lincoln.png",
        "category": "inspiring-people",
        "description": "16th U.S. President who abolished slavery",
        "descriptionSpanish": "16º Presidente de EE.UU. que abolió la esclavitud"
    },
    {
        "name": "Florence Nightingale",
        "nameSpanish": "Florence Nightingale",
        "urlKey": "florence-nightingale",
        "imagePath": "coloring-images/florence_nighingale.png",
        "category": "inspiring-people",
        "description": "Founder of modern nursing and healthcare reform",
        "descriptionSpanish": "Fundadora de la enfermería moderna y la reforma sanitaria"
    },
    {
        "name": "Galileo Galilei",
        "nameSpanish": "Galileo Galilei",
        "urlKey": "galileo-galilei",
        "imagePath": "coloring-images/galileo_galilei.png",
        "category": "inspiring-people",
        "description": "Astronomer who discovered that Earth revolves around the Sun",
        "descriptionSpanish": "Astrónomo que descubrió que la Tierra gira alrededor del Sol"
    },
    {
        "name": "Christopher Columbus",
        "nameSpanish": "Cristóbal Colón",
        "urlKey": "christopher-columbus",
        "imagePath": "coloring-images/christopher_columbus.png",
        "category": "inspiring-people",
        "description": "Explorer who led the first European expedition to the Americas",
        "descriptionSpanish": "Explorador que lideró la primera expedición europea a las Américas"
    }
]

def add_painting(painting):
    """Add a painting to the database"""
    try:
        # Prepare the painting data (matching backend Painting model)
        data = {
            "urlKey": painting["urlKey"],
            "title": painting["name"],
            "titleEs": painting["nameSpanish"],
            "description": painting["description"],
            "descriptionEs": painting["descriptionSpanish"],
            "category": painting["category"],
            "imageUrl": painting["imagePath"],
            "thumbnailUrl": painting["imagePath"],  # Same as imageUrl
            "difficulty": 3,  # Medium difficulty (1-5 scale)
            "featured": False,
            "viewCount": 0,
            "tags": "inspiring,people,famous,historical,hero"
        }
        
        # Send POST request
        response = requests.post(
            f"{API_URL}/paintings",
            json=data,
            headers={"Content-Type": "application/json"}
        )
        
        if response.status_code in [200, 201]:
            print(f"✅ Added: {painting['name']}")
            return True
        else:
            print(f"❌ Failed to add {painting['name']}: HTTP {response.status_code}")
            print(f"   Response: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Error adding {painting['name']}: {str(e)}")
        return False

def main():
    print("🎨 Adding Inspiring People Category")
    print("=" * 60)
    print(f"📡 API: {API_URL}")
    print(f"📊 Total paintings: {len(INSPIRING_PEOPLE)}")
    print("=" * 60)
    print()
    
    success_count = 0
    failed_count = 0
    
    for painting in INSPIRING_PEOPLE:
        if add_painting(painting):
            success_count += 1
        else:
            failed_count += 1
    
    print()
    print("=" * 60)
    print("📊 Summary:")
    print(f"   ✅ Successfully added: {success_count}")
    print(f"   ❌ Failed: {failed_count}")
    print("=" * 60)
    print()
    
    if success_count > 0:
        print("✨ Inspiring people added successfully!")
        print()
        print("🔔 Next steps:")
        print("1. Convert images to WebP for better performance")
        print("2. Submit to IndexNow for Bing indexing")
        print("3. Test on production site")

if __name__ == "__main__":
    main()

