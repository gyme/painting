#!/usr/bin/env python3
"""
Add Italian Brainrot paintings to local H2 database via REST API
"""

import requests
import json

API_URL = "http://localhost:8080/api"

paintings = [
    {
        "urlKey": "brr-brr-patapim",
        "title": "Brr Brr Patapim",
        "description": "A fun Italian meme phrase - brr brr patapim! Perfect for creative coloring!",
        "titleEs": "¡Brr Brr Patapim!",
        "descriptionEs": "¡Una divertida frase meme italiana - brr brr patapim! ¡Perfecta para colorear creativamente!",
        "category": "Italian Brainrot",
        "tags": "italian,meme,brainrot,fun,viral,trending,humor,kids,teen",
        "imageUrl": "/coloring-images/brr_brr_patapim.png",
        "thumbnailUrl": "/coloring-images/brr_brr_patapim.png",
        "difficulty": 2,
        "colorPalette": json.dumps(["#FF6B6B","#4ECDC4","#45B7D1","#FFA07A","#98D8C8"]),
        "featured": True,
        "viewCount": 0
    },
    {
        "urlKey": "cappuccino-assassino",
        "title": "Cappuccino Assassino",
        "description": "The legendary cappuccino assassino! A funny Italian meme for creative kids!",
        "titleEs": "Cappuccino Asesino",
        "descriptionEs": "¡El legendario cappuccino assassino! ¡Un divertido meme italiano para niños creativos!",
        "category": "Italian Brainrot",
        "tags": "italian,meme,brainrot,cappuccino,coffee,humor,viral,trending,kids,teen",
        "imageUrl": "/coloring-images/cappuccino_assassino.png",
        "thumbnailUrl": "/coloring-images/cappuccino_assassino.png",
        "difficulty": 2,
        "colorPalette": json.dumps(["#6F4E37","#D2691E","#F5DEB3","#FFE4C4","#8B4513"]),
        "featured": True,
        "viewCount": 0
    },
    {
        "urlKey": "capuchina-ballerina",
        "title": "Capuchina Ballerina",
        "description": "A dancing capuchina ballerina! A whimsical Italian meme character!",
        "titleEs": "Capuchina Bailarina",
        "descriptionEs": "¡Una bailarina capuchina danzante! ¡Un caprichoso personaje de meme italiano!",
        "category": "Italian Brainrot",
        "tags": "italian,meme,brainrot,ballerina,dance,humor,viral,trending,kids,teen",
        "imageUrl": "/coloring-images/capuchina_ballerina.png",
        "thumbnailUrl": "/coloring-images/capuchina_ballerina.png",
        "difficulty": 2,
        "colorPalette": json.dumps(["#FF69B4","#FFB6C1","#FF1493","#DDA0DD","#FFC0CB"]),
        "featured": False,
        "viewCount": 0
    },
    {
        "urlKey": "chimpanzini-bananini",
        "title": "Chimpanzini Bananini",
        "description": "Chimpanzini bananini! A funny Italian rhyme meme about monkeys and bananas!",
        "titleEs": "¡Chimpancitos Bananitas!",
        "descriptionEs": "¡Chimpanzini bananini! ¡Una divertida rima de meme italiano sobre monos y plátanos!",
        "category": "Italian Brainrot",
        "tags": "italian,meme,brainrot,monkey,banana,humor,viral,trending,kids,teen",
        "imageUrl": "/coloring-images/chimpanzini_bananini.png",
        "thumbnailUrl": "/coloring-images/chimpanzini_bananini.png",
        "difficulty": 2,
        "colorPalette": json.dumps(["#8B4513","#FFD700","#FFA500","#FFFF00","#D2691E"]),
        "featured": False,
        "viewCount": 0
    },
    {
        "urlKey": "lirili-larila",
        "title": "Lirili Larila",
        "description": "Lirili larila! A catchy Italian meme phrase that everyone loves!",
        "titleEs": "¡Lirili Larila!",
        "descriptionEs": "¡Lirili larila! ¡Una pegadiza frase de meme italiano que todos aman!",
        "category": "Italian Brainrot",
        "tags": "italian,meme,brainrot,music,fun,humor,viral,trending,kids,teen",
        "imageUrl": "/coloring-images/lirili_larila.png",
        "thumbnailUrl": "/coloring-images/lirili_larila.png",
        "difficulty": 2,
        "colorPalette": json.dumps(["#87CEEB","#4682B4","#5F9EA0","#6495ED","#B0E0E6"]),
        "featured": False,
        "viewCount": 0
    },
    {
        "urlKey": "thung-thung-thung-sahur",
        "title": "Thung Thung Thung Sahur",
        "description": "Thung thung thung sahur! A rhythmic Italian meme that makes everyone laugh!",
        "titleEs": "¡Thung Thung Thung Sahur!",
        "descriptionEs": "¡Thung thung thung sahur! ¡Un meme italiano rítmico que hace reír a todos!",
        "category": "Italian Brainrot",
        "tags": "italian,meme,brainrot,rhythm,music,humor,viral,trending,kids,teen",
        "imageUrl": "/coloring-images/thung_thung_thung_sahur.png",
        "thumbnailUrl": "/coloring-images/thung_thung_thung_sahur.png",
        "difficulty": 2,
        "colorPalette": json.dumps(["#FF6347","#FF4500","#FFA500","#FFD700","#FF8C00"]),
        "featured": False,
        "viewCount": 0
    },
    {
        "urlKey": "tralalero-tralala",
        "title": "Tralalero Tralala",
        "description": "Tralalero tralala! A musical Italian meme phrase full of joy and fun!",
        "titleEs": "¡Tralalero Tralala!",
        "descriptionEs": "¡Tralalero tralala! ¡Una frase musical de meme italiano llena de alegría y diversión!",
        "category": "Italian Brainrot",
        "tags": "italian,meme,brainrot,music,singing,humor,viral,trending,kids,teen",
        "imageUrl": "/coloring-images/tralalero_tralala.png",
        "thumbnailUrl": "/coloring-images/tralalero_tralala.png",
        "difficulty": 2,
        "colorPalette": json.dumps(["#9370DB","#8B008B","#BA55D3","#DDA0DD","#EE82EE"]),
        "featured": False,
        "viewCount": 0
    },
    {
        "urlKey": "udin-din-din-dun",
        "title": "Udin Din Din Dun",
        "description": "Udin din din dun! A catchy Italian meme beat that gets stuck in your head!",
        "titleEs": "¡Udin Din Din Dun!",
        "descriptionEs": "¡Udin din din dun! ¡Un pegadizo ritmo de meme italiano que se queda en tu cabeza!",
        "category": "Italian Brainrot",
        "tags": "italian,meme,brainrot,beat,music,humor,viral,trending,kids,teen",
        "imageUrl": "/coloring-images/udin_din_din_dun.png",
        "thumbnailUrl": "/coloring-images/udin_din_din_dun.png",
        "difficulty": 2,
        "colorPalette": json.dumps(["#32CD32","#228B22","#90EE90","#98FB98","#00FF00"]),
        "featured": False,
        "viewCount": 0
    }
]

def main():
    print("🇮🇹 Adding Italian Brainrot Paintings via API...")
    print("=" * 60)
    print()
    
    # Check if backend is running
    try:
        response = requests.get(f"{API_URL}/paintings/categories", timeout=5)
        print("✅ Backend is running")
        print()
        print("📊 Current categories:")
        for cat in response.json():
            print(f"  - {cat}")
        print()
    except requests.exceptions.RequestException as e:
        print(f"❌ Error: Backend not running on port 8080")
        print(f"   {e}")
        return
    
    print("🎨 Adding 8 Italian Brainrot paintings...")
    print()
    
    added = 0
    failed = 0
    
    for painting in paintings:
        print(f"  ➕ Adding: {painting['title']}")
        
        try:
            response = requests.post(
                f"{API_URL}/paintings",
                json=painting,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code in [200, 201]:
                print(f"     ✅ Success")
                added += 1
            else:
                print(f"     ❌ Failed (HTTP {response.status_code})")
                print(f"     {response.text}")
                failed += 1
        except requests.exceptions.RequestException as e:
            print(f"     ❌ Failed: {e}")
            failed += 1
    
    print()
    print("=" * 60)
    print(f"✅ Added: {added} paintings")
    if failed > 0:
        print(f"❌ Failed: {failed} paintings")
    print()
    
    # Verify the new category
    try:
        response = requests.get(f"{API_URL}/paintings/categories", timeout=5)
        print("📊 Updated categories:")
        for cat in response.json():
            print(f"  - {cat}")
        print()
        
        if "Italian Brainrot" in response.json():
            print("🎉 Success! Italian Brainrot category is now available!")
        else:
            print("⚠️  Italian Brainrot category not found. Please check the logs.")
    except requests.exceptions.RequestException:
        pass
    
    print()
    print("🌐 View at: http://localhost:3000")
    print("   (Make sure your frontend is running)")

if __name__ == "__main__":
    main()





