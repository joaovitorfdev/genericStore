import Image from "next/image";
import NavBar from "@/app/components/NavBar/NavBar";
import Link from "next/link";

export default function Home() {
  return (
      <div>
        <NavBar></NavBar>
       
        <div className="flex min-h-screen space-y-36 small-text permanent-marker">
        <aside key="sideBar" className="bg-white w-64 p-6 text-gray-200 rounded-r-3xl fixed h-96 font-bold">
            <nav className="px-10 py-5">
                <div className="flex flex-col space-y-6" > {/* Espaçamento entre os links */}
                    <Link href="/tshirts">
                        <button className="w-full text-left rounded-lg transition-colors duration-300 hover:text-black">NEW</button>
                    </Link>
                    <Link href="/pants">
                        <button className="w-full text-left rounded-lg">T-SHIRTS</button>
                    </Link>
                    <Link href="/shoes">
                        <button className="w-full text-left rounded-lg">HOODIES</button>
                    </Link>
                    <Link href="/shorts">
                        <button className="w-full text-left rounded-lg">SHORTS</button>
                    </Link>
                    <Link href="/acessories">
                        <button className="w-full text-left rounded-lg">ACESSORIES</button>
                    </Link>
                </div>
            </nav>
        </aside>

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
