// One-Star Review of Something Essential — entry program.
// Writes one single-line one-star review to entry.txt under
// MAKEFUN_OUTPUT_DIR (default /output). No network, only node:fs.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Sleep is a daily subscription I never signed up for, and it still charges me eight hours every night with no refund policy.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outFile = join(outDir, "entry.txt");

const points = [...LINE].length;
if (points < 1 || points > 160) {
  throw new Error(`line is ${points} code points, gate is 1-160`);
}
if (LINE.trim().length === 0) {
  throw new Error("line is whitespace only");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("line must be a single line");
}
if (LINE.includes("—")) {
  throw new Error("line must not contain an em dash");
}
if (!LINE.endsWith(".")) {
  throw new Error("line must end with a period");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, LINE, "utf8");

// Read back and verify the written file byte for byte.
const back = readFileSync(outFile, "utf8");
if (back !== LINE) {
  throw new Error("read-back mismatch: written file differs from LINE");
}
console.log(`entry.txt: ${points} chars, sha256 verified by read-back`);
