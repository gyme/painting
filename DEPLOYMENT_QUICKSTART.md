# 🚀 Quick Deployment Guide - Vercel & Railway

## ⚡ TL;DR - Fast Track Deployment

### Step 1: Install CLIs (One-time setup)
```bash
npm install -g @railway/cli vercel
```

### Step 2: Deploy Backend to Railway
```bash
./deploy-backend-railway.sh
```
**Save the Railway URL!** (e.g., `https://kids-painting-backend-production.up.railway.app`)

### Step 3: Deploy Frontend to Vercel
```bash
./deploy-frontend-vercel.sh
```
Set environment variable:
- Name: `VITE_API_URL`
- Value: `https://your-railway-url.railway.app/api` ⚠️ Don't forget `/api`

### Step 4: Verify
```bash
./verify-deployment.sh
```

---

## 📋 Deployment Checklist

- [ ] Install Railway CLI
- [ ] Install Vercel CLI
- [ ] Deploy backend to Railway
- [ ] Add PostgreSQL to Railway project
- [ ] Get Railway backend URL
- [ ] Deploy frontend to Vercel
- [ ] Set `VITE_API_URL` in Vercel
- [ ] Verify both services are running
- [ ] Initialize database with paintings

---

## 🔧 Manual Deployment

### Backend → Railway
```bash
cd backend
railway login
railway init
railway add          # Select PostgreSQL
railway up
railway domain       # Get your URL
```

### Frontend → Vercel
```bash
cd frontend
vercel login
vercel --prod
vercel env add VITE_API_URL production
# Enter: https://your-backend.railway.app/api
vercel --prod        # Redeploy with env var
```

---

## 🌍 Environment Variables

### Frontend (Vercel)
| Variable | Value | Example |
|----------|-------|---------|
| `VITE_API_URL` | Railway backend URL + `/api` | `https://app.railway.app/api` |

### Backend (Railway)
| Variable | Value | Note |
|----------|-------|------|
| `DATABASE_URL` | Auto-set by Railway | When you add PostgreSQL |
| `CORS_ALLOWED_ORIGINS` | Frontend URL(s) | Optional, currently allows all |

---

## 🔍 Verify Deployment

### Quick Check
```bash
# Test backend
curl https://your-backend.railway.app/api/paintings

# Test frontend (open in browser)
open https://your-app.vercel.app
```

### Full Verification
```bash
./verify-deployment.sh
```

---

## 📊 Monitor Your App

### View Logs
```bash
# Backend logs
cd backend && railway logs

# Frontend logs
cd frontend && vercel logs
```

### Dashboard Links
- Railway: https://railway.app/dashboard
- Vercel: https://vercel.com/dashboard

---

## 🗄️ Initialize Database

After deploying backend:

```bash
cd backend
railway connect postgres
# In psql:
\i init.sql
\i add-new-paintings.sql
```

Or use the populate script:
```bash
cd backend
railway run bash
./populate-database.sh
```

---

## 🔄 Continuous Deployment

Both platforms auto-deploy from Git:

- **Push to main branch** → Auto-deploys
- **Pull requests** → Vercel creates preview deployments
- **Manual deploy**: Use the deployment scripts

---

## 🛠️ Troubleshooting

### Backend won't start
```bash
railway logs
# Check: Java 17, DATABASE_URL set
```

### Frontend can't connect
1. Verify `VITE_API_URL` is set in Vercel
2. Check CORS in backend (already configured to allow all)
3. Test backend directly: `curl https://your-backend.railway.app/api/paintings`

### Database connection failed
```bash
railway connect postgres
# Verify connection works
```

---

## 💰 Pricing

### Railway (Backend + Database)
- **Free**: $5 credit/month
- **After free tier**: ~$5-20/month

### Vercel (Frontend)
- **Free**: Unlimited for personal projects
- **Pro**: $20/month for commercial

---

## 🎯 Production Checklist

- [ ] Backend deployed and responding
- [ ] Frontend deployed and loading
- [ ] API connection working
- [ ] Database initialized with paintings
- [ ] CORS configured
- [ ] Environment variables set
- [ ] Logs are accessible
- [ ] Custom domain configured (optional)
- [ ] Monitoring set up (optional)

---

## 📞 Quick Commands Reference

```bash
# Deploy everything
./deploy-all.sh

# Deploy backend only
./deploy-backend-railway.sh

# Deploy frontend only
./deploy-frontend-vercel.sh

# Verify deployment
./verify-deployment.sh

# View logs
railway logs        # Backend
vercel logs         # Frontend

# Re-deploy
railway up          # Backend
vercel --prod       # Frontend
```

---

## 🔗 Important URLs

- **Railway Dashboard**: https://railway.app/dashboard
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Railway Docs**: https://docs.railway.app
- **Vercel Docs**: https://vercel.com/docs

---

## 🆘 Need Help?

1. Check full guide: `DEPLOYMENT_GUIDE.md`
2. View logs: `railway logs` or `vercel logs`
3. Test API: `curl https://your-backend.railway.app/api/paintings`
4. Check environment variables in dashboards

---

**Ready to deploy? Run:**
```bash
./deploy-all.sh
```

🎉 Happy deploying!

