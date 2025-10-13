#!/bin/bash

echo "Waiting for backend to start..."
sleep 15

echo ""
echo "🎨 Populating database with real paintings..."
echo ""

# Connect to H2 database and run SQL files
java -cp ~/.m2/repository/com/h2database/h2/2.2.224/h2-2.2.224.jar org.h2.tools.RunScript \
  -url "jdbc:h2:file:./painting" \
  -user sa \
  -password "" \
  -script add-new-paintings.sql

echo ""
echo "✅ Database populated!"
echo "You can now use the admin tool at: http://localhost:8081/admin-tool.html"

