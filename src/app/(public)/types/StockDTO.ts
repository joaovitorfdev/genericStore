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
    id: string;
    product_id: string; 
    size: Size; 
    quantity: number;
  }