// components/sections/HeroSection.js
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
      gsap.from(productImageRef.current, {
        opacity: 10,
        y: 50, // Start slightly below
        scale: 0.9, // Start slightly smaller
        ease: "power3.out",
        duration: 1.5,
        delay: 0.3, // Image appears slightly after text
      });

      // Subtle Floating Animation for the product image (continues until scroll trigger starts)
      gsap.to(productImageRef.current, {
        y: -10, // Move up by 10px
        duration: 3,
        ease: "power1.inOut",
        repeat: -1, // Infinite repeat
        yoyo: true, // Go back and forth
        paused: true, // Start paused, let the initial from() tween finish
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
            y: -100, // NOURA text slides up significantly
            x: 900,
            opacity: 1, // Fades out slightly
            scale: 100, // Shrinks a bit as it goes up
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
    <section ref={comp} className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-nour-bone-white to-nour-soft-neutral overflow-hidden">
      {/* Background radial gradient */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <div className="radial-gradient-circle absolute w-[80vw] h-[80vw] max-w-2xl max-h-2xl rounded-full bg-nour-terracotta-gold opacity-10 blur-3xl lg:w-[60vw] lg:h-[60vw]"></div>
      </div>

      {/* Main content container for centering */}
      <div className="relative flex items-center justify-center w-full h-full p-4 md:p-8 lg:p-12">
        {/* NOURA Text - Positioned behind the image */}
        <h1
          ref={nouraTextRef}
          className="absolute font-serif text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] font-bold text-nour-deep-olive opacity-20 select-none z-10 whitespace-nowrap pointer-events-none"
          style={{ transformOrigin: 'center center' }} // Ensure scale animates from center
        >
          NOURA
        </h1>

        {/* Product Image - Positioned in front */}
        <div className="relative z-20 w-full max-w-xs md:max-w-sm lg:max-w-md h-auto flex items-center justify-center">
          <Image
            ref={productImageRef}
            src="/brand-assets/luxury-skincare-product.png"
            alt="NOURA Luxury Skincare Product"
            width={500}
            height={500}
            priority
            className="w-full h-auto object-contain drop-shadow-xl"
          />
        </div>
      </div>
    </section>
  );
}