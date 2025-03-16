import { StockDTO } from "@/app/(public)/types/StockDTO";
import { Size } from "@/app/(public)/types/StockDTO";

interface SizeSelectorProps {
  stocks?: StockDTO[];
}

export default function SizeSelector({ stocks }: SizeSelectorProps) {
  const stockMap = new Map(stocks?.map((stock) => [stock.size, stock.quantity]) || []);

  return (
    <div>
      <label className="block text-gray-600 mb-2">Select size:</label>
      <div className="flex gap-2 flex-wrap">
        {
            Object.values(Size).map((size) => {
            const quantity = stockMap.get(size) || 0; // Obtém a quantidade, padrão 0 se não existir
            
            return (
                <button
                key={size}
                className={`border px-2 py-1 text-sm w-12 text-center ${
                    quantity > 0 ? "hover:bg-gray-100" : "opacity-50"
                }`}
                disabled={quantity === 0}
                >
                {size}
                </button>
            );
        })}
      </div>
    </div>
  );
}
