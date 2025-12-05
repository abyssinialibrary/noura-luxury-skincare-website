// app/terms-of-service/page.js
'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from '../components/ui/SplitText'; // Adjust path if necessary
import Image from 'next/image';

export default function TermsOfServicePage() {
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
    <main ref={pageRef} className="relative w-full bg-nour-bone-white py-16 md:py-24 overflow-hidden min-h-screen flex flex-col items-center">
      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32 flex flex-col justify-center items-center text-center relative z-10">
        <SplitText
          text="Terms of Service"
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
          text="Welcome to NOURA. By accessing or using our website, you agree to comply with and be bound by these Terms of Service. Please review them carefully."
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

        <div className="mt-16 max-w-3xl text-nour-dark-text text-lg leading-relaxed text-left">
          <h2 className="font-serif text-3xl font-bold text-nour-deep-olive mb-4">1. Acceptance of Terms</h2>
          <p className="mb-8">
            By using the NOURA website, you agree to these Terms of Service and to our Privacy Policy. If you do not agree to these terms, you should not use our site. We reserve the right to modify these terms at any time.
          </p>

          <h2 className="font-serif text-3xl font-bold text-nour-deep-olive mb-4">2. Use of the Site</h2>
          <p className="mb-8">
            You agree to use the NOURA website for lawful purposes only and in a way that does not infringe the rights of, restrict or inhibit anyone else's use and enjoyment of the site. Prohibited behavior includes harassing or causing distress or inconvenience to any other user, transmitting obscene or offensive content, or disrupting the normal flow of dialogue within our site.
          </p>

          <h2 className="font-serif text-3xl font-bold text-nour-deep-olive mb-4">3. Product Information</h2>
          <p className="mb-8">
            NOURA strives to provide accurate product descriptions and images. However, we do not warrant that product descriptions or other content on the site are accurate, complete, reliable, current, or error-free. If a product offered by NOURA is not as described, your sole remedy is to return it in unused condition.
          </p>
          
          <h2 className="font-serif text-3xl font-bold text-nour-deep-olive mb-4">4. Intellectual Property</h2>
          <p className="mb-8">
            All content included on this site, such as text, graphics, logos, images, digital downloads, and software, is the property of NOURA or its content suppliers and protected by international copyright laws.
          </p>

          <h2 className="font-serif text-3xl font-bold text-nour-deep-olive mb-4">5. Limitation of Liability</h2>
          <p className="mb-8">
            NOURA will not be liable for any damages of any kind arising from the use of this site, including, but not limited to direct, indirect, incidental, punitive, and consequential damages.
          </p>
          
          <h2 className="font-serif text-3xl font-bold text-nour-deep-olive mb-4">6. Governing Law</h2>
          <p className="mb-8">
            These Terms of Service are governed by and construed in accordance with the laws of [Your Jurisdiction].
          </p>
        </div>
      </div>
    </main>
  );
}