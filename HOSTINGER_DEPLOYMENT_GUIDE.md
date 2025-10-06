# 🚀 Hostinger Deployment Guide

## 📋 Prerequisites

Your app has:
- **Frontend**: React + Vite (Static files)
- **Backend**: Spring Boot (Java 17) with PostgreSQL
- **Images**: Coloring pages in `frontend/public/coloring-images/`

---

## 🎯 Hostinger Hosting Options

### Option 1: VPS/Cloud Hosting (RECOMMENDED) ✅
**Best for:** Full-stack apps with backend + database
**Cost:** $4-8/month
**What you get:** Full server control, can run Java backend + PostgreSQL

### Option 2: Shared Hosting + External Backend ⚠️
**Best for:** Budget option
**Cost:** $2-4/month (hosting) + free backend (Railway/Render)
**Limitation:** Can only host static files on Hostinger

---

## 🏆 RECOMMENDED: Full Deployment on Hostinger VPS

### Step 1: Set Up Hostinger VPS

1. **Login to Hostinger**
   - Go to: https://hpanel.hostinger.com
   - Navigate to: **VPS** section

2. **Choose a VPS Plan**
   - Minimum: **KVM 1** (1 vCPU, 4GB RAM) - $4.99/month
   - Recommended: **KVM 2** (2 vCPU, 8GB RAM) - $8.99/month

3. **Select Operating System**
   - Choose: **Ubuntu 22.04 LTS**

4. **Get Your VPS Details**
   - IP Address: (e.g., `123.456.78.90`)
   - Root Password: (provided by Hostinger)
   - SSH Port: `22`

---

### Step 2: Connect to Your VPS

```bash
# On your Mac terminal
ssh root@YOUR_VPS_IP
# Enter password when prompted
```

---

### Step 3: Install Required Software

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Java 17
sudo apt install openjdk-17-jdk -y
java -version  # Verify installation

# Install Maven
sudo apt install maven -y
mvn -version  # Verify installation

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
node -v  # Verify installation
npm -v   # Verify installation

# Install PostgreSQL
sudo apt install postgresql postgresql-contrib -y
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Install Nginx (web server)
sudo apt install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx
```

---

### Step 4: Set Up PostgreSQL Database

```bash
# Switch to postgres user
sudo -u postgres psql

# In PostgreSQL prompt, run:
CREATE DATABASE coloring_app;
CREATE USER coloring_user WITH ENCRYPTED PASSWORD 'your_secure_password_here';
GRANT ALL PRIVILEGES ON DATABASE coloring_app TO coloring_user;
\q

# Test connection
psql -U coloring_user -d coloring_app -h localhost
# (Enter password when prompted, then type \q to exit)
```

---

### Step 5: Upload Your Project

**On Your Mac:**

```bash
# Navigate to your project
cd /Users/guym/Documents/d/paiting

# Create a tarball (excluding node_modules and target)
tar --exclude='node_modules' --exclude='target' --exclude='.git' \
    -czf coloring-app.tar.gz backend frontend tools

# Upload to VPS
scp coloring-app.tar.gz root@YOUR_VPS_IP:/root/
```

**On Your VPS:**

```bash
# Extract files
cd /root
tar -xzf coloring-app.tar.gz
mkdir -p /var/www/coloring-app
mv backend frontend tools /var/www/coloring-app/
cd /var/www/coloring-app
```

---

### Step 6: Configure Backend

**Update Backend Configuration:**

```bash
cd /var/www/coloring-app/backend
nano src/main/resources/application.yml
```

**Replace with:**

```yaml
server:
  port: 8080
  
spring:
  application:
    name: kids-painting-backend
  
  datasource:
    url: jdbc:postgresql://localhost:5432/coloring_app
    username: coloring_user
    password: your_secure_password_here
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
```

**Save:** `Ctrl+X`, then `Y`, then `Enter`

---

### Step 7: Build and Run Backend

```bash
cd /var/www/coloring-app/backend

# Build the application
mvn clean package -DskipTests

# Create systemd service for auto-start
sudo nano /etc/systemd/system/coloring-backend.service
```

**Add this content:**

```ini
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
```

**Save and start the service:**

```bash
sudo systemctl daemon-reload
sudo systemctl start coloring-backend
sudo systemctl enable coloring-backend
sudo systemctl status coloring-backend
```

---

### Step 8: Build Frontend

```bash
cd /var/www/coloring-app/frontend

# Install dependencies
npm install

# Update API URL for production
nano src/api/paintings.ts
```

**Change the API_BASE_URL to:**

```typescript
const API_BASE_URL = 'http://YOUR_VPS_IP:8080/api';
```

**Or better, use environment variable:**

```bash
# Create .env file
echo "VITE_API_URL=http://YOUR_VPS_IP:8080/api" > .env

# Update src/api/paintings.ts to use:
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';
```

**Build for production:**

```bash
npm run build
```

This creates a `dist` folder with optimized static files.

---

### Step 9: Configure Nginx

```bash
sudo nano /etc/nginx/sites-available/coloring-app
```

**Add this configuration:**

```nginx
server {
    listen 80;
    server_name YOUR_VPS_IP;  # Replace with your domain or IP

    # Frontend - React App
    location / {
        root /var/www/coloring-app/frontend/dist;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api/ {
        proxy_pass http://localhost:8080/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Coloring images
    location /coloring-images/ {
        alias /var/www/coloring-app/frontend/public/coloring-images/;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
```

**Enable the site:**

```bash
sudo ln -s /etc/nginx/sites-available/coloring-app /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default  # Remove default site
sudo nginx -t  # Test configuration
sudo systemctl restart nginx
```

---

### Step 10: Import Your Coloring Pages to Database

```bash
cd /var/www/coloring-app/tools

# Install Node dependencies
npm install axios

# Import images
node bulk-import-paintings.js ../frontend/public/coloring-images --skip-existing
```

---

### Step 11: Configure Firewall

```bash
# Allow HTTP and HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 22/tcp  # SSH
sudo ufw enable
```

---

### Step 12: Test Your Website! 🎉

Open your browser and go to:
```
http://YOUR_VPS_IP
```

You should see your coloring page website!

---

## 🌐 Optional: Add Custom Domain

### If You Have a Domain (e.g., mycoloringapp.com):

1. **In Hostinger DNS Settings:**
   - Add A Record: `@` → `YOUR_VPS_IP`
   - Add A Record: `www` → `YOUR_VPS_IP`

2. **Update Nginx:**
```bash
sudo nano /etc/nginx/sites-available/coloring-app
# Change: server_name YOUR_VPS_IP;
# To: server_name mycoloringapp.com www.mycoloringapp.com;
sudo systemctl restart nginx
```

3. **Install SSL Certificate (Free with Let's Encrypt):**
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d mycoloringapp.com -d www.mycoloringapp.com
# Follow prompts, enter your email
# Certificate auto-renews!
```

Now your site is at: `https://mycoloringapp.com` 🎊

---

## 🔄 How to Update Your Website

### Update Frontend:

```bash
# On your Mac
cd /Users/guym/Documents/d/paiting/frontend
npm run build
scp -r dist/* root@YOUR_VPS_IP:/var/www/coloring-app/frontend/dist/
```

### Update Backend:

```bash
# On your Mac
cd /Users/guym/Documents/d/paiting/backend
mvn clean package -DskipTests
scp target/kids-painting-backend-1.0.0.jar root@YOUR_VPS_IP:/var/www/coloring-app/backend/target/

# On VPS
sudo systemctl restart coloring-backend
```

### Add New Images:

```bash
# On your Mac
cd /Users/guym/Documents/d/paiting/frontend/public
scp -r coloring-images/* root@YOUR_VPS_IP:/var/www/coloring-app/frontend/public/coloring-images/

# On VPS
cd /var/www/coloring-app/tools
node bulk-import-paintings.js ../frontend/public/coloring-images --skip-existing
```

---

## 🐛 Troubleshooting

### Backend Not Starting:
```bash
sudo systemctl status coloring-backend
sudo journalctl -u coloring-backend -f  # View logs
```

### Can't Connect to Database:
```bash
sudo systemctl status postgresql
psql -U coloring_user -d coloring_app -h localhost
```

### Website Not Loading:
```bash
sudo systemctl status nginx
sudo nginx -t  # Test config
sudo tail -f /var/log/nginx/error.log
```

### Check if Backend is Running:
```bash
curl http://localhost:8080/api/paintings
```

---

## 📊 Monitoring and Maintenance

### View Backend Logs:
```bash
sudo journalctl -u coloring-backend -f
```

### View Nginx Logs:
```bash
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### Restart Services:
```bash
sudo systemctl restart coloring-backend
sudo systemctl restart nginx
sudo systemctl restart postgresql
```

### Check Disk Space:
```bash
df -h
```

### Database Backup:
```bash
pg_dump -U coloring_user -d coloring_app > backup.sql
```

---

## 💡 Cost Estimate

**Hostinger VPS:**
- KVM 1: $4.99/month (good for starting out)
- KVM 2: $8.99/month (better performance)

**Optional Domain:**
- .com domain: ~$12/year

**SSL Certificate:**
- Let's Encrypt: FREE! ✨

**Total:** ~$5-9/month for everything! 🎉

---

## ✅ Quick Checklist

- [ ] Get Hostinger VPS
- [ ] Connect via SSH
- [ ] Install Java, Node.js, PostgreSQL, Nginx
- [ ] Set up database
- [ ] Upload project files
- [ ] Build backend
- [ ] Build frontend
- [ ] Configure Nginx
- [ ] Import images to database
- [ ] Test website
- [ ] (Optional) Add domain + SSL

---

Need help? Check the troubleshooting section or contact Hostinger support!

Good luck with your deployment! 🚀🎨
