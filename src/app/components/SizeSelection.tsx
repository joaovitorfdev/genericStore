import React from "react";
import { StockDTO, Size } from "@/app/types/StockDTO";

interface SizeSelectorProps {
  stocks?: StockDTO[];
  selectedSize: Size | "";
  onSizeSelect: (size: Size) => void;
}

export default function SizeSelector({
  stocks = [],
  selectedSize,
  onSizeSelect,
}: SizeSelectorProps) {
  // Mapeia cada tamanho para sua quantidade disponível
  const stockMap = new Map<Size, number>(
    stocks.map((stock) => [stock.size as Size, stock.quantity])
  );

  return (
    <div>
      <label className="block text-gray-600 mb-2">Select size:</label>
      <div className="flex gap-2 flex-wrap">
        {Object.values(Size).map((size) => {
          const quantity = stockMap.get(size) || 0;
          const isSelected = selectedSize === size;

          return (
            <button
              key={size}
              type="button"
              onClick={() => onSizeSelect(size)}
              disabled={quantity === 0}
              className={
                `w-12 px-2 py-1 text-center text-sm border rounded-md transition-colors duration-200 ` +
                (quantity > 0
                  ? `cursor-pointer ${
                      isSelected
                        ? "bg-gray-800 text-white"
                        : "hover:bg-gray-100"
                    }`
                  : `opacity-50 cursor-not-allowed`)
              }
            >
              {size}
            </button>
          );
        })}
      </div>
    </div>
  );
}
