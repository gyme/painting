-- Add Spanish translation fields to paintings table
-- Run this SQL on your Railway PostgreSQL database

-- Step 1: Add Spanish columns
ALTER TABLE paintings 
ADD COLUMN IF NOT EXISTS title_es VARCHAR(255),
ADD COLUMN IF NOT EXISTS description_es TEXT;

-- Step 2: Add indexes for Spanish fields (for searching)
CREATE INDEX IF NOT EXISTS idx_paintings_title_es ON paintings(title_es);

-- Step 3: Verify the changes
SELECT 
    column_name, 
    data_type, 
    is_nullable 
FROM information_schema.columns 
WHERE table_name = 'paintings' 
AND column_name IN ('title_es', 'description_es');

-- Step 4: Example: Populate some Spanish translations
-- You can use AI translation or manual translation

-- Example updates (you'll need to do this for all paintings):
UPDATE paintings SET 
    title_es = 'Oficial de Policía',
    description_es = '¡Colorea este increíble oficial de policía! Perfecto para niños creativos.'
WHERE title = 'Police Officer';

UPDATE paintings SET 
    title_es = 'Mago',
    description_es = '¡Un mago mágico de un mundo de fantasía! Deja volar tu imaginación.'
WHERE title = 'Wizard';

UPDATE paintings SET 
    title_es = 'Mandala de Tigre',
    description_es = '¡Una hermosa página para colorear de mandala de tigre! Perfecta para niños que aman los animales.'
WHERE title = 'Tiger Mandala';

UPDATE paintings SET 
    title_es = 'Auto Deportivo',
    description_es = '¡Un emocionante auto deportivo listo para colorear! Genial para niños que aman los vehículos.'
WHERE title = 'Sport Car';

UPDATE paintings SET 
    title_es = 'Estudiante',
    description_es = '¡Colorea este increíble estudiante! Perfecto para niños creativos.'
WHERE title = 'Student';

UPDATE paintings SET 
    title_es = 'León',
    description_es = '¡Una hermosa página para colorear de león! Perfecta para niños que aman los animales.'
WHERE title = 'Lion';

UPDATE paintings SET 
    title_es = 'Hada',
    description_es = '¡Un hada mágica de un mundo de fantasía! Deja volar tu imaginación.'
WHERE title = 'Fairy';

UPDATE paintings SET 
    title_es = 'Navidad Espeluznante',
    description_es = '¡Colorea esta increíble navidad espeluznante! Perfecta para niños creativos.'
WHERE title = 'Spooky Christmas';

-- Step 5: Verify some translations
SELECT 
    id, 
    title, 
    title_es, 
    description, 
    description_es,
    category
FROM paintings 
WHERE title_es IS NOT NULL
LIMIT 10;

-- Step 6: Count how many paintings still need translation
SELECT 
    COUNT(*) as total_paintings,
    COUNT(title_es) as translated_count,
    COUNT(*) - COUNT(title_es) as remaining
FROM paintings;

-- IMPORTANT: After running this migration, you need to:
-- 1. Translate all painting titles and descriptions
-- 2. Update the backend API to return Spanish fields based on language parameter
-- 3. Update the frontend to request Spanish content

COMMIT;

