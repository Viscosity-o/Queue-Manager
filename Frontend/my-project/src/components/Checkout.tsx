import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/api';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface CartItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
}

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cart = (location.state?.cart as CartItem[]) || [];

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cash'>('upi');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [loading, setLoading] = useState(false);
  const [razorpayKeyId, setRazorpayKeyId] = useState('');

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    // Fetch Razorpay key
    fetch(API_ENDPOINTS.PAYMENT_KEY)
      .then(res => res.json())
      .then(data => setRazorpayKeyId(data.keyId))
      .catch(err => console.error('Failed to fetch Razorpay key:', err));

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleCompleteOrder = async () => {
    if (paymentMethod === 'cash') {
      alert('Order placed! Please pay at the counter when picking up your order.');
      navigate('/student-dashboard');
      return;
    }

    if (paymentMethod === 'upi') {
      await initiateRazorpayPayment();
    } else if (paymentMethod === 'card') {
      alert('Card payment will be processed through Razorpay');
      await initiateRazorpayPayment();
    }
  };

  const initiateRazorpayPayment = async () => {
    setLoading(true);

    try {
      // Create order on backend
      const orderResponse = await fetch(API_ENDPOINTS.PAYMENT_CREATE_ORDER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentId: '123e4567-e89b-12d3-a456-426614174000', // Replace with actual student ID from auth
          canteenId: '123e4567-e89b-12d3-a456-426614174001', // Replace with actual canteen ID
          amount: total,
          currency: 'INR',
          items: cart.map(item => ({
            itemId: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price
          }))
        }),
      });

      const orderData = await orderResponse.json();

      if (!orderResponse.ok) {
        throw new Error(orderData.error || 'Failed to create order');
      }

      // Initialize Razorpay
      const options = {
        key: razorpayKeyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'The Culinary Editorial',
        description: 'Order Payment',
        order_id: orderData.orderId,
        handler: async function (response: any) {
          // Verify payment on backend
          try {
            const verifyResponse = await fetch(API_ENDPOINTS.PAYMENT_VERIFY, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyResponse.json();

            if (verifyData.success) {
              alert('Payment successful! Your order has been placed.');
              navigate('/student-dashboard');
            } else {
              alert('Payment verification failed. Please contact support.');
            }
          } catch (error) {
            console.error('Verification error:', error);
            alert('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: 'Student Name', // Replace with actual student name
          email: 'student@example.com', // Replace with actual student email
          contact: '9999999999', // Replace with actual student phone
        },
        theme: {
          color: '#173628',
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
            alert('Payment cancelled');
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      alert(error.message || 'Failed to initiate payment');
    }
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
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-white/80 hover:text-white transition"
              >
                <span className="material-symbols-outlined">arrow_back</span>
                <span className="text-sm font-medium">Back</span>
              </button>
              <h1 className="text-lg font-bold">The Culinary Editorial</h1>
              <div className="w-20"></div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-6 py-12">
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Checkout</h2>
            <p className="text-gray-600">
              Your curated selection is ready to enjoy. Finalize your experience with our secure beverage payment system.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Order Summary */}
            <div className="lg:col-span-2 space-y-6">
              {/* Order Items */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <div className="flex items-center gap-2 mb-6">
                  <span className="material-symbols-outlined text-teal-900">receipt_long</span>
                  <h3 className="text-xl font-bold text-gray-900">Order Summary</h3>
                </div>

                <div className="space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center gap-4 pb-4 border-b border-gray-100 last:border-0">
                      <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-gray-900 mb-1">{item.name}</h4>
                        <p className="text-gray-500 text-sm truncate">{item.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs text-gray-500">Qty: {item.quantity}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (8%)</span>
                    <span className="font-semibold">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-gray-900 pt-3 border-t border-gray-200">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Refund Policy */}
              <div className="bg-teal-50 rounded-2xl p-6 border border-teal-100">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-teal-900 rounded-full flex items-center justify-center">
                      <span className="material-symbols-outlined text-white">verified_user</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Refund & Satisfaction Guarantee</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      If you're not completely satisfied with your order, we offer a full refund within 30 minutes of pickup. Your satisfaction is our priority.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Payment */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <div className="flex items-center gap-2 mb-6">
                  <span className="material-symbols-outlined text-teal-900">credit_card</span>
                  <h3 className="text-xl font-bold text-gray-900">Secure Payment</h3>
                </div>

                {/* Payment Method Selector */}
                <div className="space-y-3 mb-6">
                  <button
                    onClick={() => setPaymentMethod('upi')}
                    className={`w-full p-4 rounded-xl border-2 transition text-left ${
                      paymentMethod === 'upi'
                        ? 'border-teal-900 bg-teal-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === 'upi' ? 'border-teal-900' : 'border-gray-300'
                      }`}>
                        {paymentMethod === 'upi' && (
                          <div className="w-3 h-3 bg-teal-900 rounded-full"></div>
                        )}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">UPI</div>
                        <div className="text-xs text-gray-500">Google Pay, PhonePe, Paytm</div>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`w-full p-4 rounded-xl border-2 transition text-left ${
                      paymentMethod === 'card'
                        ? 'border-teal-900 bg-teal-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === 'card' ? 'border-teal-900' : 'border-gray-300'
                      }`}>
                        {paymentMethod === 'card' && (
                          <div className="w-3 h-3 bg-teal-900 rounded-full"></div>
                        )}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Credit / Debit Card</div>
                        <div className="text-xs text-gray-500">Visa, Mastercard, Amex</div>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => setPaymentMethod('cash')}
                    className={`w-full p-4 rounded-xl border-2 transition text-left ${
                      paymentMethod === 'cash'
                        ? 'border-teal-900 bg-teal-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === 'cash' ? 'border-teal-900' : 'border-gray-300'
                      }`}>
                        {paymentMethod === 'cash' && (
                          <div className="w-3 h-3 bg-teal-900 rounded-full"></div>
                        )}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Cash on Pickup</div>
                        <div className="text-xs text-gray-500">Pay at counter</div>
                      </div>
                    </div>
                  </button>
                </div>

                {/* Payment Details Form */}
                {paymentMethod === 'upi' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        UPI ID
                      </label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="yourname@upi"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-900 focus:border-transparent outline-none"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Card Number
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-900 focus:border-transparent outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          value={expiryDate}
                          onChange={(e) => setExpiryDate(e.target.value)}
                          placeholder="MM / YY"
                          maxLength={7}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-900 focus:border-transparent outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value)}
                          placeholder="123"
                          maxLength={3}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-900 focus:border-transparent outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Complete Order Button */}
                <button
                  onClick={handleCompleteOrder}
                  disabled={loading}
                  className="w-full mt-6 bg-teal-900 text-white py-4 rounded-full font-bold hover:bg-teal-800 transition flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>{loading ? 'Processing...' : 'Complete Order & Pay'}</span>
                  {!loading && (
                    <span className="material-symbols-outlined group-hover:translate-x-1 transition">
                      arrow_forward
                    </span>
                  )}
                </button>

                {/* Security Icons */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-center gap-4 text-gray-400">
                    <span className="material-symbols-outlined">lock</span>
                    <span className="material-symbols-outlined">verified</span>
                    <span className="material-symbols-outlined">security</span>
                  </div>
                  <p className="text-center text-xs text-gray-500 mt-2">
                    256-bit SSL encrypted payment
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Checkout;
