

// 'use client';

// import Link from "next/link";
// import Image from "next/image";
// import { useState } from "react";
// import { FiMenu, FiX } from "react-icons/fi"; // optional icons

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <nav className="bg-transparent shadow-sm px-4 py-4 flex items-center justify-between relative z-50">
//       {/* Logo */}
//       <Link href="/" className="flex items-center">
//         <Image
//           src="/Logo-srtvii.png"
//           alt="Sartawi Properties Logo"
//           className="w-36 sm:w-48 md:w-56 lg:w-60 xl:w-64 h-auto"
//           width={230}
//           height={85}
//           priority
//         />
//       </Link>


//       {/* Hamburger Icon */}
//       <div className="md:hidden">
//         <button
//           onClick={() => setMenuOpen(!menuOpen)}
//           className="text-white focus:outline-none"
//         >
//           {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
//         </button>
//       </div>

//       {/* Desktop Menu */}
//       <div className="hidden md:flex space-x-6">
//         <Link href="/about#contact-section" className="text-white hover:text-black">
//           Contact Us
//         </Link>
//         <Link href="/about" className="text-white hover:text-black">
//           About Us
//         </Link>
//       </div>

//       {/* Mobile Menu */}
//       {menuOpen && (
//         <div className="absolute top-full left-0 w-full bg-black text-white flex flex-col space-y-4 p-4 md:hidden">
//           <Link
//             href="/about#contact-section"
//             className="hover:text-gray-400"
//             onClick={() => setMenuOpen(false)}
//           >
//             Contact Us
//           </Link>
//           <Link
//             href="/about"
//             className="hover:text-gray-400"
//             onClick={() => setMenuOpen(false)}
//           >
//             About Us
//           </Link>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;


'use client';

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleCloseMenu = () => setMenuOpen(false);

  return (
    <nav className="bg-transparent shadow-sm px-4 py-4 flex items-center justify-between relative z-50">
      {/* Logo */}
      <Link href="/" className="flex items-center">
        <Image
          src="/Logo-srtvii.png"
          alt="Sartawi Properties Logo"
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
      <div className="hidden md:flex space-x-6 items-center  mr-15">
        <Link href="/developers" className="text-white hover:text-[#e0b973]">
          Developers
        </Link>
        <Link href="/new-project" className="text-white hover:text-[#e0b973]">
          New Projects
        </Link>
        <Link href="/about" className="text-white hover:text-[#e0b973]">
          About Us
        </Link>
        <Link href="/about#contact-section" className="text-white hover:text-[#e0b973]">
          Contact Us
        </Link>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-black text-white flex flex-col space-y-4 p-4 md:hidden">
          <Link href="/developers" onClick={handleCloseMenu} className="hover:text-[#e0b973]">
            Developers
          </Link>
          <Link href="/new-project" onClick={handleCloseMenu} className="hover:text-[#e0b973]">
            New Projects
          </Link>
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
