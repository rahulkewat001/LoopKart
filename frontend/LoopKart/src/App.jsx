import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import HomePage from './pages/home/HomePage'

// ─── Route guard for logged-in users ─────────────────────────
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth()
  if (loading) return <div className="page-loader">Loading...</div>
  return user ? children : <Navigate to="/login" replace />
}

// ─── Redirect logged-in users away from auth pages ───────────
const GuestRoute = ({ children }) => {
  const { user, loading } = useAuth()
  if (loading) return <div className="page-loader">Loading...</div>
  return user ? <Navigate to="/" replace /> : children
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth pages */}
        <Route path="/login"    element={<GuestRoute><LoginPage /></GuestRoute>} />
        <Route path="/register" element={<GuestRoute><RegisterPage /></GuestRoute>} />

        <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}