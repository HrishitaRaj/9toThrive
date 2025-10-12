#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

function splitSkills(val) {
  if (!val) return [];
  if (Array.isArray(val)) return val.map(v => String(v).trim()).filter(Boolean);
  const s = String(val);
  // Remove noisy markers and normalize
  let cleaned = s.replace(/\b(e\.g\.|eg:?)\b/gi, '');
  cleaned = cleaned.replace(/\+\s*1\s*more/gi, '');
  // Extract parentheses content into semicolon-separated chunk so inner skills become separate parts
  cleaned = cleaned.replace(/\(([^)]*)\)/g, (m, p1) => `; ${p1} ;`);
  // Protect commas in remaining parenthetical-like fragments
  let protectedText = cleaned.replace(/,/g, '___COMMA___');

  // Prefer splitting on newlines or semicolons or bullets first (these often separate skills lists)
  let parts = protectedText.split(/[;\n\r•\u2022\t|]+/).map(p => p.trim()).filter(Boolean);

  // If there's only a single chunk and it contains commas, split on commas as fallback
  if (parts.length === 1 && parts[0].includes(',')) {
    parts = parts[0].split(',').map(p => p.trim()).filter(Boolean);
  }

  // restore protected commas and further split on slashes or ' and '
  const expanded = parts.flatMap(p => {
    const restored = p.replace(/___COMMA___/g, ',');
    // split on slashes
    const bySlash = restored.split(/\//).map(x => x.trim()).filter(Boolean);
    return bySlash.flatMap(x => x.split(/\band\b/).map(y => y.trim()).filter(Boolean));
  });

  // Normalize whitespace and dedupe
  return Array.from(new Set(expanded.map(x => x.replace(/\s+/g,' ').trim()).filter(Boolean)));
}

if (process.argv.length < 3) {
  console.error('Usage: node normalize_kaggle_fields.js <input.json> [output.json]');
  process.exit(1);
}

const input = path.resolve(process.argv[2]);
const output = path.resolve(process.argv[3] || (process.argv[2].replace(/\.json$/i, '.normalized.json')));
if (!fs.existsSync(input)) { console.error('Input not found:', input); process.exit(2); }

console.log('Reading', input);
const raw = fs.readFileSync(input, 'utf8');
let arr;
try { arr = JSON.parse(raw); } catch (err) { console.error('Parse error:', err && err.message); process.exit(3); }
if (!Array.isArray(arr)) { console.error('Expected top-level array'); process.exit(4); }

const ids = new Set();
const out = arr.map((job, idx) => {
  const j = Object.assign({}, job);
  // id
  if (!j.id) j.id = `kaggle_${idx + 1}`;
  j.id = String(j.id);
  if (ids.has(j.id)) {
    j.id = `${j.id}_${idx+1}`;
  }
  ids.add(j.id);

  // title/company/location
  j.title = (j.title || j.job_title || j['Job Title'] || 'Unknown Title').toString();
  j.company = (j.company || j.employer || j.Company || 'Various').toString();
  j.location = (j.location || j.city || 'Remote').toString();

  // requirements / skills
  const skillsSource = j.requirements || j.skills || j.requirement || j.requirements_text || j['requirements'] || '';
  j.requirements = splitSkills(skillsSource);

  // description
  j.description = (j.description || j.job_description || j.Description || '').toString();

  // normalize type/experience/salary
  j.type = (j.type || j.employment_type || 'Fulltime').toString();
  j.experience = (j.experience || j.years || 'Not specified').toString();
  j.salary = (j.salary || j.compensation || 'Not specified').toString();

  return j;
});

fs.writeFileSync(output, JSON.stringify(out, null, 2), 'utf8');
console.log('Wrote normalized file to', output, 'records=', out.length);
