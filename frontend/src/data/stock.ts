// Stock photography from Unsplash (https://unsplash.com/license): free for commercial use,
// no attribution required. Served from Unsplash's image CDN, which resizes and converts to
// AVIF/WebP automatically. Replace any of these with your own photography by changing `id`
// to a full URL of your image (see StockPhoto).

export interface Stock {
  id: string;
  alt: string;
}

export const stock = {
  'brand-identity-strategy': { id: 'photo-1498075702571-ecb018f3752d', alt: 'A designer hand-lettering a logo on tracing paper with a mechanical pencil' },
  'website-design-development': { id: 'photo-1761122912306-13d8f83892c1', alt: 'A designer working on a website at a desk in a dark studio' },
  'ui-ux-design': { id: 'photo-1600132806608-231446b2e7af', alt: 'Hand-drawn website wireframes on paper with an orange pen' },
  'digital-marketing': { id: 'photo-1551288049-bebda4e38f71', alt: 'Marketing performance analytics on a laptop screen' },
  'search-engine-optimization': { id: 'photo-1586125674857-4eb86880905d', alt: 'A search engine results page on a computer screen' },
  'creative-design-content': { id: 'photo-1611784728558-6c7d9b409cdf', alt: 'A content creator filming with a video camera under red light' },
  'photography-videography': { id: 'photo-1502982720700-bfff97f2ecac', alt: 'A professional camera and lens on a dark surface' },
  'ai-business-automation': { id: 'photo-1762340277219-17cba0c9bca0', alt: 'An AI assistant interface glowing above a keyboard' },
  'digital-transformation': { id: 'photo-1557804506-669a67965ba0', alt: 'A team discussing strategy around laptops and a whiteboard' },
  about: { id: 'photo-1603201667230-bd139210db18', alt: 'A creative team collaborating around a laptop in a modern studio' },
  process: { id: 'photo-1586936893354-362ad6ae47ba', alt: 'A team planning a project with sticky notes on a table' },
  contact: { id: 'photo-1523380262778-076eb862d38f', alt: 'A warm desk lamp lighting a quiet studio desk' },
} satisfies Record<string, Stock>;

export type StockKey = keyof typeof stock;
