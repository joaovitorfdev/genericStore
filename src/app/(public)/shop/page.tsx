"use client";

import CategoryBar from "@/app/components/CategoryBar";
import ProductCard from "@/app/components/ProductCard";
import { useEffect, useState } from "react";
import { ProductDTO } from "../../types/ProductDTO";
import { GetProducts } from "../services/productsService";
import { GetMediaLink } from "../services/helper";

export default function ShopPage() {
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [activeCategory, setActiveCategory] = useState("ALL");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await GetProducts();
        setProducts(data);
      } catch (err) {
        return (
          <div>
            <h1>Falha ao retornar produtos</h1>
          </div>
        );
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts =
    activeCategory === "ALL"
      ? products
      : products.filter(
          (product) => product.category === activeCategory.toLowerCase()
        ); // Ajuste conforme sua estrutura de dados

  return (
    <div>
      <CategoryBar
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      <div className="flex min-h-screen flex-col md:flex-row">
        <main className="p-6 md:ml-64 flex-1">
          <div className="grid grid-cols-2 py-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
            {filteredProducts.map((product) => {
              let mainImage =
                product.images && product.images.length > 0
                  ? product.images.find((img) => img.is_main)?.image ||
                    product.images[0].image
                  : null;
              let imgSrc = mainImage
                ? `${GetMediaLink(mainImage)}`
                : "https://via.placeholder.com/200";

              return (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(Number(product.price))}
                  imgSrc={imgSrc}
                  imgHoverSrc={
                    product.images?.[1]?.image
                      ? GetMediaLink(product.images[1].image)
                      : ""
                  }
                />
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}
