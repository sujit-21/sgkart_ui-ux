import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, 
  MapPin, 
  Truck, 
  CreditCard, 
  ShieldCheck, 
  Lock, 
  ArrowRight, 
  Plus, 
  Check, 
  Smartphone, 
  Building2, 
  Banknote,
  PackageCheck
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import { useToast } from '../context/ToastContext';

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, totalAmount, subtotal, deliveryCharge, couponDiscount, appliedCoupon } = useCart();
  const { user, addAddress } = useAuth();
  const { placeOrder } = useOrders();
  const { addToast } = useToast();

  const [currentStep, setCurrentStep] = useState(1); // 1: Address, 2: Delivery Speed, 3: Payment

  // Address selection
  const userAddresses = user?.addresses || [];
  const defaultAddr = userAddresses.find((a) => a.isDefault) || userAddresses[0];
  const [selectedAddressId, setSelectedAddressId] = useState(defaultAddr?.id || 'new');
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(userAddresses.length === 0);

  // New Address Form
  const [newAddress, setNewAddress] = useState({
    fullName: user?.name || '',
    phone: user?.phone || '',
    type: 'Home',
    addressLine: '',
    landmark: '',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400076'
  });

  // Delivery Option
  const [deliverySpeed, setDeliverySpeed] = useState('standard'); // 'standard' | 'express'

  // Payment Option
  const [paymentMethod, setPaymentMethod] = useState('UPI'); // 'UPI' | 'Card' | 'NetBanking' | 'COD'
  const [upiId, setUpiId] = useState('sujit@okhdfcbank');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [placedOrderDetails, setPlacedOrderDetails] = useState(null);

  // Calculated final amounts
  const speedCost = deliverySpeed === 'express' ? 49 : 0;
  const finalPayable = totalAmount + speedCost;

  const handleAddNewAddressSubmit = (e) => {
    e.preventDefault();
    if (!newAddress.fullName || !newAddress.phone || !newAddress.addressLine || !newAddress.pincode) {
      addToast('Please fill all required address fields', 'error');
      return;
    }
    addAddress(newAddress);
    setIsAddingNewAddress(false);
    setSelectedAddressId(userAddresses[0]?.id || 'addr-1');
  };

  const handleCompleteOrder = () => {
    const chosenAddress = userAddresses.find((a) => a.id === selectedAddressId) || newAddress;

    if (!chosenAddress.addressLine) {
      addToast('Please select or add a valid delivery address', 'warning');
      setCurrentStep(1);
      return;
    }

    setIsPlacingOrder(true);

    setTimeout(() => {
      const order = placeOrder({
        customerName: chosenAddress.fullName || user?.name || 'Customer',
        customerEmail: user?.email || 'customer@sgkart.demo',
        customerPhone: chosenAddress.phone || '+91 98765 00000',
        items: cartItems.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.images?.[0] || item.image
        })),
        subtotal,
        discount: couponDiscount,
        shippingFee: deliveryCharge + speedCost,
        total: finalPayable,
        paymentMethod: paymentMethod === 'COD' ? 'Cash on Delivery' : `${paymentMethod} (Simulated Demo)`,
        deliveryAddress: chosenAddress,
        deliverySpeed: deliverySpeed === 'express' ? 'SG Assured 1-Day Express' : 'Standard 2-Day Delivery'
      });

      setIsPlacingOrder(false);
      setPlacedOrderDetails(order);
    }, 1200);
  };

  // If order was just placed, show celebratory confirmation screen!
  if (placedOrderDetails) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 text-center shadow-lg space-y-6">
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <PackageCheck className="w-10 h-10" />
          </div>

          <div>
            <span className="bg-emerald-100 text-emerald-800 text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
              Order Confirmed & Verified
            </span>
            <h1 className="text-2xl sm:text-3xl font-black font-heading text-navy mt-2">
              Thank You for Shopping with SGKart!
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Order ID: <b className="text-navy">{placedOrderDetails.id}</b> | Tracking: <b className="text-primary">{placedOrderDetails.trackingNumber}</b>
            </p>
          </div>

          {/* Details summary */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 text-left text-xs space-y-3">
            <div className="flex justify-between pb-2 border-b border-slate-200">
              <span className="text-slate-500 font-medium">Estimated Delivery:</span>
              <span className="font-bold text-emerald-700">Tomorrow by 6:00 PM</span>
            </div>
            <div className="flex justify-between pb-2 border-b border-slate-200">
              <span className="text-slate-500 font-medium">Delivery Address:</span>
              <span className="font-semibold text-navy text-right">
                {placedOrderDetails.deliveryAddress.fullName}, {placedOrderDetails.deliveryAddress.addressLine}, {placedOrderDetails.deliveryAddress.city} - {placedOrderDetails.deliveryAddress.pincode}
              </span>
            </div>
            <div className="flex justify-between pb-2 border-b border-slate-200">
              <span className="text-slate-500 font-medium">Payment Mode:</span>
              <span className="font-semibold text-navy">{placedOrderDetails.paymentMethod}</span>
            </div>
            <div className="flex justify-between text-sm font-black text-navy pt-1">
              <span>Amount Paid:</span>
              <span className="text-primary">₹{placedOrderDetails.total.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => navigate('/orders')}
              className="w-full sm:w-auto bg-primary hover:bg-primary-hover text-white font-bold text-xs px-6 py-3.5 rounded-xl transition shadow"
            >
              Track Order Status in My Orders
            </button>
            <Link
              to="/products"
              className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-navy font-bold text-xs px-6 py-3.5 rounded-xl transition"
            >
              Continue Shopping
            </Link>
          </div>

          <p className="text-[11px] text-slate-400">
            Note: This is a frontend demo simulation. No real money or transactions were charged.
          </p>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-navy">No Items to Checkout</h2>
        <Link to="/products" className="text-primary font-bold text-sm mt-3 inline-block">
          Explore SGKart Deals
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Top Checkout Progress Steps */}
      <div className="max-w-3xl mx-auto mb-8">
        <div className="flex items-center justify-between text-xs font-bold">
          <div
            onClick={() => setCurrentStep(1)}
            className={`flex items-center gap-2 cursor-pointer ${
              currentStep >= 1 ? 'text-primary' : 'text-slate-400'
            }`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-primary text-white' : 'bg-slate-200 text-slate-500'}`}>
              1
            </div>
            <span>Delivery Address</span>
          </div>

          <div className={`h-0.5 flex-1 mx-3 ${currentStep >= 2 ? 'bg-primary' : 'bg-slate-200'}`}></div>

          <div
            onClick={() => setCurrentStep(2)}
            className={`flex items-center gap-2 cursor-pointer ${
              currentStep >= 2 ? 'text-primary' : 'text-slate-400'
            }`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-primary text-white' : 'bg-slate-200 text-slate-500'}`}>
              2
            </div>
            <span>Delivery Option</span>
          </div>

          <div className={`h-0.5 flex-1 mx-3 ${currentStep >= 3 ? 'bg-primary' : 'bg-slate-200'}`}></div>

          <div
            onClick={() => setCurrentStep(3)}
            className={`flex items-center gap-2 cursor-pointer ${
              currentStep >= 3 ? 'text-primary' : 'text-slate-400'
            }`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-primary text-white' : 'bg-slate-200 text-slate-500'}`}>
              3
            </div>
            <span>Payment Method</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Multi-step interactive panel (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* STEP 1: DELIVERY ADDRESS */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                  1
                </div>
                <h2 className="text-base font-bold text-navy">Delivery Address</h2>
              </div>
              {currentStep > 1 && (
                <button
                  onClick={() => setCurrentStep(1)}
                  className="text-xs font-semibold text-primary hover:underline"
                >
                  Change
                </button>
              )}
            </div>

            {currentStep === 1 ? (
              <div className="pt-4 space-y-4">
                {/* Saved addresses */}
                {!isAddingNewAddress && userAddresses.length > 0 && (
                  <div className="space-y-3">
                    {userAddresses.map((addr) => (
                      <label
                        key={addr.id}
                        className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition ${
                          selectedAddressId === addr.id
                            ? 'border-primary bg-blue-50/60 ring-2 ring-primary/20'
                            : 'border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="addressSelection"
                          checked={selectedAddressId === addr.id}
                          onChange={() => setSelectedAddressId(addr.id)}
                          className="mt-1 text-primary focus:ring-primary w-4 h-4 cursor-pointer"
                        />
                        <div className="flex-1 text-xs">
                          <div className="flex items-center gap-2 font-bold text-navy">
                            <span>{addr.fullName}</span>
                            <span className="bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded text-[10px] uppercase">
                              {addr.type}
                            </span>
                            <span className="text-slate-500 font-normal">{addr.phone}</span>
                          </div>
                          <p className="text-slate-600 mt-1 leading-relaxed">
                            {addr.addressLine}, {addr.landmark ? `${addr.landmark}, ` : ''}{addr.city}, {addr.state} - <b>{addr.pincode}</b>
                          </p>
                        </div>
                      </label>
                    ))}

                    <button
                      type="button"
                      onClick={() => setIsAddingNewAddress(true)}
                      className="text-xs font-bold text-primary hover:text-primary-hover flex items-center gap-1.5 pt-2"
                    >
                      <Plus className="w-4 h-4" /> Add a new address
                    </button>
                  </div>
                )}

                {/* Add new address form */}
                {isAddingNewAddress && (
                  <form onSubmit={handleAddNewAddressSubmit} className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Add New Delivery Address
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-semibold text-slate-700 block mb-1">Full Name *</label>
                        <input
                          type="text"
                          value={newAddress.fullName}
                          onChange={(e) => setNewAddress({ ...newAddress, fullName: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                          placeholder="Recipient Name"
                          required
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-slate-700 block mb-1">Mobile Number *</label>
                        <input
                          type="tel"
                          value={newAddress.phone}
                          onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                          placeholder="10-digit phone number"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-slate-700 block mb-1">Flat, House no., Building, Apartment *</label>
                      <input
                        type="text"
                        value={newAddress.addressLine}
                        onChange={(e) => setNewAddress({ ...newAddress, addressLine: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                        placeholder="Street Address"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="text-[11px] font-semibold text-slate-700 block mb-1">PIN Code *</label>
                        <input
                          type="text"
                          maxLength={6}
                          value={newAddress.pincode}
                          onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold text-slate-700 block mb-1">City *</label>
                        <input
                          type="text"
                          value={newAddress.city}
                          onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold text-slate-700 block mb-1">State *</label>
                        <input
                          type="text"
                          value={newAddress.state}
                          onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      {userAddresses.length > 0 && (
                        <button
                          type="button"
                          onClick={() => setIsAddingNewAddress(false)}
                          className="px-4 py-2 text-xs border border-slate-300 rounded-lg font-semibold text-slate-600"
                        >
                          Cancel
                        </button>
                      )}
                      <button
                        type="submit"
                        className="bg-primary text-white text-xs font-bold px-4 py-2 rounded-lg"
                      >
                        Save & Use Address
                      </button>
                    </div>
                  </form>
                )}

                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="bg-primary hover:bg-primary-hover text-white text-xs font-bold px-6 py-2.5 rounded-xl transition shadow-xs mt-3"
                >
                  Deliver to this Address &rarr;
                </button>
              </div>
            ) : (
              <div className="pt-2 text-xs text-slate-600">
                <span className="font-semibold text-navy">Deliver to: </span>
                {userAddresses.find(a => a.id === selectedAddressId)?.fullName || newAddress.fullName || 'Sujit Kumar'} - {userAddresses.find(a => a.id === selectedAddressId)?.city || newAddress.city}
              </div>
            )}
          </div>

          {/* STEP 2: DELIVERY OPTIONS */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${currentStep >= 2 ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-400'}`}>
                  2
                </div>
                <h2 className="text-base font-bold text-navy">Delivery Speed & Schedule</h2>
              </div>
              {currentStep > 2 && (
                <button
                  onClick={() => setCurrentStep(2)}
                  className="text-xs font-semibold text-primary hover:underline"
                >
                  Change
                </button>
              )}
            </div>

            {currentStep === 2 ? (
              <div className="pt-4 space-y-3">
                <label className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition ${
                  deliverySpeed === 'standard' ? 'border-primary bg-blue-50/60 ring-2 ring-primary/20' : 'border-slate-200'
                }`}>
                  <input
                    type="radio"
                    name="speed"
                    checked={deliverySpeed === 'standard'}
                    onChange={() => setDeliverySpeed('standard')}
                    className="mt-1 text-primary focus:ring-primary w-4 h-4"
                  />
                  <div className="flex-1 text-xs">
                    <div className="flex justify-between items-center font-bold text-navy">
                      <span>Standard Delivery (2 to 3 Days)</span>
                      <span className="text-emerald-700 uppercase font-black">Free</span>
                    </div>
                    <p className="text-slate-500 mt-0.5">Reliable dispatch via SG Express network</p>
                  </div>
                </label>

                <label className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition ${
                  deliverySpeed === 'express' ? 'border-primary bg-blue-50/60 ring-2 ring-primary/20' : 'border-slate-200'
                }`}>
                  <input
                    type="radio"
                    name="speed"
                    checked={deliverySpeed === 'express'}
                    onChange={() => setDeliverySpeed('express')}
                    className="mt-1 text-primary focus:ring-primary w-4 h-4"
                  />
                  <div className="flex-1 text-xs">
                    <div className="flex justify-between items-center font-bold text-navy">
                      <span className="flex items-center gap-1.5">
                        <Truck className="w-4 h-4 text-primary" />
                        <span>SG Assured 1-Day Priority Express</span>
                      </span>
                      <span className="text-navy font-bold">₹49</span>
                    </div>
                    <p className="text-slate-500 mt-0.5">Guaranteed delivery by Tomorrow evening</p>
                  </div>
                </label>

                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="bg-primary hover:bg-primary-hover text-white text-xs font-bold px-6 py-2.5 rounded-xl transition shadow-xs mt-2"
                >
                  Proceed to Payment &rarr;
                </button>
              </div>
            ) : (
              currentStep > 2 && (
                <div className="pt-2 text-xs text-slate-600">
                  Speed: <span className="font-semibold text-navy">{deliverySpeed === 'express' ? 'SG Assured 1-Day Priority' : 'Standard Delivery (Free)'}</span>
                </div>
              )
            )}
          </div>

          {/* STEP 3: PAYMENT METHOD */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
            <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${currentStep === 3 ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-400'}`}>
                3
              </div>
              <h2 className="text-base font-bold text-navy">Payment Method (Simulated Demo)</h2>
            </div>

            {currentStep === 3 && (
              <div className="pt-4 space-y-4">
                <div className="space-y-3">
                  {/* UPI */}
                  <label className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition ${
                    paymentMethod === 'UPI' ? 'border-primary bg-blue-50/60 ring-2 ring-primary/20' : 'border-slate-200'
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'UPI'}
                      onChange={() => setPaymentMethod('UPI')}
                      className="mt-1 text-primary focus:ring-primary w-4 h-4"
                    />
                    <div className="flex-1 text-xs">
                      <div className="flex items-center justify-between font-bold text-navy">
                        <span className="flex items-center gap-2">
                          <Smartphone className="w-4 h-4 text-emerald-600" />
                          <span>UPI (Google Pay, PhonePe, Paytm, BHIM)</span>
                        </span>
                        <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded text-[10px]">Fastest</span>
                      </div>
                      {paymentMethod === 'UPI' && (
                        <div className="mt-3 max-w-sm">
                          <label className="text-[11px] font-semibold text-slate-600 block mb-1">Demo UPI ID</label>
                          <input
                            type="text"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs"
                            placeholder="username@bank"
                          />
                        </div>
                      )}
                    </div>
                  </label>

                  {/* Card */}
                  <label className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition ${
                    paymentMethod === 'Card' ? 'border-primary bg-blue-50/60 ring-2 ring-primary/20' : 'border-slate-200'
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'Card'}
                      onChange={() => setPaymentMethod('Card')}
                      className="mt-1 text-primary focus:ring-primary w-4 h-4"
                    />
                    <div className="flex-1 text-xs">
                      <div className="flex items-center gap-2 font-bold text-navy">
                        <CreditCard className="w-4 h-4 text-primary" />
                        <span>Credit / Debit Card (Visa, RuPay, MasterCard)</span>
                      </div>
                      <p className="text-slate-500 mt-0.5">Demo simulated transaction with instant verification</p>
                    </div>
                  </label>

                  {/* NetBanking */}
                  <label className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition ${
                    paymentMethod === 'NetBanking' ? 'border-primary bg-blue-50/60 ring-2 ring-primary/20' : 'border-slate-200'
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'NetBanking'}
                      onChange={() => setPaymentMethod('NetBanking')}
                      className="mt-1 text-primary focus:ring-primary w-4 h-4"
                    />
                    <div className="flex-1 text-xs">
                      <div className="flex items-center gap-2 font-bold text-navy">
                        <Building2 className="w-4 h-4 text-amber-600" />
                        <span>Net Banking (SBI, HDFC, ICICI, Axis & 50+ Banks)</span>
                      </div>
                      <p className="text-slate-500 mt-0.5">Direct simulated bank transfer</p>
                    </div>
                  </label>

                  {/* COD */}
                  <label className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition ${
                    paymentMethod === 'COD' ? 'border-primary bg-blue-50/60 ring-2 ring-primary/20' : 'border-slate-200'
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'COD'}
                      onChange={() => setPaymentMethod('COD')}
                      className="mt-1 text-primary focus:ring-primary w-4 h-4"
                    />
                    <div className="flex-1 text-xs">
                      <div className="flex items-center gap-2 font-bold text-navy">
                        <Banknote className="w-4 h-4 text-slate-700" />
                        <span>Cash on Delivery (Pay cash/UPI at doorstep)</span>
                      </div>
                      <p className="text-slate-500 mt-0.5">Pay conveniently when the courier arrives</p>
                    </div>
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Order Summary & Confirm (4 cols) */}
        <div className="lg:col-span-4 space-y-4 sticky top-24">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 pb-2 border-b border-slate-100">
              Order Summary ({cartItems.length} Products)
            </h3>

            {/* Thumbnail items list preview */}
            <div className="max-h-48 overflow-y-auto space-y-2.5 divide-y divide-slate-100 pr-1 no-scrollbar text-xs">
              {cartItems.map((item) => (
                <div key={item.id} className="pt-2 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <img
                      src={item.images?.[0] || item.image}
                      alt=""
                      className="w-10 h-10 object-cover rounded-md border border-slate-200 flex-shrink-0"
                    />
                    <div className="truncate">
                      <p className="font-semibold text-navy truncate">{item.name}</p>
                      <p className="text-[11px] text-slate-400">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-bold text-navy flex-shrink-0">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {couponDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Coupon ({appliedCoupon?.code})</span>
                  <span>- ₹{couponDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping & Handling</span>
                <span>{deliveryCharge === 0 ? <b className="text-emerald-700">Free</b> : `₹${deliveryCharge}`}</span>
              </div>
              {speedCost > 0 && (
                <div className="flex justify-between">
                  <span>Priority 1-Day Express</span>
                  <span>₹{speedCost}</span>
                </div>
              )}
              <div className="border-t border-slate-200 pt-3 flex justify-between items-baseline text-sm font-black text-navy font-heading">
                <span>Total Amount</span>
                <span className="text-lg text-primary">₹{finalPayable.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              onClick={handleCompleteOrder}
              disabled={isPlacingOrder}
              className="w-full bg-secondary hover:bg-secondary-hover text-navy font-black text-sm py-4 px-6 rounded-xl transition shadow-md flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
            >
              {isPlacingOrder ? (
                <span>Confirming Order...</span>
              ) : (
                <>
                  <Lock className="w-4 h-4 stroke-[2.5]" />
                  <span>Place Simulated Order</span>
                </>
              )}
            </button>

            <div className="text-center text-[10px] text-slate-400 space-y-1">
              <p className="flex items-center justify-center gap-1 text-emerald-700 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% Buyer Protection & Safe Transactions
              </p>
              <p>Demo Simulation — No actual debit/credit card charges occur</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
