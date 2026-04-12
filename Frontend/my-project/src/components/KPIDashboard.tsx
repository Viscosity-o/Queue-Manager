import { useNavigate } from 'react-router-dom';

const KPIDashboard = () => {
    const navigate = useNavigate();

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
                .metric-card {
                    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                }
                .metric-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 20px 40px -12px rgba(17, 54, 40, 0.12);
                }
                .progress-bar {
                    transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .table-row {
                    transition: all 0.25s ease;
                }
                .table-row:hover {
                    transform: translateX(4px);
                    background: linear-gradient(135deg, rgba(23, 54, 40, 0.03) 0%, rgba(23, 54, 40, 0.01) 100%);
                }
                .section-fade {
                    animation: sectionFade 0.6s ease-out;
                }
                @keyframes sectionFade {
                    from { opacity: 0; transform: translateY(16px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .glow-ring {
                    box-shadow: 0 0 0 3px rgba(23, 54, 40, 0.06);
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
                                KPI Dashboard
                            </h1>
                            <p className="text-[10px] text-[#173628]/30 font-medium tracking-[0.15em] uppercase">Performance Analytics</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <select className="px-4 py-2 bg-[#173628]/[0.04] border border-[#173628]/10 rounded-xl text-[11px] font-bold text-[#173628]/60 tracking-wider uppercase focus:outline-none focus:ring-2 focus:ring-[#173628]/20 appearance-none cursor-pointer pr-8 bg-none">
                            <option>Today</option>
                            <option>This Week</option>
                            <option>This Month</option>
                            <option>This Year</option>
                        </select>
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

                    {/* Revenue Metrics Section */}
                    <div className="mb-12 section-fade">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-[#173628]/30 font-bold tracking-[0.3em] uppercase text-[10px]">01</span>
                            <div className="h-px flex-1 bg-gradient-to-r from-[#173628]/10 to-transparent"></div>
                        </div>
                        <h2 className="headline text-3xl font-bold text-[#173628] mb-8 tracking-tight">
                            Revenue & Sales <span className="italic font-light">Performance</span>
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            {/* Featured Revenue Card */}
                            <div className="metric-card bg-gradient-to-br from-[#173628] to-[#1c4a38] rounded-[1.5rem] p-6 text-white shadow-xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-2xl"></div>
                                <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/3 rounded-full -ml-6 -mb-6 blur-xl"></div>
                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-6">
                                        <span className="material-symbols-outlined text-2xl opacity-60">payments</span>
                                        <span className="text-[10px] font-bold tracking-widest uppercase bg-white/15 px-3 py-1 rounded-full">+15.3%</span>
                                    </div>
                                    <h3 className="text-3xl font-bold mb-1 tracking-tight">₹1,24,580</h3>
                                    <p className="text-white/40 text-xs font-medium tracking-wider uppercase">Total Revenue (MTD)</p>
                                </div>
                            </div>

                            <div className="metric-card bg-white rounded-[1.5rem] p-6 border border-black/[0.04] shadow-sm">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center">
                                        <span className="material-symbols-outlined text-blue-600 text-xl">shopping_cart</span>
                                    </div>
                                    <span className="text-emerald-600 text-xs font-bold bg-emerald-50 px-2.5 py-1 rounded-full">+8.2%</span>
                                </div>
                                <h3 className="text-2xl font-bold text-[#173628] mb-1 tracking-tight">2,847</h3>
                                <p className="text-[#173628]/40 text-xs font-medium tracking-wider uppercase">Total Orders</p>
                            </div>

                            <div className="metric-card bg-white rounded-[1.5rem] p-6 border border-black/[0.04] shadow-sm">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="w-11 h-11 bg-purple-50 rounded-xl flex items-center justify-center">
                                        <span className="material-symbols-outlined text-purple-600 text-xl">receipt_long</span>
                                    </div>
                                    <span className="text-emerald-600 text-xs font-bold bg-emerald-50 px-2.5 py-1 rounded-full">+12.5%</span>
                                </div>
                                <h3 className="text-2xl font-bold text-[#173628] mb-1 tracking-tight">₹438</h3>
                                <p className="text-[#173628]/40 text-xs font-medium tracking-wider uppercase">Avg Order Value</p>
                            </div>

                            <div className="metric-card bg-white rounded-[1.5rem] p-6 border border-black/[0.04] shadow-sm">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="w-11 h-11 bg-emerald-50 rounded-xl flex items-center justify-center">
                                        <span className="material-symbols-outlined text-emerald-600 text-xl">trending_up</span>
                                    </div>
                                    <span className="text-emerald-600 text-xs font-bold bg-emerald-50 px-2.5 py-1 rounded-full">+5.8%</span>
                                </div>
                                <h3 className="text-2xl font-bold text-[#173628] mb-1 tracking-tight">₹18,240</h3>
                                <p className="text-[#173628]/40 text-xs font-medium tracking-wider uppercase">Daily Average</p>
                            </div>
                        </div>
                    </div>

                    {/* Operational Metrics Section */}
                    <div className="mb-12 section-fade" style={{ animationDelay: '0.1s' }}>
                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-[#173628]/30 font-bold tracking-[0.3em] uppercase text-[10px]">02</span>
                            <div className="h-px flex-1 bg-gradient-to-r from-[#173628]/10 to-transparent"></div>
                        </div>
                        <h2 className="headline text-3xl font-bold text-[#173628] mb-8 tracking-tight">
                            Operational <span className="italic font-light">Efficiency</span>
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            <div className="metric-card bg-white rounded-[1.5rem] p-6 border border-black/[0.04] shadow-sm">
                                <div className="flex items-center justify-between mb-5">
                                    <div className="w-11 h-11 bg-orange-50 rounded-xl flex items-center justify-center">
                                        <span className="material-symbols-outlined text-orange-500 text-xl">schedule</span>
                                    </div>
                                    <span className="text-emerald-600 text-xs font-bold bg-emerald-50 px-2.5 py-1 rounded-full">-2 mins</span>
                                </div>
                                <h3 className="text-2xl font-bold text-[#173628] mb-1 tracking-tight">12 mins</h3>
                                <p className="text-[#173628]/40 text-xs font-medium tracking-wider uppercase mb-5">Avg Prep Time</p>
                                <div className="w-full bg-[#173628]/[0.04] rounded-full h-1.5 overflow-hidden">
                                    <div className="progress-bar bg-gradient-to-r from-orange-400 to-orange-500 h-1.5 rounded-full" style={{ width: '75%' }}></div>
                                </div>
                                <div className="flex justify-between mt-2">
                                    <span className="text-[10px] text-[#173628]/25 font-light">Target: 10 mins</span>
                                    <span className="text-[10px] text-orange-500 font-bold">75%</span>
                                </div>
                            </div>

                            <div className="metric-card bg-white rounded-[1.5rem] p-6 border border-black/[0.04] shadow-sm">
                                <div className="flex items-center justify-between mb-5">
                                    <div className="w-11 h-11 bg-amber-50 rounded-xl flex items-center justify-center">
                                        <span className="material-symbols-outlined text-amber-500 text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                    </div>
                                    <span className="text-emerald-600 text-xs font-bold bg-emerald-50 px-2.5 py-1 rounded-full">+0.3</span>
                                </div>
                                <h3 className="text-2xl font-bold text-[#173628] mb-1 tracking-tight">4.7/5.0</h3>
                                <p className="text-[#173628]/40 text-xs font-medium tracking-wider uppercase mb-5">Customer Rating</p>
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <span key={star} className={`material-symbols-outlined text-lg ${star <= 4 ? 'text-amber-400' : 'text-amber-200'}`} style={{ fontVariationSettings: "'FILL' 1" }}>
                                            star
                                        </span>
                                    ))}
                                    <span className="ml-2 text-xs text-[#173628]/30 font-light self-center">Based on 1,240 reviews</span>
                                </div>
                            </div>

                            <div className="metric-card bg-white rounded-[1.5rem] p-6 border border-black/[0.04] shadow-sm">
                                <div className="flex items-center justify-between mb-5">
                                    <div className="w-11 h-11 bg-rose-50 rounded-xl flex items-center justify-center">
                                        <span className="material-symbols-outlined text-rose-500 text-xl">cancel</span>
                                    </div>
                                    <span className="text-rose-600 text-xs font-bold bg-rose-50 px-2.5 py-1 rounded-full">+1.2%</span>
                                </div>
                                <h3 className="text-2xl font-bold text-[#173628] mb-1 tracking-tight">3.5%</h3>
                                <p className="text-[#173628]/40 text-xs font-medium tracking-wider uppercase mb-5">Order Cancel Rate</p>
                                <div className="w-full bg-[#173628]/[0.04] rounded-full h-1.5 overflow-hidden">
                                    <div className="progress-bar bg-gradient-to-r from-rose-400 to-rose-500 h-1.5 rounded-full" style={{ width: '35%' }}></div>
                                </div>
                                <div className="flex justify-between mt-2">
                                    <span className="text-[10px] text-[#173628]/25 font-light">Target: &lt;2%</span>
                                    <span className="text-[10px] text-rose-500 font-bold">35%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Customer Insights Section */}
                    <div className="mb-12 section-fade" style={{ animationDelay: '0.2s' }}>
                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-[#173628]/30 font-bold tracking-[0.3em] uppercase text-[10px]">03</span>
                            <div className="h-px flex-1 bg-gradient-to-r from-[#173628]/10 to-transparent"></div>
                        </div>
                        <h2 className="headline text-3xl font-bold text-[#173628] mb-8 tracking-tight">
                            Customer <span className="italic font-light">Insights</span>
                        </h2>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                            {/* Demographics */}
                            <div className="metric-card bg-white rounded-[1.5rem] p-6 border border-black/[0.04] shadow-sm">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 bg-[#173628]/[0.04] rounded-xl flex items-center justify-center">
                                        <span className="material-symbols-outlined text-[#173628]/60">people</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-[#173628] text-sm">Customer Demographics</h3>
                                        <p className="text-[10px] text-[#173628]/30 font-light">Breakdown of customer segments</p>
                                    </div>
                                </div>
                                <div className="space-y-5">
                                    <div>
                                        <div className="flex justify-between mb-2">
                                            <span className="text-xs text-[#173628]/50 font-light">New Customers</span>
                                            <span className="text-xs font-bold text-[#173628]">42%</span>
                                        </div>
                                        <div className="w-full bg-[#173628]/[0.04] rounded-full h-1.5 overflow-hidden">
                                            <div className="progress-bar bg-gradient-to-r from-[#173628] to-[#2a5a47] h-1.5 rounded-full" style={{ width: '42%' }}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between mb-2">
                                            <span className="text-xs text-[#173628]/50 font-light">Returning Customers</span>
                                            <span className="text-xs font-bold text-[#173628]">58%</span>
                                        </div>
                                        <div className="w-full bg-[#173628]/[0.04] rounded-full h-1.5 overflow-hidden">
                                            <div className="progress-bar bg-gradient-to-r from-blue-500 to-blue-600 h-1.5 rounded-full" style={{ width: '58%' }}></div>
                                        </div>
                                    </div>
                                    <div className="pt-5 border-t border-black/[0.04]">
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs text-[#173628]/50 font-light">Customer Retention</span>
                                            <div className="flex items-center gap-2">
                                                <span className="text-xl font-bold text-emerald-600">78%</span>
                                                <span className="material-symbols-outlined text-emerald-500 text-sm">trending_up</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Peak Hours */}
                            <div className="metric-card bg-white rounded-[1.5rem] p-6 border border-black/[0.04] shadow-sm">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 bg-[#173628]/[0.04] rounded-xl flex items-center justify-center">
                                        <span className="material-symbols-outlined text-[#173628]/60">schedule</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-[#173628] text-sm">Peak Hours Analysis</h3>
                                        <p className="text-[10px] text-[#173628]/30 font-light">Order volume by time slot</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    {[
                                        { time: '8:00 – 10:00 AM', orders: 245, percentage: 85, peak: false },
                                        { time: '12:00 – 2:00 PM', orders: 420, percentage: 100, peak: true },
                                        { time: '6:00 – 8:00 PM', orders: 380, percentage: 90, peak: false },
                                        { time: '8:00 – 10:00 PM', orders: 180, percentage: 45, peak: false },
                                    ].map((slot, idx) => (
                                        <div key={idx}>
                                            <div className="flex justify-between mb-2 items-center">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs text-[#173628]/50 font-light">{slot.time}</span>
                                                    {slot.peak && (
                                                        <span className="text-[9px] font-bold tracking-wider uppercase bg-[#173628]/[0.06] text-[#173628]/60 px-2 py-0.5 rounded-full">Peak</span>
                                                    )}
                                                </div>
                                                <span className="text-xs font-bold text-[#173628]">{slot.orders} orders</span>
                                            </div>
                                            <div className="w-full bg-[#173628]/[0.04] rounded-full h-1.5 overflow-hidden">
                                                <div className="progress-bar bg-gradient-to-r from-[#173628] to-emerald-500 h-1.5 rounded-full" style={{ width: `${slot.percentage}%` }}></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Top Performing Items */}
                    <div className="mb-12 section-fade" style={{ animationDelay: '0.3s' }}>
                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-[#173628]/30 font-bold tracking-[0.3em] uppercase text-[10px]">04</span>
                            <div className="h-px flex-1 bg-gradient-to-r from-[#173628]/10 to-transparent"></div>
                        </div>
                        <h2 className="headline text-3xl font-bold text-[#173628] mb-8 tracking-tight">
                            Top Performing <span className="italic font-light">Menu Items</span>
                        </h2>
                        <div className="bg-white rounded-[1.5rem] border border-black/[0.04] shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-black/[0.04]">
                                            {['Rank', 'Item Name', 'Orders', 'Revenue', 'Rating', 'Trend'].map((h) => (
                                                <th key={h} className="px-6 py-4 text-left text-[10px] font-bold text-[#173628]/30 uppercase tracking-[0.2em]">
                                                    {h}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[
                                            { rank: 1, name: 'Masala Dosa', orders: 342, revenue: '₹51,300', rating: 4.9, trend: 'up', emoji: '🥞' },
                                            { rank: 2, name: 'Paneer Butter Masala', orders: 298, revenue: '₹56,620', rating: 4.8, trend: 'up', emoji: '🍛' },
                                            { rank: 3, name: 'Veg Biryani', orders: 276, revenue: '₹41,400', rating: 4.7, trend: 'same', emoji: '🍚' },
                                            { rank: 4, name: 'Chole Bhature', orders: 245, revenue: '₹36,750', rating: 4.6, trend: 'up', emoji: '🫓' },
                                            { rank: 5, name: 'Samosa (2 pcs)', orders: 412, revenue: '₹24,720', rating: 4.5, trend: 'down', emoji: '🥟' },
                                        ].map((item) => (
                                            <tr key={item.rank} className="table-row border-b border-black/[0.02] last:border-0 cursor-pointer">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                                                        item.rank <= 3 
                                                            ? 'bg-gradient-to-br from-[#173628] to-[#2a5a47] text-white' 
                                                            : 'bg-[#173628]/[0.04] text-[#173628]/50'
                                                    }`}>
                                                        <span className="font-bold text-[11px]">#{item.rank}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-lg">{item.emoji}</span>
                                                        <span className="font-semibold text-[#173628] text-sm">{item.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="font-bold text-[#173628] text-sm">{item.orders}</span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="font-bold text-[#173628] text-sm">{item.revenue}</span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-1.5">
                                                        <span className="material-symbols-outlined text-amber-400 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                                                            star
                                                        </span>
                                                        <span className="font-semibold text-[#173628] text-sm">{item.rating}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className={`flex items-center gap-1 ${
                                                        item.trend === 'up' ? 'text-emerald-500' :
                                                        item.trend === 'down' ? 'text-rose-500' :
                                                        'text-[#173628]/25'
                                                    }`}>
                                                        <span className="material-symbols-outlined text-lg">
                                                            {item.trend === 'up' ? 'trending_up' :
                                                             item.trend === 'down' ? 'trending_down' :
                                                             'trending_flat'}
                                                        </span>
                                                        <span className="text-[10px] font-bold tracking-wider uppercase">
                                                            {item.trend === 'up' ? 'Rising' : item.trend === 'down' ? 'Falling' : 'Stable'}
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Financial Summary */}
                    <div className="section-fade" style={{ animationDelay: '0.4s' }}>
                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-[#173628]/30 font-bold tracking-[0.3em] uppercase text-[10px]">05</span>
                            <div className="h-px flex-1 bg-gradient-to-r from-[#173628]/10 to-transparent"></div>
                        </div>
                        <h2 className="headline text-3xl font-bold text-[#173628] mb-8 tracking-tight">
                            Financial <span className="italic font-light">Summary</span>
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            <div className="metric-card bg-white rounded-[1.5rem] p-6 border border-black/[0.04] shadow-sm">
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
                                        <span className="material-symbols-outlined text-emerald-600 text-lg">account_balance_wallet</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-[#173628] text-sm">Gross Profit</h3>
                                        <p className="text-[10px] text-[#173628]/30 font-light">Margin: 62.9%</p>
                                    </div>
                                </div>
                                <p className="text-3xl font-bold text-[#173628] mb-3 tracking-tight">₹78,420</p>
                                <div className="w-full bg-[#173628]/[0.04] rounded-full h-1.5 overflow-hidden">
                                    <div className="progress-bar bg-gradient-to-r from-emerald-400 to-emerald-500 h-1.5 rounded-full" style={{ width: '63%' }}></div>
                                </div>
                            </div>

                            <div className="metric-card bg-white rounded-[1.5rem] p-6 border border-black/[0.04] shadow-sm">
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center">
                                        <span className="material-symbols-outlined text-rose-500 text-lg">payments</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-[#173628] text-sm">Operating Costs</h3>
                                        <p className="text-[10px] text-[#173628]/30 font-light">37.1% of revenue</p>
                                    </div>
                                </div>
                                <p className="text-3xl font-bold text-[#173628] mb-3 tracking-tight">₹46,160</p>
                                <div className="w-full bg-[#173628]/[0.04] rounded-full h-1.5 overflow-hidden">
                                    <div className="progress-bar bg-gradient-to-r from-rose-400 to-rose-500 h-1.5 rounded-full" style={{ width: '37%' }}></div>
                                </div>
                            </div>

                            <div className="metric-card bg-gradient-to-br from-[#173628] to-[#1c4a38] rounded-[1.5rem] p-6 text-white shadow-xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-8 -mt-8 blur-xl"></div>
                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-5">
                                        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                                            <span className="material-symbols-outlined text-white/80 text-lg">savings</span>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-white text-sm">Net Profit</h3>
                                            <p className="text-[10px] text-white/30 font-light">Final bottom line</p>
                                        </div>
                                    </div>
                                    <p className="text-3xl font-bold text-white mb-1.5 tracking-tight">₹32,260</p>
                                    <span className="text-emerald-300 text-xs font-bold bg-emerald-500/20 px-2.5 py-1 rounded-full">+18.5% vs last month</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default KPIDashboard;
