"use client";

import {  FaInstagram, FaLinkedin } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
export default function Footer() {
  return (



    <footer className="bg-black text-white px-8 md:px-16 py-12">
      <div className="grid grid-cols-1 md:grid-cols-[400px_1fr] gap-20">

        {/* Left: Contact Form */}
        {/* <div className="bg-[#0f0f11] p-8 rounded-lg max-w-md min-h-[600px] flex flex-col justify-between">
          <div className="flex flex-col gap-3 border  h-full">
            <h4 className="text-sm text-gray-400 mb-2 font-semibold ">CONTACT US</h4>
            <h2 className="text-2xl font-light leading-snug mb-6">
              Seeking personalized support? <br />
              <span className="font-semibold flex-wrap"> Request a call from our team</span> <br />
              
            </h2>
            <form className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="YOUR NAME"
                className="bg-transparent border font-sans border-gray-700 rounded px-3 py-2 text-sm focus:outline-none"
              />
              <input
                type="text"
                placeholder="PHONE NUMBER"
                className="bg-transparent border font-sans border-gray-700 rounded px-3 py-2 text-sm focus:outline-none"
              />
              <button
                type="submit"
                className="bg-[#192ff8] font-sans w-1/2 hover:bg-blue-700 text-white py-2 rounded text-sm font-medium "
              >
                Send a request
              </button>
            </form>
          </div>

            <p className="text-xs text-gray-500 mt-6">Privacy</p>
          </div> */}

          <div className="bg-[#0f0f11] p-8 rounded-lg max-w-md min-h-[600px] flex flex-col justify-between">
  <div className="flex flex-col gap-3  h-full flex-grow">
    <h4 className="text-sm text-gray-400 mb-2 font-semibold">CONTACT US</h4>
    <h2 className="text-2xl font-light leading-snug mb-6">
      Seeking personalized support? <br />
      <span className="font-semibold flex-wrap">Request a call from our team</span>
    </h2>
    
    <form className="flex flex-col gap-4 flex-grow">
      <input
        type="text"
        placeholder="YOUR NAME"
        className="bg-transparent border font-sans border-gray-700 rounded px-3 py-2 text-sm focus:outline-none"
      />
      <input
        type="text"
        placeholder="PHONE NUMBER"
        className="bg-transparent border font-sans border-gray-700 rounded px-3 py-2 text-sm focus:outline-none"
      />
      
      <div className="mt-auto">
        <button
          type="submit"
          className="bg-[#192ff8] font-sans w-full hover:bg-blue-700 text-white py-2 rounded text-sm font-medium"
        >
          Send a request
        </button>
      </div>
    </form>
  </div>

  <p className="text-xs text-gray-500 mt-6">Privacy</p>
</div>



        {/* Right: Info and Links */}
        <div className="flex flex-col justify-between h-full ">
          {/* Layer 1: Info Columns + Logo */}
          <div className=" flex md:flex-row flex-col-reverse  justify-between mb-8 flex-wrap gap-6">
            

            <Link href="/about" className=" w-fit">
              <h4 className="text-sm text-blue-500 mb-3 font-semibold">ABOUT US</h4>
              <ul className="space-y-1 text-sm font-sans">
                <li>Who are we</li>
                <li>Acheivements</li>
                <li>Contacts</li>
              </ul>
            </Link>

            <div className="w-fit">
              <Image
                src="/Logo-srtvi.png"
                alt="Logo"
                width={180}
                height={60}
                className="object-contain"
              />
            </div>
          </div>

          {/* Layer 2: Contact Info */}
          <div className="mb-8">
            <h4 className="text-sm text-blue-500 mb-3 font-semibold  ">CONTACT US</h4>
            <p className="text-sm font-sans leading-relaxed">
              +97145525643 <br />
              admin@sartawiproperties.com <br />
              Sartawi properties, Parklane Tower, 901
            </p>
          </div>

          {/* Layer 3: Subscription */}
          <div className="mb-8 max-w-full">
           <h4 className="text-sm text-blue-500 mb-3 font-semibold">Subscription</h4>
            <div className="bg-transparent border border-gray-700 w-full rounded-xl px-4 py-2 text-blue-500 text-lg text-end flex">
              <input
                type="email"
                placeholder="E-mail"
                className="bg-transparent  px-3 text-white w-full text-sm focus:outline-none"
              />
              <button className="bg-transparent  w-full  px-4  text-blue-500 text-lg text-end">
                →
              </button>
            </div>
          </div>

          {/* Layer 4: Socials + Copyright */}
          <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Social Icons */}
            <div className="flex space-x-4 text-gray-400 text-lg">
              {/* <div className="border rounded-4xl p-2"><FaFacebookF/></div> */}
              <Link href="https://www.instagram.com/sartawiproperties?igsh=MXBlOGNoNDdxYm1wMQ== " className="border rounded-4xl p-2"><FaInstagram/></Link>
              <Link href="https://www.linkedin.com/company/sartawi-properties/ "  className="border rounded-4xl p-2"><FaLinkedin /></Link>
              {/* <div className="border rounded-4xl p-2"><FaTwitter /></div>   */}
            </div>
            {/* Copyright */}
            <div className="text-xs text-gray-500">© 2023 — Copyright</div>
          </div>
        </div>


      </div>
    </footer>

  );
}
