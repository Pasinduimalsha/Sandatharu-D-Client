import React, { useState } from 'react';
import { Link } from 'react-scroll';
// import { Link as RouterLink } from 'react-router-dom'; // For navigation
import logo from '../../assets/img/logo.png';

const Navbar = () => {
  const [nav, setNav] = useState(false);  

  // Handle background change on scroll
  const changeBackground = () => {
    if (window.scrollY >= 50) {
      setNav(true);
    } else {
      setNav(false);
    }
  };

  window.addEventListener('scroll', changeBackground);

  // Toggle mobile menu
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        nav ? 'bg-gray-900 shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-0 mr-0 w-full flex justify-between items-center py-4 px-6 bg-yellowGreenMix ">
        {/* Logo */}
        <Link
          to="main"
          className="cursor-pointer flex items-center"
          smooth={true}
          duration={2000}
        >
          <img src={logo} alt="logo" className="h-10" />
        </Link>

        {/* Hamburger Menu (Mobile View) */}
        <button
          className="block lg:hidden text-white focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>

        {/* Menu */}
        <ul
          className={`fixed lg:static top-16 left-0 w-full lg:w-auto bg-gray-900 lg:bg-transparent text-white lg:text-gray-900 lg:flex lg:items-center lg:space-x-8 transition-all duration-300 ${
            menuOpen ? 'block' : 'hidden'
          }`}
        >
          <li className="text-center py-2 lg:py-0">
            <Link
              to="main"
              className="hover:text-gray-400 cursor-pointer"
              smooth={true}
              duration={2000}
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <li className="text-center py-2 lg:py-0">
            <Link
              to="about"
              className="hover:text-gray-400 cursor-pointer"
              smooth={true}
              duration={2000}
              onClick={() => setMenuOpen(false)}
            >
              About Us
            </Link>
          </li>
          <li className="text-center py-2 lg:py-0">
            <Link
              to="packages"
              className="hover:text-gray-400 cursor-pointer"
              smooth={true}
              duration={2000}
              onClick={() => setMenuOpen(false)}
            >
              Packages
            </Link>
          </li>
          <li className="text-center py-2 lg:py-0">
            <Link
              to="timeline"
              className="hover:text-gray-400 cursor-pointer"
              smooth={true}
              duration={2000}
              onClick={() => setMenuOpen(false)}
            >
              Timeline
            </Link>
          </li>
          <li className="text-center py-2 lg:py-0">
            <Link
              to="contact"
              className="hover:text-gray-400 cursor-pointer"
              smooth={true}
              duration={2000}
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </Link>
          </li>
          {/* <li className="text-center py-2 lg:py-0">
            <RouterLink
              to="/expenses"
              className="hover:text-gray-400 cursor-pointer"
              onClick={() => setMenuOpen(false)}
            >
              Expenses
            </RouterLink>
          </li> */}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
