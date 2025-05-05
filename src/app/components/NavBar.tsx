"use client"
import { ShoppingCartIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import MiniLogin from "./MiniLogin";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/auth/AuthContext";
import LoggedUserDropDown from "./LoggedUserDropDown";
import CartDropDown from "./Cart/CartDropDown";

export default function NavBar() {
  const pathname = usePathname();
  const [userOpen, setUserOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  
  const { user } = useAuth();
  const navLinks = [
    { href: "/", label: "HOME" },
    { href: "/shop", label: "SHOP" },
    { href: "/about", label: "ABOUT" },
  ];

  useEffect(() => {
    if (pathname === "/register" || pathname === "/login") {
      setUserOpen(false);
      setCartOpen(false);
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

      <div className="absolute left-1/2 transform -translate-x-1/2 flex space-x-10 text-sm md:text-lg font-semibold">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-all duration-200 ease-in-out hover:text-gray-300 hover:scale-105 ${isActive ? "text-gray-300 scale-105" : ""
                }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>

        {/* User e Cart */}
        <div className="ml-auto flex items-center relative gap-5 mr-40 font-semibold">
        {/* User */}
        <div
          onMouseEnter={() => setUserOpen(true)}
          onMouseLeave={() => setUserOpen(false)}
          className="relative"
        >
          <div className="flex cursor-pointer items-center gap-2 hover:scale-102 transition">
            <UserCircleIcon className="h-8 w-8" />
            <span>{user ? user.first_name : "Entrar"}</span>
          </div>

          {userOpen && (
            <div className="absolute right-44" onMouseEnter={() => setUserOpen(true)} onMouseLeave={() => setUserOpen(false)}>
              {user ? <LoggedUserDropDown /> : <MiniLogin />}
            </div>
          )}
        </div>

        {user && (
          <div
            onMouseEnter={() => setCartOpen(true)}
            onMouseLeave={() => setCartOpen(false)}
            className="relative"
          >
            <div className="flex cursor-pointer items-center hover:scale-102 transition">
            <ShoppingCartIcon className="h-8 w-8 ml-10 md:h-10 md:w-10" />
              {user.cart.items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {user.cart.items.length}
                </span>
              )}
            </div>

            {cartOpen && (
              <div className="right-56 absolute" onMouseEnter={() => setCartOpen(true)} onMouseLeave={() => setCartOpen(false)}>
                <CartDropDown />
              </div>
            )}
          </div>
        )}

      </div>
    </nav>
  );
}
