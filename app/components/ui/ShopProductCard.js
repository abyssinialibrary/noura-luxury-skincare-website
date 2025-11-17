// app/components/ui/ShopProductCard.js
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const ShopProductCard = ({ product }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Determine which description to show
  const displayDescription = isExpanded && product.longDescription
    ? product.longDescription
    : product.shortDescription;

  // Check if "More" button is needed
  const needsMoreButton = product.longDescription && product.longDescription !== product.shortDescription;

  // Handle click for "More..." button, stopping propagation
  const handleMoreClick = (e) => {
    e.stopPropagation(); // CRITICAL FIX: Stop event from bubbling up
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="product-card-item relative bg-nour-bone-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300">
      {/* Product Image */}
      <div className="relative w-full h-64 overflow-hidden">
        <Image
          src={product.imageSrc}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      
      {/* Product Info */}
      <div className="p-6 text-center flex flex-col justify-between min-h-[16rem]">
        <div>
          <h3 className="font-serif text-2xl font-bold text-nour-deep-olive mb-2">{product.title}</h3>
          <p className="font-sans text-xl text-nour-terracotta-gold mb-4">{product.price}</p>
          <p className="font-sans text-sm text-nour-dark-text opacity-70 mb-4">
            {displayDescription}
          </p>
          {needsMoreButton && (
            <button
              onClick={handleMoreClick}
              className="text-nour-medium-gold hover:underline text-sm font-semibold mb-4"
            >
              {isExpanded ? 'Show Less' : 'More...'}
            </button>
          )}
        </div>
        <Link 
          href={product.ctaLink} 
          className="inline-block mt-auto px-8 py-3 bg-nour-deep-olive text-nour-bone-white text-base font-semibold rounded-full hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105"
        >
          {product.cta}
        </Link>
      </div>
    </div>
  );
};

export default ShopProductCard;