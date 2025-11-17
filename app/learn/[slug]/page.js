// app/learn/[slug]/page.js
// NO 'use client' directive here - this is a Server Component

import LearnTopicDetailClient from './LearnTopicDetailClient'; // Import the new Client Component
import Link from 'next/link'; // Import Link for the fallback "Topic Not Found"

// --- Learning Topic Data (Defined here in the Server Component scope) ---
const allLearningTopicsData = [
  {
    slug: 'rituals',
    title: 'Mastering Your Skincare Rituals',
    content: `
      <p class="mb-4">At NOURA, we believe a skincare routine is more than just a regimen—it's a sacred ritual. Dedicate these moments to presence and intentional care, allowing your skin to truly thrive.</p>
      <p class="mb-4">Your daily ritual should typically include:</p>
      <ul class="list-disc list-inside ml-4 mb-4 space-y-2">
        <li>Cleansing: Gently remove impurities, makeup, and pollutants.</li>
        <li>Toning (Optional): Balance pH and prep skin for absorption.</li>
        <li>Serum Application: Target specific concerns with potent active ingredients.</li>
        <li>Moisturizing: Hydrate and seal in moisture.</li>
        <li>SPF (Morning): Crucial protection against UV damage.</li>
      </ul>
      <p class="mb-4">For your evening ritual, focus on repair and regeneration, perhaps incorporating a gentle exfoliant a few times a week or a nourishing overnight mask.</p>
      <p>Remember, consistency is key. Observe how your skin responds and adjust your ritual as needed. Embrace the stillness, and let your NOURA routine be a journey of self-discovery.</p>
    `,
    imageSrc: '/brand-assets/learn-rituals.jpg',
  },
  {
    slug: 'ingredients',
    title: 'Unveiling Ingredient Insights',
    content: `
      <p class="mb-4">The heart of NOURA's efficacy lies in our meticulously selected ingredients. We fuse nature's most powerful botanicals with cutting-edge science to create formulations that deliver visible results with uncompromising purity.</p>
      <h3 class="font-serif text-2xl font-bold text-nour-deep-olive mb-3 mt-6">Hero Ingredients You'll Love:</h3>
      <ul class="list-disc list-inside ml-4 mb-4 space-y-2">
        <li>Hyaluronic Acid: A moisture magnet, holding up to 1000 times its weight in water to plump and hydrate.</li>
        <li>Vitamin C (Ascorbic Acid): A powerful antioxidant that brightens, evens tone, and stimulates collagen production.</li>
        <li>Rosehip Oil: Rich in essential fatty acids and Vitamin A, promoting regeneration and reducing fine lines.</li>
        <li>Green Tea Extract: A potent antioxidant for soothing skin and protecting against environmental damage.</li>
        <li>Peptides: Short chains of amino acids that signal skin to produce more collagen, enhancing firmness.</li>
      </ul>
      <p>We are transparent about every ingredient in our formulations, empowering you to make informed choices for your skin.</p>
    `,
    imageSrc: '/brand-assets/learn-ingredients.jpg',
  },
  {
    slug: 'holistic',
    title: 'Embracing Holistic Beauty',
    content: `
      <p class="mb-4">At NOURA, we understand that true radiance extends beyond topical application. Holistic beauty acknowledges the intricate connection between your skin, mind, body, and spirit. It's about nurturing yourself from the inside out.</p>
      <h3 class="font-serif text-2xl font-bold text-nour-deep-olive mb-3 mt-6">Cultivate Inner Harmony:</h3>
      <ul class="list-disc list-inside ml-4 mb-4 space-y-2">
        <li>Mindful Moments: Integrate meditation or deep breathing into your daily routine to reduce stress.</li>
        <li>Nourishing Diet: Fuel your body with antioxidant-rich foods, healthy fats, and plenty of water.</li>
        <li>Quality Sleep: Allow your skin cells to repair and regenerate during restful sleep.</li>
        <li>Gentle Movement: Incorporate exercise to boost circulation and detoxification.</li>
      </ul>
      <p>When you align your lifestyle with your skincare, the results are profound. Your skin becomes a reflection of your overall well-being. Embrace the NOURA philosophy of complete care.</p>
    `,
    imageSrc: '/brand-assets/learn-holistic.jpg',
  },
  {
    slug: 'philosophy',
    title: 'The Core of NOURA Philosophy',
    content: `
      <p class="mb-4">NOURA was born from a deep reverence for the earth's bounty and a commitment to timeless beauty rituals. We believe true radiance comes from harmony, both within ourselves and with nature. Our journey began with a simple vision: to craft skincare that nourishes the soul as much as the skin.</p>
      <p class="mb-4">Each NOURA formulation is a testament to purity and efficacy, meticulously developed using potent botanical extracts, rare essential oils, and advanced scientific research. We source our ingredients ethically, ensuring sustainability and supporting local communities.</p>
      <p>Our commitment extends beyond exceptional products to fostering a mindful approach to self-care, encouraging a moment of pause and reflection in your daily routine. From our serene laboratories to your personal ritual, every step is infused with intention and care. We invite you to experience the NOURA difference – a journey to luminous skin and an awakened spirit.</p>
    `,
    imageSrc: '/brand-assets/learn-philosophy.jpg',
  },
];
// --- End Learning Topic Data ---


// Next.js function to generate static paths for all learning topics
export async function generateStaticParams() {
  return allLearningTopicsData.map((topic) => ({
    slug: topic.slug,
  }));
}

export default function LearnTopicDetailPage({ params }) {
  const { slug } = params;

  // Find the topic based on the slug
  const topic = allLearningTopicsData.find((t) => t.slug === slug);

  // If topic not found, handle 404 or redirect
  if (!topic) {
    return (
      <main className="relative w-full bg-nour-bone-white py-16 md:py-24 overflow-hidden min-h-screen flex flex-col items-center justify-center text-center">
        <h1 className="font-serif text-5xl md:text-6xl font-bold text-nour-deep-olive mb-4">Topic Not Found</h1>
        <p className="font-sans text-xl text-nour-dark-text">The learning topic you are looking for does not exist.</p>
        <Link href="/learn" className="mt-8 px-8 py-3 bg-nour-deep-olive text-nour-bone-white text-base font-semibold rounded-full hover:bg-opacity-90 transition-all duration-300">
          Back to Learn
        </Link>
      </main>
    );
  }

  // Pass the fetched topic data to the Client Component
  return <LearnTopicDetailClient topic={topic} />;
}