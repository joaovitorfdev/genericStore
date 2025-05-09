import { ProductDTO } from "../ProductDTO";

export interface CartItemDTO{
    product:ProductDTO;
    subtotal:number;
    quantity: number;
    size:string;
    id:string;
  }

export type CartItemCreate = {
    product_id:string;
    quantity: number;
    size:string;
}

export type CartItemUpdate = {
    quantity?: number;
    size?:string;
}

export interface CartDTO{
    items: CartItemDTO[];
    subtotal:number;
    service: string;
    to_cep:string
    id:string;
  }


export type CartUpdateRequest = {
  to_cep?: string;
  service?: string;
}