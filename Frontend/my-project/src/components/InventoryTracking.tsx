import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/api';

interface InventoryItem {
    itemId: string;
    name: string;
    category: string;
    quantity: number;
    unit: string;
    minStock: number;
    status: string;
    supplier: string;
    updatedAt: string;
}

const InventoryTracking = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');
    const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchInventoryItems();
    }, []);

    const fetchInventoryItems = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(API_ENDPOINTS.STAFF_INVENTORY, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                setInventoryItems(data);
            }
        } catch (error) {
            console.error('Failed to fetch inventory:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteItem = async (itemId: string) => {
        if (!confirm('Are you sure you want to delete this item?')) return;

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_ENDPOINTS.STAFF_INVENTORY}/${itemId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                fetchInventoryItems();
            }
        } catch (error) {
            console.error('Failed to delete item:', error);
        }
    };

    const getTimeAgo = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        
        if (diffMins < 60) return `${diffMins} mins ago`;
        const diffHours = Math.floor(diffMins / 60);
        if (diffHours < 24) return `${diffHours} hours ago`;
        const diffDays = Math.floor(diffHours / 24);
        return `${diffDays} days ago`;
    };

    const filteredItems = inventoryItems.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = filterCategory === 'all' || item.category.toLowerCase() === filterCategory.toLowerCase();
        return matchesSearch && matchesCategory;
    });

    const totalItems = inventoryItems.length;
    const inStockItems = inventoryItems.filter(i => i.status === 'good').length;
    const lowStockItems = inventoryItems.filter(i => i.status === 'low').length;
    const criticalItems = inventoryItems.filter(i => i.status === 'critical').length;

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'good': return 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200';
            case 'low': return 'bg-amber-50 text-amber-700 ring-1 ring-amber-200';
            case 'critical': return 'bg-rose-50 text-rose-700 ring-1 ring-rose-200';
            default: return 'bg-[#173628]/[0.04] text-[#173628]/50 ring-1 ring-[#173628]/10';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'good': return 'check_circle';
            case 'low': return 'warning';
            case 'critical': return 'error';
            default: return 'info';
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
                .table-row {
                    transition: all 0.25s ease;
                }
                .table-row:hover {
                    background: linear-gradient(135deg, rgba(23, 54, 40, 0.02) 0%, rgba(23, 54, 40, 0.005) 100%);
                }
                .action-card {
                    transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                }
                .action-card:hover {
                    transform: translateY(-3px) scale(1.01);
                    box-shadow: 0 16px 32px -8px rgba(17, 54, 40, 0.1);
                }
                .section-fade {
                    animation: sectionFade 0.5s ease-out;
                }
                @keyframes sectionFade {
                    from { opacity: 0; transform: translateY(12px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .search-input:focus {
                    box-shadow: 0 0 0 3px rgba(23, 54, 40, 0.08);
                }
                .pulse-dot {
                    animation: pulseDot 2s ease-in-out infinite;
                }
                @keyframes pulseDot {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.5; transform: scale(1.4); }
                }
                .skeleton {
                    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
                    background-size: 200% 100%;
                    animation: shimmer 1.5s infinite;
                }
                @keyframes shimmer {
                    0% { background-position: 200% 0; }
                    100% { background-position: -200% 0; }
                }
            `}</style>

            {/* Top Navigation — Editorial Style */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-2xl border-b border-black/[0.04]">
                <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-5 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate('/StaffDash')} className="p-2.5 hover:bg-[#173628]/5 rounded-xl transition-all group">
                            <span className="material-symbols-outlined text-[#173628]/50 group-hover:text-[#173628] transition">arrow_back</span>
                        </button>
                        <div className="w-px h-6 bg-black/[0.06]"></div>
                        <div>
                            <h1 className="headline text-lg font-extrabold tracking-tight text-[#173628]">
                                Inventory Tracking
                            </h1>
                            <p className="text-[10px] text-[#173628]/30 font-medium tracking-[0.15em] uppercase">Stock Management</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="relative p-2.5 hover:bg-[#173628]/5 rounded-xl transition-all">
                            <span className="material-symbols-outlined text-[#173628]/60">notifications</span>
                            {criticalItems > 0 && (
                                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full pulse-dot"></span>
                            )}
                        </button>
                        <button className="flex items-center gap-3 px-3 py-2 hover:bg-[#173628]/5 rounded-xl transition-all">
                            <div className="w-8 h-8 bg-gradient-to-br from-[#173628] to-[#2a5a47] rounded-full flex items-center justify-center">
                                <span className="text-white text-xs font-bold">CE</span>
                            </div>
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="pt-28 pb-16 px-6 md:px-10">
                <div className="max-w-[1440px] mx-auto">

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10 section-fade">
                        {/* Total Items — Featured */}
                        <div className="stat-card bg-gradient-to-br from-[#173628] to-[#1c4a38] rounded-[1.5rem] p-6 text-white shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-2xl"></div>
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-6">
                                    <span className="material-symbols-outlined text-2xl opacity-60">inventory_2</span>
                                    <span className="text-[10px] font-bold tracking-widest uppercase bg-white/15 px-3 py-1 rounded-full">
                                        All Items
                                    </span>
                                </div>
                                <h3 className="text-3xl font-bold mb-1 tracking-tight">{totalItems}</h3>
                                <p className="text-white/40 text-xs font-medium tracking-wider uppercase">Total Items</p>
                            </div>
                        </div>

                        {/* In Stock */}
                        <div className="stat-card bg-white rounded-[1.5rem] p-6 border border-black/[0.04] shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <div className="w-11 h-11 bg-emerald-50 rounded-xl flex items-center justify-center">
                                    <span className="material-symbols-outlined text-emerald-600 text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                                </div>
                                <span className="text-emerald-600 text-xs font-bold bg-emerald-50 px-2.5 py-1 rounded-full">Good</span>
                            </div>
                            <h3 className="text-2xl font-bold text-[#173628] mb-1 tracking-tight">{inStockItems}</h3>
                            <p className="text-[#173628]/40 text-xs font-medium tracking-wider uppercase">In Stock</p>
                        </div>

                        {/* Low Stock */}
                        <div className="stat-card bg-white rounded-[1.5rem] p-6 border border-black/[0.04] shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <div className="w-11 h-11 bg-amber-50 rounded-xl flex items-center justify-center">
                                    <span className="material-symbols-outlined text-amber-500 text-xl">warning</span>
                                </div>
                                <span className="text-amber-600 text-xs font-bold bg-amber-50 px-2.5 py-1 rounded-full">Warning</span>
                            </div>
                            <h3 className="text-2xl font-bold text-[#173628] mb-1 tracking-tight">{lowStockItems}</h3>
                            <p className="text-[#173628]/40 text-xs font-medium tracking-wider uppercase">Low Stock</p>
                        </div>

                        {/* Critical */}
                        <div className="stat-card bg-white rounded-[1.5rem] p-6 border border-black/[0.04] shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <div className="w-11 h-11 bg-rose-50 rounded-xl flex items-center justify-center">
                                    <span className="material-symbols-outlined text-rose-500 text-xl">error</span>
                                </div>
                                {criticalItems > 0 && (
                                    <span className="text-rose-600 text-xs font-bold bg-rose-50 px-2.5 py-1 rounded-full flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 bg-rose-500 rounded-full pulse-dot"></span>
                                        Critical
                                    </span>
                                )}
                            </div>
                            <h3 className="text-2xl font-bold text-[#173628] mb-1 tracking-tight">{criticalItems}</h3>
                            <p className="text-[#173628]/40 text-xs font-medium tracking-wider uppercase">Critical</p>
                        </div>
                    </div>

                    {/* Search and Filters */}
                    <div className="bg-white rounded-[1.5rem] p-5 border border-black/[0.04] shadow-sm mb-8 section-fade" style={{ animationDelay: '0.1s' }}>
                        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                            <div className="flex-1 w-full">
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#173628]/30 text-xl">
                                        search
                                    </span>
                                    <input
                                        type="text"
                                        placeholder="Search inventory items..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="search-input w-full pl-12 pr-4 py-3 bg-[#173628]/[0.02] border border-[#173628]/[0.06] rounded-xl text-[#173628] text-sm placeholder-[#173628]/25 focus:outline-none focus:border-[#173628]/20 transition-all font-light"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-3 items-center">
                                <select
                                    value={filterCategory}
                                    onChange={(e) => setFilterCategory(e.target.value)}
                                    className="px-4 py-3 bg-[#173628]/[0.02] border border-[#173628]/[0.06] rounded-xl text-[#173628]/60 text-[12px] font-semibold tracking-wider uppercase focus:outline-none focus:ring-2 focus:ring-[#173628]/10 appearance-none cursor-pointer pr-10"
                                >
                                    <option value="all">All Categories</option>
                                    <option value="grains">Grains</option>
                                    <option value="dairy">Dairy</option>
                                    <option value="vegetables">Vegetables</option>
                                    <option value="meat">Meat</option>
                                    <option value="oils">Oils</option>
                                </select>
                                <button className="px-5 py-3 bg-[#173628] text-white rounded-xl font-bold text-[11px] tracking-[0.15em] uppercase hover:bg-[#173628]/90 transition-all flex items-center gap-2 shadow-lg shadow-[#173628]/20">
                                    <span className="material-symbols-outlined text-sm">add</span>
                                    Add Item
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Inventory Table */}
                    <div className="bg-white rounded-[1.5rem] border border-black/[0.04] shadow-sm overflow-hidden mb-10 section-fade" style={{ animationDelay: '0.2s' }}>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-black/[0.04]">
                                        {['Item Name', 'Category', 'Quantity', 'Min Stock', 'Status', 'Supplier', 'Last Updated', ''].map((h, i) => (
                                            <th key={i} className={`px-6 py-4 text-${i === 7 ? 'right' : 'left'} text-[10px] font-bold text-[#173628]/30 uppercase tracking-[0.2em]`}>
                                                {h || 'Actions'}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        // Skeleton Loading
                                        Array.from({ length: 4 }).map((_, idx) => (
                                            <tr key={idx} className="border-b border-black/[0.02]">
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-9 h-9 skeleton rounded-lg"></div>
                                                        <div className="h-4 w-24 skeleton rounded"></div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5"><div className="h-3 w-16 skeleton rounded-full"></div></td>
                                                <td className="px-6 py-5"><div className="h-4 w-14 skeleton rounded"></div></td>
                                                <td className="px-6 py-5"><div className="h-3 w-12 skeleton rounded"></div></td>
                                                <td className="px-6 py-5"><div className="h-5 w-16 skeleton rounded-full"></div></td>
                                                <td className="px-6 py-5"><div className="h-3 w-20 skeleton rounded"></div></td>
                                                <td className="px-6 py-5"><div className="h-3 w-16 skeleton rounded"></div></td>
                                                <td className="px-6 py-5"><div className="h-4 w-16 skeleton rounded"></div></td>
                                            </tr>
                                        ))
                                    ) : filteredItems.length === 0 ? (
                                        <tr>
                                            <td colSpan={8} className="px-6 py-16 text-center">
                                                <div className="flex flex-col items-center gap-3">
                                                    <div className="w-16 h-16 bg-[#173628]/[0.04] rounded-2xl flex items-center justify-center">
                                                        <span className="material-symbols-outlined text-[#173628]/20 text-3xl">inventory_2</span>
                                                    </div>
                                                    <p className="text-[#173628]/40 font-light">No inventory items found</p>
                                                    <p className="text-[10px] text-[#173628]/25 font-light">Try adjusting your search or filters</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredItems.map((item) => (
                                            <tr key={item.itemId} className="table-row border-b border-black/[0.02] last:border-0 cursor-pointer">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-9 h-9 bg-[#173628]/[0.04] rounded-lg flex items-center justify-center">
                                                            <span className="material-symbols-outlined text-[#173628]/40 text-base">
                                                                inventory_2
                                                            </span>
                                                        </div>
                                                        <span className="font-semibold text-[#173628] text-sm">{item.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="px-3 py-1 bg-[#173628]/[0.04] text-[#173628]/50 rounded-full text-[10px] font-bold tracking-wider uppercase">
                                                        {item.category}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="font-bold text-[#173628] text-sm">
                                                        {item.quantity} <span className="text-[#173628]/30 font-light text-xs">{item.unit}</span>
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-[#173628]/40 text-sm font-light">
                                                    {item.minStock} {item.unit}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase flex items-center gap-1.5 w-fit ${getStatusStyle(item.status)}`}>
                                                        <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>
                                                            {getStatusIcon(item.status)}
                                                        </span>
                                                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-[#173628]/40 text-sm font-light">
                                                    {item.supplier}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-[#173628]/30 text-xs font-light">
                                                    {getTimeAgo(item.updatedAt)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                                    <div className="flex items-center justify-end gap-1">
                                                        <button className="p-2 hover:bg-[#173628]/[0.04] rounded-lg transition group">
                                                            <span className="material-symbols-outlined text-[#173628]/30 text-lg group-hover:text-[#173628]/60 transition">edit</span>
                                                        </button>
                                                        <button className="p-2 hover:bg-emerald-50 rounded-lg transition group">
                                                            <span className="material-symbols-outlined text-emerald-400 text-lg group-hover:text-emerald-600 transition">add_circle</span>
                                                        </button>
                                                        <button 
                                                            onClick={() => handleDeleteItem(item.itemId)}
                                                            className="p-2 hover:bg-rose-50 rounded-lg transition group"
                                                        >
                                                            <span className="material-symbols-outlined text-rose-300 text-lg group-hover:text-rose-500 transition">delete</span>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 section-fade" style={{ animationDelay: '0.3s' }}>
                        <button className="action-card group p-6 bg-white rounded-[1.5rem] border border-black/[0.04] text-left hover:border-[#173628]/10">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-blue-600">download</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-[#173628] text-sm">Export Report</h3>
                                    <p className="text-[10px] text-[#173628]/40 font-light">Download as CSV or PDF</p>
                                </div>
                            </div>
                            <span className="text-[#173628]/30 text-[10px] font-bold tracking-[0.2em] uppercase flex items-center gap-1 group-hover:text-[#173628]/60 transition">
                                Generate <span className="material-symbols-outlined text-xs group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </span>
                        </button>

                        <button className="action-card group p-6 bg-white rounded-[1.5rem] border border-black/[0.04] text-left hover:border-[#173628]/10">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-purple-600">local_shipping</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-[#173628] text-sm">Order Supplies</h3>
                                    <p className="text-[10px] text-[#173628]/40 font-light">Restock low items</p>
                                </div>
                            </div>
                            <span className="text-[#173628]/30 text-[10px] font-bold tracking-[0.2em] uppercase flex items-center gap-1 group-hover:text-[#173628]/60 transition">
                                Order Now <span className="material-symbols-outlined text-xs group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </span>
                        </button>

                        <button className="action-card group p-6 bg-gradient-to-br from-[#173628] to-[#1c4a38] rounded-[1.5rem] text-left relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-8 -mt-8 blur-xl"></div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <span className="material-symbols-outlined text-white/80">history</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white text-sm">View History</h3>
                                        <p className="text-[10px] text-white/40 font-light">Inventory movement log</p>
                                    </div>
                                </div>
                                <span className="text-white/30 text-[10px] font-bold tracking-[0.2em] uppercase flex items-center gap-1 group-hover:text-white/60 transition">
                                    Browse <span className="material-symbols-outlined text-xs group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                </span>
                            </div>
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default InventoryTracking;
