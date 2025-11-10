// components/sections/FloatingCardsSection.js
import Image from 'next/image';

export default function FloatingCardsSection() {
  const floatingImages = [
    { src: '/brand-assets/nour-float-1.jpg', alt: 'NOURA Product Detail 1', width: 300, height: 370, positionClasses: 'lg:col-start-2 lg:row-start-1 lg:mt-20' },
    { src: '/brand-assets/nour-float-2.jpg', alt: 'NOURA Product Detail 2', width: 300, height: 370, positionClasses: 'lg:col-start-4 lg:row-start-2 lg:mt-10' },
    { src: '/brand-assets/nour-float-3.jpg', alt: 'NOURA Product Detail 3', width: 300, height: 370, positionClasses: 'lg:col-start-6 lg:row-start-1 lg:mb-20' },
  ];

  return (
    <section className="relative w-full py-16 md:py-24 bg-nour-soft-neutral overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-center leading-tight text-nour-deep-olive mb-12 md:mb-16">
          Inspired by Elemental Beauty
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12 justify-items-center items-center">
          {floatingImages.map((image, index) => (
            <div key={index} className={`relative w-full max-w-[280px] h-[350px] md:h-[400px] lg:h-[450px] overflow-hidden rounded-lg shadow-xl ${image.positionClasses}`}>
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                className="object-cover w-full h-full transform transition-transform duration-500 hover:scale-105"
                loading="lazy" // Use lazy loading for images further down the page
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div> {/* Subtle overlay */}
            </div>
          ))}
        </div>

        <p className="font-sans text-lg md:text-xl text-center text-nour-dark-text opacity-70 mt-16 max-w-2xl mx-auto">
            Each ingredient is a testament to nature&apos;s profound wisdom, carefully selected for purity and efficacy.
        </p>
      </div>
    </section>
  );
}