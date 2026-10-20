import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Headphones, 
  Mail, 
  MapPin, 
  Phone, 
  ExternalLink,
  Heart
} from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#172033] text-slate-300 text-xs mt-16 border-t border-slate-700">
      {/* Top Value Assurance Bar */}
      <div className="bg-[#0C1424] py-8 border-b border-slate-800 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-950/80 border border-blue-800 flex items-center justify-center flex-shrink-0 text-secondary">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Free & Fast Delivery</h4>
              <p className="text-slate-400 text-[11px] mt-0.5">Free delivery across India on orders over ₹499</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-950/80 border border-blue-800 flex items-center justify-center flex-shrink-0 text-secondary">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">7-Day Easy Returns</h4>
              <p className="text-slate-400 text-[11px] mt-0.5">No-questions-asked replacement or refund guarantee</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-950/80 border border-blue-800 flex items-center justify-center flex-shrink-0 text-secondary">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">100% Genuine Products</h4>
              <p className="text-slate-400 text-[11px] mt-0.5">SG Assured verified authentic brand stock only</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-950/80 border border-blue-800 flex items-center justify-center flex-shrink-0 text-secondary">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">24x7 Customer Help</h4>
              <p className="text-slate-400 text-[11px] mt-0.5">Round the clock live chat and toll-free helpline</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 grid grid-cols-2 md:grid-cols-5 gap-8">
        {/* Column 1: Brand Info */}
        <div className="col-span-2 space-y-4">
          <Link to="/" className="flex flex-col">
            <div className="flex items-center tracking-tight text-3xl font-black font-heading leading-none">
              <span className="text-white">SG</span>
              <span className="text-secondary ml-0.5">Kart</span>
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-secondary ml-1"></span>
            </div>
            <span className="text-xs text-blue-200 font-medium tracking-wide italic mt-1">
              Everything You Need. All in One Place.
            </span>
          </Link>
          <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
            SGKart is India’s premier destination for electronics, fashion, home essentials, and lifestyle products. Combining ultra-fast delivery, curated Indian brands, and unmatched savings.
          </p>
          <div className="pt-2 text-[11px] text-slate-400">
            <p className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-secondary" /> Helpline: 1800-SG-KART (Toll-Free)
            </p>
            <p className="flex items-center gap-2 mt-1">
              <Mail className="w-3.5 h-3.5 text-secondary" /> Email: support@sgkart.in
            </p>
          </div>
        </div>

        {/* Column 2: About */}
        <div>
          <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">About Us</h4>
          <ul className="space-y-2 text-slate-400 text-xs">
            <li><Link to="/products" className="hover:text-white transition">About SGKart</Link></li>
            <li><Link to="/products" className="hover:text-white transition">Careers at SGKart</Link></li>
            <li><Link to="/products" className="hover:text-white transition">SGKart Stories & News</Link></li>
            <li><Link to="/products" className="hover:text-white transition">Corporate Information</Link></li>
            <li><Link to="/admin" className="hover:text-secondary text-amber-400 font-medium transition">Admin Portal Demo</Link></li>
          </ul>
        </div>

        {/* Column 3: Customer Care */}
        <div>
          <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Help & Support</h4>
          <ul className="space-y-2 text-slate-400 text-xs">
            <li><Link to="/orders" className="hover:text-white transition">Track Your Order</Link></li>
            <li><Link to="/orders" className="hover:text-white transition">Returns & Replacements</Link></li>
            <li><Link to="/account" className="hover:text-white transition">Shipping Rates & Policies</Link></li>
            <li><Link to="/account" className="hover:text-white transition">Frequently Asked Questions</Link></li>
            <li><Link to="/cart" className="hover:text-white transition">Cart & Checkout Help</Link></li>
          </ul>
        </div>

        {/* Column 4: Registered Office */}
        <div>
          <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Registered Office</h4>
          <div className="text-slate-400 text-xs leading-relaxed space-y-2">
            <p className="flex items-start gap-1.5">
              <MapPin className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
              <span>
                SGKart Internet Private Limited,<br />
                Buildings Alyssa, Begonia & Clove Embassy Tech Village,<br />
                Outer Ring Road, Bengaluru, 560103, Karnataka, India
              </span>
            </p>
            <p className="text-[11px] text-slate-500">CIN: U51109KA2024PTC198421</p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#09101C] py-5 border-t border-slate-800 text-[11px] text-slate-400 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-400">
            <span>© 2026 SGKart.com. All rights reserved.</span>
            <span>•</span>
            <span className="text-amber-400 font-medium">Demo Prototype - No real transactions are processed</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-slate-400 text-[11px]">Accepted Demo Payments:</span>
            <div className="flex items-center gap-1.5 font-bold text-[10px] text-slate-300">
              <span className="bg-slate-800 px-2 py-0.5 rounded border border-slate-700">UPI</span>
              <span className="bg-slate-800 px-2 py-0.5 rounded border border-slate-700">RuPay</span>
              <span className="bg-slate-800 px-2 py-0.5 rounded border border-slate-700">Visa</span>
              <span className="bg-slate-800 px-2 py-0.5 rounded border border-slate-700">MasterCard</span>
              <span className="bg-slate-800 px-2 py-0.5 rounded border border-slate-700">COD</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
