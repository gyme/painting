-- Delete Elephant and Lion Mandala paintings from database
-- Run this on production database to remove the entries

DELETE FROM paintings WHERE url_key = 'elephant-mandala';
DELETE FROM paintings WHERE url_key = 'lion-mandala';

-- Verify deletion
SELECT COUNT(*) as remaining_mandalas FROM paintings WHERE url_key LIKE '%mandala%';

