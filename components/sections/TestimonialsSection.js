// components/sections/TestimonialsSection.js
import Image from 'next/image';

export default function TestimonialsSection() {
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
      videoThumbnail: '/brand-assets/noura-philosophy-2.jpg', // Using one of your uploaded images as a placeholder thumbnail
      bgColor: 'bg-nour-dark-text', // Dark background for contrast, like a video player
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
  ];

  return (
    <section className="relative w-full py-20 md:py-32 bg-nour-bone-white overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-center leading-tight text-nour-deep-olive mb-16">
          Voices of Calm
        </h2>

        {/* Testimonial Cards Grid (for now, we'll make it scrollable later if needed) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className={`relative p-6 rounded-lg shadow-md h-full flex flex-col justify-between ${testimonial.bgColor} ${testimonial.textColor}`}>
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
    </section>
  );
}