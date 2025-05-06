// src/components/AddressModal.tsx
'use client'

import React, { useState, useEffect, ChangeEventHandler } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { InputType } from 'zlib'

export interface CustomerAddressDTO {
  id?: string
  zipCode: string
  street: string
  complement?: string
  neighborhood: string
  number: string
}

interface AddressModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: CustomerAddressDTO) => Promise<void> | void
  initialData?: CustomerAddressDTO
}

export default function AddressModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}: AddressModalProps) {
  const formik = useFormik<CustomerAddressDTO>({
    initialValues: {
      zipCode: initialData?.zipCode || '',
      street: initialData?.street || '',
      complement: initialData?.complement || '',
      neighborhood: initialData?.neighborhood || '',
      number: initialData?.number || '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      zipCode: Yup.string().required('CEP obrigatório'),
      street: Yup.string().required('Rua obrigatória'),
      complement: Yup.string(),
      neighborhood: Yup.string().required('Bairro obrigatório'),
      number: Yup.string().required('Número obrigatório'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      await onSave(values)
      setSubmitting(false)
      onClose()
    },
  })

  if (!isOpen) return null

  const handleCepChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value;
    formik.setFieldValue('zipCode', value);
    if (value.length < 8) return;
    const url = `https://viacep.com.br/ws/${value}/json/`;
    fetch(url).then((resp) => resp.json().then((data) => {
        formik.setFieldValue("street",data.logradouro)
        formik.setFieldValue("neighborhood",data.bairro)
        formik.setFieldValue("complement",data.complemento)
    }));
  }
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50" />

      {/* Conteúdo do Modal */}
      <div
        className="relative bg-white rounded-xl shadow-lg w-full max-w-md p-6"
        onClick={e => e.stopPropagation()}
      >
        {/* Botão de fechar */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded hover:bg-gray-100"
        >
          <XMarkIcon className="w-5 h-5 text-gray-600" />
        </button>

        <h2 className="text-xl font-semibold mb-4">
          {initialData ? 'Editar Endereço' : 'Novo Endereço'}
        </h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* CEP */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              CEP
            </label>
            <input
              type="text"
              onChange={handleCepChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
            {formik.touched.zipCode && formik.errors.zipCode && (
              <p className="mt-1 text-xs text-red-500">
                {formik.errors.zipCode}
              </p>
            )}
          </div>

          {/* Rua */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Rua
            </label>
            <input
              type="text"
              {...formik.getFieldProps('street')}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
            {formik.touched.street && formik.errors.street && (
              <p className="mt-1 text-xs text-red-500">
                {formik.errors.street}
              </p>
            )}
          </div>

          {/* Número */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Número
            </label>
            <input
              type="text"
              {...formik.getFieldProps('number')}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
            {formik.touched.number && formik.errors.number && (
              <p className="mt-1 text-xs text-red-500">
                {formik.errors.number}
              </p>
            )}
          </div>

          {/* Complemento */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Complemento
            </label>
            <input
              type="text"
              {...formik.getFieldProps('complement')}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          {/* Bairro */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Bairro
            </label>
            <input
              type="text"
              {...formik.getFieldProps('neighborhood')}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
            {formik.touched.neighborhood && formik.errors.neighborhood && (
              <p className="mt-1 text-xs text-red-500">
                {formik.errors.neighborhood}
              </p>
            )}
          </div>

          {/* Ações */}
          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition cursor-pointer"
            >
              {initialData ? 'Salvar' : 'Adicionar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
