// app/product/[slug]/page.js
// NO 'use client' directive here - this is a Server Component

import ProductDetailClient from './ProductDetailClient';
import Link from 'next/link'; // <--- CRITICAL FIX: ADD THIS IMPORT

// --- Product Data (Defined here in the Server Component scope) ---
const allProductsData = [
  {
    id: 1,
    slug: 'nourish-glow-serum',
    imageSrc: '/brand-assets/nour-float-1.jpg',
    title: 'Nourish & Glow Serum',
    price: '$65.00',
    shortDescription: 'A potent blend for radiant skin, deeply hydrates.',
    longDescription: 'Experience the transformative power of our Nourish & Glow Serum, meticulously crafted with botanical extracts and essential vitamins. It deeply hydrates, brightens, and reduces fine lines for a luminous complexion. Apply morning and night as part of your ritual for optimal results. Its lightweight texture absorbs quickly, leaving your skin feeling supple and looking luminous. Enriched with Hyaluronic Acid for moisture retention and Vitamin C for brightening.',
    benefits: [
      'Deeply hydrates and plumps skin',
      'Visibly reduces fine lines and wrinkles',
      'Enhances natural radiance and glow',
      'Protects against environmental stressors',
      'Fast-absorbing, non-greasy formula'
    ],
    usage: 'Apply 2-3 drops to clean skin, morning and night, before moisturizer. Gently pat into face and neck.',
    ingredients: 'Aqua, Glycerin, Sodium Hyaluronate, Ascorbic Acid (Vitamin C), Green Tea Extract, Jojoba Oil, Rosehip Oil, Phenoxyethanol, Essential Oil Blend.',
    cta: 'Add to Cart',
    ctaLink: '#add-to-cart',
  },
  {
    id: 2,
    slug: 'balancing-cleansing-oil',
    imageSrc: '/brand-assets/nour-float-2.jpg',
    title: 'Balancing Cleansing Oil',
    price: '$48.00',
    shortDescription: 'Gently purifies, maintains skin harmony.',
    longDescription: 'Our Balancing Cleansing Oil effortlessly dissolves impurities and makeup without stripping your skin\'s natural moisture. Infused with soothing oils like Chamomile and Lavender, it leaves your skin feeling clean, soft, and perfectly balanced, ready for the next step in your NOURA ritual. Suitable for all skin types, including sensitive skin.',
    benefits: [
      'Removes makeup and impurities effectively',
      'Maintains skin\'s natural pH balance',
      'Leaves skin soft, not tight or dry',
      'Calms and soothes irritation',
      'Non-comedogenic formula'
    ],
    usage: 'Massage 2-3 pumps onto dry face. Add a splash of water to emulsify, then rinse thoroughly with warm water.',
    ingredients: 'Helianthus Annuus (Sunflower) Seed Oil, Caprylic/Capric Triglyceride, Polysorbate 80, Anthemis Nobilis (Chamomile) Flower Oil, Lavandula Angustifolia (Lavender) Oil, Tocopherol (Vitamin E).',
    cta: 'Add to Cart',
    ctaLink: '#add-to-cart',
  },
  {
    id: 3,
    slug: 'replenishing-night-cream',
    imageSrc: '/brand-assets/nour-float-3.jpg',
    title: 'Replenishing Night Cream',
    price: '$72.00',
    shortDescription: 'Restorative care for overnight renewal.',
    longDescription: 'Awaken to revitalized skin with our Replenishing Night Cream. Rich in antioxidants and essential fatty acids, it supports your skin\'s natural repair process, deeply moisturizing and restoring suppleness. A luxurious finish to your evening ritual, promoting cell regeneration while you sleep.',
    benefits: [
      'Intensely moisturizes and nourishes',
      'Supports natural skin repair overnight',
      'Improves skin elasticity and firmness',
      'Reduces appearance of fatigue',
      'Leaves skin feeling soft and smooth'
    ],
    usage: 'Apply a generous amount to face and neck after serum in the evening. Massage gently until absorbed.',
    ingredients: 'Aqua, Butyrospermum Parkii (Shea) Butter, Glyceryl Stearate, Cetearyl Alcohol, Simmondsia Chinensis (Jojoba) Seed Oil, Oenothera Biennis (Evening Primrose) Oil, Retinyl Palmitate (Vitamin A), Green Tea Extract, Hyaluronic Acid.',
    cta: 'Add to Cart',
    ctaLink: '#add-to-cart',
  },
  {
    id: 4,
    slug: 'pure-hydration-mist',
    imageSrc: '/brand-assets/nour-float-1.jpg',
    title: 'Pure Hydration Mist',
    price: '$35.00',
    shortDescription: 'A refreshing veil of moisture, revitalizes instantly.',
    longDescription: 'Spritz your way to instant refreshment with our Pure Hydration Mist. Formulated with mineral-rich waters and calming botanicals like Rose and Cucumber, it preps your skin for serums, sets makeup, or simply revitalizes throughout the day. Your skin\'s daily sip of calm and hydration.',
    benefits: [
      'Provides instant hydration and freshness',
      'Soothes and calms irritated skin',
      'Preps skin for better serum absorption',
      'Can be used to set makeup',
      'Refreshes skin throughout the day'
    ],
    usage: 'Hold 8-10 inches from face and mist evenly. Use as needed throughout the day.',
    ingredients: 'Aqua, Rosa Damascena Flower Water, Cucumis Sativus (Cucumber) Fruit Extract, Glycerin, Aloe Barbadensis Leaf Juice, Sodium PCA, Phenoxyethanol.',
    cta: 'Add to Cart',
    ctaLink: '#add-to-cart',
  },
  {
    id: 5,
    slug: 'gentle-exfoliating-polish',
    imageSrc: '/brand-assets/nour-float-2.jpg',
    title: 'Gentle Exfoliating Polish',
    price: '$55.00',
    shortDescription: 'Refine and renew for a smooth canvas.',
    longDescription: 'Reveal a brighter, smoother complexion with our Gentle Exfoliating Polish. Fine, biodegradable particles delicately buff away dead skin cells, promoting cellular renewal without irritation. Use once or twice weekly for optimal results to unveil fresh, glowing skin. Enriched with fruit enzymes for a gentle chemical exfoliation as well.',
    benefits: [
      'Removes dead skin cells without harshness',
      'Improves skin texture and clarity',
      'Promotes radiant, smoother complexion',
      'Gentle enough for regular use',
      'Contains natural, biodegradable exfoliants'
    ],
    usage: 'Apply a small amount to damp skin, gently massage in circular motions, then rinse thoroughly. Use 1-2 times per week.',
    ingredients: 'Aqua, Cellulose Acetate, Glycerin, Cetearyl Alcohol, Prunus Armeniaca (Apricot) Seed Powder, Bromelain (Pineapple Enzyme), Papain (Papaya Enzyme), Jojoba Esters.',
    cta: 'Add to Cart',
    ctaLink: '#add-to-cart',
  },
  {
    id: 6,
    slug: 'radiant-eye-concentrate',
    imageSrc: '/brand-assets/nour-float-3.jpg',
    title: 'Radiant Eye Concentrate',
    price: '$88.00',
    shortDescription: 'Brightens and revitalizes delicate eyes.',
    longDescription: 'Target the delicate skin around your eyes with our Radiant Eye Concentrate. This lightweight yet powerful formula diminishes the appearance of dark circles, puffiness, and fine lines, leaving your eyes looking refreshed and youthful. A vital step for focused care, infused with caffeine to reduce morning puffiness and peptides for firming.',
    benefits: [
      'Reduces appearance of dark circles',
      'Minimizes puffiness around the eyes',
      'Smooths fine lines and wrinkles',
      'Hydrates and brightens delicate skin',
      'Enhances youthful eye contour'
    ],
    usage: 'Gently dab a small amount around the eye area with your ring finger, morning and night.',
    ingredients: 'Aqua, Glycerin, Caffeine, Acetyl Hexapeptide-8, Palmitoyl Tripeptide-5, Hyaluronic Acid, Cucumis Sativus (Cucumber) Fruit Extract, Glycyrrhiza Glabra (Licorice) Root Extract.',
    cta: 'Add to Cart',
    ctaLink: '#add-to-cart',
  },
  {
    id: 7,
    slug: 'botanical-face-elixir',
    imageSrc: '/brand-assets/nour-float-1.jpg',
    title: 'Botanical Face Elixir',
    price: '$95.00',
    shortDescription: 'A luxurious oil blend for deep nourishment.',
    longDescription: 'Infused with rare botanical oils like Argan, Squalane, and Meadowfoam, our Face Elixir deeply nourishes and restores skin vitality. It absorbs quickly, leaving a luminous, non-greasy finish. Ideal for enhancing glow, elasticity, and providing a protective barrier against environmental damage. A few drops are all you need for an indulgent experience.',
    benefits: [
      'Intense hydration and nourishment',
      'Restores skin\'s natural barrier',
      'Enhances glow and elasticity',
      'Protects against environmental damage',
      'Lightweight, non-greasy feel'
    ],
    usage: 'Warm 2-3 drops in your palms and press gently onto face and neck after serum. Can be used morning or night.',
    ingredients: 'Argania Spinosa (Argan) Kernel Oil, Squalane, Limnanthes Alba (Meadowfoam) Seed Oil, Rosa Canina (Rosehip) Fruit Oil, Simmondsia Chinensis (Jojoba) Seed Oil, Tocopherol (Vitamin E), Essential Oil Blend.',
    cta: 'Add to Cart',
    ctaLink: '#add-to-cart',
  },
  {
    id: 8,
    slug: 'mineral-sun-shield',
    imageSrc: '/brand-assets/nour-float-2.jpg',
    title: 'Mineral Sun Shield SPF 30',
    price: '$42.00',
    shortDescription: 'Lightweight, broad-spectrum sun protection.',
    longDescription: 'Protect your skin daily with our Mineral Sun Shield. This non-nano zinc oxide formula offers broad-spectrum SPF 30 protection without a white cast. Hydrating and gentle for all skin types, it blends seamlessly under makeup for invisible defense against UV rays. Water-resistant for up to 40 minutes.',
    benefits: [
      'Broad-spectrum SPF 30 protection',
      'No white cast, blends invisibly',
      'Hydrating and gentle formula',
      'Water-resistant',
      'Suitable for all skin types, including sensitive'
    ],
    usage: 'Apply liberally 15 minutes before sun exposure. Reapply at least every 2 hours or after swimming/sweating.',
    ingredients: 'Active Ingredient: Zinc Oxide 18%. Inactive Ingredients: Aqua, Caprylic/Capric Triglyceride, Glycerin, Cetearyl Alcohol, Coco-Caprylate/Caprate, Polyglyceryl-3 Polyricinoleate, Isostearic Acid, Jojoba Esters, Tocopherol (Vitamin E).',
    cta: 'Add to Cart',
    ctaLink: '#add-to-cart',
  },
  {
    id: 9,
    slug: 'clay-purifying-mask',
    imageSrc: '/brand-assets/nour-float-3.jpg',
    title: 'Clay Purifying Mask',
    price: '$38.00',
    shortDescription: 'Detoxify and refine pores naturally.',
    longDescription: 'Our Clay Purifying Mask draws out impurities and excess oil, leaving skin feeling fresh and refined. Enriched with calming botanicals like Calendula and Green Tea Extract to prevent over-drying, it helps minimize the appearance of pores and promotes a clearer complexion. Experience a spa-like detox at home.',
    benefits: [
      'Deeply cleanses and detoxifies pores',
      'Absorbs excess oil and shine',
      'Refines skin texture and tone',
      'Minimizes appearance of pores',
      'Leaves skin refreshed and balanced'
    ],
    usage: 'Apply a thin, even layer to clean, dry skin, avoiding the eye area. Leave on for 10-15 minutes, then rinse thoroughly with warm water. Use 1-2 times per week.',
    ingredients: 'Aqua, Kaolin (White Clay), Bentonite Clay, Glycerin, Calendula Officinalis Flower Extract, Camellia Sinensis (Green Tea) Leaf Extract, Lavandula Angustifolia (Lavender) Oil, Salicylic Acid.',
    cta: 'Add to Cart',
    ctaLink: '#add-to-cart',
  },
  {
    id: 10,
    slug: 'lip-eye-balm',
    imageSrc: '/brand-assets/nour-float-1.jpg',
    title: 'Lip & Eye Balm',
    price: '$28.00',
    shortDescription: 'Targeted hydration for delicate areas.',
    longDescription: 'A concentrated balm to intensely hydrate and protect the delicate skin around the lips and eyes. Reduces fine lines, dryness, and supports skin elasticity for a smoother, more youthful look. Rich in nourishing butters and waxes, it forms a protective barrier against moisture loss. Perfect for on-the-go hydration.',
    benefits: [
      'Intensely hydrates dry lips and eyes',
      'Reduces appearance of fine lines',
      'Protects delicate skin from moisture loss',
      'Nourishes and soothes',
      'Convenient for on-the-go application'
    ],
    usage: 'Gently pat onto lips and around the eye area as needed throughout the day and night.',
    ingredients: 'Ricinus Communis (Castor) Seed Oil, Cera Alba (Beeswax), Butyrospermum Parkii (Shea) Butter, Mangifera Indica (Mango) Seed Butter, Persea Gratissima (Avocado) Oil, Tocopherol (Vitamin E), Essential Oil Blend.',
    cta: 'Add to Cart',
    ctaLink: '#add-to-cart',
  },
];
// --- End Product Data ---


// Next.js function to generate static paths for all products
export async function generateStaticParams() {
  return allProductsData.map((product) => ({
    slug: product.slug,
  }));
}

// Default export for the dynamic route (Server Component)
export default function ProductDetailPage({ params }) {
  const { slug } = params;

  // Find the product based on the slug
  const product = allProductsData.find((p) => p.slug === slug);

  // If product not found, display a message or redirect
  if (!product) {
    return (
      <main className="relative w-full bg-nour-bone-white py-16 md:py-24 overflow-hidden min-h-screen flex flex-col items-center justify-center text-center">
        <h1 className="font-serif text-5xl md:text-6xl font-bold text-nour-deep-olive mb-4">Product Not Found</h1>
        <p className="font-sans text-xl text-nour-dark-text">The product you are looking for does not exist.</p>
        <Link href="/shop" className="mt-8 px-8 py-3 bg-nour-deep-olive text-nour-bone-white text-base font-semibold rounded-full hover:bg-opacity-90 transition-all duration-300">
          Back to Shop
        </Link>
      </main>
    );
  }

  // Pass the fetched product data to the Client Component
  return <ProductDetailClient product={product} />;
}