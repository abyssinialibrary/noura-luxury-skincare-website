// app/about/page.js
'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from '../components/ui/SplitText'; // Adjust path if necessary

export default function AboutPage() {
  const pageRef = useRef(null); // Ref for the main page container

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Basic ScrollTrigger for the main content to fade in
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
    <main ref={pageRef} className="relative w-full bg-nour-bone-white py-16 md:py-24 overflow-hidden min-h-screen flex flex-col items-center">
      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32 flex flex-col justify-center items-center text-center relative z-10">
        {/* About Page Heading with SplitText animation */}
        <SplitText
          text="Our Story: The Essence of NOURA"
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
          text="NOURA was born from a deep reverence for the earth's bounty and a commitment to timeless beauty rituals. We believe true radiance comes from harmony, both within ourselves and with nature. Our journey began with a simple vision: to craft skincare that nourishes the soul as much as the skin."
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

        {/* Additional content - standard paragraphs */}
        <div className="mt-16 max-w-3xl text-nour-dark-text text-lg leading-relaxed text-left">
          <p className="mb-8">
            Each NOURA formulation is a testament to purity and efficacy, meticulously developed using potent botanical extracts, rare essential oils, and advanced scientific research. We source our ingredients ethically, ensuring sustainability and supporting local communities. Our commitment extends beyond exceptional products to fostering a mindful approach to self-care, encouraging a moment of pause and reflection in your daily routine.
          </p>
          <p className="mb-8">
            From our serene laboratories to your personal ritual, every step is infused with intention and care. We invite you to experience the NOURA difference – a journey to luminous skin and an awakened spirit.
          </p>
        </div>
      </div>
    </main>
  );
}