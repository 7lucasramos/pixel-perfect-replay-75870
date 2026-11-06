// Add only real, brand-approved cases here; supply photo URLs and explicitly authorized testimonials.
export type CaseStudy = { slug: string; title: string; location: string; applicationType: string; systemUsed: string; description: string; heroImage?: string; gallery?: string[]; results?: string[]; testimonial?: { quote: string; author: string; role?: string; authorized: true }; year?: number };
export const cases: CaseStudy[] = [];
export function authorizedTestimonial(item: CaseStudy) { return item.testimonial?.authorized === true ? item.testimonial : undefined; }
export function demoEnabled(dev: boolean, demo?: string) { return dev && demo === "case"; }