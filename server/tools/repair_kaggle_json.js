import fs from 'fs';
import path from 'path';

function tryParse(text) {
  try {
    return { ok: true, value: JSON.parse(text) };
  } catch (err) {
    return { ok: false, err };
  }
}

async function repair(filePath) {
  const src = path.resolve(filePath);
  if (!fs.existsSync(src)) {
    console.error('File not found:', src);
    process.exit(2);
  }

  const raw = fs.readFileSync(src, 'utf8');

  // Fast attempt
  let attempt = tryParse(raw);
  if (attempt.ok) {
    console.log('File is valid JSON. Records:', attempt.value.length || 0);
    return;
  }

  console.warn('Initial parse failed:', attempt.err && attempt.err.message);

  // Heuristic 1: remove trailing comma before closing bracket
  let text = raw.replace(/,\s*\]([\r\n\s]*)$/m, ']$1');
  attempt = tryParse(text);
  if (attempt.ok) {
    const out = src.replace(/\.json$/i, '.fixed.json');
    fs.writeFileSync(out, JSON.stringify(attempt.value, null, 2), 'utf8');
    console.log('Repaired by removing trailing array comma ->', out, 'records=', attempt.value.length || 0);
    return;
  }

  // Heuristic 2: remove trailing commas before object/array closers inside the file
  text = raw.replace(/,\s*(\n\s*[}\]])/g, '$1');
  attempt = tryParse(text);
  if (attempt.ok) {
    const out = src.replace(/\.json$/i, '.fixed.json');
    fs.writeFileSync(out, JSON.stringify(attempt.value, null, 2), 'utf8');
    console.log('Repaired by stripping stray trailing commas ->', out, 'records=', attempt.value.length || 0);
    return;
  }

  // Heuristic 3: try to extract top-level objects heuristically (line-oriented)
  const objs = [];
  const objRe = /\{[\s\S]*?\}(?=\s*,?\s*(\n|\r|$))/g;
  let m;
  while ((m = objRe.exec(raw)) !== null) {
    objs.push(m[0]);
  }
  if (objs.length > 0) {
    const joined = '[' + objs.join(',\n') + ']';
    attempt = tryParse(joined);
    if (attempt.ok) {
      const out = src.replace(/\.json$/i, '.fixed.json');
      fs.writeFileSync(out, JSON.stringify(attempt.value, null, 2), 'utf8');
      console.log('Repaired by extracting object blocks ->', out, 'records=', attempt.value.length || 0);
      return;
    }
  }

  console.error('Could not automatically repair the JSON. Please inspect the file manually. Last error:', attempt.err && attempt.err.message);
  process.exit(3);
}

if (process.argv.length < 3) {
  console.error('Usage: node repair_kaggle_json.js <path/to/kaggle_jobs.json>');
  process.exit(1);
}

repair(process.argv[2]).catch(err => {
  console.error('Unhandled error:', err);
  process.exit(4);
});
