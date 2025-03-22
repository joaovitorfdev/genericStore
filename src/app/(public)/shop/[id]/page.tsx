"use client";
import { useEffect, useState } from "react";
import { ProductDTO } from "../../../types/ProductDTO";
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
  const [isZoomed, setIsZoomed] = useState(false);

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
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  const handleMouseEnter = () => setIsZoomed(true);
  const handleMouseLeave = () => {
    setIsZoomed(false);
    setZoomPosition({ x: 50, y: 50 });
  };

  const handleMiniatureClick = (e: React.MouseEvent<HTMLImageElement>) => {
    setMainImage(e.currentTarget.src);
  };

  if (loading) return <div className="text-center py-20">Carregando...</div>;
  if (error)
    return <div className="text-center py-20 text-red-500">{error}</div>;
  if (!product || !product.images || !product.images[0].image) {
    return <div className="text-center py-20">Produto não encontrado</div>;
  }
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <main className="flex flex-col md:flex-row gap-8 max-w-5xl mx-auto">
          <div className="w-full md:w-1/2 flex flex-col items-center">
            <div
              className="relative w-full h-96 md:h-[500px] bg-white rounded-lg shadow-sm overflow-hidden"
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={mainImage}
                alt={product.name}
                className={`w-full h-full object-contain transition-transform duration-300 ease-in-out ${
                  isZoomed ? "scale-[2.5]" : "scale-100"
                }`}
                style={{
                  transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                }}
              />
            </div>
            <div className="flex gap-3 mt-4 flex-wrap justify-center">
              {product.images?.map((img, index) => (
                <img
                  key={index}
                  src={GetMediaLink(img.image ?? "")}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-md border border-gray-200 hover:border-gray-400 cursor-pointer transition-all duration-200"
                  onClick={handleMiniatureClick}
                />
              ))}
            </div>
          </div>

          {/* Seção de Detalhes */}
          <div className="w-full md:w-1/2 flex flex-col gap-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 uppercase">
              {product.name}
            </h1>
            <SizeSelector stocks={product.stocks} />
            <hr className="border-t border-gray-300" />
            <div className="flex flex-col gap-2">
              <p className="text-gray-500 line-through text-lg">
                3x de{" "}
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(Number(product.price) / 3)}
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(Number(product.price))}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="w-full sm:w-1/2 px-4 py-3 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition-colors duration-200 font-medium">
                Add to Cart
              </button>
              <button className="w-full sm:w-1/2 px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium">
                Buy Now
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
