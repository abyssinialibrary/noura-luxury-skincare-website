// app/privacy-policy/page.js
'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from '../components/ui/SplitText'; // Adjust path if necessary
import Image from 'next/image';

export default function PrivacyPolicyPage() {
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
          text="Privacy Policy"
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
          text="Your privacy is paramount to NOURA. This policy outlines how we collect, use, and protect your personal information."
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
          <h2 className="font-serif text-3xl font-bold text-nour-deep-olive mb-4">1. Information We Collect</h2>
          <p className="mb-8">
            We collect information you provide directly to us, such as when you create an account, place an order, sign up for our newsletter, or contact us. This may include your name, email address, shipping address, billing address, phone number, and payment information.
          </p>

          <h2 className="font-serif text-3xl font-bold text-nour-deep-olive mb-4">2. How We Use Your Information</h2>
          <p className="mb-8">
            We use the information we collect to: process and fulfill your orders; communicate with you about your orders, products, services, and promotions; personalize your experience on our site; improve our website and services; and detect and prevent fraud or other prohibited activities.
          </p>

          <h2 className="font-serif text-3xl font-bold text-nour-deep-olive mb-4">3. Sharing of Information</h2>
          <p className="mb-8">
            We do not share your personal information with third parties except as necessary to fulfill your order (e.g., shipping partners, payment processors), comply with the law, or protect our rights. We do not sell your personal information.
          </p>
          
          <h2 className="font-serif text-3xl font-bold text-nour-deep-olive mb-4">4. Data Security</h2>
          <p className="mb-8">
            We implement a variety of security measures to maintain the safety of your personal information when you place an order or enter, submit, or access your personal information.
          </p>

          <h2 className="font-serif text-3xl font-bold text-nour-deep-olive mb-4">5. Your Choices</h2>
          <p className="mb-8">
            You may review, update, or delete your account information at any time by logging into your account. You can also unsubscribe from our marketing emails by following the instructions in those emails.
          </p>
          
          <h2 className="font-serif text-3xl font-bold text-nour-deep-olive mb-4">6. Changes to This Policy</h2>
          <p className="mb-8">
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
          </p>
        </div>
      </div>
    </main>
  );
}