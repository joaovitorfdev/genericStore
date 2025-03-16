"use client"

import CategoryBar from "@/app/components/CategoryBar/CategoryBar";
import NavBar from "@/app/components/NavBar/NavBar";
import ProductCard from "@/app/components/ProductCard/ProductCard";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ProductDTO } from "../types/ProductDTO";
import {GetProducts} from "../services/products_service"


export default function Home() {
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await GetProducts();
        setProducts(data);
      } catch (err) {
        setError("Falha ao carregar produtos");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

 
  const BASE_URL = "http://localhost:8000"; 

  return (
    <div>
      <CategoryBar />
      <div className="flex min-h-screen flex-col md:flex-row">
        <main className="p-6 md:ml-64 flex-1">
          <div className="grid grid-cols-2 py-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
            {
              products.map((product) => {
              
                let mainImage = product.images && product.images.length > 0 ? product.images.find((img) => img.is_main)?.image ||  product.images[0].image : null;
                let  imgSrc = mainImage ? `${BASE_URL}${mainImage}` : "https://via.placeholder.com/200";

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
                />
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}