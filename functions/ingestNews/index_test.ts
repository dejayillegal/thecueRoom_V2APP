import { assertEquals } from "std/testing/asserts.ts";
import { parseRss } from "./index.ts";

Deno.test("parseRss dedupes and limits", () => {
  const itemsXml = Array.from({ length: 12 }, (_ , i) =>
    `<item><title>${i}</title><link>u${i}</link><description>d</description><pubDate>2024-01-01</pubDate></item>`
  ).join("");
  const xml = `<rss><channel>${itemsXml}</channel></rss>`;
  const items = parseRss(xml, "src", "cat");
  assertEquals(items.length, 10);
  assertEquals(items[0].url, "u0");
});

Deno.test("parseRss removes duplicates", () => {
  const xml = `<rss><channel><item><title>a</title><link>u1</link></item><item><title>b</title><link>u1</link></item></channel></rss>`;
  const items = parseRss(xml, "s", "c");
  assertEquals(items.length, 1);
});
