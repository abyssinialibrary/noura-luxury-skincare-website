// components/ui/ScrollStack.js
'use client';

import { useLayoutEffect, useRef, useCallback, useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import React from 'react';

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

function lerp(p1, p2, t) {
  return p1 + (p2 - p1) * t;
}

function autoBind(instance) {
  const proto = Object.getPrototypeOf(instance);
  Object.getOwnPropertyNames(proto).forEach(key => {
    if (key !== 'constructor' && typeof instance[key] === 'function') {
      instance[key] = instance[key].bind(instance);
    }
  });
}

export const ScrollStackItem = ({ children, itemClassName = '', onClick, dataProductId }) => (
  <div
    className={`scroll-stack-card relative w-full h-80 my-8 p-6 md:p-12 rounded-[40px] shadow-[0_0_30px_rgba(0,0,0,0.1)] box-border origin-top will-change-transform cursor-pointer ${itemClassName}`.trim()}
    style={{
      transformStyle: 'preserve-3d'
    }}
    onClick={onClick}
    data-product-id={dataProductId}
  >
    {children}
  </div>
);

const ScrollStack = ({
  children,
  className = '',
  itemDistance = 100, // Distance between items when not stacked
  itemScale = 0.03,   // How much each item scales down in the stack
  itemStackDistance = 30, // Vertical distance between stacked items (can be negative for overlap)
  stackPosition = '20%', // Where the top card "pins" on the screen (from top of viewport)
  scaleEndPosition = '10%', // When scaling/rotation animation finishes for a card
  baseScale = 0.85,   // Smallest scale for items deepest in the stack
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = true,
  onStackComplete,
  scaleDuration
}) => {
  const scrollerRef = useRef(null);
  const stackCompletedRef = useRef(false);
  const animationFrameRef = useRef(null);
  const lenisRef = useRef(null);
  const cardsRef = useRef([]); // This ref must be correctly populated
  const lastTransformsRef = useRef(new Map());
  const isUpdatingRef = useRef(false);
  const [activeCardId, setActiveCardId] = useState(null);

  const pauseStack = useCallback(() => {
    if (lenisRef.current) {
      lenisRef.current.stop();
    }
  }, []);

  const resumeStack = useCallback(() => {
    if (lenisRef.current) {
      lenisRef.current.start();
    }
  }, []);

  const handleCardClick = useCallback((productId) => {
    if (activeCardId === productId) {
      setActiveCardId(null);
      gsap.to(document.body, { overflow: 'auto', duration: 0.3 });
      resumeStack();

      cardsRef.current.forEach(card => {
        gsap.to(card, { opacity: 1, duration: 0.3 });
      });
    } else {
      setActiveCardId(productId);
      gsap.to(document.body, { overflow: 'hidden', duration: 0.3 });
      pauseStack();

      const clickedCard = cardsRef.current.find(card => card.dataset.productId == productId);
      if (clickedCard) {
        gsap.set(clickedCard, { clearProps: "transform,filter" });
        gsap.to(clickedCard, {
          x: 0,
          y: (window.innerHeight / 2) - (clickedCard.offsetHeight / 2), // Center vertically in viewport
          scale: 1,
          rotation: 0,
          filter: "blur(0px)",
          zIndex: 1000,
          ease: "power3.out",
          duration: 0.8,
        });

        cardsRef.current.forEach(card => {
          if (card.dataset.productId != productId) {
            gsap.to(card, { opacity: 0, duration: 0.3 });
          }
        });
      }
    }
  }, [activeCardId, pauseStack, resumeStack]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (activeCardId && !event.target.closest('.scroll-stack-card[data-product-id="'+activeCardId+'"]')) {
        setActiveCardId(null);
        gsap.to(document.body, { overflow: 'auto', duration: 0.3 });
        resumeStack();

        cardsRef.current.forEach(card => {
          gsap.to(card, { opacity: 1, duration: 0.3 });
        });
      }
    };

    if (activeCardId) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('touchstart', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, [activeCardId, resumeStack]);


  const calculateProgress = useCallback((scrollTop, start, end) => {
    return Math.max(0, Math.min(1, (scrollTop - start) / (end - start)));
  }, []);

  const parsePercentage = useCallback((value, containerHeight) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value);
  }, []);

  const getScrollData = useCallback(() => {
    return {
      scrollTop: window.scrollY,
      containerHeight: window.innerHeight,
      scrollContainer: document.documentElement
    };
  }, []);

  const getElementOffset = useCallback(
    element => {
      if (!element) return 0; // Handle null element
      const rect = element.getBoundingClientRect();
      return rect.top + window.scrollY;
    },
    []
  );

  const updateCardTransforms = useCallback(() => {
    // CRITICAL FIX: Ensure cardsRef.current is populated before proceeding
    if (cardsRef.current.length === 0 || isUpdatingRef.current || activeCardId !== null) return;

    isUpdatingRef.current = true;

    const { scrollTop, containerHeight } = getScrollData();
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);

    // --- CRITICAL FIX: REVISED pinEnd CALCULATION for robustness ---
    // Calculate total height of the stack, plus a buffer
    const cardHeight = cardsRef.current[0].offsetHeight; // Assuming all cards are same height
    const totalStackAnimationHeight = (cardsRef.current.length - 1) * Math.abs(itemStackDistance); // Total vertical travel distance for cards to stack
    const pinEnd = getElementOffset(cardsRef.current[0]) + totalStackAnimationHeight + (containerHeight * 0.5); // Add buffer of half viewport height
    // --- END REVISED pinEnd CALCULATION ---


    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const cardTop = getElementOffset(card);
      // --- CRITICAL FIX: triggerStart must account for previous cards' stacking ---
      const triggerStart = cardTop - stackPositionPx + (i * itemStackDistance);
      const triggerEnd = triggerStart - scaleEndPositionPx; // Scale/rot ends relative to its trigger start
      // --- END CRITICAL FIX: triggerStart ---
      
      const scrollProgressForCard = calculateProgress(scrollTop, triggerStart, pinEnd); // Progress from its trigger to the very end of stack
      
      // --- CRITICAL FIX: REVISED SCALING LOGIC ---
      const baseCardScale = lerp(1, baseScale, scrollProgressForCard); // Scale from 1 to baseScale over its scroll journey
      const finalScale = baseCardScale - (i * itemScale); // Further reduce scale for cards deeper in stack
      // Ensure scale is clamped appropriately
      const clampedScale = Math.max(baseScale, Math.min(1, finalScale));
      // --- END REVISED SCALING LOGIC ---

      // --- CRITICAL FIX: REVISED ROTATION LOGIC (should be based on depth in stack) ---
      const rotation = rotationAmount ? lerp(0, rotationAmount, scrollProgressForCard) : 0;
      const finalRotation = (i % 2 === 0 ? rotation : -rotation);
      // --- END REVISED ROTATION LOGIC ---
      
      let blur = 0;
      if (blurAmount > 0) {
        // Blur increases with visual depth, but only when actively stacked
        const currentCardStackProgress = calculateProgress(scrollTop, triggerStart, triggerStart + Math.abs(itemStackDistance)); // Progress of this card entering its stack spot
        const depthInStack = Math.floor(currentCardStackProgress); // 0, 1, 2...
        
        if (scrollTop > triggerStart) { // Only blur if card has started to enter the stack
          blur = blurAmount * (cardsRef.current.length - 1 - i); // Blur more for earlier cards (deeper in visual stack)
          blur = Math.min(blur, blurAmount * (cardsRef.current.length - 1)); // Cap blur
        } else {
          blur = 0; // No blur if not yet in stack
        }
      }
      blur = Math.round(blur * 100) / 100;


      let translateY = 0;
      // --- CRITICAL FIX: translateY logic for consistent stacking and unstacking ---
      if (scrollTop < triggerStart) { // Before card starts stacking
          translateY = 0;
      } else if (scrollTop > pinEnd) { // After the whole stack animation is over
          translateY = pinEnd - cardTop + stackPositionPx + (i * itemStackDistance);
      } else { // While in the active stack phase
          translateY = scrollTop - cardTop + stackPositionPx + (i * itemStackDistance);
      }
      // --- END CRITICAL FIX: translateY ---


      const newTransform = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(clampedScale * 1000) / 1000,
        rotation: Math.round(finalRotation * 100) / 100,
        blur: blur
      };

      const lastTransform = lastTransformsRef.current.get(i);
      const hasChanged =
        !lastTransform ||
        Math.abs(lastTransform.translateY - newTransform.translateY) > 0.1 ||
        Math.abs(lastTransform.scale - newTransform.scale) > 0.001 ||
        Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1 ||
        Math.abs(lastTransform.blur - newTransform.blur) > 0.1;

      if (hasChanged) {
        const transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
        const filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : '';

        gsap.to(card, {
          duration: 0.1,
          ease: "none",
          transform: transform,
          filter: filter,
          overwrite: true,
          zIndex: i + (activeCardId === card.dataset.productId ? 1000 : 0) // Lowest i is deepest, highest i is top
        });

        lastTransformsRef.current.set(i, newTransform);
      }
    });

    isUpdatingRef.current = false;
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    onStackComplete,
    calculateProgress,
    parsePercentage,
    getScrollData,
    getElementOffset,
    activeCardId
  ]);

  const handleScroll = useCallback(() => {
    updateCardTransforms();
  }, [updateCardTransforms]);

  const setupLenis = useCallback(() => {
    if (lenisRef.current) {
      lenisRef.current.destroy();
      lenisRef.current = null;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
      infinite: false,
      wheelMultiplier: 1,
      lerp: 0.1,
      syncTouch: true,
      syncTouchLerp: 0.075
    });

    lenis.on('scroll', handleScroll);

    const raf = time => {
      lenis.raf(time);
      animationFrameRef.current = requestAnimationFrame(raf);
    };
    animationFrameRef.current = requestAnimationFrame(raf);

    lenisRef.current = lenis;
    return lenis;
  }, [handleScroll]);

  useLayoutEffect(() => {
    // --- CRITICAL FIX: Ensure cardsRef.current is populated with actual DOM elements ---
    const currentCards = Array.from(scrollerRef.current ? scrollerRef.current.querySelectorAll('.scroll-stack-card') : document.querySelectorAll('.scroll-stack-card'));
    cardsRef.current = currentCards;
    // --- END CRITICAL FIX: cardsRef.current population ---
    
    cardsRef.current.forEach((card, i) => {
      if (!card) return; // Ensure card exists

      card.style.marginBottom = `${itemDistance}px`;
      card.style.willChange = 'transform, filter';
      card.style.transformOrigin = 'top center';
      card.style.transform = 'translateZ(0)';
      card.style.webkitTransform = 'translateZ(0)';
      card.style.perspective = '1000px';
      card.style.webkitPerspective = '1000px';
      card.dataset.productId = children[i]?.props?.children?.props?.product?.id;
    });

    setupLenis();

    updateCardTransforms();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
      stackCompletedRef.current = false;
      cardsRef.current = [];
      lastTransformsRef.current.clear();
      isUpdatingRef.current = false;
    };
  }, [
    itemDistance,
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    scaleDuration,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    onStackComplete,
    setupLenis,
    updateCardTransforms,
    children // Ensure re-run if children change
  ]);

  return (
    <div className={`relative w-full ${className}`.trim()} style={{
      overscrollBehavior: 'contain',
      WebkitOverflowScrolling: 'touch',
      WebkitTransform: 'translateZ(0)',
      transform: 'translateZ(0)'
    }}>
      <div className="scroll-stack-inner pt-[20vh] px-4 sm:px-12 md:px-20 pb-[150vh] min-h-screen">
        {React.Children.map(children, (child, index) =>
          React.cloneElement(child, { onClick: () => handleCardClick(child?.props?.children?.props?.product?.id), dataProductId: child?.props?.children?.props?.product?.id })
        )}
        <div className="scroll-stack-end w-full h-px" />
      </div>
    </div>
  );
};

export default ScrollStack;