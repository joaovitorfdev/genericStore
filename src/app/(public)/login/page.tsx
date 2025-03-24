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
  localStorage.setItem("token", data.access);
  return true;
};

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginFailed, setLoginFailed] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const success = await login(username, password);
    setLoginFailed(!success);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (loginFailed) {
      setLoginFailed(false); 
    }
    if (e.target.name === "username") {
      setUsername(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

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
          <div>
            <input
              onChange={handleInputChange}
              name="username"
              value={username}
              className={`w-80 px-4 py-2 border rounded-md focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors duration-200 placeholder-gray-400 ${
                loginFailed ? "border-red-500" : "border-gray-200"
              }`}
              type="text"
              placeholder="Email"
            />
          </div>
          <div>
            <input
              onChange={handleInputChange}
              name="password"
              value={password}
              className={`w-80 px-4 py-2 border rounded-md focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors duration-200 placeholder-gray-400 ${
                loginFailed ? "border-red-500" : "border-gray-200"
              }`}
              type="password"
              placeholder="Password"
            />
          </div>
          <input
            className="w-80 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 cursor-pointer transition-colors duration-200"
            type="submit"
            value="Login"
          />
        </form>

        {loginFailed && (
          <div className="text-center mt-4">
            <p className="text-red-600 text-sm">
              Falha no login: Credenciais inválidas
            </p>
          </div>
        )}

        <div className="text-center text-sm mt-4">
          <p className="text-gray-600">
            Não tem uma conta?{" "}
            <Link
              href="/register"
              className="font-medium text-gray-800 hover:text-gray-600 cursor-pointer transition-colors duration-200"
            >
              Registre-se
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}