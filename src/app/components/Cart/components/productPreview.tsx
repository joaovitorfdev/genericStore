import { GetMediaLink } from "@/app/(public)/services/helper"
import { CartItemDTO } from "@/app/types/customer/validators/CustomerDTO"
import { XMarkIcon } from "@heroicons/react/24/outline"  // se quiser um botão de remover

interface ProductPreviewProps  {
  item: CartItemDTO
};

export default function ProductPreview({ item }: ProductPreviewProps) {
  const mainImage = item.product.images?.find(img => img.is_main)?.image ?? ""
  return (
    <div className="flex items-center bg-white rounded-2xl shadow hover:shadow-lg transition-shadow duration-200 p-4 space-x-4">
      
      {/* Imagem do produto */}
      <div className="flex-shrink-0">
        <img
          src={GetMediaLink(mainImage)}
          alt={item.product.name}
          className="w-20 h-20 object-cover rounded-lg border border-gray-200"
        />
      </div>

      {/* Detalhes */}
      <div className="flex-1 grid gap-1">
        <h3 className="text-base font-semibold text-gray-800">
          {item.product.name}
        </h3>
        <div className="flex items-center text-sm text-gray-500">
          <span className="uppercase">{item.size}</span>
          <span className="mx-2">·</span>
          <span>{item.quantity}x</span>
        </div>
        
        <p className="text-gray-900 font-bold">
          {(item.product.price * item.quantity).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </p>
       
      </div>

      {/* Botão de remover (opcional) */}
      <button
        className="text-gray-400 hover:text-red-500 transition-colors"
        aria-label="Remover item"
      >
        <XMarkIcon className="w-5 h-5" />
      </button>
    </div>
  )
}
