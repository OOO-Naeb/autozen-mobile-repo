import React, {createContext, useContext, useState} from 'react';

const CartContext = createContext();

export const CartProvider = ({children}) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = item => {
    setCartItems(prev => [...prev, item]);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price || 0), 0);
  };

  return (
    <CartContext.Provider value={{cartItems, addToCart, clearCart, getTotal}}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
