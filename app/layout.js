// app/layout.js
// NO 'use client' directive here - it is a Server Component.

import { Inter, Sora } from 'next/font/google';
import './globals.css';
import Header from './components/layouts/Header'; // Header is a Client Component
import Footer from './components/layouts/Footer';
import GSAPProvider from './components/providers/GSAPProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
});

// `export const metadata` is now correctly allowed here.
export const metadata = {
  title: 'NOURA - Light Lives in Ritual',
  description: 'NOURA is a luxury skincare line inspired by elemental beauty and quiet rituals, designed for balance, stillness, and purpose.',
};

export default function RootLayout({ children }) {
  // `isMobileMenuOpen` state and `useEffect` are MOVED from here.
  // Header component will manage its own mobile menu state.

  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <body className="font-sans text-nour-dark-text bg-nour-bone-white">
        <GSAPProvider>
          {/* Header now manages its own state and BodyClassManager */}
          <Header />
          {children}
          <Footer />
        </GSAPProvider>
      </body>
    </html>
  );
}