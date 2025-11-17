// app/components/sections/ProductGallerySection.js
'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from '../ui/SplitText';
import Image from 'next/image'; // Ensure Image is imported for product display

export default function ProductGallerySection() {
  const sectionRef = useRef(null);
  const textContentRef = useRef(null);
  
  // Updated product data with 'price' field
  const bestProducts = [
    {
      id: 1,
      imageSrc: '/brand-assets/nour-float-1.jpg',
      title: 'Nourish & Glow Serum',
      price: '$65.00', // Added price
      description: 'A potent blend for radiant skin. Experience the transformative power of our Nourish & Glow Serum, meticulously crafted with botanical extracts and essential vitamins.',
      cta: 'View Product',
      ctaLink: '/product/nourish-glow-serum',
    },
    {
      id: 2,
      imageSrc: '/brand-assets/nour-float-2.jpg',
      title: 'Balancing Cleansing Oil',
      price: '$48.00', // Added price
      description: 'Gently purifies, maintains harmony. Our Balancing Cleansing Oil effortlessly dissolves impurities and makeup without stripping your skin\'s natural moisture.',
      cta: 'View Product',
      ctaLink: '/product/balancing-cleansing-oil',
    },
    {
      id: 3,
      imageSrc: '/brand-assets/nour-float-3.jpg',
      title: 'Replenishing Night Cream',
      price: '$72.00', // Added price
      description: 'Restorative care for overnight renewal. Awaken to revitalized skin with our Replenishing Night Cream, rich in antioxidants and essential fatty acids.',
      cta: 'View Product',
      ctaLink: '/product/replenishing-night-cream',
    },
    {
      id: 4,
      imageSrc: '/brand-assets/nour-float-1.jpg',
      title: 'Pure Hydration Mist',
      price: '$35.00', // Added price
      description: 'A refreshing veil of moisture. Spritz your way to instant refreshment with our Pure Hydration Mist, formulated with mineral-rich waters and calming botanicals.',
      cta: 'View Product',
      ctaLink: '/product/pure-hydration-mist',
    },
    {
      id: 5,
      imageSrc: '/brand-assets/nour-float-2.jpg',
      title: 'Gentle Exfoliating Polish',
      price: '$55.00', // Added price
      description: 'Refine and renew for a smooth canvas. Fine, biodegradable particles delicately buff away dead skin cells, promoting cellular renewal without irritation.',
      cta: 'View Product',
      ctaLink: '/product/gentle-exfoliating-polish',
    },
    {
      id: 6,
      imageSrc: '/brand-assets/nour-float-3.jpg',
      title: 'Radiant Eye Concentrate',
      price: '$88.00', // Added price
      description: 'Brightens and revitalizes delicate eyes. This lightweight yet powerful formula diminishes the appearance of dark circles, puffiness, and fine lines.',
      cta: 'View Product',
      ctaLink: '/product/radiant-eye-concentrate',
    },
  ];

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Entrance animation for the text content
      gsap.from(textContentRef.current, {
        opacity: 0,
        y: 50,
        ease: "power3.out",
        duration: 1.2,
        scrollTrigger: {
          trigger: textContentRef.current,
          start: "top 80%",
          end: "bottom center",
          toggleActions: "play none none reverse",
          once: true,
        },
      });
      
      // Staggered fade-in and slide-up for product cards
      gsap.from(".product-card-item", {
        opacity: 0,
        y: 50, // Slight slide-up effect
        stagger: 0.15, // Staggered delay for each card
        ease: "power3.out",
        duration: 0.8,
        scrollTrigger: {
          trigger: ".product-cards-grid",
          start: "top 75%", // Start animation when grid is 75% in view
          toggleActions: "play none none reverse",
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [bestProducts]);


  return (
    <section ref={sectionRef} className="relative w-full bg-nour-bone-white py-16 md:py-24 overflow-hidden">
      
      {/* Text Content Area */}
      <div ref={textContentRef} className="container mx-auto px-4 py-16 md:py-24 lg:py-32 flex flex-col justify-center items-center text-center relative z-10">
        {/* Heading */}
        <SplitText
          text="Discover Your Ritual"
          className="font-serif text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-nour-deep-olive leading-tight mb-8 md:mb-12 max-w-5xl mx-auto"
          delay={70}
          duration={0.7}
          ease="power3.out"
          splitType="words,chars"
          from={{ opacity: 0, y: -40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          tag="h2"
        />

        {/* Paragraph */}
        <SplitText
          text="Explore our curated collection of best-selling skincare essentials, designed to bring balance and radiance to your daily practice."
          className="font-sans text-xl md:text-2xl lg:text-3xl text-nour-dark-text opacity-70 mt-8 max-w-4xl mx-auto"
          delay={50}
          duration={0.6}
          ease="power2.out"
          splitType="words"
          from={{ opacity: 0, y: 30 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          tag="p"
        />
      </div>

      {/* Product Cards Grid */}
      <div className="product-cards-grid container mx-auto px-4 py-16 md:py-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 relative z-10">
        {bestProducts.map((product) => (
          <div
            key={product.id}
            className="product-card-item relative bg-nour-bone-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300"
          >
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
            <div className="p-6 text-center">
              <h3 className="font-serif text-2xl font-bold text-nour-deep-olive mb-2">{product.title}</h3>
              <p className="font-sans text-xl text-nour-terracotta-gold mb-4">{product.price}</p> {/* Display price */}
              <p className="font-sans text-sm text-nour-dark-text opacity-70 mb-6">{product.description}</p> {/* Display description */}
              <a 
                href={product.ctaLink} 
                className="inline-block px-8 py-3 bg-nour-deep-olive text-nour-bone-white text-base font-semibold rounded-full hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105"
              >
                {product.cta}
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}