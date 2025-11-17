// app/learn/page.js
'use client';

import React, { useState, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from '../components/ui/SplitText';
import Link from 'next/link';

export default function LearnPage() {
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

      gsap.from(".learn-topic-card", {
        opacity: 0,
        y: 30,
        stagger: 0.15,
        ease: "power3.out",
        duration: 0.7,
        scrollTrigger: {
          trigger: ".learn-topics-grid",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={pageRef} className="relative w-full bg-nour-bone-white py-16 md:py-24 overflow-hidden min-h-screen flex flex-col items-center">
      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32 flex flex-col justify-center items-center text-center relative z-10">
        <SplitText
          text="Deepen Your Skincare Knowledge"
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
          text="Unlock the secrets to radiant skin with NOURA's curated collection of articles, guides, and insights. Explore effective rituals, understand key ingredients, and embrace a holistic approach to beauty."
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

        <div className="learn-topics-grid mt-20 w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="learn-topic-card bg-nour-bone-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center">
            <h3 className="font-serif text-xl font-bold text-nour-deep-olive mb-2">Skincare Rituals</h3>
            <p className="font-sans text-sm text-nour-dark-text opacity-70 mb-4">Master the art of daily and weekly skincare routines for optimal results.</p>
            <Link href="/learn/rituals" className="mt-4 px-6 py-2 bg-nour-terracotta-gold text-nour-dark-text rounded-full hover:opacity-90 transition">Read More</Link>
          </div>

          <div className="learn-topic-card bg-nour-soft-neutral rounded-xl shadow-lg p-6 flex flex-col items-center text-center">
            <h3 className="font-serif text-xl font-bold text-nour-dark-text mb-2">Ingredient Insights</h3>
            <p className="font-sans text-sm text-nour-dark-text opacity-70 mb-4">Dive deep into the science behind our potent natural and active ingredients.</p>
            <Link href="/learn/ingredients" className="mt-4 px-6 py-2 bg-nour-deep-olive text-nour-bone-white rounded-full hover:opacity-90 transition">Read More</Link>
          </div>

          <div className="learn-topic-card bg-nour-bone-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center">
            <h3 className="font-serif text-xl font-bold text-nour-deep-olive mb-2">Holistic Beauty</h3>
            <p className="font-sans text-sm text-nour-dark-text opacity-70 mb-4">Explore wellness practices that complement your skincare journey for overall radiance.</p>
            <Link href="/learn/holistic" className="mt-4 px-6 py-2 bg-nour-terracotta-gold text-nour-dark-text rounded-full hover:opacity-90 transition">Read More</Link>
          </div>

          <div className="learn-topic-card bg-nour-soft-neutral rounded-xl shadow-lg p-6 flex flex-col items-center text-center">
            <h3 className="font-serif text-xl font-bold text-nour-dark-text mb-2">NOURA Philosophy</h3>
            <p className="font-sans text-sm text-nour-dark-text opacity-70 mb-4">Understand the core values and mission that drive every NOURA creation.</p>
            <Link href="/learn/philosophy" className="mt-4 px-6 py-2 bg-nour-deep-olive text-nour-bone-white rounded-full hover:opacity-90 transition">Read More</Link>
          </div>
        </div>
      </div>
    </main>
  );
}