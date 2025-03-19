import React from 'react';
import { assets } from '../assets/assets.js';

const Footer = () => {
  return (
    <footer>
      <div className="flex flex-col sm:grid sm:grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img className="mb-5 w-32" src={assets.logo} alt="" />
          <p className="w-full md:w-2/3 text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto beatae enim ex
            harum itaque magnam mollitia optio possimus quae qui, soluta vel voluptatem voluptatum.
            Dolorem fugiat illum ipsum nobis officia!
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+38 (012) 345 6789</li>
            <li>email@email.com</li>
          </ul>
        </div>
      </div>

      <div>
        <hr className="border-t-1 border-gray-300" />
        <p className="py-5 text-sm text-center">Copyright 2025@ website.com - All right reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
