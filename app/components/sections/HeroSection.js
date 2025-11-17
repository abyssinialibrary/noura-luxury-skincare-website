// app/components/sections/HeroSection.js
'use client';

import Image from 'next/image';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function HeroSection() {
  const comp = useRef(null); // Ref for the entire section
  const nouraTextRef = useRef(null);
  const productImageRef = useRef(null);

  useLayoutEffect(() => {
    // Create a GSAP context for this component
    let ctx = gsap.context(() => {

      // Initial Load Animation: Fade in the NOURA text and product image
      gsap.from(nouraTextRef.current, {
        opacity: 50,
        y: 30, // Start slightly below
        ease: "power3.out",
        duration: 1.5,
        scale: 1.1,
      });


      // Scroll-Triggered Animation: Text slides up, Image slides down and shrinks
      ScrollTrigger.create({
        trigger: comp.current,
        start: "top top", // Animation starts when top of section hits top of viewport
        end: "bottom top", // Animation ends when bottom of section hits top of viewport
        scrub: 1, // Smoothly link animation to scroll position
        onEnter: () => {
          // Play floating animation after initial load, pause when scroll animation starts
          gsap.to(productImageRef.current, {y: -10, duration: 3, ease: "power1.inOut", repeat: -1, yoyo: true, paused: false});
        },
        onLeave: () => {
          // Pause floating animation when scroll animation takes over
          gsap.to(productImageRef.current, {paused: true});
        },
        onEnterBack: () => {
          // Play floating animation when scrolling back up into hero
          gsap.to(productImageRef.current, {y: -10, duration: 3, ease: "power1.inOut", repeat: -1, yoyo: true, paused: false});
        },
        onLeaveBack: () => {
          // Pause floating animation when scrolling back up out of hero
          gsap.to(productImageRef.current, {paused: true});
        },
        animation: gsap.timeline()
          .to(nouraTextRef.current, {
            y: 3000, // NOURA text slides up significantly
            x: -9999,
            opacity: 1, // Fades out slightly
            scale: 200, // Shrinks a bit as it goes up
            ease: "power2.out",
          }, 0) // Start at the same time as other tweens in this timeline
          .to(productImageRef.current, {
            y: 0, // Product image slides down
            scale: 0.5, // Shrinks to half size
            ease: "power2.out",
          }, 0)
      });

    }, comp); // Scope to the component's root ref

    return () => ctx.revert(); // Cleanup GSAP context on unmount
  }, []);

  return (
    <section ref={comp} className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/brand-assets/hero-background.jpg" // <<< IMPORTANT: REPLACE THIS PATH with your actual new background image
          alt="NOURA Skincare Background"
          fill
          sizes="100vw"
          className="object-cover"
          priority // Load with high priority for LCP
        />
      </div>

      <div className="absolute inset-0 z-10 flex items-center justify-center">
      </div>

      <div className="relative flex items-center justify-center w-full h-full p-4 md:p-8 lg:p-12 z-20">
        <h1
          ref={nouraTextRef}
          className="absolute font-serif text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] font-bold text-nour-bone-white opacity-100 select-none z-30 whitespace-nowrap pointer-events-none" // Increased z-index to be above floating product image
          style={{ transformOrigin: 'center center' }}
        >
          NOURA
        </h1>
      </div>
    </section>
  );
}