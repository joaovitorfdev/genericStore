"use client"

import { Dispatch, SetStateAction } from "react";

interface CategoryBarProps {
  activeCategory: string;
  setActiveCategory: Dispatch<SetStateAction<string>>;
}

export default function CategoryBar({ activeCategory, setActiveCategory }: CategoryBarProps) {
  const categories = [
    { label: "ALL" },
    { label: "T-SHIRTS" },
    { label: "HOODIES" },
    { label: "SHORTS" },
    { label: "ACCESSORIES" },
  ];

  return (
    <aside className="bg-white w-full md:w-64 p-6 text-gray-700 rounded-r-3xl md:fixed md:h-screen font-bold shadow md:shadow-none">
      <nav className="px-5 py-4">
        <div className="flex md:flex-col space-x-4 md:space-x-0 md:space-y-6 overflow-x-auto md:overflow-visible">
          {categories.map((category) => {
            const isActive = activeCategory === category.label;
            return (
              <button
                key={category.label}
                onClick={() => setActiveCategory(category.label)}
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