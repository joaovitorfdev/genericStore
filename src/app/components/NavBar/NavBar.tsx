// src/app/components/NavBar.tsx
'use client'; // Necessário para usar usePathname em um Client Component

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavBar() {
  const pathname = usePathname(); // Pega a rota atual

  // Lista de links para facilitar iteração (opcional)
  const navLinks = [
    { href: '/', label: 'HOME' },
    { href: '/shop', label: 'SHOP' },
    { href: '/contacts', label: 'CONTACTS' },
    { href: '/about', label: 'ABOUT' },
  ];

  return (
    <nav className="bg-white medium-text w-full text-black p-4 flex items-center h-28">
      <img src="https://files.oaiusercontent.com/file-WgUNiWgadWPC2YMcvSNqjM?se=2025-03-15T17%3A35%3A04Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3Df227cf84-0510-4f67-88d3-9b54a55e6a0f.webp&sig=4UWDcLEOvyxIFHfqJ2ZffmE30uE41mMHrp5TY5%2BJqsw%3D" alt="Logo" className="h-10 w-10 mr-4" />

      <div className="flex-1 flex justify-center space-x-20 permanent-marker">
        {navLinks.map((link) => {
          const isActive = pathname === link.href; // Verifica se a rota atual é igual ao href
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-all duration-200 ease-in-out hover:text-gray-300 hover:scale-105 ${isActive ? 'text-gray-300 scale-105' : '' }`}>
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}