// components/ui/ProductDisplayCard.js
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const ProductDisplayCard = ({
  product,
  cardBgColor = 'bg-nour-bone-white',
  cardTextColor = 'text-nour-dark-text'
}) => {
  const handleLinkClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={`relative w-full h-full ${cardBgColor} rounded-[20px] shadow-xl overflow-hidden flex flex-col justify-between`}>
      {/* Product Image as background within the card */}
      <Image
        src={product.imageSrc}
        alt={product.title}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover w-full h-full absolute inset-0 z-0"
        loading="lazy"
      />
      {/* Overlay and Text Content for the front, positioned at the bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6 z-10">
        {/* --- CRITICAL FIX: HIGHLIGHTED TEXT INSTEAD OF SOLID RECTANGLE --- */}
        {/* Removed the absolute div for the rectangle. */}
        {/* Applied padding and bg-opacity directly to text for highlighting. */}
        <h3 className={`font-serif text-2xl font-bold ${cardTextColor} mb-2 inline-block px-2 py-1 rounded bg-black/30`}>{product.title}</h3>
        <p className={`font-sans text-sm ${cardTextColor} opacity-80 mb-4 inline-block px-2 py-0.5 rounded bg-black/30`}>{product.shortDescription}</p>
        <p className={`font-sans text-xs ${cardTextColor} opacity-70 mb-4 hidden md:block inline-block px-2 py-0.5 rounded bg-black/30`}>{product.longDescription.substring(0, 100)}...</p>
        {/* --- END HIGHLIGHTED TEXT --- */}
        
        <Link href={product.ctaLink} onClick={handleLinkClick} className="inline-block mt-auto px-6 py-2 bg-nour-terracotta-gold text-nour-dark-text text-base font-semibold rounded-full hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 relative z-20">
          {product.cta}
        </Link>
      </div>
    </div>
  );
};

export default ProductDisplayCard;