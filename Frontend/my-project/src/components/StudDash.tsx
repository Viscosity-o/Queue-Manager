import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/api';

interface CanteenSearchResult {
    canteenId: string;
    name: string;
    canteenCode: string;
    collegeCode: string;
    address: string;
    phone: string;
    isActive: boolean;
}

const StudDash = () => {
    const navigate = useNavigate();
    const [searchCode, setSearchCode] = useState('');
    const [searchResult, setSearchResult] = useState<CanteenSearchResult | null>(null);
    const [searchError, setSearchError] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userRole');
        navigate('/Sign');
    };

    const handleSearch = async () => {
        if (!searchCode.trim()) { setSearchError('Please enter a canteen code'); return; }
        setIsSearching(true);
        setSearchError('');
        setSearchResult(null);
        try {
            const token = localStorage.getItem('authToken');
            if (!token) { setSearchError('Please login to search for canteens'); setIsSearching(false); return; }
            const url = `${API_ENDPOINTS.STUDENT_SEARCH_CANTEEN}?canteenCode=${encodeURIComponent(searchCode)}`;
            const response = await fetch(url, { headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } });
            if (response.status === 401) { setSearchError('Session expired. Please login again.'); setIsSearching(false); return; }
            const data = await response.json();
            if (!response.ok) { setSearchError(data.error || 'Canteen not found'); return; }
            setSearchResult(data);
        } catch (error) {
            setSearchError('Failed to search. Please try again.');
        } finally {
            setIsSearching(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleSearch();
    };

    return (
        <div style={{ minHeight: '100vh', background: '#F5F4F0', fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}>
            <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap" rel="stylesheet" />
            <style>{`
                *{box-sizing:border-box;margin:0;padding:0}
                .mat{font-family:'Material Symbols Outlined';font-variation-settings:'FILL' 0,'wght' 300,'GRAD' 0,'opsz' 24;font-style:normal;line-height:1;display:inline-block;vertical-align:middle}
                .mat-fill{font-variation-settings:'FILL' 1,'wght' 400,'GRAD' 0,'opsz' 24}
                nav a{text-decoration:none}
                button{cursor:pointer;font-family:inherit;border:none;background:none}
                input{font-family:inherit}
                a{text-decoration:none;font-family:inherit}

                /* Sidebar */
                .sidebar{
                    position:fixed;top:0;left:0;width:64px;height:100vh;
                    background:#fff;
                    border-right:1px solid rgba(0,0,0,0.07);
                    display:flex;flex-direction:column;align-items:center;
                    padding:20px 0;gap:4px;z-index:100;
                }
                .sidebar-logo{
                    width:36px;height:36px;background:#0F2318;border-radius:10px;
                    display:flex;align-items:center;justify-content:center;margin-bottom:16px;
                }
                .sidebar-icon{
                    width:40px;height:40px;border-radius:10px;
                    display:flex;align-items:center;justify-content:center;
                    color:#9a9a8e;transition:all 0.15s ease;cursor:pointer;
                }
                .sidebar-icon:hover{background:#f5f4f0;color:#0F2318}
                .sidebar-icon.active{background:#f0f3f1;color:#0F2318}
                .sidebar-bottom{margin-top:auto;display:flex;flex-direction:column;align-items:center;gap:4px}

                /* Top bar */
                .topbar{
                    position:fixed;top:0;left:64px;right:0;height:56px;
                    background:rgba(245,244,240,0.92);
                    backdrop-filter:blur(12px);
                    border-bottom:1px solid rgba(0,0,0,0.07);
                    display:flex;align-items:center;justify-content:space-between;
                    padding:0 32px;z-index:99;
                }
                .topbar-breadcrumb{display:flex;align-items:center;gap:8px;font-size:13px;color:#9a9a8e}
                .topbar-breadcrumb span.active{color:#0F2318;font-weight:500}
                .topbar-right{display:flex;align-items:center;gap:10px}

                /* Search input */
                .search-wrap{
                    position:relative;display:flex;align-items:center;
                    background:#fff;border:1px solid rgba(0,0,0,0.10);
                    border-radius:10px;overflow:hidden;
                    transition:border-color 0.15s,box-shadow 0.15s;
                }
                .search-wrap:focus-within{border-color:rgba(15,35,24,0.35);box-shadow:0 0 0 3px rgba(15,35,24,0.06)}
                .search-wrap input{
                    width:260px;padding:8px 12px 8px 36px;
                    border:none;outline:none;font-size:13px;color:#0F2318;
                    background:transparent;
                }
                .search-wrap input::placeholder{color:#b0af9a}
                .search-icon-inside{position:absolute;left:10px;color:#b0af9a;font-size:16px}

                /* Avatar */
                .avatar{
                    width:32px;height:32px;border-radius:8px;
                    background:linear-gradient(135deg,#0F2318,#1e4d35);
                    display:flex;align-items:center;justify-content:center;
                    cursor:pointer;transition:opacity 0.15s;
                }
                .avatar:hover{opacity:0.85}

                /* Dropdown */
                .dropdown{
                    position:absolute;right:0;top:44px;width:200px;
                    background:#fff;border:1px solid rgba(0,0,0,0.09);
                    border-radius:12px;box-shadow:0 8px 32px rgba(0,0,0,0.10);
                    overflow:hidden;z-index:200;
                }
                .dropdown-header{padding:12px 14px;border-bottom:1px solid rgba(0,0,0,0.07)}
                .dropdown-item{
                    width:100%;display:flex;align-items:center;gap:10px;
                    padding:9px 14px;font-size:13px;color:#4a4a42;
                    background:none;border:none;cursor:pointer;text-align:left;
                    transition:background 0.1s;
                }
                .dropdown-item:hover{background:#f5f4f0}
                .dropdown-item.danger{color:#c0392b}
                .dropdown-item.danger:hover{background:#fdf2f2}
                .dropdown-divider{height:1px;background:rgba(0,0,0,0.07);margin:4px 0}

                /* Page content */
                .page{margin-left:64px;padding-top:56px;min-height:100vh}

                /* Hero */
                .hero{
                    position:relative;height:340px;overflow:hidden;
                    background:#0F2318;
                }
                .hero-img{width:100%;height:100%;object-fit:cover;opacity:0.32}
                .hero-overlay{
                    position:absolute;inset:0;
                    background:linear-gradient(135deg,rgba(15,35,24,0.90) 0%,rgba(15,35,24,0.50) 60%,transparent 100%);
                }
                .hero-content{
                    position:absolute;inset:0;display:flex;align-items:flex-end;
                    padding:40px 40px 44px;
                }
                .hero-badge{
                    display:inline-flex;align-items:center;gap:6px;
                    padding:4px 10px;border-radius:6px;
                    background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.18);
                    font-size:10px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;
                    color:rgba(255,255,255,0.75);margin-bottom:12px;
                }
                .hero-pulse{width:6px;height:6px;border-radius:50%;background:#5be894;animation:pulse 2s infinite}
                @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
                .hero-title{
                    font-family:'DM Serif Display',serif;
                    font-size:40px;line-height:1.15;color:#fff;
                    margin-bottom:8px;font-weight:400;
                }
                .hero-title em{font-style:italic;color:#a8f0c8}
                .hero-sub{font-size:14px;color:rgba(255,255,255,0.55);line-height:1.6;max-width:400px}

                /* Stats strip */
                .stats-strip{
                    background:#fff;border-bottom:1px solid rgba(0,0,0,0.07);
                    padding:0 40px;display:flex;align-items:stretch;gap:0;
                }
                .stat-item{
                    display:flex;flex-direction:column;padding:16px 32px 16px 0;
                    border-right:1px solid rgba(0,0,0,0.07);margin-right:32px;
                }
                .stat-item:last-child{border-right:none}
                .stat-label{font-size:11px;font-weight:500;color:#9a9a8e;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:4px}
                .stat-value{font-size:22px;font-weight:600;color:#0F2318;letter-spacing:-0.5px}
                .stat-delta{font-size:11px;color:#1e8c56;font-weight:500;margin-top:1px;display:flex;align-items:center;gap:3px}

                /* Search panel */
                .search-panel{
                    margin:32px 40px 0;background:#fff;
                    border:1px solid rgba(0,0,0,0.08);border-radius:14px;
                    padding:24px;
                }
                .search-panel-label{font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:#9a9a8e;margin-bottom:12px}
                .search-row{display:flex;align-items:center;gap:10px}
                .search-field{
                    flex:1;display:flex;align-items:center;gap:10px;
                    background:#f8f7f4;border:1px solid rgba(0,0,0,0.08);
                    border-radius:10px;padding:0 14px;
                    transition:border-color 0.15s,box-shadow 0.15s;
                }
                .search-field:focus-within{
                    background:#fff;border-color:rgba(15,35,24,0.30);
                    box-shadow:0 0 0 3px rgba(15,35,24,0.06);
                }
                .search-field input{
                    flex:1;padding:11px 0;border:none;outline:none;
                    font-size:14px;color:#0F2318;background:transparent;
                }
                .search-field input::placeholder{color:#c0bfb0}
                .btn-primary{
                    padding:11px 22px;background:#0F2318;color:#fff;
                    border-radius:10px;font-size:13px;font-weight:600;
                    border:none;cursor:pointer;display:flex;align-items:center;gap:6px;
                    transition:background 0.15s,transform 0.1s;white-space:nowrap;
                }
                .btn-primary:hover{background:#1a3d29}
                .btn-primary:active{transform:scale(0.98)}
                .btn-primary:disabled{opacity:0.5;cursor:not-allowed}

                /* Error */
                .error-bar{
                    display:flex;align-items:center;gap:10px;
                    margin-top:12px;padding:10px 14px;
                    background:#fdf2f2;border:1px solid rgba(192,57,43,0.20);
                    border-radius:8px;font-size:13px;color:#c0392b;
                }

                /* Result card */
                .result-card{
                    margin-top:12px;padding:18px;
                    background:#f8f7f4;border:1px solid rgba(0,0,0,0.08);
                    border-radius:10px;
                }
                .result-card-header{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:14px}
                .result-name{font-size:16px;font-weight:600;color:#0F2318;margin-bottom:4px}
                .result-meta{display:flex;flex-wrap:wrap;gap:12px;font-size:12px;color:#9a9a8e}
                .result-meta-item{display:flex;align-items:center;gap:4px}
                .active-badge{
                    display:inline-flex;align-items:center;gap:4px;
                    padding:2px 8px;background:#e8f6ee;border-radius:5px;
                    font-size:11px;font-weight:600;color:#1e8c56;
                }
                .btn-view{
                    width:100%;padding:10px;background:#0F2318;color:#fff;
                    border-radius:8px;font-size:13px;font-weight:600;
                    display:flex;align-items:center;justify-content:center;gap:6px;
                    border:none;cursor:pointer;transition:background 0.15s;
                }
                .btn-view:hover{background:#1a3d29}
                .btn-close{
                    width:28px;height:28px;border-radius:7px;border:1px solid rgba(0,0,0,0.08);
                    display:flex;align-items:center;justify-content:center;
                    color:#9a9a8e;background:#fff;cursor:pointer;
                    transition:all 0.15s;flex-shrink:0;
                }
                .btn-close:hover{background:#f5f4f0;color:#0F2318}

                /* Section headers */
                .section{padding:32px 40px 0}
                .section-header{display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:20px}
                .section-title{font-size:16px;font-weight:600;color:#0F2318}
                .section-sub{font-size:12px;color:#b0af9a;margin-top:2px}
                .section-link{
                    font-size:12px;font-weight:600;color:#9a9a8e;
                    display:flex;align-items:center;gap:4px;
                    transition:color 0.15s;
                }
                .section-link:hover{color:#0F2318}

                /* Cuisine chips */
                .chips{display:flex;gap:8px;overflow-x:auto;padding-bottom:4px;scrollbar-width:none}
                .chips::-webkit-scrollbar{display:none}
                .chip{
                    display:flex;align-items:center;gap:7px;
                    padding:8px 14px;background:#fff;
                    border:1px solid rgba(0,0,0,0.08);border-radius:20px;
                    font-size:13px;font-weight:500;color:#4a4a42;
                    white-space:nowrap;cursor:pointer;flex-shrink:0;
                    transition:all 0.15s;
                }
                .chip:hover{border-color:rgba(15,35,24,0.25);background:#f0f3f1;color:#0F2318}

                /* Featured grid */
                .featured-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px}

                /* Cards */
                .feat-card-lg{
                    grid-column:span 2;border-radius:14px;overflow:hidden;
                    background:#fff;border:1px solid rgba(0,0,0,0.07);
                    cursor:pointer;transition:transform 0.2s,box-shadow 0.2s;
                }
                .feat-card-lg:hover{transform:translateY(-2px);box-shadow:0 12px 32px rgba(0,0,0,0.09)}
                .feat-card-sm{
                    border-radius:14px;overflow:hidden;background:#fff;
                    border:1px solid rgba(0,0,0,0.07);cursor:pointer;
                    transition:transform 0.2s,box-shadow 0.2s;
                }
                .feat-card-sm:hover{transform:translateY(-2px);box-shadow:0 12px 32px rgba(0,0,0,0.09)}
                .sm-stack{display:flex;flex-direction:column;gap:16px}
                .card-img-wrap{position:relative;overflow:hidden}
                .card-img{width:100%;height:100%;object-fit:cover;transition:transform 0.5s}
                .feat-card-lg:hover .card-img,.feat-card-sm:hover .card-img{transform:scale(1.04)}
                .card-img-overlay{
                    position:absolute;bottom:0;left:0;right:0;
                    padding:18px 18px 16px;
                    background:linear-gradient(to top, rgba(10,25,16,0.88) 0%, rgba(10,25,16,0.3) 60%,transparent 100%);
                }
                .card-badge{
                    display:inline-flex;align-items:center;gap:5px;
                    padding:3px 8px;background:rgba(255,255,255,0.15);
                    border:1px solid rgba(255,255,255,0.22);border-radius:5px;
                    font-size:10px;font-weight:600;color:rgba(255,255,255,0.85);
                    margin-bottom:8px;
                }
                .card-rating{
                    display:inline-flex;align-items:center;gap:4px;
                    padding:3px 7px;background:rgba(255,220,50,0.18);
                    border:1px solid rgba(255,220,50,0.35);border-radius:5px;
                    font-size:11px;font-weight:700;color:#ffd700;margin-bottom:6px;
                }
                .card-title-lg{font-size:18px;font-weight:600;color:#fff;margin-bottom:3px}
                .card-title-sm{font-size:14px;font-weight:600;color:#fff;margin-bottom:2px}
                .card-desc{font-size:12px;color:rgba(255,255,255,0.55);line-height:1.5}
                .card-body{padding:14px}
                .card-top-badge{
                    position:absolute;top:10px;right:10px;
                    display:flex;align-items:center;gap:4px;
                    padding:4px 8px;background:rgba(255,255,255,0.95);
                    border-radius:7px;font-size:11px;font-weight:700;color:#1a1a16;
                }

                /* Bottom row */
                .list-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;padding-bottom:40px}
                .list-card{
                    display:flex;align-items:center;gap:14px;
                    background:#fff;border:1px solid rgba(0,0,0,0.07);
                    border-radius:12px;padding:14px 16px;cursor:pointer;
                    transition:all 0.15s;
                }
                .list-card:hover{border-color:rgba(15,35,24,0.18);box-shadow:0 4px 16px rgba(0,0,0,0.07)}
                .list-thumb{
                    width:52px;height:52px;border-radius:10px;overflow:hidden;flex-shrink:0;
                    border:1px solid rgba(0,0,0,0.06);
                }
                .list-thumb img{width:100%;height:100%;object-fit:cover}
                .list-name{font-size:14px;font-weight:600;color:#0F2318;margin-bottom:5px}
                .list-chips{display:flex;align-items:center;gap:6px}
                .list-tag{
                    font-size:10px;font-weight:600;background:#f5f4f0;
                    color:#7a7a72;padding:2px 7px;border-radius:4px;
                }
                .list-star{display:flex;align-items:center;gap:3px;font-size:11px;font-weight:700;color:#0F2318}
                .list-chevron{color:#d0cfc7;margin-left:auto;font-size:18px;transition:color 0.15s}
                .list-card:hover .list-chevron{color:#9a9a8e}
            `}</style>

            {/* ── Sidebar ── */}
            <aside className="sidebar">
                <div className="sidebar-logo">
                    <span className="mat mat-fill" style={{ color: '#fff', fontSize: 18 }}>restaurant</span>
                </div>
                {[
                    { icon: 'grid_view', active: true },
                    { icon: 'storefront', active: false },
                    { icon: 'receipt_long', active: false },
                    { icon: 'bookmark', active: false },
                ].map((s, i) => (
                    <div key={i} className={`sidebar-icon ${s.active ? 'active' : ''}`}>
                        <span className="mat" style={{ fontSize: 20 }}>{s.icon}</span>
                    </div>
                ))}
                <div className="sidebar-bottom">
                    <div className="sidebar-icon" onClick={handleLogout} title="Sign out">
                        <span className="mat" style={{ fontSize: 20, color: '#c0392b' }}>logout</span>
                    </div>
                </div>
            </aside>

            {/* ── Top bar ── */}
            <header className="topbar">
                <div className="topbar-breadcrumb">
                    <span>Campus</span>
                    <span className="mat" style={{ fontSize: 14 }}>chevron_right</span>
                    <span className="active">Dashboard</span>
                </div>
                <div className="topbar-right">
                    {/* Inline search */}
                    <div className="search-wrap">
                        <span className="mat search-icon-inside" style={{ fontSize: 16 }}>search</span>
                        <input
                            type="text"
                            value={searchCode}
                            onChange={(e) => setSearchCode(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Search canteen code…"
                        />
                    </div>
                    {/* Student badge */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 10px', background: '#f0f3f1', borderRadius: 7, fontSize: 11, fontWeight: 600, color: '#2a6644', letterSpacing: '0.05em' }}>
                        <span className="mat" style={{ fontSize: 14 }}>school</span>
                        Student
                    </div>
                    {/* Avatar + dropdown */}
                    <div style={{ position: 'relative' }}>
                        <div className="avatar" onClick={() => setShowUserMenu(!showUserMenu)}>
                            <span className="mat mat-fill" style={{ color: '#fff', fontSize: 16 }}>person</span>
                        </div>
                        {showUserMenu && (
                            <div className="dropdown">
                                <div className="dropdown-header">
                                    <div style={{ fontSize: 13, fontWeight: 600, color: '#0F2318' }}>My Account</div>
                                    <div style={{ fontSize: 11, color: '#9a9a8e', marginTop: 2 }}>Student Portal</div>
                                </div>
                                <div style={{ padding: '4px 0' }}>
                                    <button className="dropdown-item">
                                        <span className="mat" style={{ fontSize: 16 }}>person</span>
                                        Profile
                                    </button>
                                    <button className="dropdown-item">
                                        <span className="mat" style={{ fontSize: 16 }}>receipt_long</span>
                                        My Orders
                                    </button>
                                    <div className="dropdown-divider" />
                                    <button className="dropdown-item danger" onClick={handleLogout}>
                                        <span className="mat" style={{ fontSize: 16 }}>logout</span>
                                        Sign Out
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {showUserMenu && <div style={{ position: 'fixed', inset: 0, zIndex: 198 }} onClick={() => setShowUserMenu(false)} />}

            {/* ── Page ── */}
            <main className="page">

                {/* Hero */}
                <div className="hero">
                    <img
                        src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&h=400&fit=crop"
                        alt=""
                        className="hero-img"
                        style={{ position: 'absolute', inset: 0 }}
                    />
                    <div className="hero-overlay" />
                    <div className="hero-content">
                        <div>
                            <div className="hero-badge">
                                <div className="hero-pulse" />
                                Campus Dining Network
                            </div>
                            <h1 className="hero-title">
                                Your Daily <em>Gastronomic</em> Journey.
                            </h1>
                            <p className="hero-sub">
                                Discover hand-picked menus across campus, curated for the discerning student palate.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Stats strip */}
                <div className="stats-strip">
                    {[
                        { label: 'Active Canteens', value: '14', delta: '+2 this semester' },
                        { label: 'Avg Rating', value: '4.7', delta: '↑ 0.3 vs last month' },
                        { label: 'Daily Specials', value: '38', delta: 'Updated today' },
                    ].map((s, i) => (
                        <div key={i} className="stat-item">
                            <div className="stat-label">{s.label}</div>
                            <div className="stat-value">{s.value}</div>
                            <div className="stat-delta">
                                <span className="mat" style={{ fontSize: 12 }}>trending_up</span>
                                {s.delta}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Search panel */}
                <div style={{ padding: '28px 40px 0' }}>
                    <div className="search-panel">
                        <div className="search-panel-label">Find a Canteen</div>
                        <div className="search-row">
                            <div className="search-field" style={{ flex: 1 }}>
                                <span className="mat" style={{ fontSize: 18, color: '#b0af9a', flexShrink: 0 }}>qr_code_scanner</span>
                                <input
                                    type="text"
                                    value={searchCode}
                                    onChange={(e) => setSearchCode(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Enter canteen code — e.g. pict123"
                                />
                            </div>
                            <button
                                className="btn-primary"
                                onClick={handleSearch}
                                disabled={isSearching}
                            >
                                {isSearching ? (
                                    <>
                                        <span className="mat" style={{ fontSize: 16, animation: 'spin 1s linear infinite' }}>sync</span>
                                        Searching…
                                    </>
                                ) : (
                                    <>
                                        <span className="mat" style={{ fontSize: 16 }}>search</span>
                                        Search
                                    </>
                                )}
                            </button>
                        </div>

                        {searchError && (
                            <div className="error-bar">
                                <span className="mat" style={{ fontSize: 16 }}>error_outline</span>
                                {searchError}
                            </div>
                        )}

                        {searchResult && (
                            <div className="result-card">
                                <div className="result-card-header">
                                    <div>
                                        <div className="result-name">{searchResult.name}</div>
                                        <div className="result-meta">
                                            <div className="result-meta-item">
                                                <span className="mat" style={{ fontSize: 14 }}>badge</span>
                                                {searchResult.canteenCode}
                                            </div>
                                            {searchResult.address && (
                                                <div className="result-meta-item">
                                                    <span className="mat" style={{ fontSize: 14 }}>location_on</span>
                                                    {searchResult.address}
                                                </div>
                                            )}
                                            <div className="active-badge">
                                                <span className="mat mat-fill" style={{ fontSize: 12 }}>check_circle</span>
                                                Active
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        className="btn-close"
                                        onClick={() => setSearchResult(null)}
                                    >
                                        <span className="mat" style={{ fontSize: 16 }}>close</span>
                                    </button>
                                </div>
                                <button
                                    className="btn-view"
                                    onClick={() => navigate('/canteen-menu', { state: { canteenId: searchResult.canteenId, canteenName: searchResult.name } })}
                                >
                                    View Menu
                                    <span className="mat" style={{ fontSize: 16 }}>arrow_forward</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Cuisine chips */}
                <div className="section">
                    <div className="section-header">
                        <div>
                            <div className="section-title">Explore Cuisines</div>
                            <div className="section-sub">What are you craving today?</div>
                        </div>
                    </div>
                    <div className="chips">
                        {[
                            { icon: 'lunch_dining', label: 'Burgers' },
                            { icon: 'ramen_dining', label: 'Asian' },
                            { icon: 'local_pizza', label: 'Italian' },
                            { icon: 'eco', label: 'Vegan' },
                            { icon: 'coffee', label: 'Cafe' },
                            { icon: 'cake', label: 'Desserts' },
                            { icon: 'bakery_dining', label: 'Bakery' },
                            { icon: 'kebab_dining', label: 'Grill' },
                        ].map((c, i) => (
                            <div key={i} className="chip">
                                <span className="mat mat-fill" style={{ fontSize: 16 }}>{c.icon}</span>
                                {c.label}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Featured Canteens */}
                <div className="section" style={{ marginTop: 32 }}>
                    <div className="section-header">
                        <div>
                            <div className="section-title">Featured Canteens</div>
                            <div className="section-sub">Top rated for today's lunch</div>
                        </div>
                        <a href="#" className="section-link">
                            View all <span className="mat" style={{ fontSize: 14 }}>arrow_forward</span>
                        </a>
                    </div>
                    <div className="featured-grid">
                        {/* Large card */}
                        <div className="feat-card-lg" onClick={() => navigate('/canteen-menu')}>
                            <div className="card-img-wrap" style={{ height: 260 }}>
                                <img
                                    alt="The Great Hall Kitchen"
                                    src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=400&fit=crop"
                                    className="card-img"
                                />
                                <div className="card-img-overlay">
                                    <div className="card-badge">
                                        <span className="mat mat-fill" style={{ fontSize: 12 }}>workspace_premium</span>
                                        Premium Choice
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                                        <div className="card-rating">
                                            <span className="mat mat-fill" style={{ fontSize: 12, color: '#ffd700' }}>star</span>
                                            4.9
                                        </div>
                                        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>2,410 reviews</span>
                                    </div>
                                    <div className="card-title-lg">The Great Hall Kitchen</div>
                                    <div className="card-desc">Artisan sourdough, organic salads & slow-roasted meats</div>
                                </div>
                            </div>
                        </div>

                        {/* Small stack */}
                        <div className="sm-stack">
                            {[
                                { name: 'Botanica Greens', tag: 'Vegan · Sustainable', rating: '4.7', src: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=250&fit=crop' },
                                { name: 'Piazza Italia', tag: 'Traditional · Quick', rating: '4.5', src: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=250&fit=crop' },
                            ].map((c) => (
                                <div key={c.name} className="feat-card-sm" onClick={() => navigate('/canteen-menu')}>
                                    <div className="card-img-wrap" style={{ height: 116 }}>
                                        <img alt={c.name} src={c.src} className="card-img" />
                                        <div className="card-top-badge">
                                            <span className="mat mat-fill" style={{ fontSize: 12, color: '#f59e0b' }}>star</span>
                                            {c.rating}
                                        </div>
                                        <div className="card-img-overlay">
                                            <div className="card-title-sm">{c.name}</div>
                                            <div className="card-desc">{c.tag}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* List row */}
                <div className="section" style={{ marginTop: 24 }}>
                    <div className="list-grid">
                        {[
                            { name: 'Library Brew', tag: 'Quiet Zone', rating: '4.8', src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=200&h=200&fit=crop' },
                            { name: 'Zen Ramen Bar', tag: 'Asian Express', rating: '4.6', src: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=200&h=200&fit=crop' },
                            { name: 'The Pastry Lab', tag: 'Desserts', rating: '4.9', src: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=200&h=200&fit=crop' },
                        ].map((c) => (
                            <div key={c.name} className="list-card" onClick={() => navigate('/canteen-menu')}>
                                <div className="list-thumb">
                                    <img alt={c.name} src={c.src} />
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div className="list-name">{c.name}</div>
                                    <div className="list-chips">
                                        <div className="list-tag">{c.tag}</div>
                                        <div className="list-star">
                                            <span className="mat mat-fill" style={{ fontSize: 12, color: '#f59e0b' }}>star</span>
                                            {c.rating}
                                        </div>
                                    </div>
                                </div>
                                <span className="mat list-chevron">chevron_right</span>
                            </div>
                        ))}
                    </div>
                </div>

            </main>
        </div>
    );
};

export default StudDash;