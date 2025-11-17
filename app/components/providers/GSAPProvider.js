// components/providers/GSAPProvider.js
'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText as GSAPSplitTextPlugin } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, GSAPSplitTextPlugin, useGSAP);


export default function GSAPProvider({ children }) {
  const root = useRef();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      return () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root}>
      {children}
    </div>
  );
}