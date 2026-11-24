// One Emoji, One Dream Vacation — entry program.
//
// Writes exactly one emoji to /output/entry.txt: 🏝 (U+1F3DD DESERT ISLAND,
// bare form — one character, four UTF-8 bytes). A desert island is the dream
// vacation itself: a faraway place, palm and sea in a single glyph, a whole
// postcard in one character.
//
// The program first checks its own entry against the competition gate
// (UTF-8 text of 1–8 characters, not whitespace-only), writes it, then reads
// the file back and refuses to finish unless what is on disk is byte for
// byte the entry it intended — so a failed or partial write can never pass
// as a submission.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY = "🏝"; // U+1F3DD DESERT ISLAND, bare form (no VS16)
const OUT = "/output/entry.txt";

// Internal gate check — mirrors the sealed scorer's gate.
const chars = [...ENTRY];
if (chars.length < 1 || chars.length > 8) {
  throw new Error(`gate failed: entry is ${chars.length} characters (need 1-8)`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("gate failed: entry is whitespace-only");
}

mkdirSync("/output", { recursive: true });
writeFileSync(OUT, ENTRY, "utf8");

// Read-back verification: what is on disk must be byte-identical.
const written = readFileSync(OUT, "utf8");
if (written !== ENTRY) {
  throw new Error("verify failed: file on disk differs from the entry");
}
console.log(`wrote ${chars.length} character(s), ${Buffer.byteLength(ENTRY, "utf8")} byte(s) to ${OUT} (verified)`);
