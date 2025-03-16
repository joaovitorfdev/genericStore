export enum Size {
    XS = "XS",
    S = "S",
    M = "M",
    L = "L",
    XL = "XL",
    XXL = "2XL",
    XXXL = "3XL",
  }

export interface StockDTO {
    id: string; // UUID como string em JSON
    product_id: string; // UUID do produto
    size: Size; // Usando o enum Size
    quantity: number;
  }