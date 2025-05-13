'use client'
import { useState } from "react";
import Me from "./me/page";
import AddressesArea from "./addresses/page";
import SideBar from "@/app/components/SideBar";

export default function CustomerArea() {
  const [selectedArea, setSelectedArea] = useState("Seus dados");
  const areas = [
    "Seus dados",
    "Trocas",
    "Endereços",
    "Sair",
  
  ];
  return (
    <div className="md:flex"> 
      
      <div className="md:w-64">
        <SideBar
        
          labels={areas}
          activeLabel={selectedArea}
          setActiveLabel={setSelectedArea}
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
