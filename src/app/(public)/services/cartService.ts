import { CartItemCreate } from "@/app/types/customer/CartDTO";

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
    const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/customer/cart`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
    });
};