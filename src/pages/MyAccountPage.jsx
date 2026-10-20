import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  MapPin, 
  Package, 
  Heart, 
  Coins, 
  Plus, 
  Trash2, 
  Check, 
  ShieldCheck, 
  SlidersHorizontal,
  Mail,
  Phone,
  Edit2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const MyAccountPage = () => {
  const { user, updateProfile, addAddress, deleteAddress, setDefaultAddress, isAdmin } = useAuth();
  const { addToast } = useToast();

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileName, setProfileName] = useState(user?.name || 'Sujit Kumar');
  const [profilePhone, setProfilePhone] = useState(user?.phone || '+91 98765 12340');

  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newAddr, setNewAddr] = useState({
    fullName: user?.name || '',
    phone: user?.phone || '',
    type: 'Home',
    addressLine: '',
    landmark: '',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400076'
  });

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile({ name: profileName, phone: profilePhone });
    setIsEditingProfile(false);
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    if (!newAddr.addressLine || !newAddr.pincode) {
      addToast('Please complete required address fields', 'error');
      return;
    }
    addAddress(newAddr);
    setIsAddingAddress(false);
    setNewAddr({
      fullName: user?.name || '',
      phone: user?.phone || '',
      type: 'Home',
      addressLine: '',
      landmark: '',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400076'
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Account Overview Header */}
      <div className="bg-gradient-to-r from-primary via-[#113C7E] to-[#0A224E] rounded-3xl p-6 sm:p-8 text-white shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-secondary text-navy font-black text-2xl sm:text-3xl flex items-center justify-center shadow-lg">
            {user?.name ? user.name.charAt(0) : 'U'}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black font-heading">
                {user?.name || 'Demo Shopper'}
              </h1>
              {isAdmin && (
                <span className="bg-secondary text-navy text-[10px] font-black px-2 py-0.5 rounded uppercase">
                  Admin
                </span>
              )}
            </div>
            <p className="text-xs text-blue-200 mt-1 flex items-center gap-2">
              <Mail className="w-3.5 h-3.5" /> {user?.email || 'user@sgkart.demo'}
            </p>
            <p className="text-xs text-blue-200 mt-0.5 flex items-center gap-2">
              <Phone className="w-3.5 h-3.5" /> {user?.phone || '+91 98765 12340'}
            </p>
          </div>
        </div>

        {/* SuperCoins & Perks card */}
        <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl">
          <div className="w-12 h-12 rounded-xl bg-amber-400 text-navy flex items-center justify-center shadow-md">
            <Coins className="w-6 h-6 fill-navy" />
          </div>
          <div>
            <p className="text-[11px] text-amber-200 font-bold uppercase tracking-wider">SG SuperCoins</p>
            <p className="text-2xl font-black font-heading text-secondary">{user?.superCoins || 480}</p>
            <p className="text-[10px] text-blue-100">Worth ₹{user?.superCoins || 480} off on next orders</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Saved Addresses (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Profile Details Edit Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h2 className="text-base font-bold text-navy flex items-center gap-2">
                <User className="w-4 h-4 text-primary" /> Personal Information
              </h2>
              <button
                onClick={() => setIsEditingProfile(!isEditingProfile)}
                className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
              >
                <Edit2 className="w-3 h-3" /> {isEditingProfile ? 'Cancel' : 'Edit'}
              </button>
            </div>

            {isEditingProfile ? (
              <form onSubmit={handleSaveProfile} className="space-y-4 max-w-md">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={profilePhone}
                    onChange={(e) => setProfilePhone(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary-hover text-white text-xs font-bold px-5 py-2.5 rounded-xl transition shadow"
                >
                  Save Changes
                </button>
              </form>
            ) : (
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <p className="text-slate-400 font-medium">Name</p>
                  <p className="font-bold text-navy text-sm mt-0.5">{user?.name || 'Sujit Kumar'}</p>
                </div>
                <div>
                  <p className="text-slate-400 font-medium">Email</p>
                  <p className="font-bold text-navy text-sm mt-0.5">{user?.email || 'sujit.kumar@sgkart.demo'}</p>
                </div>
                <div>
                  <p className="text-slate-400 font-medium">Primary Contact</p>
                  <p className="font-bold text-navy text-sm mt-0.5">{user?.phone || '+91 98765 12340'}</p>
                </div>
                <div>
                  <p className="text-slate-400 font-medium">Member Since</p>
                  <p className="font-bold text-navy text-sm mt-0.5">{user?.joinDate || 'March 2024'}</p>
                </div>
              </div>
            )}
          </div>

          {/* Manage Addresses Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-base font-bold text-navy flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" /> Manage Delivery Addresses
              </h2>
              {!isAddingAddress && (
                <button
                  onClick={() => setIsAddingAddress(true)}
                  className="bg-primary hover:bg-primary-hover text-white text-xs font-bold px-3.5 py-1.5 rounded-xl transition shadow flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" /> Add New Address
                </button>
              )}
            </div>

            {/* Add Address Form */}
            {isAddingAddress && (
              <form onSubmit={handleAddAddress} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Add Address</h4>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">Full Name</label>
                    <input
                      type="text"
                      value={newAddr.fullName}
                      onChange={(e) => setNewAddr({ ...newAddr, fullName: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={newAddr.phone}
                      onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">Address (Street, Flat, Bldg)</label>
                  <input
                    type="text"
                    value={newAddr.addressLine}
                    onChange={(e) => setNewAddr({ ...newAddr, addressLine: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                    required
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">Pincode</label>
                    <input
                      type="text"
                      maxLength={6}
                      value={newAddr.pincode}
                      onChange={(e) => setNewAddr({ ...newAddr, pincode: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">City</label>
                    <input
                      type="text"
                      value={newAddr.city}
                      onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">State</label>
                    <input
                      type="text"
                      value={newAddr.state}
                      onChange={(e) => setNewAddr({ ...newAddr, state: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingAddress(false)}
                    className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-primary text-white text-xs font-bold px-4 py-2 rounded-lg shadow"
                  >
                    Save Address
                  </button>
                </div>
              </form>
            )}

            {/* Addresses list */}
            <div className="space-y-3">
              {(user?.addresses || []).map((addr) => (
                <div
                  key={addr.id}
                  className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
                >
                  <div className="text-xs space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-navy">{addr.fullName}</span>
                      <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[10px] uppercase font-bold">
                        {addr.type}
                      </span>
                      {addr.isDefault && (
                        <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-black uppercase">
                          Default Address
                        </span>
                      )}
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      {addr.addressLine}, {addr.landmark ? `${addr.landmark}, ` : ''}{addr.city}, {addr.state} - <b>{addr.pincode}</b>
                    </p>
                    <p className="text-slate-500 text-[11px]">Phone: {addr.phone}</p>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    {!addr.isDefault && (
                      <button
                        onClick={() => setDefaultAddress(addr.id)}
                        className="text-xs font-semibold text-primary hover:underline"
                      >
                        Set as Default
                      </button>
                    )}
                    <button
                      onClick={() => deleteAddress(addr.id)}
                      className="text-rose-500 hover:bg-rose-50 p-1.5 rounded-lg transition"
                      title="Delete address"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Quick Links (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 pb-2 border-b border-slate-100">
              Quick Shortcuts
            </h3>

            <div className="space-y-1 text-xs">
              <Link
                to="/orders"
                className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 font-bold text-navy transition"
              >
                <div className="flex items-center gap-2.5">
                  <Package className="w-4 h-4 text-primary" />
                  <span>My Orders & Returns</span>
                </div>
                <span>&rarr;</span>
              </Link>

              <Link
                to="/wishlist"
                className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 font-bold text-navy transition"
              >
                <div className="flex items-center gap-2.5">
                  <Heart className="w-4 h-4 text-rose-500" />
                  <span>My Wishlist</span>
                </div>
                <span>&rarr;</span>
              </Link>

              <Link
                to="/cart"
                className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 font-bold text-navy transition"
              >
                <div className="flex items-center gap-2.5">
                  <Coins className="w-4 h-4 text-amber-500" />
                  <span>View Shopping Cart</span>
                </div>
                <span>&rarr;</span>
              </Link>

              <Link
                to="/admin"
                className="flex items-center justify-between p-3 rounded-xl bg-amber-50/70 hover:bg-amber-50 font-bold text-amber-900 transition"
              >
                <div className="flex items-center gap-2.5">
                  <SlidersHorizontal className="w-4 h-4 text-amber-600" />
                  <span>Demo Admin Panel</span>
                </div>
                <span className="text-[10px] bg-amber-200 px-1.5 py-0.5 rounded">Console</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
