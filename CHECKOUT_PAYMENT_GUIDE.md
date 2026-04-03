# 🛒 LoopKart Checkout & Payment System

Complete full-stack eCommerce checkout with Razorpay integration and Cash on Delivery (COD) support.

---

## 📦 Features

### Payment Methods
- ✅ **UPI** - Pay via any UPI app
- ✅ **Credit/Debit Card** - Visa, Mastercard, Amex
- ✅ **Net Banking** - All major banks
- ✅ **Cash on Delivery (COD)** - Pay when order arrives

### UI Features
- 🎨 Premium Amazon/Flipkart-style design
- 📱 Fully responsive (mobile + desktop)
- 🔄 Real-time order summary
- 📍 Address validation
- 🔒 Secure payment with Razorpay
- ✅ Success animations
- 🚀 Fast checkout flow

---

## 🛠 Tech Stack

**Frontend:**
- React 19.2.4
- React Router DOM 7.13.1
- Axios 1.13.6
- Lucide React (icons)

**Backend:**
- Node.js + Express 5.2.1
- MongoDB + Mongoose 9.3.1
- Razorpay SDK 2.9.6
- JWT Authentication

---

## 📁 Project Structure

```
Rahul-Lead/
├── frontend/src/
│   ├── pages/cart/
│   │   ├── CheckoutPaymentPage.jsx    # Main checkout component
│   │   ├── CheckoutPaymentPage.css    # Styles
│   │   └── CartPage.jsx               # Cart with checkout button
│   ├── context/
│   │   ├── AuthContext.jsx            # User authentication
│   │   └── CartContext.jsx            # Cart management
│   └── App.jsx                        # Routes
│
└── backend/
    ├── controllers/
    │   ├── orderController.js         # Order creation
    │   └── paymentController.js       # Razorpay integration
    ├── routes/
    │   ├── orderRoutes.js
    │   └── paymentRoutes.js
    └── models/
        └── Order.js                   # Order schema
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js v16+
- MongoDB (local or Atlas)
- Razorpay account ([Sign up here](https://razorpay.com))

---

### Backend Setup

#### 1. Navigate to backend folder
```bash
cd backend
```

#### 2. Install dependencies
```bash
npm install
```

#### 3. Configure environment variables

Create `.env` file in `backend/` folder:

```env
# Server
PORT=5000

# Database
MONGO_URI=mongodb://localhost:27017/loopkart
# OR use MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/loopkart

# JWT Secrets
ACCESS_TOKEN_SECRET=your_access_token_secret_here
REFRESH_TOKEN_SECRET=your_refresh_token_secret_here

# Razorpay (Get from https://dashboard.razorpay.com/app/keys)
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_razorpay_secret_key

# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email (for OTP)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

#### 4. Start backend server
```bash
npm run dev
```

Server will run on `http://localhost:5000`

---

### Frontend Setup

#### 1. Navigate to frontend folder
```bash
cd frontend
```

#### 2. Install dependencies
```bash
npm install
```

#### 3. Configure environment variables

Create `.env` file in `frontend/` folder:

```env
# Backend API URL
VITE_API_URL=http://localhost:5000/api

# Razorpay Key (same as backend KEY_ID)
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
```

#### 4. Start frontend dev server
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

---

## 🔑 Getting Razorpay Keys

### Step 1: Create Razorpay Account
1. Go to [https://razorpay.com](https://razorpay.com)
2. Click "Sign Up" (free test account)
3. Complete registration

### Step 2: Get API Keys
1. Login to [Razorpay Dashboard](https://dashboard.razorpay.com)
2. Go to **Settings** → **API Keys**
3. Click **Generate Test Keys**
4. Copy:
   - **Key ID** (starts with `rzp_test_`)
   - **Key Secret** (keep this secret!)

### Step 3: Add to Environment Files
- Add `RAZORPAY_KEY_ID` to **backend/.env**
- Add `RAZORPAY_KEY_SECRET` to **backend/.env**
- Add `VITE_RAZORPAY_KEY_ID` to **frontend/.env**

---

## 📡 API Endpoints

### Payment Routes

#### Create Razorpay Order
```http
POST /api/payment/create-order
Content-Type: application/json
Cookie: accessToken=xxx

{
  "amount": 1999,
  "currency": "INR"
}
```

**Response:**
```json
{
  "id": "order_xxxxxxxxxxxxx",
  "amount": 199900,
  "currency": "INR"
}
```

---

#### Verify Payment
```http
POST /api/payment/verify
Content-Type: application/json
Cookie: accessToken=xxx

{
  "razorpay_order_id": "order_xxxxx",
  "razorpay_payment_id": "pay_xxxxx",
  "razorpay_signature": "signature_xxxxx"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Payment verified successfully"
}
```

---

### Order Routes

#### Create Order
```http
POST /api/orders
Content-Type: application/json
Cookie: accessToken=xxx

{
  "items": [
    {
      "product": "product_id",
      "name": "Product Name",
      "emoji": "📱",
      "price": 999,
      "quantity": 2
    }
  ],
  "totalAmount": 1998,
  "paymentId": "pay_xxxxx",
  "paymentStatus": "paid",
  "address": {
    "fullName": "John Doe",
    "phone": "9876543210",
    "street": "123 MG Road",
    "city": "Mumbai",
    "state": "Maharashtra",
    "pincode": "400001"
  }
}
```

**Response:**
```json
{
  "success": true,
  "order": {
    "_id": "order_id",
    "user": "user_id",
    "items": [...],
    "totalAmount": 1998,
    "status": "pending",
    "paymentStatus": "paid"
  }
}
```

---

## 🎯 Usage Flow

### User Journey

1. **Add to Cart**
   - User browses products
   - Clicks "Add to Cart"
   - Items stored in CartContext

2. **View Cart**
   - Navigate to `/cart`
   - Review items, quantities
   - Click "Proceed to Checkout"

3. **Checkout Page** (`/checkout`)
   - **Left Side:**
     - Fill delivery address
     - Select payment method (UPI/Card/Net Banking/COD)
   - **Right Side:**
     - Order summary
     - Total amount
     - "Pay Now" or "Place Order (COD)" button

4. **Payment**
   - **Online Payment:**
     - Razorpay popup opens
     - User completes payment
     - Payment verified
   - **COD:**
     - Order placed directly
     - No payment required

5. **Success**
   - Success animation shown
   - Order created in database
   - Cart cleared
   - Redirect to `/orders`

---

## 💻 Code Examples

### Navigate to Checkout
```jsx
import { useNavigate } from 'react-router-dom';

function CartPage() {
  const navigate = useNavigate();
  
  return (
    <button onClick={() => navigate('/checkout')}>
      Proceed to Checkout
    </button>
  );
}
```

---

### Access Cart Data
```jsx
import { useCart } from '../../context/CartContext';

function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  
  return (
    <div>
      <p>Total: ₹{total}</p>
      {items.map(item => (
        <div key={item._id}>
          {item.name} - ₹{item.price} x {item.quantity}
        </div>
      ))}
    </div>
  );
}
```

---

### Handle Razorpay Payment
```jsx
const handleOnlinePayment = async () => {
  // 1. Load Razorpay script
  const script = document.createElement('script');
  script.src = 'https://checkout.razorpay.com/v1/checkout.js';
  document.body.appendChild(script);
  
  // 2. Create order
  const { data } = await axios.post('/api/payment/create-order', {
    amount: total,
    currency: 'INR'
  });
  
  // 3. Open Razorpay
  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount: data.amount,
    order_id: data.id,
    handler: async (response) => {
      // 4. Verify payment
      await axios.post('/api/payment/verify', {
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature
      });
      
      // 5. Create order in DB
      await createOrder(response.razorpay_payment_id, 'paid');
    }
  };
  
  const rzp = new window.Razorpay(options);
  rzp.open();
};
```

---

## 🎨 Customization

### Change Colors

Edit `CheckoutPaymentPage.css`:

```css
/* Background color */
.checkout-payment-page {
  background: #e8dccb; /* Change this */
}

/* Accent color (buttons, borders) */
.place-order-btn {
  background: #8B6B47; /* Change this */
}

.payment-option.active {
  border-color: #8B6B47; /* Change this */
}
```

---

### Add New Payment Method

In `CheckoutPaymentPage.jsx`:

```jsx
<label className={`payment-option ${paymentMethod === 'wallet' ? 'active' : ''}`}>
  <input
    type="radio"
    name="payment"
    value="wallet"
    checked={paymentMethod === 'wallet'}
    onChange={(e) => setPaymentMethod(e.target.value)}
  />
  <Wallet size={20} />
  <span>Digital Wallet</span>
</label>
```

---

## 🔒 Security Features

- ✅ JWT authentication required
- ✅ Payment signature verification
- ✅ HTTPS recommended for production
- ✅ Razorpay secret key stored server-side only
- ✅ Address validation
- ✅ CORS protection

---

## 📱 Responsive Design

### Desktop (1024px+)
- Two-column layout
- Left: Address + Payment methods
- Right: Sticky order summary

### Mobile (<1024px)
- Single column stacked layout
- Order summary at bottom
- Touch-friendly buttons

---

## 🐛 Troubleshooting

### Razorpay popup not opening
- Check if `VITE_RAZORPAY_KEY_ID` is set in frontend `.env`
- Verify Razorpay script loaded: `window.Razorpay` should exist
- Check browser console for errors

### Payment verification fails
- Ensure `RAZORPAY_KEY_SECRET` is correct in backend `.env`
- Check signature verification logic in `paymentController.js`

### Order not created
- Verify MongoDB connection
- Check if user is authenticated (JWT token)
- Ensure all required fields are provided

### CORS errors
- Backend CORS should allow frontend origin
- Check `server.js` CORS configuration
- Ensure `withCredentials: true` in axios calls

---

## 🚀 Deployment

### Backend (Render/Railway/Heroku)
1. Push code to GitHub
2. Connect repository to hosting platform
3. Set environment variables
4. Deploy

### Frontend (Vercel/Netlify)
1. Build: `npm run build`
2. Deploy `dist/` folder
3. Set environment variables
4. Update backend CORS to allow production domain

---

## 📝 Testing

### Test Cards (Razorpay Test Mode)

**Success:**
- Card: `4111 1111 1111 1111`
- CVV: Any 3 digits
- Expiry: Any future date

**Failure:**
- Card: `4000 0000 0000 0002`

### Test UPI
- UPI ID: `success@razorpay`

---

## 📄 License

This project is part of LoopKart eCommerce platform.

---

## 👨‍💻 Author

Rahul

---

## 🤝 Support

For issues or questions:
1. Check troubleshooting section
2. Review Razorpay documentation
3. Contact developer

---

**Happy Coding! 🚀**
