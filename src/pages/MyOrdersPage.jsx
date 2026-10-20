import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  RotateCcw, 
  FileText, 
  AlertCircle, 
  Search, 
  ChevronRight,
  ShieldCheck,
  Ban
} from 'lucide-react';
import { useOrders } from '../context/OrderContext';
import { useToast } from '../context/ToastContext';

export const MyOrdersPage = () => {
  const { orders, cancelOrder } = useOrders();
  const { addToast } = useToast();

  const [filterStatus, setFilterStatus] = useState('all'); // 'all' | 'active' | 'delivered' | 'cancelled'
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrders = orders.filter((order) => {
    // Status filter
    if (filterStatus === 'active') {
      if (['Delivered', 'Cancelled'].includes(order.status)) return false;
    } else if (filterStatus === 'delivered') {
      if (order.status !== 'Delivered') return false;
    } else if (filterStatus === 'cancelled') {
      if (order.status !== 'Cancelled') return false;
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesId = order.id.toLowerCase().includes(q);
      const matchesItem = order.items.some((i) => i.name.toLowerCase().includes(q));
      if (!matchesId && !matchesItem) return false;
    }

    return true;
  });

  const handleDownloadInvoice = (orderId) => {
    addToast(`Simulated invoice for #${orderId} generated & downloaded.`, 'info');
  };

  const handleRequestReturn = (orderId) => {
    addToast(`Return request initiated for #${orderId}. Pickup scheduled within 48h.`, 'success');
  };

  const getStatusBadge = (status) => {
    if (status === 'Delivered') {
      return (
        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2.5 py-1 rounded-full uppercase flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5" /> Delivered
        </span>
      );
    }
    if (status === 'Shipped') {
      return (
        <span className="bg-blue-100 text-primary text-[10px] font-black px-2.5 py-1 rounded-full uppercase flex items-center gap-1">
          <Truck className="w-3.5 h-3.5" /> Out for Delivery / Shipped
        </span>
      );
    }
    if (status === 'Processing' || status === 'Confirmed') {
      return (
        <span className="bg-amber-100 text-amber-800 text-[10px] font-black px-2.5 py-1 rounded-full uppercase flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" /> {status}
        </span>
      );
    }
    return (
      <span className="bg-slate-100 text-slate-600 text-[10px] font-black px-2.5 py-1 rounded-full uppercase flex items-center gap-1">
        <Ban className="w-3.5 h-3.5" /> {status}
      </span>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-black font-heading text-navy flex items-center gap-2">
            <Package className="w-6 h-6 text-primary" />
            <span>My Orders & Purchases</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Track active shipments, download GST invoices, and manage returns
          </p>
        </div>

        {/* Search orders */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search order ID or item..."
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-bold">
        {[
          { key: 'all', label: `All Orders (${orders.length})` },
          { key: 'active', label: 'Active Shipments' },
          { key: 'delivered', label: 'Delivered' },
          { key: 'cancelled', label: 'Cancelled' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilterStatus(tab.key)}
            className={`px-4 py-2 rounded-xl transition ${
              filterStatus === tab.key
                ? 'bg-primary text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Orders List */}
      {filteredOrders.length > 0 ? (
        <div className="space-y-6">
          {filteredOrders.map((order) => {
            const isCancellable = ['Confirmed', 'Processing'].includes(order.status);
            const isDelivered = order.status === 'Delivered';

            return (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden"
              >
                {/* Order Top Bar */}
                <div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-bold">ORDER PLACED</p>
                      <p className="font-bold text-navy mt-0.5">
                        {new Date(order.date).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-bold">TOTAL AMOUNT</p>
                      <p className="font-bold text-navy mt-0.5">₹{order.total.toLocaleString('en-IN')}</p>
                    </div>

                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-bold">SHIP TO</p>
                      <p className="font-bold text-navy mt-0.5">{order.deliveryAddress?.fullName || 'Customer'}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <p className="text-right">
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">ORDER #</span>
                      <span className="font-mono font-bold text-primary">{order.id}</span>
                    </p>
                    {getStatusBadge(order.status)}
                  </div>
                </div>

                {/* Tracking Progress Timeline */}
                <div className="px-5 py-4 border-b border-slate-100 bg-white">
                  <div className="flex items-center justify-between max-w-2xl text-[11px] font-bold">
                    <div className="flex items-center gap-1.5 text-primary">
                      <div className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-[10px]">
                        ✓
                      </div>
                      <span>Order Confirmed</span>
                    </div>

                    <div className={`h-0.5 flex-1 mx-2 ${['Processing', 'Shipped', 'Delivered'].includes(order.status) ? 'bg-primary' : 'bg-slate-200'}`}></div>

                    <div className={`flex items-center gap-1.5 ${['Processing', 'Shipped', 'Delivered'].includes(order.status) ? 'text-primary' : 'text-slate-400'}`}>
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${['Processing', 'Shipped', 'Delivered'].includes(order.status) ? 'bg-primary text-white' : 'bg-slate-200 text-slate-500'}`}>
                        2
                      </div>
                      <span>Processing</span>
                    </div>

                    <div className={`h-0.5 flex-1 mx-2 ${['Shipped', 'Delivered'].includes(order.status) ? 'bg-primary' : 'bg-slate-200'}`}></div>

                    <div className={`flex items-center gap-1.5 ${['Shipped', 'Delivered'].includes(order.status) ? 'text-primary' : 'text-slate-400'}`}>
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${['Shipped', 'Delivered'].includes(order.status) ? 'bg-primary text-white' : 'bg-slate-200 text-slate-500'}`}>
                        3
                      </div>
                      <span>Shipped</span>
                    </div>

                    <div className={`h-0.5 flex-1 mx-2 ${order.status === 'Delivered' ? 'bg-emerald-500' : 'bg-slate-200'}`}></div>

                    <div className={`flex items-center gap-1.5 ${order.status === 'Delivered' ? 'text-emerald-700' : 'text-slate-400'}`}>
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${order.status === 'Delivered' ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
                        ✓
                      </div>
                      <span>Delivered</span>
                    </div>
                  </div>
                </div>

                {/* Items in this order */}
                <div className="p-4 sm:p-5 space-y-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded-xl object-cover border border-slate-200 flex-shrink-0"
                        />
                        <div>
                          <p className="text-xs font-bold text-navy line-clamp-1">{item.name}</p>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            Qty: {item.quantity} | ₹{item.price.toLocaleString('en-IN')} each
                          </p>
                          <p className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1 mt-0.5">
                            <ShieldCheck className="w-3 h-3 text-secondary" /> SG Assured Return Covered
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-black text-navy">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Footer Actions */}
                <div className="p-4 bg-slate-50/70 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="text-slate-500 text-[11px]">
                    Tracking ID: <b className="text-navy">{order.trackingNumber}</b> | Payment: <b>{order.paymentMethod}</b>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDownloadInvoice(order.id)}
                      className="bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition"
                    >
                      <FileText className="w-3.5 h-3.5 text-primary" /> Download Invoice
                    </button>

                    {isDelivered && (
                      <button
                        onClick={() => handleRequestReturn(order.id)}
                        className="bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition"
                      >
                        <RotateCcw className="w-3.5 h-3.5 text-amber-600" /> Return / Replace
                      </button>
                    )}

                    {isCancellable && (
                      <button
                        onClick={() => cancelOrder(order.id)}
                        className="bg-rose-50 hover:bg-rose-100 text-rose-600 px-3 py-1.5 rounded-lg font-semibold transition"
                      >
                        Cancel Order
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center max-w-md mx-auto shadow-xs">
          <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-navy">No Orders Found</h3>
          <p className="text-xs text-slate-500 mt-1 mb-5">
            You don't have any orders matching the selected filter.
          </p>
          <Link
            to="/products"
            className="bg-primary hover:bg-primary-hover text-white text-xs font-bold px-5 py-2.5 rounded-xl transition shadow"
          >
            Start Shopping Deals
          </Link>
        </div>
      )}
    </div>
  );
};
