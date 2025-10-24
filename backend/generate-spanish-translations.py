#!/usr/bin/env python3
"""
Generate Spanish translations for painting titles and descriptions
This script generates SQL UPDATE statements for all paintings

Usage:
  python3 generate-spanish-translations.py > translations.sql
  
Then run the SQL on your database:
  psql <your-database-url> < translations.sql
"""

import json

# Common translation patterns for painting titles
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
    "Prince": "Príncipe",
    "King": "Rey",
    "Queen": "Reina",
    "Superhero": "Superhéroe",
    
    # Fantasy
    "Unicorn": "Unicornio",
    "Dragon": "Dragón",
    "Fairy": "Hada",
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
    
    # Holidays
    "Christmas": "Navidad",
    "Spooky Christmas": "Navidad Espeluznante",
    "Halloween": "Halloween",
    "Easter": "Pascua",
    "Birthday": "Cumpleaños",
    "Valentine": "San Valentín",
    "Thanksgiving": "Acción de Gracias",
    
    # Food
    "Pizza": "Pizza",
    "Burger": "Hamburguesa",
    "Ice Cream": "Helado",
    "Cake": "Pastel",
    "Cookie": "Galleta",
    "Cupcake": "Magdalena",
    "Donut": "Dona",
    "Apple": "Manzana",
    "Banana": "Plátano",
    "Orange": "Naranja",
    "Strawberry": "Fresa",
    "Watermelon": "Sandía",
    
    # Sports
    "Soccer": "Fútbol",
    "Basketball": "Baloncesto",
    "Baseball": "Béisbol",
    "Football": "Fútbol Americano",
    "Tennis": "Tenis",
    "Swimming": "Natación",
    "Skating": "Patinaje",
    "Skiing": "Esquí",
    
    # Other
    "Mandala": "Mandala",
    "Dinosaur": "Dinosaurio",
    "T-Rex": "T-Rex",
    "Triceratops": "Triceratops",
    "Stegosaurus": "Estegosaurio",
}

# Description templates
DESCRIPTION_TEMPLATES = {
    "default": "¡Colorea {title}! Perfecto para niños creativos.",
    "animal": "¡Una hermosa página para colorear de {title}! Perfecta para niños que aman los animales.",
    "vehicle": "¡Un emocionante {title} listo para colorear! Genial para niños que aman los vehículos.",
    "fantasy": "¡{title} mágico de un mundo de fantasía! Deja volar tu imaginación.",
    "character": "¡Colorea este increíble {title}! Perfecto para niños creativos.",
    "mandala": "¡Una hermosa página para colorear de mandala de {title}! Perfecta para niños que aman los animales.",
}

def translate_title(title):
    """Translate an English title to Spanish"""
    # Check for exact match
    if title in TRANSLATION_MAP:
        return TRANSLATION_MAP[title]
    
    # Check for partial matches
    for english, spanish in TRANSLATION_MAP.items():
        if english in title:
            title = title.replace(english, spanish)
    
    # Handle "Mandala" suffix
    if "Mandala" in title:
        parts = title.split()
        translated_parts = []
        for part in parts:
            if part == "Mandala":
                translated_parts.append("Mandala de")
            elif part in TRANSLATION_MAP:
                translated_parts.append(TRANSLATION_MAP[part])
            else:
                translated_parts.append(part)
        return " ".join(translated_parts).replace("Mandala de de", "Mandala de")
    
    return title  # Return as-is if no translation found

def get_description_template(title, category):
    """Get appropriate description template based on category"""
    if "Mandala" in title:
        return DESCRIPTION_TEMPLATES["mandala"]
    elif category == "Animals":
        return DESCRIPTION_TEMPLATES["animal"]
    elif category == "Vehicles":
        return DESCRIPTION_TEMPLATES["vehicle"]
    elif category == "Fantasy":
        return DESCRIPTION_TEMPLATES["fantasy"]
    elif category == "Characters":
        return DESCRIPTION_TEMPLATES["character"]
    else:
        return DESCRIPTION_TEMPLATES["default"]

def generate_sql():
    """Generate SQL UPDATE statements"""
    print("-- Spanish translations for paintings")
    print("-- Generated by generate-spanish-translations.py")
    print("-- Run this on your PostgreSQL database\n")
    print("BEGIN;\n")
    
    # Example paintings from the screenshot
    paintings = [
        {"title": "Police Officer", "category": "Characters"},
        {"title": "Wizard", "category": "Fantasy"},
        {"title": "Tiger Mandala", "category": "Animals"},
        {"title": "Sport Car", "category": "Vehicles"},
        {"title": "Student", "category": "Characters"},
        {"title": "Lion", "category": "Animals"},
        {"title": "Fairy", "category": "Fantasy"},
        {"title": "Spooky Christmas", "category": "Holidays"},
    ]
    
    for painting in paintings:
        title = painting["title"]
        category = painting["category"]
        
        title_es = translate_title(title)
        template = get_description_template(title, category)
        description_es = template.format(title=title_es.lower())
        
        print(f"UPDATE paintings SET ")
        print(f"    title_es = '{title_es}',")
        print(f"    description_es = '{description_es}'")
        print(f"WHERE title = '{title}';")
        print()
    
    print("\n-- Add translations for ALL other paintings")
    print("-- You can use this template and modify for your other paintings:\n")
    print("""
-- Generic translation template (modify as needed):
UPDATE paintings SET 
    title_es = (CASE 
        -- Add your translations here
        WHEN title LIKE '%Elephant%' THEN REPLACE(title, 'Elephant', 'Elefante')
        WHEN title LIKE '%Lion%' THEN REPLACE(title, 'Lion', 'León')
        WHEN title LIKE '%Tiger%' THEN REPLACE(title, 'Tiger', 'Tigre')
        WHEN title LIKE '%Bear%' THEN REPLACE(title, 'Bear', 'Oso')
        -- Add more patterns...
        ELSE title -- Keep original if no translation
    END),
    description_es = CONCAT('¡Colorea ', LOWER(COALESCE(title_es, title)), '! Perfecto para niños creativos.')
WHERE title_es IS NULL;
""")
    
    print("\nCOMMIT;")
    print("\n-- Verify translations")
    print("SELECT id, title, title_es, description, description_es FROM paintings WHERE title_es IS NOT NULL LIMIT 20;")

if __name__ == "__main__":
    generate_sql()

