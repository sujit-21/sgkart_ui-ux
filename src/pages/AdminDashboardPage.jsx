import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  FolderTree, 
  TrendingUp, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  X, 
  Check, 
  ExternalLink, 
  SlidersHorizontal,
  ArrowUpRight,
  ShieldAlert,
  RotateCcw,
  DollarSign,
  Star,
  CheckCircle2,
  Clock,
  Truck
} from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useOrders } from '../context/OrderContext';
import { useToast } from '../context/ToastContext';
import { initialAdminStats, salesTrends, categoryBreakdown, initialCustomers } from '../data/mockAdminData';

export const AdminDashboardPage = () => {
  const { products, categories, addProduct, updateProduct, deleteProduct, resetProductsToDefault } = useProducts();
  const { orders, updateOrderStatus } = useOrders();
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'products' | 'orders' | 'categories' | 'customers'

  // Search & Filter in Tables
  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState('all');
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');

  // Add / Edit Product Modal state
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [productForm, setProductForm] = useState({
    name: '',
    brand: '',
    category: 'Electronics',
    price: '',
    originalPrice: '',
    stockCount: 50,
    image: '',
    description: '',
    sgAssured: true
  });

  // View Order Details Modal state
  const [viewingOrder, setViewingOrder] = useState(null);

  // Filtered Products for Admin
  const adminFilteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.brand.toLowerCase().includes(productSearch.toLowerCase());
    const matchesCat = productCategoryFilter === 'all' || p.category.toLowerCase() === productCategoryFilter.toLowerCase();
    return matchesSearch && matchesCat;
  });

  // Filtered Orders for Admin
  const adminFilteredOrders = orders.filter((o) => {
    const matchesSearch = o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customerName?.toLowerCase().includes(orderSearch.toLowerCase());
    const matchesStatus = orderStatusFilter === 'all' || o.status.toLowerCase() === orderStatusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  // Open modal to add product
  const handleOpenAddModal = () => {
    setEditingProductId(null);
    setProductForm({
      name: '',
      brand: 'SGKart Brand',
      category: 'Electronics',
      price: '',
      originalPrice: '',
      stockCount: 50,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      description: 'High performance authentic product guaranteed by SGKart.',
      sgAssured: true
    });
    setIsProductModalOpen(true);
  };

  // Open modal to edit product
  const handleOpenEditModal = (p) => {
    setEditingProductId(p.id);
    setProductForm({
      name: p.name,
      brand: p.brand,
      category: p.category,
      price: p.price,
      originalPrice: p.originalPrice,
      stockCount: p.stockCount || 20,
      image: p.images[0],
      description: p.description,
      sgAssured: p.sgAssured || false
    });
    setIsProductModalOpen(true);
  };

  // Submit product modal form
  const handleProductSubmit = (e) => {
    e.preventDefault();
    if (!productForm.name || !productForm.price) {
      addToast('Please provide product name and price', 'error');
      return;
    }

    if (editingProductId) {
      updateProduct(editingProductId, {
        name: productForm.name,
        brand: productForm.brand,
        category: productForm.category,
        price: Number(productForm.price),
        originalPrice: Number(productForm.originalPrice || productForm.price),
        stockCount: Number(productForm.stockCount),
        description: productForm.description,
        sgAssured: productForm.sgAssured,
        images: [productForm.image]
      });
    } else {
      addProduct({
        name: productForm.name,
        brand: productForm.brand,
        category: productForm.category,
        price: Number(productForm.price),
        originalPrice: Number(productForm.originalPrice || productForm.price),
        stockCount: Number(productForm.stockCount),
        description: productForm.description,
        sgAssured: productForm.sgAssured,
        images: [productForm.image]
      });
    }

    setIsProductModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-100/90 text-navy pb-16">
      {/* Demo Disclaimer Bar */}
      <div className="bg-amber-500 text-slate-900 text-xs py-2 px-4 font-bold flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2 max-w-7xl mx-auto w-full justify-between">
          <span className="flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-slate-900" />
            <span>DEMO ADMIN CONSOLE: All data operations are simulated and stored locally.</span>
          </span>
          <Link
            to="/"
            className="bg-navy hover:bg-slate-900 text-white px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition"
          >
            <span>Back to Storefront</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-6 space-y-6">
        {/* Admin Navigation Header */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-black font-heading text-navy flex items-center gap-2">
                <SlidersHorizontal className="w-6 h-6 text-primary" />
                <span>SGKart Admin Dashboard</span>
              </span>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded uppercase">
                Active Store
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Manage product listings, inventory, fulfillment orders, and customers
            </p>
          </div>

          {/* Quick tab controls */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200 text-xs font-bold w-full md:w-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition ${
                activeTab === 'overview' ? 'bg-primary text-white shadow-xs' : 'text-slate-600 hover:text-navy'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition ${
                activeTab === 'products' ? 'bg-primary text-white shadow-xs' : 'text-slate-600 hover:text-navy'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Products ({products.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition ${
                activeTab === 'orders' ? 'bg-primary text-white shadow-xs' : 'text-slate-600 hover:text-navy'
              }`}
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Orders ({orders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('categories')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition ${
                activeTab === 'categories' ? 'bg-primary text-white shadow-xs' : 'text-slate-600 hover:text-navy'
              }`}
            >
              <FolderTree className="w-4 h-4" />
              <span>Categories</span>
            </button>

            <button
              onClick={() => setActiveTab('customers')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition ${
                activeTab === 'customers' ? 'bg-primary text-white shadow-xs' : 'text-slate-600 hover:text-navy'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Customers</span>
            </button>
          </div>
        </div>

        {/* TAB 1: OVERVIEW & ANALYTICS */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-in fade-in-50">
            {/* Metric Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-bold uppercase tracking-wider">Total Sales</span>
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-primary flex items-center justify-center">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-2xl font-black font-heading text-navy">
                    ₹{initialAdminStats.totalRevenue.toLocaleString('en-IN')}
                  </p>
                  <p className="text-xs text-emerald-700 font-bold flex items-center gap-1 mt-1">
                    <ArrowUpRight className="w-3.5 h-3.5" /> +{initialAdminStats.monthlyGrowth}% from last month
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-bold uppercase tracking-wider">Total Orders</span>
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <ShoppingCart className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-2xl font-black font-heading text-navy">
                    {initialAdminStats.totalOrders + orders.length - 4}
                  </p>
                  <p className="text-xs text-emerald-700 font-bold flex items-center gap-1 mt-1">
                    <ArrowUpRight className="w-3.5 h-3.5" /> +{initialAdminStats.ordersGrowth}% this week
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-bold uppercase tracking-wider">Live Catalog</span>
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Package className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-2xl font-black font-heading text-navy">{products.length} Products</p>
                  <p className="text-xs text-slate-500 font-medium mt-1">Across 7 Active Categories</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-bold uppercase tracking-wider">Customers</span>
                  <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                    <Users className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-2xl font-black font-heading text-navy">{initialAdminStats.totalCustomers}</p>
                  <p className="text-xs text-emerald-700 font-bold flex items-center gap-1 mt-1">
                    <ArrowUpRight className="w-3.5 h-3.5" /> +{initialAdminStats.customerGrowth}% new buyers
                  </p>
                </div>
              </div>
            </div>

            {/* Sales Trends Chart & Category Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Sales Trend Bar Chart Visual (8 cols) */}
              <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="text-sm font-bold text-navy">Monthly Revenue Trend (₹ Lakhs)</h3>
                    <p className="text-xs text-slate-400">Consistent growth over last 6 months</p>
                  </div>
                  <span className="text-xs font-bold text-primary bg-blue-50 px-2.5 py-1 rounded-lg">
                    Fiscal Year 2026
                  </span>
                </div>

                {/* Simulated CSS Chart */}
                <div className="h-60 pt-6 flex items-end justify-between gap-4 px-2">
                  {salesTrends.map((st) => {
                    const maxSales = 1600000;
                    const heightPercent = Math.round((st.sales / maxSales) * 100);
                    return (
                      <div key={st.month} className="flex-1 flex flex-col items-center gap-2 group">
                        <span className="text-[10px] font-bold text-slate-500 opacity-0 group-hover:opacity-100 transition">
                          ₹{(st.sales / 100000).toFixed(1)}L
                        </span>
                        <div className="w-full max-w-[48px] bg-slate-100 rounded-t-xl overflow-hidden h-44 flex items-end">
                          <div
                            className="w-full bg-gradient-to-t from-primary to-blue-500 rounded-t-xl transition-all duration-700 group-hover:brightness-110"
                            style={{ height: `${heightPercent}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-bold text-navy">{st.month}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Category Breakdown Donut / Progress visual (4 cols) */}
              <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
                <div className="pb-3 border-b border-slate-100">
                  <h3 className="text-sm font-bold text-navy">Revenue by Category</h3>
                  <p className="text-xs text-slate-400">Electronics & Fashion lead GMV</p>
                </div>

                <div className="space-y-3 pt-2">
                  {categoryBreakdown.map((item) => (
                    <div key={item.name} className="space-y-1 text-xs">
                      <div className="flex justify-between items-center font-bold">
                        <span className="text-slate-700">{item.name}</span>
                        <span className="text-navy">{item.percentage}% (₹{(item.revenue / 1000).toFixed(0)}k)</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <button
                    onClick={resetProductsToDefault}
                    className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Products to Defaults</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Recent Orders Overview */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-sm font-bold text-navy">Recent Customer Orders</h3>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="text-xs font-bold text-primary hover:underline"
                >
                  View All Orders &rarr;
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-400 uppercase font-bold text-[10px]">
                    <tr>
                      <th className="p-3">Order ID</th>
                      <th className="p-3">Customer</th>
                      <th className="p-3">Items</th>
                      <th className="p-3">Total</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {orders.slice(0, 4).map((o) => (
                      <tr key={o.id} className="hover:bg-slate-50">
                        <td className="p-3 font-mono font-bold text-primary">{o.id}</td>
                        <td className="p-3 font-semibold text-navy">{o.customerName}</td>
                        <td className="p-3 text-slate-500">{o.items?.length || 1} item(s)</td>
                        <td className="p-3 font-bold text-navy">₹{o.total.toLocaleString('en-IN')}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] uppercase ${
                            o.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' :
                            o.status === 'Shipped' ? 'bg-blue-100 text-primary' :
                            'bg-amber-100 text-amber-800'
                          }`}>
                            {o.status}
                          </span>
                        </td>
                        <td className="p-3">
                          <button
                            onClick={() => setViewingOrder(o)}
                            className="text-primary hover:underline font-bold"
                          >
                            Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTS MANAGEMENT */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4 animate-in fade-in-50">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-navy">Marketplace Products Catalog</h3>
                <p className="text-xs text-slate-500 mt-0.5">Add, edit pricing, or toggle SG Assured stock</p>
              </div>

              <button
                onClick={handleOpenAddModal}
                className="bg-primary hover:bg-primary-hover text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Add New Product
              </button>
            </div>

            {/* Filter bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  placeholder="Search products by title or brand..."
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <select
                value={productCategoryFilter}
                onChange={(e) => setProductCategoryFilter(e.target.value)}
                className="bg-white border border-slate-300 py-2 px-3 rounded-xl text-xs font-bold text-navy w-full sm:w-auto"
              >
                <option value="all">All Categories</option>
                {categories.filter(c => c.slug !== 'all').map((cat) => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* Products Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-400 uppercase font-bold text-[10px]">
                  <tr>
                    <th className="p-3">Product</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Stock</th>
                    <th className="p-3">Rating</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {adminFilteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/80 transition">
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.images[0]}
                            alt=""
                            className="w-10 h-10 object-cover rounded-lg border border-slate-200 flex-shrink-0"
                          />
                          <div className="max-w-xs">
                            <p className="font-bold text-navy truncate">{p.name}</p>
                            <p className="text-[10px] text-slate-400">{p.brand} • {p.sgAssured ? 'SG Assured' : 'Standard'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 text-slate-600 font-medium">{p.category}</td>
                      <td className="p-3">
                        <p className="font-bold text-navy">₹{p.price.toLocaleString('en-IN')}</p>
                        {p.originalPrice > p.price && (
                          <p className="text-[10px] text-slate-400 line-through">₹{p.originalPrice.toLocaleString('en-IN')}</p>
                        )}
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                          (p.stockCount || 20) > 10 ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                        }`}>
                          {p.stockCount || 20} in stock
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-1 text-amber-500 font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          <span>{p.rating}</span>
                        </div>
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEditModal(p)}
                            className="p-1.5 text-slate-500 hover:text-primary hover:bg-blue-50 rounded-lg transition"
                            title="Edit Product"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteProduct(p.id)}
                            className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                            title="Delete Product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4 animate-in fade-in-50">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-navy">Fulfillment Orders</h3>
                <p className="text-xs text-slate-500 mt-0.5">Manage dispatch statuses and verify customer shipments</p>
              </div>

              {/* Status filter */}
              <select
                value={orderStatusFilter}
                onChange={(e) => setOrderStatusFilter(e.target.value)}
                className="bg-white border border-slate-300 py-2 px-3 rounded-xl text-xs font-bold text-navy"
              >
                <option value="all">All Statuses</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-400 uppercase font-bold text-[10px]">
                  <tr>
                    <th className="p-3">Order ID</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Customer</th>
                    <th className="p-3">Items</th>
                    <th className="p-3">Total Amount</th>
                    <th className="p-3">Fulfillment Status</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {adminFilteredOrders.map((o) => (
                    <tr key={o.id} className="hover:bg-slate-50/80 transition">
                      <td className="p-3 font-mono font-bold text-primary">{o.id}</td>
                      <td className="p-3 text-slate-500">
                        {new Date(o.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                      </td>
                      <td className="p-3">
                        <p className="font-bold text-navy">{o.customerName}</p>
                        <p className="text-[10px] text-slate-400">{o.customerPhone}</p>
                      </td>
                      <td className="p-3 text-slate-600">{o.items?.length || 1} item(s)</td>
                      <td className="p-3 font-bold text-navy">₹{o.total.toLocaleString('en-IN')}</td>
                      <td className="p-3">
                        <select
                          value={o.status}
                          onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                          className="bg-slate-50 border border-slate-300 rounded-lg px-2 py-1 text-xs font-bold cursor-pointer"
                        >
                          <option value="Confirmed">Confirmed</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => setViewingOrder(o)}
                          className="text-primary hover:underline font-bold"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: CATEGORY MANAGEMENT */}
        {activeTab === 'categories' && (
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4 animate-in fade-in-50">
            <div className="pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-navy">Product Categories</h3>
              <p className="text-xs text-slate-500 mt-0.5">Manage active store taxonomy</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
              {categories.filter(c => c.slug !== 'all').map((cat) => {
                const count = products.filter(p => p.category.toLowerCase() === cat.name.toLowerCase()).length;
                return (
                  <div key={cat.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-navy text-sm">{cat.name}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{cat.desc}</p>
                      <p className="text-[11px] text-primary font-semibold mt-2">{count} live products</p>
                    </div>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                      Active
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 5: CUSTOMER CRM TABLE */}
        {activeTab === 'customers' && (
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4 animate-in fade-in-50">
            <div className="pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-navy">Customer Database (Mock Data)</h3>
              <p className="text-xs text-slate-500 mt-0.5">Total registered customers & lifetime order stats</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-400 uppercase font-bold text-[10px]">
                  <tr>
                    <th className="p-3">Customer ID</th>
                    <th className="p-3">Name & Email</th>
                    <th className="p-3">City</th>
                    <th className="p-3">Total Orders</th>
                    <th className="p-3">Total Spent</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {initialCustomers.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50">
                      <td className="p-3 font-mono font-bold text-slate-500">{c.id}</td>
                      <td className="p-3">
                        <p className="font-bold text-navy">{c.name}</p>
                        <p className="text-[10px] text-slate-400">{c.email}</p>
                      </td>
                      <td className="p-3 text-slate-600">{c.city}</td>
                      <td className="p-3 font-semibold text-navy">{c.ordersCount} orders</td>
                      <td className="p-3 font-bold text-primary">₹{c.totalSpent.toLocaleString('en-IN')}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded font-bold text-[10px] uppercase ${
                          c.status.includes('VIP') ? 'bg-amber-100 text-amber-900' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {c.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Add / Edit Product Modal */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl text-navy animate-in fade-in-50 zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-navy">
                {editingProductId ? 'Edit Product' : 'Add New Product to SGKart'}
              </h3>
              <button onClick={() => setIsProductModalOpen(false)} className="p-1 text-slate-400 hover:text-navy">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleProductSubmit} className="space-y-3 pt-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Product Title *</label>
                <input
                  type="text"
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  placeholder="e.g. Ultra HD Smart Speaker with Alexa"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Brand Name *</label>
                  <input
                    type="text"
                    value={productForm.brand}
                    onChange={(e) => setProductForm({ ...productForm, brand: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                    required
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Category *</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium"
                  >
                    {categories.filter(c => c.slug !== 'all').map((cat) => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Sale Price (₹) *</label>
                  <input
                    type="number"
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    placeholder="1999"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                    required
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">MRP Price (₹)</label>
                  <input
                    type="number"
                    value={productForm.originalPrice}
                    onChange={(e) => setProductForm({ ...productForm, originalPrice: e.target.value })}
                    placeholder="2999"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Stock Units</label>
                  <input
                    type="number"
                    value={productForm.stockCount}
                    onChange={(e) => setProductForm({ ...productForm, stockCount: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Image URL</label>
                <input
                  type="url"
                  value={productForm.image}
                  onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-700 pt-1">
                <input
                  type="checkbox"
                  checked={productForm.sgAssured}
                  onChange={(e) => setProductForm({ ...productForm, sgAssured: e.target.checked })}
                  className="rounded text-primary w-4 h-4"
                />
                <span>Include SG Assured badge & priority fast delivery</span>
              </label>

              <div className="flex gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="flex-1 py-2.5 border border-slate-300 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold transition shadow"
                >
                  {editingProductId ? 'Save Updates' : 'Add to Catalog'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Order Details Modal */}
      {viewingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl text-navy animate-in fade-in-50 zoom-in-95 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-navy">Order Details #{viewingOrder.id}</h3>
                <p className="text-xs text-slate-400">Tracking: {viewingOrder.trackingNumber}</p>
              </div>
              <button onClick={() => setViewingOrder(null)} className="p-1 text-slate-400 hover:text-navy">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <p className="font-bold text-navy mb-1">Customer & Delivery Info</p>
                <p><b>Recipient:</b> {viewingOrder.deliveryAddress?.fullName || viewingOrder.customerName}</p>
                <p><b>Phone:</b> {viewingOrder.customerPhone}</p>
                <p className="mt-1">
                  <b>Address:</b> {viewingOrder.deliveryAddress?.addressLine}, {viewingOrder.deliveryAddress?.city} - {viewingOrder.deliveryAddress?.pincode}
                </p>
              </div>

              <div>
                <p className="font-bold text-navy mb-2">Order Items:</p>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {viewingOrder.items?.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                      <div className="flex items-center gap-2">
                        <img src={item.image} alt="" className="w-8 h-8 rounded object-cover" />
                        <div>
                          <p className="font-semibold text-navy truncate max-w-[200px]">{item.name}</p>
                          <p className="text-[10px] text-slate-400">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-bold text-navy">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex justify-between font-bold text-sm">
                <span>Total Amount:</span>
                <span className="text-primary">₹{viewingOrder.total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setViewingOrder(null)}
                className="w-full py-2.5 bg-slate-800 text-white font-bold rounded-xl text-xs"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
