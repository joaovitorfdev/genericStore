// src/app/(private)/checkout/page.tsx
'use client'

import React, { useState } from 'react'
import { useAuth } from '@/context/auth/AuthContext'
import ProductPreview from "./components/ProductPreview"
import Link from 'next/link'

export default function CheckoutPage() {
    const { user } = useAuth()
    const items = user?.cart.items ?? []
    const subtotal = user?.cart.subtotal ?? 0
    const [openAddressModal, setOpenAddressModal] = useState(true)
    return (
        <main className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* <AddressModal 
            isOpen={openAddressModal}
            onClose={() => setOpenAddressModal(false)}
            ></AddressModal> */}
            {/* Lista de Itens */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Meu Carrinho</h2>
                {items.length === 0 ? (
                    <p className="text-gray-500">Seu carrinho está vazio {":("}</p>
                ) : (
                    <div className="space-y-3 max-h-[60vh] min-h-full overflow-y-auto">
                        {items.map(item => (
                            <ProductPreview key={item.id} item={item} />
                        ))}
                    </div>
                )}
            </section>

            {/* Resumo e Finalização */}
            <aside className="space-y-6 border border-gray-200 rounded-lg p-6">
                <h2 className="text-2xl font-semibold">Resumo da Compra</h2>
                <div className="flex justify-between text-lg">
                    <span>Subtotal</span>
                    <span className="font-bold">
                        {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                        }).format(subtotal)}
                    </span>
                </div>
                {/* Aqui você pode adicionar descontos, frete, impostos etc. */}
                <div className="flex justify-between text-sm text-gray-600">
                    <span>Frete</span>
                    <span>Calcular no próximo passo</span>
                </div>

                {/* Botão de Finalizar Compra */}
                <button
                    onClick={() => { /* router.push('/payment') */ }}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
                >
                    Finalizar Compra
                </button>

                {/* Link para continuar comprando */}
                <Link
                    href="/shop"
                    className="block text-center text-sm text-blue-600 hover:underline"
                >
                    ← Continuar Comprando
                </Link>
            </aside>
        </main>
    )
}

import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import AddressModal from '../ui/modals/AddressModal'

interface QuantitySelectorProps {
    value: number;
    min?: number;
    max?: number;
    onChange: (newValue: number) => void;
}

export function QuantitySelector({
    value,
    min = 1,
    max = Infinity,
    onChange,
}: QuantitySelectorProps) {
    const handleDecrease = () => {
        const v = Math.max(min, value - 1)
        onChange(v)
    }
    const handleIncrease = () => {
        const v = Math.min(max, value + 1)
        onChange(v)
    }

    return (
        <div className="flex items-center space-x-2">

            <button
                type="button"
                onClick={handleDecrease}
                disabled={value <= min}
                className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
                aria-label="Diminuir quantidade"
            >
                <MinusIcon className="w-4 h-4 text-gray-600" />
            </button>

            <div className="w-12 h-8 flex items-center justify-center border border-gray-300 rounded-md text-base font-medium">
                {value}
            </div>

            <button
                type="button"
                onClick={handleIncrease}
                disabled={value >= max}
                className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
                aria-label="Aumentar quantidade"
            >
                <PlusIcon className="w-4 h-4 text-gray-600" />
            </button>
        </div>
    )
}
