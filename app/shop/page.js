// app/shop/page.js
'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from '../components/ui/SplitText';
import ShopProductCard from '../components/ui/ShopProductCard';

export default function ShopPage() {
  const pageRef = useRef(null); // Ref for the main page container
  const textContentRef = useRef(null); // <--- CRITICAL FIX: ADD THIS LINE

  // Define your full list of products for the shop page
  const allProducts = [
    {
      id: 1,
      imageSrc: '/brand-assets/nour-float-1.jpg',
      title: 'Nourish & Glow Serum',
      price: 'birr 65.00',
      shortDescription: 'A potent blend for radiant skin, deeply hydrates.',
      longDescription: 'Experience the transformative power of our Nourish & Glow Serum, meticulously crafted with botanical extracts and essential vitamins. It deeply hydrates, brightens, and reduces fine lines for a luminous complexion. Apply morning and night as part of your ritual for optimal results.',
      cta: 'View Product',
      ctaLink: '/product/nourish-glow-serum',
    },
    {
      id: 2,
      imageSrc: '/brand-assets/nour-float-3.jpg',
      title: 'Balancing Cleansing Oil',
      price: 'birr 48.00',
      shortDescription: 'Gently purifies, maintains skin harmony.',
      longDescription: 'Our Balancing Cleansing Oil effortlessly dissolves impurities and makeup without stripping your skin\'s natural moisture. Infused with soothing oils, it leaves your skin feeling clean, soft, and perfectly balanced, ready for the next step in your NOURA ritual.',
      cta: 'View Product',
      ctaLink: '/product/balancing-cleansing-oil',
    },
    {
      id: 3,
      imageSrc: '/brand-assets/nour-night-cream.jpg',
      title: 'Replenishing Night Cream',
      price: 'birr 72.00',
      shortDescription: 'Restorative care for overnight renewal.',
      longDescription: 'Awaken to revitalized skin with our Replenishing Night Cream. Rich in antioxidants and essential fatty acids, it supports your skin\'s natural repair process, deeply moisturizing and restoring suppleness. A luxurious finish to your evening ritual.',
      cta: 'View Product',
      ctaLink: '/product/replenishing-night-cream',
    },
    {
      id: 4,
      imageSrc: '/brand-assets/hydration-mist.jpg',
      title: 'Pure Hydration Mist',
      price: 'birr 35.00',
      shortDescription: 'A refreshing veil of moisture, revitalizes instantly.',
      longDescription: 'Spritz your way to instant refreshment with our Pure Hydration Mist. Formulated with mineral-rich waters and calming botanicals, it preps your skin for serums, sets makeup, or simply revitalizes throughout the day. Your skin\'s daily sip of calm.',
      cta: 'View Product',
      ctaLink: '/product/pure-hydration-mist',
    },
    {
      id: 5,
      imageSrc: '/brand-assets/exfoliating-polish.jpg',
      title: 'Gentle Exfoliating Polish',
      price: 'birr 55.00',
      shortDescription: 'Refine and renew for a smooth canvas.',
      longDescription: 'Reveal a brighter, smoother complexion with our Gentle Exfoliating Polish. Fine, biodegradable particles delicately buff away dead skin cells, promoting cellular renewal without irritation. Use once or twice weekly for optimal results.',
      cta: 'View Product',
      ctaLink: '/product/gentle-exfoliating-polish',
    },
    {
      id: 6,
      imageSrc: '/brand-assets/eye-concentrate.jpg',
      title: 'Radiant Eye Concentrate',
      price: 'birr 88.00',
      shortDescription: 'Brightens and revitalizes delicate eyes.',
      longDescription: 'Target the delicate skin around your eyes with our Radiant Eye Concentrate. This lightweight yet powerful formula diminishes the appearance of dark circles, puffiness, and fine lines, leaving your eyes looking refreshed and youthful. A vital step for focused care.',
      cta: 'View Product',
      ctaLink: '/product/radiant-eye-concentrate',
    },
    // Adding more fictional products to fill the shop
    {
      id: 7,
      imageSrc: '/brand-assets/face-elixir.jpg',
      title: 'Botanical Face Elixir',
      price: 'birr 95.00',
      shortDescription: 'A luxurious oil blend for deep nourishment.',
      longDescription: 'Infused with rare botanical oils, our Face Elixir deeply nourishes and restores skin vitality. It absorbs quickly, leaving a luminous, non-greasy finish. Ideal for enhancing glow and elasticity.',
      cta: 'View Product',
      ctaLink: '/product/botanical-face-elixir',
    },
    {
      id: 8,
      imageSrc: '/brand-assets/sun-shield.jpg',
      title: 'Mineral Sun Shield SPF 30',
      price: 'birr 42.00',
      shortDescription: 'Lightweight, broad-spectrum sun protection.',
      longDescription: 'Protect your skin daily with our Mineral Sun Shield. This non-nano zinc oxide formula offers broad-spectrum SPF 30 protection without a white cast. Hydrating and gentle for all skin types.',
      cta: 'View Product',
      ctaLink: '/product/mineral-sun-shield',
    },
    {
      id: 9,
      imageSrc: '/brand-assets/clay-purifying-mask.jpg',
      title: 'Clay Purifying Mask',
      price: 'birr 38.00',
      shortDescription: 'Detoxify and refine pores naturally.',
      longDescription: 'Our Clay Purifying Mask draws out impurities and excess oil, leaving skin feeling fresh and refined. Enriched with calming botanicals to prevent over-drying.',
      cta: 'View Product',
      ctaLink: '/product/clay-purifying-mask',
    },
    {
      id: 10,
      imageSrc: '/brand-assets/lip-eye-balm.jpg',
      title: 'Lip & Eye Balm',
      price: 'birr 28.00',
      shortDescription: 'Targeted hydration for delicate areas.',
      longDescription: 'A concentrated balm to intensely hydrate and protect the delicate skin around the lips and eyes. Reduces fine lines and dryness for a smoother look.',
      cta: 'View Product',
      ctaLink: '/product/lip-eye-balm',
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
      gsap.from(".shop-products-grid .product-card-item", { // Target individual cards within the grid
        opacity: 0,
        y: 50, // Slight slide-up effect
        stagger: 0.1, // Staggered delay for each card
        ease: "power3.out",
        duration: 0.7,
        scrollTrigger: {
          trigger: ".shop-products-grid",
          start: "top 85%", // Start animation when grid is 85% in view
          toggleActions: "play none none reverse",
        },
      });

    }, pageRef);

    return () => ctx.revert();
  }, [allProducts]);

  return (
    <main ref={pageRef} className="relative w-full bg-nour-bone-white py-16 md:py-24 overflow-hidden min-h-screen flex flex-col items-center">
      <div ref={textContentRef} className="container mx-auto px-4 py-16 md:py-24 lg:py-32 flex flex-col justify-center items-center text-center relative z-10"> {/* ADDED ref={textContentRef} */}
        {/* Shop Page Heading with SplitText animation */}
        <SplitText
          text="Explore Our Collection"
          className="font-serif text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-nour-deep-olive leading-tight mb-8 md:mb-12 max-w-5xl mx-auto"
          delay={70}
          duration={0.7}
          ease="power3.out"
          splitType="words,chars"
          from={{ opacity: 0, y: -40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          tag="h1"
        />

        {/* Introductory Paragraph with SplitText animation */}
        <SplitText
          text="Discover the full spectrum of NOURA skincare – a meticulously curated selection designed to elevate your daily ritual and reveal your skin's natural radiance."
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

        {/* Product Listing Grid */}
        <div className="shop-products-grid mt-20 w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {allProducts.map(product => (
            <ShopProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}