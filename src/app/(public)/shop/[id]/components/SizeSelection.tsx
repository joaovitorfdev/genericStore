import { StockDTO } from "@/app/(public)/types/StockDTO";

interface SizeSelectorProps {
    stocks?: StockDTO[];
  }
  
  export default function SizeSelector({ stocks }: SizeSelectorProps) {
    if (!stocks || stocks.length === 0) {
      return <p className="text-gray-500">Produto sem estoque disponível.</p>;
    }
  
    return (
      <div>
        <label className="block text-gray-600 mb-2">Select size:</label>
        <div className="flex gap-2 flex-wrap">
          {stocks.map((stock) => (
            <button
              key={stock.size}
              className={`border px-2 py-1 text-sm w-12 text-center ${
                stock.quantity > 0 ? "hover:bg-gray-100" : "opacity-50 cursor-not-allowed"
              }`}
              disabled={stock.quantity === 0}
            >
              {stock.size}
            </button>
          ))}
        </div>
      </div>
    );
  }
  