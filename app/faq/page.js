// app/faq/page.js
'use client';

import React, { useState, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from '../components/ui/SplitText'; // Adjust path if necessary
import Link from 'next/link';
import Image from 'next/image';

// FAQ data
const faqs = [
  {
    question: "What is NOURA's philosophy on skincare?",
    answer: "NOURA believes in a holistic approach to beauty, blending potent botanical extracts with scientific innovation. Our philosophy centers on creating skincare rituals that nourish both the skin and the soul, promoting harmony and natural radiance through sustainable and ethically sourced ingredients."
  },
  {
    question: "Are NOURA products suitable for all skin types?",
    answer: "Yes, our formulations are designed with sensitivity in mind and are generally suitable for all skin types, including sensitive, dry, oily, and combination skin. We recommend reviewing the specific ingredients for any known allergies and performing a patch test before full application."
  },
  {
    question: "Are your products cruelty-free and vegan?",
    answer: "All NOURA products are proudly cruelty-free and never tested on animals. Many of our products are vegan-friendly; please check the individual product descriptions for specific vegan certifications. We are continuously working to make our entire line 100% vegan."
  },
  {
    question: "Where do you source your ingredients?",
    answer: "We meticulously source our ingredients from trusted, ethical suppliers worldwide. Our priority is sustainability, purity, and efficacy, ensuring that each botanical extract and active component meets NOURA's high standards and supports responsible farming practices."
  },
  {
    question: "How long does shipping take?",
    answer: "Standard shipping typically takes 3-7 business days within [Your Country/Region]. Expedited shipping options are available at checkout. Please note that processing times may add 1-2 business days to your order. International shipping times vary by destination."
  },
  {
    question: "What is your return policy?",
    answer: "We want you to be completely satisfied with your NOURA purchase. If you are not entirely happy, you may return products within 30 days of purchase for a full refund or exchange. Items must be mostly unused and in their original packaging. Please visit our 'Contact Us' page for detailed instructions on returns."
  }
];

export default function FAQPage() {
  const pageRef = useRef(null); // Ref for the main page container
  const [openQuestion, setOpenQuestion] = useState(null); // State to manage which FAQ is open

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

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

      // Staggered fade-in for FAQ items
      gsap.from(".faq-item", {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        ease: "power3.out",
        duration: 0.6,
        scrollTrigger: {
          trigger: ".faq-list",
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
        {/* FAQ Page Heading with SplitText animation */}
        <SplitText
          text="Your Questions, Our Answers"
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
          text="Find comprehensive answers to the most common inquiries about NOURA products, philosophy, and practices. We're here to provide clarity and support your skincare journey."
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

        {/* FAQ List */}
        <div className="faq-list mt-20 w-full max-w-4xl space-y-6 text-left">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item bg-nour-bone-white rounded-xl shadow-lg border border-nour-soft-neutral">
              <button
                className="w-full flex justify-between items-center p-6 text-nour-deep-olive font-serif text-xl font-bold cursor-pointer focus:outline-none"
                onClick={() => toggleQuestion(index)}
              >
                <span>{faq.question}</span>
                <span className="text-2xl transform transition-transform duration-300">
                  {openQuestion === index ? '−' : '+'}
                </span>
              </button>
              {openQuestion === index && (
                <div className="p-6 pt-0 text-nour-dark-text opacity-80 font-sans text-base leading-relaxed animate-fade-in">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}