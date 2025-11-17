// components/utils/BodyClassManager.js
'use client'; // This component must be a client component

import { useEffect } from 'react';

export default function BodyClassManager({ isMobileMenuOpen }) {
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('mobile-menu-open');
    } else {
      document.body.classList.remove('mobile-menu-open');
    }
    // Cleanup function: remove class when component unmounts or isMobileMenuOpen becomes false
    return () => {
      document.body.classList.remove('mobile-menu-open');
    };
  }, [isMobileMenuOpen]); // Re-run effect when isMobileMenuOpen changes

  return null; // This component doesn't render any visible UI
}