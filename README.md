# LoopKart - E-Commerce Platform

A full-stack e-commerce platform with real-time chat, seller marketplace, and payment integration.

---

## 📋 Table of Contents
- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Frontend Architecture](#frontend-architecture)
- [Backend Architecture](#backend-architecture)
- [Database Models](#database-models)
- [Real-time Features](#real-time-features)

---

## 🎯 Overview

LoopKart is a modern e-commerce platform that allows users to buy products, sellers to list items, and admins to manage the platform. It includes real-time chat, payment processing via Razorpay, and a comprehensive order management system.

---

## 🛠 Tech Stack

### Frontend
- **React 19.2.4** - UI library
- **Vite 8.0.1** - Build tool and dev server
- **React Router DOM 7.13.1** - Client-side routing
- **Axios 1.13.6** - HTTP client
- **Socket.IO Client 4.8.3** - Real-time communication
- **Lucide React 1.7.0** - Icon library
- **Razorpay 2.9.6** - Payment gateway integration

### Backend
- **Node.js** with **Express 5.2.1** - Server framework
- **MongoDB** with **Mongoose 9.3.1** - Database
- **Socket.IO 4.8.3** - WebSocket server
- **JWT (jsonwebtoken 9.0.3)** - Authentication
- **Bcryptjs 3.0.3** - Password hashing
- **Multer 2.1.1** - File upload handling
- **Cloudinary 2.9.0** - Image storage
- **Razorpay 2.9.6** - Payment processing
- **Nodemailer 8.0.4** - Email service
- **Cookie-parser 1.4.7** - Cookie handling
- **CORS 2.8.6** - Cross-origin resource sharing

---

## ✨ Features

### 🛒 Modern Checkout System (NEW!)
- **Two-step checkout flow** - Address → Payment
- **Multiple payment methods** - UPI, Card, Net Banking, COD
- **Razorpay integration** - Secure payment processing
- **Real-time validation** - Phone, pincode, required fields
- **Order summary** - Live cart totals and item details
- **Success animations** - Celebration screen after order
- **Mobile responsive** - Works on all devices
- **Production ready** - Complete with documentation

### User Features
- 🔐 Authentication (Register, Login, Forgot Password with OTP)
- 🛒 Shopping cart with quantity management
- ❤️ Wishlist functionality
- 📦 Product browsing with categories and search
- ⭐ Product reviews and ratings
- 💳 Razorpay payment integration
- 📋 Order tracking with timeline
- 💬 Real-time chat with sellers
- 👤 Profile management with avatar upload
- 🔔 Real-time notifications

### Seller Features
- 🏪 Seller registration and dashboard
- 📝 Product listing management (CRUD)
- 📊 Sales analytics
- 💬 Chat with buyers
- 📦 Order management

### Admin Features
- 👥 User management
- 📦 Product moderation
- 📋 Order oversight
- 🏪 Seller approval system

---

## 📁 Project Structure

```
Rahul-Lead/
├── backend/
│   ├── config/
│   │   └── db.js                    # MongoDB connection
│   ├── controllers/
│   │   ├── adminController.js       # Admin operations
│   │   ├── authController.js        # Login, register, logout
│   │   ├── chatController.js        # Chat management
│   │   ├── forgotPasswordController.js  # Password reset
│   │   ├── notificationController.js    # Notifications
│   │   ├── orderController.js       # Order CRUD
│   │   ├── paymentController.js     # Razorpay integration
│   │   ├── productController.js     # Product CRUD
│   │   ├── profileController.js     # User profile
│   │   ├── reviewController.js      # Product reviews
│   │   └── sellerController.js      # Seller operations
│   ├── middleware/
│   │   ├── authMiddleware.js        # JWT verification
│   │   ├── generateTokens.js        # Access/refresh tokens
│   │   └── upload.js                # Multer config
│   ├── models/
│   │   ├── Chat.js                  # Chat schema
│   │   ├── Notification.js          # Notification schema
│   │   ├── Order.js                 # Order schema
│   │   ├── Product.js               # Product schema
│   │   ├── Review.js                # Review schema
│   │   └── User.js                  # User schema
│   ├── routes/
│   │   ├── adminRoutes.js
│   │   ├── authRoutes.js
│   │   ├── chatRoutes.js
│   │   ├── forgotPasswordRoutes.js
│   │   ├── notificationRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── paymentRoutes.js
│   │   ├── productRoutes.js
│   │   ├── profileRoutes.js
│   │   ├── reviewRoutes.js
│   │   ├── sellerRoutes.js
│   │   └── uploadRoutes.js
│   ├── .env
│   ├── package.json
│   └── server.js                    # Entry point
│
└── frontend/LoopKart/
    ├── public/
    │   ├── favicon.svg
    │   └── icons.svg
    ├── src/
    │   ├── assets/                  # Images, fonts
    │   ├── components/
    │   │   ├── layout/
    │   │   │   ├── Navbar.jsx       # Navigation bar
    │   │   │   └── Navbar.css
    │   │   └── ui/
    │   │       ├── Button.jsx       # Reusable button
    │   │       ├── Input.jsx        # Reusable input
    │   │       ├── OtpInput.jsx     # OTP input component
    │   │       ├── RippleEffect/    # Button ripple effect
    │   │       └── Toast/           # Toast notifications
    │   ├── context/
    │   │   ├── AuthContext.jsx      # User authentication state
    │   │   ├── CartContext.jsx      # Shopping cart state
    │   │   ├── NotificationContext.jsx  # Notifications state
    │   │   ├── SocketContext.jsx    # Socket.IO connection
    │   │   └── WishlistContext.jsx  # Wishlist state
    │   ├── pages/
    │   │   ├── admin/
    │   │   │   └── AdminPage.jsx    # Admin dashboard
    │   │   ├── auth/
    │   │   │   ├── LoginPage.jsx
    │   │   │   ├── RegisterPage.jsx
    │   │   │   └── ForgotPasswordPage.jsx
    │   │   ├── cart/
    │   │   │   └── CartPage.jsx     # Shopping cart
    │   │   ├── chat/
    │   │   │   └── ChatPage.jsx     # Real-time chat
    │   │   ├── home/
    │   │   │   └── HomePage.jsx     # Product listing
    │   │   ├── orders/
    │   │   │   └── OrdersPage.jsx   # Order history
    │   │   ├── product/
    │   │   │   └── ProductDetailPage.jsx
    │   │   ├── profile/
    │   │   │   └── ProfilePage.jsx  # User profile
    │   │   ├── seller/
    │   │   │   ├── BecomeSeller.jsx
    │   │   │   └── SellerDashboard.jsx
    │   │   └── wishlist/
    │   │       └── WishlistPage.jsx
    │   ├── utils/                   # Helper functions
    │   ├── App.jsx                  # Root component with routes
    │   ├── App.css
    │   ├── main.jsx                 # Entry point
    │   └── index.css
    ├── .env
    ├── package.json
    ├── vite.config.js
    └── index.html
```

---

## 🚀 Installation

### Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas)
- Cloudinary account
- Razorpay account

### Backend Setup
```bash
cd backend
npm install
```

Create `.env` file:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
```

Start server:
```bash
npm run dev
```

### Frontend Setup
```bash
cd frontend/LoopKart
npm install
```

Create `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY_ID=your_razorpay_key
```

Start dev server:
```bash
npm run dev
```

---

## 🔐 Environment Variables

### Backend (.env)
| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default: 5000) |
| `MONGO_URI` | MongoDB connection string |
| `ACCESS_TOKEN_SECRET` | JWT access token secret |
| `REFRESH_TOKEN_SECRET` | JWT refresh token secret |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `RAZORPAY_KEY_ID` | Razorpay key ID |
| `RAZORPAY_KEY_SECRET` | Razorpay secret key |
| `EMAIL_USER` | Email for sending OTPs |
| `EMAIL_PASS` | Email app password |

### Frontend (.env)
| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Backend API base URL |
| `VITE_RAZORPAY_KEY_ID` | Razorpay key for frontend |

---

## 📡 API Documentation

### Authentication Routes (`/api/auth`)
- `POST /register` - Register new user
- `POST /login` - Login user (returns access + refresh tokens)
- `POST /logout` - Logout user
- `POST /refresh` - Refresh access token
- `POST /forgot-password` - Send OTP to email
- `POST /verify-otp` - Verify OTP
- `POST /reset-password` - Reset password with OTP

### Profile Routes (`/api/profile`)
- `GET /` - Get user profile
- `PUT /` - Update profile
- `POST /avatar` - Upload avatar

### Product Routes (`/api/products`)
- `GET /` - Get all products (with filters)
- `GET /:id` - Get product by ID
- `POST /` - Create product (seller only)
- `PUT /:id` - Update product (seller only)
- `DELETE /:id` - Delete product (seller only)

### Review Routes (`/api/products`)
- `POST /:id/reviews` - Add review
- `GET /:id/reviews` - Get product reviews

### Order Routes (`/api/orders`)
- `POST /` - Create order
- `GET /` - Get user orders
- `GET /:id` - Get order by ID
- `PUT /:id/status` - Update order status (seller/admin)

### Payment Routes (`/api/payment`)
- `POST /create-order` - Create Razorpay order
- `POST /verify` - Verify payment signature
x
### Chat Routes (`/api/chats`)
- `GET /` - Get user chats
- `POST /` - Create/get chat with user
- `GET /:id/messages` - Get chat messages

### Notification Routes (`/api/notifications`)
- `GET /` - Get user notifications
- `PUT /:id/read` - Mark notification as read

### Admin Routes (`/api/admin`)
- `GET /users` - Get all users
- `PUT /users/:id/role` - Update user role
- `DELETE /users/:id` - Delete user
- `GET /stats` - Get platform statistics

### Seller Routes (`/api/seller`)
- `POST /register` - Register as seller
- `GET /dashboard` - Get seller dashboard data
- `GET /products` - Get seller products
- `GET /orders` - Get seller orders

### Upload Routes (`/api/upload`)
- `POST /` - Upload image to Cloudinary

---

## 🎨 Frontend Architecture

### Context Providers

#### AuthContext
**Purpose:** Manages user authentication state

**State:**
- `user` - Current user object
- `loading` - Loading state

**Functions:**
- `login(email, password)` - Authenticate user
- `register(name, email, password)` - Create account
- `logout()` - Clear session
- `updateUser(data)` - Update user info

**Usage:**
```jsx
const { user, login, logout } = useAuth();
```

---

#### CartContext
**Purpose:** Manages shopping cart state

**State:**
- `items` - Array of cart items
- `total` - Total price
- `itemCount` - Total quantity

**Functions:**
- `addToCart(product)` - Add product to cart (increments if exists)
- `removeFromCart(id)` - Remove item from cart
- `updateQty(id, qty)` - Update item quantity
- `clearCart()` - Empty cart

**Item Structure:**
```javascript
{
  _id: string,
  name: string,
  emoji: string,
  image: string,
  price: number,
  quantity: number
}
```

**Usage:**
```jsx
const { items, addToCart, total } = useCart();
```

---

#### WishlistContext
**Purpose:** Manages user wishlist

**State:**
- `wishlist` - Array of product IDs

**Functions:**
- `addToWishlist(productId)` - Add to wishlist
- `removeFromWishlist(productId)` - Remove from wishlist
- `isInWishlist(productId)` - Check if product is wishlisted

**Usage:**
```jsx
const { wishlist, addToWishlist, isInWishlist } = useWishlist();
```

---

#### SocketContext
**Purpose:** Manages Socket.IO connection

**State:**
- `socket` - Socket.IO instance
- `connected` - Connection status
- `onlineUsers` - Array of online user IDs

**Functions:**
- `joinChat(chatId)` - Join chat room
- `sendMessage(chatId, text)` - Send message
- `markRead(chatId)` - Mark messages as read
- `emitTyping(chatId, isTyping)` - Send typing indicator

**Events:**
- `new_message` - New message received
- `typing` - User typing
- `user_online` - User came online
- `user_offline` - User went offline

**Usage:**
```jsx
const { socket, connected, onlineUsers } = useSocket();
```

---

#### NotificationContext
**Purpose:** Manages notifications

**State:**
- `notifications` - Array of notifications
- `unreadCount` - Count of unread notifications

**Functions:**
- `fetchNotifications()` - Load notifications
- `markAsRead(id)` - Mark notification as read
- `addNotification(notification)` - Add new notification

**Usage:**
```jsx
const { notifications, unreadCount, markAsRead } = useNotifications();
```

---

### Routing

**Public Routes:**
- `/login` - Login page
- `/register` - Registration page
- `/forgot-password` - Password reset

**Protected Routes:**
- `/` - Home page (product listing)
- `/cart` - Shopping cart
- `/orders` - Order history
- `/profile` - User profile
- `/product/:id` - Product details
- `/wishlist` - Wishlist
- `/chat` - Chat list
- `/chat/:chatId` - Chat conversation
- `/become-seller` - Seller registration
- `/seller/dashboard` - Seller dashboard
- `/admin` - Admin panel

**Route Guards:**
- `PrivateRoute` - Requires authentication
- `GuestRoute` - Redirects authenticated users

---

## 🔧 Backend Architecture

### Server Setup (server.js)

**Express Middleware:**
- `cors` - Cross-origin requests from `http://localhost:5173`
- `express.json()` - Parse JSON bodies
- `cookieParser` - Parse cookies

**Socket.IO Setup:**
- Authentication via JWT token
- Online user tracking
- Real-time messaging
- Typing indicators
- Read receipts

---

### Controllers

#### authController
- `register` - Create new user account
- `login` - Authenticate and return tokens
- `logout` - Invalidate refresh token
- `refreshToken` - Generate new access token

#### productController
- `getProducts` - List products with filters (category, search, price range)
- `getProductById` - Get single product details
- `createProduct` - Create new product (seller)
- `updateProduct` - Update product (seller/admin)
- `deleteProduct` - Delete product (seller/admin)

#### orderController
- `createOrder` - Create new order
- `getUserOrders` - Get user's orders
- `getOrderById` - Get order details
- `updateOrderStatus` - Update order status (seller/admin)

#### paymentController
- `createRazorpayOrder` - Generate Razorpay order ID
- `verifyPayment` - Verify payment signature

#### chatController
- `getChats` - Get user's chat list
- `createOrGetChat` - Create/retrieve chat with user
- `getMessages` - Get chat messages

#### reviewController
- `addReview` - Add product review
- `getReviews` - Get product reviews

#### profileController
- `getProfile` - Get user profile
- `updateProfile` - Update user info
- `uploadAvatar` - Upload profile picture

#### sellerController
- `registerSeller` - Convert user to seller
- `getDashboard` - Get seller stats
- `getSellerProducts` - Get seller's products
- `getSellerOrders` - Get seller's orders

#### adminController
- `getUsers` - List all users
- `updateUserRole` - Change user role
- `deleteUser` - Remove user
- `getStats` - Platform statistics

---

### Middleware

#### authMiddleware
**Function:** `protect`
- Verifies JWT access token from cookies
- Attaches user to `req.user`
- Returns 401 if invalid/expired

**Function:** `restrictTo(...roles)`
- Checks if user has required role
- Returns 403 if unauthorized

#### generateTokens
**Function:** `generateAccessToken(userId)`
- Creates JWT with 15min expiry

**Function:** `generateRefreshToken(userId)`
- Creates JWT with 7day expiry

#### upload
- Configures Multer for file uploads
- Stores files in memory
- Uploads to Cloudinary

---

## 💾 Database Models

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: 'user' | 'seller' | 'admin',
  avatar: String,
  resetOtp: String,
  resetOtpExpiry: Date,
  refreshTokens: [String],
  sellerProfile: {
    shopName: String,
    shopDesc: String,
    phone: String,
    city: String,
    state: String,
    approved: Boolean,
    totalSales: Number,
    rating: Number,
    joinedAt: Date
  },
  timestamps: true
}
```

**Methods:**
- `matchPassword(plain)` - Compare password
- `toJSON()` - Remove sensitive fields

**Hooks:**
- Pre-save: Hash password if modified

---

### Product Model
```javascript
{
  name: String,
  emoji: String,
  image: String,
  images: [String],
  price: Number,
  originalPrice: Number,
  rating: Number,
  reviews: Number,
  badge: String,
  category: String,
  description: String,
  stock: Number,
  seller: ObjectId (ref: User),
  sellerName: String,
  condition: 'new' | 'like_new' | 'good' | 'fair',
  isSellerListing: Boolean,
  status: 'active' | 'sold' | 'inactive',
  views: Number,
  timestamps: true
}
```

---

### Order Model
```javascript
{
  user: ObjectId (ref: User),
  items: [{
    product: ObjectId (ref: Product),
    name: String,
    emoji: String,
    price: Number,
    quantity: Number
  }],
  totalAmount: Number,
  paymentId: String,
  paymentStatus: 'pending' | 'paid',
  couponCode: String,
  discountAmount: Number,
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled',
  timeline: [{
    status: String,
    message: String,
    timestamp: Date
  }],
  address: {
    fullName: String,
    phone: String,
    street: String,
    city: String,
    state: String,
    pincode: String
  },
  timestamps: true
}
```

---

### Chat Model
```javascript
{
  participants: [ObjectId (ref: User)],
  messages: [{
    sender: ObjectId (ref: User),
    text: String,
    read: Boolean,
    createdAt: Date
  }],
  lastMessage: String,
  lastMessageAt: Date,
  timestamps: true
}
```

---

### Review Model
```javascript
{
  product: ObjectId (ref: Product),
  user: ObjectId (ref: User),
  rating: Number (1-5),
  comment: String,
  images: [String],
  helpful: Number,
  timestamps: true
}
```

---

### Notification Model
```javascript
{
  user: ObjectId (ref: User),
  type: 'order' | 'message' | 'review' | 'system',
  title: String,
  message: String,
  read: Boolean,
  link: String,
  timestamp: Date
}
```

---

## ⚡ Real-time Features

### Socket.IO Events

**Client → Server:**
- `join_chat(chatId)` - Join chat room
- `send_message({ chatId, text })` - Send message
- `typing({ chatId, isTyping })` - Typing indicator
- `mark_read({ chatId })` - Mark messages as read

**Server → Client:**
- `new_message({ chatId, message })` - New message received
- `typing({ userId, isTyping })` - User typing
- `messages_read({ chatId, readBy })` - Messages marked as read
- `user_online(userId)` - User came online
- `user_offline(userId)` - User went offline
- `online_users([userIds])` - List of online users
- `chat_notification({ chatId, senderName, text })` - New message notification

### Authentication Flow
1. Client connects with JWT token in `socket.handshake.auth.token`
2. Server verifies token and attaches user to socket
3. User ID added to online users map
4. Broadcast online status to other users

### Message Flow
1. Client emits `send_message`
2. Server validates chat membership
3. Message saved to database
4. Server emits `new_message` to chat room
5. Notification sent to offline participants

---

## 🔒 Security Features

- **Password Hashing:** bcrypt with 12 salt rounds
- **JWT Authentication:** Access (15min) + Refresh (7day) tokens
- **HTTP-only Cookies:** Tokens stored securely
- **CORS Protection:** Whitelist frontend origin
- **Input Validation:** Mongoose schema validation
- **Role-based Access:** Middleware for admin/seller routes
- **OTP Verification:** Email-based password reset
- **Payment Verification:** Razorpay signature validation

---

## 📦 Key Dependencies Explained

### Backend
- **express** - Web framework for Node.js
- **mongoose** - MongoDB ODM with schema validation
- **socket.io** - WebSocket library for real-time features
- **jsonwebtoken** - JWT creation and verification
- **bcryptjs** - Password hashing
- **multer** - Multipart form data (file uploads)
- **cloudinary** - Cloud image storage
- **razorpay** - Payment gateway SDK
- **nodemailer** - Email sending (OTP)
- **cookie-parser** - Parse HTTP cookies
- **cors** - Enable cross-origin requests

### Frontend
- **react** - UI library
- **react-router-dom** - Client-side routing
- **axios** - HTTP client with interceptors
- **socket.io-client** - WebSocket client
- **lucide-react** - Icon components
- **vite** - Fast build tool and dev server

---

## 🎯 Usage Examples

### Adding Product to Cart
```jsx
import { useCart } from './context/CartContext';

function ProductCard({ product }) {
  const { addToCart } = useCart();
  
  return (
    <button onClick={() => addToCart(product)}>
      Add to Cart
    </button>
  );
}
```

### Sending Real-time Message
```jsx
import { useSocket } from './context/SocketContext';

function ChatInput({ chatId }) {
  const { sendMessage } = useSocket();
  const [text, setText] = useState('');
  
  const handleSend = () => {
    sendMessage(chatId, text);
    setText('');
  };
  
  return <input value={text} onChange={e => setText(e.target.value)} />;
}
```

### Protected API Call
```jsx
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true // Send cookies
});

// Get user orders
const orders = await api.get('/orders');
```

---

## 🚀 Deployment

### Backend
1. Set environment variables on hosting platform
2. Ensure MongoDB is accessible
3. Deploy to Heroku/Railway/Render
4. Update CORS origin to production URL

### Frontend
1. Update `VITE_API_URL` to production backend
2. Build: `npm run build`
3. Deploy `dist/` folder to Vercel/Netlify
4. Update backend CORS to allow production domain

---

## 📝 License

This project is private and proprietary.

---

## 👨‍💻 Author

Rahul

---

## 🤝 Contributing

This is a private project. Contact the author for collaboration.
