// components/layouts/Footer.js
import Link from 'next/link';

export default function Footer() {
  const AnimatedLink = ({ href, children, target, rel, className = "" }) => (
    <Link href={href} target={target} rel={rel} className={`inline-block relative overflow-hidden group ${className}`}>
      <span className="block text-nour-bone-white transform transition-transform duration-300 group-hover:-translate-y-full">
        {children}
      </span>
      <span className="absolute top-full left-0 block text-nour-soft-neutral transform transition-transform duration-300 group-hover:-translate-y-full">
        {children}
      </span>
    </Link>
  );

  const AnimatedExternalLink = ({ href, children, target = "_blank", rel = "noopener noreferrer", className = "" }) => (
    <a href={href} target={target} rel={rel} className={`inline-block relative overflow-hidden group ${className}`}>
      <span className="block text-nour-bone-white transform transition-transform duration-300 group-hover:-translate-y-full">
        {children}
      </span>
      <span className="absolute top-full left-0 block text-nour-soft-neutral transform transition-transform duration-300 group-hover:-translate-y-full">
        {children}
      </span>
    </a>
  );

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
              NOURA – a philosophy rooted in calm, clarity, and nourishment, bringing together natural products and modern rituals.
            </p>
          </div>

          {/* Index/Navigation */}
          <div className="text-center md:text-left">
            <h4 className="font-sans text-lg font-semibold text-nour-terracotta-gold mb-4">Index</h4>
            <ul className="space-y-2">
              <li><AnimatedLink href="/">Home</AnimatedLink></li>
              <li><AnimatedLink href="/about">About</AnimatedLink></li>
              <li><AnimatedLink href="/shop">Shop</AnimatedLink></li>
              <li><AnimatedLink href="/learn">Learn</AnimatedLink></li>
              <li><AnimatedLink href="/faq">FAQ</AnimatedLink></li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="text-center md:text-left">
            <h4 className="font-sans text-lg font-semibold text-nour-terracotta-gold mb-4">Social</h4>
            <ul className="space-y-2">
              <li><AnimatedExternalLink href="https://www.instagram.com/bereketdesigns">Instagram</AnimatedExternalLink></li>
              <li><AnimatedExternalLink href="https://www.facebook.com/bereketdesigns">Facebook</AnimatedExternalLink></li>
              <li><AnimatedExternalLink href="https://www.tiktok.com/@bereketdesigns">TikTok</AnimatedExternalLink></li>
              <li><AnimatedExternalLink href="https://www.linkedin.com/company/bereketdesigns">LinkedIn</AnimatedExternalLink></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h4 className="font-sans text-lg font-semibold text-nour-terracotta-gold mb-4">Info</h4>
            <ul className="space-y-2">
              <li><AnimatedExternalLink href="mailto:hello@bereketdesigns.com">E-mail Us</AnimatedExternalLink></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal Links */}
        <div className="border-t border-nour-bone-white border-opacity-20 pt-8 mt-12 text-center md:flex md:justify-between md:items-center">
          <p className="font-sans text-sm opacity-70 mb-4 md:mb-0">© {new Date().getFullYear()} NOURA. All rights reserved.</p>
          <ul className="flex justify-center md:justify-end space-x-6 text-sm">
            <li><AnimatedLink href="/privacy-policy" className="small">Privacy Policy</AnimatedLink></li>
            <li><AnimatedLink href="/terms-of-use" className="small">Terms of Service</AnimatedLink></li>
            <li><AnimatedExternalLink href="https://arkeon-studio.vercel.app" className="small">Site by Arkeon</AnimatedExternalLink></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}