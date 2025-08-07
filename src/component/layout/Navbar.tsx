

//versio3
'use client';

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  // const [mobileExternalServicesOpen, setMobileExternalServicesOpen] = useState(false);

  const handleCloseMenu = () => {
    setMenuOpen(false);
    setMobileServicesOpen(false);
    // setMobileExternalServicesOpen(false);
  };

  const services = [
    { name: "Homes for Sale", href: "/services/homes-for-sale" },
    { name: "Homes for Rent", href: "/services/homes-for-rent" },
    { name: "Commercial for Sale", href: "/services/commercial-for-sale" },
    { name: "Commercial for Rent", href: "/services/commercial-for-rent" },
    { name: "Partner Services", href: "/services/partner-services" },
  ];

  return (
    <nav className="bg-transparent shadow-sm px-4 py-4 flex items-center justify-between relative z-50">
      {/* Logo */}
      <Link href="/" className="flex items-center">
        <Image
          src="/Logo-srtvii.png"
          alt="Sartawi Properties"
          className="w-36 sm:w-48 md:w-56 lg:w-60 xl:w-64 h-auto"
          width={230}
          height={85}
          priority
        />
      </Link>

      {/* Hamburger Icon */}
      <div className="md:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white focus:outline-none"
        >
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-8 items-center mr-10">
        <Link href="/developers" className="text-white hover:text-[#e0b973] transition-colors">
          Developers
        </Link>
        <Link href="/featured-properties" className="text-white hover:text-[#e0b973] transition-colors">
          Featured Properties
        </Link>

        {/* Our Services Dropdown */}
        <div className="relative group">
          <button className="text-white hover:text-[#e0b973] flex items-center gap-1 transition-colors">
            Our Services <IoIosArrowDown size={16} />
          </button>

          {/* Dropdown Content */}
          <div className="absolute top-full left-0 mt-3 w-64 bg-black border border-gray-700 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            {services.map((item) => (
              <Link
                key={`${item.name}-${item.href}`}
                href={item.href}
                className="block px-4 py-3 text-sm text-white hover:bg-[#1a1a1a] hover:text-[#e0b973] transition-all"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        <Link href="/about" className="text-white hover:text-[#e0b973] transition-colors">
          About Us
        </Link>
        <Link href="/about#contact-section" className="text-white hover:text-[#e0b973] transition-colors">
          Contact Us
        </Link>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-black text-white flex flex-col space-y-4 p-4 md:hidden">
          <Link href="/developers" onClick={handleCloseMenu} className="hover:text-[#e0b973]">
            Developers
          </Link>
          <Link href="/featured-properties" onClick={handleCloseMenu} className="hover:text-[#e0b973]">
            Featured Properties
          </Link>

          {/* Our Services Mobile - Expandable */}
          <div>
            <button
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              className="flex items-center justify-between w-full text-left text-white hover:text-[#e0b973] transition-colors"
            >
              <span className="font-medium">Our Services</span>
              {mobileServicesOpen ? <IoIosArrowUp size={16} /> : <IoIosArrowDown size={16} />}
            </button>

            {mobileServicesOpen && (
              <div className="pl-4 mt-2 flex flex-col space-y-2">
                {services.map((item) => (
                  <Link
                    key={`${item.name}-${item.href}`}
                    href={item.href}
                    onClick={handleCloseMenu}
                    className="text-sm hover:text-[#e0b973] transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/about" onClick={handleCloseMenu} className="hover:text-[#e0b973]">
            About Us
          </Link>
          <Link href="/about#contact-section" onClick={handleCloseMenu} className="hover:text-[#e0b973]">
            Contact Us
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

