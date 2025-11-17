// app/page.js
'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import HeroSection from './components/sections/HeroSection';
import BrandPhilosophySection from './components/sections/BrandPhilosophySection';
import TestimonialsSection from './components/sections/TestimonialsSection';
import BrandPillarsSection from './components/sections/BrandPillarsSection';
import ProductGallerySection from './components/sections/ProductGallerySection'; // Renamed import

export default function HomePage() {
  const mainRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ".brand-philosophy-section",
        start: "top center",
        end: "bottom center",
        scrub: 1,
        animation: gsap.timeline()
          .to("body", {
            backgroundColor: "var(--nour-deep-olive)",
            ease: "none",
          })
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={mainRef}>
      <HeroSection />
      <BrandPhilosophySection />
      <TestimonialsSection />
      <BrandPillarsSection />
      <ProductGallerySection /> {/* Render the new ProductGallerySection */}
    </main>
  );
}