#!/usr/bin/env python3
"""
Add Spanish translations to all paintings in production that don't have them.
This script:
1. Fetches all paintings from production API
2. Identifies paintings without Spanish translations
3. Generates appropriate translations
4. Updates paintings via PUT API
"""

import requests
import json
import time

PROD_API = "https://docker-composeyaml-production.up.railway.app/api"

# Comprehensive translation map
TRANSLATION_MAP = {
    # Animals
    "Elephant": "Elefante",
    "Lion": "León", 
    "Tiger": "Tigre",
    "Bear": "Oso",
    "Cat": "Gato",
    "Dog": "Perro",
    "Bird": "Ave",
    "Fish": "Pez",
    "Butterfly": "Mariposa",
    "Horse": "Caballo",
    "Rabbit": "Conejo",
    "Bunny": "Conejito",
    "Fox": "Zorro",
    "Wolf": "Lobo",
    "Deer": "Ciervo",
    "Owl": "Búho",
    "Eagle": "Águila",
    "Dolphin": "Delfín",
    "Shark": "Tiburón",
    "Whale": "Ballena",
    "Turtle": "Tortuga",
    "Frog": "Rana",
    "Snake": "Serpiente",
    "Penguin": "Pingüino",
    "Giraffe": "Jirafa",
    "Zebra": "Cebra",
    "Monkey": "Mono",
    "Crocodile": "Cocodrilo",
    "Hamster": "Hámster",
    "Cub": "Cachorro",
    "Bat": "Murciélago",
    "Koala": "Koala",
    "Squirrel": "Ardilla",
    "Cute": "Lindo",
    "Flying": "Volador",
    "Love": "Amor",
    
    # Vehicles
    "Car": "Auto",
    "Sport Car": "Auto Deportivo",
    "Truck": "Camión",
    "Bus": "Autobús",
    "Train": "Tren",
    "Airplane": "Avión",
    "Helicopter": "Helicóptero",
    "Boat": "Barco",
    "Ship": "Nave",
    "Motorcycle": "Motocicleta",
    "Bicycle": "Bicicleta",
    "Fire Truck": "Camión de Bomberos",
    "Police Car": "Auto de Policía",
    "Ambulance": "Ambulancia",
    "Rocket": "Cohete",
    "Spaceship": "Nave Espacial",
    
    # Characters
    "Police Officer": "Oficial de Policía",
    "Firefighter": "Bombero",
    "Doctor": "Doctor",
    "Nurse": "Enfermera",
    "Teacher": "Maestro",
    "Student": "Estudiante",
    "Chef": "Chef",
    "Astronaut": "Astronauta",
    "Pirate": "Pirata",
    "Knight": "Caballero",
    "Princess": "Princesa",
    "Little Princess": "Princesita",
    "Prince": "Príncipe",
    "King": "Rey",
    "Queen": "Reina",
    "Royal Queen": "Reina Real",
    "Superhero": "Superhéroe",
    "Clown": "Payaso",
    "Happy Clown": "Payaso Feliz",
    "Scarecrow": "Espantapájaros",
    "Builder": "Constructor",
    "Toy Builder": "Constructor de Juguetes",
    
    # Fantasy
    "Unicorn": "Unicornio",
    "Magical Unicorn": "Unicornio Mágico",
    "Dragon": "Dragón",
    "Fairy": "Hada",
    "Garden Fairy": "Hada del Jardín",
    "Mermaid": "Sirena",
    "Wizard": "Mago",
    "Witch": "Bruja",
    "Monster": "Monstruo",
    "Alien": "Extraterrestre",
    "Ghost": "Fantasma",
    "Vampire": "Vampiro",
    "Zombie": "Zombi",
    "Elf": "Elfo",
    "Gnome": "Gnomo",
    "Troll": "Trol",
    "Dinosaur": "Dinosaurio",
    "Super Dino": "Super Dinosaurio",
    
    # Nature
    "Tree": "Árbol",
    "Flower": "Flor",
    "Rose": "Rosa",
    "Sunflower": "Girasol",
    "Tulip": "Tulipán",
    "Daisy": "Margarita",
    "Mountain": "Montaña",
    "Ocean": "Océano",
    "Beach": "Playa",
    "Forest": "Bosque",
    "River": "Río",
    "Lake": "Lago",
    "Sun": "Sol",
    "Moon": "Luna",
    "Star": "Estrella",
    "Cloud": "Nube",
    "Rainbow": "Arcoíris",
    "Bonsai": "Bonsái",
    "Mushroom House": "Casa de Hongos",
    
    # Holidays
    "Christmas": "Navidad",
    "Spooky Christmas": "Navidad Espeluznante",
    "Halloween": "Halloween",
    "Easter": "Pascua",
    "Birthday": "Cumpleaños",
    "Valentine": "San Valentín",
    "Thanksgiving": "Acción de Gracias",
    "Christmas Tree": "Árbol de Navidad",
    "Christmas Stockings": "Calcetines de Navidad",
    "Santa Claus": "Papá Noel",
    "Rudolph": "Rodolfo",
    "Reindeer": "Reno",
    "Hanukkah": "Hanukkah",
    "Menorah": "Menorá",
    
    # Food
    "Pizza": "Pizza",
    "Hamburger": "Hamburguesa",
    "Ice Cream": "Helado",
    "Friendly Ice Cream": "Helado Amigable",
    "Cake": "Pastel",
    "Cookie": "Galleta",
    "Cupcake": "Magdalena",
    "Donut": "Dona",
    "Apple": "Manzana",
    "Banana": "Plátano",
    "Orange": "Naranja",
    "Strawberry": "Fresa",
    "Watermelon": "Sandía",
    "Bread": "Pan",
    "Broccoli": "Brócoli",
    "Carrot": "Zanahoria",
    "Cheese": "Queso",
    "Corn": "Maíz",
    "Fries": "Papas Fritas",
    "Grapes": "Uvas",
    "Hotdog": "Perrito Caliente",
    "Pineapple": "Piña",
    "Sushi": "Sushi",
    "Tortilla": "Tortilla",
    
    # Sports
    "Soccer": "Fútbol",
    "Basketball": "Baloncesto",
    "Baseball": "Béisbol",
    "Football": "Fútbol Americano",
    "Tennis": "Tenis",
    "Swimming": "Natación",
    "Skating": "Patinaje",
    "Skiing": "Esquí",
    "Surfer": "Surfista",
    "Surfing": "Surf",
    "Karate": "Karate",
    "Player": "Jugador",
    
    # Special characters
    "Spider-Man": "Héroe Araña",
    "Spider Man": "Héroe Araña",
    "Taylor Swift": "Cantante Pop Star",
    "Singing": "Cantante",
    "Guitar": "Guitarra",
    "Playing": "Tocando",
    "Girl": "Niña",
    "Boy": "Niño",
    "Wood": "Bosque",
    "Woods": "Bosque",
    
    # Other
    "Mandala": "Mandala",
    "Hat": "Sombrero",
    "Witch Hat": "Sombrero de Bruja",
}

# Description templates
DESCRIPTION_TEMPLATES = {
    "default": "¡Colorea este increíble {title}! Perfecto para niños creativos.",
    "animal": "¡Una hermosa página para colorear de {title}! Perfecta para niños que aman los animales.",
    "vehicle": "¡Un emocionante {title} listo para colorear! Genial para niños que aman los vehículos.",
    "fantasy": "¡Un {title} mágico de un mundo de fantasía! Deja volar tu imaginación.",
    "character": "¡Colorea este increíble {title}! Perfecto para niños creativos.",
    "mandala": "¡Una hermosa página para colorear de mandala de {title}! Perfecta para niños que aman los animales.",
    "food": "¡Una deliciosa página para colorear de {title}! Perfecta para aprender sobre comida saludable.",
    "holiday": "¡Colorea este increíble {title}! Perfecto para celebrar.",
    "sport": "¡Un emocionante {title}! Genial para niños que aman los deportes.",
}

def translate_title(title):
    """Translate an English title to Spanish"""
    # Check for exact match first
    if title in TRANSLATION_MAP:
        return TRANSLATION_MAP[title]
    
    # Try to translate word by word
    words = title.split()
    translated_words = []
    
    for word in words:
        # Check if the word (without punctuation) is in the map
        clean_word = word.strip(".,!?-")
        if clean_word in TRANSLATION_MAP:
            translated_words.append(TRANSLATION_MAP[clean_word])
        else:
            # Try to find partial matches
            found = False
            for english, spanish in TRANSLATION_MAP.items():
                if english.lower() in clean_word.lower():
                    translated_words.append(spanish)
                    found = True
                    break
            if not found:
                translated_words.append(word)
    
    result = " ".join(translated_words)
    
    # Handle "X Mandala" -> "Mandala de X" pattern
    if "Mandala" in result:
        parts = result.split()
        if len(parts) >= 2 and "Mandala" in parts:
            mandala_idx = parts.index("Mandala")
            if mandala_idx > 0:
                # Move mandala to front with "de"
                animal = " ".join(parts[:mandala_idx])
                result = f"Mandala de {animal}"
    
    return result

def get_description_template(title, category):
    """Get appropriate description template based on category"""
    title_lower = title.lower()
    
    if "mandala" in title_lower:
        return DESCRIPTION_TEMPLATES["mandala"]
    elif category == "Animals":
        return DESCRIPTION_TEMPLATES["animal"]
    elif category == "Vehicles":
        return DESCRIPTION_TEMPLATES["vehicle"]
    elif category == "Fantasy":
        return DESCRIPTION_TEMPLATES["fantasy"]
    elif category == "Characters":
        return DESCRIPTION_TEMPLATES["character"]
    elif category == "Food":
        return DESCRIPTION_TEMPLATES["food"]
    elif category == "Holidays":
        return DESCRIPTION_TEMPLATES["holiday"]
    elif category == "Sports":
        return DESCRIPTION_TEMPLATES["sport"]
    else:
        return DESCRIPTION_TEMPLATES["default"]

def get_all_paintings():
    """Fetch all paintings from production API"""
    try:
        # Fetch with large page size to get all paintings
        response = requests.get(f"{PROD_API}/paintings?page=0&size=500", timeout=30)
        if response.status_code == 200:
            data = response.json()
            return data.get('content', [])
        else:
            print(f"❌ Error fetching paintings: HTTP {response.status_code}")
            return []
    except Exception as e:
        print(f"❌ Error fetching paintings: {e}")
        return []

def update_painting(painting):
    """Update a painting with Spanish translations"""
    painting_id = painting['id']
    
    try:
        # Generate translations
        title_es = translate_title(painting['title'])
        category = painting.get('category', 'default')
        template = get_description_template(painting['title'], category)
        description_es = template.format(title=title_es.lower())
        
        # Update the painting object
        painting['titleEs'] = title_es
        painting['descriptionEs'] = description_es
        
        # Send PUT request
        response = requests.put(
            f"{PROD_API}/paintings/{painting_id}",
            json=painting,
            headers={'Content-Type': 'application/json'},
            timeout=10
        )
        
        if response.status_code == 200:
            updated = response.json()
            if updated.get('titleEs'):
                return True, title_es
            else:
                return False, "Translation not saved"
        else:
            return False, f"HTTP {response.status_code}"
    except Exception as e:
        return False, str(e)

def main():
    print("=" * 80)
    print("🌍 Adding Spanish Translations to Production Paintings")
    print("=" * 80)
    print()
    
    # Fetch all paintings
    print("📊 Fetching all paintings from production...")
    paintings = get_all_paintings()
    print(f"✅ Found {len(paintings)} paintings total")
    print()
    
    # Find paintings without Spanish translations
    missing_spanish = []
    for painting in paintings:
        if not painting.get('titleEs') or painting.get('titleEs') == '':
            missing_spanish.append(painting)
    
    print(f"❌ Found {len(missing_spanish)} paintings missing Spanish translations")
    print()
    
    if len(missing_spanish) == 0:
        print("🎉 All paintings already have Spanish translations!")
        return
    
    # Ask for confirmation
    print(f"🔧 Will add Spanish translations to {len(missing_spanish)} paintings")
    print()
    response = input("Continue? (yes/no): ")
    if response.lower() not in ['yes', 'y']:
        print("❌ Cancelled")
        return
    
    print()
    print("=" * 80)
    print("🚀 Starting translation updates...")
    print("=" * 80)
    print()
    
    # Update paintings
    success_count = 0
    failed_count = 0
    
    for i, painting in enumerate(missing_spanish, 1):
        title = painting['title']
        url_key = painting.get('urlKey', '')
        
        print(f"[{i}/{len(missing_spanish)}] Updating: {title} ({url_key})")
        
        success, result = update_painting(painting)
        
        if success:
            print(f"  ✅ Success: {result}")
            success_count += 1
        else:
            print(f"  ❌ Failed: {result}")
            failed_count += 1
        
        # Small delay to avoid overwhelming the API
        time.sleep(0.5)
    
    print()
    print("=" * 80)
    print("✨ Translation Update Complete!")
    print("=" * 80)
    print(f"✅ Successfully updated: {success_count}")
    print(f"❌ Failed: {failed_count}")
    print()
    
    if success_count > 0:
        print("🎉 Spanish translations have been added to production!")
        print("   Visit your site at /es/ to see the translated content")

if __name__ == "__main__":
    main()




