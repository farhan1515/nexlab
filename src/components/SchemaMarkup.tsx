// Structured data is now emitted server-side from index.html so crawlers
// see it on first byte. Keeping this component as a no-op so existing
// imports and call sites continue to work without change.
export default function SchemaMarkup() {
  return null;
}
