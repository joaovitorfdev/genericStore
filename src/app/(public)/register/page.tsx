"use client";

import { useState } from "react";
import Link from 'next/link';
import { useFormik } from "formik";
import { CreateUser } from "../services/userService";
import { CustomerValidatorSchema } from "@/app/types/customer/validators/customer.validator";
import { UserCreateRequest, UserDTO } from "@/app/types/customer/validators/CustomerDTO";

interface RegisterValues{
  name:string;
  surname:string;
  document:string;
  email:string;
  password:string;
}
export default function RegisterPage() {
  const [initialValues, setInitialValues] = useState<RegisterValues> ({
    name : "",
    surname : "",
    email : "",
    document : "",
    password : ""
  })
  
  
  const formik = useFormik({
    initialValues,
    validationSchema: CustomerValidatorSchema,
    onSubmit: async (values, { setErrors }) => {
      try {
        const response = await CreateUser({
            first_name: values.name,
            last_name: values.surname,
            email: values.email,
            username: values.email,
            password: values.password,
            document: values.document
   
        } as UserCreateRequest);
  
        console.log("Response:", response); // Aqui você printa a response no console
  
      } catch (error) {
        console.error("Erro ao criar usuário:", error);
        // Aqui você pode usar setErrors para mostrar as mensagens de erro, se necessário.
      }
    },
  });
  




  return (
    <div className="  flex items-center justify-center bg-white md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-200 ">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Criar Conta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Preencha os campos abaixo para se registrar
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit} >
          <div className="grid grid-cols-1 gap-6">
            <div className="flex gap-3 justify-between">
                <div className="w-1/2">
                  <label className="block text-sm font-medium  text-gray-700">Nome</label>
                    <input
                      type="text"
                      name="name"
                      onBlur={formik.handleBlur}
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      className="mt-1 w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-black  focus:ring-1 focus:ring-black transition-colors duration-200 placeholder-gray-400"
                    />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium  text-gray-700">Sobrenome</label>
                    <input
                      type="text"
                      name="surname"
                      onBlur={formik.handleBlur}
                      value={formik.values.surname}
                      onChange={formik.handleChange}
                      className="mt-1 w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-black  focus:ring-1 focus:ring-black transition-colors duration-200 placeholder-gray-400"
                    />
                </div>
             
            </div>
            {
              formik.touched.document && formik.errors.name && (
                  <h6 className="text-red-600 text-sm">
                      {formik.errors.name}
                  </h6>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">Documento</label>
              <input
                type="text"
                name="document"
                onBlur={formik.handleBlur}
                value={formik.values.document}
                onChange={formik.handleChange}
                className="mt-1 w-full px-4 py-2 border  border-gray-200 rounded-md focus:outline-none focus:border-black  focus:ring-1 focus:ring-black transition-colors duration-200 placeholder-gray-400"
                placeholder="CPF ou CNPJ"
              />
            </div>
            {formik.touched.document && formik.errors.document && (
                  <h6 className="text-red-600 text-sm">
                  {formik.touched.name && formik.errors.document ? (formik.errors.document) : null}
                  </h6>
            )}

            {/* Campos de email e senha no final */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                onBlur={formik.handleBlur}
                value={formik.values.email}
                onChange={formik.handleChange}
                className="mt-1 w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-black  focus:ring-1 focus:ring-black transition-colors duration-200 placeholder-gray-400"
                placeholder="seu@email.com"
              />
                {formik.touched.email && formik.errors.email && (
                  <h6 className="text-red-600 text-sm">
                  {formik.touched.email && formik.errors.email ? (formik.errors.email) : null}
                  </h6>
            )}
            
            </div>
            

            <div>
              <label className="block text-sm font-medium text-gray-700">Senha</label>
              <input
                type="password"
                name="password"
                onBlur={formik.handleBlur}
                value={formik.values.password}
                onChange={formik.handleChange}
                required
                className="mt-1 w-full px-4 py-2 border  border-gray-200 rounded-md focus:outline-none focus:border-black  focus:ring-1 focus:ring-black transition-colors duration-200 placeholder-gray-400"
                placeholder="••••••••"
              />
            </div>
            {formik.touched.password && formik.errors.password && (
                  <h6 className="text-red-600 text-sm">
                  {formik.touched.password && formik.errors.password ? (formik.errors.password) : null}
                  </h6>
            )}
          </div>

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