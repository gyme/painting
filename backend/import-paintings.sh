#!/bin/bash

echo "📥 Importing Real Paintings Data..."
echo "===================================="
echo ""

# Wait a bit to ensure backend is ready
sleep 2

# Use curl to get all existing paintings and delete sample data
echo "1. Cleaning sample data..."
curl -s 'http://localhost:8080/api/paintings?page=0&size=1000' | \
  jq -r '.content[] | select(.tags | contains("sample")) | .id' | \
  while read id; do
    echo "   Deleting sample painting ID: $id"
    curl -s -X DELETE "http://localhost:8080/api/paintings/$id" > /dev/null
  done

echo ""
echo "2. Importing paintings from SQL files..."
echo ""

# Connect to H2 and run SQL files
DB_URL="jdbc:h2:file:./painting"
DB_USER="sa"
DB_PASS=""

# Find H2 jar in Maven repository
H2_JAR=$(find ~/.m2/repository/com/h2database/h2 -name "h2-*.jar" | head -1)

if [ -z "$H2_JAR" ]; then
    echo "❌ H2 jar not found. Trying alternative method..."
    echo ""
    echo "Please run these SQL files manually in H2 Console:"
    echo "  1. Open: http://localhost:8080/api/h2-console"
    echo "  2. JDBC URL: jdbc:h2:file:./painting"
    echo "  3. Username: sa"
    echo "  4. Password: (leave empty)"
    echo "  5. Run the SQL from these files:"
    echo "     - add-new-paintings.sql"
    echo "     - add-mandala-paintings.sql"
    echo "     - add-famous-characters.sql"
    exit 1
fi

echo "Using H2 jar: $H2_JAR"
echo ""

# Import each SQL file
for sql_file in add-new-paintings.sql add-mandala-paintings.sql add-famous-characters.sql; do
    if [ -f "$sql_file" ]; then
        echo "   Importing $sql_file..."
        java -cp "$H2_JAR" org.h2.tools.RunScript \
            -url "$DB_URL" \
            -user "$DB_USER" \
            -password "$DB_PASS" \
            -script "$sql_file" \
            -showResults
        echo "   ✅ $sql_file imported"
    fi
done

echo ""
echo "===================================="
echo "✅ Import Complete!"
echo "===================================="
echo ""
echo "Refresh your admin tool to see all paintings!"

