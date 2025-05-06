import { CartItemCreate, CartItemUpdate } from "@/app/types/customer/CartDTO";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/customer/cart`
export async function fetchWithAuth(
    input: RequestInfo,
    init: RequestInit = {}
  ): Promise<Response> {
    // pega o token do localStorage
    const token = typeof window !== "undefined"
      ? localStorage.getItem("accessToken")
      : null;
  
    // Mescla headers passados no init com o Authorization
    const headers = new Headers(init.headers);
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
  
    // Faz o fetch com os headers atualizados
    return fetch(input, {
      ...init,
      headers,
    });
  }

export const AddItemToCartAsync = async (form: CartItemCreate) => {
    const response = await fetchWithAuth(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
    });
};
export const UpdateCartItemAsync = async (id:string, form: CartItemUpdate) => {
        await fetchWithAuth(`${BASE_URL}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
    });
};

export const RemoveCartItemAsync = async (id:string) => {
    await fetchWithAuth(`${BASE_URL}/${id}`, {
        method: 'DELETE',
    });
};