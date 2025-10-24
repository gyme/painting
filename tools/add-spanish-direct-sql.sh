#!/bin/bash

# Add Spanish translations using direct SQL UPDATE statements

echo "🇪🇸 Adding Spanish translations via SQL UPDATE"
echo "=" 

curl -s -X POST http://localhost:8080/api/paintings > /dev/null 2>&1

# For each food painting, update with Spanish translations
curl -s -X GET "http://localhost:8080/api/paintings/apple" | python3 -c "
import sys, json
try:
    p = json.load(sys.stdin)
    p['titleEs'] = 'Manzana'
    p['descriptionEs'] = '¡Una deliciosa página para colorear de manzana! Perfecta para aprender sobre frutas saludables y nutrición.'
    import http.client, json
    conn = http.client.HTTPConnection('localhost', 8080)
    conn.request('PUT', f'/api/paintings/{p[\"id\"]}', json.dumps(p), {'Content-Type': 'application/json'})
    res = conn.getresponse()
    print(f'Apple: {res.status}')
except Exception as e:
    print(f'Apple: Error - {e}')
"

echo "✅ Done! Check http://localhost:3000/category/food"

