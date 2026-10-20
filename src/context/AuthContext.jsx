import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const AuthContext = createContext(null);

const DEFAULT_ADDRESSES = [
  {
    id: 'addr-1',
    isDefault: true,
    fullName: 'Sujit Kumar',
    phone: '+91 98765 12340',
    type: 'Home',
    addressLine: 'Flat 402, Sunshine Residency, Powai',
    landmark: 'Near Hiranandani Hospital',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400076'
  },
  {
    id: 'addr-2',
    isDefault: false,
    fullName: 'Sujit Kumar',
    phone: '+91 98765 12340',
    type: 'Work',
    addressLine: 'Tech Park Tower 3, Floor 6, Mindspace, Airoli',
    landmark: 'Opposite Railway Station',
    city: 'Navi Mumbai',
    state: 'Maharashtra',
    pincode: '400708'
  }
];

const DEFAULT_USER = {
  id: 'usr-demo-1',
  name: 'Sujit Kumar',
  email: 'sujit.kumar@sgkart.demo',
  phone: '+91 98765 12340',
  role: 'customer', // 'customer' | 'admin'
  superCoins: 480,
  addresses: DEFAULT_ADDRESSES,
  joinDate: 'March 2024'
};

export const AuthProvider = ({ children }) => {
  const { addToast } = useToast();
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('sgkart_auth_user');
      return saved ? JSON.parse(saved) : DEFAULT_USER;
    } catch {
      return DEFAULT_USER;
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      const saved = localStorage.getItem('sgkart_auth_user');
      return saved !== null;
    } catch {
      return true;
    }
  });

  useEffect(() => {
    try {
      if (isAuthenticated && user) {
        localStorage.setItem('sgkart_auth_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('sgkart_auth_user');
      }
    } catch (e) {
      console.error('Error saving user auth:', e);
    }
  }, [user, isAuthenticated]);

  const login = (email, password, role = 'customer') => {
    const isAdmin = email.toLowerCase().includes('admin') || role === 'admin';
    const loggedUser = {
      ...DEFAULT_USER,
      email: email || 'demo.user@sgkart.in',
      name: isAdmin ? 'Admin Manager' : (user?.name || 'Sujit Kumar'),
      role: isAdmin ? 'admin' : 'customer'
    };
    setUser(loggedUser);
    setIsAuthenticated(true);
    addToast(`Welcome back, ${loggedUser.name}! Logged in as ${loggedUser.role}.`, 'success');
    return loggedUser;
  };

  const register = (userData) => {
    const newUser = {
      id: 'usr-' + Date.now(),
      name: userData.name || 'Shopper',
      email: userData.email,
      phone: userData.phone || '+91 98000 00000',
      role: 'customer',
      superCoins: 100, // welcome bonus
      addresses: [],
      joinDate: new Date().toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })
    };
    setUser(newUser);
    setIsAuthenticated(true);
    addToast('Account created successfully! ₹100 Welcome SG Coins added.', 'success');
    return newUser;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    addToast('You have been logged out safely.', 'info');
  };

  const loginAsDemoCustomer = () => {
    setUser({ ...DEFAULT_USER, role: 'customer' });
    setIsAuthenticated(true);
    addToast('Logged in as Demo Customer (Sujit Kumar)', 'success');
  };

  const loginAsDemoAdmin = () => {
    setUser({
      ...DEFAULT_USER,
      name: 'SGKart Store Administrator',
      email: 'admin@sgkart.internal',
      role: 'admin'
    });
    setIsAuthenticated(true);
    addToast('Logged in with Admin privileges', 'info');
  };

  const updateProfile = (updatedFields) => {
    setUser((prev) => {
      const updated = { ...prev, ...updatedFields };
      return updated;
    });
    addToast('Profile updated successfully!', 'success');
  };

  const addAddress = (newAddress) => {
    const addrWithId = {
      ...newAddress,
      id: 'addr-' + Date.now(),
      isDefault: user?.addresses?.length === 0 || newAddress.isDefault
    };

    setUser((prev) => {
      let updatedAddrs = [...(prev?.addresses || [])];
      if (addrWithId.isDefault) {
        updatedAddrs = updatedAddrs.map((a) => ({ ...a, isDefault: false }));
      }
      return {
        ...prev,
        addresses: [...updatedAddrs, addrWithId]
      };
    });
    addToast('New delivery address saved!', 'success');
  };

  const deleteAddress = (addressId) => {
    setUser((prev) => ({
      ...prev,
      addresses: (prev?.addresses || []).filter((a) => a.id !== addressId)
    }));
    addToast('Address removed.', 'info');
  };

  const setDefaultAddress = (addressId) => {
    setUser((prev) => ({
      ...prev,
      addresses: (prev?.addresses || []).map((a) => ({
        ...a,
        isDefault: a.id === addressId
      }))
    }));
    addToast('Default address updated.', 'success');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAdmin: user?.role === 'admin',
        login,
        register,
        logout,
        loginAsDemoCustomer,
        loginAsDemoAdmin,
        updateProfile,
        addAddress,
        deleteAddress,
        setDefaultAddress
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
