import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email subscribed:', email);
    setEmail('');
    alert('Thank you for subscribing!');
  };

  const Goto = useNavigate();







  return (
    
    <>

      {/* Navigation */}
      <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md border-b border-black/[0.03]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-5 flex justify-between items-center">
          <div className="flex items-center gap-12">
            <a className="font-headline text-xl font-extrabold tracking-tight text-primary" href="#home">
              The Culinary Editorial
            </a>
            <nav className="hidden lg:flex items-center gap-8">
              <a className="font-label text-[12px] font-semibold tracking-widest uppercase text-on-surface-variant hover:text-primary transition-colors" href="#concept">
                The Concept
              </a>
              <a className="font-label text-[12px] font-semibold tracking-widest uppercase text-on-surface-variant hover:text-primary transition-colors" href="#menus">
                Menus
              </a>
              <a className="font-label text-[12px] font-semibold tracking-widest uppercase text-on-surface-variant hover:text-primary transition-colors" href="#locations">
                Locations
              </a>
              <a className="font-label text-[12px] font-semibold tracking-widest uppercase text-on-surface-variant hover:text-primary transition-colors" href="#partnerships">
                Partnerships
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-4 md:gap-8">
            <a className="hidden sm:block font-label text-[12px] font-semibold tracking-widest uppercase text-on-surface-variant hover:text-primary transition-colors" href="#signin">
              Sign In
            </a>
            <a className="px-6 py-2.5 bg-primary text-on-primary rounded-full font-label text-[12px] font-bold tracking-widest uppercase hover:shadow-lg transition-all" href="#reserve">
              Reserve
            </a>
            <button className="lg:hidden p-2">
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* Cinematic Hero Section */}
        <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0 scale-110 animate-[pulse_10s_ease-in-out_infinite]">
            <img
              alt="Atmospheric Dining Space"
              className="w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&h=1080&fit=crop"
            />
            <div className="hero-gradient"></div>
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-20">
            <span className="inline-block font-label text-[10px] font-bold tracking-[0.4em] uppercase text-primary/60 mb-6 bg-primary/5 px-4 py-1 rounded-full border border-primary/10">
              Established 2024 • London & Paris
            </span>

            <h1 className="font-headline text-5xl md:text-8xl font-light text-primary leading-[1] mb-8 tracking-tighter">
              The Office Canteen, <br />
              <span className="font-extrabold italic opacity-95">Elevated to Art.</span>
            </h1>

            <p className="text-lg md:text-2xl text-on-surface-variant/90 max-w-2xl mx-auto mb-14 font-light leading-relaxed">
              Seamless digital ordering meets world-class culinary curation. Fresh, seasonal, and tailored for the visionary professional.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <button
  className="group min-w-[220px] px-8 py-5 bg-primary text-on-primary rounded-full font-label text-[12px] font-bold tracking-[0.2em] uppercase shadow-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-3"
  onClick={() => {
    // Add your click handler logic here
   console.log(" redirecting to the register page")
   Goto("register");
  }}
>
  Start Your Order{" "}
  <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform"></span>
</button>
              <a className="min-w-[220px] px-8 py-5 bg-white/20 backdrop-blur-md border border-primary/10 text-primary rounded-full font-label text-[12px] font-bold tracking-[0.2em] uppercase hover:bg-white/40 transition-all" href="#menu">
                Explore Menu
              </a>
            </div>
          </div>

          {/* <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
            <span className="text-[9px] font-bold tracking-[0.3em] uppercase">Scroll to explore</span>
            <span className="material-symbols-outlined text-primary text-2xl animate-bounce">keyboard_arrow_down</span>
          </div> */}
        </section>

        {/* Featured Seasonal Highlight */}
        <section className="py-32 bg-surface">
          <div className="max-w-[1440px] mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative group">
                <div className="aspect-[4/5] overflow-hidden rounded-[2rem] shadow-2xl">
                  <img
                    alt="Seasonal Dish"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                    src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=500&fit=crop"
                  />
                </div>
                <div className="absolute -bottom-8 -right-8 bg-primary-container p-8 rounded-3xl max-w-xs shadow-xl hidden md:block">
                  <h4 className="font-headline font-bold text-primary mb-2 italic">Chef's Selection</h4>
                  <p className="text-on-primary-container text-sm leading-relaxed">
                    "The Winter Root collection highlights the quiet beauty of local soil. Earthy, vibrant, and essential."
                  </p>
                </div>
              </div>

              <div className="lg:pl-10">
                <span className="text-primary/50 font-bold tracking-[0.3em] uppercase text-[11px] mb-6 block">
                  Current Series
                </span>
                <h2 className="font-headline text-4xl md:text-6xl font-bold text-primary mb-8 leading-tight tracking-tighter">
                  The Winter <br />
                  Root Harvest.
                </h2>

                <div className="space-y-6 text-on-surface-variant font-light text-lg leading-relaxed mb-12">
                  <p>
                    Our kitchen follows the rhythm of the seasons. This month, we celebrate the robust flavors of late-harvest roots, paired with artisanal grains and house-made preserves.
                  </p>
                  <p>
                    Each bowl is a calculated balance of macro-nutrients and aesthetic delight, designed to fuel your most demanding creative sessions.
                  </p>
                </div>

                <div className="flex flex-col gap-6">
                  <div className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-primary bg-primary/5 p-3 rounded-xl">eco</span>
                    <div>
                      <h4 className="font-bold text-primary text-sm uppercase tracking-wider">100% Traceable</h4>
                      <p className="text-sm text-on-surface-variant/70">Know exactly where your ingredients were grown.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-primary bg-primary/5 p-3 rounded-xl">temp_preferences_custom</span>
                    <div>
                      <h4 className="font-bold text-primary text-sm uppercase tracking-wider">Tailored Prep</h4>
                      <p className="text-sm text-on-surface-variant/70">Customized according to your dietary preferences.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Value Proposition Grid */}
        <section className="py-32 bg-surface-container-low">
          <div className="max-w-[1440px] mx-auto px-6 md:px-10">
            <div className="text-center max-w-2xl mx-auto mb-24">
              <span className="text-primary/50 font-bold tracking-[0.3em] uppercase text-[11px] mb-4 block">
                The Experience
              </span>
              <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary tracking-tight">
                Redefining the Daily Ritual.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="bg-surface p-10 rounded-[2rem] border border-black/[0.02] hover:border-primary/10 transition-colors group">
                {/* <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-3xl">stay_primary_portrait</span>
                </div> */}
                <h3 className="font-headline text-xl font-bold text-primary mb-4">Digital-First Flow</h3>
                <p className="text-on-surface-variant leading-relaxed font-light">
                  Order via our bespoke app or curated kiosks. Experience a frictionless journey from selection to pick-up.
                </p>
              </div>

              <div className="bg-surface p-10 rounded-[2rem] border border-black/[0.02] hover:border-primary/10 transition-colors group">
                {/* <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-3xl">restaurant</span>
                </div> */}
                <h3 className="font-headline text-xl font-bold text-primary mb-4">Editorial Gastronomy</h3>
                <p className="text-on-surface-variant leading-relaxed font-light">
                  Food that looks as good as it tastes. Our menus are curated like a high-fashion editorial, updated weekly.
                </p>
              </div>

              <div className="bg-surface p-10 rounded-[2rem] border border-black/[0.02] hover:border-primary/10 transition-colors group">
                {/* <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-3xl">nest_eco_leaf</span>
                </div> */}
                <h3 className="font-headline text-xl font-bold text-primary mb-4">Conscious Impact</h3>
                <p className="text-on-surface-variant leading-relaxed font-light">
                  Zero-waste packaging, carbon-neutral logistics, and deep-rooted support for regenerative farming.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Subscription */}
        <section className="py-32 bg-primary text-on-primary relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/20 rounded-full -ml-32 -mb-32 blur-3xl"></div>

          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <span className="inline-block font-label text-[11px] font-bold tracking-[0.4em] uppercase text-on-primary/60 mb-8">
              The Weekly Dispatch
            </span>
            <h2 className="font-headline text-4xl md:text-6xl font-bold mb-8 tracking-tight">
              Stay within the <span className="italic font-light">inner circle.</span>
            </h2>
            <p className="text-on-primary/70 text-lg mb-14 max-w-xl mx-auto font-light leading-relaxed">
              Receive weekly menu previews, exclusive invitations to canteen events, and stories from our local producers.
            </p>

            <form className="max-w-md mx-auto relative group" onSubmit={handleSubscribe}>
              <input
                className="w-full bg-white/10 border border-white/20 rounded-full py-5 px-8 text-on-primary placeholder:text-white/40 focus:ring-1 focus:ring-white/40 focus:bg-white/20 transition-all outline-none"
                placeholder="Enter your business email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                className="absolute right-2 top-2 bottom-2 px-8 bg-white text-primary rounded-full font-bold text-[11px] tracking-widest uppercase hover:bg-on-primary-container transition-all cursor-pointer"
                type="submit"
              >
                Subscribe
              </button>
            </form>

            <p className="mt-8 text-[11px] text-on-primary/40 tracking-wider">Join over 12,000 discerning professionals.</p>
          </div>
        </section>
      </main>

      {/* Comprehensive Footer */}
      <footer className="bg-surface-container-high py-24 px-6 md:px-10 border-t border-black/[0.05]">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
            <div className="col-span-1 lg:col-span-1">
              <div className="font-headline text-2xl font-extrabold tracking-tight text-primary mb-8">
                The Culinary <br />
                Editorial
              </div>
              <p className="text-on-surface-variant text-sm font-light leading-relaxed mb-8 max-w-xs">
                Curating the intersection of gastronomy, technology, and workplace culture for the modern era.
              </p>
              <div className="flex gap-4">
                <a
                  className="w-10 h-10 border border-primary/10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-all cursor-pointer"
                  href="#"
                >
                  <span className="material-symbols-outlined text-lg">public</span>
                </a>
                <a
                  className="w-10 h-10 border border-primary/10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-all cursor-pointer"
                  href="#"
                >
                  <span className="material-symbols-outlined text-lg">camera</span>
                </a>
              </div>
            </div>

            <div>
              <h5 className="font-bold text-xs uppercase tracking-[0.3em] text-primary/40 mb-8">Experience</h5>
              <ul className="space-y-4">
                <li>
                  <a className="text-on-surface-variant hover:text-primary text-sm transition-colors cursor-pointer" href="#">
                    How it Works
                  </a>
                </li>
                <li>
                  <a className="text-on-surface-variant hover:text-primary text-sm transition-colors cursor-pointer" href="#">
                    Our Canteens
                  </a>
                </li>
                <li>
                  <a className="text-on-surface-variant hover:text-primary text-sm transition-colors cursor-pointer" href="#">
                    Digital Ordering
                  </a>
                </li>
                <li>
                  <a className="text-on-surface-variant hover:text-primary text-sm transition-colors cursor-pointer" href="#">
                    Gift Cards
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-xs uppercase tracking-[0.3em] text-primary/40 mb-8">Organization</h5>
              <ul className="space-y-4">
                <li>
                  <a className="text-on-surface-variant hover:text-primary text-sm transition-colors cursor-pointer" href="#">
                    About Us
                  </a>
                </li>
                <li>
                  <a className="text-on-surface-variant hover:text-primary text-sm transition-colors cursor-pointer" href="#">
                    Partner With Us
                  </a>
                </li>
                <li>
                  <a className="text-on-surface-variant hover:text-primary text-sm transition-colors cursor-pointer" href="#">
                    Careers
                  </a>
                </li>
                <li>
                  <a className="text-on-surface-variant hover:text-primary text-sm transition-colors cursor-pointer" href="#">
                    Press Room
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-xs uppercase tracking-[0.3em] text-primary/40 mb-8">Locations</h5>
              <p className="text-on-surface-variant text-sm font-light leading-relaxed mb-6">
                Central London HQ
                <br />
                124 Baker Street, W1U
                <br />
                hello@culinaryeditorial.com
              </p>
              <a
                className="text-primary text-[11px] font-bold tracking-widest uppercase flex items-center gap-2 group cursor-pointer"
                href="#"
              >
                View on Map <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">north_east</span>
              </a>
            </div>
          </div>

          <div className="pt-10 border-t border-black/[0.05] flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-[11px] text-outline/50 font-medium tracking-wide uppercase">
              © 2024 The Culinary Editorial. All Rights Reserved.
            </div>
            <div className="flex gap-8 text-[11px] font-bold tracking-widest uppercase text-on-surface-variant/40">
              <a className="hover:text-primary transition-colors cursor-pointer" href="#">
                Privacy Policy
              </a>
              <a className="hover:text-primary transition-colors cursor-pointer" href="#">
                Terms of Service
              </a>
              <a className="hover:text-primary transition-colors cursor-pointer" href="#">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Nav */}
      <div className="fixed bottom-6 left-0 right-0 flex justify-center z-50 lg:hidden pointer-events-none px-6">
        <nav className="bg-white/90 backdrop-blur-2xl border border-black/5 rounded-full px-8 py-3 flex items-center gap-10 shadow-2xl pointer-events-auto w-full max-w-sm justify-between">
          <button className="flex flex-col items-center gap-1 text-primary bg-transparent border-none cursor-pointer">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
              home
            </span>
            <span className="text-[8px] font-bold uppercase tracking-widest">Home</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-on-surface/40 bg-transparent border-none cursor-pointer">
            <span className="material-symbols-outlined">restaurant_menu</span>
            <span className="text-[8px] font-bold uppercase tracking-widest">Menu</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-on-surface/40 bg-transparent border-none cursor-pointer">
            <span className="material-symbols-outlined">shopping_bag</span>
            <span className="text-[8px] font-bold uppercase tracking-widest">Order</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-on-surface/40 bg-transparent border-none cursor-pointer">
            <span className="material-symbols-outlined">account_circle</span>
            <span className="text-[8px] font-bold uppercase tracking-widest">Profile</span>
          </button>
        </nav>
      </div>

      {/* Tailwind Custom Styles */}
      <style>{`
        .hero-gradient {
          background: linear-gradient(to bottom, rgba(25, 28, 28, 0.4) 0%, rgba(25, 28, 28, 0.2) 50%, rgba(252, 253, 252, 1) 100%);
          position: absolute;
          inset: 0;
        }
      `}</style>
    </>
  );
};

export default Landing;