import CategoryBar from "@/app/components/CategoryBar/CategoryBar";
import NavBar from "@/app/components/NavBar/NavBar";
import ProductCard from "@/app/components/ProductCard/ProductCard";
import Link from "next/link";

export default function Home() {
  return (
    
    <div>
      <CategoryBar/>

      <div className="flex min-h-screen flex-col md:flex-row">
        <main className="p-6 md:ml-64 flex-1">
          <div className="grid grid-cols-2 py-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
            <ProductCard 
                id={1}
                name="JORDAN 23"
                price="299,90"
                imgSrc="https://blacknine.cdn.magazord.com.br/img/2025/01/produto/8300/costas-2025-01-15t123944-125.png?ims=2000x1855"/>
            <ProductCard 
              name="BLACK NINE SHAQUILE O'NEAL"
              price="299,90"
              imgSrc="https://blacknine.cdn.magazord.com.br/img/2025/03/produto/9260/frente-2025-03-13t143233-500.png?ims=2000x1855"/>
            <ProductCard 
              name="NUMBER 09"
              price="299,90"
              imgSrc="https://blacknine.cdn.magazord.com.br/img/2025/02/produto/9142/frente-2025-02-19t180657-814.png?ims=2000x1855"/>
            <ProductCard 
              name="48 DARK BLUE"
              price="299,90"
              imgSrc="https://madenlatados.com.br/cdn/shop/files/preselect_MAD_LOOKBOOK_DROP_45604.jpg?v=1733440108&width=713"/>
            <ProductCard 
              name="48 DARK BLUE"
              price="299,90"
              imgSrc="https://madenlatados.com.br/cdn/shop/files/preselect_MAD_LOOKBOOK_DROP_45604.jpg?v=1733440108&width=713"/>
            <ProductCard 
              name="48 DARK BLUE"
              price="299,90"
              imgSrc="https://madenlatados.com.br/cdn/shop/files/preselect_MAD_LOOKBOOK_DROP_45604.jpg?v=1733440108&width=713"/>
          </div>
        </main>
      </div>
    </div>
  );
}
