type items = {
    product_id:string
    quantity:Number;

}

export type FreightCalcRequest = {
    toCep: string;
    items: items[]
}

interface CompanyDTO{
    id:number;
    name:string;
    picture:string
}
export interface ServicesDTO  {
    id:string
    delivery_time: Number;
    name: string;
    price: number;
    company:CompanyDTO;
    error?: string;
} 
export type FreightCalcResponse = {
    toCep: string;
    items: items[]
}