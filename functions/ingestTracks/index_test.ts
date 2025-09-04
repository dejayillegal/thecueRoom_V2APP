import { assertEquals } from "std/testing/asserts.ts";
import { limitTracks, Track } from "./index.ts";

Deno.test("limitTracks caps entries", () => {
  const sample: Track[] = Array.from({ length: 60 }, (_, i) => ({
    title: `t${i}`,
    url: `u${i}`,
    artist: `a${i}`,
  }));
  assertEquals(limitTracks(sample).length, 50);
});
