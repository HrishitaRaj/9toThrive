#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

function usage() {
  console.error('Usage: node inspect_kaggle_json_context.js <file> <position> [radius]');
  console.error('Example: node inspect_kaggle_json_context.js server/uploads/kaggle_jobs.json 11420 200');
  process.exit(1);
}

if (process.argv.length < 4) usage();
const file = process.argv[2];
const pos = parseInt(process.argv[3], 10);
const radius = parseInt(process.argv[4] || '200', 10);
if (isNaN(pos) || isNaN(radius)) usage();

const abs = path.resolve(file);
if (!fs.existsSync(abs)) {
  console.error('File not found:', abs);
  process.exit(2);
}

const fd = fs.openSync(abs, 'r');
const start = Math.max(0, pos - radius);
const len = radius * 2;
const buf = Buffer.alloc(len);
const { bytesRead } = fs.readSync(fd, buf, 0, len, start);
fs.closeSync(fd);

const slice = buf.slice(0, bytesRead).toString('utf8');

// Print some metadata
console.log('File:', abs);
console.log('Requested position:', pos, 'start:', start, 'read:', bytesRead, 'bytes');
console.log('--- Context start ---');

// Show with line numbers
const lines = slice.split(/\r?\n/);
let lineOffset = 0;
// Try to compute line number of start by reading earlier part if possible
if (start > 10000) {
  try {
    const preBuf = Buffer.alloc(10000);
    const preStart = Math.max(0, start - 10000);
    const { bytesRead: preRead } = fs.readSync(fs.openSync(abs, 'r'), preBuf, 0, 10000, preStart);
    const preSlice = preBuf.slice(0, preRead).toString('utf8');
    lineOffset = preSlice.split(/\r?\n/).length - 1;
  } catch (e) {
    lineOffset = 0;
  }
}

const maxDigits = String(lineOffset + lines.length).length;
for (let i = 0; i < lines.length; i++) {
  const ln = lineOffset + i + 1;
  const markerPos = start + slice.indexOf(lines[i]);
  const marker = (markerPos <= pos && pos <= markerPos + lines[i].length) ? ' <-- ERROR POS' : '';
  console.log(String(ln).padStart(maxDigits, ' '), '|', lines[i], marker);
}

console.log('--- Context end ---');
