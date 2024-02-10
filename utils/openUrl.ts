export function openUrl(url?: string) {
  if (url) {
    document.location.assign(url);
  }
}
