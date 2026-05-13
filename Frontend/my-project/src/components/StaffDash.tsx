import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/api';

interface DashboardStats {
    todayRevenue: number;
    todayOrders: number;
    avgRating: number;
    lowStockItems: number;
    revenueGrowth: number;
    ordersGrowth: number;
}

interface MenuItem {
    menuItemId: string;
    name: string;
    category: string;
    price: number;
    description: string;
    isAvailable: boolean;
    stockStatus: string;
    image: string;
}

const StaffDash = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [newItem, setNewItem] = useState({
        name: '',
        category: '',
        price: '',
        description: '',
        image: ''
    });

    useEffect(() => {
        fetchDashboardStats();
        if (activeTab === 'menu') fetchMenuItems();
    }, [activeTab]);

    const fetchDashboardStats = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(API_ENDPOINTS.STAFF_DASHBOARD_STATS, {
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
            });
            if (response.ok) setStats(await response.json());
        } catch (error) {
            console.error('Failed to fetch dashboard stats:', error);
        }
    };

    const fetchMenuItems = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(API_ENDPOINTS.CANTEEN_MENU, {
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
            });
            if (response.ok) setMenuItems(await response.json());
        } catch (error) {
            console.error('Failed to fetch menu items:', error);
        }
    };

    const handleAddMenuItem = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(API_ENDPOINTS.CANTEEN_ADD_MENU_ITEM, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: newItem.name,
                    category: newItem.category,
                    price: parseFloat(newItem.price),
                    description: newItem.description,
                    image: newItem.image || null
                })
            });
            if (response.ok) {
                setNewItem({ name: '', category: '', price: '', description: '', image: '' });
                setShowAddModal(false);
                fetchMenuItems();
            } else {
                alert('Failed to add menu item');
            }
        } catch (error) {
            console.error('Error adding menu item:', error);
            alert('Error adding menu item');
        } finally {
            setLoading(false);
        }
    };

    const tabs = [
        { key: 'overview', label: 'Overview', icon: '⊞' },
        { key: 'inventory', label: 'Inventory', icon: '⬡', route: '/inventory' },
        { key: 'kpi', label: 'KPI', icon: '◈', route: '/kpi-dashboard' },
        { key: 'menu', label: 'Menu', icon: '≡' },
        { key: 'orders', label: 'Orders', icon: '⊟' },
    ];

    const navItems = [
        { icon: 'dashboard', route: '/', label: 'Home' },
        { icon: 'inventory_2', route: '/inventory', label: 'Inventory' },
        { icon: 'analytics', route: '/kpi-dashboard', label: 'KPI' },
        { icon: 'restaurant_menu', route: '#', label: 'Menu' },
        { icon: 'receipt_long', route: '#', label: 'Orders' },
    ];

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#F5F4F0', fontFamily: "'DM Sans', sans-serif" }}>

            {/* ── Google Fonts ── */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display:ital@0;1&display=swap');
                @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');

                * { box-sizing: border-box; margin: 0; padding: 0; }

                .material-symbols-outlined {
                    font-family: 'Material Symbols Outlined';
                    font-weight: normal;
                    font-style: normal;
                    font-size: 20px;
                    line-height: 1;
                    letter-spacing: normal;
                    text-transform: none;
                    display: inline-block;
                    white-space: nowrap;
                    word-wrap: normal;
                    direction: ltr;
                    -webkit-font-smoothing: antialiased;
                    font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
                }

                /* ── Sidebar ── */
                .sidebar-nav-btn {
                    width: 40px; height: 40px;
                    border-radius: 10px;
                    border: none;
                    background: transparent;
                    display: flex; align-items: center; justify-content: center;
                    cursor: pointer;
                    color: #888;
                    transition: background 0.15s, color 0.15s;
                }
                .sidebar-nav-btn:hover { background: #f0f3f1; color: #0F2318; }
                .sidebar-nav-btn.active { background: #f0f3f1; color: #0F2318; }

                /* ── Top bar ── */
                .topbar-search {
                    background: #f8f7f4;
                    border: 1px solid rgba(0,0,0,0.08);
                    border-radius: 10px;
                    padding: 0 14px;
                    height: 36px;
                    font-family: 'DM Sans', sans-serif;
                    font-size: 13px;
                    color: #0F2318;
                    width: 220px;
                    outline: none;
                    transition: background 0.15s, border-color 0.15s, box-shadow 0.15s;
                }
                .topbar-search::placeholder { color: #c0bfb0; }
                .topbar-search:focus {
                    background: #fff;
                    border-color: rgba(15,35,24,0.30);
                    box-shadow: 0 0 0 3px rgba(15,35,24,0.06);
                }

                /* ── Stat cards ── */
                .stat-card {
                    background: #fff;
                    border: 1px solid rgba(0,0,0,0.07);
                    border-radius: 12px;
                    padding: 20px;
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                }
                .stat-card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 12px 32px rgba(0,0,0,0.09);
                }
                .stat-card.featured {
                    background: #0F2318;
                    color: #fff;
                }

                /* ── Tabs ── */
                .tab-btn {
                    height: 44px;
                    padding: 0 16px;
                    border: none;
                    background: transparent;
                    font-family: 'DM Sans', sans-serif;
                    font-size: 13px;
                    font-weight: 500;
                    color: #888;
                    cursor: pointer;
                    border-bottom: 2px solid transparent;
                    transition: color 0.15s, border-color 0.15s;
                    white-space: nowrap;
                    letter-spacing: 0.01em;
                }
                .tab-btn:hover { color: #0F2318; }
                .tab-btn.active {
                    color: #0F2318;
                    border-bottom-color: #0F2318;
                }

                /* ── Table rows ── */
                .order-row {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 12px 14px;
                    border-radius: 10px;
                    border: 1px solid transparent;
                    cursor: pointer;
                    transition: background 0.15s, border-color 0.15s;
                }
                .order-row:hover {
                    background: #fafaf8;
                    border-color: rgba(0,0,0,0.07);
                }

                /* ── Buttons ── */
                .btn-primary {
                    background: #0F2318;
                    color: #fff;
                    border: none;
                    border-radius: 10px;
                    padding: 11px 22px;
                    font-family: 'DM Sans', sans-serif;
                    font-size: 13px;
                    font-weight: 600;
                    cursor: pointer;
                    height: 44px;
                    display: flex; align-items: center; gap: 6px;
                    transition: background 0.15s, transform 0.1s;
                    letter-spacing: 0.01em;
                }
                .btn-primary:hover { background: #1a3d2a; }
                .btn-primary:active { transform: scale(0.98); }
                .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }

                .btn-secondary {
                    background: transparent;
                    color: #0F2318;
                    border: 1px solid rgba(0,0,0,0.12);
                    border-radius: 10px;
                    padding: 11px 22px;
                    font-family: 'DM Sans', sans-serif;
                    font-size: 13px;
                    font-weight: 500;
                    cursor: pointer;
                    height: 44px;
                    transition: background 0.15s;
                }
                .btn-secondary:hover { background: #f5f4f0; }

                /* ── Form inputs ── */
                .form-input {
                    width: 100%;
                    background: #f8f7f4;
                    border: 1px solid rgba(0,0,0,0.08);
                    border-radius: 10px;
                    padding: 0 14px;
                    height: 44px;
                    font-family: 'DM Sans', sans-serif;
                    font-size: 14px;
                    color: #0F2318;
                    outline: none;
                    transition: background 0.15s, border-color 0.15s, box-shadow 0.15s;
                }
                .form-input::placeholder { color: #c0bfb0; }
                .form-input:focus {
                    background: #fff;
                    border-color: rgba(15,35,24,0.30);
                    box-shadow: 0 0 0 3px rgba(15,35,24,0.06);
                }
                .form-textarea {
                    width: 100%;
                    background: #f8f7f4;
                    border: 1px solid rgba(0,0,0,0.08);
                    border-radius: 10px;
                    padding: 12px 14px;
                    font-family: 'DM Sans', sans-serif;
                    font-size: 14px;
                    color: #0F2318;
                    outline: none;
                    resize: none;
                    transition: background 0.15s, border-color 0.15s, box-shadow 0.15s;
                }
                .form-textarea::placeholder { color: #c0bfb0; }
                .form-textarea:focus {
                    background: #fff;
                    border-color: rgba(15,35,24,0.30);
                    box-shadow: 0 0 0 3px rgba(15,35,24,0.06);
                }

                /* ── Badges ── */
                .badge {
                    display: inline-flex; align-items: center;
                    padding: 3px 10px;
                    border-radius: 20px;
                    font-size: 11px;
                    font-weight: 600;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                }
                .badge-success { background: #eaf6ee; color: #1a6b34; }
                .badge-warning { background: #fef7e7; color: #8a5a00; }
                .badge-muted { background: #f2f1ee; color: #666; }
                .badge-danger { background: #fdf0ef; color: #a02020; }
                .badge-info { background: #eff5fe; color: #1a4a9e; }

                /* ── Quick action cards ── */
                .quick-action {
                    background: #fff;
                    border: 1px solid rgba(0,0,0,0.07);
                    border-radius: 12px;
                    padding: 20px;
                    cursor: pointer;
                    text-align: left;
                    font-family: 'DM Sans', sans-serif;
                    width: 100%;
                    transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.15s;
                }
                .quick-action:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 12px 32px rgba(0,0,0,0.09);
                    border-color: rgba(15,35,24,0.12);
                }

                /* ── Live dot ── */
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.4; }
                }
                .live-dot {
                    width: 7px; height: 7px;
                    background: #2d9e5f;
                    border-radius: 50%;
                    animation: pulse 2s ease-in-out infinite;
                }

                /* ── Modal overlay ── */
                .modal-overlay {
                    position: fixed; inset: 0;
                    background: rgba(0,0,0,0.4);
                    z-index: 200;
                    display: flex; align-items: center; justify-content: center;
                    padding: 24px;
                }
                .modal-box {
                    background: #fff;
                    border-radius: 14px;
                    max-width: 440px;
                    width: 100%;
                    padding: 28px;
                    box-shadow: 0 20px 60px rgba(0,0,0,0.16);
                }

                /* ── Icon box ── */
                .icon-box {
                    width: 40px; height: 40px;
                    border-radius: 10px;
                    display: flex; align-items: center; justify-content: center;
                    flex-shrink: 0;
                }

                /* ── Breadcrumb ── */
                .breadcrumb-sep {
                    font-size: 13px;
                    color: #c0bfb0;
                    margin: 0 6px;
                }

                /* ── Dropdown ── */
                .topbar-icon-btn {
                    width: 36px; height: 36px;
                    border-radius: 8px;
                    border: none;
                    background: transparent;
                    cursor: pointer;
                    display: flex; align-items: center; justify-content: center;
                    color: #666;
                    transition: background 0.15s, color 0.15s;
                    position: relative;
                }
                .topbar-icon-btn:hover { background: #f0f3f1; color: #0F2318; }

                /* ── Chip filters ── */
                .chip {
                    display: inline-flex; align-items: center;
                    padding: 5px 14px;
                    border-radius: 20px;
                    border: 1px solid rgba(0,0,0,0.08);
                    font-size: 12px;
                    font-weight: 500;
                    cursor: pointer;
                    white-space: nowrap;
                    transition: background 0.15s, border-color 0.15s;
                    background: #fff;
                    color: #555;
                    letter-spacing: 0.03em;
                }
                .chip:hover { background: #f5f4f0; }
                .chip.active { background: #0F2318; color: #fff; border-color: #0F2318; }

                /* ── Section label ── */
                .section-label {
                    font-size: 11px;
                    font-weight: 600;
                    letter-spacing: 0.09em;
                    text-transform: uppercase;
                    color: #999;
                }

                /* Fade-in */
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(8px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .fade-in { animation: fadeIn 0.3s ease-out both; }

                /* Top item card */
                .top-item-card {
                    background: #fff;
                    border: 1px solid rgba(0,0,0,0.07);
                    border-radius: 12px;
                    padding: 18px;
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                }
                .top-item-card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 12px 32px rgba(0,0,0,0.09);
                }
            `}</style>

            {/* ─────────────────────────── LEFT SIDEBAR 64px ─────────────────────── */}
            <aside style={{
                width: 64,
                minHeight: '100vh',
                background: '#fff',
                borderRight: '1px solid rgba(0,0,0,0.07)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '16px 0',
                position: 'fixed',
                top: 0,
                left: 0,
                bottom: 0,
                zIndex: 100,
            }}>
                {/* Logo */}
                <div style={{
                    width: 36, height: 36,
                    background: '#0F2318',
                    borderRadius: 10,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: 28,
                    flexShrink: 0,
                }}>
                    <span style={{ color: '#fff', fontSize: 14, fontWeight: 700, fontFamily: "'DM Sans', sans-serif" }}>CE</span>
                </div>

                {/* Nav icons */}
                <nav style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
                    {navItems.map((item) => (
                        <button
                            key={item.route}
                            className={`sidebar-nav-btn ${activeTab === item.label.toLowerCase() ? 'active' : ''}`}
                            title={item.label}
                            onClick={() => item.route !== '#' ? navigate(item.route) : undefined}
                        >
                            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>{item.icon}</span>
                        </button>
                    ))}
                </nav>

                {/* Logout */}
                <button className="sidebar-nav-btn" title="Logout" style={{ marginTop: 'auto' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 20 }}>logout</span>
                </button>
            </aside>

            {/* ─────────────────────────── RIGHT PANEL ─────────────────────────── */}
            <div style={{ marginLeft: 64, flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

                {/* ── TOP BAR 56px ── */}
                <header style={{
                    height: 56,
                    background: '#fff',
                    borderBottom: '1px solid rgba(0,0,0,0.07)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 40px',
                    position: 'fixed',
                    top: 0,
                    left: 64,
                    right: 0,
                    zIndex: 99,
                }}>
                    {/* Breadcrumb */}
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{ fontSize: 13, color: '#999', fontWeight: 400 }}>Staff portal</span>
                        <span className="breadcrumb-sep">›</span>
                        <span style={{ fontSize: 13, color: '#0F2318', fontWeight: 500 }}>Dashboard</span>
                    </div>

                    {/* Right controls */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <input className="topbar-search" placeholder="Search…" />

                        <button className="topbar-icon-btn">
                            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>notifications</span>
                            <span style={{
                                position: 'absolute', top: 6, right: 6,
                                width: 6, height: 6,
                                background: '#2d9e5f',
                                borderRadius: '50%',
                                border: '1.5px solid #fff',
                            }} />
                        </button>

                        <div style={{ width: 1, height: 20, background: 'rgba(0,0,0,0.08)', margin: '0 2px' }} />

                        {/* Avatar */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', padding: '4px 8px', borderRadius: 8 }}>
                            <div style={{
                                width: 28, height: 28,
                                background: '#0F2318',
                                borderRadius: '50%',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                                <span style={{ color: '#fff', fontSize: 10, fontWeight: 600 }}>CA</span>
                            </div>
                            <span style={{ fontSize: 13, fontWeight: 500, color: '#0F2318' }}>Chef Admin</span>
                        </div>
                    </div>
                </header>

                {/* ── MAIN CONTENT ── */}
                <main style={{ marginTop: 56, padding: '40px', flex: 1 }}>

                    {/* ── Page header ── */}
                    <div style={{ marginBottom: 32 }} className="fade-in">
                        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
                            <div>
                                <p className="section-label" style={{ marginBottom: 8 }}>Dashboard overview</p>
                                <h1 style={{
                                    fontFamily: "'DM Serif Display', serif",
                                    fontSize: 40,
                                    fontWeight: 400,
                                    color: '#0F2318',
                                    lineHeight: 1.1,
                                    letterSpacing: '-0.01em',
                                }}>
                                    Welcome back, <em>Chef.</em>
                                </h1>
                                <p style={{ fontSize: 14, color: '#888', marginTop: 8, fontWeight: 300 }}>
                                    Here's what's happening with your canteen today
                                </p>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <span className="live-dot" />
                                <span style={{ fontSize: 12, color: '#999', fontWeight: 400 }}>Live</span>
                                <span style={{ fontSize: 12, color: '#ccc', margin: '0 4px' }}>·</span>
                                <span style={{ fontSize: 12, color: '#aaa', fontWeight: 300 }}>
                                    {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* ── Stats strip ── */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: 16,
                        marginBottom: 32,
                    }}>
                        {/* Revenue — featured dark card */}
                        <div className="stat-card featured" style={{ background: '#0F2318' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                                <div className="icon-box" style={{ background: 'rgba(255,255,255,0.1)' }}>
                                    <span className="material-symbols-outlined" style={{ color: 'rgba(255,255,255,0.7)', fontSize: 18 }}>payments</span>
                                </div>
                                <span className="badge" style={{ background: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.8)', fontSize: 11 }}>
                                    +{stats?.revenueGrowth ?? 12}%
                                </span>
                            </div>
                            <div style={{ fontSize: 28, fontWeight: 600, color: '#fff', letterSpacing: '-0.02em', marginBottom: 4 }}>
                                ₹{(stats?.todayRevenue ?? 24580).toLocaleString('en-IN')}
                            </div>
                            <div className="section-label" style={{ color: 'rgba(255,255,255,0.4)' }}>Today's revenue</div>
                        </div>

                        {/* Orders */}
                        <div className="stat-card">
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                                <div className="icon-box" style={{ background: '#eff5fe' }}>
                                    <span className="material-symbols-outlined" style={{ color: '#3a72c8', fontSize: 18 }}>receipt_long</span>
                                </div>
                                <span className="badge badge-success">+{stats?.ordersGrowth ?? 8}%</span>
                            </div>
                            <div style={{ fontSize: 28, fontWeight: 600, color: '#0F2318', letterSpacing: '-0.02em', marginBottom: 4 }}>
                                {stats?.todayOrders ?? 142}
                            </div>
                            <div className="section-label">Orders today</div>
                        </div>

                        {/* Rating */}
                        <div className="stat-card">
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                                <div className="icon-box" style={{ background: '#fef7e7' }}>
                                    <span className="material-symbols-outlined" style={{ color: '#c48a00', fontSize: 18, fontVariationSettings: "'FILL' 1" }}>star</span>
                                </div>
                                <span className="badge badge-warning">+0.2</span>
                            </div>
                            <div style={{ fontSize: 28, fontWeight: 600, color: '#0F2318', letterSpacing: '-0.02em', marginBottom: 4 }}>
                                {(stats?.avgRating ?? 4.8).toFixed(1)}
                            </div>
                            <div className="section-label">Avg rating</div>
                        </div>

                        {/* Low stock */}
                        <div className="stat-card">
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                                <div className="icon-box" style={{ background: '#fdf0ef' }}>
                                    <span className="material-symbols-outlined" style={{ color: '#c03030', fontSize: 18 }}>inventory_2</span>
                                </div>
                                <span className="badge badge-danger">Alert</span>
                            </div>
                            <div style={{ fontSize: 28, fontWeight: 600, color: '#0F2318', letterSpacing: '-0.02em', marginBottom: 4 }}>
                                {stats?.lowStockItems ?? 8}
                            </div>
                            <div className="section-label">Low stock items</div>
                        </div>
                    </div>

                    {/* ── Tab container ── */}
                    <div style={{
                        background: '#fff',
                        border: '1px solid rgba(0,0,0,0.07)',
                        borderRadius: 14,
                        marginBottom: 32,
                        overflow: 'hidden',
                    }}>
                        {/* Tab bar */}
                        <div style={{
                            display: 'flex',
                            borderBottom: '1px solid rgba(0,0,0,0.07)',
                            overflowX: 'auto',
                            padding: '0 16px',
                        }}>
                            {tabs.map((tab) => (
                                <button
                                    key={tab.key}
                                    className={`tab-btn ${activeTab === tab.key ? 'active' : ''}`}
                                    onClick={() => tab.route ? navigate(tab.route) : setActiveTab(tab.key)}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Tab content */}
                        <div style={{ padding: '28px 32px' }} className="fade-in">

                            {/* ── OVERVIEW ── */}
                            {activeTab === 'overview' && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

                                    {/* Chip filters */}
                                    <div style={{ display: 'flex', gap: 8, overflowX: 'auto' }}>
                                        {['All', 'Preparing', 'Ready', 'Completed', 'Cancelled'].map((f, i) => (
                                            <button key={f} className={`chip ${i === 0 ? 'active' : ''}`}>{f}</button>
                                        ))}
                                    </div>

                                    {/* Recent orders */}
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                                            <div>
                                                <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, fontWeight: 400, color: '#0F2318' }}>Recent orders</h2>
                                                <p style={{ fontSize: 13, color: '#999', fontWeight: 300, marginTop: 2 }}>Live order feed</p>
                                            </div>
                                            <button style={{
                                                fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
                                                color: '#888', background: 'none', border: 'none', cursor: 'pointer',
                                                display: 'flex', alignItems: 'center', gap: 4,
                                            }}>
                                                View all
                                                <span className="material-symbols-outlined" style={{ fontSize: 14 }}>arrow_forward</span>
                                            </button>
                                        </div>

                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                            {[
                                                { id: '#ORD-1234', customer: 'Rahul Sharma', items: '2 items', amount: '₹450', status: 'Preparing', time: '2 min ago' },
                                                { id: '#ORD-1233', customer: 'Priya Patel', items: '1 item', amount: '₹280', status: 'Ready', time: '5 min ago' },
                                                { id: '#ORD-1232', customer: 'Amit Kumar', items: '3 items', amount: '₹620', status: 'Completed', time: '12 min ago' },
                                            ].map((order, idx) => (
                                                <div key={idx} className="order-row">
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                                        <div className="icon-box" style={{ background: '#f5f4f0' }}>
                                                            <span className="material-symbols-outlined" style={{ color: '#888', fontSize: 17 }}>receipt</span>
                                                        </div>
                                                        <div>
                                                            <p style={{ fontSize: 13, fontWeight: 600, color: '#0F2318' }}>{order.id}</p>
                                                            <p style={{ fontSize: 12, color: '#aaa', fontWeight: 300, marginTop: 1 }}>{order.customer} · {order.items}</p>
                                                        </div>
                                                    </div>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                                                        <span style={{ fontSize: 13, fontWeight: 600, color: '#0F2318' }}>{order.amount}</span>
                                                        <span className={`badge ${
                                                            order.status === 'Preparing' ? 'badge-warning' :
                                                            order.status === 'Ready' ? 'badge-success' : 'badge-muted'
                                                        }`}>{order.status}</span>
                                                        <span style={{ fontSize: 11, color: '#ccc', fontWeight: 300 }}>{order.time}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Top sellers */}
                                    <div>
                                        <div style={{ marginBottom: 16 }}>
                                            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, fontWeight: 400, color: '#0F2318' }}>Top selling today</h2>
                                            <p style={{ fontSize: 13, color: '#999', fontWeight: 300, marginTop: 2 }}>Best performers from the kitchen</p>
                                        </div>

                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
                                            {[
                                                { name: 'Masala Dosa', sold: 45, revenue: '₹6,750', rank: 1 },
                                                { name: 'Paneer Butter Masala', sold: 38, revenue: '₹7,220', rank: 2 },
                                                { name: 'Veg Biryani', sold: 32, revenue: '₹4,800', rank: 3 },
                                            ].map((item, idx) => (
                                                <div key={idx} className="top-item-card">
                                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                                                        <span className="badge badge-muted">#{item.rank}</span>
                                                        <span className="material-symbols-outlined" style={{ color: '#ddd', fontSize: 16 }}>restaurant</span>
                                                    </div>
                                                    <p style={{ fontSize: 14, fontWeight: 600, color: '#0F2318', marginBottom: 10 }}>{item.name}</p>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                                        <span style={{ fontSize: 12, color: '#bbb', fontWeight: 300 }}>{item.sold} sold</span>
                                                        <span style={{ fontSize: 15, fontWeight: 600, color: '#0F2318' }}>{item.revenue}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* ── MENU ── */}
                            {activeTab === 'menu' && (
                                <div className="fade-in">
                                    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 24 }}>
                                        <div>
                                            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, fontWeight: 400, color: '#0F2318' }}>Menu items</h2>
                                            <p style={{ fontSize: 13, color: '#999', fontWeight: 300, marginTop: 2 }}>Manage your culinary offerings</p>
                                        </div>
                                        <button className="btn-primary" onClick={() => setShowAddModal(true)}>
                                            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>add</span>
                                            Add item
                                        </button>
                                    </div>

                                    {menuItems.length === 0 ? (
                                        <div style={{ textAlign: 'center', padding: '48px 0' }}>
                                            <span className="material-symbols-outlined" style={{ fontSize: 48, color: '#ddd', display: 'block', marginBottom: 12 }}>restaurant_menu</span>
                                            <p style={{ fontSize: 13, color: '#bbb' }}>No menu items yet. Add your first item!</p>
                                        </div>
                                    ) : (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                            {menuItems.map((item) => (
                                                <div key={item.menuItemId} className="order-row">
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                                        <div style={{
                                                            width: 44, height: 44, borderRadius: 10, overflow: 'hidden',
                                                            background: '#f5f4f0', flexShrink: 0,
                                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                        }}>
                                                            {item.image
                                                                ? <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                                : <span className="material-symbols-outlined" style={{ color: '#bbb', fontSize: 18 }}>restaurant</span>
                                                            }
                                                        </div>
                                                        <div>
                                                            <p style={{ fontSize: 13, fontWeight: 600, color: '#0F2318' }}>{item.name}</p>
                                                            <p style={{ fontSize: 12, color: '#aaa', fontWeight: 300, marginTop: 1 }}>{item.category}</p>
                                                        </div>
                                                    </div>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                                                        <span style={{ fontSize: 13, fontWeight: 600, color: '#0F2318' }}>₹{item.price.toFixed(2)}</span>
                                                        <span className={`badge ${item.isAvailable ? 'badge-success' : 'badge-danger'}`}>
                                                            {item.stockStatus}
                                                        </span>
                                                        <button className="topbar-icon-btn">
                                                            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>edit</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* ── ORDERS ── */}
                            {activeTab === 'orders' && (
                                <div className="fade-in">
                                    <div style={{ marginBottom: 24 }}>
                                        <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, fontWeight: 400, color: '#0F2318' }}>All orders</h2>
                                        <p style={{ fontSize: 13, color: '#999', fontWeight: 300, marginTop: 2 }}>Complete order history</p>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                        {Array.from({ length: 8 }).map((_, idx) => (
                                            <div key={idx} className="order-row">
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                                    <div className="icon-box" style={{ background: '#f5f4f0' }}>
                                                        <span className="material-symbols-outlined" style={{ color: '#aaa', fontSize: 17 }}>receipt</span>
                                                    </div>
                                                    <div>
                                                        <span style={{ fontSize: 13, fontFamily: 'monospace', color: '#555', fontWeight: 500 }}>#ORD-{1234 - idx}</span>
                                                        <p style={{ fontSize: 12, color: '#bbb', fontWeight: 300, marginTop: 1 }}>Customer {idx + 1}</p>
                                                    </div>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                                                    <span style={{ fontSize: 13, fontWeight: 600, color: '#0F2318' }}>₹{((idx + 2) * 173).toLocaleString()}</span>
                                                    <span className="badge badge-success">Completed</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ── Quick action cards ── */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
                        <button className="quick-action" onClick={() => navigate('/inventory')}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                                <div className="icon-box" style={{ background: '#eff5fe' }}>
                                    <span className="material-symbols-outlined" style={{ color: '#3a72c8', fontSize: 20 }}>inventory_2</span>
                                </div>
                                <div>
                                    <p style={{ fontSize: 14, fontWeight: 600, color: '#0F2318' }}>Inventory tracking</p>
                                    <p style={{ fontSize: 12, color: '#aaa', fontWeight: 300 }}>Monitor stock levels</p>
                                </div>
                            </div>
                            <span className="section-label" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                Open
                                <span className="material-symbols-outlined" style={{ fontSize: 12 }}>arrow_forward</span>
                            </span>
                        </button>

                        <button className="quick-action" onClick={() => navigate('/kpi-dashboard')}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                                <div className="icon-box" style={{ background: '#f3effd' }}>
                                    <span className="material-symbols-outlined" style={{ color: '#6c4ab5', fontSize: 20 }}>analytics</span>
                                </div>
                                <div>
                                    <p style={{ fontSize: 14, fontWeight: 600, color: '#0F2318' }}>KPI dashboard</p>
                                    <p style={{ fontSize: 12, color: '#aaa', fontWeight: 300 }}>Performance metrics</p>
                                </div>
                            </div>
                            <span className="section-label" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                Open
                                <span className="material-symbols-outlined" style={{ fontSize: 12 }}>arrow_forward</span>
                            </span>
                        </button>

                        {/* Featured export card */}
                        <button className="quick-action" style={{ background: '#0F2318', borderColor: 'transparent' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                                <div className="icon-box" style={{ background: 'rgba(255,255,255,0.1)' }}>
                                    <span className="material-symbols-outlined" style={{ color: 'rgba(255,255,255,0.7)', fontSize: 20 }}>download</span>
                                </div>
                                <div>
                                    <p style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>Export report</p>
                                    <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 300 }}>Download daily summary</p>
                                </div>
                            </div>
                            <span className="section-label" style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'rgba(255,255,255,0.35)' }}>
                                Generate
                                <span className="material-symbols-outlined" style={{ fontSize: 12 }}>arrow_forward</span>
                            </span>
                        </button>
                    </div>
                </main>
            </div>

            {/* ─────────────────────────── ADD ITEM MODAL ─────────────────────────── */}
            {showAddModal && (
                <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setShowAddModal(false)}>
                    <div className="modal-box">
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                            <div>
                                <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, fontWeight: 400, color: '#0F2318' }}>Add menu item</h2>
                                <p style={{ fontSize: 13, color: '#aaa', fontWeight: 300, marginTop: 2 }}>Fill in the details below</p>
                            </div>
                            <button
                                className="topbar-icon-btn"
                                onClick={() => setShowAddModal(false)}
                                style={{ width: 32, height: 32 }}
                            >
                                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>close</span>
                            </button>
                        </div>

                        <form onSubmit={handleAddMenuItem} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            <div>
                                <label className="section-label" style={{ display: 'block', marginBottom: 8 }}>Item name</label>
                                <input
                                    type="text"
                                    required
                                    className="form-input"
                                    placeholder="e.g., Masala Dosa"
                                    value={newItem.name}
                                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                                />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                <div>
                                    <label className="section-label" style={{ display: 'block', marginBottom: 8 }}>Category</label>
                                    <input
                                        type="text"
                                        required
                                        className="form-input"
                                        placeholder="e.g., South Indian"
                                        value={newItem.category}
                                        onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="section-label" style={{ display: 'block', marginBottom: 8 }}>Price (₹)</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        required
                                        className="form-input"
                                        placeholder="150"
                                        value={newItem.price}
                                        onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="section-label" style={{ display: 'block', marginBottom: 8 }}>Description</label>
                                <textarea
                                    className="form-textarea"
                                    rows={3}
                                    placeholder="Brief description of the item"
                                    value={newItem.description}
                                    onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="section-label" style={{ display: 'block', marginBottom: 8 }}>Image URL <span style={{ textTransform: 'none', fontSize: 11, color: '#bbb', letterSpacing: 0, fontWeight: 400 }}>(optional)</span></label>
                                <input
                                    type="url"
                                    className="form-input"
                                    placeholder="https://example.com/image.jpg"
                                    value={newItem.image}
                                    onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
                                />
                            </div>

                            <div style={{ display: 'flex', gap: 12, paddingTop: 8 }}>
                                <button
                                    type="button"
                                    className="btn-secondary"
                                    style={{ flex: 1 }}
                                    onClick={() => setShowAddModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn-primary"
                                    style={{ flex: 1, justifyContent: 'center' }}
                                    disabled={loading}
                                >
                                    {loading ? 'Adding…' : 'Add item'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StaffDash;