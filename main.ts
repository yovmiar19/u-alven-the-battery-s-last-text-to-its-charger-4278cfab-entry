// The Battery's Last Text to Its Charger
// make.fun bounty: u-alven-the-battery-s-last-text-to-its-charger-4278cfab
//
// One line of at most 200 characters: the phone battery's final message
// to the charger it waited for all day. The line below is the whole entry:
// a list of sacrifices (dimmed screen, Bluetooth off, apps killed) that
// ends on the twist — the charger was in the car the whole time, so the
// battery suffered for nothing.
//
// The program writes the line verbatim to /output/entry.txt and then
// reads the file back to prove the bytes on disk are exactly the line.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The entry line. Do not edit: the judge compares this text as written.
const LINE =
  "I dimmed my screen for you, turned off Bluetooth for you, killed every app for you. And you were in the car the whole time.";

// Gate from the bounty rules: /output/entry.txt must be 1-200 characters.
const GATE_MIN = 1;
const GATE_MAX = 200;

function checkGate(line: string): void {
  if (line.length < GATE_MIN || line.length > GATE_MAX) {
    throw new Error(
      `line is ${line.length} characters, outside the ${GATE_MIN}-${GATE_MAX} gate`,
    );
  }
}

function writeEntry(line: string): void {
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", line, "utf8");
}

function verifyEntry(line: string): void {
  const onDisk = readFileSync("/output/entry.txt", "utf8");
  if (onDisk !== line) {
    throw new Error("output file does not match the entry line exactly");
  }
}

checkGate(LINE);
writeEntry(LINE);
verifyEntry(LINE);
console.log(`wrote ${LINE.length} characters to /output/entry.txt`);
