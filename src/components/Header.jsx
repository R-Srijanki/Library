import { useState } from 'react'
import { Link } from 'react-router-dom';
export default function Header(){
    const [click,setclick]=useState(false);
    return( 
       <div className="flex items-center justify-between border-b border-gray-300 px-6 py-3 bg-gradient-to-r from-indigo-100 via-white to-pink-100 shadow-sm flex-wrap sticky top-0 z-11">
  {/* 📚 Logo / Title */}
  <h1 className="flex-1 text-center sm:text-left text-2xl font-semibold text-indigo-700 m-0 tracking-wide font-serif">
    The Secret Library
  </h1>

  {/* 🧭 Navigation Menu */}
  <div className="flex items-center justify-end flex-1 sm:flex-none">
    <nav className="hidden md:flex gap-6">
      <Link
        to="/"
        className="no-underline text-gray-700 font-medium px-3 py-1.5 rounded-md transition-all duration-200 hover:bg-indigo-100 hover:text-indigo-700"
      >
        Home
      </Link>
      <Link
        to="/books"
        className="no-underline text-gray-700 font-medium px-3 py-1.5 rounded-md transition-all duration-200 hover:bg-indigo-100 hover:text-indigo-700"
      >
        Browse Books
      </Link>
      <Link
        to="/addbook"
        className="no-underline text-gray-700 font-medium px-3 py-1.5 rounded-md transition-all duration-200 hover:bg-indigo-100 hover:text-indigo-700"
      >
        Add Book
      </Link>
    </nav>

    {/* 📱 Hamburger Menu */}
    <button
      onClick={() => setclick(!click)}
      className="md:hidden bg-transparent border-none cursor-pointer text-2xl text-gray-700 hover:text-indigo-700 transition-colors relative"
    >
      <i className="fa-solid fa-bars"></i>
    </button>

    {/* 📋 Dropdown for Mobile */}
    <div
      className={`md:hidden absolute top-full right-4 mt-3 bg-white border border-gray-200 rounded-lg shadow-lg z-50 transition-all duration-300 ease-in-out ${
        click ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
      }`}
    >
      <nav className="flex flex-col p-2.5 w-40">
        <Link
          to="/"
          className="no-underline text-gray-700 py-2 px-3 rounded-md hover:bg-indigo-50 hover:text-indigo-700"
          onClick={() => setclick(false)}
        >
          Home
        </Link>
        <Link
          to="/books"
          className="no-underline text-gray-700 py-2 px-3 rounded-md hover:bg-indigo-50 hover:text-indigo-700"
          onClick={() => setclick(false)}
        >
          Browse Books
        </Link>
        <Link
          to="/addbook"
          className="no-underline text-gray-700 py-2 px-3 rounded-md hover:bg-indigo-50 hover:text-indigo-700"
          onClick={() => setclick(false)}
        >
          Add Book
        </Link>
      </nav>
    </div>
  </div>
</div>
    )
}

