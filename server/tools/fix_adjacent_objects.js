#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

function usage() {
  console.error('Usage: node fix_adjacent_objects.js <input.json> [output.json]');
  process.exit(1);
}

if (process.argv.length < 3) usage();
const input = path.resolve(process.argv[2]);
const output = path.resolve(process.argv[3] || (process.argv[2].replace(/\.json$/i, '.fixed.json')));

if (!fs.existsSync(input)) {
  console.error('Input file not found:', input);
  process.exit(2);
}

const readStream = fs.createReadStream(input, { encoding: 'utf8' });
const writeStream = fs.createWriteStream(output, { encoding: 'utf8' });

let carry = '';
readStream.on('data', chunk => {
  // Prepend carry from previous chunk
  const combined = carry + chunk;
  // Keep last char as carry (pattern length -1 = 1)
  const emitPortion = combined.slice(0, -1);
  carry = combined.slice(-1);
  // Replace occurrences of '}{' with '},\n{'
  const replaced = emitPortion.replace(/}\s*\{/g, '},\n{');
  writeStream.write(replaced);
});

readStream.on('end', () => {
  // process remaining carry
  const final = carry.replace(/}\s*\{/g, '},\n{');
  writeStream.write(final);
  writeStream.end();
  console.log('Wrote fixed file to', output);

  // Try to parse the output to confirm validity
  try {
    const content = fs.readFileSync(output, 'utf8');
    JSON.parse(content);
    console.log('Parsed OK: fixed JSON appears valid');
    process.exit(0);
  } catch (err) {
    console.error('Parse failed on fixed file:', err && err.message);
    process.exit(3);
  }
});

readStream.on('error', err => { console.error('Read error:', err); process.exit(4); });
writeStream.on('error', err => { console.error('Write error:', err); process.exit(5); });
