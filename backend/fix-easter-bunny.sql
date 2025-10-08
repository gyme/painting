-- Fix Easter Bunny image URL to use PNG instead of JPG
UPDATE paintings 
SET imageUrl = '/coloring-images/easter_bunny.png',
    thumbnailUrl = '/coloring-images/easter_bunny.png'
WHERE urlKey = 'easter-bunny';
