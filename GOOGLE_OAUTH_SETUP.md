# Google OAuth Setup Instructions

## Step 1: Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google+ API"
   - Click "Enable"

4. Create OAuth 2.0 credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth client ID"
   - Select "Web application"
   - Add authorized JavaScript origins:
     - `http://localhost:5173` (for development)
     - Your production URL (when deploying)
   - Add authorized redirect URIs:
     - `http://localhost:5173` (for development)
     - Your production URL (when deploying)
   - Click "Create"
   - Copy the "Client ID"

## Step 2: Update Frontend Configuration

1. Open `frontend/src/main.jsx`
2. Replace `YOUR_GOOGLE_CLIENT_ID` with your actual Google Client ID:
   ```javascript
   <GoogleOAuthProvider clientId="YOUR_ACTUAL_CLIENT_ID_HERE">
   ```

## Step 3: Test the Integration

1. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```

2. Start the frontend server:
   ```bash
   cd frontend
   npm run dev
   ```

3. Navigate to the login or registration page
4. Click the "Continue with Google" button
5. Sign in with your Google account
6. You should be redirected to the home page

## How It Works

### Frontend Flow:
1. User clicks "Continue with Google"
2. Google OAuth popup appears
3. User authenticates with Google
4. Google returns a JWT credential
5. Frontend decodes the JWT to extract user info (email, name, googleId, avatar)
6. Frontend sends this data to backend `/api/auth/google` endpoint
7. Backend creates/updates user and returns access/refresh tokens
8. Frontend saves tokens and redirects to home page

### Backend Flow:
1. Receives Google user data (email, name, googleId, avatar)
2. Checks if user exists by email
3. If new user: Creates account with Google data
4. If existing user: Links Google account to existing user
5. Generates JWT access and refresh tokens
6. Returns user data and tokens

## Security Notes

- Never commit your Google Client ID to public repositories
- Use environment variables for production
- The backend generates a random password for Google users (they won't use it)
- Google ID is stored to link accounts

## Troubleshooting

### "Invalid Client ID" Error
- Make sure you copied the correct Client ID
- Check that your domain is added to authorized JavaScript origins

### "Redirect URI Mismatch" Error
- Add your exact URL to authorized redirect URIs in Google Console
- Include both `http://localhost:5173` and your production URL

### "Google Login Failed" Error
- Check backend logs for detailed error messages
- Ensure MongoDB is running
- Verify backend is accessible at the API URL

## Production Deployment

1. Add your production domain to Google Console:
   - Authorized JavaScript origins: `https://yourdomain.com`
   - Authorized redirect URIs: `https://yourdomain.com`

2. Update frontend environment variable:
   - Create `.env.production` file
   - Add: `VITE_GOOGLE_CLIENT_ID=your_client_id`

3. Update main.jsx to use environment variable:
   ```javascript
   <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
   ```
