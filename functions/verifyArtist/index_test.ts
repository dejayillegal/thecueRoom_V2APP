import { assertEquals } from "std/testing/asserts.ts";
import { verify } from "./index.ts";

Deno.test("known domain", () => {
  assertEquals(verify("https://artist.bandcamp.com"), "verified");
});

Deno.test("invalid url", () => {
  assertEquals(verify("not a url"), "invalid");
});
