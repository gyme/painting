#!/bin/bash

echo "🐘 Setting up Local PostgreSQL Database"
echo "========================================"
echo ""

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "PostgreSQL not found. Installing via Homebrew..."
    if ! command -v brew &> /dev/null; then
        echo "❌ Homebrew not installed. Please install it first:"
        echo "   /bin/bash -c \"\$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\""
        exit 1
    fi
    brew install postgresql@14
    brew services start postgresql@14
    sleep 5
fi

# Create database and user
echo "1. Creating database and user..."
psql postgres << EOF
-- Drop if exists
DROP DATABASE IF EXISTS painting_db;
DROP USER IF EXISTS paintingadmin;

-- Create user
CREATE USER paintingadmin WITH PASSWORD 'painting123';

-- Create database
CREATE DATABASE painting_db OWNER paintingadmin;

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE painting_db TO paintingadmin;

\c painting_db
GRANT ALL ON SCHEMA public TO paintingadmin;
EOF

echo "   ✅ Database 'painting_db' created"
echo "   ✅ User 'paintingadmin' created"

echo ""
echo "2. Setting up environment..."
# Create .env file for backend
cd /Users/guym/Documents/d/paiting/backend
cat > .env << 'EOF'
DATABASE_URL=postgresql://paintingadmin:painting123@localhost:5432/painting_db
EOF
echo "   ✅ .env file created"

echo ""
echo "3. Stopping current backend..."
pkill -f "spring-boot:run"
sleep 3

echo ""
echo "4. Starting backend with PostgreSQL..."
export DATABASE_URL=postgresql://paintingadmin:painting123@localhost:5432/painting_db
./start-backend.sh > postgres-startup.log 2>&1 &
BACKEND_PID=$!
echo "   Backend PID: $BACKEND_PID"

echo ""
echo "5. Waiting for backend to create tables..."
for i in {1..30}; do
    if curl -s 'http://localhost:8080/api/paintings?page=0&size=1' > /dev/null 2>&1; then
        echo "   ✅ Backend is UP!"
        break
    fi
    echo "   Waiting... ($i/30)"
    sleep 2
done

echo ""
echo "6. Importing all your paintings..."
export PGPASSWORD=painting123
psql -h localhost -U paintingadmin -d painting_db -f all-paintings-import.sql 2>&1 | grep -i "insert\|error" | head -10

# Count paintings
PAINTING_COUNT=$(curl -s 'http://localhost:8080/api/paintings?page=0&size=1000' | jq '.totalElements' 2>/dev/null)

echo ""
echo "========================================"
echo "✅ PostgreSQL Setup Complete!"
echo "========================================"
echo ""
echo "Database: painting_db"
echo "User: paintingadmin"
echo "Password: painting123"
echo "Total Paintings: $PAINTING_COUNT"
echo ""
echo "Your data will now persist across restarts! 🎉"
echo ""
echo "Next steps:"
echo "  1. Start admin tool: cd .. && ./serve-admin-tool.sh"
echo "  2. Open: http://localhost:8081/admin-tool.html"
echo ""
echo "To start backend in the future:"
echo "  cd backend"
echo "  export DATABASE_URL=postgresql://paintingadmin:painting123@localhost:5432/painting_db"
echo "  ./start-backend.sh"
echo ""

