import React, { useState, useRef, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { BiHome } from 'react-icons/bi';
import { AiOutlineProduct } from 'react-icons/ai';
import { MdEvent } from 'react-icons/md';
import { IoChatboxEllipses } from 'react-icons/io5';
import { FiMenu } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';
import { CityContext } from '../context/CityContext';

const SideNav = () => {
  const { selectedCity } = useContext(CityContext);
  const [sidenavOpen, setsidenavOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (sidenavOpen && ref.current && !ref.current.contains(event.target)) {
        setsidenavOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
    };
  }, [sidenavOpen]);

  return (
    <div ref={ref}>
      <nav className="md:hidden flex left-4 top-800 z-10">
        <button
          className="text-xl p-2"
          onClick={() => setsidenavOpen((prev) => !prev)}
        >
          {sidenavOpen ? (
            <MdClose className="w-8 h-8" />
          ) : (
            <FiMenu className="w-8 h-8" />
          )}
        </button>
      </nav>
      <ul
        className={`fixed top-0 left-0 h-full transition-transform duration-300 z-10 ${sidenavOpen ? 'translate-x-0 bg-white' : '-translate-x-full'
          } md:relative md:translate-x-0 md:flex md:flex-col md:gap-2 md:p-4 md:w-1/4`}
      >
        <li className="p-4 border-b md:border-none">
          <NavLink
            to={`/city/${selectedCity}`}
            onClick={() => setsidenavOpen(false)}
            className="flex items-center gap-3 text-firstcolor text-lg font-medium p-3 transition-all duration-300 hover:text-gray-800 hover:bg-gray-50 hover:rounded-md active:text-gray-800 active:bg-gray-50 active:rounded-md"
            activeclassname="text-gray-800 bg-gray-50 rounded-md"
          >
            <BiHome className="w-6 h-6 text-gray-400 transition-all duration-300 group-hover:text-brand-600 group-active:text-brand-600" />
            <span>Home</span>
          </NavLink>
        </li>
        <li className="p-4 border-b md:border-none">
          <NavLink
            to={`/all-products/city/${selectedCity}`}
            onClick={() => setsidenavOpen(false)}
            className="flex items-center gap-3 text-firstcolor text-lg font-medium p-3 transition-all duration-300 hover:text-gray-800 hover:bg-gray-50 hover:rounded-md active:text-gray-800 active:bg-gray-50 active:rounded-md"
            activeclassname="text-gray-800 bg-gray-50 rounded-md"
          >
            <AiOutlineProduct className="w-6 h-6 text-gray-400 transition-all duration-300 group-hover:text-brand-600 group-active:text-brand-600" />
            <span>Products</span>
          </NavLink>
        </li>
        <li className="p-4 border-b md:border-none">
          <NavLink
            to={`/all-events/city/${selectedCity}`}
            onClick={() => setsidenavOpen(false)}
            className="flex items-center gap-3 text-firstcolor text-lg font-medium p-3 transition-all duration-300 hover:text-gray-800 hover:bg-gray-50 hover:rounded-md active:text-gray-800 active:bg-gray-50 active:rounded-md"
            activeclassname="text-gray-800 bg-gray-50 rounded-md"
          >
            <MdEvent className="w-6 h-6 text-gray-400 transition-all duration-300 group-hover:text-brand-600 group-active:text-brand-600" />
            <span>Events</span>
          </NavLink>
        </li>
        <li className="p-4 border-b md:border-none">
          <NavLink
            to={`/all-posts/city/${selectedCity}`}
            onClick={() => setsidenavOpen(false)}
            className="flex items-center gap-3 text-firstcolor text-lg font-medium p-3 transition-all duration-300 hover:text-gray-800 hover:bg-gray-50 hover:rounded-md active:text-gray-800 active:bg-gray-50 active:rounded-md"
            activeclassname="text-gray-800 bg-gray-50 rounded-md"
          >
            <IoChatboxEllipses className="w-6 h-6 text-gray-400 transition-all duration-300 group-hover:text-brand-600 group-active:text-brand-600" />
            <span>Posts</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SideNav;
