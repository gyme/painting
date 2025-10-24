#!/usr/bin/env python3
"""
Add ALL new paintings found in the images directory
"""

import os
import json

# All new paintings with metadata
NEW_PAINTINGS = [
    # Holiday (5 already added, keeping for reference)
    {"key": "hanuka-menorah", "file": "hanuka_menorah.png", "title_en": "Hanukkah Menorah", "title_es": "Menorá de Hanukkah", "desc_en": "A beautiful Hanukkah menorah coloring page perfect for celebrating the Festival of Lights!", "desc_es": "¡Una hermosa página para colorear de menorá de Hanukkah perfecta para celebrar la Fiesta de las Luces!", "category": "Holidays", "diff": 2, "tags": "hanukkah,menorah,jewish,holiday,festival"},
    {"key": "christmas-socks", "file": "christmas_socks.png", "title_en": "Christmas Stockings", "title_es": "Calcetines de Navidad", "desc_en": "Festive Christmas stockings hanging by the fireplace!", "desc_es": "¡Calcetines navideños festivos colgando junto a la chimenea!", "category": "Holidays", "diff": 1, "tags": "christmas,stockings,holiday,fireplace"},
    {"key": "rudolph-the-reindeer", "file": "rudolph.png", "title_en": "Rudolph the Reindeer", "title_es": "Rodolfo el Reno", "desc_en": "The most famous reindeer with his bright red nose!", "desc_es": "¡El reno más famoso con su brillante nariz roja!", "category": "Holidays", "diff": 2, "tags": "rudolph,reindeer,christmas,santa"},
    {"key": "santa-claus", "file": "santa_clause.png", "title_en": "Santa Claus", "title_es": "Papá Noel", "desc_en": "Ho ho ho! Santa Claus is ready to deliver presents!", "desc_es": "¡Jo jo jo! ¡Papá Noel está listo para entregar regalos!", "category": "Holidays", "diff": 2, "tags": "santa,christmas,holiday,presents"},
    {"key": "christmas-tree", "file": "christmas_tree.png", "title_en": "Christmas Tree", "title_es": "Árbol de Navidad", "desc_en": "A beautifully decorated Christmas tree with ornaments!", "desc_es": "¡Un hermoso árbol de Navidad decorado con adornos!", "category": "Holidays", "diff": 2, "tags": "christmas,tree,ornaments,holiday"},
    {"key": "little-easter-bunny", "file": "little_easter_bunny.png", "title_en": "Little Easter Bunny", "title_es": "Conejito de Pascua", "desc_en": "An adorable Easter bunny ready to hide eggs!", "desc_es": "¡Un adorable conejito de Pascua listo para esconder huevos!", "category": "Holidays", "diff": 1, "tags": "easter,bunny,rabbit,holiday,spring"},
    {"key": "animal-holiday-gift", "file": "animal_holiday_gift.png", "title_en": "Animal Holiday Gift", "title_es": "Regalo Navideño Animal", "desc_en": "A cute animal with a special holiday gift!", "desc_es": "¡Un lindo animal con un regalo especial de vacaciones!", "category": "Holidays", "diff": 2, "tags": "animal,holiday,gift,christmas"},
    
    # Sports (5)
    {"key": "surfer", "file": "surfer.png", "title_en": "Surfer", "title_es": "Surfista", "desc_en": "A cool surfer riding the waves!", "desc_es": "¡Un surfista genial montando las olas!", "category": "Sports", "diff": 2, "tags": "surfer,surfing,beach,ocean,sports"},
    {"key": "basketball-player", "file": "basketball_player.png", "title_en": "Basketball Player", "title_es": "Jugador de Baloncesto", "desc_en": "An awesome basketball player ready to score!", "desc_es": "¡Un increíble jugador de baloncesto listo para anotar!", "category": "Sports", "diff": 2, "tags": "basketball,sports,player,game"},
    {"key": "karate", "file": "karate.png", "title_en": "Karate Kid", "title_es": "Niño de Karate", "desc_en": "A young martial artist practicing karate moves!", "desc_es": "¡Un joven artista marcial practicando movimientos de karate!", "category": "Sports", "diff": 2, "tags": "karate,martial arts,sports,fighting"},
    {"key": "drummer", "file": "drummer.png", "title_en": "Drummer", "title_es": "Baterista", "desc_en": "A talented drummer playing the drums!", "desc_es": "¡Un talentoso baterista tocando la batería!", "category": "Sports", "diff": 2, "tags": "drummer,drums,music,musician"},
    
    # Animals (10)
    {"key": "crokodile", "file": "crokodile.png", "title_en": "Crocodile", "title_es": "Cocodrilo", "desc_en": "A friendly crocodile with a big smile!", "desc_es": "¡Un cocodrilo amigable con una gran sonrisa!", "category": "Animals", "diff": 2, "tags": "crocodile,reptile,animal,swamp"},
    {"key": "cute-hamster", "file": "cute_hamster.png", "title_en": "Cute Hamster", "title_es": "Hámster Lindo", "desc_en": "An adorable little hamster to color!", "desc_es": "¡Un pequeño hámster adorable para colorear!", "category": "Animals", "diff": 1, "tags": "hamster,cute,pet,animal"},
    {"key": "lion-cub", "file": "lion_cub.png", "title_en": "Lion Cub", "title_es": "Cachorro de León", "desc_en": "A playful baby lion cub!", "desc_es": "¡Un juguetón cachorro de león!", "category": "Animals", "diff": 1, "tags": "lion,cub,baby,animal,safari"},
    {"key": "cute-bat", "file": "cute_bat.png", "title_en": "Cute Bat", "title_es": "Murciélago Lindo", "desc_en": "A friendly little bat hanging upside down!", "desc_es": "¡Un pequeño murciélago amigable colgando boca abajo!", "category": "Animals", "diff": 1, "tags": "bat,halloween,animal,cute"},
    {"key": "cute-bear", "file": "cute_bear.png", "title_en": "Cute Bear", "title_es": "Oso Lindo", "desc_en": "An adorable teddy bear waiting to be colored!", "desc_es": "¡Un adorable oso de peluche esperando ser coloreado!", "category": "Animals", "diff": 1, "tags": "bear,teddy,cute,animal"},
    {"key": "cute-elephant", "file": "cute_elephant.png", "title_en": "Cute Elephant", "title_es": "Elefante Lindo", "desc_en": "A sweet baby elephant with big ears!", "desc_es": "¡Un dulce elefante bebé con orejas grandes!", "category": "Animals", "diff": 1, "tags": "elephant,cute,baby,animal"},
    {"key": "flying-kuala", "file": "flying_kuala.png", "title_en": "Flying Koala", "title_es": "Koala Volador", "desc_en": "A magical koala flying through the air!", "desc_es": "¡Un koala mágico volando por el aire!", "category": "Animals", "diff": 2, "tags": "koala,flying,magic,animal"},
    {"key": "koala-love", "file": "koala_love.png", "title_en": "Koala Love", "title_es": "Koala Amor", "desc_en": "A sweet koala showing love and affection!", "desc_es": "¡Un dulce koala mostrando amor y afecto!", "category": "Animals", "diff": 1, "tags": "koala,love,heart,animal"},
    {"key": "squirrel", "file": "squirrel.png", "title_en": "Squirrel", "title_es": "Ardilla", "desc_en": "A busy squirrel gathering nuts!", "desc_es": "¡Una ardilla ocupada recolectando nueces!", "category": "Animals", "diff": 2, "tags": "squirrel,animal,nuts,forest"},
    
    # Characters (15)
    {"key": "clown", "file": "clown.png", "title_en": "Happy Clown", "title_es": "Payaso Feliz", "desc_en": "A cheerful clown with a big smile!", "desc_es": "¡Un payaso alegre con una gran sonrisa!", "category": "Characters", "diff": 2, "tags": "clown,circus,funny,character"},
    {"key": "girl-playing-guitar", "file": "girl_playing_guitar.png", "title_en": "Girl Playing Guitar", "title_es": "Niña Tocando Guitarra", "desc_en": "A talented girl playing her guitar!", "desc_es": "¡Una niña talentosa tocando su guitarra!", "category": "Characters", "diff": 2, "tags": "girl,guitar,music,musician"},
    {"key": "princess-in-the-wood", "file": "princess_in_the_wood.png", "title_en": "Princess in the Woods", "title_es": "Princesa en el Bosque", "desc_en": "A beautiful princess exploring the magical forest!", "desc_es": "¡Una hermosa princesa explorando el bosque mágico!", "category": "Characters", "diff": 2, "tags": "princess,forest,fairy tale,magic"},
    {"key": "queen", "file": "queen.png", "title_en": "Royal Queen", "title_es": "Reina Real", "desc_en": "An elegant queen in her royal gown!", "desc_es": "¡Una reina elegante en su vestido real!", "category": "Characters", "diff": 2, "tags": "queen,royal,princess,crown"},
    {"key": "little-princess", "file": "little_princess.png", "title_en": "Little Princess", "title_es": "Princesita", "desc_en": "A cute little princess with her crown!", "desc_es": "¡Una linda princesita con su corona!", "category": "Characters", "diff": 1, "tags": "princess,little,cute,crown"},
    {"key": "astronaut", "file": "astronaut.png", "title_en": "Astronaut", "title_es": "Astronauta", "desc_en": "A brave astronaut exploring space!", "desc_es": "¡Un valiente astronauta explorando el espacio!", "category": "Characters", "diff": 2, "tags": "astronaut,space,rocket,science"},
    {"key": "cute-scarecrow", "file": "cute_scarecrow.png", "title_en": "Cute Scarecrow", "title_es": "Espantapájaros Lindo", "desc_en": "A friendly scarecrow in the field!", "desc_es": "¡Un espantapájaros amigable en el campo!", "category": "Characters", "diff": 2, "tags": "scarecrow,farm,autumn,halloween"},
    {"key": "student", "file": "student.png", "title_en": "Student", "title_es": "Estudiante", "desc_en": "A smart student ready to learn!", "desc_es": "¡Un estudiante inteligente listo para aprender!", "category": "Characters", "diff": 1, "tags": "student,school,learning,education"},
    {"key": "toy-builder", "file": "toy_builder.png", "title_en": "Toy Builder", "title_es": "Constructor de Juguetes", "desc_en": "A creative kid building amazing toys!", "desc_es": "¡Un niño creativo construyendo juguetes increíbles!", "category": "Characters", "diff": 2, "tags": "toys,building,creative,play"},
    {"key": "wizzard", "file": "wizzard.png", "title_en": "Wizard", "title_es": "Mago", "desc_en": "A magical wizard casting spells!", "desc_es": "¡Un mago mágico lanzando hechizos!", "category": "Characters", "diff": 2, "tags": "wizard,magic,spells,fantasy"},
    {"key": "witch-hat", "file": "witch_hat.png", "title_en": "Witch Hat", "title_es": "Sombrero de Bruja", "desc_en": "A spooky witch hat for Halloween!", "desc_es": "¡Un sombrero de bruja espeluznante para Halloween!", "category": "Characters", "diff": 1, "tags": "witch,hat,halloween,spooky"},
    {"key": "taylor-swift", "file": "taylor_swift.jpg", "title_en": "Pop Star Singer", "title_es": "Cantante Pop Star", "desc_en": "A famous pop star performing on stage!", "desc_es": "¡Una famosa estrella del pop actuando en el escenario!", "category": "Characters", "diff": 2, "tags": "singer,pop star,music,celebrity"},
    {"key": "spider-man", "file": "spider_man.png", "title_en": "Spider Hero", "title_es": "Héroe Araña", "desc_en": "A superhero swinging through the city!", "desc_es": "¡Un superhéroe columpiándose por la ciudad!", "category": "Characters", "diff": 2, "tags": "superhero,spider,hero,action"},
    {"key": "friendly-icecream", "file": "friendly_icecream.png", "title_en": "Friendly Ice Cream", "title_es": "Helado Amigable", "desc_en": "A happy ice cream cone with a smile!", "desc_es": "¡Un cono de helado feliz con una sonrisa!", "category": "Characters", "diff": 1, "tags": "ice cream,food,sweet,summer"},
    
    # Fantasy (7)
    {"key": "unicorn", "file": "unicorn.png", "title_en": "Magical Unicorn", "title_es": "Unicornio Mágico", "desc_en": "A beautiful unicorn with a rainbow mane!", "desc_es": "¡Un hermoso unicornio con melena arcoíris!", "category": "Fantasy", "diff": 2, "tags": "unicorn,magic,rainbow,fantasy"},
    {"key": "fairy", "file": "fairy.png", "title_en": "Garden Fairy", "title_es": "Hada del Jardín", "desc_en": "A magical fairy with sparkly wings!", "desc_es": "¡Un hada mágica con alas brillantes!", "category": "Fantasy", "diff": 2, "tags": "fairy,magic,wings,fantasy"},
    {"key": "fairy-butterfly", "file": "fairy_butterfly.png", "title_en": "Butterfly Fairy", "title_es": "Hada Mariposa", "desc_en": "A fairy with beautiful butterfly wings!", "desc_es": "¡Un hada con hermosas alas de mariposa!", "category": "Fantasy", "diff": 2, "tags": "fairy,butterfly,wings,magic"},
    {"key": "fairy-on-a-flower", "file": "fairy_on_a_flower.png", "title_en": "Fairy on a Flower", "title_es": "Hada en una Flor", "desc_en": "A tiny fairy resting on a flower!", "desc_es": "¡Un hada pequeña descansando en una flor!", "category": "Fantasy", "diff": 2, "tags": "fairy,flower,garden,magic"},
    {"key": "super-dino", "file": "super_dino.png", "title_en": "Super Dinosaur", "title_es": "Super Dinosaurio", "desc_en": "A superhero dinosaur ready to save the day!", "desc_es": "¡Un dinosaurio superhéroe listo para salvar el día!", "category": "Fantasy", "diff": 2, "tags": "dinosaur,superhero,fantasy,action"},
    {"key": "mushroom-house", "file": "mushroom_house.png", "title_en": "Mushroom House", "title_es": "Casa de Hongos", "desc_en": "A magical house made from a giant mushroom!", "desc_es": "¡Una casa mágica hecha de un hongo gigante!", "category": "Fantasy", "diff": 2, "tags": "mushroom,house,fairy tale,magic"},
    
    # Mandalas (6)
    {"key": "bird-mandala", "file": "bird_mandala.png", "title_en": "Bird Mandala", "title_es": "Mandala de Pájaro", "desc_en": "A beautiful bird mandala with intricate patterns!", "desc_es": "¡Un hermoso mandala de pájaro con patrones intrincados!", "category": "Mandalas", "diff": 3, "tags": "mandala,bird,pattern,meditation"},
    {"key": "elephant-mandala", "file": "elephant_mandala.png", "title_en": "Elephant Mandala", "title_es": "Mandala de Elefante", "desc_en": "An elephant mandala with detailed designs!", "desc_es": "¡Un mandala de elefante con diseños detallados!", "category": "Mandalas", "diff": 3, "tags": "mandala,elephant,pattern,meditation"},
    {"key": "lion-mandala", "file": "lion_mandala.png", "title_en": "Lion Mandala", "title_es": "Mandala de León", "desc_en": "A majestic lion mandala with intricate details!", "desc_es": "¡Un majestuoso mandala de león con detalles intrincados!", "category": "Mandalas", "diff": 3, "tags": "mandala,lion,pattern,meditation"},
    {"key": "tiger-mandala", "file": "tiger_mandala.png", "title_en": "Tiger Mandala", "title_es": "Mandala de Tigre", "desc_en": "A powerful tiger mandala with beautiful patterns!", "desc_es": "¡Un poderoso mandala de tigre con hermosos patrones!", "category": "Mandalas", "diff": 3, "tags": "mandala,tiger,pattern,meditation"},
    {"key": "owl-mandala", "file": "owl_mandala.png", "title_en": "Owl Mandala", "title_es": "Mandala de Búho", "desc_en": "A wise owl mandala with intricate designs!", "desc_es": "¡Un sabio mandala de búho con diseños intrincados!", "category": "Mandalas", "diff": 3, "tags": "mandala,owl,pattern,meditation"},
    {"key": "meduza-mandala", "file": "meduza_mandala.png", "title_en": "Jellyfish Mandala", "title_es": "Mandala de Medusa", "desc_en": "A flowing jellyfish mandala with elegant patterns!", "desc_es": "¡Un mandala de medusa fluido con patrones elegantes!", "category": "Mandalas", "diff": 3, "tags": "mandala,jellyfish,ocean,pattern"},
    
    # Nature (1)
    {"key": "bonsai", "file": "bonsai.png", "title_en": "Bonsai Tree", "title_es": "Árbol Bonsái", "desc_en": "A beautiful miniature bonsai tree!", "desc_es": "¡Un hermoso árbol bonsái en miniatura!", "category": "Nature", "diff": 2, "tags": "bonsai,tree,nature,zen"},
]

def generate_coloringimages_entries():
    """Generate entries for coloringImages.ts"""
    print("=" * 70)
    print("🎨 COLORINGIMAGES.TS ENTRIES")
    print("=" * 70)
    print()
    
    for p in NEW_PAINTINGS:
        print(f"  '{p['key']}': '/coloring-images/{p['file']}',")
    print()

def generate_api_calls():
    """Generate curl commands to add to production"""
    print("=" * 70)
    print("🚀 API CALLS TO ADD TO PRODUCTION")
    print("=" * 70)
    print()
    
    for idx, p in enumerate(NEW_PAINTINGS, 1):
        print(f"# {idx}. {p['title_en']}")
        print(f"""curl -s -X POST "https://docker-composeyaml-production.up.railway.app/api/paintings" \\
  -H "Content-Type: application/json" \\
  -d '{{
    "urlKey": "{p['key']}",
    "title": "{p['title_en']}",
    "description": "{p['desc_en']}",
    "titleEs": "{p['title_es']}",
    "descriptionEs": "{p['desc_es']}",
    "category": "{p['category']}",
    "difficulty": {p['diff']},
    "tags": "{p['tags']}",
    "imageUrl": "/coloring-images/{p['file']}",
    "thumbnailUrl": "/coloring-images/{p['file']}",
    "featured": false
  }}' | jq '.id'
""")
        print()

def main():
    print("🎨 Adding ALL New Paintings")
    print(f"Total paintings to add: {len(NEW_PAINTINGS)}")
    print()
    
    # Save to file
    output_file = '/Users/guym/Documents/d/paiting/tools/all_new_paintings.json'
    with open(output_file, 'w') as f:
        json.dump(NEW_PAINTINGS, f, indent=2)
    
    print(f"✅ Saved metadata to: {output_file}")
    print()
    
    generate_coloringimages_entries()
    
    print("\n📝 Next steps:")
    print("1. Add the entries above to coloringImages.ts")
    print("2. Run the bash script to add to production")
    print("3. Regenerate sitemaps")
    print("4. Test locally")
    print("5. Deploy to Vercel")

if __name__ == '__main__':
    main()


