"use client"
import { ShoppingCartIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import MiniLogin from "./MiniLogin";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import LoggedUserDropDown from "./LoggedUserDropDown";

export default function NavBar() {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const {user} = useAuth();
  const navLinks = [
    { href: "/", label: "HOME" },
    { href: "/shop", label: "SHOP" },
    { href: "/about", label: "ABOUT" },
  ];
 
  useEffect(() => {
    if (pathname === "/register" || pathname === "/login") {
      setDropdownOpen(false);
    }
  }, [pathname]);

  return (
    <nav className="bg-white medium-text w-full text-black p-4 flex items-center h-28 relative">
      {/* Logo à esquerda */}
      <div className="flex justify-center w-full md:w-auto md:justify-start">
        <img
          
          src="https://cdn.discordapp.com/attachments/1336112434666012716/1353925131587813437/pbmz_aim.png?ex=67e36c8a&is=67e21b0a&hm=9538c880ab9fd28ebd0e7df5b961d0cc05980386f3c718f88fab74e03dda3306&"
          alt="Logo"
          className="w-40"
        />
         
      </div>

      <div className="hidden md:flex flex-1 justify-center space-x-10 text-sm md:text-lg font-semibold">
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
          <span>{user?  user.first_name : "Entrar"}</span>
        </div>

                {dropdownOpen && (
          user ? (
            <LoggedUserDropDown />
          ) : (
            <MiniLogin />
          )
        )}


        <ShoppingCartIcon className="h-8 w-8 ml-10 md:h-10 md:w-10" />
      </div>
    </nav>
  );
}
