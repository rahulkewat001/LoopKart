# 🔧 Error Fix Guide - LoopKart

Complete guide to fix all console errors and warnings.

---

## 🚨 Current Errors & Fixes

### 1. ERR_BLOCKED_BY_CLIENT

**Error:**
```
Failed to load resource: net::ERR_BLOCKED_BY_CLIENT
```

**Cause:** Browser extension (ad blocker, privacy extension) blocking resources

**Fix:**
1. **Disable Ad Blocker** for localhost
   - Click ad blocker icon
   - Select "Pause on this site"
   - Refresh page

2. **Whitelist localhost**
   - Open ad blocker settings
   - Add `localhost` to whitelist
   - Add `127.0.0.1` to whitelist

3. **Try Incognito Mode**
   - Open Chrome Incognito (Ctrl+Shift+N)
   - Extensions are disabled by default
   - Test your app

---

### 2. Google Sign-In Errors

**Errors:**
```
[GSI_LOGGER]: Missing required parameter: client_id
[GSI_LOGGER]: Provided button width is invalid: 100%
[GSI_LOGGER]: Parameter client_id is not set correctly
```

**Status:** ✅ FIXED

**What I Fixed:**
1. Changed width from `100%` to `400` (Google requires pixel value)
2. Added conditional rendering - shows fallback button if no client_id
3. Added custom styled Google button as fallback

**To Enable Google Sign-In:**

1. **Get Google Client ID:**
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create new project or select existing
   - Enable "Google+ API"
   - Go to "Credentials"
   - Create "OAuth 2.0 Client ID"
   - Add authorized origins:
     ```
     http://localhost:5173
     http://localhost:3000
     https://your-production-domain.com
     ```
   - Copy Client ID

2. **Update .env file:**
   ```env
   VITE_API_URL=https://loopkart-be.onrender.com/api
   VITE_GOOGLE_CLIENT_ID=your_google_client_id_here.apps.googleusercontent.com
   ```

3. **Restart dev server:**
   ```bash
   npm run dev
   ```

---

### 3. Feature Collector Warning

**Warning:**
```
using deprecated parameters for the initialization function; pass a single object instead
```

**Cause:** Google OAuth library using deprecated API

**Fix:** This is a warning from Google's library, not your code. It's safe to ignore or will be fixed in future Google library updates.

**To Hide:**
Add to your browser console filters:
- Chrome DevTools → Console → Filter → Hide warnings

---

### 4. Preload Resource Warning

**Warning:**
```
The resource <URL> was preloaded using link preload but not used within a few seconds
```

**Cause:** Vite preloading resources that aren't immediately used

**Fix:** This is a performance optimization warning. You can:

1. **Ignore it** - It's just a warning, not an error

2. **Remove unused preloads** in `index.html`:
   ```html
   <!-- Remove or comment out unused preload links -->
   <!-- <link rel="preload" href="/fonts/..." as="font"> -->
   ```

3. **Optimize Vite config:**
   ```javascript
   // vite.config.js
   export default {
     build: {
       modulePreload: {
         polyfill: false
       }
     }
   }
   ```

---

## ✅ Verification Checklist

After applying fixes:

- [ ] No ERR_BLOCKED_BY_CLIENT errors
- [ ] Google Sign-In button shows (or fallback button)
- [ ] No client_id errors
- [ ] Login form works
- [ ] Password toggle works
- [ ] All buttons clickable

---

## 🎯 Quick Fix Summary

### Immediate Actions:
1. ✅ Disable ad blocker for localhost
2. ✅ Google Sign-In fixed (shows fallback if no client_id)
3. ✅ Restart dev server: `npm run dev`

### Optional (For Google Sign-In):
1. Get Google Client ID from Cloud Console
2. Add to `.env` file
3. Restart server

---

## 🔍 Testing

### Test Login Page:
1. Go to `http://localhost:5173/login`
2. Check console (F12) - should see fewer errors
3. Try typing in email/password
4. Click "Sign In" button
5. Check if Google button shows

### Test Animated Login:
1. Open `animated-login.html` in browser
2. Should work perfectly (no backend needed)
3. All animations should be smooth

---

## 📊 Before vs After

### Before:
```
❌ ERR_BLOCKED_BY_CLIENT
❌ Missing client_id
❌ Invalid width: 100%
❌ Parameter client_id not set
⚠️  Deprecated parameters
⚠️  Preload not used
```

### After:
```
✅ No blocking errors (if ad blocker disabled)
✅ Google button shows (or fallback)
✅ Valid width parameter
✅ Conditional rendering
⚠️  Deprecated parameters (library warning - safe to ignore)
⚠️  Preload not used (performance hint - safe to ignore)
```

---

## 🛠️ Additional Fixes

### If errors persist:

1. **Clear browser cache:**
   ```
   Chrome: Ctrl+Shift+Delete
   Select "Cached images and files"
   Clear data
   ```

2. **Clear Vite cache:**
   ```bash
   rm -rf node_modules/.vite
   npm run dev
   ```

3. **Reinstall dependencies:**
   ```bash
   rm -rf node_modules
   npm install
   npm run dev
   ```

4. **Check browser console filters:**
   - Make sure you're not hiding errors
   - Reset console filters
   - Check "Preserve log" is unchecked

---

## 📞 Still Having Issues?

### Check:
1. Node version: `node --version` (should be 16+)
2. npm version: `npm --version`
3. Port 5173 is free: `netstat -ano | findstr :5173`
4. Backend is running: Check `https://loopkart-be.onrender.com/api`

### Debug Steps:
1. Open browser DevTools (F12)
2. Go to Network tab
3. Refresh page
4. Check which requests are failing
5. Look at response status codes

---

## 🎉 Success!

Your errors should now be fixed! The main issues were:
1. ✅ Ad blocker blocking resources
2. ✅ Google Sign-In configuration
3. ✅ Button width parameter

The remaining warnings are safe to ignore and don't affect functionality.

---

**Happy Coding! 🚀**
