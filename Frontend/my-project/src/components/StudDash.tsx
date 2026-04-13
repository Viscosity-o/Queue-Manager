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

    const handleSearch = async () => {
        if (!searchCode.trim()) {
            setSearchError('Please enter a canteen code');
            return;
        }

        setIsSearching(true);
        setSearchError('');
        setSearchResult(null);

        try {
            const token = localStorage.getItem('authToken'); // Changed from 'token' to 'authToken'
            console.log('Token exists:', !!token);
            
            if (!token) {
                setSearchError('Please login to search for canteens');
                setIsSearching(false);
                return;
            }

            console.log('Searching for canteen code:', searchCode);
            const url = `${API_ENDPOINTS.STUDENT_SEARCH_CANTEEN}?canteenCode=${encodeURIComponent(searchCode)}`;
            console.log('Request URL:', url);

            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            console.log('Response status:', response.status);

            if (response.status === 401) {
                setSearchError('Session expired. Please login again.');
                setIsSearching(false);
                return;
            }

            const data = await response.json();
            console.log('Response data:', data);

            if (!response.ok) {
                setSearchError(data.error || 'Canteen not found');
                return;
            }

            setSearchResult(data);
        } catch (error) {
            console.error('Search error:', error);
            setSearchError('Failed to search. Please try again.');
        } finally {
            setIsSearching(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Global Styles */}
            <style>{`
                .material-symbols-outlined {
                    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
                }
                .glass-nav {
                    background: rgba(255, 255, 255, 0.85);
                    backdrop-filter: blur(16px);
                    -webkit-backdrop-filter: blur(16px);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                }
                .premium-shadow {
                    box-shadow: 0 20px 50px -12px rgba(17, 54, 40, 0.15);
                }
                .cuisine-card:hover .cuisine-icon {
                    transform: scale(1.1) rotate(-5deg);
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                body {
                    font-family: 'Inter', sans-serif;
                }
                .headline {
                    font-family: 'Manrope', sans-serif;
                }
            `}</style>

            {/* TopNavBar */}
           <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
  <div className="max-w-full mx-auto px-6 md:px-12 py-4 flex justify-between items-center">
    
    {/* Site Title */}
    <h1 className="text-lg font-bold text-gray-900">
      The Culinary Editorial
    </h1>

    {/* Navigation */}
    <nav className="hidden md:flex gap-8">
      <a 
        href="#" 
        className="text-gray-700 font-medium text-sm hover:text-teal-700 transition border-b-2 border-transparent hover:border-teal-700 pb-1"
      >
        Home
      </a>
      <a 
        href="#" 
        className="text-gray-700 font-medium text-sm hover:text-teal-700 transition"
      >
        Canteens
      </a>
      <a 
        href="#" 
        className="text-gray-700 font-medium text-sm hover:text-teal-700 transition"
      >
        Specials
      </a>
    </nav>

  </div>
</header>

            {/* Main Content */}
            <main className="pt-28 pb-40 px-6 md:px-12">
                {/* Hero Section */}
                <section className="max-w-5xl mx-auto text-center mb-20">
                    <h2 className="headline text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                        Your Daily <span className="italic text-teal-700">Gastronomic</span> Journey.
                    </h2>
                    <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto mb-10">
                        Discover hand-picked menus across campus, curated for the discerning student palate.
                    </p>

                    {/* Search Bar */}
                    <div className="relative max-w-2xl mx-auto">
                        <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                            <span className="material-symbols-outlined text-gray-400 text-xl">search</span>
                        </div>
                        <input
                            type="text"
                            value={searchCode}
                            onChange={(e) => setSearchCode(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Enter canteen code (e.g., CANT001)..."
                            className="w-full pl-14 pr-28 py-3.5 bg-white border border-gray-200 rounded-full text-gray-700 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:border-transparent shadow-sm"
                        />
                        <button 
                            onClick={handleSearch}
                            disabled={isSearching}
                            className="absolute right-2 top-2 bottom-2 bg-teal-900 text-white px-6 rounded-full font-semibold text-sm hover:bg-teal-950 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSearching ? 'Searching...' : 'Search'}
                        </button>
                    </div>

                    {/* Search Error Message */}
                    {searchError && (
                        <div className="max-w-2xl mx-auto mt-4 p-4 bg-red-50 border border-red-200 rounded-2xl">
                            <p className="text-red-600 text-sm font-medium text-center">{searchError}</p>
                        </div>
                    )}

                    {/* Search Result */}
                    {searchResult && (
                        <div className="max-w-2xl mx-auto mt-6 p-6 bg-white border border-teal-200 rounded-3xl shadow-lg">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="headline text-2xl font-bold text-gray-900 mb-2">
                                        {searchResult.name}
                                    </h3>
                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                        <span className="flex items-center gap-1">
                                            <span className="material-symbols-outlined text-base">badge</span>
                                            {searchResult.canteenCode}
                                        </span>
                                        {searchResult.address && (
                                            <span className="flex items-center gap-1">
                                                <span className="material-symbols-outlined text-base">location_on</span>
                                                {searchResult.address}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSearchResult(null)}
                                    className="text-gray-400 hover:text-gray-600 transition"
                                >
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            </div>
                            <button
                                onClick={() => navigate('/canteen-menu', { state: { canteenId: searchResult.canteenId, canteenName: searchResult.name } })}
                                className="w-full py-3 bg-teal-900 text-white rounded-full font-semibold text-sm hover:bg-teal-950 transition flex items-center justify-center gap-2"
                            >
                                View Menu
                                <span className="material-symbols-outlined text-base">arrow_forward</span>
                            </button>
                        </div>
                    )}
                </section>

                {/* Explore Cuisines Section */}
                <section className="max-w-7xl mx-auto mb-24">
                    <div className="mb-8">
                        <h3 className="headline text-2xl font-bold text-gray-900 mb-1">
                            Explore Cuisines
                        </h3>
                        <p className="text-gray-600 text-sm">
                            What are you craving today?
                        </p>
                    </div>

                    <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar">
                        {[
                            { icon: '', label: 'Burgers' },
                            { icon: '', label: 'Asian' },
                            { icon: '', label: 'Italian' },
                            { icon: '', label: 'Vegan' },
                            { icon: '', label: 'Cafe' },
                            { icon: '', label: 'Desserts' },
                            { icon: '', label: 'Bakery' },
                        ].map((cuisine, idx) => (
                            <button
                                key={idx}
                                className="cuisine-card flex flex-col items-center gap-3 p-5 bg-white rounded-2xl min-w-[100px] border border-gray-200 hover:border-teal-700 transition-all flex-shrink-0"
                            >
                                <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center cuisine-icon transition-transform">
                                    <span className="material-symbols-outlined text-gray-700 text-2xl">
                                        {cuisine.icon}
                                    </span>
                                </div>
                                <span className="text-xs font-semibold text-gray-900 text-center leading-tight">
                                    {cuisine.label}
                                </span>
                            </button>
                        ))}
                    </div>
                </section>

                {/* Featured Canteens Section */}
                <section className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center mb-10">
                        <div>
                            <h3 className="headline text-2xl font-bold text-gray-900 mb-1">
                                Featured Canteens
                            </h3>
                            <p className="text-gray-600 text-sm">
                                Top rated collections for today's lunch
                            </p>
                        </div>
                        <a href="#" className="text-teal-700 font-semibold text-sm flex items-center gap-2 hover:gap-3 transition-all">
                            View All Collections
                            <span className="material-symbols-outlined text-base"></span>
                        </a>
                    </div>

                    {/* Featured Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                        {/* Large Card - Left */}
                        <div 
                            onClick={() => navigate('/canteen-menu')}
                            className="lg:col-span-2 group cursor-pointer rounded-3xl overflow-hidden bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
                        >
                            <div className="relative h-80 overflow-hidden">
                                <img
                                    alt="The Great Hall Kitchen"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2OAV1uvp1Q5Lhm1cc0SQEUYAEyVSz53ghzIRBKgjqJ5lHUIl8eOX0LHm_4paio34lJ12505bCEEwS9LQJVvSWYfw493lsPV6vcg3bmh84mTyCaOwaNlC_yRZiyn1vankKOa6iP2z6ToZ7ZE4TO0QvuyhlCf2GLP40dOG891B99z364kF3jvd7HHr_UAtdUEkiTr6jStsXKFjzyHhaV_7e40uWgT6SOTY8FxsATYxNh2jDKnqcKGDe2bHGRKR7bh5AVAQcIUyavhQ"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-5 left-5">
                                    <span className="bg-teal-900/90 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-2">
                                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                                            workspace_premium
                                        </span>
                                        Premium Choice
                                    </span>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent text-white">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="bg-yellow-400 text-gray-900 px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                                            <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                                                star
                                            </span>
                                            4.9
                                        </span>
                                        <span className="text-white/80 text-xs">| 2,410 Reviews</span>
                                    </div>
                                    <h4 className="headline text-3xl font-bold mb-2">
                                        The Great Hall Kitchen
                                    </h4>
                                    <p className="text-white/90 text-sm leading-relaxed">
                                        Experience artisan sourdough, organic salads, and slow-roasted meats served in a historic setting.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="flex flex-col gap-6">
                            {/* Botanica Greens */}
                            <div 
                                onClick={() => navigate('/canteen-menu')}
                                className="group cursor-pointer rounded-3xl overflow-hidden bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
                            >
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        alt="Botanica Greens"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBya6Je-R2-BF3gZIAyUAFltujDvAOumrWs57seBLWGC8xpovuONrnYizdVphjUw3MyVEcsA1erUv5sN9bzTAph5neQM8_PQ_YLxfU7J8mDM7TQc5WvVLM7ZDFbVfWroMlDL_7NgBOIDHA0wmt_eX1eFfaJiB75EjrWSscvgpX7NZVvpHfrioF7SGHquJ2GLF1lpAMyuzUkJOWO__JVNyLhZGNPGelPlm_5EcnIH5MNXOv5KbgZQofhXByPpA__LY6nGuOnC5B6wVQ"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                                        <span className="material-symbols-outlined text-sm text-yellow-500" style={{ fontVariationSettings: "'FILL' 1" }}>
                                            star
                                        </span>
                                        <span className="text-xs font-bold text-gray-900">4.7</span>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h4 className="headline font-bold text-gray-900 mb-1">
                                        Botanica Greens
                                    </h4>
                                    <p className="text-gray-600 text-xs">
                                        Vegan • Sustainable • Fresh
                                    </p>
                                </div>
                            </div>

                            {/* Piazza Italia */}
                            <div 
                                onClick={() => navigate('/canteen-menu')}
                                className="group cursor-pointer rounded-3xl overflow-hidden bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
                            >
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        alt="Piazza Italia"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAG0Si5b3TiwoouxUtd_T1hh-KEBmPi-OLKNVaBw0oF63LX3eCebAJBlEw50jQIAjSSNWKqztq91jQD6z3PpY8YfeKRweu-w10-VwNaRIH2nFUS9fc2ZbqsR3VzUPT6fXRHpcw78qIgpTSizvmm8W3GevRkMGxYbMFnWEJQiEMAk-IjzbR4dfpnoiQL-rDu52b79An70jMnF-7AerZoqGyaBXfyiAWipJDK48NMgE1JSXnVi08IViWIm9uF2rsrTu3A43QXq2ZdCsA"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                                        <span className="material-symbols-outlined text-sm text-yellow-500" style={{ fontVariationSettings: "'FILL' 1" }}>
                                            star
                                        </span>
                                        <span className="text-xs font-bold text-gray-900">4.5</span>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h4 className="headline font-bold text-gray-900 mb-1">
                                        Piazza Italia
                                    </h4>
                                    <p className="text-gray-600 text-xs">
                                        Traditional • Quick Service
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Canteen Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Library Brew */}
                        <div className="group cursor-pointer rounded-2xl bg-white p-5 flex items-center gap-4 border border-gray-200 hover:border-teal-700 shadow-sm hover:shadow-lg transition-all">
                            <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0">
                                <img
                                    alt="Library Brew"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2OYUp3JC7q0xU4V5aXg9zwhWl0G3OxwOEgknXLxdCwACilsZ8FApTI-_MlLodI0QEXeg1Rt_DE85FvCIjEKCNqFZG-U2uM8-I0-Dnir9AynJaPJX-OH2fmUmuVqZ6PNktUp0HTAzTKzeeL0b-tIS_wjcSLHxGrBp1XMg8hTZB_c8ndxMdQgnasIqGxXRpPXHN1NsWJJbqAFJnGHFW_XfOJg-JOM5dHbRXJtSFTUTygvl__R7gghJjMy3Mb0HZeCcIPLTK_VXKYvg"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="headline font-bold text-gray-900 mb-2 group-hover:text-teal-700 transition">
                                    Library Brew
                                </h4>
                                <div className="flex items-center gap-3">
                                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                        Quiet Zone
                                    </span>
                                    <div className="flex items-center gap-1">
                                        <span className="material-symbols-outlined text-xs text-yellow-500" style={{ fontVariationSettings: "'FILL' 1" }}>
                                            star
                                        </span>
                                        <span className="text-xs font-bold text-gray-900">4.8</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Zen Ramen Bar */}
                        <div className="group cursor-pointer rounded-2xl bg-white p-5 flex items-center gap-4 border border-gray-200 hover:border-teal-700 shadow-sm hover:shadow-lg transition-all">
                            <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0">
                                <img
                                    alt="Zen Ramen Bar"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkTjDmjSslqJ1BLGJHlXn1z8VAm4kXzn32qozbrcjPzvdFK8Yli9J9OgFOjLrqf3gg2Jv7U3BfbYx2qhPt9XjNNHl4OPpX0y7pmq-D99vS3XiEU5dlUp0g2T6Tj6Ra-kaMULkgN81MLutiW-Yfdcubecpn2mbFApwt00tqz3G_TgjXIAVd0zkOd14J_6CqgjL61ob20tWGNqSf7i2q-oxSnI9K5jqw5OSvt3N1hqXWxvO5_mfFVubkIaDVkkfPQsRalbh2XHz6LJ4"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="headline font-bold text-gray-900 mb-2 group-hover:text-teal-700 transition">
                                    Zen Ramen Bar
                                </h4>
                                <div className="flex items-center gap-3">
                                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                        Asian Express
                                    </span>
                                    <div className="flex items-center gap-1">
                                        <span className="material-symbols-outlined text-xs text-yellow-500" style={{ fontVariationSettings: "'FILL' 1" }}>
                                            star
                                        </span>
                                        <span className="text-xs font-bold text-gray-900">4.6</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* The Pastry Lab */}
                        <div className="group cursor-pointer rounded-2xl bg-white p-5 flex items-center gap-4 border border-gray-200 hover:border-teal-700 shadow-sm hover:shadow-lg transition-all">
                            <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0">
                                <img
                                    alt="The Pastry Lab"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBInwN5N_cZv4wtZ5QW0cS5XqUebRx5oI6g9h0Kw5fEbVehUhvNtOhY2t4Y7bEFUmQkpSmwrKmYAyon6irhgIw00lkrTzpv6ay1GgVkzUaWWE5IKfKtjTcV_DfsSQF6ymaZO0JudhM4i4CimbWyVJE2QrjCaKIBc_xP-Kq3iKKXxtJ1tqc5FOpZbYxJrC7punPATUJ5lYtSsjJ_UPIypglfCVURctzG4jKVWcDlVaQ1z1UOECTh3zpB-YturNh3mlFJ6Z0UOCEPJOw"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="headline font-bold text-gray-900 mb-2 group-hover:text-teal-700 transition">
                                    The Pastry Lab
                                </h4>
                                <div className="flex items-center gap-3">
                                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                        Desserts
                                    </span>
                                    <div className="flex items-center gap-1">
                                        <span className="material-symbols-outlined text-xs text-yellow-500" style={{ fontVariationSettings: "'FILL' 1" }}>
                                            star
                                        </span>
                                        <span className="text-xs font-bold text-gray-900">4.9</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Bottom Navigation */}
            {/* <nav className="fixed bottom-8 left-0 right-0 flex justify-center z-50 px-6">
                <div className="glass-nav rounded-full max-w-sm w-full premium-shadow flex justify-between items-center px-2 py-3">
                    <a
                        href="#"
                        className="flex-1 flex flex-col items-center justify-center gap-1 py-2 bg-teal-700 text-white rounded-full transition-all duration-300"
                    >
                        <span
                            className="material-symbols-outlined text-xl"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                            home
                        </span>
                        <span className="text-[9px] font-bold tracking-wider">HOME</span>
                    </a>
                    <a
                        href="#"
                        className="flex-1 flex flex-col items-center justify-center gap-1 py-2 text-gray-600 hover:text-teal-700 transition-all duration-300"
                    >
                        <span className="material-symbols-outlined text-xl">
                            restaurant_menu
                        </span>
                        <span className="text-[9px] font-bold tracking-wider">MENUS</span>
                    </a>
                    <a
                        href="#"
                        className="flex-1 flex flex-col items-center justify-center gap-1 py-2 text-gray-600 hover:text-teal-700 transition-all duration-300"
                    >
                        <span className="material-symbols-outlined text-xl">
                            shopping_cart
                        </span>
                        <span className="text-[9px] font-bold tracking-wider">CART</span>
                    </a>
                    <a
                        href="#"
                        className="flex-1 flex flex-col items-center justify-center gap-1 py-2 text-gray-600 hover:text-teal-700 transition-all duration-300"
                    >
                        <span className="material-symbols-outlined text-xl">
                            person
                        </span>
                        <span className="text-[9px] font-bold tracking-wider">ACCOUNT</span>
                    </a>
                </div>
            </nav> */}
        </div>
    );
};

export default StudDash;