import router from "next/router";

// auth.ts
export async function login(username: string, password: string): Promise<boolean> {
  try {
    const response = await fetch("http://localhost:8000/api/token/pair", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.access) {
      console.error("Falha na autenticação");
      return false;
    }

    // Armazena o token no localStorage
    localStorage.setItem("access_token", data.access);
    localStorage.setItem("refresh_token", data.refresh); // Se necessário para renovação

    return true;
  } catch (error) {
    console.error("Erro ao tentar autenticar", error);
    return false;
  }
}

export function getSession() {
  const token = localStorage.getItem("access_token");
  if (!token) {
    return null;
  }

  // Retorne um objeto representando a sessão
  return {
    accessToken: token,
    user: {
      id: "user_id", // Aqui você pode pegar mais informações do usuário, se necessário
    },
  };
}

export function Islogged(){
    const session = getSession();
    if (!session) {
      router.push("/login"); // Redireciona para o login se não estiver autenticado
    }
}

export function logout() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
}