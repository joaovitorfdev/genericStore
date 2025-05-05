import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/auth/AuthContext";
import { useRouter } from 'next/navigation'

export default function LoggedUserDropDown() {
  const { user, logout } = useAuth();
  const router = useRouter(); // Instancia o router

  const handleAccountClick = () => {
    // Redireciona o usuário para a página "customer/me"
    router.push("/customer");
  };

  return (
    <div className="absolute top-full  w-64 bg-white border border-gray-200 rounded-2xl shadow-lg z-10 p-4 space-y-2">
      <button
        onClick={handleAccountClick} // Chama a função para redirecionar
        type="button" // Usar 'button' ao invés de 'submit' em botões que não são de formulários
        className="w-full bg-gray-800 text-white px-3 py-2 rounded-md"
      >
        Minha conta
      </button>

      <button
        onClick={() => { logout(); }} // Faz o logout
        type="button"
        className="w-full bg-gray-800 text-white px-3 py-2 rounded-md"
      >
        Sair
      </button>
    </div>
  );
}
