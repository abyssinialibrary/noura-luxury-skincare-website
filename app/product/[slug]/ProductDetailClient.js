// app/product/[slug]/ProductDetailClient.js
'use client'; // This component is interactive and uses client-side hooks/animations

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import SplitText from '../../components/ui/SplitText'; // Adjust path if needed

export default function ProductDetailClient({ product }) {
  const pageRef = useRef(null); // Ref for the main page container

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Basic GSAP animation for the main content to fade in
      gsap.from(pageRef.current, {
        opacity: 0,
        y: 50,
        ease: "power3.out",
        duration: 1.2,
        scrollTrigger: {
          trigger: pageRef.current,
          start: "top 80%",
          end: "bottom center",
          toggleActions: "play none none reverse",
          once: true,
        },
      });
    }, pageRef);

    return () => ctx.revert();
  }, [product]); // Re-run effect if product prop changes

  return (
    <main ref={pageRef} className="relative w-full bg-nour-bone-white py-16 md:py-24 overflow-hidden min-h-screen">
      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32 flex flex-col lg:flex-row gap-12 items-start relative z-10">
        {/* Product Image Section */}
        <div className="relative w-full lg:w-1/2 h-[500px] lg:h-[700px] overflow-hidden rounded-xl shadow-lg">
          <Image
            src={product.imageSrc}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            priority // Load product image with high priority
          />
        </div>

        {/* Product Details Section */}
        <div className="w-full lg:w-1/2 flex flex-col justify-start">
          <SplitText
            text={product.title}
            className="font-serif text-5xl md:text-6xl font-bold text-nour-deep-olive leading-tight mb-4"
            delay={0}
            duration={0.7}
            ease="power3.out"
            splitType="words,chars"
            from={{ opacity: 0, y: -20 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            tag="h1"
          />

          <p className="font-sans text-3xl text-nour-terracotta-gold mb-6">{product.price}</p>
          
          <SplitText
            text={product.longDescription}
            className="font-sans text-lg text-nour-dark-text opacity-80 mb-8 leading-relaxed"
            delay={10}
            duration={0.6}
            ease="power2.out"
            splitType="words"
            from={{ opacity: 0, y: 20 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            tag="p"
          />

          {product.benefits && product.benefits.length > 0 && (
            <div className="mb-8">
              <h2 className="font-serif text-2xl font-bold text-nour-deep-olive mb-3">Benefits</h2>
              <ul className="list-disc list-inside font-sans text-nour-dark-text opacity-80 text-base space-y-2">
                {product.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>
          )}

          {product.usage && (
            <div className="mb-8">
              <h2 className="font-serif text-2xl font-bold text-nour-deep-olive mb-3">How to Use</h2>
              <p className="font-sans text-nour-dark-text opacity-80 text-base leading-relaxed">{product.usage}</p>
            </div>
          )}

          {product.ingredients && (
            <div className="mb-8">
              <h2 className="font-serif text-2xl font-bold text-nour-deep-olive mb-3">Ingredients</h2>
              <p className="font-sans text-nour-dark-text opacity-80 text-base leading-relaxed">{product.ingredients}</p>
            </div>
          )}

          <Link 
            href={product.ctaLink} 
            className="inline-block mt-auto px-10 py-4 bg-nour-terracotta-gold text-nour-dark-text text-xl font-semibold rounded-full hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 self-start"
          >
            {product.cta}
          </Link>
          <Link href="/shop" className="mt-4 text-nour-deep-olive hover:underline self-start">
            &larr; Back to Shop
          </Link>
        </div>
      </div>
    </main>
  );
}