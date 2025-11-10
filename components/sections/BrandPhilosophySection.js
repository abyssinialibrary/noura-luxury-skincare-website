// components/sections/BrandPhilosophySection.js
'use client';

import Image from 'next/image';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from '../ui/SplitText'; // Import our new SplitText component

export default function BrandPhilosophySection() {
  const sectionRef = useRef(null);
  const paragraphRef = useRef(null); // Keep for parallax on inline images

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Animate paragraph (including inline images)
      gsap.from(paragraphRef.current, {
        opacity: 0,
        y: 50,
        ease: "power3.out",
        duration: 1.2,
        delay: 0.2, // Slightly delay after the heading (SplitText handles its own animation)
        scrollTrigger: {
          trigger: paragraphRef.current,
          start: "top 85%",
          end: "bottom center",
          toggleActions: "play none none reverse",
        },
      });

      // Optional: Add subtle parallax to the inline images as the section scrolls
      gsap.to(paragraphRef.current.querySelectorAll('span img'), {
        y: 20, // Move image 20px down relative to its container
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    // Add the class 'brand-philosophy-section' for the ScrollTrigger in page.js
    <section ref={sectionRef} className="relative w-full py-20 md:py-32 lg:py-48 bg-nour-bone-white flex items-center justify-center overflow-hidden brand-philosophy-section">
      <div className="container mx-auto px-4 max-w-4xl">
        <SplitText
          text="NOURA – a philosophy rooted in calm, clarity, and nourishment, bringing together timeless design and modern rituals."
          className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-center leading-tight text-nour-dark-text"
          delay={50} // Stagger delay for each character
          duration={0.5} // Animation duration for each character
          ease="power2.out"
          splitType="chars" // Animate character by character
          from={{ opacity: 0, y: 20 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          tag="h2" // Render as an H2 tag
        />

        <p ref={paragraphRef} className="font-sans text-lg md:text-xl text-center text-nour-dark-text mt-8 max-w-3xl mx-auto opacity-80">
          We craft an identity system that feels serene and intelligent,
          celebrating slowness, presence, and the art of intentional care.
          Our mark, inspired by the swan
          {' '}
          <span className="relative inline-block align-middle w-16 h-10 -translate-y-1 overflow-hidden rounded-md shadow-md">
            <Image
              src="/brand-assets/noura-philosophy-1.jpg"
              alt="Skincare texture detail"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 hover:scale-110"
            />
          </span>
          {' '}
          — a universal symbol of elegance, purity, and grace —
          abstractly housed in a soft capsule shape, suggests reflection and flow.
          Paired with a modern sans-serif wordmark, our system communicates quiet confidence.
          {' '}
          <span className="relative inline-block align-middle w-16 h-10 -translate-y-1 overflow-hidden rounded-md shadow-md">
             <Image
              src="/brand-assets/noura-philosophy-2.jpg"
              alt="Close-up of a natural ingredient"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 hover:scale-110"
            />
          </span>
          {' '}
          NOURA is designed for the discerning minimalist, those who seek balance, stillness, and purpose in every detail.
        </p>
      </div>
    </section>
  );
}