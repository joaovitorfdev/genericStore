"use client";

import { signIn } from "next-auth/react";
import Link from 'next/link';

import { useState } from "react";

const login = async (username: string, password: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/token/pair`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }
  );

  if (!response.ok) {
    return false;
  }

  const data = await response.json();
  localStorage.setItem("token", data.access); // Armazena o token
  return true
};

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginfailed, setLoginFailed] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  const sucess = await login(username,password,);
    if(!sucess){setLoginFailed(true)}
    else{setLoginFailed(false)}
}


  return (
    <div className="grid my-10 justify-center">
      <section className="border border-gray-200 rounded-lg min-w-96 p-6 shadow-md bg-white">
        <div className="text-center py-3.5">
          <h1 className="text-2xl font-semibold text-gray-800">Login</h1>
        </div>
        <form
          className="grid py-3.5 justify-center text-center gap-y-6"
          onSubmit={handleSubmit}
        >
          <input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setUsername(e.target.value);
            }}
            className="w-80 px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-black  focus:ring-1 focus:ring-black transition-colors duration-200 placeholder-gray-400"
            type="text"
            placeholder="Email"
          />
          <input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value);
            }}
            className="w-80 px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors duration-200 placeholder-gray-400"
            type="password"
            placeholder="Password"
          />
          <input
            className="w-80 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 cursor-pointer transition-colors duration-200"
            type="submit"
            value="Login"
          />
        </form>
       {
        loginfailed  ? (
            
                <h1 className="text-red-700  justify-self-center">
                Login failed: Invalid credentials
                </h1>
            )
            :(
              <div className="text-center text-sm">
              <p className="text-gray-600">
                Não tem uma conta?{" "}
                <Link href="/register" className="font-medium  hover:text-gray-300 cursor-pointer transition-colors duration-200">
                  Registre-se
                </Link>
              </p>
            </div>
            )
       }

      </section>
    </div>
  );
}
