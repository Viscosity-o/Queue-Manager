import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/api';

/* ─── Google Fonts ─── */
const GoogleFonts = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display:ital@0;1&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
    rel="stylesheet"
  />
);

/* ─── Types ─── */
interface MenuItem {
  menuItemId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isAvailable: boolean;
  stockStatus: string;
}

interface CartItem extends MenuItem {
  quantity: number;
}

interface LocationState {
  canteenId: string;
  canteenName: string;
}

/* ─── Design tokens (inline, no Tailwind) ─── */
const TOKEN = {
  brand: '#0F2318',
  brandHover: '#1a3a28',
  bg: '#F5F4F0',
  surface: '#ffffff',
  border: 'rgba(0,0,0,0.07)',
  borderFocus: 'rgba(15,35,24,0.30)',
  focusRing: '0 0 0 3px rgba(15,35,24,0.06)',
  textPrimary: '#111110',
  textSecondary: '#6b6a64',
  textMuted: '#9e9d97',
  success: '#1a6b3c',
  successBg: '#eaf4ee',
  successText: '#145c31',
  danger: '#b73a2e',
  dangerBg: '#fdf0ee',
  dangerText: '#8f2c22',
  radius: '12px',
  radiusLg: '14px',
  shadow: '0 12px 32px rgba(0,0,0,0.09)',
} as const;

/* ─── Shared sub-components ─── */

const Icon = ({ name, size = 20, style }: { name: string; size?: number; style?: React.CSSProperties }) => (
  <span
    className="material-symbols-outlined"
    style={{ fontSize: size, lineHeight: 1, verticalAlign: 'middle', ...style }}
    aria-hidden="true"
  >
    {name}
  </span>
);

const Badge = ({
  children,
  variant = 'neutral',
}: {
  children: React.ReactNode;
  variant?: 'neutral' | 'success' | 'danger' | 'brand';
}) => {
  const styles: Record<string, React.CSSProperties> = {
    neutral: { background: '#f0efeb', color: TOKEN.textSecondary },
    success: { background: TOKEN.successBg, color: TOKEN.successText },
    danger: { background: TOKEN.dangerBg, color: TOKEN.dangerText },
    brand: { background: '#e8ede9', color: TOKEN.brand },
  };
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        padding: '3px 10px',
        borderRadius: 20,
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: '0.09em',
        textTransform: 'uppercase',
        ...styles[variant],
      }}
    >
      {children}
    </span>
  );
};

/* ─── Main Component ─── */
const CanteenMenu: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;

  const [cart, setCart] = useState<CartItem[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [canteenName] = useState(state?.canteenName || 'Canteen');

  useEffect(() => {
    if (!state?.canteenId) {
      setError('No canteen selected');
      setLoading(false);
      return;
    }
    fetchMenuItems();
  }, [state?.canteenId]);

  const fetchMenuItems = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) { setError('Please login to view menu'); setLoading(false); return; }
      const response = await fetch(API_ENDPOINTS.STUDENT_CANTEEN_MENU(state.canteenId), {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('Failed to fetch menu items');
      const data = await response.json();
      setMenuItems(data);
      if (data.length > 0) setActiveCategory(data[0].category);
    } catch (err) {
      console.error('Error fetching menu:', err);
      setError('Failed to load menu items');
    } finally {
      setLoading(false);
    }
  };

  const categories = [...new Set(menuItems.map(item => item.category))];
  const featuredItem = menuItems.find(item => item.isAvailable) || menuItems[0];

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(c => c.menuItemId === item.menuItemId);
      if (existing) return prev.map(c => c.menuItemId === item.menuItemId ? { ...c, quantity: c.quantity + 1 } : c);
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => setCart(prev => prev.filter(c => c.menuItemId !== id));

  const updateQty = (id: string, delta: number) => {
    setCart(prev =>
      prev
        .map(c => c.menuItemId === id ? { ...c, quantity: c.quantity + delta } : c)
        .filter(c => c.quantity > 0)
    );
  };

  const getTotalItems = () => cart.reduce((s, i) => s + i.quantity, 0);
  const getTotalPrice = () => cart.reduce((s, i) => s + i.price * i.quantity, 0);

  const filteredItems = activeCategory
    ? menuItems.filter(item => item.category === activeCategory)
    : menuItems;

  /* ── Loader ── */
  if (loading) {
    return (
      <>
        <GoogleFonts />
        <div style={{ minHeight: '100vh', background: TOKEN.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'DM Sans', sans-serif" }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: 40, height: 40, border: `2px solid ${TOKEN.border}`, borderTop: `2px solid ${TOKEN.brand}`, borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
            <p style={{ fontSize: 14, color: TOKEN.textSecondary }}>Loading menu…</p>
          </div>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </>
    );
  }

  /* ── Error ── */
  if (error) {
    return (
      <>
        <GoogleFonts />
        <div style={{ minHeight: '100vh', background: TOKEN.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'DM Sans', sans-serif" }}>
          <div style={{ textAlign: 'center', padding: 32 }}>
            <Icon name="error_outline" size={40} style={{ color: TOKEN.danger, marginBottom: 16 }} />
            <p style={{ color: TOKEN.textPrimary, marginBottom: 24, fontSize: 15 }}>{error}</p>
            <button onClick={() => navigate('/student-dashboard')} style={primaryBtn}>← Back to Dashboard</button>
          </div>
        </div>
      </>
    );
  }

  if (menuItems.length === 0) {
    return (
      <>
        <GoogleFonts />
        <div style={{ minHeight: '100vh', background: TOKEN.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'DM Sans', sans-serif" }}>
          <div style={{ textAlign: 'center', padding: 32 }}>
            <Icon name="restaurant_menu" size={40} style={{ color: TOKEN.textMuted, marginBottom: 16 }} />
            <p style={{ color: TOKEN.textSecondary, marginBottom: 24, fontSize: 15 }}>No menu items available for this canteen.</p>
            <button onClick={() => navigate('/student-dashboard')} style={primaryBtn}>← Back to Dashboard</button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <GoogleFonts />
      <style>{globalStyles}</style>

      {/* ─── Fixed Sidebar ─── */}
      <nav style={sidebarStyle}>
        {/* Logo block */}
        <div style={{ width: 36, height: 36, borderRadius: 10, background: TOKEN.brand, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
          <Icon name="local_dining" size={18} style={{ color: '#fff' }} />
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4, marginTop: 8 }}>
          {[
            { icon: 'home', label: 'Dashboard', action: () => navigate('/student-dashboard') },
            { icon: 'restaurant_menu', label: 'Menu', action: () => {}, active: true },
            { icon: 'receipt_long', label: 'Orders', action: () => navigate('/orders') },
            { icon: 'account_circle', label: 'Profile', action: () => navigate('/profile') },
          ].map(item => (
            <button
              key={item.label}
              title={item.label}
              onClick={item.action}
              style={{
                width: 40, height: 40, borderRadius: 10, border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: item.active ? '#f0f3f1' : 'transparent',
                color: item.active ? TOKEN.brand : TOKEN.textMuted,
                transition: 'background 0.15s, color 0.15s',
              }}
              onMouseEnter={e => { if (!item.active) { (e.currentTarget as HTMLButtonElement).style.background = '#f5f4f0'; (e.currentTarget as HTMLButtonElement).style.color = TOKEN.brand; } }}
              onMouseLeave={e => { if (!item.active) { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; (e.currentTarget as HTMLButtonElement).style.color = TOKEN.textMuted; } }}
            >
              <Icon name={item.icon} size={20} />
            </button>
          ))}
        </div>

        {/* Logout */}
        <button
          title="Log out"
          onClick={() => navigate('/logout')}
          style={{ width: 40, height: 40, borderRadius: 10, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', color: TOKEN.textMuted, transition: 'all 0.15s' }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = TOKEN.dangerBg; (e.currentTarget as HTMLButtonElement).style.color = TOKEN.danger; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; (e.currentTarget as HTMLButtonElement).style.color = TOKEN.textMuted; }}
        >
          <Icon name="logout" size={20} />
        </button>
      </nav>

      {/* ─── Fixed Top Bar ─── */}
      <header style={topbarStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: TOKEN.textMuted }}>
          <Icon name="home" size={14} />
          <span style={{ fontWeight: 400 }}>Dashboard</span>
          <Icon name="chevron_right" size={14} />
          <span style={{ fontWeight: 400 }}>Canteens</span>
          <Icon name="chevron_right" size={14} />
          <span style={{ color: TOKEN.textPrimary, fontWeight: 500 }}>{canteenName}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 32, marginLeft: 'auto' }}>
          {/* Search */}
          <div style={{ position: 'relative' }}>
            <Icon name="search" size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: TOKEN.textMuted }} />
            <input
              placeholder="Search items…"
              style={{
                background: '#f8f7f4', border: `1px solid rgba(0,0,0,0.08)`, borderRadius: 10,
                padding: '8px 12px 8px 36px', fontSize: 13, color: TOKEN.textPrimary,
                outline: 'none', width: 220, height: 36,
              }}
              onFocus={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = TOKEN.borderFocus; e.currentTarget.style.boxShadow = TOKEN.focusRing; }}
              onBlur={e => { e.currentTarget.style.background = '#f8f7f4'; e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)'; e.currentTarget.style.boxShadow = 'none'; }}
            />
          </div>

          {/* Cart toggle */}
          <button
            onClick={() => setCartOpen(o => !o)}
            style={{ ...ghostBtn, position: 'relative', gap: 8 }}
          >
            <Icon name="shopping_cart" size={18} />
            <span style={{ fontSize: 13, fontWeight: 500 }}>Cart</span>
            {getTotalItems() > 0 && (
              <span style={{ position: 'absolute', top: -4, right: -4, width: 18, height: 18, borderRadius: '50%', background: TOKEN.brand, color: '#fff', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {getTotalItems()}
              </span>
            )}
          </button>

          {/* User avatar */}
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#e8ede9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600, color: TOKEN.brand }}>
            ST
          </div>
        </div>
      </header>

      {/* ─── Page Shell ─── */}
      <div style={{ marginLeft: 64, marginTop: 56, background: TOKEN.bg, minHeight: 'calc(100vh - 56px)', fontFamily: "'DM Sans', sans-serif" }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 40px 60px' }}>

          {/* ─── Hero ─── */}
          <section style={{ paddingTop: 40, paddingBottom: 32, borderBottom: `1px solid ${TOKEN.border}` }}>
            <Badge variant="brand"><Icon name="school" size={11} style={{ marginRight: 2 }} />Campus Dining</Badge>
            <h1 style={{ margin: '12px 0 6px', fontSize: 40, fontFamily: "'DM Serif Display', serif", fontStyle: 'italic', color: TOKEN.textPrimary, letterSpacing: '-0.01em', lineHeight: 1.15 }}>
              {canteenName}
            </h1>
            <p style={{ fontSize: 14, color: TOKEN.textSecondary, margin: 0, maxWidth: 480, lineHeight: 1.7 }}>
              Browse today's menu, add dishes to your cart, and check out in a few quick clicks.
            </p>
          </section>

          {/* ─── Stats strip ─── */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, padding: '24px 0', borderBottom: `1px solid ${TOKEN.border}` }}>
            {[
              { label: 'Menu items', value: menuItems.length, icon: 'restaurant_menu' },
              { label: 'Categories', value: categories.length, icon: 'category' },
              { label: 'Available', value: menuItems.filter(i => i.isAvailable).length, icon: 'check_circle' },
              { label: 'Cart items', value: getTotalItems(), icon: 'shopping_cart' },
            ].map(stat => (
              <div key={stat.label} style={{ background: TOKEN.surface, border: `1px solid ${TOKEN.border}`, borderRadius: TOKEN.radius, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: '#f0f3f1', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon name={stat.icon} size={18} style={{ color: TOKEN.brand }} />
                </div>
                <div>
                  <p style={{ fontSize: 11, fontWeight: 600, color: TOKEN.textMuted, textTransform: 'uppercase', letterSpacing: '0.09em', margin: 0 }}>{stat.label}</p>
                  <p style={{ fontSize: 22, fontWeight: 600, color: TOKEN.textPrimary, margin: '2px 0 0', lineHeight: 1 }}>{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ─── Two-col layout ─── */}
          <div style={{ display: 'grid', gridTemplateColumns: cartOpen ? '1fr 340px' : '1fr', gap: 24, marginTop: 32, alignItems: 'start' }}>

            {/* ─── Left: menu ─── */}
            <div>
              {/* Featured */}
              {featuredItem && (
                <div style={{
                  background: TOKEN.brand, borderRadius: TOKEN.radiusLg,
                  overflow: 'hidden', marginBottom: 32,
                  display: 'grid', gridTemplateColumns: featuredItem.image ? '1fr 280px' : '1fr',
                }}>
                  <div style={{ padding: '32px 32px 32px 32px' }}>
                    <Badge variant="success" ><Icon name="star" size={11} style={{ marginRight: 2 }} />Featured today</Badge>
                    <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 30, color: '#fff', margin: '16px 0 10px', lineHeight: 1.2 }}>
                      {featuredItem.name}
                    </h2>
                    <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', margin: '0 0 24px', lineHeight: 1.7, maxWidth: 360 }}>
                      {featuredItem.description || 'Freshly prepared and ready to order.'}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ fontSize: 22, fontWeight: 600, color: '#fff' }}>₹{featuredItem.price.toFixed(2)}</span>
                      <button
                        onClick={() => addToCart(featuredItem)}
                        style={{ height: 44, padding: '0 20px', borderRadius: 10, border: 'none', cursor: 'pointer', background: 'rgba(255,255,255,0.12)', color: '#fff', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, transition: 'background 0.15s' }}
                        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.20)')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.12)')}
                      >
                        <Icon name="add_shopping_cart" size={16} />
                        Add to cart
                      </button>
                    </div>
                  </div>
                  {featuredItem.image && (
                    <div style={{ overflow: 'hidden', position: 'relative' }}>
                      <img src={featuredItem.image} alt={featuredItem.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,25,16,0.5), transparent)' }} />
                    </div>
                  )}
                </div>
              )}

              {/* Category filter chips */}
              <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4, marginBottom: 24 }}>
                <button
                  onClick={() => setActiveCategory(null)}
                  style={chipStyle(activeCategory === null)}
                >
                  All items
                </button>
                {categories.map(cat => (
                  <button key={cat} onClick={() => setActiveCategory(cat)} style={chipStyle(activeCategory === cat)}>
                    {cat}
                  </button>
                ))}
              </div>

              {/* Category sections */}
              {(activeCategory ? [activeCategory] : categories).map(category => (
                <section key={category} style={{ marginBottom: 40 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 16 }}>
                    <h2 style={{ fontSize: 22, fontWeight: 600, color: TOKEN.textPrimary, margin: 0 }}>{category}</h2>
                    <span style={{ fontSize: 12, color: TOKEN.textMuted, fontWeight: 500 }}>
                      {menuItems.filter(i => i.category === category).length} items
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
                    {menuItems
                      .filter(item => item.category === category)
                      .map(item => {
                        const inCart = cart.find(c => c.menuItemId === item.menuItemId);
                        return (
                          <div
                            key={item.menuItemId}
                            className="menu-card"
                            style={{
                              background: TOKEN.surface,
                              border: `1px solid ${TOKEN.border}`,
                              borderRadius: TOKEN.radiusLg,
                              overflow: 'hidden',
                              opacity: item.isAvailable ? 1 : 0.55,
                            }}
                          >
                            {item.image ? (
                              <div style={{ height: 160, overflow: 'hidden', position: 'relative', background: '#f0efeb' }}>
                                <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }} className="menu-card-img" />
                                {!item.isAvailable && (
                                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Badge variant="danger">Unavailable</Badge>
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div style={{ height: 80, background: '#f8f7f4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Icon name="restaurant" size={28} style={{ color: TOKEN.textMuted }} />
                              </div>
                            )}

                            <div style={{ padding: '14px 16px 16px' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: 6 }}>
                                <h3 style={{ fontSize: 15, fontWeight: 600, color: TOKEN.textPrimary, margin: 0, lineHeight: 1.3 }}>{item.name}</h3>
                                {!item.isAvailable && <Badge variant="danger">Out</Badge>}
                              </div>

                              {item.description && (
                                <p style={{ fontSize: 13, color: TOKEN.textSecondary, margin: '0 0 12px', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                  {item.description}
                                </p>
                              )}

                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                                <span style={{ fontSize: 16, fontWeight: 600, color: TOKEN.textPrimary }}>₹{item.price.toFixed(2)}</span>

                                {inCart ? (
                                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#f0f3f1', borderRadius: 10, padding: '2px 6px' }}>
                                    <button onClick={() => updateQty(item.menuItemId, -1)} style={qtyBtn}><Icon name="remove" size={14} /></button>
                                    <span style={{ fontSize: 13, fontWeight: 600, color: TOKEN.brand, minWidth: 20, textAlign: 'center' }}>{inCart.quantity}</span>
                                    <button onClick={() => updateQty(item.menuItemId, 1)} style={qtyBtn}><Icon name="add" size={14} /></button>
                                  </div>
                                ) : (
                                  <button
                                    onClick={() => item.isAvailable && addToCart(item)}
                                    disabled={!item.isAvailable}
                                    style={{ ...primaryBtn, height: 36, padding: '0 16px', fontSize: 13, opacity: item.isAvailable ? 1 : 0.4, cursor: item.isAvailable ? 'pointer' : 'not-allowed' }}
                                  >
                                    <Icon name="add" size={16} style={{ marginRight: 4 }} />
                                    Add
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </section>
              ))}
            </div>

            {/* ─── Right: Cart panel ─── */}
            {cartOpen && (
              <aside style={{ position: 'sticky', top: 72 }}>
                <div style={{ background: TOKEN.surface, border: `1px solid ${TOKEN.border}`, borderRadius: TOKEN.radiusLg, overflow: 'hidden' }}>
                  {/* Cart header */}
                  <div style={{ padding: '20px 20px 16px', borderBottom: `1px solid ${TOKEN.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <p style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.09em', color: TOKEN.textMuted, margin: 0 }}>Your cart</p>
                      <p style={{ fontSize: 18, fontWeight: 600, color: TOKEN.textPrimary, margin: '4px 0 0' }}>{getTotalItems()} items</p>
                    </div>
                    <button onClick={() => setCartOpen(false)} style={{ ...ghostBtn, width: 32, height: 32, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon name="close" size={18} />
                    </button>
                  </div>

                  {/* Cart items */}
                  <div style={{ maxHeight: 360, overflowY: 'auto', padding: '12px 0' }}>
                    {cart.length === 0 ? (
                      <div style={{ padding: '32px 20px', textAlign: 'center' }}>
                        <Icon name="shopping_cart" size={32} style={{ color: TOKEN.textMuted, display: 'block', margin: '0 auto 12px' }} />
                        <p style={{ fontSize: 13, color: TOKEN.textMuted, margin: 0 }}>Your cart is empty</p>
                      </div>
                    ) : (
                      cart.map(item => (
                        <div key={item.menuItemId} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 20px' }}>
                          {item.image ? (
                            <img src={item.image} alt={item.name} style={{ width: 44, height: 44, borderRadius: 8, objectFit: 'cover', flexShrink: 0 }} />
                          ) : (
                            <div style={{ width: 44, height: 44, borderRadius: 8, background: '#f0efeb', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              <Icon name="restaurant" size={20} style={{ color: TOKEN.textMuted }} />
                            </div>
                          )}
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{ fontSize: 13, fontWeight: 500, color: TOKEN.textPrimary, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</p>
                            <p style={{ fontSize: 12, color: TOKEN.textSecondary, margin: '2px 0 0' }}>₹{item.price.toFixed(2)} each</p>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                            <button onClick={() => updateQty(item.menuItemId, -1)} style={qtyBtn}><Icon name="remove" size={12} /></button>
                            <span style={{ fontSize: 13, fontWeight: 600, minWidth: 18, textAlign: 'center', color: TOKEN.textPrimary }}>{item.quantity}</span>
                            <button onClick={() => updateQty(item.menuItemId, 1)} style={qtyBtn}><Icon name="add" size={12} /></button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Summary */}
                  {cart.length > 0 && (
                    <div style={{ borderTop: `1px solid ${TOKEN.border}`, padding: 20 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                        <span style={{ fontSize: 13, color: TOKEN.textSecondary }}>Subtotal</span>
                        <span style={{ fontSize: 15, fontWeight: 600, color: TOKEN.textPrimary }}>₹{getTotalPrice().toFixed(2)}</span>
                      </div>
                      <button
                        onClick={() => navigate('/checkout', { state: { cart } })}
                        style={{ ...primaryBtn, width: '100%', justifyContent: 'center' }}
                      >
                        Proceed to checkout
                        <Icon name="arrow_forward" size={16} style={{ marginLeft: 8 }} />
                      </button>
                    </div>
                  )}
                </div>
              </aside>
            )}
          </div>
        </div>
      </div>

      {/* ─── Floating cart CTA ─── */}
      {cart.length > 0 && !cartOpen && (
        <button
          onClick={() => setCartOpen(true)}
          style={{
            position: 'fixed', bottom: 32, right: 32, zIndex: 50,
            display: 'flex', alignItems: 'center', gap: 12,
            background: TOKEN.brand, color: '#fff',
            border: 'none', borderRadius: 12, padding: '14px 24px',
            fontSize: 14, fontWeight: 600, cursor: 'pointer',
            boxShadow: '0 8px 32px rgba(15,35,24,0.30)',
            transition: 'transform 0.15s, background 0.15s',
            fontFamily: "'DM Sans', sans-serif",
          }}
          onMouseEnter={e => { (e.currentTarget).style.background = TOKEN.brandHover; (e.currentTarget).style.transform = 'translateY(-2px)'; }}
          onMouseLeave={e => { (e.currentTarget).style.background = TOKEN.brand; (e.currentTarget).style.transform = 'none'; }}
        >
          <Icon name="shopping_cart" size={20} />
          <span>View cart · {getTotalItems()} items · ₹{getTotalPrice().toFixed(2)}</span>
        </button>
      )}
    </>
  );
};

/* ─── Style constants ─── */
const primaryBtn: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  height: 44, padding: '0 22px', borderRadius: 10, border: 'none', cursor: 'pointer',
  background: TOKEN.brand, color: '#fff', fontSize: 13, fontWeight: 600,
  fontFamily: "'DM Sans', sans-serif", transition: 'background 0.15s, transform 0.1s',
  letterSpacing: '0.01em',
};

const ghostBtn: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  height: 44, padding: '0 16px', borderRadius: 10,
  border: `1px solid rgba(0,0,0,0.08)`, cursor: 'pointer',
  background: 'transparent', color: TOKEN.textSecondary, fontSize: 13, fontWeight: 500,
  fontFamily: "'DM Sans', sans-serif", transition: 'all 0.15s',
};

const qtyBtn: React.CSSProperties = {
  width: 28, height: 28, borderRadius: 7, border: 'none', cursor: 'pointer',
  background: '#fff', color: TOKEN.brand, display: 'flex', alignItems: 'center', justifyContent: 'center',
  fontSize: 14, fontWeight: 600, transition: 'background 0.15s',
};

const sidebarStyle: React.CSSProperties = {
  position: 'fixed', left: 0, top: 0, bottom: 0, width: 64,
  background: TOKEN.surface, borderRight: `1px solid ${TOKEN.border}`,
  display: 'flex', flexDirection: 'column', alignItems: 'center',
  padding: '14px 0 16px', zIndex: 100,
};

const topbarStyle: React.CSSProperties = {
  position: 'fixed', top: 0, left: 64, right: 0, height: 56,
  background: TOKEN.surface, borderBottom: `1px solid ${TOKEN.border}`,
  display: 'flex', alignItems: 'center', padding: '0 40px',
  zIndex: 99, fontFamily: "'DM Sans', sans-serif",
};

const chipStyle = (active: boolean): React.CSSProperties => ({
  height: 36, padding: '0 16px', borderRadius: 20, whiteSpace: 'nowrap', flexShrink: 0,
  border: `1px solid ${active ? TOKEN.brand : TOKEN.border}`,
  background: active ? TOKEN.brand : TOKEN.surface,
  color: active ? '#fff' : TOKEN.textSecondary,
  fontSize: 13, fontWeight: 500, cursor: 'pointer',
  transition: 'all 0.15s', fontFamily: "'DM Sans', sans-serif",
});

const globalStyles = `
  * { box-sizing: border-box; }
  body { margin: 0; }
  .menu-card { transition: transform 0.2s, box-shadow 0.2s; }
  .menu-card:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(0,0,0,0.09); }
  .menu-card:hover .menu-card-img { transform: scale(1.04); }
  ::-webkit-scrollbar { width: 4px; height: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.12); border-radius: 99px; }
  .material-symbols-outlined { font-family: 'Material Symbols Outlined'; font-weight: normal; font-style: normal; display: inline-block; line-height: 1; text-transform: none; letter-spacing: normal; word-wrap: normal; white-space: nowrap; direction: ltr; }
`;

export default CanteenMenu;