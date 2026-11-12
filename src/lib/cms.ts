import { news as staticNews } from '@/data/news';
import { articles as staticArticles } from '@/data/news-articles';
import { site as staticSite } from '@/data/site';

type Article = { summary: string; topic: string; sections: { heading?: string; paragraphs: string[] }[] };
type NewsItem = (typeof staticNews)[number];

type Document = { slug?: string; title?: string; summary?: string; publishedAt?: string; category?: string; image?: string; body?: { _type?: string; style?: string; children?: { _type?: string; text?: string }[] }[] };
const query = `*[_type == "newsArticle" && defined(slug.current)] | order(publishedAt desc) { "slug": slug.current, title, summary, publishedAt, category, "image": featuredImage.asset->url, body }`;

async function fetchCms<T>(query: string): Promise<T | null> {
  const { CMS_ENABLED, SANITY_PROJECT_ID, SANITY_DATASET, SANITY_API_READ_TOKEN } = process.env;
  if (CMS_ENABLED !== 'true' || !SANITY_PROJECT_ID || !SANITY_DATASET || !/^[a-z0-9-]+$/.test(SANITY_PROJECT_ID) || !/^[a-z0-9_-]+$/.test(SANITY_DATASET)) return null;
  const url = new URL(`https://${SANITY_PROJECT_ID}.api.sanity.io/v2025-01-01/data/query/${SANITY_DATASET}`);
  url.searchParams.set('query', query);
  url.searchParams.set('perspective', 'published');
  const response = await fetch(url, { headers: SANITY_API_READ_TOKEN ? { Authorization: `Bearer ${SANITY_API_READ_TOKEN}` } : {}, signal: AbortSignal.timeout(5000), redirect: 'error' });
  if (!response.ok) throw new Error('CMS unavailable');
  const payload = await response.json() as { result?: T };
  return payload.result ?? null;
}

export async function getNews(): Promise<{ news: NewsItem[]; articles: Record<string, Article> }> {
  const items = [...staticNews];
  const articles = { ...staticArticles };
  try {
    const docs = await fetchCms<Document[]>(query);
    if (!Array.isArray(docs)) return { news: items, articles };
    for (const doc of docs) {
      if (!doc || typeof doc.slug !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(doc.slug) || typeof doc.title !== 'string' || !doc.title.trim() || typeof doc.summary !== 'string' || !doc.summary.trim() || typeof doc.category !== 'string' || !doc.category.trim() || typeof doc.publishedAt !== 'string' || !/^\d{4}-\d{2}-\d{2}(?:T.*)?$/.test(doc.publishedAt) || !Number.isFinite(Date.parse(doc.publishedAt)) || typeof doc.image !== 'string') continue;
      let image: URL;
      try { image = new URL(doc.image); } catch { continue; }
      if (image.origin !== 'https://cdn.sanity.io' || image.username || image.password || !image.pathname.startsWith(`/images/${process.env.SANITY_PROJECT_ID}/${process.env.SANITY_DATASET}/`)) continue;
      if (!Array.isArray(doc.body)) continue;
      // shortcut: only text and headings render, upgrade when rich Portable Text is needed.
      const sections: Article['sections'] = [];
      for (const block of doc.body) {
        if (block?._type !== 'block' || !Array.isArray(block.children)) continue;
        const text = block.children.filter((span) => span?._type === 'span' && typeof span.text === 'string').map((span) => span.text).join('').trim();
        if (!text) continue;
        if (/^h[2-6]$/.test(block.style ?? '')) sections.push({ heading: text, paragraphs: [] });
        else if (sections.length) sections[sections.length - 1].paragraphs.push(text);
        else sections.push({ paragraphs: [text] });
      }
      if (!sections.some((section) => section.paragraphs.length)) continue;
      const item = { slug: doc.slug, title: doc.title, category: doc.category, date: new Date(doc.publishedAt).toLocaleDateString('en-US', { timeZone: 'UTC', year: 'numeric', month: 'long', day: 'numeric' }), image: image.href };
      const index = items.findIndex((entry) => entry.slug === item.slug);
      if (index === -1) items.push(item); else items[index] = item;
      articles[item.slug] = { summary: doc.summary, topic: doc.category, sections };
    }
  } catch { /* Retain the local content when the CMS is unavailable. */ }
  return { news: items, articles };
}

export async function getSite() {
  try {
    const settings = await fetchCms<{ name?: unknown; email?: unknown; phone?: unknown }>(`*[_type == "securitySiteSettings"][0]{name,email,phone}`);
    const name = typeof settings?.name === 'string' && settings.name.trim() && settings.name.length <= 200 ? settings.name.trim() : staticSite.name;
    const email = typeof settings?.email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(settings.email) && settings.email.length <= 254 ? settings.email : staticSite.email;
    const cmsPhone = typeof settings?.phone === 'string' ? settings.phone : '';
    const phone = /^\+?[\d ()-]{5,30}$/.test(cmsPhone) && /^\+?\d{7,15}$/.test(cmsPhone.replace(/[^\d+]/g, '')) ? cmsPhone : staticSite.phone;
    return { ...staticSite, name, email, phone, phoneHref: `tel:${phone.replace(/[^\d+]/g, '')}` };
  } catch { return staticSite; }
}
