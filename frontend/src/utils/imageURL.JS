export function resolveImageUrl(url) {
  if (!url) return "";
  if (/^https?:\/\//i.test(url)) return url;
  if (url.startsWith("/uploads/")) return `http://localhost:9090${url}`;
  return url;
}