'use client'
import UserAreaBar from "@/app/components/UserAreaBar";
import { useState } from "react";
import Me from "./me/page";
import AddressesArea from "./addresses/page";

export default function CustomerArea() {
  const [selectedArea, setSelectedArea] = useState("Seus dados");

  return (
    <div className="md:flex"> {/* layout em linha */}
      
      {/* Sidebar lateral com largura fixa */}
      <div className="md:w-64">
        <UserAreaBar
          selectedArea={selectedArea}
          setSelectedArea={setSelectedArea}
        />
      </div>

      {/* Área de conteúdo que muda com base na tab */}
      <div className="flex-1 p-4">
        {selectedArea === "Seus dados" && <Me />}
        {selectedArea === "Endereços" && <AddressesArea />}
      </div>

    </div>
  );
}
