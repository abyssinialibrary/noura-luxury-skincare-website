// components/layouts/Footer.js
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative w-full py-16 md:py-24 bg-nour-deep-olive text-nour-bone-white overflow-hidden">
      {/* Optional: Subtle radial gradient in background to add depth, similar to hero */}
      <div className="absolute inset-0 z-0 flex items-center justify-center translate-y-1/2">
        <div className="radial-gradient-circle absolute w-[70vw] h-[70vw] max-w-xl max-h-xl rounded-full bg-nour-terracotta-gold opacity-5 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Mantra */}
          <div className="col-span-full lg:col-span-1 text-center lg:text-left mb-8 lg:mb-0">
            <h3 className="font-serif text-3xl md:text-4xl leading-tight text-nour-bone-white mb-4">
              Kinder world with <br /> NOURA.
            </h3>
            <p className="font-sans text-sm opacity-70 max-w-xs mx-auto lg:mx-0">
              *These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure or prevent any disease.
            </p>
          </div>

          {/* Index/Navigation */}
          <div className="text-center md:text-left">
            <h4 className="font-sans text-lg font-semibold text-nour-terracotta-gold mb-4">Index</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-nour-soft-neutral transition-colors duration-200">Home</Link></li>
              <li><Link href="/about" className="hover:text-nour-soft-neutral transition-colors duration-200">About</Link></li>
              <li><Link href="/product/luxury-skincare" className="hover:text-nour-soft-neutral transition-colors duration-200">Shop</Link></li>
              <li><Link href="/learn" className="hover:text-nour-soft-neutral transition-colors duration-200">Learn</Link></li>
              <li><Link href="/product/luxury-skincare#faq" className="hover:text-nour-soft-neutral transition-colors duration-200">FAQ</Link></li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="text-center md:text-left">
            <h4 className="font-sans text-lg font-semibold text-nour-terracotta-gold mb-4">Social</h4>
            <ul className="space-y-2">
              <li><a href="https://www.instagram.com/yournourabrand" target="_blank" rel="noopener noreferrer" className="hover:text-nour-soft-neutral transition-colors duration-200">Instagram</a></li>
              <li><a href="https://www.facebook.com/yournourabrand" target="_blank" rel="noopener noreferrer" className="hover:text-nour-soft-neutral transition-colors duration-200">Facebook</a></li>
              <li><a href="https://www.tiktok.com/@yournourabrand" target="_blank" rel="noopener noreferrer" className="hover:text-nour-soft-neutral transition-colors duration-200">TikTok</a></li>
              <li><a href="https://www.linkedin.com/company/yournourabrand" target="_blank" rel="noopener noreferrer" className="hover:text-nour-soft-neutral transition-colors duration-200">LinkedIn</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h4 className="font-sans text-lg font-semibold text-nour-terracotta-gold mb-4">Info</h4>
            <ul className="space-y-2">
              <li><a href="mailto:hello@yournourabrand.com" className="hover:text-nour-soft-neutral transition-colors duration-200">hello@yournourabrand.com</a></li>
              {/* Add other contact info or address if needed */}
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal Links */}
        <div className="border-t border-nour-bone-white border-opacity-20 pt-8 mt-12 text-center md:flex md:justify-between md:items-center">
          <p className="font-sans text-sm opacity-70 mb-4 md:mb-0">© {new Date().getFullYear()} NOURA. All rights reserved.</p>
          <ul className="flex justify-center md:justify-end space-x-6 text-sm">
            <li><Link href="/privacy-policy" className="hover:text-nour-soft-neutral transition-colors duration-200">Privacy Policy</Link></li>
            <li><Link href="/terms-of-use" className="hover:text-nour-soft-neutral transition-colors duration-200">Terms of Service</Link></li>
            <li><a href="https://nika.agency/?utm_source=NOURA&utm_medium=footer_link&utm_campaign=website_build" target="_blank" rel="noopener noreferrer" className="hover:text-nour-soft-neutral transition-colors duration-200">Site by Nika</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}