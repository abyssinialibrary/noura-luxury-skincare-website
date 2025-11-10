// components/ui/SplitText.js
'use client'; // This component will manipulate the DOM, so it needs to be a client component

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText as GSAPSplitText } from 'gsap/SplitText'; // Renamed to avoid conflict
import { useGSAP } from '@gsap/react';

// Register plugins if they haven't been globally registered (good practice to ensure)
gsap.registerPlugin(ScrollTrigger, GSAPSplitText, useGSAP);

const SplitText = ({
  text,
  className = '',
  delay = 100, // Stagger delay per character/word in milliseconds
  duration = 0.6, // Duration for each character/word animation
  ease = 'power3.out',
  splitType = 'chars', // 'chars', 'words', 'lines', or combination e.g., 'chars,words'
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1, // ScrollTrigger threshold
  rootMargin = '-100px', // ScrollTrigger rootMargin
  textAlign = 'center',
  tag = 'p', // HTML tag to render
  onLetterAnimationComplete // Callback when animation completes
}) => {
  const ref = useRef(null);
  const animationCompletedRef = useRef(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    // Check if fonts are already loaded or wait for them
    if (document.fonts.status === 'loaded') {
      setFontsLoaded(true);
    } else {
      document.fonts.ready.then(() => {
        setFontsLoaded(true);
      });
    }
  }, []);

  useGSAP(
    () => {
      if (!ref.current || !text || !fontsLoaded) return;
      const el = ref.current;

      // Revert previous SplitText instance if it exists to prevent duplicates
      if (el._rbsplitInstance) {
        try {
          el._rbsplitInstance.revert();
        } catch (_) {
          /* ignore */
        }
        el._rbsplitInstance = null;
      }

      // Calculate ScrollTrigger start position
      const startPct = (1 - threshold) * 100;
      const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
      const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
      const marginUnit = marginMatch ? marginMatch[2] || 'px' : 'px';
      const sign =
        marginValue === 0
          ? ''
          : marginValue < 0
            ? `-=${Math.abs(marginValue)}${marginUnit}`
            : `+=${marginValue}${marginUnit}`;
      const start = `top ${startPct}%${sign}`;

      let targets; // Elements to animate (chars, words, or lines)
      const assignTargets = self => {
        if (splitType.includes('chars') && self.chars.length) targets = self.chars;
        if (!targets && splitType.includes('words') && self.words.length) targets = self.words;
        if (!targets && splitType.includes('lines') && self.lines.length) targets = self.lines;
        if (!targets) targets = self.chars || self.words || self.lines; // Fallback
      };

      const splitInstance = new GSAPSplitText(el, {
        type: splitType,
        smartWrap: true,
        autoSplit: splitType === 'lines',
        linesClass: 'split-line',
        wordsClass: 'split-word',
        charsClass: 'split-char',
        reduceWhiteSpace: false,
        onSplit: self => {
          assignTargets(self); // Assign targets after splitting
          return gsap.fromTo(
            targets,
            { ...from }, // Start from these properties
            {
              ...to, // Animate to these properties
              duration,
              ease,
              stagger: delay / 1000, // Convert delay to seconds for GSAP
              scrollTrigger: {
                trigger: el,
                start,
                once: true, // Only animate once
                fastScrollEnd: true,
                anticipatePin: 0.4
              },
              onComplete: () => {
                animationCompletedRef.current = true;
                onLetterAnimationComplete?.(); // Call callback if provided
              },
              willChange: 'transform, opacity', // Performance hint
              force3D: true // Performance hint
            }
          );
        }
      });
      el._rbsplitInstance = splitInstance; // Store instance for cleanup

      return () => {
        // Cleanup ScrollTriggers and SplitText instance on unmount
        ScrollTrigger.getAll().forEach(st => {
          if (st.trigger === el) st.kill();
        });
        try {
          splitInstance.revert();
        } catch (_) {
          /* ignore */
        }
        el._rbsplitInstance = null;
      };
    },
    {
      // Dependencies for useGSAP to re-run
      dependencies: [
        text,
        delay,
        duration,
        ease,
        splitType,
        JSON.stringify(from),
        JSON.stringify(to),
        threshold,
        rootMargin,
        fontsLoaded,
        onLetterAnimationComplete
      ],
      scope: ref // Scope GSAP to the ref
    }
  );

  const renderTag = () => {
    const style = {
      textAlign,
      wordWrap: 'break-word',
      willChange: 'transform, opacity' // Performance hint
    };
    // Ensure `split-parent` and `overflow-hidden` are applied to the wrapping element
    // `inline-block` and `whitespace-normal` help with proper splitting
    const classes = `split-parent overflow-hidden inline-block whitespace-normal ${className}`;
    switch (tag) {
      case 'h1':
        return (
          <h1 ref={ref} style={style} className={classes}>
            {text}
          </h1>
        );
      case 'h2':
        return (
          <h2 ref={ref} style={style} className={classes}>
            {text}
          </h2>
        );
      case 'h3':
        return (
          <h3 ref={ref} style={style} className={classes}>
            {text}
          </h3>
        );
      case 'h4':
        return (
          <h4 ref={ref} style={style} className={classes}>
            {text}
          </h4>
        );
      case 'h5':
        return (
          <h5 ref={ref} style={style} className={classes}>
            {text}
          </h5>
        );
      case 'h6':
        return (
          <h6 ref={ref} style={style} className={classes}>
            {text}
          </h6>
        );
      default:
        return (
          <p ref={ref} style={style} className={classes}>
            {text}
          </p>
        );
    }
  };
  return renderTag();
};

export default SplitText;