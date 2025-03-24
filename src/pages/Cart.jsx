import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext.jsx';
import Title from '../components/Title.jsx';
import { assets } from '../assets/assets.js';
import CartTotal from '../components/CartTotal.jsx';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const productsInCart = [];

    for (const [productId, sizes] of Object.entries(cartItems)) {
      for (const [size, quantity] of Object.entries(sizes)) {
        if (quantity > 0) {
          productsInCart.push({
            _id: productId,
            size: size,
            quantity: quantity,
          });
        }
      }
    }

    setCartData(productsInCart);
  }, [cartItems, products]);

  return (
    <div className="border-t border-gray-200 pt-14">
      <div className="mb-3">
        <Title titleStart="YOUR" titleEnd="CART" />

        <div>
          {cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item._id);

            return (
              <div
                className="py-4 border-t border-gray-200 border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
                key={index}
              >
                <div className="flex items-start gap-6">
                  <img className="w-16 sm:w-20" src={productData.image[0]} alt="product image" />
                  <div>
                    <p className="text-xs sm:text-lg font-medium">{productData.name}</p>
                    <div className="flex items-center gap-5 mt-2">
                      <p>
                        {currency}
                        {productData.price}
                      </p>
                      <p className="px-2 sm:px-3 sm:py-1 bg-slate-50 text-sm">{item.size}</p>
                    </div>
                  </div>
                </div>
                <input
                  className="border border-gray-200 max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                  type="number"
                  min={1}
                  defaultValue={item.quantity}
                  onChange={(e) =>
                    e.target.value === '' || e.target.value === '0'
                      ? null
                      : updateQuantity(item._id, item.size, Number(e.target.value))
                  }
                />
                <img
                  className="w-4 sm:w-5 cursor-pointer"
                  src={assets.bin_icon}
                  alt="delete"
                  onClick={() => updateQuantity(item._id, item.size, 0)}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
        </div>
      </div>
    </div>
  );
};

export default Cart;
