import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface CartItem extends MenuItem {
  quantity: number;
}

const CanteenMenu: React.FC = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartItem[]>([]);

  const menuItems: MenuItem[] = [
    {
      id: 1,
      name: 'Harvest Radish 3-Salad Bowl',
      description: 'Fresh greens with radish, cucumber, and house vinaigrette',
      price: 18.40,
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
      category: 'Mains'
    },
    {
      id: 2,
      name: 'Wild Caught Atlantic Salmon',
      description: 'Pan-seared salmon with seasonal vegetables',
      price: 32.00,
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop',
      category: 'Mains'
    },
    {
      id: 3,
      name: 'Chamomile Oasis Matcha',
      description: 'Premium matcha with chamomile infusion',
      price: 14.00,
      image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop',
      category: 'Beverages'
    },
    {
      id: 4,
      name: 'Iced Cappuccino',
      description: 'Double shot espresso over ice with cold foam',
      price: 8.50,
      image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400&h=300&fit=crop',
      category: 'Beverages'
    },
    {
      id: 5,
      name: 'Strawberry Smoothie',
      description: 'Fresh strawberries blended with yogurt',
      price: 9.00,
      image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400&h=300&fit=crop',
      category: 'Beverages'
    },
    {
      id: 6,
      name: 'Grilled Chicken Sandwich',
      description: 'Herb-marinated chicken with fresh vegetables',
      price: 15.50,
      image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&h=300&fit=crop',
      category: 'Combos & Meals'
    },
    {
      id: 7,
      name: 'Veggie Burger Combo',
      description: 'Plant-based patty with fries and drink',
      price: 18.00,
      image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=400&h=300&fit=crop',
      category: 'Combos & Meals'
    },
    {
      id: 8,
      name: 'Sweet Potato Fries',
      description: 'Crispy sweet potato fries with aioli',
      price: 6.50,
      image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop',
      category: 'Snacks & Sides'
    }
  ];

  const categories = ['Beverages', 'Mains', 'Combos & Meals', 'Snacks & Sides'];

  const addToCart = (item: MenuItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
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
              <h2 className="text-4xl font-bold mb-2">The Garden Canteen</h2>
              <p className="text-white/80 text-sm mb-4">
                Fresh, organic ingredients prepared daily with care
              </p>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-yellow-400" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="font-semibold">4.8</span>
                  <span className="text-white/60">(2,410 reviews)</span>
                </div>
                <span className="text-white/40">•</span>
                <span className="text-white/80">Open until 8:00 PM</span>
              </div>
            </div>
          </div>
        </header>

        {/* Featured Item Banner */}
        <div className="bg-gradient-to-r from-teal-800 to-teal-900 text-white">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex items-center gap-8">
              <div className="flex-1">
                <span className="inline-block bg-yellow-400 text-teal-900 text-xs font-bold px-3 py-1 rounded-full mb-3">
                  SPECIAL AVAILABLE NOW
                </span>
                <h3 className="text-3xl font-bold mb-2">Harvest Radish 3-Salad Bowl</h3>
                <p className="text-white/80 mb-4">
                  A vibrant mix of fresh greens, crisp radishes, and seasonal vegetables
                </p>
                <button
                  onClick={() => addToCart(menuItems[0])}
                  className="bg-white text-teal-900 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition flex items-center gap-2"
                >
                  <span>Add to Cart</span>
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>
              <div className="w-80 h-64 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={menuItems[0].image}
                  alt="Featured Item"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

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
                      key={item.id}
                      className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition group"
                    >
                      <div className="h-48 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                      </div>
                      <div className="p-5">
                        <h4 className="font-bold text-gray-900 mb-2">{item.name}</h4>
                        <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-teal-900">
                            ${item.price.toFixed(2)}
                          </span>
                          <button
                            onClick={() => addToCart(item)}
                            className="bg-teal-900 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-teal-800 transition flex items-center gap-2"
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
