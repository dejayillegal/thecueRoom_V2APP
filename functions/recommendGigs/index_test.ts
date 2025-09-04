import { assertEquals } from "std/testing/asserts.ts";
import { scoreGigs } from "./index.ts";

Deno.test("scoreGigs ranks by follow and city", () => {
  const gigs = [
    { id: 1, artist_id: 1, city: "NY" },
    { id: 2, artist_id: 2, city: "LA" },
  ];
  const recs = scoreGigs(gigs, [1], [2], "NY");
  assertEquals(recs[0].gig_id, 1);
  assertEquals(recs[1].gig_id, 2);
});
