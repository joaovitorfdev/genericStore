import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  name: string;
  // description: string;
  price: string;
  imgSrc: string;
}

export default function ProductCard({ name, price, imgSrc }: ProductCardProps) {
  return (
    <li className="bg-white rounded-lg p-4 flex flex-col items-center justify-between w-full h-auto">
      <Link href="/produto/detalhes" className="w-full h-80 bg-gray-200 rounded-lg overflow-hidden block">
        <Image
          src={imgSrc}
          alt={name}
          width={350}
          height={400} 
          className="object-cover w-full h-full" 
        />
      </Link>

      {/* Informações do Produto */}
      <div className="text-center mt-4">
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
        <p className="text-xl font-bold text-black mt-2">{price}</p>
      </div>
    </li>
  );
}
