"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserIcon, ArrowRightOnRectangleIcon, ChartBarIcon } from "@heroicons/react/24/outline";
import { useAuth } from "@/context/auth/AuthContext";

export default function LoggedUserDropDown() {
  const { user,isAdmin, logout } = useAuth();
  const router = useRouter();

  const handleAccountClick = () => {
    router.push("/customer");
  };

  const buttonClasses = "w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-md transition-colors"
  return (
    <div className="relative top-full left-1/4 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-20 p-2">
      {/* Container flex para centralizar verticalmente */}
      {
        isAdmin && (
          <button
          onClick={() => router.push("/dashboard")}
          className={buttonClasses}
          type="button"
        >
          <ChartBarIcon className="w-5 h-5 text-gray-800 flex-shrink-0" />
          <span className="flex-1 text-center text-gray-800">Dashboard</span>
        </button>
        )
      }
      <button
        onClick={handleAccountClick}
        className={buttonClasses}
        type="button"
      >
        <UserIcon className="w-5 h-5 text-gray-800 flex-shrink-0" />
        <span className="flex-1 text-center text-gray-800">Minha conta</span>
      </button>
      <hr className="border-gray-200 my-1" />
      <button
        onClick={() => logout()}
        className={buttonClasses}
        type="button"
      >
        <ArrowRightOnRectangleIcon className="w-5 h-5 text-gray-800 flex-shrink-0" />
        <span className="flex-1 text-center text-gray-800">Sair</span>
      </button>
    </div>
  );
}
