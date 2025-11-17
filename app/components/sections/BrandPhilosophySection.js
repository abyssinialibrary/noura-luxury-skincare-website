// components/sections/BrandPhilosophySection.js
'use client';

import Image from 'next/image';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from '../ui/SplitText';

export default function BrandPhilosophySection() {
  const sectionRef = useRef(null);
  const paragraphRef = useRef(null); // Keep for animating the main paragraph
  const imageRefs = useRef([]); // Ref for the new dedicated images

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Paragraph animation
      gsap.from(paragraphRef.current, {
        opacity: 0,
        y: 50,
        ease: "power3.out",
        duration: 1.2,
        delay: 0.2,
        scrollTrigger: {
          trigger: paragraphRef.current,
          start: "top 85%",
          end: "bottom center",
          toggleActions: "play none none reverse",
          once: true,
        },
      });

      // Staggered entrance for the new dedicated images
      gsap.from(imageRefs.current, {
        opacity: 0,
        scale: 0.8,
        ease: "power3.out",
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: imageRefs.current, // Trigger when first image enters
          start: "top 90%",
          end: "bottom center",
          toggleActions: "play none none reverse",
          once: true,
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-20 md:py-32 lg:py-48 bg-nour-bone-white flex flex-col items-center justify-center overflow-hidden brand-philosophy-section">
      <div className="container mx-auto px-4 max-w-4xl">
        <SplitText
          text="NOURA – a philosophy rooted in calm, clarity, and nourishment, bringing together natural products and modern rituals."
          className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-center leading-tight text-nour-dark-text"
          delay={50}
          duration={0.5}
          ease="power2.out"
          splitType="chars"
          from={{ opacity: 0, y: 20 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          tag="h2"
        />

        <p ref={paragraphRef} className="font-sans text-lg md:text-xl text-center text-nour-dark-text mt-8 max-w-3xl mx-auto opacity-80">
          NOURA invites you to slow down and reconnect with your senses. Each product is crafted not only for its efficacy but for the experience it provides, offering a moment of clarity and calm in a world that moves too quickly. Inspired by elemental beauty and quiet rituals, NOURA seeks to cultivate a sense of intentional care that transcends function, transforming skincare into a serene, nourishing practice. With every touch, NOURA empowers you to embrace the art of presence, allowing you to restore your body and mind with thoughtful simplicity and quiet sophistication.
        </p>

        {/* New dedicated image section */}
        <div className="flex justify-center flex-wrap gap-6 mt-16">
          <div ref={el => (imageRefs.current[0] = el)} className="relative w-full h-80 md:w-64 md:h-64 overflow-hidden rounded-lg shadow-lg">
            <Image
              src="/brand-assets/noura-philosophy-1.jpg"
              alt="Skincare texture detail"
              fill
              sizes="(width: full) 100vw"
              className="object-cover"
              loading="lazy"
            />
          </div>
          
        </div>
      </div>
    </section>
  );
}