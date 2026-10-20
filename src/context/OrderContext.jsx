import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { initialOrders } from '../data/mockAdminData';
import { useToast } from './ToastContext';
import { useCart } from './CartContext';

const OrderContext = createContext(null);

export const OrderProvider = ({ children }) => {
  const { addToast } = useToast();
  const { clearCart } = useCart();
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('sgkart_orders');
      return saved ? JSON.parse(saved) : initialOrders;
    } catch {
      return initialOrders;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('sgkart_orders', JSON.stringify(orders));
    } catch (e) {
      console.error('Error saving orders:', e);
    }
  }, [orders]);

  const placeOrder = (orderData) => {
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const newOrder = {
      id: `SG-ORD-${randomSuffix}`,
      trackingNumber: `SGK-EXP-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toISOString(),
      status: 'Confirmed', // Confirmed -> Processing -> Shipped -> Out for Delivery -> Delivered
      paymentStatus: orderData.paymentMethod === 'Cash on Delivery' ? 'Pending (COD)' : 'Paid Online',
      ...orderData
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();

    // Trigger celebratory confetti for order completion!
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      // ignore
    }

    addToast(`Order #${newOrder.id} placed successfully!`, 'success', 5000);
    return newOrder;
  };

  const getOrderById = (orderId) => {
    return orders.find((o) => o.id === orderId);
  };

  const cancelOrder = (orderId) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: 'Cancelled' } : o))
    );
    addToast(`Order #${orderId} has been cancelled.`, 'info');
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    addToast(`Order #${orderId} status changed to ${newStatus}.`, 'success');
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        placeOrder,
        getOrderById,
        cancelOrder,
        updateOrderStatus
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};
