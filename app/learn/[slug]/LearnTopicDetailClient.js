// app/learn/[slug]/LearnTopicDetailClient.js
'use client'; // This component is interactive and uses client-side hooks/animations

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import Link from 'next/link';
import Image from 'next/image'; // Ensure Image is imported for topic image
import SplitText from '../../components/ui/SplitText'; // Adjust path

export default function LearnTopicDetailClient({ topic }) {
  const pageRef = useRef(null);

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
  }, [topic]); // Re-run effect if topic prop changes

  return (
    <main ref={pageRef} className="relative w-full bg-nour-bone-white py-16 md:py-24 overflow-hidden min-h-screen">
      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32 flex flex-col items-center relative z-10">
        {topic.imageSrc && ( // Display image if available
          <div className="relative w-full max-w-4xl h-[300px] md:h-[400px] overflow-hidden rounded-xl shadow-lg mb-12">
            <Image
              src={topic.imageSrc}
              alt={topic.title}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </div>
        )}

        <SplitText
          text={topic.title}
          className="font-serif text-5xl md:text-6xl font-bold text-nour-deep-olive leading-tight mb-8 text-center max-w-4xl mx-auto"
          delay={0}
          duration={0.7}
          ease="power3.out"
          splitType="words,chars"
          from={{ opacity: 0, y: -20 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          tag="h1"
        />

        {/* Dynamic content rendering from HTML string */}
        <div 
          className="mt-12 max-w-3xl text-nour-dark-text text-lg leading-relaxed text-left"
          dangerouslySetInnerHTML={{ __html: topic.content }}
        />

        <Link href="/learn" className="mt-16 px-8 py-3 bg-nour-deep-olive text-nour-bone-white text-base font-semibold rounded-full hover:bg-opacity-90 transition-all duration-300">
          &larr; Back to Learn Topics
        </Link>
      </div>
    </main>
  );
}