// components/sections/BrandPillarsSection.js
'use client';

import Image from 'next/image';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function BrandPillarsSection() {
  const sectionRef = useRef(null);
  const introTextRef = useRef(null); // Ref for the introductory paragraph
  const outroTextRef = useRef(null); // Ref for the concluding paragraph
  const pillarRefs = useRef([]); // Ref for individual pillar h2s

  const pillars = [
    { text: 'Consciously Sourced', highlight: false },
    { text: 'Elemental Beauty', highlight: true },
    { text: 'Quiet Rituals', highlight: false },
    { text: 'Holistic Wellness', highlight: true },
    { text: 'Artisan Crafted', highlight: false },
    { text: 'Sustainable Practices', highlight: true },
  ];

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Intro paragraph animation
      gsap.from(introTextRef.current, {
        opacity: 0,
        y: 50,
        ease: "power3.out",
        duration: 1.2,
        scrollTrigger: {
          trigger: introTextRef.current,
          start: "top 85%",
          end: "bottom center",
          toggleActions: "play none none reverse",
          once: true,
        },
      });

      // Staggered reveal animation for each pillar
      pillarRefs.current.forEach((pillar, index) => {
        gsap.fromTo(pillar,
          {
            opacity: 0,
            y: 50, // Start slightly below
            skewY: 5, // Subtle initial skew
            scaleX: 0.8, // Squish horizontally a bit
            transformOrigin: "left center"
          },
          {
            opacity: 1,
            y: 0,
            skewY: 0,
            scaleX: 1,
            ease: "power3.out",
            duration: 1,
            delay: index * 0.1, // Staggered delay
            scrollTrigger: {
              trigger: pillar,
              start: "top 90%", // When each pillar enters the viewport
              end: "bottom center",
              toggleActions: "play none none reverse",
              once: true,
            },
          }
        );
      });

      // Outro paragraph animation
      gsap.from(outroTextRef.current, {
        opacity: 0,
        y: 50,
        ease: "power3.out",
        duration: 1.2,
        scrollTrigger: {
          trigger: outroTextRef.current,
          start: "top 85%",
          end: "bottom center",
          toggleActions: "play none none reverse",
          once: true,
        },
      });

    }, sectionRef); // Scope to the component's root ref

    return () => ctx.revert(); // Cleanup GSAP context on unmount
  }, [pillars]); // Re-run if pillars data changes

  return (
    <section ref={sectionRef} className="relative w-full py-20 md:py-32 lg:py-48 overflow-hidden bg-nour-deep-olive">
      {/* Background Image */}
      <Image
        src="/brand-assets/nour-pillars-bg.jpg"
        alt="NOURA Brand Pillars Background"
        fill
        sizes="100vw"
        className="object-cover opacity-10 mix-blend-multiply" // Removed hover effect to simplify interaction
        loading="lazy"
      />

      {/* Content Overlay */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <p ref={introTextRef} className="font-sans text-xl md:text-2xl text-nour-bone-white opacity-80 mb-12">#NOURA_philosophy</p>
        
        <div className="space-y-6 md:space-y-8">
          {pillars.map((pillar, index) => (
            <div key={index} className="overflow-hidden"> {/* Container for each pillar */}
              <h2
                ref={el => (pillarRefs.current[index] = el)} // Attach ref to each h2
                className={`font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-none ${pillar.highlight ? 'text-nour-terracotta-gold' : 'text-nour-bone-white'} opacity-90`}
              >
                {pillar.text}
              </h2>
            </div>
          ))}
        </div>

        <p ref={outroTextRef} className="font-sans text-lg md:text-xl text-nour-bone-white opacity-70 mt-12 max-w-2xl mx-auto">
            Every product is a step in a purposeful journey towards skin harmony and inner peace.
        </p>
      </div>
    </section>
  );
}