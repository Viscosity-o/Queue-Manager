# Deployment Guide - The Culinary Editorial

## Current Issue
Your frontend is deployed on AWS Amplify, but the backend is still running on `localhost:8080`. This causes CORS errors because the deployed frontend cannot reach your local backend.

## Solution Overview
You need to deploy your Spring Boot backend to a cloud service so it's accessible from the internet.

---

## Backend Deployment Options

### Option 1: AWS Elastic Beanstalk (Recommended for AWS)
**Pros**: Easy integration with AWS, auto-scaling, managed service
**Cost**: ~$10-30/month for small instance

**Steps**:
1. Install AWS CLI and EB CLI
2. Package your Spring Boot app:
   ```bash
   cd canteen
   mvn clean package
   ```
3. Initialize Elastic Beanstalk:
   ```bash
   eb init -p java-17 canteen-backend --region us-east-1
   ```
4. Create environment and deploy:
   ```bash
   eb create canteen-prod
   eb deploy
   ```
5. Get your backend URL:
   ```bash
   eb status
   ```
6. Update `.env.production` with your backend URL

### Option 2: Railway.app (Easiest)
**Pros**: Free tier available, very simple deployment
**Cost**: Free for small apps, $5/month for more resources

**Steps**:
1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Railway will auto-detect Spring Boot
6. Add environment variables in Railway dashboard:
   - `SPRING_DATASOURCE_URL`
   - `SPRING_DATASOURCE_USERNAME`
   - `SPRING_DATASOURCE_PASSWORD`
   - `RAZORPAY_KEY_ID`
   - `RAZORPAY_KEY_SECRET`
7. Copy the generated URL (e.g., `https://your-app.railway.app`)
8. Update `.env.production` with this URL

### Option 3: Render.com (Good Free Tier)
**Pros**: Free tier available, PostgreSQL included
**Cost**: Free for basic apps

**Steps**:
1. Go to https://render.com
2. Sign up with GitHub
3. Click "New +" → "Web Service"
4. Connect your repository
5. Configure:
   - **Build Command**: `cd canteen && mvn clean package`
   - **Start Command**: `java -jar canteen/target/canteen-0.0.1-SNAPSHOT.jar`
   - **Environment**: Java 17
6. Add environment variables
7. Deploy and copy the URL
8. Update `.env.production`

### Option 4: Heroku
**Pros**: Well-documented, easy to use
**Cost**: ~$7/month (no free tier anymore)

**Steps**:
1. Install Heroku CLI
2. Login: `heroku login`
3. Create app:
   ```bash
   cd canteen
   heroku create canteen-backend
   ```
4. Add PostgreSQL:
   ```bash
   heroku addons:create heroku-postgresql:mini
   ```
5. Set environment variables:
   ```bash
   heroku config:set RAZORPAY_KEY_ID=your_key
   heroku config:set RAZORPAY_KEY_SECRET=your_secret
   ```
6. Deploy:
   ```bash
   git subtree push --prefix canteen heroku main
   ```
7. Copy the app URL
8. Update `.env.production`

---

## Frontend Configuration

### Step 1: Update Environment Variable
After deploying your backend, update `Frontend/my-project/.env.production`:

```env
VITE_API_BASE_URL=https://your-backend-url.com
```

Replace `https://your-backend-url.com` with your actual deployed backend URL.

### Step 2: Configure Amplify Environment Variables
1. Go to AWS Amplify Console
2. Select your app
3. Go to "Environment variables"
4. Add:
   - **Key**: `VITE_API_BASE_URL`
   - **Value**: `https://your-backend-url.com`

### Step 3: Redeploy Frontend
```bash
cd Frontend/my-project
git add .
git commit -m "Update API endpoint for production"
git push
```

Amplify will automatically redeploy.

---

## Backend CORS Configuration

I've already updated `SecurityConfig.java` to allow your Amplify domain:
```java
configuration.setAllowedOrigins(Arrays.asList(
    "http://localhost:5173", 
    "http://localhost:3000",
    "https://main.d2p2ult8kyt0kl.amplifyapp.com"
));
```

After deploying the backend, rebuild and redeploy it.

---

## Database Configuration

### For Production Backend
You'll need a PostgreSQL database. Options:

1. **AWS RDS** (if using Elastic Beanstalk)
2. **Railway PostgreSQL** (included free)
3. **Render PostgreSQL** (included free)
4. **Heroku PostgreSQL** (included)
5. **Supabase** (free tier available)

Update `application.properties` or use environment variables:
```properties
spring.datasource.url=${DATABASE_URL}
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}
```

---

## Testing After Deployment

1. **Test Backend Health**:
   ```bash
   curl https://your-backend-url.com/auth/login
   ```

2. **Test Frontend**:
   - Visit your Amplify URL
   - Try to register/login
   - Check browser console for errors

3. **Check CORS**:
   - Open browser DevTools → Network tab
   - Look for CORS errors
   - Verify `Access-Control-Allow-Origin` header

---

## Quick Start (Recommended: Railway)

1. **Deploy Backend to Railway**:
   - Go to https://railway.app
   - Connect GitHub repo
   - Deploy (takes 5 minutes)
   - Copy URL: `https://canteen-backend-production.up.railway.app`

2. **Update Frontend**:
   ```bash
   cd Frontend/my-project
   echo "VITE_API_BASE_URL=https://canteen-backend-production.up.railway.app" > .env.production
   ```

3. **Configure Amplify**:
   - Add environment variable in Amplify Console
   - Redeploy

4. **Rebuild Backend** (to include CORS changes):
   ```bash
   cd canteen
   mvn clean package
   ```
   - Push to Railway

---

## Cost Comparison

| Service | Free Tier | Paid Tier | Database |
|---------|-----------|-----------|----------|
| Railway | 500 hours/month | $5/month | Included |
| Render | 750 hours/month | $7/month | Included |
| Heroku | None | $7/month | $5/month |
| AWS EB | None | $10-30/month | $15+/month |

**Recommendation**: Start with Railway (free) or Render (free) for testing.

---

## Need Help?

If you encounter issues:
1. Check backend logs in your deployment platform
2. Check browser console for frontend errors
3. Verify environment variables are set correctly
4. Test API endpoints with Postman/curl
5. Ensure database is connected and migrations ran

---

## Files Modified

✅ `SecurityConfig.java` - Added Amplify domain to CORS
✅ `Frontend/my-project/src/config/api.ts` - Centralized API endpoints
✅ `Register.tsx` - Uses API config
✅ `Signin.tsx` - Uses API config
✅ `Checkout.tsx` - Uses API config
✅ `.env.development` - Local development config
✅ `.env.production` - Production config (needs backend URL)
✅ `.gitignore` - Excludes .env files

---

## Next Steps

1. Choose a backend deployment platform (Railway recommended)
2. Deploy your backend
3. Update `.env.production` with backend URL
4. Configure Amplify environment variable
5. Redeploy frontend
6. Test the application
