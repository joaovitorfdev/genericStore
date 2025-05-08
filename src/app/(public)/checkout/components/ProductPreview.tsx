import { RemoveCartItemAsync, UpdateCartItemAsync } from "@/app/(public)/services/cartService"
import { GetMediaLink } from "@/app/(public)/services/helper"
import { CartItemDTO } from "@/app/types/customer/CartDTO"
import { useAuth } from "@/context/auth/AuthContext"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { QuantitySelector } from "../page"

interface ProductPreviewProps {
    item: CartItemDTO
    setSelectedProduct: React.Dispatch<React.SetStateAction<string>>
}

export default function ProductPreview({ item, setSelectedProduct }: ProductPreviewProps) {
    const mainImage = item.product.images?.find(img => img.is_main)?.image ?? ""
    const router = useRouter()
    const { fetchCustomerData } = useAuth()

    const [qty, setQty] = useState(item.quantity)

    const handleRemoveItem = async () => {
        await RemoveCartItemAsync(item.id)
        fetchCustomerData()
    }

    const maxStock = item.product.stocks?.find(s => s.size === item.size)?.quantity ?? 1

    const handleQtyChange = async (newQty: number) => {
        setQty(newQty)
        await UpdateCartItemAsync(item.id, { quantity: newQty })
        fetchCustomerData()
    }

    return (
        <div className="flex items-center bg-white rounded-2xl p-2  shadow hover:shadow-lg transition-shadow duration-200 space-x-4 mb-2">

            <div className="flex-shrink-0 cursor-pointer" onClick={
                () =>
                    setSelectedProduct(GetMediaLink(item.product.images[0].image ?? ""))
                    // router.push("/shop/" + item.product.id)
                }>
                <img
                    src={GetMediaLink(mainImage)}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-lg border border-gray-100"
                />
            </div>

            <div className="flex-1 grid gap-1">
                <h3 className="text-base font-semibold text-gray-800">{item.product.name}</h3>
                <div className="flex items-center text-sm text-gray-500">
                    <span className="uppercase">{item.size}</span>
                    <span className="mx-2">·</span>
                    <QuantitySelector
                        value={qty}
                        min={1}
                        max={maxStock}
                        onChange={handleQtyChange}
                    />
                </div>
                <p className="text-gray-900 font-bold">
                    {(item.product.price * qty).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                    })}
                </p>
            </div>
            
            <button
                onClick={handleRemoveItem}
                className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                aria-label="Remover item"
            >
                <XMarkIcon className="w-5 h-5" />
            </button>
        </div>
    )
}
