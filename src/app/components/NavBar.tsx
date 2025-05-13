"use client"
import { ShoppingCartIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import MiniLogin from "./MiniLogin";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/auth/AuthContext";
import LoggedUserDropDown from "./LoggedUserDropDown";
import CartDropDown from "./Cart/CartDropDown";
import logo from "../../../public/logo.png"
export default function NavBar() {
  const pathname = usePathname();
  const [userOpen, setUserOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const router = useRouter();
  const { user } = useAuth();
  const navLinks = [
    { href: "/", label: "HOME" },
    { href: "/shop", label: "SHOP" },
    { href: "/sale", label: "SALE" },
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
      <div className="flex justify-center w-full mr-auto md:w-auto md:justify-start">
        <img

          src={"/logo.png"}
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

      <div className="flex items-center gap-10 flex-shrink-0">
        {/* User */}
        <div
          className="relative inline-block "
          onMouseEnter={() => setUserOpen(true)}
          onMouseLeave={() => setUserOpen(false)}
        >
          <button className="flex items-center gap-2 hover:scale-105 transition">
            <UserCircleIcon className="h-8 w-8" />
            <span className="font-medium">{user ? user.first_name : "Entrar"}</span>
          </button>
          {userOpen && (
            <div className="absolute right-0">
              {user ? <LoggedUserDropDown /> : <MiniLogin />}
            </div>
          )}
        </div>

        {/* Cart */}
        {user && (
          <div
            className="relative inline-block"
            onMouseEnter={() => setCartOpen(true)}
            onMouseLeave={() => setCartOpen(false)}
          >
            <button
              className="flex items-center hover:scale-105 transition"
              onClick={() => router.push("/checkout")}
            >
              <ShoppingCartIcon className="h-8 w-8" />
              {user.cart.items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {user.cart.items.length}
                </span>
              )}
            </button>
            {cartOpen && (
              <div className="absolute right-0 ">
                <CartDropDown />
              </div>
            )}
          </div>
        )}

      </div>
    </nav>
  );
}
