import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
  </svg>
);
const CartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
  </svg>
);
const MenuIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);
const CloseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const dropRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : '?';

  return (
    <nav className="navbar">
      <div className="navbar__inner container">

        {/* Logo */}
        <Link to="/" className="navbar__logo">
          <span className="navbar__logo-icon">🛒</span>
          <span className="navbar__logo-text">LoopKart</span>
        </Link>

        {/* Search */}
        <div className="navbar__search">
          <span className="navbar__search-icon"><SearchIcon /></span>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="navbar__search-input"
          />
        </div>

        {/* Right actions */}
        <div className="navbar__actions">
          <button className="navbar__icon-btn" aria-label="Cart">
            <CartIcon />
            <span className="navbar__badge">3</span>
          </button>

          {/* User dropdown */}
          <div className="navbar__user" ref={dropRef}>
            <button className="navbar__avatar" onClick={() => setDropOpen((p) => !p)}>
              {initials}
            </button>
            {dropOpen && (
              <div className="navbar__dropdown animate-fadeIn">
                <div className="navbar__dropdown-header">
                  <p className="navbar__dropdown-name">{user?.name || 'User'}</p>
                  <p className="navbar__dropdown-email">{user?.email || ''}</p>
                </div>
                <div className="navbar__dropdown-divider" />
                <Link to="/profile" className="navbar__dropdown-item" onClick={() => setDropOpen(false)}>👤 My Profile</Link>
                <Link to="/orders"  className="navbar__dropdown-item" onClick={() => setDropOpen(false)}>📦 My Orders</Link>
                <div className="navbar__dropdown-divider" />
                <button className="navbar__dropdown-item navbar__dropdown-item--danger" onClick={handleLogout}>
                  🚪 Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <button className="navbar__hamburger" onClick={() => setMenuOpen((p) => !p)}>
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="navbar__mobile animate-fadeIn">
          <div className="navbar__mobile-search">
            <span className="navbar__search-icon"><SearchIcon /></span>
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="navbar__search-input"
            />
          </div>
          <Link to="/profile" className="navbar__mobile-item" onClick={() => setMenuOpen(false)}>👤 My Profile</Link>
          <Link to="/orders"  className="navbar__mobile-item" onClick={() => setMenuOpen(false)}>📦 My Orders</Link>
          <button className="navbar__mobile-item navbar__mobile-item--danger" onClick={handleLogout}>🚪 Logout</button>
        </div>
      )}
    </nav>
  );
}
