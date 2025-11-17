// app/components/layout/Header.js
'use client';

import Link from 'next/link';
import { useState, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import BodyClassManager from '../utils/BodyClassManager'; // Still needed for body overflow

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileNavOverlayRef = useRef(null); // Ref for the full-screen mobile nav overlay
  const mobileNavContentRef = useRef(null); // Ref for the actual menu content (links, social)
  const menuOpenerRef = useRef(null); // Ref for the hamburger icon
  const mobileNavLinksRef = useRef([]); // Ref for all mobile nav links

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Hamburger icon animation
      const spans = menuOpenerRef.current.children;
      if (isMobileMenuOpen) {
        gsap.to(spans[0], { y: 6.5, rotate: 45, duration: 0.3, ease: "power2.out" });
        gsap.to(spans[1], { opacity: 0, duration: 0.3, ease: "power2.out" }); // Fade middle bar
        gsap.to(spans[2], { y: -6.5, rotate: -45, duration: 0.3, ease: "power2.out" });

        // Full-screen mobile menu reveal animation
        gsap.fromTo(mobileNavOverlayRef.current,
          { opacity: 0, x: '-100%' }, // Start off-screen left, invisible
          { opacity: 1, x: '0%', duration: 0.5, ease: "power3.out", display: 'block',
            onStart: () => {
              // Ensure content is visible but scrolled to top if there's internal scroll
              gsap.set(mobileNavContentRef.current, { y: 0, opacity: 1, height: '100%' }); 
              gsap.set(mobileNavOverlayRef.current, { pointerEvents: 'auto' });
            }
          }
        );
        // Staggered reveal of actual menu items
        gsap.fromTo(mobileNavLinksRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.4, ease: "power2.out", delay: 0.3 }
        );

      } else {
        // Full-screen mobile menu hide animation
        gsap.to(mobileNavLinksRef.current, { opacity: 0, y: 20, stagger: 0.05, duration: 0.3, ease: "power2.in" });
        gsap.to(mobileNavOverlayRef.current,
          { opacity: 0, x: '-100%', duration: 0.5, ease: "power3.in", delay: 0.1,
            onComplete: () => {
              gsap.set(mobileNavOverlayRef.current, { display: 'none', pointerEvents: 'none' });
            }
          }
        );

        // Hamburger icon revert animation
        gsap.to(spans[0], { y: 0, rotate: 0, duration: 0.3, ease: "power2.out", delay: 0.1 });
        gsap.to(spans[1], { opacity: 1, duration: 0.3, ease: "power2.out", delay: 0.1 });
        gsap.to(spans[2], { y: 0, rotate: 0, duration: 0.3, ease: "power2.out", delay: 0.1 });
      }
    }, mobileNavOverlayRef); // Scope GSAP to the mobile nav overlay
    return () => ctx.revert();
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <BodyClassManager isMobileMenuOpen={isMobileMenuOpen} />

      {/* --- CRITICAL FIX: Desktop Header Container (Transparent) --- */}
      <div className={`fixed top-0 left-0 right-0 z-50 py-4 px-4 lg:px-8 hidden lg:block`}> {/* Hidden on mobile, visible on desktop. No background, blur, shadow */}
        <div className="container mx-auto relative flex justify-between items-center w-full h-full">
          {/* Desktop Left Nav Group: About, Shop, Learn */}
          <div className="flex-grow flex items-center justify-start">
            <nav className="main-nav bg-nour-soft-neutral/80 backdrop-blur-md rounded-full py-2 px-6 shadow-md">
              <ul className="flex list-none m-0 p-0 space-x-8">
                <li><Link href="/about" className="text-nour-dark-text hover:text-nour-deep-olive transition-colors duration-300">About</Link></li>
                <li><Link href="/shop" className="text-nour-dark-text hover:text-nour-deep-olive transition-colors duration-300">Shop</Link></li>
                <li><Link href="/learn" className="text-nour-dark-text hover:text-nour-deep-olive transition-colors duration-300">Learn</Link></li>
              </ul>
            </nav>
          </div>

          {/* NOURA Logo - Absolute position for "hanging" effect */}
          <div className="absolute left-1/2 transform -translate-x-1/2 -top-4 z-50 pl-6"> {/* Adjusted top for hanging effect and fine-tuned position */}
            <Link href="/" className="flex flex-col items-center justify-center bg-nour-dark/80 backdrop-blur-md rounded-b-[20px] pl-9 pr-7 py-3 shadow-xl">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45" className="h-10 w-auto text-nour-bone-white"> {/* Changed text color for contrast */}
                  <g className="logo-icon" transform="translate(-24.72 -24.46)">
                    <path d="M7296.14-10581.615v0l7.868-6.383a10.128,10.128,0,0,1-1.488,14.251l0,0-7.868,6.38A10.137,10.137,0,0,1,7296.14-10581.615Z" transform="translate(-7264.877 10612.461)" fill="currentColor"/>
                    <path d="M7296.323-10572.27a33.968,33.968,0,0,1-3.869-.6.077.077,0,0,1-.032-.135c.059-.051.138-.12.236-.21l.609-.519c.741-.638,1.854-1.584,3.175-2.694.476-.4.98-.829,1.515-1.272,2.314-1.927,5.03-4.146,7.451-6.027.415-.324.832-.638,1.233-.933l.236-.178v-.014l.1-.074a31.3,31.3,0,0,1,3.933-2.636c.032-.014.062-.043.09-.059a3.389,3.389,0,0,1,2.2-.327,5.106,5.106,0,0,1,1.36.45h0l2.227,1.018c.191.088.12.486-.085.54a2.975,2.975,0,0,0-2.27,2.474l.005-.166a14.774,14.774,0,0,1-1,3.487c-.165.386-.343.758-.534,1.127a.015.015,0,0,0-.016.016,12.9,12.9,0,0,1-3.295,3.98c-2.82,2.3-6.809,2.9-10.241,2.9C7298.269-10572.124,7297.242-10572.184,7296.323-10572.27Z" transform="translate(-7267.675 10623.668)" fill="currentColor"/>
                  </g>
              </svg>
              <span className="sr-only">NOURA</span>
            </Link>
          </div>
          
          {/* Desktop Right Nav Group: Account and Cart */}
          <div className="flex-grow flex items-center justify-end">
            <nav className="bg-nour-soft-neutral/80 backdrop-blur-md rounded-full py-2 px-6 shadow-md">
                <ul className="flex list-none m-0 p-0 space-x-4">
                  <li>
                    <Link href="/account" className="text-nour-dark-text hover:text-nour-deep-olive transition-colors duration-300">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <ellipse cx="12" cy="17.5" rx="7" ry="3.5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                        <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                      </svg>
                      <span className="sr-only">Account</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/cart" className="text-nour-dark-text hover:text-nour-deep-olive transition-colors duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" width="23.998" height="19.943" viewBox="0 0 23.998 19.943" fill="currentColor">
                        <path d="M17522.488,7115.44a.784.784,0,0,1-.766-.625l-2.217-10.716h-.412a.781.781,0,1,1,0-1.562h2.643c.016-.047.035-.1.057-.145l3.125-6.452a.78.78,0,1,1,1.4.681l-2.865,5.916h13.7l-2.865-5.916a.783.783,0,0,1,1.41-.681l3.125,6.452a.8.8,0,0,1,.051.145h2.648a.781.781,0,0,1,0,1.563h-.416l-2.215,10.716a.788.788,0,0,1-.77.625Zm.637-1.565h14.365l2.025-9.775H17521.1Zm10.313-3.253v-3.783a.781.781,0,1,1,1.563,0v3.783a.781.781,0,0,1-1.562,0Zm-3.912,0v-3.783a.782.782,0,1,1,1.564,0v3.783a.782.782,0,0,1-1.564,0Zm-3.908,0v-3.783a.781.781,0,1,1,1.563,0v3.783a.781.781,0,0,1-1.562,0Z" transform="translate(-17518.311 -7095.497)" />
                      </svg>
                      <span className="sr-only">Cart</span>
                    </Link>
                  </li>
                </ul>
            </nav>
          </div>
        </div>
      </div>
      {/* --- END CRITICAL FIX: Desktop Header Container (Transparent) --- */}


      {/* --- CRITICAL FIX: Mobile Header Container (Original styling) --- */}
      <div className={`fixed top-0 left-0 right-0 z-50 py-4 px-4 lg:px-8 bg-nour-bone-white/80 backdrop-blur-md shadow-sm lg:hidden`}> {/* Visible only on mobile, original styling */}
        <div className="container mx-auto flex justify-between items-center w-full">
          {/* Mobile Menu Opener */}
          <div className="z-50"> {/* Removed lg:hidden here, as parent div is hidden on lg */}
            <button ref={menuOpenerRef} onClick={toggleMobileMenu} className="flex flex-col gap-1.5 p-2 focus:outline-none relative w-6 h-6 justify-center">
              <span className="block w-6 h-0.5 bg-nour-dark-text absolute left-0 top-0.5"></span>
              <span className="block w-6 h-0.5 bg-nour-dark-text absolute left-0 top-1/2 -translate-y-1/2"></span>
              <span className="block w-6 h-0.5 bg-nour-dark-text absolute left-0 bottom-0.5"></span>
            </button>
          </div>
          <div className="flex-grow flex items-center justify-end">                
            <ul className="flex list-none m-0 p-0 space-x-4">
                  <li>
                    <Link href="/account" className="text-nour-dark-text hover:text-nour-deep-olive transition-colors duration-300">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <ellipse cx="12" cy="17.5" rx="7" ry="3.5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                        <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                      </svg>
                      <span className="sr-only">Account</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/cart" className="text-nour-dark-text hover:text-nour-deep-olive transition-colors duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" width="23.998" height="19.943" viewBox="0 0 23.998 19.943" fill="currentColor">
                        <path d="M17522.488,7115.44a.784.784,0,0,1-.766-.625l-2.217-10.716h-.412a.781.781,0,1,1,0-1.562h2.643c.016-.047.035-.1.057-.145l3.125-6.452a.78.78,0,1,1,1.4.681l-2.865,5.916h13.7l-2.865-5.916a.783.783,0,0,1,1.41-.681l3.125,6.452a.8.8,0,0,1,.051.145h2.648a.781.781,0,0,1,0,1.563h-.416l-2.215,10.716a.788.788,0,0,1-.77.625Zm.637-1.565h14.365l2.025-9.775H17521.1Zm10.313-3.253v-3.783a.781.781,0,1,1,1.563,0v3.783a.781.781,0,0,1-1.562,0Zm-3.912,0v-3.783a.782.782,0,1,1,1.564,0v3.783a.782.782,0,0,1-1.564,0Zm-3.908,0v-3.783a.781.781,0,1,1,1.563,0v3.783a.781.781,0,0,1-1.562,0Z" transform="translate(-17518.311 -7095.497)" />
                      </svg>
                      <span className="sr-only">Cart</span>
                    </Link>
                  </li>
                </ul>
          </div>

          {/* NOURA Logo for Mobile - Always centered for mobile */}
          <div className="absolute left-1/2  -translate-x-1/2 pt-4">
            <Link href="/">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45" className="h-10 w-auto text-nour-deep-olive">
                  <g className="logo-icon" transform="translate(-24.72 -24.46)">
                    <path d="M7296.14-10581.615v0l7.868-6.383a10.128,10.128,0,0,1-1.488,14.251l0,0-7.868,6.38A10.137,10.137,0,0,1,7296.14-10581.615Z" transform="translate(-7264.877 10612.461)" fill="currentColor"/>
                    <path d="M7296.323-10572.27a33.968,33.968,0,0,1-3.869-.6.077.077,0,0,1-.032-.135c.059-.051.138-.12.236-.21l.609-.519c.741-.638,1.854-1.584,3.175-2.694.476-.4.98-.829,1.515-1.272,2.314-1.927,5.03-4.146,7.451-6.027.415-.324.832-.638,1.233-.933l.236-.178v-.014l.1-.074a31.3,31.3,0,0,1,3.933-2.636c.032-.014.062-.043.09-.059a3.389,3.389,0,0,1,2.2-.327,5.106,5.106,0,0,1,1.36.45h0l2.227,1.018c.191.088.12.486-.085.54a2.975,2.975,0,0,0-2.27,2.474l.005-.166a14.774,14.774,0,0,1-1,3.487c-.165.386-.343.758-.534,1.127a.015.015,0,0,0-.016.016,12.9,12.9,0,0,1-3.295,3.98c-2.82,2.3-6.809,2.9-10.241,2.9C7298.269-10572.124,7297.242-10572.184,7296.323-10572.27Z" transform="translate(-7267.675 10623.668)" fill="currentColor"/>
                  </g>
              </svg>
              <span className="sr-only">NOURA</span>
            </Link>
          </div>
          
          {/* Right Navigation (Account and Cart) for Mobile - empty for mobile, pushed by logo */}
          <div className="w-6 h-6"> {/* Placeholder for symmetry with hamburger */}
          </div>
        </div>
      </div>
      {/* --- END CRITICAL FIX: Mobile Header Container (Original styling) --- */}


      {/* Full-screen Mobile Navigation Overlay - This part is untouched */}
      <div ref={mobileNavOverlayRef} className={`fixed inset-0 w-full h-screen bg-nour-bone-white z-[90] flex flex-col justify-start items-center p-8 overflow-y-auto ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <button onClick={closeMobileMenu} className="absolute top-6 right-6 text-nour-dark-text text-2xl font-bold p-2 z-[100]">
          &times;
        </button>

        <div ref={mobileNavContentRef} className="flex flex-col items-center w-full mt-20"> {/* Content starts below header */}
            <nav className="w-full text-center mb-8">
                <ul className="flex flex-col space-y-6">
                    <li ref={el => mobileNavLinksRef.current[0] = el}>
                        <Link href="/" onClick={closeMobileMenu} className="text-nour-dark-text font-serif text-3xl font-semibold hover:text-nour-deep-olive transition-colors duration-200 block py-2">
                            Home
                        </Link>
                    </li>
                    <li ref={el => mobileNavLinksRef.current[1] = el}>
                        <Link href="/about" onClick={closeMobileMenu} className="text-nour-dark-text font-serif text-3xl font-semibold hover:text-nour-deep-olive transition-colors duration-200 block py-2">
                            About
                        </Link>
                    </li>
                    <li ref={el => mobileNavLinksRef.current[2] = el}>
                        <Link href="/shop" onClick={closeMobileMenu} className="text-nour-dark-text font-serif text-3xl font-semibold hover:text-nour-deep-olive transition-colors duration-200 block py-2">
                            Shop
                        </Link>
                    </li>
                    <li ref={el => mobileNavLinksRef.current[3] = el}>
                        <Link href="/learn" onClick={closeMobileMenu} className="text-nour-dark-text font-serif text-3xl font-semibold hover:text-nour-deep-olive transition-colors duration-200 block py-2">
                            Learn
                        </Link>
                    </li>
                    <li ref={el => mobileNavLinksRef.current[4] = el}>
                        <Link href="/faq" onClick={closeMobileMenu} className="text-nour-dark-text font-serif text-3xl font-semibold hover:text-nour-deep-olive transition-colors duration-200 block py-2">
                            FAQ
                        </Link>
                    </li>
                </ul>
            </nav>

            {/* Social Links for Mobile Menu */}
            <div className="mt-auto pt-8 border-t border-nour-soft-neutral w-full text-center">
                <h4 className="font-sans text-lg font-semibold text-nour-deep-olive mb-4">Social</h4>
                <ul className="flex flex-col space-y-2">
                    <li ref={el => mobileNavLinksRef.current[5] = el}>
                        <a href="https://www.instagram.com/yournourabrand" target="_blank" rel="noopener noreferrer" onClick={closeMobileMenu} className="text-nour-dark-text font-sans text-lg hover:text-nour-deep-olive transition-colors duration-200 block">
                            Instagram
                        </a>
                    </li>
                    <li ref={el => mobileNavLinksRef.current[6] = el}>
                        <a href="https://www.facebook.com/yournourabrand" target="_blank" rel="noopener noreferrer" onClick={closeMobileMenu} className="text-nour-dark-text font-sans text-lg hover:text-nour-deep-olive transition-colors duration-200 block">
                            Facebook
                        </a>
                    </li>
                    <li ref={el => mobileNavLinksRef.current[7] = el}>
                        <a href="https://www.tiktok.com/@yournourabrand" target="_blank" rel="noopener noreferrer" onClick={closeMobileMenu} className="text-nour-dark-text font-sans text-lg hover:text-nour-deep-olive transition-colors duration-200 block">
                            TikTok
                        </a>
                    </li>
                    <li ref={el => mobileNavLinksRef.current[8] = el}>
                        <a href="https://www.linkedin.com/company/yournourabrand" target="_blank" rel="noopener noreferrer" onClick={closeMobileMenu} className="text-nour-dark-text font-sans text-lg hover:text-nour-deep-olive transition-colors duration-200 block">
                            LinkedIn
                        </a>
                    </li>
                </ul>
            </div>
        </div>
      </div>
    </>
  );
}