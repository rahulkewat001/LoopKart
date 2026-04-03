# 🚀 Production Deployment Guide - LoopKart Checkout System

Complete guide to deploy your eCommerce checkout system to production with Razorpay integration.

---

## 📋 Pre-Deployment Checklist

### Backend
- [ ] Environment variables configured
- [ ] MongoDB Atlas setup (production database)
- [ ] Razorpay live keys obtained
- [ ] CORS configured for production domain
- [ ] Error logging implemented
- [ ] Rate limiting enabled
- [ ] SSL/HTTPS configured

### Frontend
- [ ] API URLs updated to production
- [ ] Razorpay live key configured
- [ ] Build tested locally
- [ ] Environment variables set
- [ ] Analytics integrated (optional)

---

## 🗄️ Database Setup (MongoDB Atlas)

### Step 1: Create MongoDB Atlas Account
1. Go to [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for free tier
3. Create a new cluster

### Step 2: Configure Database
```bash
# Create database user
Username: loopkart_admin
Password: [Generate strong password]

# Whitelist IP addresses
0.0.0.0/0 (Allow from anywhere - for development)
# OR specific IPs for production
```

### Step 3: Get Connection String
```
mongodb+srv://loopkart_admin:<password>@cluster0.xxxxx.mongodb.net/loopkart?retryWrites=true&w=majority
```

---

## 🔑 Razorpay Live Keys

### Switch from Test to Live Mode

1. **Login to Razorpay Dashboard**
   - Go to [https://dashboard.razorpay.com](https://dashboard.razorpay.com)

2. **Complete KYC**
   - Submit business documents
   - Bank account details
   - PAN/GST information
   - Wait for approval (1-2 days)

3. **Generate Live Keys**
   - Switch to "Live Mode" (top right)
   - Go to Settings → API Keys
   - Generate Live Keys
   - Copy `Key ID` and `Key Secret`

4. **Update Environment Variables**
   ```env
   RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxxx
   RAZORPAY_KEY_SECRET=your_live_secret_key
   ```

---

## 🌐 Backend Deployment (Render)

### Step 1: Prepare Backend

Create `render.yaml` in backend folder:
```yaml
services:
  - type: web
    name: loopkart-api
    env: node
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 5000
      - key: MONGO_URI
        sync: false
      - key: ACCESS_TOKEN_SECRET
        sync: false
      - key: REFRESH_TOKEN_SECRET
        sync: false
      - key: RAZORPAY_KEY_ID
        sync: false
      - key: RAZORPAY_KEY_SECRET
        sync: false
      - key: CLOUDINARY_CLOUD_NAME
        sync: false
      - key: CLOUDINARY_API_KEY
        sync: false
      - key: CLOUDINARY_API_SECRET
        sync: false
```

### Step 2: Deploy to Render

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/loopkart.git
   git push -u origin main
   ```

2. **Connect to Render**
   - Go to [https://render.com](https://render.com)
   - Sign up / Login
   - Click "New +" → "Web Service"
   - Connect GitHub repository
   - Select `backend` folder

3. **Configure Service**
   ```
   Name: loopkart-api
   Environment: Node
   Build Command: npm install
   Start Command: npm start
   ```

4. **Add Environment Variables**
   - Go to "Environment" tab
   - Add all variables from `.env`
   - Click "Save Changes"

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - Note your API URL: `https://loopkart-api.onrender.com`

---

## 🎨 Frontend Deployment (Vercel)

### Step 1: Prepare Frontend

Update `frontend/.env`:
```env
VITE_API_URL=https://loopkart-api.onrender.com/api
VITE_RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxxx
```

### Step 2: Deploy to Vercel

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   cd frontend
   vercel --prod
   ```

4. **Configure Project**
   ```
   Set up and deploy? Yes
   Which scope? Your account
   Link to existing project? No
   Project name? loopkart
   Directory? ./
   Override settings? No
   ```

5. **Add Environment Variables**
   - Go to Vercel Dashboard
   - Select project → Settings → Environment Variables
   - Add:
     - `VITE_API_URL`
     - `VITE_RAZORPAY_KEY_ID`
   - Redeploy

Your site will be live at: `https://loopkart.vercel.app`

---

## 🔒 Security Configuration

### Backend Security

#### 1. Update CORS
```javascript
// server.js
const allowedOrigins = [
  'https://loopkart.vercel.app',
  'https://www.yourdomai.com'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
```

#### 2. Add Rate Limiting
```bash
npm install express-rate-limit
```

```javascript
// server.js
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

#### 3. Add Helmet for Security Headers
```bash
npm install helmet
```

```javascript
// server.js
const helmet = require('helmet');
app.use(helmet());
```

#### 4. Environment Variables Security
```javascript
// Never commit .env file
// Add to .gitignore
.env
.env.local
.env.production
```

---

## 🔐 SSL/HTTPS Configuration

### Render (Automatic)
- Render provides free SSL certificates
- HTTPS enabled by default
- No configuration needed

### Vercel (Automatic)
- Vercel provides free SSL
- HTTPS enabled by default
- Custom domains supported

---

## 📊 Monitoring & Logging

### Backend Logging

Install Winston:
```bash
npm install winston
```

Create `logger.js`:
```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

module.exports = logger;
```

Use in controllers:
```javascript
const logger = require('../logger');

try {
  // Your code
  logger.info('Payment successful', { orderId, amount });
} catch (error) {
  logger.error('Payment failed', { error: error.message });
}
```

---

## 🧪 Testing Production

### Test Checklist

#### Payment Flow
- [ ] UPI payment works
- [ ] Card payment works
- [ ] Net Banking works
- [ ] COD order placement works
- [ ] Payment verification works
- [ ] Order created in database
- [ ] Email notifications sent

#### Security
- [ ] HTTPS enabled
- [ ] CORS working correctly
- [ ] JWT authentication working
- [ ] Payment signature verification
- [ ] No sensitive data in responses

#### Performance
- [ ] Page load time < 3 seconds
- [ ] API response time < 500ms
- [ ] Images optimized
- [ ] Lazy loading working

---

## 🐛 Common Production Issues

### Issue 1: CORS Error
**Problem:** Frontend can't connect to backend

**Solution:**
```javascript
// backend/server.js
app.use(cors({
  origin: 'https://your-frontend-domain.vercel.app',
  credentials: true
}));
```

### Issue 2: Razorpay Not Loading
**Problem:** Razorpay script blocked

**Solution:**
- Check Content Security Policy
- Ensure HTTPS is enabled
- Verify Razorpay key is correct

### Issue 3: Payment Verification Fails
**Problem:** Signature mismatch

**Solution:**
- Verify `RAZORPAY_KEY_SECRET` is correct
- Check signature generation logic
- Ensure order_id matches

### Issue 4: Database Connection Fails
**Problem:** Can't connect to MongoDB

**Solution:**
- Check MongoDB Atlas IP whitelist
- Verify connection string
- Ensure database user has correct permissions

---

## 📈 Performance Optimization

### Frontend

1. **Code Splitting**
   ```javascript
   // Use React.lazy for route-based splitting
   const CheckoutPage = lazy(() => import('./pages/cart/EnhancedCheckout'));
   ```

2. **Image Optimization**
   - Use WebP format
   - Implement lazy loading
   - Compress images

3. **Caching**
   ```javascript
   // vite.config.js
   export default {
     build: {
       rollupOptions: {
         output: {
           manualChunks: {
             vendor: ['react', 'react-dom', 'react-router-dom']
           }
         }
       }
     }
   }
   ```

### Backend

1. **Database Indexing**
   ```javascript
   // models/Order.js
   orderSchema.index({ user: 1, createdAt: -1 });
   orderSchema.index({ paymentId: 1 });
   ```

2. **Response Compression**
   ```bash
   npm install compression
   ```
   ```javascript
   const compression = require('compression');
   app.use(compression());
   ```

3. **Caching with Redis** (Optional)
   ```bash
   npm install redis
   ```

---

## 🔄 CI/CD Pipeline (GitHub Actions)

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Render
        run: |
          curl -X POST ${{ secrets.RENDER_DEPLOY_HOOK }}

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        run: |
          npm install -g vercel
          vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
```

---

## 📱 Mobile Responsiveness

Test on:
- [ ] iPhone (Safari)
- [ ] Android (Chrome)
- [ ] iPad (Safari)
- [ ] Desktop (Chrome, Firefox, Safari)

---

## 🎯 Go-Live Checklist

### Final Steps

1. **Test Everything**
   - Complete a test order
   - Verify payment flow
   - Check email notifications
   - Test on mobile devices

2. **Update DNS** (if using custom domain)
   - Point domain to Vercel
   - Wait for DNS propagation (24-48 hours)

3. **Enable Analytics**
   - Google Analytics
   - Razorpay Dashboard
   - Error tracking (Sentry)

4. **Backup Database**
   - Setup automated backups
   - Test restore process

5. **Monitor First Week**
   - Check error logs daily
   - Monitor payment success rate
   - Track user feedback

---

## 📞 Support & Maintenance

### Regular Tasks
- Weekly: Check error logs
- Monthly: Review payment analytics
- Quarterly: Update dependencies
- Yearly: Renew SSL certificates (automatic)

### Emergency Contacts
- Razorpay Support: support@razorpay.com
- MongoDB Support: support@mongodb.com
- Render Support: support@render.com
- Vercel Support: support@vercel.com

---

## 🎉 Congratulations!

Your eCommerce checkout system is now live in production! 🚀

**Next Steps:**
1. Monitor first transactions
2. Gather user feedback
3. Optimize based on analytics
4. Scale as needed

---

**Need Help?** Check the troubleshooting section or contact support.

**Happy Selling! 💰**
