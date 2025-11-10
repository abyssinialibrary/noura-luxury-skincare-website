// app/page.js
'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import HeroSection from '../components/sections/HeroSection';
import BrandPhilosophySection from '../components/sections/BrandPhilosophySection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import BrandPillarsSection from '../components/sections/BrandPillarsSection';
import FloatingCardsSection from '../components/sections/FloatingCardsSection';

export default function HomePage() {
  const mainRef = useRef(null); // Ref for the main container

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Background color transition for the entire page body/main
      ScrollTrigger.create({
        trigger: ".brand-philosophy-section", // Use a class for the trigger
        start: "top center", // When the top of the philosophy section hits the center of the viewport
        end: "bottom center", // When the bottom of the philosophy section hits the center of the viewport
        scrub: 1,
        // Using a timeline to smoothly transition background color
        animation: gsap.timeline()
          .to("body", { // Target the body for the background color change
            backgroundColor: "var(--nour-deep-olive)", // Change to NOURA text color
            ease: "none",
          })
      });

      // We might need to adjust other elements' colors as well if they don't contrast
      // For example, if header text needs to change color against the new background
      // This will be handled on a case-by-case basis or by setting transparent header background

    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={mainRef}>
      <HeroSection />
      <BrandPhilosophySection />
      <TestimonialsSection />
      <BrandPillarsSection />
      <FloatingCardsSection />
    </main>
  );
}