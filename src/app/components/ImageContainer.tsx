"use client";
import { useState } from "react";

interface ZoomableImageProps {
  src: string;
  alt?: string;
}

export default function ZoomableImage({ src, alt = "" }: ZoomableImageProps) {
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [isZoomed, setIsZoomed] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  const handleMouseEnter = () => setIsZoomed(true);
  const handleMouseLeave = () => {
    setIsZoomed(false);
    setZoomPosition({ x: 50, y: 50 });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative bg-white rounded-lg shadow-sm overflow-hidden"
    >
      <img
        src={src}
        alt={alt}
        className={`object-contain transition-transform duration-300 ease-in-out ${
          isZoomed ? "scale-[2.5]" : "scale-100"
        }`}
        style={{
          transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
        }}
      />
    </div>
  );
}
