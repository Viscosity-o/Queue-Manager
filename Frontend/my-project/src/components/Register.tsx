import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const [activeRole, setActiveRole] = useState<'student' | 'staff'>('student');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirm_password: '',
    phone: '',
    collegeName: '',
    canteenCode: '',
    address: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirm_password) {
      setError('Passwords do not match!');
      return;
    }

    setLoading(true);

    try {
      const endpoint = activeRole === 'student' 
        ? 'http://localhost:8080/auth/register/student'
        : 'http://localhost:8080/auth/register/canteen';

      const payload = activeRole === 'student'
        ? {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            phone: formData.phone,
            collegeName: formData.collegeName
          }
        : {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            canteenCode: formData.canteenCode,
            address: formData.address,
            phone: formData.phone
          };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      alert(`Welcome ${formData.name}! Registration successful.`);
      navigate('/Sign');
    } catch (err: any) {
      setError(err.message || 'An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };
  const goto = useNavigate();

  return (
    <>
      {/* Font Links */}
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
        .bg-primary-gradient {
          background: linear-gradient(135deg, #173628 0%, #2e4d3e 100%);
        }
      `}</style>

      <main className="flex-grow flex items-center justify-center p-4 md:p-8 relative overflow-hidden min-h-screen bg-surface text-on-surface">
        {/* Background Accents */}
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-primary-fixed/20 rounded-full blur-[100px] -z-10"></div>
        <div className="absolute bottom-[-5%] left-[-5%] w-80 h-80 bg-secondary-fixed/30 rounded-full blur-[100px] -z-10"></div>

        <div className="w-full max-w-xl z-10">
          {/* Brand Identity */}
          <div className="text-center mb-8">
            <h1 className="text-primary font-headline text-3xl md:text-4xl font-extrabold tracking-tight mb-2">
              The Culinary Editorial
            </h1>
            <p className="text-on-surface-variant font-body text-sm md:text-base opacity-80">
              Join our curated dining community today.
            </p>
          </div>

          {/* Registration Container */}
          <section className="bg-surface-container-lowest rounded-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-outline-variant/40 overflow-hidden backdrop-blur-sm">
            <div className="p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Role Switcher */}
                <div className="space-y-4">
                  <label className="text-outline font-label text-[10px] font-bold uppercase tracking-[0.2em] block text-center opacity-70">
                    Select Identity
                  </label>
                  <div className="flex p-1.5 bg-surface-container-low border border-outline-variant/30 rounded-full w-full max-w-xs mx-auto">
                    <button
                      type="button"
                      onClick={() => setActiveRole('student')}
                      className={`flex-1 py-2 px-4 rounded-full font-label text-sm font-bold transition-all duration-300 ${
                        activeRole === 'student'
                          ? 'bg-surface-container-lowest text-primary shadow-sm ring-1 ring-black/5'
                          : 'text-on-surface-variant hover:bg-surface-container-high'
                      }`}
                    >
                      Student
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveRole('staff')}
                      className={`flex-1 py-2 px-4 rounded-full font-label text-sm font-bold transition-all duration-300 ${
                        activeRole === 'staff'
                          ? 'bg-surface-container-lowest text-primary shadow-sm ring-1 ring-black/5'
                          : 'text-on-surface-variant hover:bg-surface-container-high'
                      }`}
                    >
                      Staff
                    </button>
                  </div>
                </div>

                {/* Input Fields */}
                <div className="space-y-5">
                  {/* Error Message */}
                  {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-2xl">
                      <p className="text-red-600 text-sm font-medium">{error}</p>
                    </div>
                  )}

                  {/* Full Name */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-on-surface font-label text-xs font-bold ml-1 uppercase tracking-wider opacity-70">
                      Full Name
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline/50 text-xl pointer-events-none">
                        person
                      </span>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Julianne Moore"
                        required
                        className="w-full pl-12 pr-4 py-3.5 bg-surface-container-low/50 border border-outline-variant/60 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-on-surface placeholder:text-outline/40 outline-none"
                      />
                    </div>
                  </div>

                  {/* Email Address */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-on-surface font-label text-xs font-bold ml-1 uppercase tracking-wider opacity-70">
                      Email Address
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline/50 text-xl pointer-events-none">
                        mail
                      </span>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="julianne@editorial.com"
                        required
                        className="w-full pl-12 pr-4 py-3.5 bg-surface-container-low/50 border border-outline-variant/60 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-on-surface placeholder:text-outline/40 outline-none"
                      />
                    </div>
                  </div>

                  {/* Conditional Fields for Student */}
                  {activeRole === 'student' && (
                    <>
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-on-surface font-label text-xs font-bold ml-1 uppercase tracking-wider opacity-70">
                          Phone Number
                        </label>
                        <div className="relative">
                          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline/50 text-xl pointer-events-none">
                            phone
                          </span>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="9999999999"
                            required
                            className="w-full pl-12 pr-4 py-3.5 bg-surface-container-low/50 border border-outline-variant/60 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-on-surface placeholder:text-outline/40 outline-none"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="collegeName" className="text-on-surface font-label text-xs font-bold ml-1 uppercase tracking-wider opacity-70">
                          College Name
                        </label>
                        <div className="relative">
                          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline/50 text-xl pointer-events-none">
                            school
                          </span>
                          <input
                            type="text"
                            id="collegeName"
                            name="collegeName"
                            value={formData.collegeName}
                            onChange={handleInputChange}
                            placeholder="ABC College"
                            required
                            className="w-full pl-12 pr-4 py-3.5 bg-surface-container-low/50 border border-outline-variant/60 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-on-surface placeholder:text-outline/40 outline-none"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {/* Conditional Fields for Staff */}
                  {activeRole === 'staff' && (
                    <>
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-on-surface font-label text-xs font-bold ml-1 uppercase tracking-wider opacity-70">
                          Phone Number
                        </label>
                        <div className="relative">
                          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline/50 text-xl pointer-events-none">
                            phone
                          </span>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="9999999999"
                            required
                            className="w-full pl-12 pr-4 py-3.5 bg-surface-container-low/50 border border-outline-variant/60 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-on-surface placeholder:text-outline/40 outline-none"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="canteenCode" className="text-on-surface font-label text-xs font-bold ml-1 uppercase tracking-wider opacity-70">
                          Canteen Code
                        </label>
                        <div className="relative">
                          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline/50 text-xl pointer-events-none">
                            badge
                          </span>
                          <input
                            type="text"
                            id="canteenCode"
                            name="canteenCode"
                            value={formData.canteenCode}
                            onChange={handleInputChange}
                            placeholder="CANT001"
                            required
                            maxLength={10}
                            className="w-full pl-12 pr-4 py-3.5 bg-surface-container-low/50 border border-outline-variant/60 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-on-surface placeholder:text-outline/40 outline-none"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="address" className="text-on-surface font-label text-xs font-bold ml-1 uppercase tracking-wider opacity-70">
                          Address
                        </label>
                        <div className="relative">
                          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline/50 text-xl pointer-events-none">
                            location_on
                          </span>
                          <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            placeholder="123 Main Street"
                            required
                            className="w-full pl-12 pr-4 py-3.5 bg-surface-container-low/50 border border-outline-variant/60 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-on-surface placeholder:text-outline/40 outline-none"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {/* Password Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Password */}
                    <div className="space-y-2">
                      <label htmlFor="password" className="text-on-surface font-label text-xs font-bold ml-1 uppercase tracking-wider opacity-70">
                        Password
                      </label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline/50 text-xl pointer-events-none">
                          lock
                        </span>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          placeholder="••••••••"
                          required
                          className="w-full pl-12 pr-12 py-3.5 bg-surface-container-low/50 border border-outline-variant/60 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-on-surface placeholder:text-outline/40 outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-outline/50 hover:text-outline transition-colors"
                        >
                          <span className="material-symbols-outlined">
                            {showPassword ? 'visibility_off' : 'visibility'}
                          </span>
                        </button>
                      </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-2">
                      <label htmlFor="confirm_password" className="text-on-surface font-label text-xs font-bold ml-1 uppercase tracking-wider opacity-70">
                        Confirm
                      </label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline/50 text-xl pointer-events-none">
                          verified_user
                        </span>
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          id="confirm_password"
                          name="confirm_password"
                          value={formData.confirm_password}
                          onChange={handleInputChange}
                          placeholder="••••••••"
                          required
                          className="w-full pl-12 pr-12 py-3.5 bg-surface-container-low/50 border border-outline-variant/60 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-on-surface placeholder:text-outline/40 outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-outline/50 hover:text-outline transition-colors"
                        >
                          <span className="material-symbols-outlined">
                            {showConfirmPassword ? 'visibility_off' : 'visibility'}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 space-y-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-primary text-on-primary font-label text-sm font-bold uppercase tracking-[0.2em] rounded-2xl shadow-[0_12px_24px_-8px_rgba(23,54,40,0.4)] hover:shadow-[0_16px_32px_-8px_rgba(23,54,40,0.5)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>{loading ? 'Creating Account...' : 'Create Account'}</span>
                    {!loading && (
                      <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">
                        arrow_forward
                      </span>
                    )}
                  </button>

                  {/* Divider */}
                  <div className="relative flex items-center py-2">
                    <div className="flex-grow border-t border-outline-variant/40"></div>
                    <span className="flex-shrink mx-4 text-outline text-[10px] font-bold uppercase tracking-[0.25em]">
                      Existing Member?
                    </span>
                    <div className="flex-grow border-t border-outline-variant/40"></div>
                  </div>

                  {/* Sign In Link */}
                  <div className="text-center">

                    

                    <button
  onClick={() => navigate("/Sign")}
  className="group inline-flex items-center gap-2 text-primary font-label text-sm font-bold transition-all hover:opacity-80 cursor-pointer"
>
  <span>Sign In to your account</span>
  
</button>



                    
                    
                  </div>
                </div>
              </form>
            </div>
          </section>

          {/* Footer Links */}
          <footer className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-2 px-4">
            <a
              href="#privacy"
              className="text-outline/60 text-[11px] font-semibold uppercase tracking-widest hover:text-primary transition-colors cursor-pointer"
            >
              Privacy Policy
            </a>
            <a
              href="#terms"
              className="text-outline/60 text-[11px] font-semibold uppercase tracking-widest hover:text-primary transition-colors cursor-pointer"
            >
              Terms of Service
            </a>
            <a
              href="#help"
              className="text-outline/60 text-[11px] font-semibold uppercase tracking-widest hover:text-primary transition-colors cursor-pointer"
            >
              Help Center
            </a>
          </footer>
        </div>

        {/* Decorative Elements - Desktop Only */}
        <div className="hidden lg:block absolute left-[-10%] top-[20%] w-80 h-96 rounded-[2.5rem] overflow-hidden shadow-2xl rotate-[-12deg] opacity-25 hover:rotate-[-6deg] hover:opacity-40 transition-all duration-1000">
          <img
            className="w-full h-full object-cover"
            alt="Close-up of vibrant Mediterranean salad"
            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=320&h=400&fit=crop"
          />
        </div>

        <div className="hidden lg:block absolute right-[-8%] bottom-[15%] w-96 h-[500px] rounded-[3rem] overflow-hidden shadow-2xl rotate-[8deg] opacity-25 hover:rotate-[4deg] hover:opacity-40 transition-all duration-1000">
          <img
            className="w-full h-full object-cover"
            alt="Chef preparing gourmet meal"
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=396&h=500&fit=crop"
          />
        </div>
      </main>
    </>
  );
};

export default Register;