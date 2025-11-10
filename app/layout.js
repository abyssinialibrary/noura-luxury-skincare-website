// app/layout.js
import { Inter, Sora } from 'next/font/google';
import './globals.css';
import Header from '../components/layouts/Header';
import Footer from '../components/layouts/Footer';
import GSAPProvider from '../components/providers/GSAPProvider';

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

export const metadata = {
  title: 'NOURA - Light Lives in Ritual',
  description: 'NOURA is a luxury skincare line inspired by elemental beauty and quiet rituals, designed for balance, stillness, and purpose.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <body className="font-sans text-nour-dark-text bg-nour-bone-white">
        <GSAPProvider>
          <Header />
          {children}
          <Footer />
        </GSAPProvider>
      </body>
    </html>
  );
}