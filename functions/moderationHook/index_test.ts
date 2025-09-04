import { assertEquals } from "std/testing/asserts.ts";
import { evaluate } from "./index.ts";

Deno.test("flags banned words", () => {
  const res = evaluate("This is spam content");
  assertEquals(res.flagged, true);
});

Deno.test("flags too many links", () => {
  const res = evaluate("http://a.com http://b.com http://c.com http://d.com");
  assertEquals(res.flagged, true);
});
