export default function truncateString(str: String, limit: number) {
  if (str.length <= limit) {
    return str;
  }
  return str.slice(0, limit) + '...';
}
