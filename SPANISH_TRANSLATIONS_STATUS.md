# Spanish Translations Status

## Summary
Adding Spanish translations to all 47 new paintings that were recently added.

## Paintings Needing Spanish Translations

### Holidays (5)
- ✅ hanuka-menorah → Menorá de Hanukkah
- ✅ christmas-socks → Calcetines de Navidad  
- ✅ rudolph-the-reindeer → Rodolfo el Reno
- ✅ santa-claus → Papá Noel
- ✅ christmas-tree → Árbol de Navidad

### Sports (4)
- ⚠️ surfer → Surfista
- ⚠️ basketball-player → Jugador de Baloncesto
- ⚠️ karate → Niño de Karate
- ⚠️ soccer-player → Jugador de Fútbol

### Animals (9)
- ⚠️ crokodile → Cocodrilo
- ⚠️ cute-hamster → Hámster Lindo
- ⚠️ lion-cub → Cachorro de León
- ⚠️ cute-bat → Murciélago Lindo
- ⚠️ cute-bear → Oso Lindo
- ⚠️ cute-elephant → Elefante Lindo
- ⚠️ flying-kuala → Koala Volador
- ⚠️ koala-love → Koala Amor
- ⚠️ squirrel → Ardilla

### Characters (14)
- ⚠️ clown → Payaso Feliz
- ⚠️ girl-playing-guitar → Niña Tocando Guitarra
- ⚠️ princess-in-the-wood → Princesa en el Bosque
- ⚠️ queen → Reina Real
- ⚠️ little-princess → Princesita
- ⚠️ astronaut → Astronauta
- ⚠️ cute-scarecrow → Espantapájaros Lindo
- ⚠️ student → Estudiante
- ⚠️ toy-builder → Constructor de Juguetes
- ⚠️ wizzard → Mago
- ⚠️ witch-hat → Sombrero de Bruja
- ⚠️ taylor-swift → Cantante Pop Star
- ⚠️ spider-man → Héroe Araña
- ⚠️ friendly-icecream → Helado Amigable

### Fantasy (6)
- ⚠️ unicorn → Unicornio Mágico
- ⚠️ fairy → Hada del Jardín
- ⚠️ fairy-butterfly → Hada Mariposa
- ⚠️ fairy-on-a-flower → Hada en una Flor
- ⚠️ super-dino → Super Dinosaurio
- ⚠️ mushroom-house → Casa de Hongos

### Mandalas (6) - Currently in Animals, need to move
- ⚠️ bird-mandala → Mandala de Pájaro
- ⚠️ elephant-mandala → Mandala de Elefante
- ⚠️ lion-mandala → Mandala de León
- ⚠️ tiger-mandala → Mandala de Tigre
- ⚠️ owl-mandala → Mandala de Búho
- ⚠️ meduza-mandala → Mandala de Medusa

### Nature (1)
- ⚠️ bonsai → Árbol Bonsái

---

## Quick Fix Commands

Run this in terminal to update all at once (from `/Users/guym/Documents/d/paiting`):

```bash
cd /Users/guym/Documents/d/paiting/tools
chmod +x fix_all_spanish_translations.sh
bash fix_all_spanish_translations.sh
```

This will:
1. Read translations from `all_new_paintings.json`
2. Update each painting via PUT API
3. Report success/failure for each

---

## Manual Verification

After running the script, verify with:

```bash
# Check how many are still missing
curl -s "http://localhost:8080/api/paintings?size=200" | jq '[.content[] | select(.titleEs == null)] | length'

# List which ones are missing
curl -s "http://localhost:8080/api/paintings?size=200" | jq -r '.content[] | select(.titleEs == null) | "- \(.urlKey)"'
```

---

## After Fix

1. Restart backend (to clear cache)
2. Refresh browser (Cmd+Shift+R)
3. Switch to Spanish (ES) and verify translations appear


