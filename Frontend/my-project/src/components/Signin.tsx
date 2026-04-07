import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/api';

const Signin: React.FC = () => {
  const [activeRole, setActiveRole] = useState<'student' | 'staff'>('student');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<'student' | 'staff' | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const goto = useNavigate();

  useEffect(() => {
    if (authToken && userRole) {
      if (userRole === 'student') {
        goto('/StudDASH');
      } else if (userRole === 'staff') {
        goto('/StaffDash');
      }
    }
  }, [authToken, userRole, goto]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch(API_ENDPOINTS.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      if (!response.ok) {
        const data = await response.json();
        const errorText = data?.message || data?.error || 'Login failed. Please check your credentials.';
        throw new Error(errorText);
      }

      const data = await response.json();
      
      // Backend returns "STUDENT" or "CANTEEN"
      const normalizedRole = String(data.role || '').toLowerCase();
      const mappedRole = normalizedRole === 'canteen' ? 'staff' : normalizedRole;
      
      if (mappedRole !== 'student' && mappedRole !== 'staff') {
        throw new Error('Invalid role returned from server.');
      }

      setAuthToken(data.token);
      setUserRole(mappedRole as 'student' | 'staff');
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('userRole', mappedRole);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Left Section - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 py-12 sm:px-12 lg:px-16">
        
        {/* Logo */}
        <div className="mb-12 lg:mb-16 text-center lg:text-left w-full max-w-md">
          <div className="flex items-center justify-center lg:justify-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-700 flex items-center justify-center">
              <span className="text-white text-xl font-bold">🍽</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Culinary Editorial</h1>
          </div>
        </div>

        {/* Form Container */}
        <div className="w-full max-w-md">
          
          {/* Welcome Text */}
          <div className="mb-8">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-3">
              Welcome Back
            </h2>
            <p className="text-gray-600 text-base leading-relaxed">
              Select your role to access the portal
            </p>
          </div>

          {/* Role Selection Tabs */}
          <div className="mb-10">
            <div className="inline-flex w-full gap-2 p-1.5 bg-gray-100 rounded-xl border border-gray-200">
              <button
                type="button"
                onClick={() => setActiveRole('student')}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-200 ${
                  activeRole === 'student'
                    ? 'bg-white text-emerald-700 shadow-md ring-1 ring-emerald-100'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => setActiveRole('staff')}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-200 ${
                  activeRole === 'staff'
                    ? 'bg-white text-emerald-700 shadow-md ring-1 ring-emerald-100'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Canteen Staff
              </button>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            
            {/* Email Input */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-xs font-bold uppercase tracking-wide text-gray-700"
              >
                Institutional Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="name@university.edu"
                required
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none text-gray-900 placeholder:text-gray-400"
              />
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label
                  htmlFor="password"
                  className="block text-xs font-bold uppercase tracking-wide text-gray-700"
                >
                  Password
                </label>
                <a
                  href="#forgot"
                  className="text-xs font-bold uppercase tracking-wide text-emerald-600 hover:text-emerald-700 transition-colors"
                >
                  Forgot?
                </a>
              </div>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none text-gray-900 placeholder:text-gray-400"
              />
            </div>

            {errorMessage && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {errorMessage}
              </div>
            )}

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full mt-6 py-3 px-4 text-white font-bold rounded-lg shadow-lg transition-all duration-200 ${
                loading
                  ? 'bg-emerald-400 cursor-not-allowed shadow-none'
                  : 'bg-gradient-to-r from-emerald-600 to-emerald-700 hover:shadow-xl hover:from-emerald-700 hover:to-emerald-800 active:scale-95'
              }`}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>

          </form>

          {/* Sign Up Link */}
          <div className="mt-10 text-center">
            <p className="text-gray-600 text-sm">
              New to the editorial?{' '}
           <button  onClick={() =>
           goto("/register")
           }
            className="text-emerald-600 font-bold hover:text-emerald-700 transition-colors">
               Register 
           </button>
            </p>
          </div>

        </div>
      </div>

      {/* Right Section - Hero Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-emerald-800 via-emerald-700 to-emerald-900">
        
        {/* Background Image */}
        <img
          alt="Modern culinary composition"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=1200&fit=crop"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-900/80 via-emerald-800/60 to-emerald-700/40"></div>

        {/* Content */}
        <div className="relative w-full h-full flex flex-col justify-between p-12 lg:p-16">
          
          {/* Top Badge */}
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></div>
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-200">
              Live Kitchen Updates
            </span>
          </div>

          {/* Bottom Content */}
          <div className="space-y-6">
            <div>
              <h2 className="text-5xl lg:text-6xl font-black text-white leading-tight mb-4">
                Elevated dining,<br />digitally curated.
              </h2>
              <div className="flex items-center gap-4">
                <div className="h-1 w-16 bg-emerald-300"></div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-200">
                  The Future of Canteens
                </span>
              </div>
            </div>
            <p className="text-white/90 font-medium text-lg leading-relaxed max-w-sm">
              Join our exclusive community of students and staff enjoying chef-crafted meals with effortless management.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Signin;