import React, { useState } from 'react';
import { Mail, CheckCircle2, Copy, Sparkles } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const NewsletterSection = () => {
  const { addToast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast('Please enter a valid email address.', 'error');
      return;
    }
    setIsSubscribed(true);
    addToast('Subscribed to SGKart insider alerts! Copy your promo code below.', 'success');
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText('WELCOME200');
    setCopied(true);
    addToast('Coupon WELCOME200 copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-gradient-to-br from-[#174EA6] via-[#123E85] to-[#0A224E] rounded-2xl p-6 sm:p-10 text-white relative overflow-hidden shadow-card">
        {/* Decorative circle glow */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-secondary/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-2xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/20 text-secondary text-xs font-bold border border-secondary/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>JOIN THE SGKART CLUB</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black font-heading leading-tight">
            Get ₹200 SG Cash On Your First Order
          </h2>

          <p className="text-xs sm:text-sm text-blue-100 max-w-md mx-auto leading-relaxed">
            Subscribe for exclusive festive drop alerts, flash sale secrets, and member-only coupons delivered straight to your inbox.
          </p>

          {!isSubscribed ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-2">
              <div className="relative flex-1">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white text-navy text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-secondary"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-secondary hover:bg-secondary-hover text-navy font-black text-xs sm:text-sm px-6 py-3 rounded-xl transition shadow-md active:scale-95 flex-shrink-0"
              >
                Claim ₹200
              </button>
            </form>
          ) : (
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl max-w-md mx-auto flex items-center justify-between text-left">
              <div>
                <p className="text-xs font-semibold text-emerald-300 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> You're on the VIP list!
                </p>
                <p className="text-[11px] text-slate-200 mt-0.5">Use code at checkout for ₹200 off:</p>
                <p className="font-mono font-black text-sm text-secondary tracking-wider mt-0.5">
                  WELCOME200
                </p>
              </div>
              <button
                onClick={handleCopyCode}
                className="bg-secondary hover:bg-secondary-hover text-navy p-2 rounded-lg font-bold text-xs transition flex items-center gap-1 shadow"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          )}

          <p className="text-[10px] text-blue-200/70 pt-1">
            Zero spam. Unsubscribe anytime. Indian customer privacy protected.
          </p>
        </div>
      </div>
    </section>
  );
};
