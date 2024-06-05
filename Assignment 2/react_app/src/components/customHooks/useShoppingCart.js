
//Custom hook for cart operations
import { useState } from 'react';

function useShoppingCart() {
  const [cartItems, setCartItems] = useState([]);

  // Load cart items from localStorage on initial render
  useState(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  // Add item to cart and update localStorage
  const addToCart = (item) => {
    const updatedCart = [...cartItems, item];
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    alert("Item Added");
  };

  // Remove item from cart by index and update localStorage
  const removeFromCart = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  // Clear all items from cart and update localStorage
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems');
  };

  return {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
  };
}

export default useShoppingCart;
