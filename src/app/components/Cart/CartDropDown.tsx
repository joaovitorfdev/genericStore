import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/auth/AuthContext";
import { useRouter } from 'next/navigation'
import ProductPreview from "./components/productPreview";

export default function CartDropDown() {
  const { user } = useAuth();
  const router = useRouter(); // Instancia o router
  const divClasses = "absolute top-full  left-5  mt-2 w-96 bg-white border border-gray-200 rounded-2xl shadow-lg   space-y-2 z-10"

  if (user?.cart.items.length === 0) {
    return (
      <div className={divClasses}>
        <h1 className="font-bold justify-self-center">Seu carinho esta vazio {":("}</h1>
      </div>
    )
  }
  return (
    <div className={divClasses}>
      <div className="max-h-[50vh] overflow-y-auto space-y-3 p-1 ">
        {user?.cart.items.map((item) => (
          <ProductPreview key={item.id} item={item} />
        ))}
      </div>

      {/* Resumo de valores */}
      <div className="mt-5 space-y-2  p-4 text-sm font-medium">
        <div className="flex justify-between border-t pt-3">
          <span>Subtotal:</span>
          <span className="text-gray-900 font-semibold">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(Number(user?.cart.subtotal))}
          </span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>ou 3x sem juros de:</span>
          <span>
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(Number(user?.cart.subtotal / 3))}
          </span>
        </div>
        <button
        className="w-full mt-4 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-center font-semibold"
        onClick={() => router.push("/checkout")}
      >
        Finalizar Compra
      </button>
      </div>

      {/* Botão de Finalizar Compra */}
     
    </div>
  );
}
