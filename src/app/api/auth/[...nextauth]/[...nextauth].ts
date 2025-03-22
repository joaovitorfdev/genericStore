// auth.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";

// Defina seu tipo personalizado
interface CustomUser {
  id: string;
  name: string;
  email: string;
}

// Extenda o tipo JWT para incluir as propriedades do CustomUser
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
  }
}

// Extenda o tipo Session para incluir o id
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
    };
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Email", type: "text", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<CustomUser | null> {
        console.log(`url: ${process.env.NEXT_PUBLIC_API_URL}/token/pair`);

        if (!credentials?.username || !credentials?.password) {
          console.log("Credenciais incompletas:", credentials);
          return null;
        }

        console.log("Tentando autenticar com:", credentials);

        try {
          const response = await fetch(`http://localhost:8000/api/token/pair`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: credentials.username,
              password: credentials.password,
            }),
          });

          console.log("Status da resposta:", response.status);
          const data = await response.json();
          console.log("Dados da API:", data);

          if (!response.ok) {
            console.log("Autenticação falhou, status não OK:", response.status);
            return null;
          }

          // Armazena o token no localStorage (opcional, pode ser removido se o NextAuth gerenciar o JWT)
          localStorage.setItem("token", data.access);

          return {
            id: data.user?.id || "1", // Ajuste conforme o retorno real da API
            name: data.user?.username || credentials.username,
            email: data.user?.email || credentials.username,
          };
        } catch (error) {
          console.error("Erro ao autenticar:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login", // Redireciona erros para a página de login
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
      }
      return session;
    },
  },
});