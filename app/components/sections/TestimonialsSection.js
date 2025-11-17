// components/sections/TestimonialsSection.js
'use client';

import Image from 'next/image';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function TestimonialsSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const scrollWrapRef = useRef(null); // The wrapper that handles the overflow

  const testimonials = [
    {
      id: 1,
      type: 'text',
      quote: 'NOURA has elevated my daily routine. The subtle scents and luxurious textures provide a true moment of peace.',
      customer: 'Amelia S.',
      location: 'London, UK',
      initials: 'AS',
      bgColor: 'bg-nour-bone-white',
      textColor: 'text-nour-dark-text',
    },
    {
      id: 2,
      type: 'text',
      quote: 'My skin has never felt more balanced and radiant. NOURA isn\'t just skincare; it\'s a profound ritual.',
      customer: 'Julian T.',
      location: 'New York, NY',
      initials: 'JT',
      bgColor: 'bg-nour-soft-neutral',
      textColor: 'text-nour-dark-text',
    },
    {
      id: 3,
      type: 'video-placeholder',
      quote: 'The clarity and stillness I find with NOURA are unmatched. Each application feels intentional and nourishing.',
      customer: 'Olivia R.',
      location: 'Paris, France',
      initials: 'OR',
      videoThumbnail: '/brand-assets/noura-philosophy-2.jpg',
      bgColor: 'bg-nour-dark-text',
      textColor: 'text-nour-bone-white',
    },
     {
      id: 4,
      type: 'text',
      quote: 'Finally, a skincare line that truly understands the connection between wellness and beauty. NOURA is my sanctuary.',
      customer: 'David K.',
      location: 'Los Angeles, CA',
      initials: 'DK',
      bgColor: 'bg-nour-bone-white',
      textColor: 'text-nour-dark-text',
    },
     {
      id: 5,
      type: 'text',
      quote: 'Every NOURA product is a little luxury, a small act of self-care that makes a big difference.',
      customer: 'Sophia L.',
      location: 'Berlin, Germany',
      initials: 'SL',
      bgColor: 'bg-nour-bone-white',
      textColor: 'text-nour-dark-text',
    },
    {
      id: 6,
      type: 'text',
      quote: 'The results are visible and the experience is divine. NOURA has become an indispensable part of my ritual.',
      customer: 'Ethan P.',
      location: 'Sydney, Australia',
      initials: 'EP',
      bgColor: 'bg-nour-soft-neutral',
      textColor: 'text-nour-dark-text',
    },
  ];

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Heading animation (keep as is)
      gsap.from(headingRef.current, {
        opacity: 0,
        y: 50,
        ease: "power3.out",
        duration: 1.2,
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 8%",
          end: "bottom center",
          toggleActions: "play none none reverse",
        },
      });

      // --- GSAP Horizontal Carousel Logic ---
      if (cardsContainerRef.current && scrollWrapRef.current) {
        const cards = gsap.utils.toArray(cardsContainerRef.current.children);
        // We'll duplicate the cards to create a seamless loop illusion
        // Duplicate once to ensure continuous loop
        const clonedCards = cards.map(card => card.cloneNode(true));
        clonedCards.forEach(clone => cardsContainerRef.current.appendChild(clone));

        // Calculate total width of one full set of original cards + gaps
        // This is the distance we need to scroll to get through one loop
        let scrollWidth = 0;
        cards.forEach(card => {
            scrollWidth += card.offsetWidth + (parseInt(gsap.getProperty(card, "marginRight")) || 0); // Add card width + margin
        });
        
        // Remove the extra gap from the last card's margin
        scrollWidth -= (parseInt(gsap.getProperty(cards[cards.length - 1], "marginRight")) || 0);
        // Add the gap from the cards container
        scrollWidth += 8 * 4; // Assuming gap-8 is 2rem = 32px; 8 * 4 is a rough way for 8px per gap, better to calculate dynamically

        // A more robust way to get total width including gaps
        const computedStyle = getComputedStyle(cardsContainerRef.current);
        const gap = parseInt(computedStyle.gap); // Gets the gap value if set via `gap` property in CSS
        const cardWidth = cards[0] ? cards[0].offsetWidth : 0; // Assuming all cards are same width
        const totalCardsOriginal = testimonials.length;
        // The actual scrollable width to go through one full set of unique cards
        const animationDistance = (cardWidth * totalCardsOriginal) + (gap * (totalCardsOriginal - 1));

        gsap.to(cardsContainerRef.current, {
          x: -animationDistance, // Animate x to scroll one full set of original cards
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true, // Pin the section while scrolling horizontally
            scrub: 1,
            start: "center center",
            // The end should make the scrollable area last long enough for the animation
            end: () => "+=" + (window.innerHeight * 2), // Make section long, e.g., 200vh of scroll
            invalidateOnRefresh: true, // Recalculate 'end' on resize
            // Optional: When the animation finishes, instantly jump back to the start of the *cloned* set
            // to create a perfect loop without a visible jump to the user.
            onUpdate: (self) => {
              if (self.progress === 1) {
                gsap.set(cardsContainerRef.current, { x: 0 }); // Reset position
                self.progress = 0; // Reset progress
              }
            }
          },
        });
      }

    }, sectionRef);

    return () => ctx.revert(); // Cleanup GSAP context on unmount
  }, [testimonials]); // Re-run if testimonials data changes

  return (
    <section ref={sectionRef} className="relative w-full py-20 md:py-32 bg-nour-deep-olive overflow-hidden min-h-[150vh]"> {/* min-h for pinning effect */}
      <div className="container mx-auto px-4">
        <h2 ref={headingRef} className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-center leading-tight text-nour-bone-white mb-16">
          Voices of Calm
        </h2>

        {/* Scrollable Wrapper */}
        <div ref={scrollWrapRef} className="relative w-full h-200px ">
          {/* Testimonial Cards Container - This is the actual animated element */}
          {/* Use w-max to ensure it's wide enough.
              Initial x position should be offset to center the first few cards if desired,
              or let them start off-screen to the right. */}
          <div ref={cardsContainerRef} className="flex flex-nowrap items-stretch gap-8 pb-4 w-full"> {/* w-max instead of w-fit for max possible width */}
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className={`flex-shrink-0 w-80 h-48 min-h-[500px] p-6 rounded-lg shadow-md flex flex-col justify-between ${testimonial.bgColor} ${testimonial.textColor}`}>
                {testimonial.type === 'video-placeholder' && testimonial.videoThumbnail && (
                  <div className="relative w-full h-48 mb-4 overflow-hidden rounded-md group">
                    <Image
                      src={testimonial.videoThumbnail}
                      alt={`${testimonial.customer} video testimonial thumbnail`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Play icon overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 group-hover:bg-opacity-20 transition-all duration-300">
                      <svg className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 transition-opacity duration-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                )}

                <p className={`font-sans text-xl italic mb-6 ${testimonial.textColor}`}>
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="flex items-center mt-auto">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-nour-terracotta-gold text-nour-bone-white font-bold text-lg mr-4">
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className={`font-serif font-semibold text-lg leading-tight ${testimonial.textColor}`}>{testimonial.customer}</p>
                    <p className={`font-sans text-sm opacity-80 ${testimonial.textColor}`}>{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}