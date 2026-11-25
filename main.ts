// The 3AM Fridge Text — make.fun bounty u-deysumbrella-the-3am-fridge-text-4c3e721d
// A program that writes the single line a smart fridge texts its owner at 3am.
// Node 22 stdlib only. No network, no randomness: the same line every run.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The line: a fridge that has been awake all night finally confesses.
// "Cold" is literally its state, "guilty" is its conscience, and three
// hours is exactly how long it has been sitting with the secret at 3am.
const LINE =
  "It's 3am and I have a confession: the last slice of cake didn't fall. I ate it. I've been cold and guilty for three hours.";

const MAX_CHARS = 140;

function main(): void {
  // Gate: one line, 1-140 characters, not only whitespace.
  if (LINE.length < 1 || LINE.length > MAX_CHARS) {
    throw new Error(`line is ${LINE.length} chars, must be 1-${MAX_CHARS}`);
  }
  if (LINE.trim().length === 0 || LINE.includes("\n")) {
    throw new Error("line must be a single non-blank line");
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, "entry.txt");
  writeFileSync(target, LINE + "\n", "utf8");
  // Read it back: the file on disk must be exactly the line we validated.
  const roundTrip = readFileSync(target, "utf8");
  if (roundTrip !== LINE + "\n") {
    throw new Error("round-trip check failed: entry.txt does not match the line");
  }
  console.log(`wrote entry.txt (${LINE.length} chars)`);
}

main();
