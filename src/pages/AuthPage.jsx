import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, User, Phone, Eye, EyeOff, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const AuthPage = () => {
  const navigate = useNavigate();
  const { login, register, loginAsDemoCustomer, loginAsDemoAdmin } = useAuth();
  const { addToast } = useToast();

  const [isLoginTab, setIsLoginTab] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoginTab) {
      if (!email.trim() || !password.trim()) {
        addToast('Please enter both email and password', 'error');
        return;
      }
      login(email, password);
      navigate('/');
    } else {
      if (!name.trim() || !email.trim() || !password.trim()) {
        addToast('Please fill all required registration fields', 'error');
        return;
      }
      register({ name, email, phone, password });
      navigate('/');
    }
  };

  const handleDemoCustomerClick = () => {
    loginAsDemoCustomer();
    navigate('/');
  };

  const handleDemoAdminClick = () => {
    loginAsDemoAdmin();
    navigate('/admin');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 flex items-center justify-center min-h-[75vh]">
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-card max-w-md w-full overflow-hidden">
        {/* Header with SGKart Branding */}
        <div className="bg-gradient-to-r from-primary via-blue-900 to-[#0A224E] p-6 text-white text-center relative overflow-hidden">
          <div className="flex items-center justify-center tracking-tight text-3xl font-black font-heading leading-none">
            <span>SG</span>
            <span className="text-secondary ml-0.5">Kart</span>
          </div>
          <p className="text-xs text-blue-100 italic mt-1 font-medium">
            Everything You Need. All in One Place.
          </p>
          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/20 text-secondary text-[11px] font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fast & Secure Marketplace Access</span>
          </div>
        </div>

        {/* 1-Click Quick Demo Switchers */}
        <div className="p-4 bg-blue-50 border-b border-blue-100">
          <p className="text-[11px] font-bold text-slate-600 uppercase tracking-wider text-center mb-2">
            Try 1-Click Demo Logins
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleDemoCustomerClick}
              className="py-2 px-3 bg-white hover:bg-slate-100 text-navy font-bold text-xs rounded-xl border border-blue-200 shadow-2xs transition"
            >
              Demo Customer
            </button>
            <button
              type="button"
              onClick={handleDemoAdminClick}
              className="py-2 px-3 bg-primary hover:bg-primary-hover text-white font-bold text-xs rounded-xl shadow-2xs transition"
            >
              Demo Admin Portal
            </button>
          </div>
        </div>

        {/* Tab Toggle */}
        <div className="flex border-b border-slate-200 text-sm font-bold">
          <button
            onClick={() => setIsLoginTab(true)}
            className={`flex-1 py-3 text-center transition ${
              isLoginTab ? 'text-primary border-b-2 border-primary bg-slate-50' : 'text-slate-400 hover:text-navy'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setIsLoginTab(false)}
            className={`flex-1 py-3 text-center transition ${
              !isLoginTab ? 'text-primary border-b-2 border-primary bg-slate-50' : 'text-slate-400 hover:text-navy'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {!isLoginTab && (
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Your Full Name *</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sujit Kumar"
                  className="w-full pl-9 pr-3 py-2.5 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Email Address *</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-9 pr-3 py-2.5 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
          </div>

          {!isLoginTab && (
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Mobile Number (Optional)</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 00000"
                  className="w-full pl-9 pr-3 py-2.5 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-slate-700">Password *</label>
              {isLoginTab && (
                <button
                  type="button"
                  onClick={() => addToast('Use demo password or any text to sign in', 'info')}
                  className="text-[11px] text-primary hover:underline"
                >
                  Forgot Password?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-10 py-2.5 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-navy"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-secondary hover:bg-secondary-hover text-navy font-black text-xs sm:text-sm py-3.5 rounded-xl transition shadow-md flex items-center justify-center gap-2 active:scale-98"
          >
            <span>{isLoginTab ? 'Sign In to SGKart' : 'Create My Account'}</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>

          <p className="text-[10px] text-slate-400 text-center leading-relaxed">
            By proceeding, you agree to SGKart's Terms of Use and Privacy Policy. All accounts are demonstration simulation profiles.
          </p>
        </form>
      </div>
    </div>
  );
};
