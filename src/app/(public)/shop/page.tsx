import Image from "next/image";
import NavBar from "@/app/components/NavBar/NavBar";
import Link from "next/link";

export default function Home() {
  return (
      <div>
        <NavBar></NavBar>
       
        <div className="flex min-h-screen space-y-36 permanent-marker">
      {/* Menu lateral */}
            <aside key="sideBar" className="bg-white w-64 p-6 rounded-r-3xl fixed h-96 font-bold ">
                <nav className="space-y-4 px-10 py-10">
                <Link href="/tshirts">
                    <button className="w-full text-left text-black py-5  rounded-lg">
                    T-SHIRTS
                    </button>
                </Link>
                <Link href="/pants">
                    <button className="w-full text-left text-blackpx-4 py-5  rounded-lg">
                    CALÇAS
                    </button>
                </Link>
                <Link href="/shoes">
                    <button className="w-full text-left text-blackpy-2 py-5 rounded-lg">
                    SAPATOS
                    </button>
                </Link>
                </nav>
            </aside>

            {/* Conteúdo principal */}
            <div className="flex-1 ml-64">
               
                <main className="p-8">
                <h1 className="text-3xl font-bold">Bem-vindo à loja!</h1>
                <p>Escolha uma categoria no menu lateral.</p>
                </main>
            </div>
            </div>
      </div>
  );
}
