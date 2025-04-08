import { SyntheticEvent, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
export default function LoggedUserDropDown(){


    const {user, logout} = useAuth();
   
    return(
        
        <div className="absolute top-full right-0 mt-2 w-64 bg-white border border-gray-200 rounded-2xl shadow-lg z-10 p-4">
          
          <button
              onClick={() => {logout()}}
                type="submit"
                className="w-full bg-gray-800 text-white px-3 py-2 rounded-md"
              >
                Sair
              </button>
        </div>
    )
}