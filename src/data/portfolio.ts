const assets = '/sites/sendiansecurity-com/portfolio/projects';

export type CardWidth = 'std' | 'mid' | 'wide';

export interface PortfolioProject {
  title: string;
  image: string;
  width: CardWidth;
  scope?: string;
  badge?: boolean;
}

export const industries = [
  { slug: 'towers', name: 'Towers' },
  { slug: 'commercial', name: 'Commercial' },
  { slug: 'residential', name: 'Residential' },
  { slug: 'healthcare', name: 'Healthcare' },
  { slug: 'education', name: 'Education' },
  { slug: 'retail', name: 'Retail' },
  { slug: 'showrooms', name: 'Showrooms' },
  { slug: 'industrial', name: 'Industrial' },
] as const;

export type IndustrySlug = (typeof industries)[number]['slug'];

const p = (
  title: string,
  image: string,
  width: CardWidth,
  options: Omit<PortfolioProject, 'title' | 'image' | 'width'> = {},
): PortfolioProject => ({ title, image: `${assets}/${image}`, width, ...options });

// Source: Sendian · Portfolio V3 — All projects (Figma SISS). Card order, widths,
// scopes and ILLUSTRATIVE IMAGE badges follow the file. Photo credits are kept in
// docs/figma-portfolio-v3-assets.md (assets remain illustrative placeholders).
export const projects: Record<IndustrySlug, PortfolioProject[]> = {
  towers: [
    p('Marina Mix 49 (2B+G+27F+Roof)', 'marina-mix-49-user.jpg', 'std', { badge: true }),
    p('Marina Mix 52 (B+G+7P+13F+Roof)', 'marina-mix-52.png', 'std'),
    p('Tornado Tower Offices', 'tornado-tower.jpg', 'std', { badge: true }),
    p('Doha Bank', 'doha-bank.png', 'wide'),
  ],
  commercial: [
    p('Sendian Head Quarter', 'sendian-head-quarter.jpg', 'std', { badge: true }),
    p('Ghanem Office Building', 'ghanem-office-building.jpg', 'std'),
    p('Ministry of Interior building', 'ministry-of-interior.jpg', 'std', { badge: true }),
    p('Qatar Petroleum', 'qatar-petroleum.png', 'std'),
    p('Qatar Petroleum – IT Building', 'qatar-petroleum-it-building.jpg', 'std', { badge: true }),
    p('Lusail MU C20 Foxhills', 'foxhills-residential.jpg', 'std', { badge: true }),
    p('Sinjer Car Rent', 'pexels-sinjer-car-rent-fleet.jpeg', 'std', {
      badge: true,
      scope: 'MOI-regulated CCTV systems',
    }),
    p('Al Jazi Real Estate (6 Compounds)', 'al-jazi-compounds.jpg', 'std', {
      badge: true,
      scope: 'CCTV system maintenance',
    }),
    p('Residential & Commercial Building – Birkat Al Awamer', 'pexels-birkat-al-awamer-industrial.jpeg', 'std', {
      badge: true,
      scope: 'ELV and security systems',
    }),
  ],
  residential: [
    p('Sendian Compound', 'sendian-compound.png', 'std', { badge: true }),
    p('Al Eeb Compound', 'al-eeb-compound.jpg', 'std', { badge: true }),
    p('Villa 25 & 16 – Capri Garden', 'capri-garden.jpg', 'std', { badge: true }),
    p('4 Villa Compound', 'pexels-villa-compound-4.jpeg', 'std', { badge: true }),
    p('Sendian Residence – Al Sadd', 'sendian-residence-al-sadd.jpg', 'std', { badge: true }),
    p('Sendian Residence – Madinat Khalifa', 'pexels-sendian-residence-madinat-khalifa.jpeg', 'std', { badge: true }),
    p('12 Flats – Madinat Khalifa', 'pexels-madinat-khalifa-apartments.jpeg', 'std', { badge: true }),
    p('Private Palace – Al Rayane', 'pexels-private-palace-al-rayyan.jpeg', 'std', {
      badge: true,
      scope: 'Complete ELV systems including home automation',
    }),
    p('Private Villa – Lusail', 'pexels-private-villa-lusail.jpeg', 'std', {
      badge: true,
      scope: 'Security, structured cabling, and system integration',
    }),
    p('22 Villa Compound', 'pexels-villa-compound-22.jpeg', 'mid', {
      badge: true,
      scope: 'Distributed security architecture',
    }),
    p('Residential Building (G+3+P) – Bin Mahmoud', 'pexels-bin-mahmoud-residential.jpeg', 'mid', {
      badge: true,
      scope: 'Security and ELV systems',
    }),
  ],
  healthcare: [
    p('Eve Medical Clinic', 'eve-medical-clinic.jpg', 'std', { badge: true }),
    p('PMC Pharmacy – Floresta', 'pmc-pharmacy-1.webp', 'std', { badge: true }),
    p('PMC Pharmacy – Rawdat Hamama', 'pmc-pharmacy-2.webp', 'std', { badge: true }),
    p('PMC Pharmacy – Izgawa', 'pmc-pharmacy-3.webp', 'mid', { badge: true }),
    p('PMC Pharmacy – Rawdat Hamama', 'pmc-pharmacy-1.webp', 'mid', {
      badge: true,
      scope: 'Security and compliance systems maintenance',
    }),
  ],
  education: [
    p('The Lebanese School', 'lebanese-school.jpg', 'std'),
    p('Qatar Finland School', 'qatar-finland-school.jpg', 'std', { badge: true }),
    p('English Modern School – Al Khor', 'english-modern-school-al-khor.jpg', 'std', { badge: true }),
  ],
  retail: [
    p('B Square Mall – Thumama', 'b-square-mall-thumama.jpg', 'std', {
      badge: true,
      scope: 'CCTV upgrade and DIA integration',
    }),
    p('Domasco Watch – Doha Festival City', 'domasco-watch.png', 'std', { badge: true }),
    p('Domasco Watch – City Center', 'domasco-watch-city-center.jpg', 'std', { badge: true }),
    p('Domasco Watch – Gharrafa Lulu', 'domasco-watch-gharrafa-lulu.webp', 'std', { badge: true }),
    p('Domasco Watch – D-Ring Lulu', 'domasco-watch-city-center.jpg', 'std', { badge: true }),
    p('Domasco Watch – Asian Town', 'domasco-watch-gharrafa-lulu.webp', 'std', {
      badge: true,
      scope: 'System installation, testing, and commissioning',
    }),
  ],
  showrooms: [
    p('Honda Showroom', 'honda-showroom.jpg', 'mid', { badge: true }),
    p('GAC Showroom', 'showroom.png', 'mid', { badge: true }),
  ],
  industrial: [
    p('Gulf Warehousing Company', 'industrial-yard.jpg', 'std'),
    p('Material Store – Birkat Al Awamer', 'pexels-birkat-material-store.jpeg', 'std', {
      badge: true,
      scope: 'MOI-regulated CCTV and perimeter monitoring',
    }),
    p('TSS Material Store – Sanaiya Street 47', 'pexels-tss-material-store.jpeg', 'std', {
      badge: true,
      scope: 'Industrial surveillance and compliance coordination',
    }),
    p('Jaidah Car Yard – DSA', 'pexels-jaidah-car-yard.jpeg', 'wide', {
      badge: true,
      scope: 'Security architecture, access control, and monitoring',
    }),
  ],
};

export const hero = {
  image: `${assets}/ghanem-office-building.jpg`,
};
