"use client";
import { useEffect, useState } from "react";
import { ProductDTO } from "../../types/ProductDTO";
import { GetProductByID } from "../../services/products_service";
import { useParams } from "next/navigation";
import SizeSelector from "../../../components/SizeSelection";
import { GetMediaLink } from "../../services/helper";

export default function ProductPage() {

  const [product, setProduct] = useState<ProductDTO>();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [mainImage, setMainImage] = useState<string | undefined>(undefined);
  const [isZoomed, setIsZoomed] = useState(false); // Estado para controlar o zoom
  useEffect(() => {
    const fetchProducts = async () => {
      if (!id) return;
      try {
        const data = await GetProductByID(id.toString());
        setProduct(data);
  
        if (data?.images && data.images[0]?.image) {
          setMainImage(GetMediaLink(data.images[0].image));
        }
      } catch (err) {
        setError("Falha ao carregar produto");
      } finally {
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, [id]);
  

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

  if (!product || !product.images || !product.images[0].image) {
    return null; // ou outro componente de fallback
  }
  
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
                  {
                    product.images?.map((product, index) => (
                    <img
                      key={index}
                      src={product.image ? GetMediaLink(product.image) : ''}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-16 h-16 object-cover border cursor-pointer"
                      onClick={handleMiniatureClick} // Adiciona o evento de clique
                    />
                  ))}
                </div>
            </div>

            <div className="flex-1 flex flex-col gap-4">
              <h1 className="text-3xl font-bold uppercase">{product.name}</h1>

              <SizeSelector stocks={product.stocks} />

              <hr className="border-t border-gray-300 my-4" />

              <div>
                <p className="text-gray-600 line-through">3x de R$</p>
                <p className="text-2xl font-bold">{new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(Number(product.price))}</p>
              </div>

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