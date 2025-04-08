import { SyntheticEvent, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
export default function MiniLogin(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginFailed, setLoginFailed] = useState(false);
    const [error, setError] = useState('');

    const { login } = useAuth();
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      const success = await login(username, password);
      if (!success) {
        setError('Credenciais inválidas. Tente novamente.');
      } else {
        // Redirecione ou faça outra ação após o login
       // window.location.href = '/';
      }
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
    return(
        
        <div className="absolute top-full right-0 mt-2 w-64 bg-white border border-gray-200 rounded-2xl shadow-lg z-10 p-4">
          
            <form
              className="grid gap-3 "
              onSubmit={handleSubmit}
            >
              <input
                onChange={handleInputChange}
                name="username"
                type="text"
                placeholder="Email"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:border-black ${loginFailed ? "border-red-500" : "border-gray-200"}`}
              />
              <input
                onChange={handleInputChange}
                name="password"
                type="password"
                placeholder="Password"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:border-black ${loginFailed ? "border-red-500" : "border-gray-200"}`}
              />
              <button
                type="submit"
                className="w-full bg-gray-800 text-white px-3 py-2 rounded-md"
              >
                Entrar
              </button>
              
            </form>
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
        {   
            loginFailed && (
            <div className="text-center mt-4">
                <p className="text-red-600 text-sm">
                Login ou senha invalidos
                </p>
            </div>
        )}
        </div>
    )
}