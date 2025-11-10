// components/layouts/Header.js
import Link from 'next/link';

export default function Header() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 py-4 px-4 lg:px-8 bg-nour-bone-white shadow-sm">
      <div className="container mx-auto flex justify-between items-center w-full">
        {/* Mobile Menu Opener (Placeholder for now) */}
        <div className="lg:hidden">
          <button className="menu-opener flex flex-col gap-1.5 p-2">
            <span className="block w-6 h-0.5 bg-nour-dark-text"></span>
            <span className="block w-6 h-0.5 bg-nour-dark-text"></span>
          </button>
        </div>

        {/* Main Navigation (Hidden on small screens, shown on large) */}
        <div className="flex-grow-1 flex-shrink-0 hidden lg:flex">
          <nav className="main-nav">
            <ul className="flex list-none m-0 p-0 space-x-8">
              <li>
                <Link href="/about" className="text-nour-dark-text hover:text-nour-deep-olive transition-colors duration-300">
                  About
                </Link>
              </li>
              <li>
                <Link href="/product/luxury-skincare" className="text-nour-dark-text hover:text-nour-deep-olive transition-colors duration-300">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/learn" className="text-nour-dark-text hover:text-nour-deep-olive transition-colors duration-300">
                  Learn
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* NOURA Logo - Swan Icon */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Link href="/">
            {/* NOURA Swan Logo - using the Path_358 and Path_359 from original SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45" className="h-10 w-auto text-nour-deep-olive"> {/* Using text-nour-deep-olive for the icon color */}
                <g className="logo-icon" transform="translate(-24.72 -24.46)">
                  <path d="M7296.14-10581.615v0l7.868-6.383a10.128,10.128,0,0,1-1.488,14.251l0,0-7.868,6.38A10.137,10.137,0,0,1,7296.14-10581.615Z" transform="translate(-7264.877 10612.461)" fill="currentColor"/>
                  <path d="M7296.323-10572.27a33.968,33.968,0,0,1-3.869-.6.077.077,0,0,1-.032-.135c.059-.051.138-.12.236-.21l.609-.519c.741-.638,1.854-1.584,3.175-2.694.476-.4.98-.829,1.515-1.272,2.314-1.927,5.03-4.146,7.451-6.027.415-.324.832-.638,1.233-.933l.236-.178v-.014l.1-.074a31.3,31.3,0,0,1,3.933-2.636c.032-.014.062-.043.09-.059a3.389,3.389,0,0,1,2.2-.327,5.106,5.106,0,0,1,1.36.45h0l2.227,1.018c.191.088.12.486-.085.54a2.975,2.975,0,0,0-2.27,2.474l.005-.166a14.774,14.774,0,0,1-1,3.487c-.165.386-.343.758-.534,1.127a.015.015,0,0,0-.016.016,12.9,12.9,0,0,1-3.295,3.98c-2.82,2.3-6.809,2.9-10.241,2.9C7298.269-10572.124,7297.242-10572.184,7296.323-10572.27Z" transform="translate(-7267.675 10623.668)" fill="currentColor"/>
                </g>
            </svg>
            <span className="sr-only">NOURA</span>
          </Link>
        </div>

        {/* Right Navigation (Account and Cart) */}
        <div className="flex-grow-1 flex-shrink-0 flex justify-end">
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
      </div>
    </div>
  );
}