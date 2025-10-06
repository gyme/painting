#!/bin/bash

# 🚀 Quick Deployment Script for Hostinger VPS
# This script helps you package and deploy your coloring app

set -e  # Exit on error

echo "🎨 Coloring App - Hostinger Deployment Helper"
echo "=============================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Get VPS IP
echo -e "${BLUE}Step 1: VPS Configuration${NC}"
read -p "Enter your Hostinger VPS IP address: " VPS_IP

if [ -z "$VPS_IP" ]; then
    echo "❌ VPS IP is required!"
    exit 1
fi

echo ""
echo -e "${BLUE}Step 2: Building Frontend${NC}"
cd frontend

# Update API URL
echo "VITE_API_URL=http://$VPS_IP:8080/api" > .env
echo "✅ Updated API URL to: http://$VPS_IP:8080/api"

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    npm install
fi

# Build
echo "🔨 Building frontend..."
npm run build
echo "✅ Frontend build complete!"

cd ..

echo ""
echo -e "${BLUE}Step 3: Building Backend${NC}"
cd backend

# Build backend
if [ ! -d "target" ]; then
    echo "🔨 Building backend..."
    mvn clean package -DskipTests
    echo "✅ Backend build complete!"
else
    echo "⚠️  Backend already built. Rebuilding..."
    mvn clean package -DskipTests
    echo "✅ Backend rebuild complete!"
fi

cd ..

echo ""
echo -e "${BLUE}Step 4: Creating Deployment Package${NC}"

# Create deployment directory
DEPLOY_DIR="deploy_$(date +%Y%m%d_%H%M%S)"
mkdir -p "$DEPLOY_DIR"

# Copy necessary files
echo "📦 Packaging files..."

# Backend
mkdir -p "$DEPLOY_DIR/backend/target"
cp backend/target/kids-painting-backend-1.0.0.jar "$DEPLOY_DIR/backend/target/"
cp -r backend/src "$DEPLOY_DIR/backend/"

# Frontend
mkdir -p "$DEPLOY_DIR/frontend"
cp -r frontend/dist "$DEPLOY_DIR/frontend/"
cp -r frontend/public/coloring-images "$DEPLOY_DIR/frontend/"

# Tools
mkdir -p "$DEPLOY_DIR/tools"
cp tools/bulk-import-paintings.js "$DEPLOY_DIR/tools/"
cp tools/cleanup-database.js "$DEPLOY_DIR/tools/"

# Create config files
mkdir -p "$DEPLOY_DIR/config"

# Create application.yml
cat > "$DEPLOY_DIR/config/application.yml" << EOF
server:
  port: 8080
  
spring:
  application:
    name: kids-painting-backend
  
  datasource:
    url: jdbc:postgresql://localhost:5432/coloring_app
    username: coloring_user
    password: CHANGE_THIS_PASSWORD
    driver-class-name: org.postgresql.Driver
    
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: false
    properties:
      hibernate:
        dialect: org.hibernate.dialect.PostgreSQLDialect
        format_sql: true
    
  servlet:
    multipart:
      max-file-size: 10MB
      max-request-size: 10MB

logging:
  level:
    root: INFO
    com.painting: INFO
EOF

# Create nginx config
cat > "$DEPLOY_DIR/config/nginx-coloring-app" << EOF
server {
    listen 80;
    server_name $VPS_IP;

    # Frontend - React App
    location / {
        root /var/www/coloring-app/frontend/dist;
        index index.html;
        try_files \$uri \$uri/ /index.html;
    }

    # Backend API
    location /api/ {
        proxy_pass http://localhost:8080/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    # Coloring images
    location /coloring-images/ {
        alias /var/www/coloring-app/frontend/coloring-images/;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
EOF

# Create systemd service
cat > "$DEPLOY_DIR/config/coloring-backend.service" << EOF
[Unit]
Description=Coloring App Backend
After=syslog.target network.target postgresql.service

[Service]
User=root
WorkingDirectory=/var/www/coloring-app/backend
ExecStart=/usr/bin/java -jar /var/www/coloring-app/backend/target/kids-painting-backend-1.0.0.jar
SuccessExitStatus=143
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

# Create deployment script for VPS
cat > "$DEPLOY_DIR/install.sh" << 'EOF'
#!/bin/bash

echo "🚀 Installing Coloring App on VPS..."

# Create app directory
mkdir -p /var/www/coloring-app
cd /var/www/coloring-app

# Copy files
cp -r backend frontend tools /var/www/coloring-app/

# Update application.yml
echo ""
echo "⚙️  Configuring backend..."
read -p "Enter PostgreSQL password for coloring_user: " DB_PASSWORD
sed -i "s/CHANGE_THIS_PASSWORD/$DB_PASSWORD/g" backend/src/main/resources/application.yml

# Install backend service
cp config/coloring-backend.service /etc/systemd/system/
systemctl daemon-reload
systemctl start coloring-backend
systemctl enable coloring-backend

# Configure Nginx
cp config/nginx-coloring-app /etc/nginx/sites-available/coloring-app
ln -sf /etc/nginx/sites-available/coloring-app /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl restart nginx

echo ""
echo "✅ Installation complete!"
echo ""
echo "📋 Next steps:"
echo "1. Import images to database:"
echo "   cd /var/www/coloring-app/tools"
echo "   npm install axios"
echo "   node bulk-import-paintings.js ../frontend/coloring-images --skip-existing"
echo ""
echo "2. Check status:"
echo "   systemctl status coloring-backend"
echo "   systemctl status nginx"
echo ""
echo "3. Visit your website at: http://$(hostname -I | awk '{print $1}')"
EOF

chmod +x "$DEPLOY_DIR/install.sh"

# Create compressed archive
echo "📦 Creating archive..."
tar -czf "$DEPLOY_DIR.tar.gz" "$DEPLOY_DIR"
echo "✅ Archive created: $DEPLOY_DIR.tar.gz"

# Clean up
rm -rf "$DEPLOY_DIR"

echo ""
echo -e "${GREEN}✅ Deployment package ready!${NC}"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${YELLOW}📤 Next Steps:${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1️⃣  Upload to your VPS:"
echo "   scp $DEPLOY_DIR.tar.gz root@$VPS_IP:/root/"
echo ""
echo "2️⃣  SSH into your VPS:"
echo "   ssh root@$VPS_IP"
echo ""
echo "3️⃣  Extract and install:"
echo "   cd /root"
echo "   tar -xzf $DEPLOY_DIR.tar.gz"
echo "   cd $DEPLOY_DIR"
echo "   bash install.sh"
echo ""
echo "4️⃣  Visit your website:"
echo "   http://$VPS_IP"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📖 For detailed instructions, see: HOSTINGER_DEPLOYMENT_GUIDE.md"
echo ""
