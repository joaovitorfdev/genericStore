import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  name: string;
  id?: string;
  price: string;
  imgSrc: string;
  imgHoverSrc?: string; // Segunda imagem opcional para o hover
}

export default function ProductCard({ name, price, imgSrc, imgHoverSrc, id }: ProductCardProps) {
  return (
    <li className="grid bg-transparent flex-col items-center justify-between">
      <Link href={`/shop/${id}`} className="overflow-hidden block group relative">
        <Image
          src={imgSrc}
          alt={name}
          width={1000}
          height={1000}
          className="object-cover w-full h-full transition-opacity duration-500 group-hover:opacity-0 "
        />
        {
          imgHoverSrc && (
          <Image
            src={imgHoverSrc}
            alt={`${name} hover`}
            width={1000}
            height={1000}
            className="object-cover w-full h-full absolute top-0 left-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        )}
      </Link>

      <div className="text-center mt-4">
        <h3 className="text-lg text-nowrap  text-gray-500 transition-colors duration-700 hover:text-black">
          {name}
        </h3>
        <p className="text-xl font-bold text-black mt-2">{price}</p>
      </div>
    </li>
  );
}
