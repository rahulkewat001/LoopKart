import Navbar from '../../components/layout/Navbar';
import './HomePage.css';

/* ─── Mock Data ──────────────────────────────────────────────── */
const categories = [
  { id: 1, icon: '📱', label: 'Electronics' },
  { id: 2, icon: '👗', label: 'Fashion' },
  { id: 3, icon: '🏠', label: 'Home & Living' },
  { id: 4, icon: '💄', label: 'Beauty' },
  { id: 5, icon: '🏋️', label: 'Sports' },
  { id: 6, icon: '📚', label: 'Books' },
  { id: 7, icon: '🧸', label: 'Toys' },
  { id: 8, icon: '🍳', label: 'Kitchen' },
];

const products = [
  { id: 1,  name: 'Wireless Noise-Cancelling Headphones', price: 2999,  originalPrice: 4999,  rating: 4.5, reviews: 1240, badge: 'Best Seller', emoji: '🎧' },
  { id: 2,  name: 'Smart Watch Series 5 Pro',             price: 5499,  originalPrice: 7999,  rating: 4.7, reviews: 856,  badge: 'New',         emoji: '⌚' },
  { id: 3,  name: 'Running Shoes Ultra Boost',            price: 1799,  originalPrice: 2999,  rating: 4.3, reviews: 2100, badge: 'Sale',         emoji: '👟' },
  { id: 4,  name: 'Portable Bluetooth Speaker',           price: 1299,  originalPrice: 1999,  rating: 4.6, reviews: 678,  badge: null,           emoji: '🔊' },
  { id: 5,  name: 'Organic Face Serum 30ml',              price: 899,   originalPrice: 1499,  rating: 4.8, reviews: 3200, badge: 'Top Rated',    emoji: '✨' },
  { id: 6,  name: 'Stainless Steel Water Bottle',         price: 499,   originalPrice: 799,   rating: 4.4, reviews: 540,  badge: null,           emoji: '🍶' },
  { id: 7,  name: 'Mechanical Gaming Keyboard',           price: 3499,  originalPrice: 4999,  rating: 4.6, reviews: 920,  badge: 'Hot',          emoji: '⌨️' },
  { id: 8,  name: 'Yoga Mat Premium Non-Slip',            price: 699,   originalPrice: 1199,  rating: 4.5, reviews: 1560, badge: null,           emoji: '🧘' },
];

const features = [
  { icon: '🚚', title: 'Free Delivery',    desc: 'On orders above ₹499' },
  { icon: '🔄', title: 'Easy Returns',     desc: '30-day hassle-free returns' },
  { icon: '🔒', title: 'Secure Payments',  desc: '100% safe & encrypted' },
  { icon: '🎧', title: '24/7 Support',     desc: 'Always here to help you' },
];

/* ─── Star Rating ────────────────────────────────────────────── */
const Stars = ({ rating }) => {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5;
  return (
    <span className="stars">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < full ? 'star star--full' : (i === full && half ? 'star star--half' : 'star star--empty')}>★</span>
      ))}
    </span>
  );
};

/* ─── Discount % ─────────────────────────────────────────────── */
const discount = (price, original) => Math.round((1 - price / original) * 100);

export default function HomePage() {
  return (
    <div className="home">
      <Navbar />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__content animate-fadeUp">
            <span className="hero__tag">🔥 New Arrivals Every Day</span>
            <h1 className="hero__title">
              Shop Smart,<br />
              <span className="hero__title-accent">Live Better</span>
            </h1>
            <p className="hero__desc">
              Discover thousands of products at unbeatable prices. From electronics to fashion — everything you need, delivered fast.
            </p>
            <div className="hero__cta">
              <button className="btn-hero-primary">Shop Now →</button>
              <button className="btn-hero-ghost">View Deals</button>
            </div>
            <div className="hero__stats">
              <div className="hero__stat"><strong>50K+</strong><span>Products</span></div>
              <div className="hero__stat-divider" />
              <div className="hero__stat"><strong>2M+</strong><span>Customers</span></div>
              <div className="hero__stat-divider" />
              <div className="hero__stat"><strong>4.8★</strong><span>Rating</span></div>
            </div>
          </div>
          <div className="hero__visual animate-fadeIn">
            <div className="hero__blob" />
            <div className="hero__emoji-grid">
              {['🎧','⌚','👟','💄','📱','🏠','📚','🧸'].map((e, i) => (
                <div key={i} className="hero__emoji-card" style={{ animationDelay: `${i * 0.08}s` }}>{e}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Categories ───────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <h2 className="section__title">Shop by Category</h2>
          <div className="categories">
            {categories.map((cat) => (
              <button key={cat.id} className="category-card">
                <span className="category-card__icon">{cat.icon}</span>
                <span className="category-card__label">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Products ─────────────────────────────────────────── */}
      <section className="section section--muted">
        <div className="container">
          <div className="section__header">
            <h2 className="section__title">Trending Products</h2>
            <button className="section__link">View all →</button>
          </div>
          <div className="products">
            {products.map((p) => (
              <div key={p.id} className="product-card">
                {p.badge && <span className="product-card__badge">{p.badge}</span>}
                <div className="product-card__img">{p.emoji}</div>
                <div className="product-card__body">
                  <p className="product-card__name">{p.name}</p>
                  <div className="product-card__rating">
                    <Stars rating={p.rating} />
                    <span className="product-card__reviews">({p.reviews.toLocaleString()})</span>
                  </div>
                  <div className="product-card__pricing">
                    <span className="product-card__price">₹{p.price.toLocaleString()}</span>
                    <span className="product-card__original">₹{p.originalPrice.toLocaleString()}</span>
                    <span className="product-card__discount">{discount(p.price, p.originalPrice)}% off</span>
                  </div>
                  <button className="product-card__btn">Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Banner ───────────────────────────────────────────── */}
      <section className="banner">
        <div className="container banner__inner">
          <div className="banner__content">
            <span className="banner__tag">Limited Time Offer</span>
            <h2 className="banner__title">Get 40% Off on Electronics</h2>
            <p className="banner__desc">Use code <strong>LOOP40</strong> at checkout. Valid till stocks last.</p>
            <button className="btn-hero-primary">Grab the Deal →</button>
          </div>
          <div className="banner__emoji">⚡</div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="features">
            {features.map((f, i) => (
              <div key={i} className="feature-card">
                <span className="feature-card__icon">{f.icon}</span>
                <div>
                  <p className="feature-card__title">{f.title}</p>
                  <p className="feature-card__desc">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="footer">
        <div className="container footer__inner">
          <div className="footer__brand">
            <span>🛒</span>
            <span className="footer__brand-name">LoopKart</span>
          </div>
          <p className="footer__copy">© 2025 LoopKart. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
