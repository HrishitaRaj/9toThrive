#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

function usage() {
  console.error('Usage: node extract_objects_to_array.js <input.json> [output.json]');
  process.exit(1);
}

if (process.argv.length < 3) usage();
const input = path.resolve(process.argv[2]);
const output = path.resolve(process.argv[3] || (process.argv[2].replace(/\.json$/i, '.cleaned.json')));

if (!fs.existsSync(input)) {
  console.error('Input file not found:', input);
  process.exit(2);
}

const readStream = fs.createReadStream(input, { encoding: 'utf8' });
let depth = 0;
let inString = false;
let prevBackslash = false;
let buf = '';
const objects = [];

readStream.on('data', chunk => {
  for (let i = 0; i < chunk.length; i++) {
    const ch = chunk[i];
    buf += ch;

    if (ch === '"' && !prevBackslash) {
      inString = !inString;
    }

    if (!inString) {
      if (ch === '{') {
        depth++;
      } else if (ch === '}') {
        depth--;
        if (depth === 0) {
          // we've completed a top-level object
          const objStr = buf.trim();
          // push only if it starts with '{' and ends with '}'
          if (objStr.startsWith('{') && objStr.endsWith('}')) {
            objects.push(objStr);
          } else {
            // attempt to extract last balanced object from buf
            const lastOpen = objStr.lastIndexOf('{');
            const lastClose = objStr.lastIndexOf('}');
            if (lastOpen !== -1 && lastClose !== -1 && lastClose > lastOpen) {
              objects.push(objStr.slice(lastOpen, lastClose + 1));
            }
          }
          buf = '';
        }
      }
    }

    // update prevBackslash: true only if current char is backslash and previous was not backslash
    prevBackslash = (ch === '\\' && !prevBackslash);
  }
});

readStream.on('end', () => {
  console.log('Extracted objects:', objects.length);
  if (objects.length === 0) {
    console.error('No objects found - file may not contain JSON objects in expected format');
    process.exit(3);
  }

  const out = '[' + objects.join(',\n') + ']';
  try {
    JSON.parse(out);
  } catch (err) {
    console.error('Parsed failed on constructed array:', err && err.message);
    // still write the file for manual inspection
    fs.writeFileSync(output, out, 'utf8');
    console.error('Wrote partially reconstructed file to', output);
    process.exit(4);
  }

  fs.writeFileSync(output, out, 'utf8');
  console.log('Wrote cleaned JSON to', output);
  process.exit(0);
});

readStream.on('error', err => { console.error('Read error:', err); process.exit(5); });
