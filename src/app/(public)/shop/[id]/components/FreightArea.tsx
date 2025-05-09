"use client";
import { useEffect, useState } from "react";
import { CalcFreightAsync } from "@/app/(public)/services/integrations/melhorEnvio/freightService";
import { ServicesDTO } from "@/app/types/integrations/melhorEnvio/FormsDTO";
import FreightCard from "./FreightCard";
import Link from "next/link";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { useAuth } from "@/context/auth/AuthContext";

interface FreightAreaProps { productId?: string }

export default function FreightArea({ productId }: FreightAreaProps) {
  const { user } = useAuth();

  const [cep, setCep] = useState("");
  const [services, setServices] = useState<ServicesDTO[]>([]);

  const formatCep = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 8);
    return digits.length <= 5 ? digits : `${digits.slice(0, 5)}-${digits.slice(5)}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCep(formatCep(e.target.value));
  };

  const calcFreight = async (cepToUse?: string) => {
    const cleanCep = (cepToUse ?? cep).replace(/\D/g, "");
    if (cleanCep.length !== 8) return;

    const items =
      productId
        ? [{ product_id: productId, quantity: 1 }]
        : user?.cart.items.map((item) => ({
            product_id: item.product.id,
            quantity: item.quantity,
          })) ?? [];

    const response = await CalcFreightAsync({
      toCep: cleanCep,
      items,
    });

    setServices(
      response
        .filter((s) => !s.error)
        .sort((a, b) => parseFloat(a.price.toString()) - parseFloat(b.price.toString()))
    );
  };

  useEffect(() => {
    if (user?.cart.to_cep) {
      const initial = formatCep(user.cart.to_cep);
      setCep(initial);
      calcFreight(initial);
    }
  }, [user]);

  return (
    <div className="bg-white rounded-lg w-full mx-auto p-4">
      <h1 className="text-xl font-semibold text-gray-700 mb-4">
        Consulte o prazo de entrega
      </h1>
      <div className="flex gap-2 items-center">
        <label htmlFor="cep" className="text-sm font-medium text-gray-600">
          CEP:
        </label>
        <input
          type="text"
          id="cep"
          className="w-32 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="00000-000"
          value={cep}
          onChange={handleChange}
        />
        <button
          type="button"
          onClick={() => calcFreight()}
          className="w-fit px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
        >
          Continuar
        </button>
        <Link
          href="https://buscacepinter.correios.com.br/app/endereco/index.php"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto inline-flex items-center text-sm text-black hover:text-blue-800 hover:underline transition-all duration-200"
        >
          <MapPinIcon className="w-4 h-4 mr-1" />
          Não sei meu CEP
        </Link>
      </div>
      <div className="mt-5 space-y-4">
        {services.map((service) => (
          <FreightCard toCep={cep} key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
}
