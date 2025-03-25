"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserCircleIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function NavBar() {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginFailed, setLoginFailed] = useState(false);
  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const navLinks = [
    { href: "/", label: "HOME" },
    { href: "/shop", label: "SHOP" },
    { href: "/about", label: "ABOUT" },
  ];

  return (
    <nav className="bg-white medium-text w-full text-black p-4 flex items-center h-28 relative">
      <div className="flex justify-center w-full md:w-auto md:justify-start">
        <img
          src="https://cdn.discordapp.com/attachments/1336112434666012716/1353925131587813437/pbmz_aim.png?ex=67e36c8a&is=67e21b0a&hm=9538c880ab9fd28ebd0e7df5b961d0cc05980386f3c718f88fab74e03dda3306&"
          alt="Logo"
          className="w-40"
        />
      </div>

      <div className="hidden md:flex flex-1 justify-center text-sm space-x-5 md:text-lg md:space-x-20 font-semibold">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-all duration-200 ease-in-out hover:text-gray-300 hover:scale-105 ${
                isActive ? "text-gray-300 scale-105" : ""
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>

      <div className="ml-auto mr-5 flex items-center relative">
        <div
          className="cursor-pointer flex items-center space-x-2 text-sm md:text-lg transition-all duration-200 ease-in-out hover:text-gray-300 hover:scale-102 font-semibold"
          onClick={toggleDropdown}
        >
          <UserCircleIcon className="h-8 w-8 md:h-10 md:w-10" />
          <span>Entrar</span>
        </div>

        {
          dropdownOpen && (
          <div className="absolute top-full right-0 mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-10 p-4">
            <form
              className="grid gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                
              }}
            >
              <input
                type="text"
                placeholder="Email"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-black"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-black"
              />
              <button
                type="submit"
                className="w-full bg-gray-800 text-white px-3 py-2 rounded-md"
              >
                Login
              </button>
            </form>
          </div>
        )}

        <ShoppingCartIcon className="h-8 w-8 ml-10 md:h-10 md:w-10" />
      </div>
    </nav>
  );
}
