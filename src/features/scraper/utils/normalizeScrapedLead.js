// Normalizes raw scraped items into your app's Lead schema.
// Keeps normalization deterministic and safe for mock -> real swap.

/**
 * Basic email validation (simple).
 * @param {string} e
 * @returns {string|null}
 */
function cleanEmail(e) {
  if (!e) return null;
  const s = String(e).trim();
  // simple RFC-lite check
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)) return s.toLowerCase();
  return null;
}

/**
 * Basic phone cleanup.
 * @param {string} p
 * @returns {string|null}
 */
function cleanPhone(p) {
  if (!p) return null;
  const digits = String(p).replace(/[^\d+]/g, "");
  return digits.length >= 7 ? digits : null;
}

/** safe string */
function s(x) {
  if (x === undefined || x === null) return "";
  return String(x).trim();
}

/** extract domain from URL */
function extractDomain(url) {
  try {
    const u = new URL(url);
    return u.hostname.replace(/^www\./, "");
  } catch {
    if (!url) return "";
    return url.replace(/^https?:\/\//, "").replace(/^www\./, "").split(/[\/?#]/)[0];
  }
}

function genId(providedId) {
  if (providedId) return String(providedId);
  return `scraped-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

/**
 * Normalize a single scraped item to Lead schema.
 * @param {object} item
 * @returns {object} normalized lead
 */
export function normalizeScrapedLead(item = {}) {
  const id = genId(item.id || item._id);
  const website = s(item.website || item.url || (item.raw && item.raw.url));
  const email = cleanEmail(item.email || item.contact_email || item.contact);
  const phone = cleanPhone(item.phone || item.tel || item.contact_phone);

  return {
    id,
    name: s(item.name || item.company || item.title),
    company: s(item.company || item.name),
    email: email,
    phone: phone,
    website: website || "",
    domain: extractDomain(website),
    address: s(item.address || (item.raw && item.raw.address) || ""),
    industry: s(item.industry || item.sector || ""),
    employees: item.employees || null,
    socialLinks: Array.isArray(item.socialLinks) ? item.socialLinks : (item.social || item.social_links ? [item.social || item.social_links] : []),
    source: s(item.source || "scraper"),
    confidence: typeof item.confidence === "number" ? item.confidence : Number(item.confidence) || 0,
    raw: item.raw || item,
    createdAt: (item.raw && item.raw.fetchedAt) || item.createdAt || new Date().toISOString()
  };
}

/**
 * Normalize an array of scraped results.
 * @param {Array<object>} arr
 * @returns {Array<object>}
 */
export function normalizeScrapedResults(arr = []) {
  if (!Array.isArray(arr)) return [];
  return arr.map(normalizeScrapedLead);
}

export default normalizeScrapedLead;
