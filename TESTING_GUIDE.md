# 🧪 Testing Guide - LoopKart Checkout System

Complete testing scenarios for the checkout and payment system.

---

## 🎯 Testing Overview

This guide covers:
- ✅ Functional testing
- ✅ Payment gateway testing
- ✅ UI/UX testing
- ✅ Security testing
- ✅ Performance testing
- ✅ Mobile testing

---

## 🔐 Test Accounts

### Razorpay Test Mode

**Test Cards:**
```
Success Card:
Number: 4111 1111 1111 1111
CVV: 123
Expiry: 12/25
Name: Test User

Failure Card:
Number: 4000 0000 0000 0002
CVV: 123
Expiry: 12/25

Authentication Required:
Number: 4000 0027 6000 3184
CVV: 123
Expiry: 12/25
```

**Test UPI:**
```
Success: success@razorpay
Failure: failure@razorpay
```

**Test Net Banking:**
```
Select any bank
Use test credentials provided by Razorpay
```

---

## 📋 Test Scenarios

### Scenario 1: Complete Checkout Flow (Happy Path)

**Steps:**
1. Login to application
2. Add 2-3 products to cart
3. Go to cart page
4. Click "Proceed to Checkout"
5. Fill address form:
   ```
   Full Name: John Doe
   Phone: 9876543210
   Street: 123 MG Road
   City: Mumbai
   State: Maharashtra
   Pincode: 400001
   ```
6. Click "Continue to Payment"
7. Select UPI payment
8. Enter UPI ID: `success@razorpay`
9. Click "Pay Now"
10. Complete payment in Razorpay popup
11. Verify success screen appears
12. Check order in "My Orders"

**Expected Result:**
- ✅ Address validated correctly
- ✅ Payment popup opens
- ✅ Payment successful
- ✅ Order created in database
- ✅ Success animation shown
- ✅ Redirected to orders page
- ✅ Cart cleared

---

### Scenario 2: Card Payment

**Steps:**
1. Follow steps 1-6 from Scenario 1
2. Select "Credit / Debit Card"
3. Enter card details:
   ```
   Card Number: 4111111111111111
   Name: Test User
   Expiry: 12/25
   CVV: 123
   ```
4. Click "Pay Now"
5. Complete payment

**Expected Result:**
- ✅ Card form appears
- ✅ Input validation works
- ✅ Payment successful
- ✅ Order created

---

### Scenario 3: Cash on Delivery

**Steps:**
1. Follow steps 1-6 from Scenario 1
2. Select "Cash on Delivery"
3. Click "Place Order (COD)"

**Expected Result:**
- ✅ No payment popup
- ✅ Order created immediately
- ✅ Payment status: "pending"
- ✅ Success screen shown

---

### Scenario 4: Address Validation

**Test Invalid Phone:**
```
Phone: 123 (less than 10 digits)
Expected: Error message "Enter a valid 10-digit phone number"
```

**Test Invalid Pincode:**
```
Pincode: 123 (less than 6 digits)
Expected: Error message "Enter a valid 6-digit pincode"
```

**Test Empty Fields:**
```
Leave any field empty
Expected: Error message "Please fill in all address fields"
```

---

### Scenario 5: Payment Failure

**Steps:**
1. Follow checkout flow
2. Use failure card: `4000 0000 0000 0002`
3. Attempt payment

**Expected Result:**
- ✅ Payment fails
- ✅ Error message shown
- ✅ User can retry
- ✅ Order not created

---

### Scenario 6: Payment Cancellation

**Steps:**
1. Follow checkout flow
2. Open Razorpay popup
3. Click "X" to close popup

**Expected Result:**
- ✅ Popup closes
- ✅ User returns to checkout
- ✅ Can retry payment
- ✅ Order not created

---

### Scenario 7: Multiple Items in Cart

**Steps:**
1. Add 5 different products
2. Update quantities (2x, 3x, etc.)
3. Proceed to checkout
4. Verify order summary

**Expected Result:**
- ✅ All items shown in summary
- ✅ Quantities correct
- ✅ Total calculated correctly
- ✅ Free delivery shown

---

### Scenario 8: Edit Address

**Steps:**
1. Fill address form
2. Click "Continue to Payment"
3. Click "Change Address"
4. Modify address
5. Continue again

**Expected Result:**
- ✅ Returns to address form
- ✅ Previous data retained
- ✅ Can edit and continue
- ✅ Updated address shown in summary

---

### Scenario 9: Empty Cart Checkout

**Steps:**
1. Go to checkout URL directly with empty cart

**Expected Result:**
- ✅ Redirected to cart page
- ✅ "Cart is empty" message shown

---

### Scenario 10: Session Timeout

**Steps:**
1. Start checkout
2. Wait for JWT token to expire
3. Try to place order

**Expected Result:**
- ✅ Redirected to login
- ✅ Cart data preserved
- ✅ Can resume after login

---

## 🎨 UI/UX Testing

### Visual Testing Checklist

**Desktop (1920x1080):**
- [ ] Layout is centered
- [ ] Two-column layout visible
- [ ] All text readable
- [ ] Images load correctly
- [ ] Buttons properly sized
- [ ] No horizontal scroll

**Tablet (768x1024):**
- [ ] Single column layout
- [ ] Touch targets large enough
- [ ] Forms easy to fill
- [ ] Summary card at bottom

**Mobile (375x667):**
- [ ] All content visible
- [ ] No text cutoff
- [ ] Buttons full width
- [ ] Easy to scroll
- [ ] Keyboard doesn't hide inputs

### Animation Testing
- [ ] Progress steps animate smoothly
- [ ] Payment cards slide in
- [ ] Success checkmark scales in
- [ ] Loading spinner rotates
- [ ] Hover effects work

### Accessibility Testing
- [ ] Tab navigation works
- [ ] Focus indicators visible
- [ ] Color contrast sufficient
- [ ] Screen reader compatible
- [ ] Keyboard shortcuts work

---

## 🔒 Security Testing

### Test Cases

**1. SQL Injection:**
```javascript
// Try in address fields
'; DROP TABLE orders; --
<script>alert('XSS')</script>

Expected: Input sanitized, no execution
```

**2. XSS Attack:**
```javascript
// Try in name field
<img src=x onerror=alert('XSS')>

Expected: HTML escaped, rendered as text
```

**3. Payment Signature Tampering:**
```javascript
// Modify razorpay_signature in request
Expected: Payment verification fails
```

**4. Unauthorized Access:**
```javascript
// Try accessing checkout without login
Expected: Redirected to login page
```

**5. CSRF Protection:**
```javascript
// Try making request from different origin
Expected: CORS error
```

---

## ⚡ Performance Testing

### Load Time Testing

**Metrics to Check:**
```
Page Load: < 3 seconds
Time to Interactive: < 2 seconds
First Contentful Paint: < 1 second
API Response: < 500ms
```

**Tools:**
- Chrome DevTools (Network tab)
- Lighthouse
- WebPageTest

### Stress Testing

**Test Scenarios:**
1. 100 items in cart
2. Rapid form submissions
3. Multiple payment attempts
4. Slow network (3G)

---

## 📱 Mobile Testing

### Devices to Test

**iOS:**
- [ ] iPhone 13 Pro (Safari)
- [ ] iPhone SE (Safari)
- [ ] iPad Pro (Safari)

**Android:**
- [ ] Samsung Galaxy S21 (Chrome)
- [ ] Google Pixel 6 (Chrome)
- [ ] OnePlus 9 (Chrome)

### Mobile-Specific Tests

**1. Touch Interactions:**
- [ ] Tap targets > 44px
- [ ] Swipe gestures work
- [ ] Pinch to zoom disabled on forms

**2. Keyboard Behavior:**
- [ ] Keyboard doesn't hide inputs
- [ ] "Next" button moves to next field
- [ ] "Done" submits form

**3. Orientation:**
- [ ] Portrait mode works
- [ ] Landscape mode works
- [ ] Layout adjusts correctly

---

## 🔄 Integration Testing

### Backend Integration

**Test Order Creation:**
```bash
# Check MongoDB
use loopkart
db.orders.find().pretty()

Expected: Order document with all fields
```

**Test Payment Verification:**
```bash
# Check backend logs
npm run dev

Expected: "Payment verified successfully" log
```

**Test Email Notifications:**
```bash
# Check email inbox
Expected: Order confirmation email received
```

---

## 📊 Test Results Template

### Test Execution Report

```
Test Date: [Date]
Tester: [Name]
Environment: [Dev/Staging/Prod]

Total Tests: 50
Passed: 48
Failed: 2
Blocked: 0

Pass Rate: 96%

Failed Tests:
1. Payment failure handling - Minor UI issue
2. Mobile keyboard overlap - Fixed

Notes:
- All critical paths working
- Minor UI improvements needed
- Ready for production
```

---

## 🐛 Bug Report Template

```markdown
**Bug Title:** Payment popup doesn't open on Safari

**Severity:** High
**Priority:** P1

**Steps to Reproduce:**
1. Open checkout on Safari
2. Fill address
3. Select UPI
4. Click "Pay Now"

**Expected Result:**
Razorpay popup should open

**Actual Result:**
Nothing happens, console shows error

**Environment:**
- Browser: Safari 15.0
- OS: macOS 12.0
- Device: MacBook Pro

**Screenshots:**
[Attach screenshot]

**Logs:**
```
Error: Razorpay is not defined
```

**Fix:**
Load Razorpay script before opening popup
```

---

## ✅ Pre-Production Checklist

### Functional Tests
- [ ] All payment methods work
- [ ] Address validation works
- [ ] Order creation successful
- [ ] Success screen appears
- [ ] Cart clears after order

### Security Tests
- [ ] JWT authentication working
- [ ] Payment signature verified
- [ ] CORS configured correctly
- [ ] No sensitive data exposed
- [ ] HTTPS enabled

### Performance Tests
- [ ] Page loads in < 3s
- [ ] API responds in < 500ms
- [ ] No memory leaks
- [ ] Images optimized

### Mobile Tests
- [ ] Works on iOS
- [ ] Works on Android
- [ ] Touch targets adequate
- [ ] Keyboard behavior correct

### Integration Tests
- [ ] Database connection stable
- [ ] Razorpay integration working
- [ ] Email notifications sent
- [ ] Logs captured correctly

---

## 🎯 Acceptance Criteria

### Must Have (P0)
- ✅ User can complete checkout
- ✅ Payment processing works
- ✅ Orders saved to database
- ✅ Success confirmation shown

### Should Have (P1)
- ✅ Address validation
- ✅ Multiple payment methods
- ✅ Mobile responsive
- ✅ Loading states

### Nice to Have (P2)
- ✅ Animations
- ✅ Progress indicator
- ✅ Address editing
- ✅ Payment method icons

---

## 📞 Support

### If Tests Fail

1. **Check Logs:**
   ```bash
   # Backend logs
   cd backend && npm run dev
   
   # Frontend console
   Open DevTools → Console
   ```

2. **Verify Configuration:**
   ```bash
   # Check .env files
   cat backend/.env
   cat frontend/.env
   ```

3. **Test API Directly:**
   ```bash
   # Use Postman or curl
   curl -X POST http://localhost:5000/api/payment/create-order \
     -H "Content-Type: application/json" \
     -d '{"amount": 100}'
   ```

---

## 🎉 Testing Complete!

Once all tests pass:
1. Document results
2. Get stakeholder approval
3. Deploy to production
4. Monitor first transactions

**Happy Testing! 🚀**
