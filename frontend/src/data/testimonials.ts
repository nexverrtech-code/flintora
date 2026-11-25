// Client testimonials. Add only genuine quotes that the client has approved for publication.
// Sections that use testimonials are hidden while this list is empty.
export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  project?: string; // project slug
}

export const testimonials: Testimonial[] = [];
