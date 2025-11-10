// components/providers/GSAPProvider.js
'use client'; // This directive marks the component as a Client Component

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

export default function GSAPProvider({ children }) {
  const root = useRef(); // Ref for the main wrapper to create a GSAP context

  useLayoutEffect(() => {
    // Create a GSAP context to manage all animations within this component tree
    // This is crucial for cleanup when component unmounts, preventing memory leaks
    const ctx = gsap.context(() => {
      // Any global GSAP settings or ScrollTrigger defaults can go here
      // For example, you might set a default ease:
      // gsap.defaults({ ease: "power2.out" });

      // Kill all ScrollTriggers when the component unmounts
      return () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    }, root);

    // Return the cleanup function for when the component unmounts
    return () => ctx.revert();
  }, []); // Run only once on mount

  return (
    <div ref={root}>
      {children}
    </div>
  );
}