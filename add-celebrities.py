#!/usr/bin/env python3
"""
Add Celebrity coloring pages to the database via REST API
"""

import requests
import json

# API endpoint
API_URL = "https://docker-composeyaml-production.up.railway.app/api"

# Celebrity data with Spanish translations
celebrities = [
    {
        "urlKey": "beyonce",
        "name": "Beyoncé",
        "nameSpanish": "Beyoncé",
        "description": "Color this amazing portrait of Beyoncé, the queen of pop music!",
        "descriptionSpanish": "¡Colorea este increíble retrato de Beyoncé, la reina de la música pop!",
        "category": "celebrities",
        "imagePath": "/coloring-images/beyonce.png"
    },
    {
        "urlKey": "zendaya",
        "name": "Zendaya",
        "nameSpanish": "Zendaya",
        "description": "Color this beautiful portrait of actress and singer Zendaya!",
        "descriptionSpanish": "¡Colorea este hermoso retrato de la actriz y cantante Zendaya!",
        "category": "celebrities",
        "imagePath": "/coloring-images/zendaya.png"
    },
    {
        "urlKey": "taylor-swift",
        "name": "Taylor Swift",
        "nameSpanish": "Taylor Swift",
        "description": "Color this portrait of pop superstar Taylor Swift!",
        "descriptionSpanish": "¡Colorea este retrato de la superestrella del pop Taylor Swift!",
        "category": "celebrities",
        "imagePath": "/coloring-images/taylor_swift.png"
    },
    {
        "urlKey": "ariana-grande",
        "name": "Ariana Grande",
        "nameSpanish": "Ariana Grande",
        "description": "Color this fun portrait of singer Ariana Grande!",
        "descriptionSpanish": "¡Colorea este divertido retrato de la cantante Ariana Grande!",
        "category": "celebrities",
        "imagePath": "/coloring-images/ariana_grande.png"
    },
    {
        "urlKey": "dwayne-johnson",
        "name": "Dwayne 'The Rock' Johnson",
        "nameSpanish": "Dwayne 'La Roca' Johnson",
        "description": "Color this powerful portrait of action star Dwayne 'The Rock' Johnson!",
        "descriptionSpanish": "¡Colorea este poderoso retrato de la estrella de acción Dwayne 'La Roca' Johnson!",
        "category": "celebrities",
        "imagePath": "/coloring-images/dwayne_johnson.png"
    },
    {
        "urlKey": "brad-pitt",
        "name": "Brad Pitt",
        "nameSpanish": "Brad Pitt",
        "description": "Color this portrait of legendary actor Brad Pitt!",
        "descriptionSpanish": "¡Colorea este retrato del legendario actor Brad Pitt!",
        "category": "celebrities",
        "imagePath": "/coloring-images/brad_pitt.png"
    },
    {
        "urlKey": "leonardo-dicaprio",
        "name": "Leonardo DiCaprio",
        "nameSpanish": "Leonardo DiCaprio",
        "description": "Color this portrait of Oscar-winning actor Leonardo DiCaprio!",
        "descriptionSpanish": "¡Colorea este retrato del actor ganador del Oscar Leonardo DiCaprio!",
        "category": "celebrities",
        "imagePath": "/coloring-images/leonardo_dicaprio.png"
    },
    {
        "urlKey": "robert-downey-jr",
        "name": "Robert Downey Jr.",
        "nameSpanish": "Robert Downey Jr.",
        "description": "Color this portrait of Iron Man star Robert Downey Jr.!",
        "descriptionSpanish": "¡Colorea este retrato de la estrella de Iron Man, Robert Downey Jr.!",
        "category": "celebrities",
        "imagePath": "/coloring-images/robert_downey_jr.png"
    },
    {
        "urlKey": "tom-cruise",
        "name": "Tom Cruise",
        "nameSpanish": "Tom Cruise",
        "description": "Color this exciting portrait of action star Tom Cruise!",
        "descriptionSpanish": "¡Colorea este emocionante retrato de la estrella de acción Tom Cruise!",
        "category": "celebrities",
        "imagePath": "/coloring-images/tom_cruise.png"
    },
    {
        "urlKey": "adele",
        "name": "Adele",
        "nameSpanish": "Adele",
        "description": "Color this beautiful portrait of Grammy-winning singer Adele!",
        "descriptionSpanish": "¡Colorea este hermoso retrato de la cantante ganadora del Grammy, Adele!",
        "category": "celebrities",
        "imagePath": "/coloring-images/adele.png"
    },
    {
        "urlKey": "chris-evans",
        "name": "Chris Evans",
        "nameSpanish": "Chris Evans",
        "description": "Color this heroic portrait of Captain America star Chris Evans!",
        "descriptionSpanish": "¡Colorea este heroico retrato de la estrella de Capitán América, Chris Evans!",
        "category": "celebrities",
        "imagePath": "/coloring-images/chris_evans.png"
    },
    {
        "urlKey": "arnold-schwarzenegger",
        "name": "Arnold Schwarzenegger",
        "nameSpanish": "Arnold Schwarzenegger",
        "description": "Color this powerful portrait of action legend Arnold Schwarzenegger!",
        "descriptionSpanish": "¡Colorea este poderoso retrato de la leyenda de acción Arnold Schwarzenegger!",
        "category": "celebrities",
        "imagePath": "/coloring-images/arnold_schwarzeneegger.png"
    },
    {
        "urlKey": "jim-carrey",
        "name": "Jim Carrey",
        "nameSpanish": "Jim Carrey",
        "description": "Color this funny portrait of comedian Jim Carrey!",
        "descriptionSpanish": "¡Colorea este divertido retrato del comediante Jim Carrey!",
        "category": "celebrities",
        "imagePath": "/coloring-images/jim_carrey.png"
    },
    {
        "urlKey": "hugh-jackman",
        "name": "Hugh Jackman",
        "nameSpanish": "Hugh Jackman",
        "description": "Color this amazing portrait of Wolverine star Hugh Jackman!",
        "descriptionSpanish": "¡Colorea este increíble retrato de la estrella de Wolverine, Hugh Jackman!",
        "category": "celebrities",
        "imagePath": "/coloring-images/hugh_jackman.png"
    },
    {
        "urlKey": "sylvester-stallone",
        "name": "Sylvester Stallone",
        "nameSpanish": "Sylvester Stallone",
        "description": "Color this powerful portrait of Rocky star Sylvester Stallone!",
        "descriptionSpanish": "¡Colorea este poderoso retrato de la estrella de Rocky, Sylvester Stallone!",
        "category": "celebrities",
        "imagePath": "/coloring-images/sylvester_stallone.png"
    },
    {
        "urlKey": "morgan-freeman",
        "name": "Morgan Freeman",
        "nameSpanish": "Morgan Freeman",
        "description": "Color this distinguished portrait of legendary actor Morgan Freeman!",
        "descriptionSpanish": "¡Colorea este distinguido retrato del legendario actor Morgan Freeman!",
        "category": "celebrities",
        "imagePath": "/coloring-images/morgan_freeman.png"
    },
    {
        "urlKey": "will-smith",
        "name": "Will Smith",
        "nameSpanish": "Will Smith",
        "description": "Color this fun portrait of actor and rapper Will Smith!",
        "descriptionSpanish": "¡Colorea este divertido retrato del actor y rapero Will Smith!",
        "category": "celebrities",
        "imagePath": "/coloring-images/will_smith.png"
    },
    {
        "urlKey": "cameron-diaz",
        "name": "Cameron Diaz",
        "nameSpanish": "Cameron Diaz",
        "description": "Color this beautiful portrait of actress Cameron Diaz!",
        "descriptionSpanish": "¡Colorea este hermoso retrato de la actriz Cameron Diaz!",
        "category": "celebrities",
        "imagePath": "/coloring-images/cameron_diaz.png"
    },
    {
        "urlKey": "george-clooney",
        "name": "George Clooney",
        "nameSpanish": "George Clooney",
        "description": "Color this portrait of Hollywood star George Clooney!",
        "descriptionSpanish": "¡Colorea este retrato de la estrella de Hollywood George Clooney!",
        "category": "celebrities",
        "imagePath": "/coloring-images/george_clooney.png"
    },
    {
        "urlKey": "harrison-ford",
        "name": "Harrison Ford",
        "nameSpanish": "Harrison Ford",
        "description": "Color this portrait of Star Wars and Indiana Jones legend Harrison Ford!",
        "descriptionSpanish": "¡Colorea este retrato de la leyenda de Star Wars e Indiana Jones, Harrison Ford!",
        "category": "celebrities",
        "imagePath": "/coloring-images/harrison_ford.png"
    },
    {
        "urlKey": "keanu-reeves",
        "name": "Keanu Reeves",
        "nameSpanish": "Keanu Reeves",
        "description": "Color this portrait of Matrix star Keanu Reeves!",
        "descriptionSpanish": "¡Colorea este retrato de la estrella de Matrix, Keanu Reeves!",
        "category": "celebrities",
        "imagePath": "/coloring-images/keanu_reeves.png"
    },
    {
        "urlKey": "angelina-jolie",
        "name": "Angelina Jolie",
        "nameSpanish": "Angelina Jolie",
        "description": "Color this stunning portrait of actress Angelina Jolie!",
        "descriptionSpanish": "¡Colorea este impresionante retrato de la actriz Angelina Jolie!",
        "category": "celebrities",
        "imagePath": "/coloring-images/angelina_jolie.png"
    },
    {
        "urlKey": "jackie-chan",
        "name": "Jackie Chan",
        "nameSpanish": "Jackie Chan",
        "description": "Color this action-packed portrait of martial arts legend Jackie Chan!",
        "descriptionSpanish": "¡Colorea este retrato lleno de acción de la leyenda de artes marciales Jackie Chan!",
        "category": "celebrities",
        "imagePath": "/coloring-images/jackie_chan.png"
    },
    {
        "urlKey": "adam-sandler",
        "name": "Adam Sandler",
        "nameSpanish": "Adam Sandler",
        "description": "Color this fun portrait of comedian Adam Sandler!",
        "descriptionSpanish": "¡Colorea este divertido retrato del comediante Adam Sandler!",
        "category": "celebrities",
        "imagePath": "/coloring-images/adam_sandler.png"
    },
    {
        "urlKey": "rihanna",
        "name": "Rihanna",
        "nameSpanish": "Rihanna",
        "description": "Color this stunning portrait of singer and businesswoman Rihanna!",
        "descriptionSpanish": "¡Colorea este impresionante retrato de la cantante y empresaria Rihanna!",
        "category": "celebrities",
        "imagePath": "/coloring-images/rihana.png"
    },
    {
        "urlKey": "justin-bieber",
        "name": "Justin Bieber",
        "nameSpanish": "Justin Bieber",
        "description": "Color this cool portrait of pop star Justin Bieber!",
        "descriptionSpanish": "¡Colorea este genial retrato de la estrella del pop Justin Bieber!",
        "category": "celebrities",
        "imagePath": "/coloring-images/justin_bieber.png"
    },
    {
        "urlKey": "robert-de-niro",
        "name": "Robert De Niro",
        "nameSpanish": "Robert De Niro",
        "description": "Color this portrait of legendary actor Robert De Niro!",
        "descriptionSpanish": "¡Colorea este retrato del legendario actor Robert De Niro!",
        "category": "celebrities",
        "imagePath": "/coloring-images/robert_de_niro.png"
    }
]

def add_painting(painting):
    """Add a painting to the database"""
    try:
        data = {
            "urlKey": painting["urlKey"],
            "title": painting["name"],
            "titleEs": painting["nameSpanish"],
            "description": painting["description"],
            "descriptionEs": painting["descriptionSpanish"],
            "category": painting["category"],
            "imageUrl": painting["imagePath"],
            "thumbnailUrl": painting["imagePath"],
            "difficulty": 3,
            "featured": False,
            "viewCount": 0,
            "tags": "celebrity,famous,star,actor,singer,entertainment"
        }
        
        response = requests.post(
            f"{API_URL}/paintings",
            json=data,
            headers={"Content-Type": "application/json"}
        )
        
        if response.status_code in [200, 201]:
            print(f"✅ Added {painting['name']}")
            return True
        else:
            print(f"❌ Failed to add {painting['name']}: HTTP {response.status_code}")
            print(f"   Response: {response.text}")
            return False
    except Exception as e:
        print(f"❌ Failed to add {painting['name']}: {str(e)}")
        return False

def main():
    print("🎬 Adding Celebrity Coloring Pages")
    print("=" * 60)
    
    success_count = 0
    fail_count = 0
    
    for celebrity in celebrities:
        if add_painting(celebrity):
            success_count += 1
        else:
            fail_count += 1
    
    print("=" * 60)
    print(f"✅ Successfully added: {success_count}")
    print(f"❌ Failed: {fail_count}")
    print(f"📊 Total: {len(celebrities)}")

if __name__ == "__main__":
    main()

