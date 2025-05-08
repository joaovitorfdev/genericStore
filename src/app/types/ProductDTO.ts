import { ProductImageDTO } from "./ProductImageDTO";
import { StockDTO } from "./StockDTO";

export enum Category {
    TShirts = "t-shirts",
    Hoodies = "hoodies",
    Shorts = "shorts",
    Accessories = "accessories",
  }

  export interface ProductDTO {
    id: string; // UUID como string em JSON
    name: string;
    description: string;
    price: number; // Decimal é serializado como number em JSON
    category: Category; // Usando o enum Category
    stocks?: StockDTO[]; // Opcional, lista de estoques
    images: ProductImageDTO[]; // Opcional, lista de imagens
    created_at?: string; // ISO string (ex.: "2025-03-16T12:00:00Z") do BaseModel
    updated_at?: string; // ISO string do BaseModel
  }
  
  // DTO para criação/atualização (opcional, se precisar enviar dados)
  export interface ProductCreateDTO {
    name: string;
    description?: string;
    price: number;
    category: Category;
  }