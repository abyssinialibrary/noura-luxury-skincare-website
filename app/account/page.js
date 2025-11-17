// app/account/page.js
'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from '../components/ui/SplitText'; // Adjust path if necessary
import Link from 'next/link';

export default function AccountPage() {
  const pageRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
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
  }, []);

  return (
    <main ref={pageRef} className="relative w-full bg-nour-bone-white py-16 md:py-24 overflow-hidden min-h-screen flex flex-col items-center justify-center">
      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32 flex flex-col justify-center items-center text-center relative z-10">
        <SplitText
          text="Your NOURA Account"
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

        <SplitText
          text="Manage your orders, wish list, and preferences here. Placeholder for future account features."
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

        <div className="mt-12 flex flex-col sm:flex-row gap-6">
          <Link href="/shop" className="px-8 py-3 bg-nour-terracotta-gold text-nour-dark-text font-semibold rounded-full hover:bg-opacity-90 transition-all duration-300">
            Continue Shopping
          </Link>
          <Link href="/contact" className="px-8 py-3 border border-nour-deep-olive text-nour-deep-olive font-semibold rounded-full hover:bg-nour-deep-olive hover:text-nour-bone-white transition-all duration-300">
            Contact Support
          </Link>
        </div>
      </div>
    </main>
  );
}