"use client";
import { useEffect, useState } from "react";
import NavBar from "@/app/components/NavBar/NavBar";
import { ProductDTO } from "../../types/ProductDTO";
import { GetProductByID } from "../../services/products_service";
import { useParams } from "next/navigation";
import SizeSelector from "./components/SizeSelection";

export default function Home() {

  const [product, setProduct] = useState<ProductDTO>();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchProducts = async () => {
      if (!id) return;
      try {
        const data = await GetProductByID(id.toString());
        setProduct(data);
      } catch (err) {
        setError("Falha ao carregar produtos");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id]);

  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [mainImage, setMainImage] = useState(
    "https://blacknine.cdn.magazord.com.br/img/2025/01/produto/8300/costas-2025-01-15t123944-125.png?ims=2000x1855"
  );
  const [isZoomed, setIsZoomed] = useState(false); // Estado para controlar o zoom

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100; // Ajustado para porcentagem (0-100)
    const y = ((e.clientY - top) / height) * 100; // Ajustado para porcentagem (0-100)
    setZoomPosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsZoomed(true); // Ativa o zoom ao entrar na imagem
  };

  const handleMouseLeave = () => {
    setIsZoomed(false); // Desativa o zoom ao sair da imagem
    setZoomPosition({ x: 50, y: 50 }); // Reseta o ponto de zoom para o centro
  };

  const handleMiniatureClick = (e: React.MouseEvent<HTMLImageElement>) => {
    const newImageSrc = e.currentTarget.src; // Obtém a URL da miniatura clicada
    setMainImage(newImageSrc); // Atualiza a imagem principal
  };

  if(!product){return}
  
  return (
    <div>
      <div className="flex py-12 flex-col md:flex-row">
        <main className="p-6 md:ml-64 flex-1">
          <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row gap-8">
            <div className="flex-1 relative overflow-hidden">
              <div
                className="relative w-full h-auto max-h-[700px]  overflow-hidden"
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <img 
                  src={mainImage} 
                  alt="Jordan 23"
                  className={`w-full h-[600px] object-contain transition-transform duration-300 ease-in-out ${
                    isZoomed ? "scale-200" : "scale-100"
                  }`}
                  style={{
                    transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  }}
                />
              </div>
              <div className="flex gap-2 mt-4 justify-center w-full">
                {[
                  "https://cdn.awsli.com.br/2500x2500/1605/1605630/produto/310106765/tee4sufblurbrown1-0tjpqxueeo.jpg",
                  "https://blacknine.cdn.magazord.com.br/img/2025/01/produto/8300/costas-2025-01-15t123944-125.png?ims=2000x1855",
                  "https://blacknine.cdn.magazord.com.br/img/2025/01/produto/8300/costas-2025-01-15t123944-125.png?ims=2000x1855",
                ].map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-16 h-16 object-cover border cursor-pointer"
                    onClick={handleMiniatureClick} // Adiciona o evento de clique
                  />
                ))}
              </div>
            </div>

            {/* Seção de informações (direita) */}
            <div className="flex-1 flex flex-col gap-4">
              <h1 className="text-3xl font-bold uppercase">{product.name}</h1>

              <SizeSelector stocks={product.stocks} />

              <hr className="border-t border-gray-300 my-4" />

              {/* Preço */}
              <div>
                <p className="text-gray-600 line-through">3x de R$</p>
                <p className="text-2xl font-bold">{new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(Number(product.price))}</p>
              </div>

              {/* Botões */}
              <div className="flex gap-6">
                <button className="bg-gray-800 text-white px-6 py-3 max-w-[200px] flex items-center gap-4 hover:bg-gray-700 transition">
                  Add to cart
                </button>
                <button className="bg-gray-800 text-white px-6 py-3 max-w-[200px] flex items-center gap-4 hover:bg-gray-700 transition">
                  Buy now
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}