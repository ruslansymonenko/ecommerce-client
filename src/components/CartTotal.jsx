import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext.jsx';
import Title from './Title.jsx';

const CartTotal = () => {
  const { getCartAmount, currency, delivery_fee } = useContext(ShopContext);

  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title titleStart="CART" titleEnd="TOTAL" />

        <div className="flex flex-col gap-2 mt-2 text-sm">
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p>
              {currency} {getCartAmount()}.00
            </p>
          </div>
          <hr />
          <div className="flex justify-between">
            <p>Shipping fee</p>
            <p>
              {currency} {delivery_fee}.00
            </p>
          </div>
          <hr />
          <div className="flex justify-between">
            <b>Total</b>
            <b>
              {currency} {getCartAmount() + delivery_fee}.00
            </b>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
