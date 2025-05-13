"use client";

import CategoryBar from "@/app/components/SideBar";
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
  
  const categories = [
    "ALL",
    "T-SHIRTS",
    "HOODIES",
    "SHORTS",
    "ACCESSORIES",
  ];

  const filteredProducts =
    activeCategory === "ALL"
      ? products
      : products.filter(
        (product) => product.category === activeCategory.toLowerCase()
      );

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <aside className="w-full md:w-64">
        <CategoryBar
          labels={categories}
          activeLabel={activeCategory}
          setActiveCategory={setActiveCategory}
        />
      </aside>

      {/* Main com produtos */}
      <main className="flex-1 p-4">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => {
            const mainImg = product.images?.find((i) => i.is_main)?.image
            const imgSrc = mainImg
              ? GetMediaLink(mainImg)
              : "https://via.placeholder.com/200"

            return (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(product.price))}
                imgSrc={imgSrc}
                imgHoverSrc={
                  product.images?.[1]?.image
                    ? GetMediaLink(product.images[1].image)
                    : imgSrc
                }
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}