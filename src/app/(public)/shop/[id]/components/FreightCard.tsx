import { ServicesDTO } from "@/app/types/integrations/melhorEnvio/FormsDTO";
import { useAuth } from "@/context/auth/AuthContext";
import { useState } from "react";

interface FreightCardProps {
  service: ServicesDTO;
}

export default function FreightCard({
  service,
}: FreightCardProps) {

  const {user} = useAuth();
  const isSelected = user?.cart?.service === service?.id;
  return (
    <label
      htmlFor={service.id}
      className="w-full bg-white border border-gray-200 rounded-xl shadow-md p-4 flex items-center gap-4 cursor-pointer hover:border-blue-400 transition-colors"
    >
      {/* Radio button customizado */}
      <input
        type="radio"
        id={service.id}
        value={service.id}
        checked={isSelected}
        // onChange={() => onChange(service.id)}
        className="h-5 w-5 text-blue-600 border-gray-300 rounded-full focus:ring-blue-500"
      />

      {/* Logo da transportadora */}
      <img
        src={service.company.picture}
        alt={service.company.name}
        className="w-12 h-12 object-contain"
      />

      {/* Conteúdo do card */}
      <div className="flex flex-1 flex-col sm:flex-row sm:items-center sm:justify-between gap-2 ">
        <h2 className="text-base font-semibold text-gray-800">
          {service.name}
        </h2>
        <p className="text-sm text-gray-600">
          Prazo:{" "}
          <span className="font-medium text-gray-800">
            {service.delivery_time.toString()} dia
            {service.delivery_time > 1 ? "s" : ""}
          </span>
        </p>
        <p className="text-sm text-gray-600">
          Valor:{" "}
          <span className="font-bold text-black">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(service.price)}
          </span>
        </p>
      </div>
    </label>
  );
}
