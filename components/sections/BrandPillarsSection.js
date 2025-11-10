// components/sections/BrandPillarsSection.js
import Image from 'next/image';

export default function BrandPillarsSection() {
  const pillars = [
    { text: 'Consciously Sourced', highlight: false },
    { text: 'Elemental Beauty', highlight: true }, // Highlighted in a different color
    { text: 'Quiet Rituals', highlight: false },
    { text: 'Holistic Wellness', highlight: true },
    { text: 'Artisan Crafted', highlight: false },
    { text: 'Sustainable Practices', highlight: true },
  ];

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center py-20 md:py-32 lg:py-48 overflow-hidden bg-nour-deep-olive">
      {/* Background Image */}
      <Image
        src="/brand-assets/nour-pillars-bg.jpg" // Your uploaded background image
        alt="NOURA Brand Pillars Background"
        fill
        sizes="100vw"
        className="object-cover opacity-10 mix-blend-multiply transition-all duration-500 ease-in-out hover:opacity-15" // Subtle blend and hover effect
        priority // Consider if this image is critical for initial load
      />

      {/* Content Overlay */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <p className="font-sans text-xl md:text-2xl text-nour-bone-white opacity-80 mb-12">#NOURA_philosophy</p>
        
        <div className="space-y-6 md:space-y-8">
          {pillars.map((pillar, index) => (
            <div key={index} className="overflow-hidden">
              <h2 className={`font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-none ${pillar.highlight ? 'text-nour-terracotta-gold' : 'text-nour-bone-white'} opacity-90`}>
                {pillar.text}
              </h2>
            </div>
          ))}
        </div>

        <p className="font-sans text-lg md:text-xl text-nour-bone-white opacity-70 mt-12 max-w-2xl mx-auto">
            Every product is a step in a purposeful journey towards skin harmony and inner peace.
        </p>
      </div>
    </section>
  );
}