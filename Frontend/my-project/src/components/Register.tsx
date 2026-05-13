import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/api';

const Register: React.FC = () => {
  const [activeRole, setActiveRole] = useState<'student' | 'staff'>('student');
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', confirm_password: '',
    phone: '', collegeName: '', collegeCode: '', canteenCode: '', address: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (formData.password !== formData.confirm_password) { setError('Passwords do not match!'); return; }
    setLoading(true);
    try {
      const endpoint = activeRole === 'student' ? API_ENDPOINTS.REGISTER_STUDENT : API_ENDPOINTS.REGISTER_CANTEEN;
      const payload = activeRole === 'student'
        ? { name: formData.name, email: formData.email, password: formData.password, phone: formData.phone, collegeName: formData.collegeName, collegeCode: formData.collegeCode }
        : { name: formData.name, email: formData.email, password: formData.password, canteenCode: formData.canteenCode, collegeCode: formData.collegeCode, address: formData.address, phone: formData.phone };
      const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Registration failed');
      alert(`Welcome ${formData.name}! Registration successful.`);
      navigate('/Sign');
    } catch (err: any) {
      setError(err.message || 'An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;600;700;800&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      <style>{`
        * { box-sizing: border-box; }
        body { font-family: 'Inter', sans-serif; margin: 0; }
        .headline { font-family: 'Manrope', sans-serif; }
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24; }

        /* Glass card */
        .glass-card {
          background: rgba(255, 255, 255, 0.10);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.25);
          box-shadow: 0 32px 64px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.2);
        }

        /* Glass input */
        .glass-input {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.22);
          color: #fff;
          transition: all 0.2s ease;
        }
        .glass-input::placeholder { color: rgba(255,255,255,0.35); }
        .glass-input:focus {
          outline: none;
          background: rgba(255, 255, 255, 0.14);
          border-color: rgba(255, 255, 255, 0.55);
          box-shadow: 0 0 0 3px rgba(255,255,255,0.08);
        }

        /* Role toggle active */
        .role-active {
          background: rgba(255,255,255,0.18);
          border: 1px solid rgba(255,255,255,0.40);
          color: #fff;
          box-shadow: 0 4px 16px rgba(0,0,0,0.2);
        }
        .role-inactive {
          background: transparent;
          border: 1px solid transparent;
          color: rgba(255,255,255,0.50);
        }
        .role-inactive:hover { color: rgba(255,255,255,0.80); background: rgba(255,255,255,0.06); }

        /* Submit button */
        .submit-btn {
          background: linear-gradient(135deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.10) 100%);
          border: 1px solid rgba(255,255,255,0.40);
          backdrop-filter: blur(8px);
          color: #fff;
          transition: all 0.25s ease;
          box-shadow: 0 8px 24px rgba(0,0,0,0.25);
        }
        .submit-btn:hover:not(:disabled) {
          background: linear-gradient(135deg, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.16) 100%);
          border-color: rgba(255,255,255,0.60);
          transform: translateY(-1px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.30);
        }
        .submit-btn:disabled { opacity: 0.55; cursor: not-allowed; }

        /* Floating food images */
        @keyframes floatA { 0%,100%{transform:translateY(0) rotate(-3deg)} 50%{transform:translateY(-14px) rotate(1deg)} }
        @keyframes floatB { 0%,100%{transform:translateY(0) rotate(4deg)} 50%{transform:translateY(-10px) rotate(-2deg)} }
        @keyframes floatC { 0%,100%{transform:translateY(0) rotate(-1deg)} 50%{transform:translateY(-18px) rotate(3deg)} }
        .fa { animation: floatA 7s ease-in-out infinite; }
        .fb { animation: floatB 9s ease-in-out infinite; }
        .fc { animation: floatC 6s ease-in-out infinite; animation-delay: 1.5s; }

        /* Scrollbar for form area */
        .form-scroll::-webkit-scrollbar { width: 4px; }
        .form-scroll::-webkit-scrollbar-track { background: transparent; }
        .form-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 4px; }
      `}</style>

      {/* Full-page background */}
      <div className="relative min-h-screen overflow-hidden">

        {/* Background images — layered, slightly visible through glass */}
        <div className="absolute inset-0 z-0">
          {/* Main hero image */}
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&h=1080&fit=crop"
            alt=""
            className="w-full h-full object-cover"
          />
          {/* Dark overlay so glass pops */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0d2318]/85 via-[#173628]/80 to-[#0a1f14]/90" />
          {/* Subtle color blobs */}
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-teal-400/10 rounded-full blur-[100px]" />
        </div>

        {/* Floating food image cards — desktop only */}
        <div className="hidden xl:block absolute top-[8%] left-[3%] z-10">
          <div className="fa w-44 h-56 rounded-2xl overflow-hidden ring-1 ring-white/20 shadow-2xl">
            <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=250&fit=crop" alt="" className="w-full h-full object-cover opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
        </div>
        <div className="hidden xl:block absolute bottom-[10%] left-[5%] z-10">
          <div className="fb w-36 h-44 rounded-2xl overflow-hidden ring-1 ring-white/20 shadow-2xl">
            <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=180&h=220&fit=crop" alt="" className="w-full h-full object-cover opacity-75" />
          </div>
        </div>
        <div className="hidden xl:block absolute top-[30%] right-[3%] z-10">
          <div className="fc w-40 h-52 rounded-2xl overflow-hidden ring-1 ring-white/20 shadow-2xl">
            <img src="https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=200&h=260&fit=crop" alt="" className="w-full h-full object-cover opacity-75" />
          </div>
        </div>
        <div className="hidden xl:block absolute bottom-[15%] right-[4%] z-10">
          <div className="fa w-32 h-40 rounded-2xl overflow-hidden ring-1 ring-white/20 shadow-2xl" style={{ animationDelay: '3s' }}>
            <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=160&h=200&fit=crop" alt="" className="w-full h-full object-cover opacity-70" />
          </div>
        </div>

        {/* Center content */}
        <div className="relative z-20 min-h-screen flex flex-col items-center justify-center px-4 py-10">

          {/* Brand */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)' }}>
              <span className="material-symbols-outlined text-white text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>restaurant</span>
            </div>
            <span className="headline text-white/90 font-bold text-lg tracking-tight">The Culinary Editorial</span>
          </div>

          {/* Glass card */}
          <div className="glass-card rounded-3xl w-full max-w-lg overflow-hidden">

            {/* Card header strip */}
            <div className="px-8 pt-8 pb-6 border-b border-white/10">
              <h1 className="headline text-white text-2xl font-bold mb-1">Create your account</h1>
              <p className="text-white/50 text-sm font-light">Join the campus dining community</p>
            </div>

            {/* Scrollable form body */}
            <div className="px-8 py-6 form-scroll overflow-y-auto max-h-[65vh]">

              {/* Role toggle */}
              <div className="flex gap-2 p-1 rounded-2xl mb-6" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}>
                {(['student', 'staff'] as const).map(role => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setActiveRole(role)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${activeRole === role ? 'role-active' : 'role-inactive'}`}
                  >
                    <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: activeRole === role ? "'FILL' 1" : "'FILL' 0" }}>
                      {role === 'student' ? 'school' : 'store'}
                    </span>
                    {role === 'student' ? 'Student' : 'Canteen Staff'}
                  </button>
                ))}
              </div>

              {/* Error */}
              {error && (
                <div className="flex items-center gap-3 p-3.5 rounded-xl mb-5" style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.35)' }}>
                  <span className="material-symbols-outlined text-red-400 text-lg">error</span>
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">

                {/* Name */}
                <div>
                  <label className="block text-white/60 text-[10px] font-bold uppercase tracking-widest mb-1.5">Full Name</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 text-[18px] pointer-events-none">person</span>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Your full name" required
                      className="glass-input w-full pl-10 pr-4 py-3 rounded-xl text-sm" />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-white/60 text-[10px] font-bold uppercase tracking-widest mb-1.5">Email Address</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 text-[18px] pointer-events-none">mail</span>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="you@example.com" required
                      className="glass-input w-full pl-10 pr-4 py-3 rounded-xl text-sm" />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-white/60 text-[10px] font-bold uppercase tracking-widest mb-1.5">Phone Number</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 text-[18px] pointer-events-none">phone</span>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="9999999999" required
                      className="glass-input w-full pl-10 pr-4 py-3 rounded-xl text-sm" />
                  </div>
                </div>

                {/* Student fields */}
                {activeRole === 'student' && (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-white/60 text-[10px] font-bold uppercase tracking-widest mb-1.5">College Name</label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 text-[18px] pointer-events-none">school</span>
                        <input type="text" name="collegeName" value={formData.collegeName} onChange={handleInputChange} placeholder="ABC College" required
                          className="glass-input w-full pl-10 pr-3 py-3 rounded-xl text-sm" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-white/60 text-[10px] font-bold uppercase tracking-widest mb-1.5">College Code</label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 text-[18px] pointer-events-none">badge</span>
                        <input type="text" name="collegeCode" value={formData.collegeCode} onChange={handleInputChange} placeholder="CLG001" required maxLength={10}
                          className="glass-input w-full pl-10 pr-3 py-3 rounded-xl text-sm" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Staff fields */}
                {activeRole === 'staff' && (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-white/60 text-[10px] font-bold uppercase tracking-widest mb-1.5">College Code</label>
                        <div className="relative">
                          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 text-[18px] pointer-events-none">badge</span>
                          <input type="text" name="collegeCode" value={formData.collegeCode} onChange={handleInputChange} placeholder="CLG001" required maxLength={10}
                            className="glass-input w-full pl-10 pr-3 py-3 rounded-xl text-sm" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-white/60 text-[10px] font-bold uppercase tracking-widest mb-1.5">Canteen Code</label>
                        <div className="relative">
                          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 text-[18px] pointer-events-none">restaurant</span>
                          <input type="text" name="canteenCode" value={formData.canteenCode} onChange={handleInputChange} placeholder="CANT001" required maxLength={10}
                            className="glass-input w-full pl-10 pr-3 py-3 rounded-xl text-sm" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-white/60 text-[10px] font-bold uppercase tracking-widest mb-1.5">Address</label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 text-[18px] pointer-events-none">location_on</span>
                        <input type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="Canteen address" required
                          className="glass-input w-full pl-10 pr-4 py-3 rounded-xl text-sm" />
                      </div>
                    </div>
                  </>
                )}

                {/* Password row */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-white/60 text-[10px] font-bold uppercase tracking-widest mb-1.5">Password</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 text-[18px] pointer-events-none">lock</span>
                      <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleInputChange} placeholder="••••••••" required
                        className="glass-input w-full pl-10 pr-9 py-3 rounded-xl text-sm" />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition">
                        <span className="material-symbols-outlined text-[18px]">{showPassword ? 'visibility_off' : 'visibility'}</span>
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-white/60 text-[10px] font-bold uppercase tracking-widest mb-1.5">Confirm</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 text-[18px] pointer-events-none">verified_user</span>
                      <input type={showConfirmPassword ? 'text' : 'password'} name="confirm_password" value={formData.confirm_password} onChange={handleInputChange} placeholder="••••••••" required
                        className="glass-input w-full pl-10 pr-9 py-3 rounded-xl text-sm" />
                      <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition">
                        <span className="material-symbols-outlined text-[18px]">{showConfirmPassword ? 'visibility_off' : 'visibility'}</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <button type="submit" disabled={loading} className="submit-btn w-full py-3.5 rounded-xl font-bold text-sm tracking-wide flex items-center justify-center gap-2 mt-2">
                  {loading ? (
                    <>
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <span className="material-symbols-outlined text-lg">arrow_forward</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Card footer */}
            <div className="px-8 py-5 border-t border-white/10 text-center">
              <p className="text-white/40 text-sm">
                Already have an account?{' '}
                <button onClick={() => navigate('/Sign')} className="text-white/80 font-semibold hover:text-white transition">
                  Sign in
                </button>
              </p>
            </div>
          </div>

          {/* Footer links */}
          <div className="flex gap-6 mt-6">
            {['Privacy', 'Terms', 'Help'].map(l => (
              <a key={l} href="#" className="text-white/30 text-[11px] font-semibold uppercase tracking-widest hover:text-white/60 transition">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
