"use client"

import { Dispatch, SetStateAction } from "react";

interface CategoryBarProps {
  selectedArea: string;
  setSelectedArea: Dispatch<SetStateAction<string>>;
}

export default function UserAreaBar({ selectedArea, setSelectedArea }: CategoryBarProps) {
  const areas = [
    { label: "Seus dados" },
    { label: "Trocas" },
    { label: "Endereços" },
    { label: "Sair" },
  
  ];

  return (
    <aside className="bg-white w-full md:w-64 p-6  flex  md:justify-start  justify-center px-3  text-[11px] md:text-[15px]  md:text-md    text-gray-700  md:fixed md:h-screen font-bold shadow md:shadow-none">
      <nav className="px-5 py-4">
        <div className="flex md:flex-col space-x-4  md:space-y-6 overflow-x-auto md:overflow-visible">
          {areas.map((category) => {
            const isActive = selectedArea === category.label;
            return (
              <button
                key={category.label}
                onClick={() => setSelectedArea(category.label)}
                className={`text-left transition-colors duration-300 hover:text-gray-300 ${
                  isActive ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}