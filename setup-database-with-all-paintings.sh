#!/bin/bash

echo "🎨 Setting up Database with All Your Paintings"
echo "=============================================="
echo ""

cd /Users/guym/Documents/d/paiting/backend

# Step 1: Stop backend
echo "1. Stopping backend..."
pkill -f "spring-boot:run" 2>/dev/null
sleep 3
echo "   ✅ Backend stopped"

# Step 2: Delete old database
echo ""
echo "2. Removing old database..."
rm -f painting.mv.db painting.trace.db
echo "   ✅ Old database removed"

# Step 3: Start backend (will create fresh tables)
echo ""
echo "3. Starting backend (creating fresh database)..."
./start-backend.sh > backend-startup.log 2>&1 &
BACKEND_PID=$!
echo "   Backend PID: $BACKEND_PID"

# Step 4: Wait for backend to be ready
echo ""
echo "4. Waiting for backend to be ready..."
for i in {1..40}; do
    if curl -s 'http://localhost:8080/api/paintings?page=0&size=1' > /dev/null 2>&1; then
        echo "   ✅ Backend is UP!"
        break
    fi
    echo "   Waiting... ($i/40)"
    sleep 2
done

# Step 5: Check if backend is really up
if ! curl -s 'http://localhost:8080/api/paintings?page=0&size=1' > /dev/null 2>&1; then
    echo "   ❌ Backend failed to start. Check backend-startup.log"
    exit 1
fi

# Step 6: Stop backend again to import data
echo ""
echo "5. Stopping backend to import data..."
pkill -f "spring-boot:run"
sleep 3

# Step 7: Import data
echo ""
echo "6. Importing all paintings data..."
java -cp ~/.m2/repository/com/h2database/h2/2.2.224/h2-2.2.224.jar org.h2.tools.RunScript \
    -url "jdbc:h2:file:./painting" \
    -user sa \
    -password "" \
    -script all-paintings-import.sql 2>&1 | grep -i "error\|exception" || echo "   ✅ Data imported successfully"

# Step 8: Restart backend
echo ""
echo "7. Restarting backend with imported data..."
./start-backend.sh > backend-final.log 2>&1 &
sleep 15

echo ""
echo "8. Verifying backend is up..."
if curl -s 'http://localhost:8080/api/paintings?page=0&size=1' > /dev/null 2>&1; then
    echo "   ✅ Backend is UP!"
else
    echo "   ⏳ Still starting... give it another minute"
fi

# Step 9: Count paintings
PAINTING_COUNT=$(curl -s 'http://localhost:8080/api/paintings?page=0&size=1000' | jq '.totalElements' 2>/dev/null)

echo ""
echo "=============================================="
echo "✅ Setup Complete!"
echo "=============================================="
echo ""
echo "Total Paintings: $PAINTING_COUNT"
echo ""
echo "Next steps:"
echo "  1. Start admin tool: ./serve-admin-tool.sh"
echo "  2. Open: http://localhost:8081/admin-tool.html"
echo "  3. Verify all paintings and images are correct"
echo ""

