import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  name: string;
  id?: string
  // description: string;
  price: string;
  imgSrc: string ;
}

export default function ProductCard({ name, price, imgSrc, id }: ProductCardProps) {
  return (
    <li className="bg-transparent rounded-lg p-4 flex flex-col  items-center justify-between w-full h-auto">
      <Link href={`/shop/${id}`} className="w-full h-80 rounded-lg overflow-hidden block">
        <Image
          src={imgSrc}
          alt={name}
          width={350}
          height={400} 
          className="object-cover  w-full h-full" 
        />
      </Link>

      {/* Informações do Produto */}
      <div className="text-center mt-4">
        <h3 className="text-lg  text-gray-500 transition-colors duration-700 hover:text-black ">{name}</h3>
        <p className="text-xl font-bold text-black mt-2">{price}</p>
      </div>
    </li>
  );
}
