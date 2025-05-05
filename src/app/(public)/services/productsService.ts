import { ProductDTO } from "../../types/ProductDTO";


const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/public/products`;

export async  function GetProducts(): Promise<ProductDTO[]> {
  try {
    console.log(BASE_URL)
    const response = await fetch(`${BASE_URL}`, {
      method: "GET", // Método GET (padrão, mas explicitado para clareza)
      headers: {
        "Content-Type": "application/json", // Define o tipo de conteúdo esperado
      },
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
    }

    const data: ProductDTO[] = await response.json();
    return data;
  } 
  catch (error) {
    console.error("Erro ao buscar produtos:", error);
    throw error; // Repropaga o erro para ser tratado pelo chamador
  }
}
export async  function GetProductByID(id:string | string[]): Promise<ProductDTO> {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "GET", // Método GET (padrão, mas explicitado para clareza)
      headers: {
        "Content-Type": "application/json", // Define o tipo de conteúdo esperado
      },
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
    }

    const data: ProductDTO = await response.json();
    return data;
  } 
  catch (error) {
    console.error("Erro ao buscar produtos:", error);
    throw error; // Repropaga o erro para ser tratado pelo chamador
  }
}