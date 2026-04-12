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

const StaffDash = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');
    const [stats, setStats] = useState<DashboardStats | null>(null);

    useEffect(() => {
        fetchDashboardStats();
    }, []);

    const fetchDashboardStats = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(API_ENDPOINTS.STAFF_DASHBOARD_STATS, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                setStats(data);
            }
        } catch (error) {
            console.error('Failed to fetch dashboard stats:', error);
        }
    };

    return (
        <div className="min-h-screen bg-[#FAF9F7]">
            {/* Premium Styles */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap');
                .material-symbols-outlined {
                    font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
                }
                body { font-family: 'Inter', sans-serif; }
                .headline { font-family: 'Manrope', sans-serif; }
                .stat-card {
                    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                }
                .stat-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 20px 40px -12px rgba(17, 54, 40, 0.12);
                }
                .nav-item {
                    position: relative;
                    transition: all 0.3s ease;
                }
                .nav-item::after {
                    content: '';
                    position: absolute;
                    bottom: -2px;
                    left: 0;
                    width: 0;
                    height: 2px;
                    background: #173628;
                    transition: width 0.3s ease;
                }
                .nav-item:hover::after,
                .nav-item.active::after {
                    width: 100%;
                }
                .order-row {
                    transition: all 0.25s ease;
                }
                .order-row:hover {
                    transform: translateX(4px);
                    background: linear-gradient(135deg, rgba(23, 54, 40, 0.03) 0%, rgba(23, 54, 40, 0.01) 100%);
                }
                .glow-dot {
                    animation: glow 2s ease-in-out infinite;
                }
                @keyframes glow {
                    0%, 100% { opacity: 1; box-shadow: 0 0 6px rgba(16, 185, 129, 0.4); }
                    50% { opacity: 0.7; box-shadow: 0 0 12px rgba(16, 185, 129, 0.6); }
                }
                .top-item-card {
                    transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                }
                .top-item-card:hover {
                    transform: translateY(-3px) scale(1.01);
                    box-shadow: 0 16px 32px -8px rgba(17, 54, 40, 0.1);
                }
                .fade-in {
                    animation: fadeIn 0.5s ease-out;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(12px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>

            {/* Top Navigation — Editorial Style */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-2xl border-b border-black/[0.04]">
                <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-5 flex justify-between items-center">
                    <div className="flex items-center gap-10">
                        <h1 className="headline text-xl font-extrabold tracking-tight text-[#173628]">
                            The Culinary Editorial
                        </h1>
                        <span className="hidden md:inline-block text-[10px] font-bold tracking-[0.3em] uppercase text-[#173628]/40 bg-[#173628]/5 px-3 py-1 rounded-full border border-[#173628]/10">
                            Staff Portal
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="relative p-2.5 hover:bg-[#173628]/5 rounded-xl transition-all">
                            <span className="material-symbols-outlined text-[#173628]/60">notifications</span>
                            <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full glow-dot"></span>
                        </button>
                        <div className="w-px h-6 bg-black/[0.06]"></div>
                        <button className="flex items-center gap-3 px-3 py-2 hover:bg-[#173628]/5 rounded-xl transition-all">
                            <div className="w-8 h-8 bg-gradient-to-br from-[#173628] to-[#2a5a47] rounded-full flex items-center justify-center">
                                <span className="text-white text-xs font-bold">CE</span>
                            </div>
                            <span className="hidden md:block text-sm font-semibold text-[#173628]/70">Chef Admin</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="pt-28 pb-16 px-6 md:px-10">
                <div className="max-w-[1440px] mx-auto">
                    {/* Welcome Section */}
                    <div className="mb-10 fade-in">
                        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                            <div>
                                <span className="text-[#173628]/40 font-bold tracking-[0.3em] uppercase text-[10px] mb-3 block">
                                    Dashboard Overview
                                </span>
                                <h2 className="headline text-4xl md:text-5xl font-bold text-[#173628] leading-[1.1] tracking-tight">
                                    Welcome back, <span className="italic font-light">Chef.</span> 👨‍🍳
                                </h2>
                                <p className="text-[#173628]/50 mt-3 font-light text-lg">
                                    Here's what's happening with your canteen today
                                </p>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <span className="w-2 h-2 bg-emerald-500 rounded-full glow-dot"></span>
                                <span className="text-[#173628]/40 font-medium">Live</span>
                                <span className="text-[#173628]/20">•</span>
                                <span className="text-[#173628]/40 font-light">{new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
                        {/* Revenue Card — Featured */}
                        <div className="stat-card bg-gradient-to-br from-[#173628] to-[#1c4a38] rounded-[1.5rem] p-6 text-white shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-2xl"></div>
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-6">
                                    <span className="material-symbols-outlined text-2xl opacity-60">payments</span>
                                    <span className="text-[10px] font-bold tracking-widest uppercase bg-white/15 px-3 py-1 rounded-full">
                                        {stats ? `+${stats.revenueGrowth}%` : '+12%'}
                                    </span>
                                </div>
                                <h3 className="text-3xl font-bold mb-1 tracking-tight">
                                    ₹{stats ? stats.todayRevenue.toLocaleString() : '24,580'}
                                </h3>
                                <p className="text-white/50 text-xs font-medium tracking-wider uppercase">Today's Revenue</p>
                            </div>
                        </div>

                        {/* Orders Card */}
                        <div className="stat-card bg-white rounded-[1.5rem] p-6 border border-black/[0.04] shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center">
                                    <span className="material-symbols-outlined text-blue-600 text-xl">receipt_long</span>
                                </div>
                                <span className="text-emerald-600 text-xs font-bold bg-emerald-50 px-2.5 py-1 rounded-full">
                                    {stats ? `+${stats.ordersGrowth}%` : '+8%'}
                                </span>
                            </div>
                            <h3 className="text-2xl font-bold text-[#173628] mb-1 tracking-tight">
                                {stats ? stats.todayOrders : '142'}
                            </h3>
                            <p className="text-[#173628]/40 text-xs font-medium tracking-wider uppercase">Orders Today</p>
                        </div>

                        {/* Rating Card */}
                        <div className="stat-card bg-white rounded-[1.5rem] p-6 border border-black/[0.04] shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <div className="w-11 h-11 bg-amber-50 rounded-xl flex items-center justify-center">
                                    <span className="material-symbols-outlined text-amber-500 text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                </div>
                                <span className="text-emerald-600 text-xs font-bold bg-emerald-50 px-2.5 py-1 rounded-full">+0.2</span>
                            </div>
                            <h3 className="text-2xl font-bold text-[#173628] mb-1 tracking-tight">
                                {stats ? stats.avgRating.toFixed(1) : '4.8'}
                            </h3>
                            <p className="text-[#173628]/40 text-xs font-medium tracking-wider uppercase">Avg Rating</p>
                        </div>

                        {/* Low Stock Card */}
                        <div className="stat-card bg-white rounded-[1.5rem] p-6 border border-black/[0.04] shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <div className="w-11 h-11 bg-rose-50 rounded-xl flex items-center justify-center">
                                    <span className="material-symbols-outlined text-rose-500 text-xl">inventory_2</span>
                                </div>
                                <span className="text-rose-600 text-xs font-bold bg-rose-50 px-2.5 py-1 rounded-full">Alert</span>
                            </div>
                            <h3 className="text-2xl font-bold text-[#173628] mb-1 tracking-tight">
                                {stats ? stats.lowStockItems : '8'}
                            </h3>
                            <p className="text-[#173628]/40 text-xs font-medium tracking-wider uppercase">Items Low Stock</p>
                        </div>
                    </div>

                    {/* Tab Navigation — Editorial Style */}
                    <div className="bg-white rounded-[1.5rem] border border-black/[0.04] shadow-sm mb-10 overflow-hidden">
                        <div className="flex border-b border-black/[0.04] px-2 pt-2 overflow-x-auto">
                            {[
                                { key: 'overview', label: 'Overview', icon: 'dashboard' },
                                { key: 'inventory', label: 'Inventory', icon: 'inventory_2', route: '/inventory' },
                                { key: 'kpi', label: 'KPI Dashboard', icon: 'analytics', route: '/kpi-dashboard' },
                                { key: 'menu', label: 'Menu Management', icon: 'restaurant_menu' },
                                { key: 'orders', label: 'Orders', icon: 'receipt_long' },
                            ].map((tab) => (
                                <button
                                    key={tab.key}
                                    onClick={() => tab.route ? navigate(tab.route) : setActiveTab(tab.key)}
                                    className={`flex items-center gap-2 px-5 py-4 font-medium text-[13px] whitespace-nowrap transition-all rounded-t-xl ${
                                        activeTab === tab.key
                                            ? 'text-[#173628] bg-[#173628]/[0.04] border-b-2 border-[#173628]'
                                            : 'text-[#173628]/40 hover:text-[#173628]/70 hover:bg-black/[0.02]'
                                    }`}
                                >
                                    <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        <div className="p-6 md:p-8 fade-in">
                            {activeTab === 'overview' && (
                                <div className="space-y-10">
                                    {/* Recent Orders */}
                                    <div>
                                        <div className="flex items-center justify-between mb-6">
                                            <div>
                                                <h3 className="headline text-xl font-bold text-[#173628]">
                                                    Recent Orders
                                                </h3>
                                                <p className="text-[#173628]/40 text-sm font-light mt-1">Live order feed</p>
                                            </div>
                                            <button className="text-[#173628]/40 text-[11px] font-bold tracking-[0.2em] uppercase hover:text-[#173628] transition flex items-center gap-2">
                                                View All
                                                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                            </button>
                                        </div>
                                        <div className="space-y-2">
                                            {[
                                                { id: '#ORD-1234', customer: 'Rahul Sharma', items: '2 items', amount: '₹450', status: 'Preparing', time: '2 mins ago' },
                                                { id: '#ORD-1233', customer: 'Priya Patel', items: '1 item', amount: '₹280', status: 'Ready', time: '5 mins ago' },
                                                { id: '#ORD-1232', customer: 'Amit Kumar', items: '3 items', amount: '₹620', status: 'Completed', time: '12 mins ago' },
                                            ].map((order, idx) => (
                                                <div key={idx} className="order-row flex items-center justify-between p-4 rounded-xl cursor-pointer border border-transparent hover:border-[#173628]/[0.06]">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 bg-[#173628]/[0.04] rounded-xl flex items-center justify-center">
                                                            <span className="material-symbols-outlined text-[#173628]/60 text-lg">receipt</span>
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-[#173628] text-sm">{order.id}</p>
                                                            <p className="text-xs text-[#173628]/40 font-light">{order.customer} • {order.items}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <span className="font-bold text-[#173628] text-sm">{order.amount}</span>
                                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase ${
                                                            order.status === 'Preparing' ? 'bg-amber-50 text-amber-700 ring-1 ring-amber-200' :
                                                            order.status === 'Ready' ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200' :
                                                            'bg-[#173628]/[0.04] text-[#173628]/50 ring-1 ring-[#173628]/10'
                                                        }`}>
                                                            {order.status}
                                                        </span>
                                                        <span className="text-[11px] text-[#173628]/30 font-light hidden sm:block">{order.time}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Popular Items */}
                                    <div>
                                        <div className="flex items-center justify-between mb-6">
                                            <div>
                                                <h3 className="headline text-xl font-bold text-[#173628]">
                                                    Top Selling Items Today
                                                </h3>
                                                <p className="text-[#173628]/40 text-sm font-light mt-1">Best performers from the kitchen</p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            {[
                                                { name: 'Masala Dosa', sold: 45, revenue: '₹6,750', emoji: '🥞', rank: 1 },
                                                { name: 'Paneer Butter Masala', sold: 38, revenue: '₹7,220', emoji: '🍛', rank: 2 },
                                                { name: 'Veg Biryani', sold: 32, revenue: '₹4,800', emoji: '🍚', rank: 3 },
                                            ].map((item, idx) => (
                                                <div key={idx} className="top-item-card p-5 bg-gradient-to-br from-[#173628]/[0.02] to-transparent rounded-2xl border border-[#173628]/[0.06] relative overflow-hidden">
                                                    <div className="absolute top-3 right-3 w-7 h-7 bg-[#173628]/[0.06] rounded-full flex items-center justify-center">
                                                        <span className="text-[10px] font-bold text-[#173628]/50">#{item.rank}</span>
                                                    </div>
                                                    <div className="text-2xl mb-3">{item.emoji}</div>
                                                    <h4 className="font-bold text-[#173628] text-sm mb-3">{item.name}</h4>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-xs text-[#173628]/40 font-light">{item.sold} sold</span>
                                                        <span className="font-bold text-[#173628] text-sm">{item.revenue}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'menu' && (
                                <div className="fade-in">
                                    <div className="flex justify-between items-center mb-8">
                                        <div>
                                            <h3 className="headline text-xl font-bold text-[#173628]">
                                                Menu Items
                                            </h3>
                                            <p className="text-[#173628]/40 text-sm font-light mt-1">Manage your culinary offerings</p>
                                        </div>
                                        <button className="px-5 py-2.5 bg-[#173628] text-white rounded-full font-bold text-[11px] tracking-[0.15em] uppercase hover:bg-[#173628]/90 transition-all flex items-center gap-2 shadow-lg shadow-[#173628]/20">
                                            <span className="material-symbols-outlined text-sm">add</span>
                                            Add New Item
                                        </button>
                                    </div>
                                    <div className="space-y-2">
                                        {[
                                            { name: 'Masala Dosa', category: 'South Indian', price: '₹150', stock: 'Available', image: '🥞' },
                                            { name: 'Paneer Butter Masala', category: 'North Indian', price: '₹190', stock: 'Available', image: '🍛' },
                                            { name: 'Veg Biryani', category: 'Rice', price: '₹150', stock: 'Low Stock', image: '🍚' },
                                            { name: 'Samosa', category: 'Snacks', price: '₹30', stock: 'Available', image: '🥟' },
                                        ].map((item, idx) => (
                                            <div key={idx} className="order-row flex items-center justify-between p-4 rounded-xl cursor-pointer border border-transparent hover:border-[#173628]/[0.06]">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-[#173628]/[0.03] rounded-xl flex items-center justify-center text-2xl">
                                                        {item.image}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-[#173628] text-sm">{item.name}</p>
                                                        <p className="text-xs text-[#173628]/40 font-light">{item.category}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-5">
                                                    <span className="font-bold text-[#173628] text-sm">{item.price}</span>
                                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase ${
                                                        item.stock === 'Available' 
                                                            ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200' 
                                                            : 'bg-rose-50 text-rose-700 ring-1 ring-rose-200'
                                                    }`}>
                                                        {item.stock}
                                                    </span>
                                                    <button className="p-2 hover:bg-[#173628]/[0.04] rounded-lg transition">
                                                        <span className="material-symbols-outlined text-[#173628]/40 text-lg">edit</span>
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'orders' && (
                                <div className="fade-in">
                                    <div className="flex items-center justify-between mb-8">
                                        <div>
                                            <h3 className="headline text-xl font-bold text-[#173628]">
                                                All Orders
                                            </h3>
                                            <p className="text-[#173628]/40 text-sm font-light mt-1">Complete order history</p>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        {Array.from({ length: 8 }).map((_, idx) => (
                                            <div key={idx} className="order-row flex items-center justify-between p-4 rounded-xl cursor-pointer border border-transparent hover:border-[#173628]/[0.06]">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 bg-[#173628]/[0.04] rounded-xl flex items-center justify-center">
                                                        <span className="material-symbols-outlined text-[#173628]/60 text-lg">receipt</span>
                                                    </div>
                                                    <div>
                                                        <span className="font-mono text-sm text-[#173628]/60">#ORD-{1234 - idx}</span>
                                                        <p className="text-xs text-[#173628]/40 font-light">Customer {idx + 1}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <span className="font-bold text-[#173628] text-sm">₹{Math.floor(Math.random() * 500) + 200}</span>
                                                    <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-bold tracking-wider uppercase ring-1 ring-emerald-200">
                                                        Completed
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Quick Action Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <button 
                            onClick={() => navigate('/inventory')}
                            className="stat-card group p-6 bg-white rounded-[1.5rem] border border-black/[0.04] text-left hover:border-[#173628]/10"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-blue-600">inventory_2</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-[#173628] text-sm">Inventory Tracking</h3>
                                    <p className="text-[11px] text-[#173628]/40 font-light">Monitor stock levels</p>
                                </div>
                            </div>
                            <span className="text-[#173628]/30 text-[10px] font-bold tracking-[0.2em] uppercase flex items-center gap-1 group-hover:text-[#173628]/60 transition">
                                Open <span className="material-symbols-outlined text-xs group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </span>
                        </button>

                        <button 
                            onClick={() => navigate('/kpi-dashboard')}
                            className="stat-card group p-6 bg-white rounded-[1.5rem] border border-black/[0.04] text-left hover:border-[#173628]/10"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-purple-600">analytics</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-[#173628] text-sm">KPI Dashboard</h3>
                                    <p className="text-[11px] text-[#173628]/40 font-light">Performance metrics</p>
                                </div>
                            </div>
                            <span className="text-[#173628]/30 text-[10px] font-bold tracking-[0.2em] uppercase flex items-center gap-1 group-hover:text-[#173628]/60 transition">
                                Open <span className="material-symbols-outlined text-xs group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </span>
                        </button>

                        <button 
                            className="stat-card group p-6 bg-gradient-to-br from-[#173628] to-[#1c4a38] rounded-[1.5rem] text-left relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-8 -mt-8 blur-xl"></div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <span className="material-symbols-outlined text-white/80">download</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white text-sm">Export Report</h3>
                                        <p className="text-[11px] text-white/40 font-light">Download daily summary</p>
                                    </div>
                                </div>
                                <span className="text-white/30 text-[10px] font-bold tracking-[0.2em] uppercase flex items-center gap-1 group-hover:text-white/60 transition">
                                    Generate <span className="material-symbols-outlined text-xs group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                </span>
                            </div>
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default StaffDash;
