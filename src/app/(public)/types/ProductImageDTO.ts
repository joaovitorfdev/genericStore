export interface ProductImageDTO {
    is_main: boolean;
    image: string | null; // Caminho relativo da imagem (ou null se blank)
    image_url: string | null; // URL completa da imagem (ou null se não houver)
  }