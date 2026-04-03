# ⚡ Quick Start Guide - LoopKart Checkout

Get your eCommerce checkout system running in 5 minutes!

---

## 🎯 What You'll Build

A complete checkout system with:
- ✅ Address form with validation
- ✅ Multiple payment methods (UPI, Card, Net Banking, COD)
- ✅ Razorpay integration
- ✅ Order management
- ✅ Success animations
- ✅ Mobile responsive design

---

## 📦 Prerequisites

Make sure you have:
- Node.js v16+ installed
- MongoDB running (local or Atlas)
- Razorpay account (free test account)

---

## 🚀 Installation (5 Minutes)

### Step 1: Clone & Install (2 min)

```bash
# Navigate to project
cd Rahul-Lead

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Step 2: Configure Backend (2 min)

Create `backend/.env`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/loopkart
ACCESS_TOKEN_SECRET=your_secret_key_here_min_32_chars
REFRESH_TOKEN_SECRET=your_refresh_secret_key_here_min_32_chars
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_razorpay_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

**Quick Razorpay Setup:**
1. Go to https://dashboard.razorpay.com
2. Sign up (free)
3. Go to Settings → API Keys
4. Generate Test Keys
5. Copy Key ID and Secret to `.env`

### Step 3: Configure Frontend (1 min)

Create `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
```

---

## ▶️ Run the Application

### Terminal 1 - Backend
```bash
cd backend
npm run dev
```
✅ Backend running on http://localhost:5000

### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```
✅ Frontend running on http://localhost:5173

---

## 🧪 Test the Checkout

### 1. Register/Login
- Go to http://localhost:5173
- Create an account or login

### 2. Add Items to Cart
- Browse products
- Click "Add to Cart"
- Go to cart page

### 3. Checkout Flow
- Click "Proceed to Checkout"
- Fill delivery address
- Select payment method
- Complete payment

### 4. Test Payment Methods

**UPI (Test Mode):**
- Select UPI
- Enter any UPI ID
- Click Pay Now
- Use test UPI: `success@razorpay`

**Card (Test Mode):**
- Select Card
- Card Number: `4111 1111 1111 1111`
- CVV: `123`
- Expiry: Any future date
- Click Pay Now

**COD:**
- Select Cash on Delivery
- Click "Place Order (COD)"
- Order placed instantly

---

## 📁 Key Files

### Frontend
```
frontend/src/pages/cart/
├── EnhancedCheckout.jsx      # Main checkout component
├── EnhancedCheckout.css      # Styles
└── CartPage.jsx              # Cart with checkout button
```

### Backend
```
backend/
├── controllers/
│   ├── paymentController.js  # Razorpay integration
│   └── orderController.js    # Order management
├── routes/
│   ├── paymentRoutes.js
│   └── orderRoutes.js
└── models/
    └── Order.js              # Order schema
```

---

## 🎨 Customization

### Change Colors

Edit `EnhancedCheckout.css`:
```css
/* Primary color */
.btn-continue,
.btn-place-order {
  background: linear-gradient(135deg, #8B6B47 0%, #6d5438 100%);
}

/* Change to your brand color */
.btn-continue,
.btn-place-order {
  background: linear-gradient(135deg, #your-color 0%, #your-dark-color 100%);
}
```

### Add Payment Method

Edit `EnhancedCheckout.jsx`:
```jsx
<div 
  className={`payment-card ${paymentMethod === 'wallet' ? 'selected' : ''}`}
  onClick={() => setPaymentMethod('wallet')}
>
  <div className="payment-radio">
    <div className="radio-dot"></div>
  </div>
  <div className="payment-icon wallet-icon">
    <Wallet size={24} />
  </div>
  <div className="payment-info">
    <h4>Digital Wallet</h4>
    <p>Paytm, Amazon Pay, etc.</p>
  </div>
</div>
```

---

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check if MongoDB is running
mongod --version

# Start MongoDB
mongod

# Or use MongoDB Atlas connection string
```

### Frontend can't connect to backend
```bash
# Check backend is running on port 5000
# Check VITE_API_URL in frontend/.env
# Ensure CORS is configured in backend/server.js
```

### Razorpay not loading
```bash
# Verify VITE_RAZORPAY_KEY_ID in frontend/.env
# Check browser console for errors
# Ensure you're using test keys (rzp_test_)
```

### Payment verification fails
```bash
# Verify RAZORPAY_KEY_SECRET in backend/.env
# Check backend logs for signature mismatch
# Ensure both frontend and backend use same key
```

---

## 📚 API Endpoints

### Create Order
```http
POST /api/payment/create-order
Content-Type: application/json

{
  "amount": 1999,
  "currency": "INR"
}
```

### Verify Payment
```http
POST /api/payment/verify
Content-Type: application/json

{
  "razorpay_order_id": "order_xxx",
  "razorpay_payment_id": "pay_xxx",
  "razorpay_signature": "signature_xxx"
}
```

### Create Order in DB
```http
POST /api/orders
Content-Type: application/json

{
  "items": [...],
  "totalAmount": 1999,
  "paymentId": "pay_xxx",
  "paymentStatus": "paid",
  "address": {...}
}
```

---

## 🎯 Features Checklist

- [x] Address form with validation
- [x] UPI payment
- [x] Card payment
- [x] Net Banking
- [x] Cash on Delivery
- [x] Razorpay integration
- [x] Payment verification
- [x] Order creation
- [x] Success screen
- [x] Mobile responsive
- [x] Loading states
- [x] Error handling
- [x] Animations

---

## 📱 Mobile Testing

Test on different screen sizes:
```bash
# Chrome DevTools
1. Open http://localhost:5173
2. Press F12
3. Click device toolbar icon
4. Select device (iPhone, iPad, etc.)
```

---

## 🚀 Next Steps

1. **Customize Design**
   - Update colors to match your brand
   - Add your logo
   - Modify layout

2. **Add Features**
   - Coupon codes
   - Multiple addresses
   - Order tracking
   - Email notifications

3. **Deploy to Production**
   - Follow PRODUCTION_DEPLOYMENT.md
   - Get Razorpay live keys
   - Deploy to Vercel/Render

---

## 💡 Pro Tips

### Tip 1: Test Mode vs Live Mode
```javascript
// Test keys start with rzp_test_
RAZORPAY_KEY_ID=rzp_test_xxxxx

// Live keys start with rzp_live_
RAZORPAY_KEY_ID=rzp_live_xxxxx
```

### Tip 2: Debug Payment Issues
```javascript
// Add console logs in payment handler
handler: async (response) => {
  console.log('Payment Response:', response);
  // Your verification code
}
```

### Tip 3: Test Different Scenarios
```javascript
// Test success
Card: 4111 1111 1111 1111

// Test failure
Card: 4000 0000 0000 0002

// Test authentication required
Card: 4000 0027 6000 3184
```

---

## 📖 Documentation

- **Full Setup Guide:** CHECKOUT_PAYMENT_GUIDE.md
- **Production Deployment:** PRODUCTION_DEPLOYMENT.md
- **Project README:** README.md
- **Razorpay Docs:** https://razorpay.com/docs

---

## 🆘 Need Help?

### Common Questions

**Q: How do I get Razorpay keys?**
A: Sign up at https://dashboard.razorpay.com → Settings → API Keys

**Q: Can I use this in production?**
A: Yes! Follow PRODUCTION_DEPLOYMENT.md for live deployment

**Q: Is it mobile responsive?**
A: Yes! Fully responsive design for all devices

**Q: Can I customize the design?**
A: Yes! Edit EnhancedCheckout.css to match your brand

---

## ✅ Success!

You now have a fully functional eCommerce checkout system! 🎉

**What's Working:**
- ✅ Address collection
- ✅ Payment processing
- ✅ Order management
- ✅ Success notifications

**Ready for Production:**
- Get Razorpay live keys
- Deploy to hosting
- Start accepting real payments!

---

**Happy Coding! 🚀**

Need more help? Check the full documentation or open an issue.
