import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets.js';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext.jsx';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount } = useContext(ShopContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearchClick = () => {
    if (!location.pathname.includes('collections')) {
      navigate('/collections');
    }
    setShowSearch(true);
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to={'/'}>
        <img className="w-36" src={assets.logo} alt="logo" />
      </Link>

      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink className="flex flex-col items-center gap-1" to={'/'}>
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink className="flex flex-col items-center gap-1" to={'/collections'}>
          <p>COLLECTIONS</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink className="flex flex-col items-center gap-1" to={'/about'}>
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink className="flex flex-col items-center gap-1" to={'/contact'}>
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-6">
        <img
          className="w-5 cursor-pointer"
          src={assets.search_icon}
          alt="search"
          onClick={handleSearchClick}
        />

        <div className="group relative">
          <img className="w-5 cursor-pointer" src={assets.profile_icon} alt="profile" />

          <nav className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
            <div className="flex flex-col gap-2 w-36 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
              <p className="cursor-pointer hover:text-black">My Profile</p>
              <p className="cursor-pointer hover:text-black">Orders</p>
              <p className="cursor-pointer hover:text-black">Logout</p>
            </div>
          </nav>
        </div>
        <Link to="/cart" className="relative">
          <img className="w-5 min-w-5" src={assets.cart_icon} alt="cart" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[10px]">
            {getCartCount()}
          </p>
        </Link>
        <img
          className="w-5 cursor-pointer sm:hidden"
          src={assets.menu_icon}
          alt="menu"
          onClick={() => setVisible(true)}
        />
      </div>

      <nav
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            className="flex items-center gap-4 p-3 cursor-pointer"
            onClick={() => setVisible(false)}
          >
            <img className="h-4 rotate-180" src={assets.dropdown_icon} alt="close" />
            <p>Back</p>
          </div>
          <NavLink
            className="py-2 pl-6 border-b border-gray-200"
            to={'/'}
            onClick={() => setVisible(false)}
          >
            HOME
          </NavLink>
          <NavLink
            className="py-2 pl-6 border-b border-gray-200"
            to={'/collections'}
            onClick={() => setVisible(false)}
          >
            COLLECTIONS
          </NavLink>
          <NavLink
            className="py-2 pl-6 border-b border-gray-200"
            to={'/about'}
            onClick={() => setVisible(false)}
          >
            ABOUT
          </NavLink>
          <NavLink
            className="py-2 pl-6 border-b border-gray-200"
            to={'/contact'}
            onClick={() => setVisible(false)}
          >
            CONTACT
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
