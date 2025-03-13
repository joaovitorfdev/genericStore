import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  name: string;
  description: string;
  price: string;
  imgSrc: string;
}

export default function ProductCard({ name, description, price, imgSrc }: ProductCardProps) {
  return (
    <li className="bg-white rounded-lg w-80 h-[450px] p-4 flex flex-col items-center justify-between shadow-lg">
      {/* Imagem do Produto como Link */}
      <Link href="/produto/detalhes" className="w-full h-60 bg-gray-200 rounded-lg overflow-hidden block">
        <Image
          src={imgSrc}
          alt={name}
          width={350}
          height={240}
          className="object-contain w-full h-full"
        />
      </Link>

      {/* Informações do Produto */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
        <p className="text-gray-500 text-sm">{description}</p>
        <p className="text-xl font-bold text-black mt-2">R$ {price}</p>
      </div>
    </li>
  );
}
