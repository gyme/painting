#!/usr/bin/env python3
"""
Add 9 new dinosaur coloring pages to production with Spanish translations
Creates a new "Dinosaurs" category
"""

import requests
import json
import time

PROD_API = "https://docker-composeyaml-production.up.railway.app/api"

# All 9 dinosaur paintings with English and Spanish
dinosaurs = [
    {
        "urlKey": "t-rex",
        "title": "T-Rex",
        "titleEs": "T-Rex",
        "description": "The mighty Tyrannosaurus Rex! The king of dinosaurs with powerful jaws and tiny arms. Perfect for kids who love prehistoric creatures.",
        "descriptionEs": "¡El poderoso Tyrannosaurus Rex! El rey de los dinosaurios con mandíbulas poderosas y brazos pequeños. Perfecto para niños que aman las criaturas prehistóricas.",
        "category": "Dinosaurs",
        "difficulty": 3,
        "tags": "t-rex,tyrannosaurus,dinosaur,prehistoric,carnivore,jurassic",
        "imageUrl": "/coloring-images/t_rex.png",
        "thumbnailUrl": "/coloring-images/t_rex.png",
        "featured": True
    },
    {
        "urlKey": "triceratops",
        "title": "Triceratops",
        "titleEs": "Triceratops",
        "description": "A friendly Triceratops with three horns and a protective frill! This gentle herbivore is perfect for young dinosaur fans.",
        "descriptionEs": "¡Un Triceratops amigable con tres cuernos y un collar protector! Este herbívoro gentil es perfecto para jóvenes fanáticos de los dinosaurios.",
        "category": "Dinosaurs",
        "difficulty": 2,
        "tags": "triceratops,dinosaur,prehistoric,herbivore,three horns,cretaceous",
        "imageUrl": "/coloring-images/triceratops.png",
        "thumbnailUrl": "/coloring-images/triceratops.png",
        "featured": True
    },
    {
        "urlKey": "stegosaurus",
        "title": "Stegosaurus",
        "titleEs": "Estegosaurio",
        "description": "A Stegosaurus with distinctive plates along its back and spikes on its tail! Learn about this fascinating armored dinosaur.",
        "descriptionEs": "¡Un Estegosaurio con placas distintivas en su espalda y púas en su cola! Aprende sobre este fascinante dinosaurio acorazado.",
        "category": "Dinosaurs",
        "difficulty": 2,
        "tags": "stegosaurus,dinosaur,prehistoric,herbivore,plates,spikes,jurassic",
        "imageUrl": "/coloring-images/stegosaurus.png",
        "thumbnailUrl": "/coloring-images/stegosaurus.png",
        "featured": False
    },
    {
        "urlKey": "velociraptor",
        "title": "Velociraptor",
        "titleEs": "Velociraptor",
        "description": "A swift and clever Velociraptor! This intelligent predator was one of the smartest dinosaurs. Great for adventurous kids!",
        "descriptionEs": "¡Un Velociraptor rápido e inteligente! Este depredador inteligente fue uno de los dinosaurios más astutos. ¡Genial para niños aventureros!",
        "category": "Dinosaurs",
        "difficulty": 3,
        "tags": "velociraptor,dinosaur,prehistoric,carnivore,raptor,intelligent,cretaceous",
        "imageUrl": "/coloring-images/velociraptor.png",
        "thumbnailUrl": "/coloring-images/velociraptor.png",
        "featured": False
    },
    {
        "urlKey": "brachiosaurus",
        "title": "Brachiosaurus",
        "titleEs": "Braquiosaurio",
        "description": "The towering Brachiosaurus! One of the tallest dinosaurs that ever lived, reaching treetops with its long neck.",
        "descriptionEs": "¡El imponente Braquiosaurio! Uno de los dinosaurios más altos que jamás existió, alcanzando las copas de los árboles con su largo cuello.",
        "category": "Dinosaurs",
        "difficulty": 2,
        "tags": "brachiosaurus,dinosaur,prehistoric,herbivore,long neck,sauropod,jurassic",
        "imageUrl": "/coloring-images/brachiosaurus.png",
        "thumbnailUrl": "/coloring-images/brachiosaurus.png",
        "featured": False
    },
    {
        "urlKey": "spinosaurus",
        "title": "Spinosaurus",
        "titleEs": "Espinosaurio",
        "description": "The massive Spinosaurus with its distinctive sail on its back! This swimming dinosaur was even bigger than T-Rex!",
        "descriptionEs": "¡El masivo Espinosaurio con su distintiva vela en su espalda! ¡Este dinosaurio nadador era incluso más grande que el T-Rex!",
        "category": "Dinosaurs",
        "difficulty": 3,
        "tags": "spinosaurus,dinosaur,prehistoric,carnivore,sail,swimming,cretaceous",
        "imageUrl": "/coloring-images/spinosaurus.png",
        "thumbnailUrl": "/coloring-images/spinosaurus.png",
        "featured": False
    },
    {
        "urlKey": "pteranodon",
        "title": "Pteranodon",
        "titleEs": "Pteranodón",
        "description": "A soaring Pteranodon! This flying reptile ruled the prehistoric skies with its impressive wingspan.",
        "descriptionEs": "¡Un Pteranodón volador! Este reptil volador dominó los cielos prehistóricos con su impresionante envergadura.",
        "category": "Dinosaurs",
        "difficulty": 2,
        "tags": "pteranodon,dinosaur,prehistoric,flying,pterosaur,cretaceous",
        "imageUrl": "/coloring-images/pteranodon.png",
        "thumbnailUrl": "/coloring-images/pteranodon.png",
        "featured": False
    },
    {
        "urlKey": "ankylosaurus",
        "title": "Ankylosaurus",
        "titleEs": "Anquilosaurio",
        "description": "The armored Ankylosaurus with a club tail! This tank-like dinosaur was built for defense with its heavy armor.",
        "descriptionEs": "¡El Anquilosaurio acorazado con cola de mazo! Este dinosaurio tipo tanque estaba construido para la defensa con su pesada armadura.",
        "category": "Dinosaurs",
        "difficulty": 3,
        "tags": "ankylosaurus,dinosaur,prehistoric,herbivore,armor,club tail,cretaceous",
        "imageUrl": "/coloring-images/ankylosaurus.png",
        "thumbnailUrl": "/coloring-images/ankylosaurus.png",
        "featured": False
    },
    {
        "urlKey": "parasaurolophus",
        "title": "Parasaurolophus",
        "titleEs": "Parasaurolophus",
        "description": "The unique Parasaurolophus with its distinctive head crest! This duck-billed dinosaur could make trumpet-like sounds.",
        "descriptionEs": "¡El único Parasaurolophus con su distintiva cresta en la cabeza! Este dinosaurio de pico de pato podía hacer sonidos como trompeta.",
        "category": "Dinosaurs",
        "difficulty": 2,
        "tags": "parasaurolophus,dinosaur,prehistoric,herbivore,duck-billed,crest,cretaceous",
        "imageUrl": "/coloring-images/parasaurolophus.png",
        "thumbnailUrl": "/coloring-images/parasaurolophus.png",
        "featured": False
    }
]

def add_painting(painting):
    """Add a painting to production"""
    try:
        response = requests.post(
            f"{PROD_API}/paintings",
            json=painting,
            headers={'Content-Type': 'application/json'},
            timeout=10
        )
        
        if response.status_code in [200, 201]:
            result = response.json()
            return True, result.get('title', painting['title'])
        else:
            return False, f"HTTP {response.status_code}: {response.text[:100]}"
    except Exception as e:
        return False, str(e)

def main():
    print("=" * 80)
    print("🦕 Adding 9 Dinosaur Coloring Pages to Production")
    print("=" * 80)
    print()
    print("Category: Dinosaurs")
    print("Total: 9 dinosaurs with full Spanish translations")
    print()
    
    # Ask for confirmation
    response = input("Add all 9 dinosaurs to production? (yes/no): ")
    if response.lower() not in ['yes', 'y']:
        print("❌ Cancelled")
        return
    
    print()
    print("=" * 80)
    print("🚀 Adding dinosaurs...")
    print("=" * 80)
    print()
    
    success_count = 0
    failed_count = 0
    failed_dinos = []
    
    for i, dino in enumerate(dinosaurs, 1):
        title = dino['title']
        title_es = dino['titleEs']
        
        print(f"[{i}/9] Adding: {title} / {title_es}")
        
        success, result = add_painting(dino)
        
        if success:
            print(f"  ✅ Success!")
            success_count += 1
        else:
            print(f"  ❌ Failed: {result}")
            failed_count += 1
            failed_dinos.append(title)
        
        # Small delay to avoid overwhelming the API
        time.sleep(0.5)
    
    print()
    print("=" * 80)
    print("✨ Dinosaur Addition Complete!")
    print("=" * 80)
    print(f"✅ Successfully added: {success_count}/9")
    print(f"❌ Failed: {failed_count}/9")
    
    if failed_dinos:
        print()
        print("Failed dinosaurs:")
        for dino in failed_dinos:
            print(f"  - {dino}")
    
    if success_count > 0:
        print()
        print("🦖 Dinosaurs are now live in production!")
        print("   Category: Dinosaurs")
        print("   Visit: https://painting-sand.vercel.app/category/Dinosaurs")
        print("   Spanish: https://painting-sand.vercel.app/es/category/Dinosaurs")

if __name__ == "__main__":
    main()



