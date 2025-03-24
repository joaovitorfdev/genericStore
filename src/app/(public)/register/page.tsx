"use client";

import { useState } from "react";
import Link from 'next/link';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    document: "",
    phone: "",
    zip_code: "",
    street: "",
    complement: "",
    neighborhood: "",
    number: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validação básica
    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }
    
    try {
      // Aqui você pode adicionar sua lógica de submit
      console.log("Dados do formulário:", formData);
      setError("");
      // Adicione sua chamada de API aqui
    } catch (err) {
      setError("Erro ao registrar. Tente novamente.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen  flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-200 rounded-lg">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Criar Conta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Preencha os campos abaixo para se registrar
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nome</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-black  focus:ring-1 focus:ring-black transition-colors duration-200 placeholder-gray-400"
                placeholder="Seu nome completo"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Documento</label>
              <input
                type="text"
                name="document"
                value={formData.document}
                onChange={handleChange}
                required
                className="mt-1 w-full px-4 py-2 border  border-gray-200 rounded-md focus:outline-none focus:border-black  focus:ring-1 focus:ring-black transition-colors duration-200 placeholder-gray-400"
                placeholder="CPF ou CNPJ"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Telefone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="mt-1 w-full px-4 py-2 border  border-gray-200 rounded-md focus:outline-none focus:border-black  focus:ring-1 focus:ring-black transition-colors duration-200 placeholder-gray-400"
                placeholder="(xx) xxxxx-xxxx"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">CEP</label>
              <input
                type="text"
                name="zip_code"
                value={formData.zip_code}
                onChange={handleChange}
                required
                className="mt-1 w-full px-4 py-2 border  border-gray-200 rounded-md focus:outline-none focus:border-black  focus:ring-1 focus:ring-black transition-colors duration-200 placeholder-gray-400"
                placeholder="xxxxx-xxx"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Rua</label>
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
                required
                className="mt-1 w-full px-4 py-2 border  border-gray-200 rounded-md focus:outline-none focus:border-black  focus:ring-1 focus:ring-black transition-colors duration-200 placeholder-gray-400"
                placeholder="Nome da rua"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Complemento</label>
              <input
                type="text"
                name="complement"
                value={formData.complement}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 border  border-gray-200 rounded-md focus:outline-none focus:border-black  focus:ring-1 focus:ring-black transition-colors duration-200 placeholder-gray-400"
                placeholder="Apto, bloco, etc (opcional)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Bairro</label>
              <input
                type="text"
                name="neighborhood"
                value={formData.neighborhood}
                onChange={handleChange}
                required
                className="mt-1 w-full px-4 py-2 border  border-gray-200 rounded-md focus:outline-none focus:border-black  focus:ring-1 focus:ring-black transition-colors duration-200 placeholder-gray-400"
                placeholder="Nome do bairro"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Número</label>
              <input
                type="text"
                name="number"
                value={formData.number}
                onChange={handleChange}
                required
                className="mt-1 w-full px-4 py-2 border  border-gray-200 rounded-md focus:outline-none focus:border-black  focus:ring-1 focus:ring-black transition-colors duration-200 placeholder-gray-400"
                placeholder="Número da residência"
              />
            </div>

            {/* Campos de email e senha no final */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-black  focus:ring-1 focus:ring-black transition-colors duration-200 placeholder-gray-400"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Senha</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-1 w-full px-4 py-2 border  border-gray-200 rounded-md focus:outline-none focus:border-black  focus:ring-1 focus:ring-black transition-colors duration-200 placeholder-gray-400"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Confirmar Senha</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="mt-1 w-full px-4 py-2 border  border-gray-200 rounded-md focus:outline-none focus:border-black  focus:ring-1 focus:ring-black transition-colors duration-200 placeholder-gray-400"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4  bg-gray-800 text-white rounded-md hover:bg-gray-900 cursor-pointer transition-colors duration-200"
          >
            Registrar
          </button>
        </form>

        <div className="text-center text-sm">
          <p className="text-gray-600">
            Já tem uma conta?{" "}
            <Link href="/login" className="font-medium  hover:text-gray-300 cursor-pointer transition-colors duration-200">
              Faça login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}