import React from 'react';
import { Link } from 'react-router-dom';
import { MdDiscount } from "react-icons/md";
import { FaEarthEurope } from "react-icons/fa6";

function Header() {
  return (
    <header className="bg-purple-50 p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between rounded-t-lg gap-4">
      <Link to="/" className="flex items-center gap-2">
        <img
          src="/headerPlane.png"
          alt="Plane Scape Logo"
          className="w-8 h-8"
        />
        <h1 className="text-xl font-title text-[#504F50]">PLANE SCAPE</h1>
      </Link>
      <nav className="flex flex-wrap items-center justify-center sm:justify-end gap-4 text-neutral-900 w-full sm:w-auto">
        <Link to="/" className="flex items-center gap-1">
          <MdDiscount className="text-lg text-[#491a95]" />
          <span>Deals</span>
        </Link>
        <Link to="/" className="flex items-center gap-1">
          <FaEarthEurope className="text-lg text-[#491a95]" />
          <span>Discover</span>
        </Link>
        <Link to="/my-flights" className="flex items-center gap-2">
          <img
            src="https://ui-avatars.com/api/?name=Armağan+Arslan&background=491a95&color=fff&bold=true"
            alt="Armağan Arslan"
            className="w-10 h-10 rounded-full object-cover"
          />
          <span>Armağan Arslan</span>
        </Link>
      </nav>
    </header>
  );
}

export default Header;

