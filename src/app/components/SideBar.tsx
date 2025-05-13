"use client"

import { Dispatch, SetStateAction } from "react";

interface CategoryBarProps {
  labels: string[];
  activeLabel: string;
  setActiveLabel: Dispatch<SetStateAction<string>>;
}

export default function CategoryBar({ labels,activeLabel, setActiveLabel }: CategoryBarProps) {
  

  return (
    <aside className="bg-white w-full md:w-64 p-6  flex  md:justify-start  justify-center px-3  text-[11px] md:text-[15px]  md:text-md    text-gray-700  md:fixed md:h-screen font-bold shadow md:shadow-none">
      <nav className="px-5 py-4">
        <div className="flex md:flex-col space-x-4  md:space-y-6 overflow-x-auto md:overflow-visible">
          {labels.map((label) => {
            const isActive = activeLabel === label;
            return (
              <button
                key={label}
                onClick={() => setActiveLabel(label)}
                className={`text-left transition-colors duration-300 hover:text-gray-300 ${isActive ? "text-gray-300" : "text-gray-700"
                  }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}