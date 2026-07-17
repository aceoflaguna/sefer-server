UPDATE ASV_verses
SET text = REPLACE(
    REPLACE(text, 'JEHOVAH', 'YHWH'),
    'Jehovah',
    'YHWH'
)
WHERE text LIKE '%JEHOVAH%'
   OR text LIKE '%Jehovah%';

COMMIT;



SELECT id, book_id, chapter, verse, "text"
FROM ASV_verses
WHERE id=1604;