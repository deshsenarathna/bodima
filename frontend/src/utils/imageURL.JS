export function resolveImageUrl(url) {
  if (!url) return "";
  if (/^https?:\/\//i.test(url)) return url;
  if (url.startsWith("/uploads/")) {
    const apiBase = import.meta.env.VITE_API_BASE_URL || window.location.origin;
    let origin;
    try {
      origin = new URL(apiBase).origin;
    } catch {
      origin = window.location.origin;
    }
    return `${origin}${url}`;
  }
  return url;
}