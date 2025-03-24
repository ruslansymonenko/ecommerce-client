import { createContext, useEffect, useState } from 'react';
import { products } from '../assets/assets.js';
import { toast } from 'react-toastify';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = '$';
  const delivery_fee = 10;
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});

  const addToCart = (itemId, size) => {
    if (!size && size === '') {
      toast.error('Please select product size');
      return;
    } else {
      setCartItems((prevCart) => {
        let cartData = structuredClone(prevCart || {});

        if (!cartData[itemId]) {
          cartData[itemId] = {};
        }
        cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;

        return cartData;
      });
    }
  };

  const getCartCount = () => {
    return Object.values(cartItems).reduce((totalCount, sizes) => {
      return totalCount + Object.values(sizes).reduce((sum, count) => sum + count, 0);
    }, 0);
  };

  const updateQuantity = (itemId, size, quantity) => {
    setCartItems((prevCart) => {
      let cartData = structuredClone(prevCart || {});

      if (!cartData[itemId] || !cartData[itemId][size]) {
        return cartData;
      }

      if (quantity > 0) {
        cartData[itemId][size] = quantity;
      } else {
        delete cartData[itemId][size];
        if (Object.keys(cartData[itemId]).length === 0) {
          delete cartData[itemId];
        }
      }

      return cartData;
    });
  };

  const getCartAmount = () => {
    let totalAmount = 0;

    for (const [productId, sizes] of Object.entries(cartItems)) {
      const product = products.find((prod) => prod._id === productId);

      if (product) {
        for (const [size, quantity] of Object.entries(sizes)) {
          totalAmount += product.price * quantity;
        }
      }
    }

    return totalAmount;
  };

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
  };

  return <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>;
};

export default ShopContextProvider;
