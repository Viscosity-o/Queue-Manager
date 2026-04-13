import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/api';

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

const CanteenMenu: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  
  const [cart, setCart] = useState<CartItem[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
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
      if (!token) {
        setError('Please login to view menu');
        setLoading(false);
        return;
      }

      const response = await fetch(API_ENDPOINTS.STUDENT_CANTEEN_MENU(state.canteenId), {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch menu items');
      }

      const data = await response.json();
      setMenuItems(data);
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
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.menuItemId === item.menuItemId);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.menuItemId === item.menuItemId
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading menu...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => navigate('/student-dashboard')}
            className="bg-teal-900 text-white px-6 py-2 rounded-full hover:bg-teal-800 transition"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (menuItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No menu items available for this canteen</p>
          <button
            onClick={() => navigate('/student-dashboard')}
            className="bg-teal-900 text-white px-6 py-2 rounded-full hover:bg-teal-800 transition"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />

      <style>{`
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
      `}</style>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-teal-900 text-white">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => navigate('/student-dashboard')}
                className="flex items-center gap-2 text-white/80 hover:text-white transition"
              >
                <span className="material-symbols-outlined">arrow_back</span>
                <span className="text-sm font-medium">Back to Canteens</span>
              </button>
              <h1 className="text-lg font-bold">The Culinary Editorial</h1>
              <button className="flex items-center gap-2 text-white/80 hover:text-white transition">
                <span className="material-symbols-outlined">person</span>
              </button>
            </div>

            <div>
              <h2 className="text-4xl font-bold mb-2">{canteenName}</h2>
              <p className="text-white/80 text-sm mb-4">
                Fresh, organic ingredients prepared daily with care
              </p>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-white/80">{menuItems.length} items available</span>
              </div>
            </div>
          </div>
        </header>

        {/* Featured Item Banner */}
        {featuredItem && (
          <div className="bg-gradient-to-r from-teal-800 to-teal-900 text-white">
            <div className="max-w-7xl mx-auto px-6 py-8">
              <div className="flex items-center gap-8">
                <div className="flex-1">
                  <span className="inline-block bg-yellow-400 text-teal-900 text-xs font-bold px-3 py-1 rounded-full mb-3">
                    FEATURED ITEM
                  </span>
                  <h3 className="text-3xl font-bold mb-2">{featuredItem.name}</h3>
                  <p className="text-white/80 mb-4">
                    {featuredItem.description || 'Delicious and freshly prepared'}
                  </p>
                  <button
                    onClick={() => addToCart(featuredItem)}
                    className="bg-white text-teal-900 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition flex items-center gap-2"
                  >
                    <span>Add to Cart</span>
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </button>
                </div>
                {featuredItem.image && (
                  <div className="w-80 h-64 rounded-2xl overflow-hidden shadow-2xl">
                    <img
                      src={featuredItem.image}
                      alt="Featured Item"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Menu Content */}
        <main className="max-w-7xl mx-auto px-6 py-12">
          {categories.map(category => (
            <section key={category} className="mb-16">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{category}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {menuItems
                  .filter(item => item.category === category)
                  .map(item => (
                    <div
                      key={item.menuItemId}
                      className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition group"
                    >
                      {item.image && (
                        <div className="h-48 overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                          />
                        </div>
                      )}
                      <div className="p-5">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-bold text-gray-900">{item.name}</h4>
                          {!item.isAvailable && (
                            <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                              Unavailable
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm mb-4">{item.description || 'Delicious item'}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-teal-900">
                            ₹{item.price.toFixed(2)}
                          </span>
                          <button
                            onClick={() => addToCart(item)}
                            disabled={!item.isAvailable}
                            className="bg-teal-900 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-teal-800 transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <span>Add</span>
                            <span className="material-symbols-outlined text-lg">add_shopping_cart</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </section>
          ))}
        </main>

        {/* Floating Cart Button */}
        {cart.length > 0 && (
          <div className="fixed bottom-8 right-8 z-50">
            <button
              onClick={() => navigate('/checkout', { state: { cart } })}
              className="bg-teal-900 text-white px-8 py-4 rounded-full shadow-2xl hover:bg-teal-800 transition flex items-center gap-4 group"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-2xl">shopping_cart</span>
                <div className="text-left">
                  <div className="text-xs opacity-80">View Cart</div>
                  <div className="font-bold">{getTotalItems()} items • ${getTotalPrice().toFixed(2)}</div>
                </div>
              </div>
              <span className="material-symbols-outlined group-hover:translate-x-1 transition">
                arrow_forward
              </span>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CanteenMenu;
